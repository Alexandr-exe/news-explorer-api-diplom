const router = require('express').Router();

const { validationPostArticleBody, validationDeleteArticleBody } = require('../middlewares/validations');
const { getArticles, postArticle, deleteArticle } = require('../controllers/article');

router.get('/', getArticles);

router.post('/', validationPostArticleBody, postArticle);

router.delete('/:articleId', validationDeleteArticleBody, deleteArticle);

module.exports = router;
