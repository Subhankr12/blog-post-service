const { checkAndLoginUser, createUser } = require('./auth.helper');
const { successResponse, errorResponse } = require('../../utils/response.helper');
const { ROLES } = require('../../utils/constants');

const loginUser = async (req, res) => {
  try {
    req.validate('body', {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    }, ['email', 'password']);
    const { email, password } = req.body;
    const userData = await checkAndLoginUser({ email, password });
    if (!userData || !userData.token) {
      const error = { code: 401, message: 'Invalid username and password' };
      throw error;
    }
    return successResponse({ res, data: userData, message: 'Successfully logged in' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const registerUser = async (req, res) => {
  try {
    req.validate('body', {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      username: { type: 'string' },
    }, ['email', 'password', 'username']);
    const { email, password, username } = req.body;
    await createUser({ email, password, username });
    return successResponse({ res, message: 'Account created' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const registerAdmin = async (req, res) => {
  try {
    req.validate('body', {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      username: { type: 'string' },
    }, ['email', 'password', 'username']);
    const { email, password, username } = req.body;
    const roles = [ROLES.ADMIN];
    await createUser({
      email, password, username, roles,
    });
    return successResponse({ res, message: 'Account created' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = { loginUser, registerUser, registerAdmin };
