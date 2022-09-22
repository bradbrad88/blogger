const loggedIn = (req, res, next) => {
  res.locals.logged_in = !!req.session.user_id;
  console.log(req.session.user_id);
  next();
};

module.exports = loggedIn;
