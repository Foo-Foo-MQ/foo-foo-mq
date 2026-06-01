# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [10.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.2.0...v10.0.0) (2026-06-01)


### ⚠ BREAKING CHANGES

* **support node 24, drop 18:** Dropped support for Node 18

* chore(update package-lock): update package-lock

### Features

* **support node 24, drop 18:** add support for Node 24, drop support for 18 ([88a6056](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/88a6056c009a16ff8144324a23ac8e939a400132))


### Bug Fixes

* **package-lock.json:** install peer flag resolution ([7b5b26d](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/7b5b26d3aed03d6392a8feb83d61cf315c029373))

## [9.2.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.1.0...v9.2.0) (2024-11-14)


### Features

* add `frameMax` connection option ([#57](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/57)) ([8ca9b46](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/8ca9b46578c3eef43a66ed711d6f5205d0a92968))
* **node 22 support:** adding support for Node 22 ([#58](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/58)) ([a70b4aa](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/a70b4aadee823bbf6c60171f0f41648a859542ce))

## [9.1.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.0.3...v9.1.0) (2024-04-08)

### Features

- **connection.js:** make sure `protocol` field is found and backwards compatible ([#26](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/26))
- **index.d.ts:** Add `autoDelete` key to QueueOptions definition (it is documented and shown in examples)
- **index.d.ts:** Add `messageTtl`, `passive` (existing fields) and `type` (x-queue-type, for quorum support) + protocol definition for [#26](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/26)
- **queue.js:** add dead letter strategy argument (supports at least once since v3.10 for quorum) + update typing to reflect it
- **queue.js:** Add proper support for quorum queues and silently omit incompatible fields
- **queue.js:** Add queue version upport for classic queues + behavior test and doc entry
- **queue.spec.js:** Add behavior test case for quorum queue type (not set)
- **queue.spec.js:** Add test case for quorum queue type and check if call is valid

### Bug Fixes

- autodelete queue in test has to be classic
- **integration:** proper protocol ([#26](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/26)) and fix url encode error ([#55](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/55))

### [9.0.3](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.0.2...v9.0.3) (2024-01-25)


### Bug Fixes

* **src/connectionfsm.js:** adding `channel.on('failed'` is breaking some tests,disabling for now ([4d3e763](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/4d3e76391cb75c68de28606c25bea4e15a234edf))
* **test-coverage-actions.yml:** change to use v4 of actions/setup-node and actions/checkout ([ee81ba9](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/ee81ba900f7877f5b19ddd8699427f0c167e5834))
* **test-coverage-actions.yml:** remove out of date node 16 action per github error request ([9029af5](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/9029af5f2d01399044b02e4643f78b74caac3684))

### [9.0.2](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.0.1...v9.0.2) (2024-01-25)


### Bug Fixes

* bubble channel failures up to the connection ([#16](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/16)) ([d340e74](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/d340e74d78cd376d08641fbf366bdf7d0c414506))

### [9.0.1](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v9.0.0...v9.0.1) (2023-11-19)


### Bug Fixes

* **package-lock.json:** npm audit fix updates ([#52](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/52)) ([f6d2cef](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/f6d2cef196bd0f342dee06d1badfd3c01b4ade21))

## [9.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v8.0.1...v9.0.0) (2023-11-19)


### ⚠ BREAKING CHANGES

* **package.json:** Removed support for node 14

### Features

* **.nvmrc, package.json, package-lock.json, test-coverage-actions.yml:** add support for Node 20 ([#49](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/49)) ([2b4c851](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/2b4c851a33efbdce0708675cedf58f6779ff56e6)), closes [#48](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/48)
* **package.json:** node 14 support removed ([70833a7](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/70833a75de83ff093758dec65024214928c53c67))

### [8.0.1](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v8.0.0...v8.0.1) (2023-05-03)


### Bug Fixes

* **types:** add `Broker.emit()` and `Broker.off()` ([e492c72](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/e492c72d89f871b16ecf80f749e76d8e95097900))
* **types:** add waitMax to ConnectionOptions ([b0d5034](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/b0d503402629e2b802db99fe6378169078825386))

## [8.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v7.1.0...v8.0.0) (2023-02-19)


### ⚠ BREAKING CHANGES

* **package.json:** remove support for node 12

### Features

* **.nvmrc, package.json, info.js, test-coverage-actions.yml:** add support for node 18 ([2a216e0](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/2a216e0c43bf1ebc27e25d5da29af8784d9e4ff1)), closes [#37](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/37)
* **package.json:** support node 18 ([c056356](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/c056356f04f59d1f189fee75eaec66f0ac268b28))

## [7.1.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v7.0.0...v7.1.0) (2022-07-02)


### Features

* typescript support ([bca4584](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/bca45849238b211d636b75a36ef6bb5aec6e5227))


### Bug Fixes

* **types:** duplicate options in addExchange and addQueue ([05f628e](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/05f628e759dd3b664d923efce1fc0ede293b119e))

## [7.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v6.0.0...v7.0.0) (2021-07-18)


### ⚠ BREAKING CHANGES

* **package.json, .nvmrc and travis:** Node 10 is no longer supported

### Features

* **package.json, .nvmrc and travis:** change supported node versions to 12-16 ([1634c0b](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/1634c0b9eda27222f16ca0a9cc7cfd441d3ef6fe)), closes [#28](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/28)


### Bug Fixes

* **package.json:** fix security vulnerabilities and update dependencies ([08d3c5e](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/08d3c5ef68b4ede630a838bea5ea346a06cb856c))

## [6.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v5.1.0...v6.0.0) (2021-05-11)


### ⚠ BREAKING CHANGES

* default port on amqps:// uri is now 5671

### Bug Fixes

* default port resolving on amqps:// protocol should be 5671 ([84440d4](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/84440d48eef0974577a8c6a995b90411ded7c1fc))

## [5.1.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v5.0.0...v5.1.0) (2021-03-14)


### Features

* **package.json and travis:** update amqplib and add support for node 15 ([0fe6a5c](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/0fe6a5cb413712b95fef6add7ce6af0c0f6b1c04))


### Bug Fixes

* **package.json:** update node-monologue to version that supports node 15 ([eb6210d](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/eb6210d090ae235518d61ae3250c4d27cfbe9a72))

## [5.0.0](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v4.0.4...v5.0.0) (2020-08-17)


### ⚠ BREAKING CHANGES

* **package.json:** node 8 is not lts, no longer supported

### Bug Fixes

* **package.json:** add node and 14 to ci steps, update engines to support node 14 ([a7f7c05](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/a7f7c055d5d970d5c66cb1a3966c42f991a2fe1b))
* **package.json:** update node-monolouge to 1.0.0 ([0d178e6](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/0d178e6efebb33e7304a7ea39dc864dfd3fbffc2))
* **package.json:** update to amqplib 0.6.0 ([19d253c](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/19d253c02eb5290ca1cac236c12bfaa66550cc58))

### [4.0.4](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v4.0.3...v4.0.4) (2020-07-12)


### Bug Fixes

* **connection.js:** correct accessor for username and password ([f67da30](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/f67da30847c1958424f330ee2dc87c1afcbf1212)), closes [#14](https://github.com/Foo-Foo-MQ/foo-foo-mq/issues/14)

### [4.0.3](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v4.0.2...v4.0.3) (2020-06-26)

### Warning

This version `4.0.3` had an unintentional bug as a result of moving away from the deprecated url.parse to the URL class.
As a result, only consumers that were passing in a `uri` with credentials for connection containing were being ignored, and were defaulting back to `guest:guest` for `username:password`.  

Consumers providing separate keys for `user` and `pass` were not affected by this. This is fixed in `v4.0.4`

### Bug Fixes

* **package.json:** devDependency updates and publishing.md update ([9fed4be](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/9fed4be95b2289322d46f037a18d142e9da91b68))
* **package.json:** update uuid package ([64a771b](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/64a771b3ffbba3a3d07fa85ec6fc56f1061a7aea))

<a name="4.0.2"></a>
## [4.0.2](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v4.0.0...v4.0.2) (2020-05-02)


### Bug Fixes

* **amqp/connection.js:** map call wasn't returning values for caPaths ([feb76f6](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/feb76f6))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/Foo-Foo-MQ/foo-foo-mq/compare/v4.0.0...v4.0.1) (2020-05-02)


### Bug Fixes

* **amqp/connection.js:** map call wasn't returning values for caPaths ([feb76f6](https://github.com/Foo-Foo-MQ/foo-foo-mq/commit/feb76f6))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/zlintz/foo-foo-mq/compare/v3.0.0...v4.0.0) (2019-12-11)


### Bug Fixes

* **.travis.yml:** amqplib only works for {"node":">=0.8 <=12"} ([2090256](https://github.com/zlintz/foo-foo-mq/commit/2090256))
* **noreplyqueue.spec.js:** change var to let and increase timout to match batch ack time ([3f77e4d](https://github.com/zlintz/foo-foo-mq/commit/3f77e4d))
* **package.json:** correct engines to allow greater than eqaul to LTS versions of node ([4867af5](https://github.com/zlintz/foo-foo-mq/commit/4867af5))
* **package.json:** dependency updates for npm audit ([33d162c](https://github.com/zlintz/foo-foo-mq/commit/33d162c))
* **request.spec.js:** fix scatter-gather flaky test ([c1eb8f3](https://github.com/zlintz/foo-foo-mq/commit/c1eb8f3))
* **wildcardtypes.spec.js:** fix flaky wildcard test ([63eee3d](https://github.com/zlintz/foo-foo-mq/commit/63eee3d)), closes [#4](https://github.com/zlintz/foo-foo-mq/issues/4)


### Features

* **package.json:** only support LTS node versions, >=10 ([5dd8e90](https://github.com/zlintz/foo-foo-mq/commit/5dd8e90))


### BREAKING CHANGES

* **package.json:** Node version >=10 now required



<a name="2.1.0"></a>
# [3.0.0](https://github.com/zlintz/foo-foo-mq)
Initial take over of Rabbot with doc changes, matches 2.1.0 of rabbot 

<a name="2.1.0"></a>
# [2.1.0](https://github.com/zlintz/foo-foo-mq/compare/v1.1.0...v2.1.0) (2018-02-18)


### Bug Fixes

* ([#104](https://github.com/arobson/rabbot/issues/104)) improve poison message handling ([9d5ccc3](https://github.com/arobson/rabbot/commit/9d5ccc3))
* ([#109](https://github.com/arobson/rabbot/issues/109)) randomize initial connection index based on pid or hostname ([2d6f372](https://github.com/arobson/rabbot/commit/2d6f372))
* ([#74](https://github.com/arobson/rabbot/issues/74)) correct errors in direct reply queue implementation ([cccdf09](https://github.com/arobson/rabbot/commit/cccdf09))
* ([#78](https://github.com/arobson/rabbot/issues/78)) make it possible to handle messages from a unique queue using the alias/friendly name ([50045a8](https://github.com/arobson/rabbot/commit/50045a8))
* correct issue where publishes and requests before connection or configuration had completed would get lost ([1f58c0b](https://github.com/arobson/rabbot/commit/1f58c0b))
* remove remaining lodash references in core that got missed ([9aa3b04](https://github.com/arobson/rabbot/commit/9aa3b04))


### Features

* ([#87](https://github.com/arobson/rabbot/issues/87)) add support for scatter-gather pattern via request ([db23b48](https://github.com/arobson/rabbot/commit/db23b48))
* ([#93](https://github.com/arobson/rabbot/issues/93)) add support for bulkPublish operation ([d2df5ea](https://github.com/arobson/rabbot/commit/d2df5ea))
* add support for purging queues ([19a678d](https://github.com/arobson/rabbot/commit/19a678d))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/arobson/rabbot/compare/v1.1.0...v2.1.0) (2018-02-18)


### Bug Fixes

* ([#104](https://github.com/arobson/rabbot/issues/104)) improve poison message handling ([9d5ccc3](https://github.com/arobson/rabbot/commit/9d5ccc3))
* ([#109](https://github.com/arobson/rabbot/issues/109)) randomize initial connection index based on pid or hostname ([2d6f372](https://github.com/arobson/rabbot/commit/2d6f372))
* ([#74](https://github.com/arobson/rabbot/issues/74)) correct errors in direct reply queue implementation ([cccdf09](https://github.com/arobson/rabbot/commit/cccdf09))
* ([#78](https://github.com/arobson/rabbot/issues/78)) make it possible to handle messages from a unique queue using the alias/friendly name ([50045a8](https://github.com/arobson/rabbot/commit/50045a8))
* correct issue where publishes and requests before connection or configuration had completed would get lost ([1f58c0b](https://github.com/arobson/rabbot/commit/1f58c0b))


### Features

* ([#87](https://github.com/arobson/rabbot/issues/87)) add support for scatter-gather pattern via request ([db23b48](https://github.com/arobson/rabbot/commit/db23b48))
* ([#93](https://github.com/arobson/rabbot/issues/93)) add support for bulkPublish operation ([d2df5ea](https://github.com/arobson/rabbot/commit/d2df5ea))
* add support for purging queues ([19a678d](https://github.com/arobson/rabbot/commit/19a678d))




# rabbot

## 2.0.0

 * Allow publisher confirms to be turned off per exchange
 * Moving towards ES6 features
 * Clean up cases where arguments were being re-written (perf issue)
 * Reduce cases where properties are introduced to hashes after instantiation (perf issue)
 * Rewrite tests into single modules with individual config to make contributing & maintenance easier
 * Move build system to Travis
 * Use coveralls to track code coverage
 * Remove lodash dependency
 * Remove when dependency
 * Change logging to bole
 * Change commit style to conventional commits
 * Adopt semistandard as format style
 * Improve README badges
 * Break docs into multiple docs
 * Add code of conduct
 * Add contributor guidelines
 * #80 - fixes issue where multiple messages were nack'd in nobatch mode
 * #42 - fixes issue regarding broken build status
 * Fixes for: #120, #107, #97, #42

## 1.0.x

### 1.1.0
 * feature (#72) - support sending persistent messages to default exchanges (thanks @bmatson!)
 * feature (#66) - support passing SSL certs as string (thanks @mrfelton!)
 making progress callback an optional argument
 * #71 - leave error handler attached to connection object to try and prevent errors from being thrown from the AMQP library
 * #69 - fixes an issue where the `*.connection.configured` event was not correctly being raised
 * #64 - added mention of `deadLetterRoutingKey` option to queue declaration
 * #57 - fixes (with breaking change) by removing dependency on deprecated when feature and

### 1.0.8
 * #52 - serialize arrays as JSON by default
 * Change connection timeout to default to 2 seconds
 * #49 - bug fix for exchange recreation when reconnecting
 * #33, #54 - bug fixes around graceful shutdown

### 1.0.7
 * #50 - deleting queue after starting subscription causes channel error
 * bug fix - ensure correct SNI is used with SSL connections when using multiple endpoints
 * improvement - switch UUID lib to `uuid` since `node-uuid` is deprecated

### 1.0.6
 * #38 - Correct race conditions in queueFsm and exchangeFsm causing errors during reconnection
 * #37 - Add ability to capture Rabbit generated queue names
 * #36 - Make options optional for addExchange and addQueue
 * #19 - Add support for publishing arrays directly (as buffers)
 * Added Drone build
 * Update dependencies to latest
 * Defect - queues and exchanges with the same name shared channels causing serious problems
 * Improvement - add support for default exchange
 * Improvement - changed from jshint to eslint

### 1.0.5

 * Improvement - remove Vagrant in favor of just using Dockerfile, updated instructions

### 1.0.4

 * Bug Fix - Publish no longer throws errors if made before calling addConnection or configure or if exchange does not exist

### 1.0.3

 * Bug Fix - #26 - fixed a bug preventing `bindQueue` from working on unique queues
 * Bug Fix - #22 - addConnection did not return a promise (thanks @mkozjak)
 * Enhancement - publishing a number as a body gets converted to a string (thanks @brandonpsmith)
 * Enhancement - routing keys can be changed on binding (thanks @droidenator)

### 1.0.2

 * Bug fix - corrected bug causing connection.unreachable event not to be prefixed with connection name correctly (thanks @Cyri-L)

### 1.0.1

* Bug fix - uri parsing should not including leading slash between host specification and vhost
* Add section to README about logging

* Feature - add default and custom strategies for returned mandatory messages

### 1.0.0 - issues addressed from wascally
 * 103 - gulp test no longer throws expect.js errors
 * 111 - support exclusive subscriptions when calling `startSubscription`
 * 112 - add `shutdown` method to allow node to exit
 * 116 - support multiple serializers
 * 119, 115, 107 - resubscribe to all previously subscribed queues after reconnect
 * 121 - `rejectUnhandled` should now correctly reject unhandled messages
 * 122 - guarantee support for type and routing keys set to `''`
 * Feature - `unique` property on queue creation allows for "single use" exclusive queues with TTL
 	* "hash" adds a numeric value
 	* "id" uses client id for clearer ownership
 * Feature - add machine and process info to connection properties for easier identification in management console
 * Feature - consumer tags are now based on "client id"
 * Feature - handlers can now be scoped/limited by queue name
 * Feature - allow custom limits for deferred published messages
 * Feature - add support for AMQP URIs when defining connections
 * Feature - add ability to stop a running subscription to the queue
 * Improvement - use "client id" to create response queue names
 * Improvement - more warning level logging around channel and connection disruption
 * Improvement - ensure UTC timestamps are put on published messages
 * Improvemet - reject `reply` promise with error if no `replyTo` address is provided
 * Improvement - set appId to "client id" on publish
 * Improvement - introduce limit to the number of messages an exchange will cache waiting for a connection
 * Improvement - handle blocked and unblocked broker events internally
 * Improvement - limit the number of messages stored per exchange while waiting on a connection
 * Bug fix - do not resolve close on connection until all publishes have been confirmed
 * Bug fix - use reject instead of nack when queues are in noBatch
 * Bug fix - noop nacks and rejections when consuming in no-ack mode
 * Bug fix - channels closed by the broker should still be re-acquired with redefined primitives
 * Bug fix - check for existence of headers before checking for direct-reply-to header. Thanks Matt Young (@mashu-daishi)
 * Breaking - no longer recover automatically from a user terminated connection
 * Breaking - limit number/duration of connection retries
 * Breaking - messages are not auto-re-published when a connection or channel fails

#### Significant or Breaking changes
 * reply signature has changed to support control over serialziation
 * response queues are named very differently, shouldn't break code, but worth noting
 * `wascally.iomonad` logging namespace changed to `wascally.io`
 * timeouts added to requests

# wascally - preserved for history

## 0.2.*

### 0.2.10
 * 107 - Correct improper connection timeout configuration and update README
 * Update dependencies to latest versions
 * Use latest whistlepunk log api

### 0.2.9
 * 91 - Provide publish timeout
 * 98 - No-op duplicate exchange, queue and binding declarations
 * 96 - Fall back to routing key if no type is provided for routing
 * 94 - Update amqplib dependnecy to 0.4.0 to support Node 4
 * 77 - Add explanation of connection events
 * 95 - Add test coverage for wildcards in handle
 * Change log namespaces to use '.' delimiter instead of ':'
 * Add example for VirtualBox in Vagrantfile.sample - thanks, @josephfrazier
 * Correct configuration and README regarding ports, credentials, and clustering - thanks again, @josephfrazier

### 0.2.8
 * Bug fix - Resolve issue #64 working with node-config no longer throws exceptions by avoiding `get` call
 * Minor improvement to README to better explain publish promises

### 0.2.7
 * Bug fix - correct memory leak in req/res by leveraging new postal feature

### 0.2.6
 * Bug fix - calling destroy on a queue or exchange should defer until they are in ready state.
 * Update machine and monologue versions
 * Remove when.promise and event handles in favor of deferred promises and transitions

### 0.2.5

 * 65 - Bug Fix: setting replyQueue to false caused publish to fail silently.
 * 63 - Add `uri` property to connection object emitted for 'connected' event.
 * 61 - Bug Fix: correct SSL URIs - thanks, @longplay
 * Improvements to connection clean up (specifically around resolving outstanding messages on queues)
 * ConnectionFSM - Only emit 'connected' when establishing a new connection, use 'already-connected' otherwise.

### 0.2.4
Thanks to @dvideby0 and @neverfox for identifying and providing code to help reproduce bugs 39 and 57.

 * 39, 57 - Bug fix: acking responses did not resolve them causing them to pile up in a response queue
 * Bug fix: setting replyQueue to false throws exceptions
 * Bug fix: replying from a service with replyQueue set to false fails
 * Spec update - request spec in integration tests failed to ack messages causing closeAll to hang

### 0.2.3
 * 47 - Added support for `noBatch` to queues, thanks @derickbailey!
 * 45 - Bug fix: port option was being ignored, thanks @esatterwhite

### 0.2.2
Bug fix - `bindExchanges` flat out broken. Thanks to @leobispo for the catch & fix.

### 0.2.1

Special thanks to @neverfox for finding and reportig 38 & 39 - both serious problems and very difficult to find/reproduce in any kind of automated test.

 * 38, 39 - I/O getting blocked when publishing at high frequencies (think for/while loops).
 	* Removed one-time `failed` event handler from publish call
 	* Cache reject callbacks from publish
 	* On publish confirmation, remove reject from deferred array
 	* On exchange connection failure, invoke all rejects in deferred array
 * 37 - document use of close and closeAll calls
 * Correct improper use of .then( null, ... ) which was creating additional promises.
 * Update whistlepunk version
 * Include biggulp to simplify the gulpfile (yay?)

### 0.2.0

 * Add logging support via whistlepunk
 * Add logging statements to assist with troubleshooting/debugging
 * 24 - Connection should not close until after all queues have completed batch processing (only applies to user initiated connection shutdown)
 * 30 - Escape passwords to be connection URI safe
 * 17, 19 - Unhandled messages
  * Nack unhandled messages by default
  * Provide configurable strategies for handling unhandled messages
 * 26 - Support custom reply queue definitions per connection
 * Add behavioral specs to improve coverage and testing story
 * Fix bug in `reject` batching implementation
 * Refactor of exchange and queue implementation into channel behavior and FSM
 * Reject exchange and queue creation promises on failure
 * Reject publish and subscribe calls on failed exchanges and queues
 * Bug fix - closing a connection didn't reliably clean up channels, exchanges and queues
 * Bug fix - a failed connection that had been closed would continue to attempt reconnecting in the background
 * Bug fix - configure doesn't reject the promise if a connection cannot be established

### prerelease 8
 * Add connection timeout
 * Add @derickbailey to contributor list

### prerelease 7
 * Add demos and documentation to better explain handlers
 * Allow replies to provide a `replyType` without specifying `more` parameter
 * Add support for per-message expiration
 * Add support for reject (nack without re-queue)
 * Code clean-up / addressing linting errors
 * Fix README issues
 * Correct typo in spec
 * Code clean-up / addressing linting errors
