const { errorResponse } = require('../../utils/response.helper');
const { ROLES } = require('../../utils/constants');
const { BlogModel } = require('../../models');

const validateDeleteBlog = async (req, res, next) => {
  try {
    const { roles, _id: userId } = req.user;
    const { id } = req.body;
    const error = {};
    const blog = await BlogModel.findById(id).select('userId').lean();
    if (!blog) {
      error.code = 404;
      error.message = 'Blog not found';
      throw error;
    }
    const isAdmin = roles.includes(ROLES.ADMIN);
    const isBlogUser = roles.includes(ROLES.USER) && blog.userId.toString() === userId.toString();
    if (!isAdmin && !isBlogUser) {
      error.code = 401;
      error.message = 'You are not allowed to delete this blog';
      throw error;
    }
    return next();
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const validateUpdateBlog = async (req, res, next) => {
  try {
    const { roles, _id: userId } = req.user;
    const { id } = req.body;
    const error = {};
    const blog = await BlogModel.findById(id).select('userId').lean();
    if (!blog) {
      error.code = 404;
      error.message = 'Blog not found';
      throw error;
    }
    const isBlogUser = roles.includes(ROLES.USER) && blog.userId.toString() === userId.toString();
    if (!isBlogUser) {
      error.code = 401;
      error.message = 'You are not allowed to update this blog';
      throw error;
    }
    return next();
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = { validateDeleteBlog, validateUpdateBlog };
