const { Sequelize } = require("sequelize");
const path = require("path");

// Use SQLite and store the database in a file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../scraperDB.sqlite"), // database file
  logging: false, // disable logging
});

module.exports = { sequelize };
