const { successResponse, errorResponse } = require('../../utils/response.helper');
const { updateUserLimitInRedis } = require('./admin.helper');

const updateUserLimit = async (req, res) => {
  try {
    req.validate('body', {
      userId: { type: 'string', format: 'mongoId' },
      limit: { type: 'number' },
    }, ['userId', 'limit']);

    const { userId, limit } = req.body;
    await updateUserLimitInRedis({ userId, limit });
    return successResponse({ res, message: 'Limit updated successfully' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = { updateUserLimit };
