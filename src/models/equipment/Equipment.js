import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class Equipment extends Model {
  static associate(models) {
    this.belongsTo(models.Department, { foreignKey: 'department_id' });
    this.belongsTo(models.EquipmentType, { foreignKey: 'equipment_type_id' });
    this.belongsTo(models.Vendor, { foreignKey: 'vendor_id' });
  }
}

Equipment.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    serial_number: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    model: {
      type: DataTypes.STRING(100),
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `${TABLE_PREFIX.EQUIPMENT}departments`,
        key: 'id',
      },
    },
    equipment_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `${TABLE_PREFIX.EQUIPMENT}equipment_types`,
        key: 'id',
      },
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `${TABLE_PREFIX.EQUIPMENT}vendors`,
        key: 'id',
      },
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    warranty_expiry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'under_maintenance', 'decommissioned'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Equipment',
    tableName: `${TABLE_PREFIX.EQUIPMENT}equipments`,
  }
);

export default Equipment;
