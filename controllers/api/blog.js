const { Blog, Comment } = require("../../model");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
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
    console.log(req.body);
    console.log(user_id, blog_id, content);
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

module.exports = router;
