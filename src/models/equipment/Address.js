import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class Address extends Model {
  static associate(models) {
    this.belongsTo(models.Vendor, { foreignKey: 'vendor_id' });
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
        model: `${TABLE_PREFIX.EQUIPMENT}countries`,
        key: 'id',
      },
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: `${TABLE_PREFIX.EQUIPMENT}states`,
        key: 'id',
      },
    },
    city: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `${TABLE_PREFIX.EQUIPMENT}vendors`,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: `${TABLE_PREFIX.EQUIPMENT}addresses`,
  }
);

export default Address;
