const router = require("express").Router();
const { Blog } = require("../model");

router.get("/dashboard", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const blogData = await Blog.findAll({
      where: { user_id },
      order: [["updated_at", "DESC"]],
    });
    const blogs = blogData.map(model => model.get({ plain: true }));
    res.render("dashboard", { blogs });
  } catch (error) {
    next(error);
  }
});

router.get("/blog/", async (req, res, next) => {
  try {
    res.render("new-blog");
  } catch (error) {
    next(error);
  }
});

router.get("/blog/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    res.render("new-blog", { ...blog.get({ plain: true }), edit_mode: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
