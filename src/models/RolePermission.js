import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

class RolePermission extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role' });
    this.belongsTo(models.Permission, { foreignKey: 'permission' });
  }
}

RolePermission.init(
  {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role',
      },
      onDelete: 'CASCADE',
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'permission',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['role', 'permission'],
      },
    ],
  }
);

export default RolePermission;
