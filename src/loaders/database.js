import Sequelize from 'sequelize';

import dbConfig from '../config';
import User from '../api/v1/user/user.model';
import Car from '../api/v1/car/car.model';

const models = [User, Car];

class Database {
  constructor() {
    this.initDBConnection();
  }

  initDBConnection() {
    this.connection = new Sequelize(dbConfig.db.development);
    try {
      console.info('SETUP - Connecting database...');
      this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));

    this.connection.sync();
  }
}

export default new Database();
