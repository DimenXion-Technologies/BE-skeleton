import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class EquipmentType extends Model {
  static associate(models) {
    this.hasMany(models.Equipment, {
      foreignKey: 'equipment_type_id',
      as: 'equipments',
    });
  }
}

EquipmentType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'EquipmentType',
    tableName: `${TABLE_PREFIX.EQUIPMENT}equipment_types`,
    timestamps: false,
  }
);

const pagination = {
  totalRecords: 50,
  currentPage: 3,
  perPage: 5,
  lastPage: 10,
  hasNext: true,
  hasPrev: true,
};

export default EquipmentType;
