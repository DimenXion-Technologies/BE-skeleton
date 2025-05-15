import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class Department extends Model {
  static associate(models) {
    this.hasMany(models.Equipment, {
      foreignKey: 'department_id',
      as: 'equipments',
    });
  }
}

Department.init(
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
    modelName: 'Department',
    tableName: `${TABLE_PREFIX.EQUIPMENT}departments`,
    timestamps: false,
  }
);

export default Department;
