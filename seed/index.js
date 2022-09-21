// seed all the data
const sequelize = require("../config/connection");
const userSeed = require("./user-seed");
const blogSeed = require("./blog-seed");
const commentSeed = require("./comment-seed");
(async () => {
  await sequelize.sync({ force: true });

  const userId = await userSeed();
  console.log("\n---------- User Seeded ----------\n");

  const blogIds = await blogSeed(userId);
  console.log("\n---------- Blogs Seeded ----------\n");

  await commentSeed(userId, blogIds);
  console.log("\n---------- Blogs Seeded ----------\n");
})();
