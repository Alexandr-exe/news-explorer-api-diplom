const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userInfo } = require('../controllers/users');

router.get('/user/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
}), userInfo);

module.exports = router;
