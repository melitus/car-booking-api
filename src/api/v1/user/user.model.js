import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        email: Sequelize.STRING(),
        password: Sequelize.STRING(),
      },
      {
        sequelize,
      },
    );

    this.tableName = 'User';

    return this;
  }
}

export default User;
