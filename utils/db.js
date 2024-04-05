const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(
  "mavenmovies",
  "root",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Disable logging
  }
);

module.exports = sequelize;
//export default sequelize;
