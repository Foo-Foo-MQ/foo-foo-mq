export = Broker;

declare namespace Broker {
  // Connection management
  export function addConnection(options: ConnectionOptions): void;
  export function close(
    connectionName?: string,
    reset?: boolean
  ): Promise<void>;
  export function closeAll(reset?: boolean): Promise<void>;
  export function retry(): Promise<void>;
  export function shutdown(): Promise<void>;

  // Managing topology
  export function configure(options: ConfigurationOptions): Promise<void>;
  export function addExchange(
    exchangeName: string,
    exchangeType: ExchangeType,
    options?: Omit<ExchangeOptions, "name" | "type">,
    connectionName?: string
  ): Promise<void>;
  export function addQueue(
    queueName: string,
    options?: Omit<QueueOptions, "name">,
    connectionName?: string
  ): Promise<void>;
  export function bindExchange(
    sourceExchange: string,
    targetExchange: string,
    routingKeys?: string,
    connectionName?: string
  ): Promise<void>;
  export function bindQueue(
    sourceExchange: string,
    targetQueue: string,
    routingKeys?: string | string[],
    connectionName?: string
  ): Promise<void>;
  export function purgeQueue(
    queueName: string,
    connectionName?: string
  ): Promise<number>;

  // Publishing
  export function publish<MessageBodyType>(
    exchangeName: string,
    options: Omit<PublishOptions<MessageBodyType>, "replyTimeout">,
    connectionName?: string
  ): Promise<void>;
  export function request<MessageBodyType, ResponseBodyType>(
    exchangeName: string,
    options: PublishOptions<MessageBodyType>,
    connectionName?: string
  ): Promise<Message<ResponseBodyType>>;
  export function bulkPublish<MessageBodyType>(
    set:
      | BulkPublishSet<MessageBodyType>
      | Omit<PublishOptions<MessageBodyType>, "replyTimeout">[],
    connectionName?: string
  ): Promise<void>;

  // Receiving
  export function handle<MessageBodyType>(
    options: HandlerOptions,
    handler: (message: Message<MessageBodyType>) => void | Promise<void>
  ): Handler;
  export function handle<MessageBodyType>(
    typeName: string,
    handler: (message: Message<MessageBodyType>) => void | Promise<void>,
    queueName?: string,
    context?: string
  ): Handler;
  export function startSubscription(
    queueName: string,
    exclusive?: boolean,
    connectionName?: string
  ): void;
  export function stopSubscription(): void;

  // Custom serializers
  export function serialize(object: unknown): Buffer;
  export function deserialize(bytes: Buffer, encoding: string): unknown;
  export function addSerializer(
    contentType: string,
    serializer: {
      deserialize: (bytes: Buffer, encoding: string) => unknown;
      serialize: (object: unknown) => unknown;
    }
  ): void;

  // Event handler
  export function on(event: string, handler: (...args: unknown[]) => void): unknown;

  // Unhandled messages
  export function onUnhandled(handler: (msg: Message) => void): void;
  export function nackUnhandled(): void;
  export function rejectUnhandled(): void;
  export function onReturned(handler: (msg: Message) => void): void;

  // Undocumented
  export function reset(): void;
  export function setAckInterval(interval: number): void;
  export function clearAckInterval(): void;
  export function nackOnError(): void;
  export function ignoreHandlerErrors(): void;
  export function getExchange(name: string, connectionName?: string): unknown;
  export function batchAck(): void;
  export function unbindExchange(
    source: string,
    target: string,
    keys: string | string[],
    connectionName?: string
  ): Promise<void>;
  export function unbindQueue(
    source: string,
    target: string,
    keys: string | string[],
    connectionName?: string
  ): Promise<void>;

  export function log(
    loggers: {
      level: string;
      stream: {
        write(data: string): void;
      };
    }[]
  ): void;

  export const connections: Record<string, unknown>;

  export type Headers = Record<string, string | undefined>;

  export interface Message<BodyType = unknown> {
    ack(): void;
    nack(): void;
    reject(): void;
    reply<ReplyBodyType>(
      message: ReplyBodyType,
      options?: {
        more?: string;
        replyType?: string;
        contentType: string;
        headers?: Headers;
      }
    ): void;
    fields: MessageFields;
    properties: MessageProperties;
    body: BodyType;
    content: {
      type: string;
      data: Buffer;
    };
    type: string;
    quarantine: boolean;
    queue?: string;
  }

  export interface MessageFields {
    consumerTag: string;
    deliveryTag: string;
    redelivered: boolean;
    exchange: string;
    routingKey: string;
  }

  export interface MessageProperties {
    contentType: string;
    contentEncoding: string;
    headers: Headers;
    correlationId: string;
    replyTo: string;
    messageId: string;
    type: string;
    appId: string;
  }

  export type ExchangeType = "fanout" | "topic" | "direct";

  export interface ConfigurationOptions {
    connection: ConnectionOptions;
    exchanges?: ExchangeOptions[];
    queues?: QueueOptions[];
    bindings?: BindingOptions[];
  }

  export interface ConnectionOptions {
    uri?: string;
    name?: string;
    host?: string;
    port?: number;
    server?: string | string[];
    vhost?: string;
    protocol?: string;
    user?: string;
    pass?: string;
    timeout?: number;
    heartbeat?: number;
    replyQueue?:
      | boolean
      | string
      | {
          name: string;
          autoDelete?: boolean;
          subscribe?: boolean;
        };
    publishTimeout?: number;
    replyTimeout?: number;
    failAfter?: number;
    retryLimit?: number;
    waitMin?: number;
    waitMax?: number;
    waitIncrement?: number;
    clientProperties?: unknown;
    caPath?: string;
    certPath?: string;
    keyPath?: string;
    passphrase?: string;
    pfxPath?: string;
  }

  export interface QueueOptions {
    name: string;
    limit?: number;
    queueLimit?: number;
    deadLetter?: string;
    subscribe?: boolean;
    durable?: boolean;
  }

  export interface BindingOptions {
    exchange: string;
    target: string;
    keys?: string | string[];
  }

  export interface ExchangeOptions {
    name: string;
    type: ExchangeType;
    publishTimeout?: number;
    alternate?: string;
    persistent?: boolean;
    durable?: boolean;
  }

  export interface PublishOptions<MessageBodyType = unknown> {
    routingKey?: string;
    type?: string;
    correlationId?: string;
    contentType?: string;
    body?: MessageBodyType;
    messageId?: string;
    expiresAfter?: number;
    timestamp?: number;
    mandatory?: boolean;
    persistent?: boolean;
    headers?: Headers;
    timeout?: number;
    replyTimeout?: number;
  }

  export interface BulkPublishSet<MessageBodyType> {
    [exchangeName: string]: Omit<PublishOptions<MessageBodyType>, "replyTimeout">[];
  }

  export interface HandlerOptions {
    queue: string;
    type: string;
    autoNack?: boolean;
    context?: unknown;
    handler?<MessageBodyType>(msg: Message<MessageBodyType>): void | Promise<void>;
  }

  export interface Handler {
    callback: <MessageBodyType>(msg: Message<MessageBodyType>) => void | Promise<void>;
    remove(): void;
    catch(errorHandler: (err: unknown, msg: Message) => void): void;
  }
}
