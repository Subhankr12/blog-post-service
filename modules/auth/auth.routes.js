const router = require('express').Router();
const { loginUser, registerUser, registerAdmin } = require('./auth.controller');
const { authenticate, authorize } = require('../../utils/jwt');
const { ROLES } = require('../../utils/constants');
const { validateRegistration } = require('./auth.middleware');

router.post('/login', loginUser);
router.post('/register', validateRegistration, registerUser);
router.post('/register-admin', authenticate, authorize(ROLES.ADMIN), validateRegistration, registerAdmin);

module.exports = router;
