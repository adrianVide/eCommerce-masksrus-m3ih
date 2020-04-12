const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password, shippingAddress} = req.body;

  if (!email || !password || !shippingAddress) next(createError(400));
  else next();
}
