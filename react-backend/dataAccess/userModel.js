const sequelizeConnection = require("../dataAccess/da");
const Sequelize = require("sequelize");
const User = sequelizeConnection.define("user", {
  u_name: {
    type: Sequelize.STRING,
    notNull: true
  },
  u_imgUrl: Sequelize.STRING
});

User.hasMany(User, {
  as: "Child",
  foreignKey: "parentId"
});

module.exports = User;
