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

module.exports = {
  getArticles,
  postArticle,
};
