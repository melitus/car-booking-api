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
        user_id: Sequelize.UUID,
      },
      {
        sequelize,
      },
    );

    this.tableName = 'Car';

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', targetKey: 'id' });
  }
}

export default Car;
