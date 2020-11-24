import Sequelize from 'sequelize';

import dbConfig from '../config';

import Car from '../api/v1/car';
import User from '../api/v1/user';

const models = [Car, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig.db);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
