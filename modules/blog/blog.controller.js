const {
  createNewBlog, getBlogs, getBlogDetails, updateBlogData, deleteBlogData,
} = require('./blog.helper');
const { successResponse, errorResponse } = require('../../utils/response.helper');

const getBlog = async (req, res) => {
  try {
    req.validate('query', {
      blogId: { type: 'string', format: 'mongoId' },
      userId: { type: 'string', format: 'mongoId' },
      title: { type: 'string' },
    });

    const { title, content, userId } = req.query;
    const blogs = await getBlogs({ title, content, userId });
    return successResponse({ res, data: blogs });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getBlogById = async (req, res) => {
  try {
    req.validate('params', {
      id: { type: 'string', format: 'mongoId' },
    }, ['id']);

    const { id } = req.params;
    const blogs = await getBlogDetails({ id });
    return successResponse({ res, data: blogs });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const createBlog = async (req, res) => {
  try {
    req.validate('body', {
      title: { type: 'string' },
      content: { type: 'string' },
      userId: { type: 'string', format: 'mongoId' },
    }, ['title', 'userId']);

    const { title, content, userId } = req.body;
    await createNewBlog({ title, content, userId });
    return successResponse({ res, message: 'Blog created successfully' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const updateBlog = async (req, res) => {
  try {
    req.validate('body', {
      id: { type: 'string', format: 'mongoId' },
      title: { type: 'string' },
      content: { type: 'string' },
    }, ['id', 'title', 'content']);

    const { id, title, content } = req.body;
    await updateBlogData({ id, title, content });
    return successResponse({ res, message: 'Blog updated successfully' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    req.validate('body', {
      id: { type: 'string', format: 'mongoId' },
    }, ['id']);

    const { id } = req.body;
    await deleteBlogData({ id });
    return successResponse({ res, message: 'Blog deleted successfully' });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
module.exports = {
  createBlog,
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
