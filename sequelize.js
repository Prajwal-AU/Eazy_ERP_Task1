const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("eazy_erps", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

const User = sequelize.define("User", {
  fname: { type: DataTypes.STRING, allownull: false },
  lname: { type: DataTypes.STRING, allownull: true },
  email: { type: DataTypes.STRING, allownull: false, unique: true },
  password: { type: DataTypes.STRING, allownull: false },
});

sequelize
  .sync()
  .then(console.log("Connected via sequelize"))
  .catch((err) => console.log(err));

module.exports = { sequelize, User };
