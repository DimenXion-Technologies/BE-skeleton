import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

class LactaneDonor extends Model {
  static associate(models) {
    this.hasMany(models.LactaneHealthHistory, {
      foreignKey: 'donor_id',
      as: 'healthHistories',
    });
  }
}

LactaneDonor.init(
  {
    donor_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    uhid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Female', 'Other'),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
    },
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Active', 'Inactive', 'Disqualified'),
      defaultValue: 'Pending',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'LactaneDonor',
    tableName: 'lactane_donors',
    timestamps: false,
  }
);

export default LactaneDonor;
