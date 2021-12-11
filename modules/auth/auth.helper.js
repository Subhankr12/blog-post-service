const { UserModel } = require('../../models');
const { createToken } = require('../../utils/jwt');

const checkAndLoginUser = async (params) => {
  const { email, password } = params;
  const userData = await UserModel.findOne({ email }).lean();
  if (!userData) return null;
  const { _id: userId, password: userPassword } = userData;
  if (userData && password === userPassword) {
    const token = createToken(userId, email);
    userData.token = token;
    delete userData.password;
  }
  return userData;
};

const createUser = async (params) => {
  const {
    email, password, username, roles,
  } = params;
  const user = new UserModel({
    email, password, username, roles,
  });
  await user.save();
};

module.exports = { checkAndLoginUser, createUser };
