const Article = require('../models/article');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.status(200).send({
        data: article,
      });
    })
    .catch(next);
};

const postArticle = (req, res, next) => {

};

module.exports = {
  getArticles,
  postArticle,
};
