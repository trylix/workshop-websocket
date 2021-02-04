const RedisClient = require("./redis-client");
const RedisPropagator = require("./redis-propagator");

const redisClient = new RedisClient();

module.exports = (beans) => {
  beans.redisClient = redisClient;
  beans.eventPropagator = new RedisPropagator({
    socketState: beans.socketState,
    redisClient,
  });
};
