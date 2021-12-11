/* eslint-disable no-underscore-dangle */
const { BlogModel } = require('../../models');

const getBlogs = async (params) => {
  const { userId, title } = params;
  const filterObj = { isDeleted: { $ne: true } };
  if (userId) filterObj.userId = userId;
  if (title) filterObj.title = title;
  const projectObj = { title: 1, userId: 1 };
  const populateObj = { path: 'userId', select: 'username' };
  const sortObj = { _id: 1 };
  const data = await BlogModel.find(filterObj, projectObj)
    .sort(sortObj).populate(populateObj).lean();
  return data;
};

const getBlogDetails = async (params) => {
  const { id } = params;
  const matchObj = { _id: id, isDeleted: { $ne: true } };
  const populateObj = { path: 'userId', select: 'username' };
  const data = await BlogModel.findOne(matchObj).populate(populateObj).lean();
  return data;
};

const createNewBlog = async (params) => {
  const { title, content, userId } = params;
  const blog = new BlogModel({
    title,
    content,
    userId,
  });
  await blog.save();
};

const updateBlogData = async (params) => {
  const { id, title, content } = params;
  const matchObj = { _id: id };
  const updateObj = { title, content };
  await BlogModel.updateOne(matchObj, updateObj);
};

const deleteBlogData = async (params) => {
  const { id } = params;
  const matchObj = { _id: id };
  const updateObj = { isDeleted: true };
  await BlogModel.updateOne(matchObj, updateObj);
};

module.exports = {
  createNewBlog,
  getBlogs,
  getBlogDetails,
  updateBlogData,
  deleteBlogData,
};
