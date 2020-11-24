import Sequelize from 'sequelize';

import dbConfig from '../config';

import User from '../api/v1/user';
import Car from '../api/v1/car';

const models = [User, Car];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig.db.development);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
