const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/moestodb';
module.exports.JWT_KEYS = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
