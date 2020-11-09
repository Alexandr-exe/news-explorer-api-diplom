const router = require('express').Router();
const { userInfo } = require('../controllers/users');

router.get('/me', userInfo);

module.exports = router;
