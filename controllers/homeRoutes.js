const router = require("express").Router();

const { Blog, User, Comment } = require("../model");
const HandledError = require("../error/Error");

router.get("/", async (req, res, next) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
      order: [["updatedAt", "desc"]],
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
    const { id } = req.params;
    const { user_id } = req.session;
    const blogData = await Blog.findByPk(id, {
      include: [{ model: Comment, include: [{ model: User }] }, { model: User }],
    });
    if (!blogData) next(HandledError.notFound());
    const blog = blogData.get({ plain: true });
    res.render("blog", { ...blog, edit_mode: blog.user_id === user_id, disable_hover: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
