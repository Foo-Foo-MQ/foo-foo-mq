const amqp = require('amqplib');
const fs = require('fs');
const AmqpConnection = require('amqplib/lib/callback_model').CallbackModel;
const monad = require('./iomonad');
const log = require('../log')('rabbot.connection');
const info = require('../info');
const url = require('url');
const crypto = require('crypto');
const os = require('os');

/* log
  * `rabbot.amqp-connection`
    * `debug`
      * when amqplib's `connection.close` promise is rejected
   * `info`
      * connection attempt
      * connection success
      * connection failure
      * no reachable endpoints
*/

function getArgs (fn) {
  const fnString = fn.toString();
  const argList = /[(]([^)]*)[)]/.exec(fnString)[1].split(',');
  return argList.map(String.prototype.trim);
}

function getInitialIndex (limit) {
  const pid = process.pid;
  let index = 0;
  if (pid <= limit) {
    const sha = crypto.createHash('sha1');
    sha.write(os.hostname());
    const buffer = sha.digest();
    index = Math.abs(buffer.readInt32LE()) % limit;
  } else {
    index = pid % limit;
  }
  return index;
}

function getOption (opts, key, alt) {
  if (opts.get && supportsDefaults(opts.get)) {
    return opts.get(key, alt);
  } else {
    return opts[key] || alt;
  }
}

function getUri (protocol, user, pass, server, port, vhost, heartbeat, frameMax) {
  return `${protocol}://${user}:${pass}@${server}:${port}/${vhost}?heartbeat=${heartbeat}&frameMax=${frameMax}`;
}

function max (x, y) {
  return x > y ? x : y;
}

function parseUri (uri) {
  if (uri) {
    const parsed = new url.URL(uri);
    const heartbeat = parsed.searchParams.get('heartbeat');
    const frameMax = parsed.searchParams.get('frameMax');
    return {
      useSSL: parsed.protocol.startsWith('amqps'),
      user: decodeURIComponent(parsed.username),
      pass: decodeURIComponent(parsed.password),
      host: parsed.hostname,
      port: parsed.port,
      vhost: parsed.pathname ? parsed.pathname.slice(1) : undefined,
      heartbeat: heartbeat,
      frameMax: frameMax
    };
  }
}

function split (x) {
  if (typeof x === 'number') {
    return [x];
  } else if (Array.isArray(x)) {
    return x;
  } else {
    return x.split(',').map(trim);
  }
}

function supportsDefaults (opts) {
  return opts.get && getArgs(opts.get).length > 1;
}

function trim (x) {
  return x.trim(' ');
}

function readFromFileIfPathOrDefaultToInput (possiblePathOrValue) {
  return fs.existsSync(possiblePathOrValue) ? fs.readFileSync(possiblePathOrValue) : possiblePathOrValue;
}

