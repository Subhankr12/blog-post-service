const redis = require('./redis');
const { errorResponse } = require('./response.helper');
const { REQUEST_LIMIT, LIMIT_WINDOW, ROLES } = require('./constants');

const updateUserLimit = async (params) => {
  const {
    userId, requestLeft = REQUEST_LIMIT - 1, renewLimit = false, currentRenewalTime,
  } = params;
  const currentTime = new Date();
  const currentEpoch = +currentTime;
  const renewalTime = renewLimit ? currentEpoch + LIMIT_WINDOW * 1000 : currentRenewalTime;

  const data = { requestLeft, limitRenewalTime: renewalTime };
  await redis.set(userId, data);
};

const checkRequestLimit = async (req, res, next) => {
  try {
    const { _id: userId, roles } = req.user;

    if (roles.includes(ROLES.ADMIN)) return next();

    const userLimitData = await redis.get(userId);
    if (!userLimitData) await updateUserLimit({ userId, renewLimit: true });
    else {
      const { requestLeft, limitRenewalTime } = userLimitData;
      const currentEpoch = +(new Date());
      if (currentEpoch > limitRenewalTime) await updateUserLimit({ userId, renewLimit: true });
      else if (requestLeft) {
        await updateUserLimit({
          userId, requestLeft: requestLeft - 1, currentRenewalTime: limitRenewalTime,
        });
      } else {
        const error = { code: 429, message: 'Request Limit Reached' };
        throw error;
      }
    }
    return next();
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = { checkRequestLimit, updateUserLimit };
