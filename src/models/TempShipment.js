import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { getUniqueString } from '../utils/common';

class TempShipment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.File, { foreignKey: 'file_id' });
  }
}

TempShipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    file_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    shipment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    row_data: {
      type: DataTypes.JSONB,
      defaultValue: {},
      set: function (value) {
        this.setDataValue('row_data', JSON.stringify(value));
      },
      get: function () {
        const value = this.getDataValue('row_data');
        return value ? JSON.parse(value) : null;
      },
    },
    mapping: {
      type: DataTypes.JSONB,
      defaultValue: {},
      set: function (value) {
        this.setDataValue('mapping', JSON.stringify(value));
      },
      get: function () {
        const value = this.getDataValue('mapping');
        return value ? JSON.parse(value) : null;
      },
    },
    has_errors: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    errors: {
      type: DataTypes.JSONB,
      defaultValue: {},
      set: function (value) {
        this.setDataValue('errors', JSON.stringify(value));
      },
      get: function () {
        const value = this.getDataValue('errors');
        return value ? JSON.parse(value) : null;
      },
    },
  },
  {
    sequelize,
    modelName: 'TempShipment',
    tableName: 'temp_shipment',
    timestamps: true,
  }
);

// Add instance method to handle retries for unique constraint errors
TempShipment.prototype.save = async function (options = {}) {
  try {
    return await Model.prototype.save.call(this, options);
  } catch (error) {
    if (
      error.name === 'SequelizeUniqueConstraintError' &&
      error.errors.some((e) => e.path === 'shipment_id')
    ) {
      // Generate new ID and retry
      this.shipment_id = getUniqueString();
      return this.save(options);
    }
    throw error;
  }
};
export default TempShipment;
