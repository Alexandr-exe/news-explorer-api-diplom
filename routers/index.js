const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateUserCreatBody, validationLoginBody } = require('../middlewares/validations');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateUserCreatBody, createUser);

router.post('/signin', validationLoginBody, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;
