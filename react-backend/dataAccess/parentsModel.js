const sequelizeConnection = require("../dataAccess/da");
const Sequelize = require("sequelize");
const Parent = sequelizeConnection.define("Parent", {});
module.exports = Parent;
