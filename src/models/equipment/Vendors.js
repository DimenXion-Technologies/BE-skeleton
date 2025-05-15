import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class Vendor extends Model {
  static associate(models) {
    this.hasOne(models.Address, { foreignKey: 'address_id' });
    this.hasMany(models.Equipment, {
      foreignKey: 'vendor_id',
      as: 'equipments',
    });
  }
}

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    modelName: 'Vendor',
    tableName: `${TABLE_PREFIX.EQUIPMENT}vendors`,
  }
);

export default Vendor;
