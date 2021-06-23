import path from 'path';
import * as dotenv from 'dotenv';

const envPath = path.join(
  process.cwd(),
  `.env${!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : `.${process.env.NODE_ENV}`}`,
);

const loadenv = () =>
  dotenv.config({
    path: envPath,
  });

loadenv();

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV || 'production',

  db: {
    development: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      freezeTableName: true,
    },
    test: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    production: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      freezeTableName: true,
    },

    database: {
      host: dbConfig.host,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,

      dialect: 'postgres',
      logging: false,
      sync: {
        force: false,
        logging: false,
        alter: false,
      },
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        charset: 'utf8',
        schema: 'public',
      },
      timezone: 'UTC',
    },
  },

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  algorithms: process.env.ALGORITHM,
  audience: process.env.AUDIENCE,
  issued: process.env.ISSUER,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
};
