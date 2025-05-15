import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';
import TABLE_PREFIX from '../../constants/model-table-prefix.js';

class Country extends Model {
  static associate(models) {
    this.hasMany(models.State, {
      foreignKey: 'country_id',
      as: 'states',
    });

    this.hasMany(models.Address, {
      foreignKey: 'country_id',
      as: 'address',
    });
  }
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(52),
      allowNull: false,
    },
    alpha2: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    alpha3: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(8),
    },
    sub_region: {
      type: DataTypes.STRING(31),
    },
    code: {
      type: DataTypes.STRING(3),
    },
    iso_3166_2: {
      type: DataTypes.STRING(13),
    },
    intermediate_region: {
      type: DataTypes.STRING(15),
    },
    region_code: {
      type: DataTypes.STRING(3),
    },
    sub_region_code: {
      type: DataTypes.STRING(3),
    },
    intermediate_region_code: {
      type: DataTypes.STRING(3),
    },
  },
  {
    sequelize,
    modelName: 'Country',
    tableName: `${TABLE_PREFIX.EQUIPMENT}countries`,
    timestamps: false,
  }
);

export default Country;
