import { Sequelize, Model, DataTypes } from "sequelize";
import Configuration from "@core/config";

const sequelize = new Sequelize(Configuration.DB.NAME, Configuration.DB.USERNAME, Configuration.DB.PASSWORD, {
  dialect: 'mysql',
  port: Configuration.DB.PORT,
  host: Configuration.DB.HOST,
  logging: (log) => {
    console.log(log);
  },
  omitNull: true,
  define: {
    underscored: true,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  sync: { force: true },
});
class Company extends Model { };
Company.init({
  name: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  underscored: true,
  tableName : 'company',
  modelName : 'company',
  sequelize :  sequelize
});
class Store extends Model { };
Store.init({
  name: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  underscored: true,
  tableName : 'store',
  modelName : 'store',
  sequelize :  sequelize
});

export default sequelize;
