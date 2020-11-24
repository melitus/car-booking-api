import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      },
    );

    this.tableName = 'User';

    return this;
  }

  static associate(models) {
    this.hasMany(models.Car, { foreignKey: 'user_id', onDelete: 'CASCADE', sourceKey: 'id' });
  }
}

export default User;
