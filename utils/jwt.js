const jwt = require('jsonwebtoken');
const { JWT_EXPIRE } = require('./constants');
const { UserModel } = require('../models');
const { errorResponse } = require('./response.helper');

const ENV = process.env;
const secretKey = ENV.JWT_SECRET;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = { code: 401, message: 'Unauthorized user' };
      throw error;
    }

    return jwt.verify(token, secretKey, async (err, payload) => {
      try {
        if (err) {
          const error = { code: 403, message: 'Invalid token' };
          throw error;
        }
        const { _id: userId } = payload;
        const user = await UserModel.findById(userId).select('-password');
        req.user = user;
        return next();
      } catch (error) {
        return errorResponse({ res, error });
      }
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const authorize = (...role) => (req, res, next) => {
  try {
    const { user } = req;
    const error = { code: 401 };
    if (!user) {
      error.message = 'User in not authenticated';
      throw error;
    }
    if (!role.some((r) => user.roles.includes(r))) {
      error.message = 'Access denied';
      throw error;
    }
    return next();
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const createToken = (userId, email) => {
  const payload = { _id: userId, email };
  const options = {
    expiresIn: JWT_EXPIRE,
  };
  return jwt.sign(payload, secretKey, options);
};

module.exports = { authenticate, authorize, createToken };
