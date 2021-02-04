const { Observable } = require("rxjs");
const { filter, map } = require("rxjs/operators");

const Redis = require("ioredis");

const environment = require("../../config/environment");

const options = {
  host: environment.redis.host,
  port: environment.redis.port,
};

module.exports = class {
  constructor() {
    this.redisSubscriber = new Redis({
      ...options,
      connectTimeout: 10000,
    });

    this.redisPublisher = new Redis(options);
  }

  fromEvent(eventName) {
    this.redisSubscriber.subscribe(eventName);

    return Observable.create((observer) => {
      this.redisSubscriber.on("message", (channel, message) =>
        observer.next({ channel, message })
      );
    }).pipe(
      filter(({ channel }) => channel === eventName),
      map(({ message }) => JSON.parse(message))
    );
  }

  async publish(channel, value) {
    return new Promise((resolve, reject) => {
      return this.redisPublisher.publish(
        channel,
        JSON.stringify(value),
        (error, reply) => (error ? reject(error) : resolve(reply))
      );
    });
  }
};
