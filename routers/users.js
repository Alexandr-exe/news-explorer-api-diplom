const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userInfo } = require('../controllers/users');

router.get('/me', userInfo);

module.exports = router;
