const router = require('express').Router();
const {
  createBlog, getBlog, getBlogById, updateBlog, deleteBlog,
} = require('./blog.controller');
const { authenticate } = require('../../utils/jwt');
const { validateDeleteBlog, validateUpdateBlog } = require('./blog.middleware');
const { checkRequestLimit } = require('../../utils/rateLimiter');

router.get('/', authenticate, checkRequestLimit, getBlog);
router.get('/:id', authenticate, checkRequestLimit, getBlogById);
router.post('/', authenticate, checkRequestLimit, createBlog);
router.put('/', authenticate, checkRequestLimit, validateUpdateBlog, updateBlog);
router.delete('/', authenticate, checkRequestLimit, validateDeleteBlog, deleteBlog);

module.exports = router;
