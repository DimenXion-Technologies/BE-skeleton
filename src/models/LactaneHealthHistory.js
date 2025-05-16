import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import TABLE_PREFIX from '../constants.js/model-table-prefix.js';

class LactaneHealthHistory extends Model {
  // Define associations here
  static associate(models) {
    this.belongsTo(models.LactaneDonor, {
      foreignKey: 'donor_id',
      as: 'donor',
    });
  }
}

LactaneHealthHistory.init(
  {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: `${TABLE_PREFIX.LACTANE}donor`, // table name of LactaneDonor
        key: 'donor_id', // the primary key in LactaneDonor table
      },
    },
    has_chronic_disease: {
      type: DataTypes.BOOLEAN,
    },
    chronic_disease_details: {
      type: DataTypes.TEXT,
    },
    is_on_medication: {
      type: DataTypes.BOOLEAN,
    },
    medication_details: {
      type: DataTypes.TEXT,
    },
    recent_infections: {
      type: DataTypes.TEXT,
    },
    alcohol_use: {
      type: DataTypes.BOOLEAN,
    },
    tobacco_use: {
      type: DataTypes.BOOLEAN,
    },
    breastfeeding_currently: {
      type: DataTypes.BOOLEAN,
    },
    last_childbirth_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'LactaneHealthHistory',
    tableName: `${TABLE_PREFIX.LACTANE}health_histories`,
  }
);

export default LactaneHealthHistory;
// This model represents the health history of lactane donors.
// It includes information about chronic diseases, medications, infections, and lifestyle factors.
// The model is associated with the LactaneDonor model through a foreign key relationship.
