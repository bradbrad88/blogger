const HandledError = require("../error/Error");
const authApi = (req, res, next) => {
  if (req.session.user_id) return next();
  next(HandledError.unauthorised());
};

const authRender = (req, res, next) => {
  if (req.session.user_id) return next();
  res.redirect("/signup");
};

module.exports = { authApi, authRender };
