const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blog/blog.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
