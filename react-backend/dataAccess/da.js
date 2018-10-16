const Sequelize = require("sequelize");
class dbConnect {
  constructor() {
    this.sequelize = new Sequelize(
      "mysql://guymuroch:179365477@35.224.144.210/projectDB"
    );
    this.start();
  }
  start() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });
  }
}
const sequelizeConnection = new dbConnect().sequelize;

module.exports = sequelizeConnection;
