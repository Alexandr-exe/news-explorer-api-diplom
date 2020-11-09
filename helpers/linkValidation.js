const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const linkValidator = (link) => {
  if (!validator.isURL(link)) {
    throw new BadRequest('link is not valid');
  }
  return link;
};

module.exports = linkValidator;
