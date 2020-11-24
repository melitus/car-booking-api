import Sequelize, { Model } from 'sequelize';

class Car extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      },
    );

    this.tableName = 'Car';

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  }
}

export default Car;
