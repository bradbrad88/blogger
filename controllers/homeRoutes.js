const router = require("express").Router();

const { Blog, User, Comment } = require("../model");
const HandledError = require("../error/Error");

router.get("/", async (req, res, next) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, as: "author" }, { model: Comment }],
    });
    const blogs = blogData.map(model => model.get({ plain: true }));
    res.render("homepage", { blogs });
  } catch (error) {
    next(error);
  }
});

router.get("/signup", async (req, res, next) => {
  try {
    res.render("signup");
  } catch (error) {
    next(error);
  }
});

router.get("/blog/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment, include: [{ model: User }] }],
    });
    if (!blog) next(HandledError.notFound());
    res.render("blog", { ...blog.get({ plain: true }) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
