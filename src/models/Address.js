import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';
import TABLE_PREFIX from '../constants.js/model-table-prefix.js';

class Address extends Model {
  static associate(models) {
    this.belongsTo(models.LactaneDonor, { foreignKey: 'donor_id' });
    this.belongsTo(models.Country, { foreignKey: 'country_id' });
    this.belongsTo(models.State, { foreignKey: 'state_id' });
  }
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_line1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.TEXT,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: `${TABLE_PREFIX.LACTANE}countries`,
        key: 'id',
      },
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: `${TABLE_PREFIX.LACTANE}states`,
        key: 'id',
      },
    },
    city: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    donor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `${TABLE_PREFIX.LACTANE}donor`,
        key: 'donor_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: `${TABLE_PREFIX.LACTANE}addresses`,
  }
);

export default Address;
