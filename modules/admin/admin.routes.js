const router = require('express').Router();
const { updateUserLimit } = require('./admin.controller');
const { authenticate, authorize } = require('../../utils/jwt');
const { ROLES } = require('../../utils/constants');

router.post('/update-user-limit', authenticate, authorize(ROLES.ADMIN), updateUserLimit);

module.exports = router;
