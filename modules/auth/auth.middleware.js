const { errorResponse } = require('../../utils/response.helper');
const { UserModel } = require('../../models');

const validateRegistration = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const error = {};
    const emailExists = await UserModel.countDocuments({ email });
    error.code = 409;
    if (emailExists) {
      error.message = 'Email already exists';
      throw error;
    }

    const usernameExists = await UserModel.countDocuments({ username });
    if (usernameExists) {
      error.message = 'Username already exists';
      throw error;
    }
    return next();
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = { validateRegistration };
