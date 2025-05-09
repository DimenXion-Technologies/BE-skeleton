import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { getUniqueString } from '../utils/common';

class Shipment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.File, { foreignKey: 'file_id' });
  }
}

Shipment.init(
  {
    id: {
      type: DataTypes.STRING,
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
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrier: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pod: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Proof of Delivery',
    },
    price_20_gp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "20'GP cost",
    },
    price_40_gp: {
      type: DataTypes.INTEGER,
      comment: "40'GP cost",
    },
    etd_from: {
      type: DataTypes.STRING(10),
    },
    etd_to: {
      type: DataTypes.STRING(10),
    },
  },
  {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipments',
    timestamps: true,
  }
);

// Add instance method to handle retries for unique constraint errors
Shipment.prototype.save = async function (options = {}) {
  try {
    return await Model.prototype.save.call(this, options);
  } catch (error) {
    if (
      error.name === 'SequelizeUniqueConstraintError' &&
      error.errors.some((e) => e.path === 'id')
    ) {
      // Generate new ID and retry
      this.id = getUniqueString();
      return this.save(options);
    }
    throw error;
  }
};

export default Shipment;