const Adapter = function (parameters) {
  const uriOpts = parseUri(parameters.uri);
  Object.assign(parameters, uriOpts);
  const hosts = getOption(parameters, 'host');
  const servers = getOption(parameters, 'server');
  const brokers = getOption(parameters, 'RABBIT_BROKER');
  const serverList = brokers || hosts || servers || 'localhost';

  this.name = parameters ? (parameters.name || 'default') : 'default';
  this.servers = split(serverList);
  this.connectionIndex = getInitialIndex(this.servers.length);
  this.heartbeat = getOption(parameters, 'RABBIT_HEARTBEAT') || getOption(parameters, 'heartbeat', 30);
  this.pass = getOption(parameters, 'RABBIT_PASSWORD') || getOption(parameters, 'pass', 'guest');
  this.user = getOption(parameters, 'RABBIT_USER') || getOption(parameters, 'user', 'guest');
  this.vhost = getOption(parameters, 'RABBIT_VHOST') || getOption(parameters, 'vhost', '%2f');
  this.frameMax = getOption(parameters, 'RABBIT_FRAME_MAX') || getOption(parameters, 'frameMax', 4096);
  const timeout = getOption(parameters, 'RABBIT_TIMEOUT') || getOption(parameters, 'timeout', 2000);
  const certPath = getOption(parameters, 'RABBIT_CERT') || getOption(parameters, 'certPath');
  const keyPath = getOption(parameters, 'RABBIT_KEY') || getOption(parameters, 'keyPath');
  const caPaths = getOption(parameters, 'RABBIT_CA') || getOption(parameters, 'caPath');
  const passphrase = getOption(parameters, 'RABBIT_PASSPHRASE') || getOption(parameters, 'passphrase');
  const pfxPath = getOption(parameters, 'RABBIT_PFX') || getOption(parameters, 'pfxPath');
  const useSSL = certPath || keyPath || passphrase || caPaths || pfxPath || parameters.useSSL;
  const portList = getOption(parameters, 'RABBIT_PORT') || getOption(parameters, 'port', (useSSL ? 5671 : 5672));
  this.protocol = getOption(parameters, 'RABBIT_PROTOCOL') || getOption(parameters, 'protocol', undefined)?.replace(/:\/\/$/, '') || (useSSL ? 'amqps' : 'amqp');
  this.ports = split(portList);
  this.options = { noDelay: true };

  if (timeout) {
    this.options.timeout = timeout;
  }
  if (certPath) {
    this.options.cert = readFromFileIfPathOrDefaultToInput(certPath);
  }
  if (keyPath) {
    this.options.key = readFromFileIfPathOrDefaultToInput(keyPath);
  }
  if (passphrase) {
    this.options.passphrase = passphrase;
  }
  if (pfxPath) {
    this.options.pfx = readFromFileIfPathOrDefaultToInput(pfxPath);
  }
  if (caPaths) {
    const list = caPaths.split(',');
    this.options.ca = list.map(readFromFileIfPathOrDefaultToInput);
  }
  this.options.clientProperties = Object.assign({
    host: info.host(),
    process: info.process(),
    lib: info.lib()
  }, parameters.clientProperties);
  this.limit = max(this.servers.length, this.ports.length);
};

Adapter.prototype.connect = function () {
  return new Promise(function (resolve, reject) {
    const unreachable = 'No endpoints could be reached';
    const attempted = [];
    const attempt = function () {
      const [nextUri, serverHostname] = this.getNextUri();
      log.info("Attempting connection to '%s' (%s)", this.name, nextUri);
      function onConnection (connection) {
        connection.uri = nextUri;
        log.info("Connected to '%s' (%s)", this.name, nextUri);
        resolve(connection);
      }
      function onConnectionError (err) {
        log.info("Failed to connect to '%s' (%s) with, '%s'", this.name, nextUri, err);
        attempted.push(nextUri);
        this.bumpIndex();
        if (attempted.length < this.limit) {
          attempt(err);
        } else {
          log.info('Cannot connect to `%s` - all endpoints failed', this.name);
          reject(unreachable);
        }
      }
      if (attempted.indexOf(nextUri) < 0) {
        amqp.connect(nextUri, Object.assign({ servername: serverHostname }, this.options))
          .then(onConnection.bind(this), onConnectionError.bind(this));
      } else {
        log.info('Cannot connect to `%s` - all endpoints failed', this.name);
        reject(unreachable);
      }
    }.bind(this);
    attempt();
  }.bind(this));
};

Adapter.prototype.bumpIndex = function () {
  if (this.limit - 1 > this.connectionIndex) {
    this.connectionIndex++;
  } else {
    this.connectionIndex = 0;
  }
};

Adapter.prototype.getNextUri = function () {
  const server = this.getNext(this.servers);
  const port = this.getNext(this.ports);
  const uri = getUri(this.protocol, encodeURIComponent(this.user), encodeURIComponent(this.pass), server, port, this.vhost, this.heartbeat, this.frameMax);
  return [uri, server];
};

Adapter.prototype.getNext = function (list) {
  if (this.connectionIndex >= list.length) {
    return list[0];
  } else {
    return list[this.connectionIndex];
  }
};

module.exports = function (options) {
  const close = function (connection) {
    connection.close()
      .then(null, function (err) {
        // for some reason calling close always gets a rejected promise
        // I can't imagine a good reason for this, so I'm basically
        // only showing this at the debug level
        log.debug(`Error was reported during close of connection '${options.name}' - '${err}'`);
      });
  };
  const adapter = new Adapter(options);
  return monad(options, 'connection', adapter.connect.bind(adapter), AmqpConnection, close);
};
