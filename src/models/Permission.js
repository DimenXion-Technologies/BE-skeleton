import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

class Permission extends Model {
  static associate(models) {
    this.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permission',
      otherKey: 'role',
    });
  }
}

Permission.init(
  {
    permission: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: false,
  }
);

export default Permission;
