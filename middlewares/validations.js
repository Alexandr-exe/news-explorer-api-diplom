const { celebrate, Joi } = require('celebrate');
const linkValidator = require('../helpers/linkValidation');

const validateUserCreatBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).required(),
  }),
});

const validationLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).required(),
  }),
});

const validationPostArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(linkValidator).required(),
    image: Joi.string().custom(linkValidator).required(),
  }),
});

const validationDeleteArticleBody = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserCreatBody,
  validationLoginBody,
  validationPostArticleBody,
  validationDeleteArticleBody,
};
