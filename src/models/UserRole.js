import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

class UserRole extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Role, { foreignKey: 'role' });
  }
}

UserRole.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'role'],
      },
    ],
  }
);

export default UserRole;
