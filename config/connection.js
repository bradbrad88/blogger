const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;
console.log(DATABASE_URL);
if (DATABASE_URL) {
  console.log("Connecting to DB with URL string");
  sequelize = new Sequelize(DATABASE_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    port: 3306,
  });
}

module.exports = sequelize;
