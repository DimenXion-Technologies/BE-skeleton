import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

class File extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

File.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mime: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]],
      },
      comment:
        '1: Processed sucess rows and deleted rows that has errors, 2: Processed sucess rows and kept rows that has errors, 3: Skipped processing for all rows(Removed temporarily saved records from temp_freight_rate table)',
    },
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    timestamps: true,
  }
);

export default File;
