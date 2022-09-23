const { Blog, Comment } = require("../../model");
const HandledError = require("../../error/Error");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { text, title } = req.body;
    const { user_id } = req.session;
    if (!text || !title) return next(HandledError.badRequest());
    const blog = await Blog.create({ title, text, user_id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.post("/:blog_id/comment", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const { blog_id } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      user_id,
      blog_id,
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.put("/:blog_id", async (req, res, next) => {
  try {
    const { blog_id } = req.params;
    const blog = await Blog.findByPk(blog_id);
    if (!blog) return next(HandledError.notFound());
    if (blog.user_id !== req.session.user_id) return next(HandledError.unauthorised());
    await blog.update(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:blog_id", async (req, res, next) => {
  const { blog_id } = req.params;
  const blog = await Blog.findByPk(blog_id);
  if (!blog) return next(HandledError.notFound());
  if (blog.user_id !== req.session.user_id) return next(HandledError.unauthorised());
  await blog.destroy();
  res.sendStatus(200);
});

module.exports = router;
