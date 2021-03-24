const jwt = require('jsonwebtoken');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    error: err.message,
    message: process.env.NODE_ENV === 'production' ? '.' : err.stack,
  });
}

function isToken(req, res, next) {
  if (req.headers.authorization) {
    const secret = process.env.JWT_SECRET_PRIVATE_KEY;
    // eslint-disable-next-line no-unused-vars
    const [bearer, token] = req.headers.authorization.split(' ');

    jwt.verify(token, secret, (error, data) => {
      if (error) {
        return res.status(401).json({
          token: {
            status: 401,
            code: 'TokenIvalid',
            message: 'Token Inválido.',
          },
        });
      }
      req.userAuth = { ...data };
      return null;
    });
    next();
  } else {
    return res.status(403).json({ message: 'Acesso não autorizado.' });
  }
  return null;
}

module.exports = {
  notFound,
  errorHandler,
  isToken,
};
