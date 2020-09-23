const Article = require('../models/article');
const ForbbienError = require('../errors/ForbbienError');

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
  const {
    keyword, title, text, date, source, link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .populate('owner')
    .orFail((error) => error)
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbbienError('доступ запрещён');
      }
      return article.remove()
        .then(() => {
          res.send({ delete: article });
        });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
};
