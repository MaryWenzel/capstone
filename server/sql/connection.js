const mysql = require("mysql");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 10,
        host: "35.226.140.185",
        user: "root",
        password: "Ponyboy3",
        database: "recipes",
      });

      if (process.env.NODE_ENV === `production` && process.env.CLOUD_INSTANCE) {
        console.log(`connect socket: ${process.env.CLOUD_INSTANCE}`);
        config.socketPath = `/cloudsql/${process.env.CLOUD_INSTANCE}`;
      }

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
