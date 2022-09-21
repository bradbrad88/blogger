const { Blog } = require("../model");

const seedBlog = async userId => {
  const blogs = [
    {
      title: "My first blog",
      user_id: userId,
      text: "A really cool blog post",
    },
    {
      title: "My second blog",
      user_id: userId,
      text: "A some-what cool blog post",
    },
    {
      title: "My fourth blog",
      user_id: userId,
      text: "A mildly cool blog post",
    },
  ];

  const blogModels = await Blog.bulkCreate(blogs);
  return blogModels.map(model => model.id);
};

module.exports = seedBlog;
