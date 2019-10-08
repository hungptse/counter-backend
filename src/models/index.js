import { Sequelize, Model, DataTypes } from "sequelize";
import Configuration from "@core/config";
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
var DB = {};
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
  sync: { alter : true },
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    DB[model.name] = model;
  });
Object.keys(DB).forEach(modelName => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});
Object.keys(DB).forEach(name => {
  console.log(name);
  
})
DB.sequelize = sequelize;
module.exports = DB;

