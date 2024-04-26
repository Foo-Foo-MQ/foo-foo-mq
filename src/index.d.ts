/// <reference types="node" />

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
    options: PublishOptions<MessageBodyType>,
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
      | Array<PublishOptions<MessageBodyType>>,
    connectionName?: string
  ): Promise<void>;

  // Receiving
  export function handle<MessageBodyType>(
    options: HandlerOptions,
    handler: (message: Message<MessageBodyType>) => any
  ): Promise<Handler>;
  export function handle<MessageBodyType>(
    typeName: string,
    handler: (message: Message<MessageBodyType>) => any,
    queueName?: string,
    context?: string
  ): Promise<Handler>;
  export function startSubscription(
    queueName: string,
    exclusive?: boolean,
    connectionName?: string
  ): void;
  export function stopSubscription(): void;

  // Custom serializers
  export function serialize(object: any): Buffer;
  export function deserialize(bytes: Buffer, encoding: string): any;
  export function addSerializer(
    contentType: string,
    serializer: {
      deserialize: (bytes: Buffer, encoding: string) => any;
      serialize: (object: any) => any;
    }
  ): void;

  // Event handler
  export function on(event: string, handler: (...args: any[]) => void): any;
  /** Remove all event subscriptions */
  export function off(): void;
  /** Emit an event*/
  export function emit(topic: string, data?: any, timestamp?: Date): void;

  // Unhandled messages
  export function onUnhandled(handler: (msg: Message<any>) => void): void;
  export function nackUnhandled(handler: (msg: Message<any>) => void): void;
  export function rejectUnhandled(handler: (msg: Message<any>) => void): void;
  export function onReturned(handler: (msg: Message<any>) => void): void;

  // Undocumented
  export function reset(): void;
  export function setAckInterval(interval: number): void;
  export function clearAckInterval(): void;
  export function nackOnError(): void;
  export function ignoreHandlerErrors(): void;
  export function getExchange(name: string, connectionName?: string): any;
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
    loggers: Array<{
      level: string;
      stream: {
        write(data: string): void;
      };
    }>
  ): void;

  export const connections: Record<string, unknown>;

  export interface Message<BodyType> {
    ack(): Promise<void>;
    nack(): Promise<void>;
    reject(): Promise<void>;
    reply<ReplyBodyType>(
      message: ReplyBodyType,
      options?: {
        more: string;
        replyType: string;
        contentType: string;
        headers: {
          [key: string]: string;
        };
      }
    ): Promise<void>;
    fields: MessageFields;
    properties: MessageProperties;
    body: BodyType;
    content: {
      type: string;
      data: Buffer;
    };
    type: string;
    quarantine: boolean;
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
    headers: {
      [key: string]: any;
    };
    correlationId: string;
    replyTo: string;
    messageId: string;
    type: string;
    appId: string;
  }

  export type ExchangeType = "fanout" | "topic" | "direct";

  export interface ConfigurationOptions {
    connection: ConnectionOptions;
    exchanges?: Array<ExchangeOptions>;
    queues?: Array<QueueOptions>;
    bindings?: Array<BindingOptions>;
  }

  export interface ConnectionOptions {
    uri?: string;
    name?: string;
    host?: string;
    port?: number;
    server?: string | string[];
    vhost?: string;
    protocol?: "amqp" | "amqps";
    user?: string;
    pass?: string;
    timeout?: number;
    heartbeat?: number;
    frameMax?: number;
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
    clientProperties?: any;
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
    queueVersion?: 1 | 2;
    deadLetter?: string;
    deadLetterRoutingKey?: string;
    deadLetterStrategy?: "at-most-once" | "at-least-once";
    subscribe?: boolean;
    autoDelete?: boolean;
    passive?: boolean;
    messageTtl?: number;
    type?: "classic" | "quorum";
    overflow?: "drop-head" | "reject-publish";
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

  export interface PublishOptions<MessageBodyType = any> {
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
    headers?: {
      [key: string]: string;
    };
    timeout?: number;
  }

  export interface BulkPublishSet<MessageBodyType> {
    [exchangeName: string]: Array<PublishOptions<MessageBodyType>>;
  }

  export interface HandlerOptions {
    queue: string;
    type: string;
    autoNack?: boolean;
    context?: any;
    handler?<MessageBodyType>(msg: Message<MessageBodyType>): any;
  }

  export interface Handler {
    <MessageBodyType>(msg: Message<MessageBodyType>): Promise<any>;
    remove(): void;
    catch(errorHandler: (err: any, msg: Message<any>) => void): void;
  }
}
