import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: 'mysql',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  timezone: '+09:00',
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


// to use
import { sequelize } from "./config/database";

private connect(): void {
    sequelize
      .sync()
      .then(() => {
        console.log("Sequelize Connection Success!");
      })
      .catch(err => {
        console.error("Sequelize Connection ERROR! ", err);
        process.exit();
      });
  }


  ====
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_geshan-lr',
    password: env.DB_PASSWORD || 'G2VjjQ5d47zyjqX',
    database: env.DB_NAME || 'freedbtech_language',
  },

-------
  module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};