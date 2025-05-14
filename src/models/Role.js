import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

class Role extends Model {
  static associate(models) {
    this.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'role',
      otherKey: 'permission',
    });

    this.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'role',
      otherKey: 'user_id',
    });
  }
}

Role.init(
  {
    role: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the string isn't empty
      },
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false,
  }
);

export default Role;
