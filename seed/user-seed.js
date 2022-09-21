const { User } = require("../model");

const seedUser = async () => {
  const user = {
    username: "bradbrad88",
    password: "password",
  };
  const newUser = await User.create(user);
  return newUser.id;
};

module.exports = seedUser;
