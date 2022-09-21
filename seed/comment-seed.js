const { Comment } = require("../model");

const commentSeed = async (userId, blogIds) => {
  const comments = [
    {
      content: "A fancy comment",
      user_id: userId,
      blog_id: blogIds[Math.floor(Math.random() * blogIds.length)],
    },
    {
      content: "Oh my, what a blog",
      user_id: userId,
      blog_id: blogIds[Math.floor(Math.random() * blogIds.length)],
    },
    {
      content: "Whoop, this is great",
      user_id: userId,
      blog_id: blogIds[Math.floor(Math.random() * blogIds.length)],
    },
  ];

  await Comment.bulkCreate(comments);
};

module.exports = commentSeed;
