import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class State extends Model {
  static associate(models) {
    this.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'country',
    });

    this.hasMany(models.Address, {
      foreignKey: 'state_id',
      as: 'address',
    });
  }
}

State.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'State',
    tableName: `${TABLE_PREFIX.EQUIPMENT}states`,
    timestamps: false,
  }
);

export default State;
