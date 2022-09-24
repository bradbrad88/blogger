const { User } = require("../../model");
const { authApi } = require("../../utils/auth");
const HandledError = require("../../error/Error");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.session.save(err => {
      if (err) return next(err);
      req.session.user_id = user.id;
      res.sendStatus(201);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return next(HandledError.badRequest("Missing credentials"));
    const user = await User.findOne({ where: { username } });
    if (!user) return next(HandledError.invalidCredentials());
    const validPassword = user.checkPassword(password);
    if (!validPassword) return next(HandledError.invalidCredentials());
    req.session.save(err => {
      if (err) return next(error);
      req.session.user_id = user.id;
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authApi, async (req, res, next) => {
  try {
    req.session.destroy(err => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
