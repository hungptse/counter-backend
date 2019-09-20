import { Model, DataTypes } from "sequelize";
import database from "./index";
class Company extends Model { };
Company.init({
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    underscored: true,
    tableName : 'company',
    modelName : 'company',
    sequelize :  database
});
export default Company;