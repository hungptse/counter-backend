'use strict';
module.exports = (sequelize, DataTypes) => {
    var Permission = sequelize.define('Permission', {
        name : {type : DataTypes.STRING},
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'permission',
        modelName: 'permission',
        sequelize: sequelize
    });
    return Permission;
};