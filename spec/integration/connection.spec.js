require('../setup');
const rabbit = require('../../src/index.js');
const config = require('./configuration');

describe('Connection', function () {
  describe('on connection', function () {
    let connected;
    before(function (done) {
      rabbit.once('connected', (c) => {
        connected = c;
        done();
      });
      rabbit.configure({ connection: config.connection });
    });

    it('should assign uri to connection', function () {
      connected.uri.should.equal('amqp://guest:guest@127.0.0.1:5672/%2f?heartbeat=30&frameMax=4096');
    });

    after(function () {
      return rabbit.close('default');
    });
  });

  describe('on connection using uri', function () {
    let connected;
    before(function (done) {
      rabbit.once('connected', (c) => {
        connected = c;
        done();
      });
      rabbit.addConnection({ name: 'connectionWithUri', uri: 'amqp://guest:guest@127.0.0.1:5672/%2f?heartbeat=11&frameMax=8192' });
    });

    it('should assign uri to connection', function () {
      connected.uri.should.equal('amqp://guest:guest@127.0.0.1:5672/%2f?heartbeat=11&frameMax=8192');
    });

    after(function () {
      return rabbit.close('connectionWithUri');
    });
  });
});
