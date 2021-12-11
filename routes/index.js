const express = require('express');
const adminRoutes = require('../modules/admin/admin.routes');
const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blog/blog.routes');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
