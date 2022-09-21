const router = require("express").Router();
const { Blog, User, Comment } = require("../model");

router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({
    include: [{ model: User, as: "author" }, { model: Comment }],
  });
  const blogs = blogData.map(model => model.get({ plain: true }));
  res.render("homepage", { blogs });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

module.exports = router;
