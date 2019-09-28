'use strict';
module.exports = (sequelize, DataTypes) => {
    var Company = sequelize.define('Company', {
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'company',
        modelName: 'company',
        sequelize: sequelize
    });
    return Company;
};