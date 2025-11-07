// models/Profile.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index").sequelize;

const Profile = sequelize.define("Profile", {
  name: {
    type: DataTypes.STRING,
    allowNull: true, // name may come from LinkedIn scraping
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true, // bio may come from LinkedIn scraping
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  followerCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  connectionCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bioLine: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicUrl: {
    type: DataTypes.STRING,
    allowNull: true, // optional field if you scrape profile picture
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: true, // optional field if you scrape LinkedIn headline
  },
});

module.exports = Profile;
