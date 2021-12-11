const { updateUserLimit } = require('../../utils/rateLimiter');

const updateUserLimitInRedis = async (params) => {
  const { userId, limit } = params;
  await updateUserLimit({
    userId, requestLeft: limit, renewLimit: true, maxLimit: limit,
  });
};

module.exports = { updateUserLimitInRedis };
