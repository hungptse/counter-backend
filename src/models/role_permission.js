'use strict';
module.exports = (sequelize, DataTypes) => {
    var RolePermission = sequelize.define('RolePermission', {
        role_id : {type : DataTypes.INT},
        permission_id : {type : DataTypes.INT},
        is_enable: { type: DataTypes.BOOLEAN, defaultValue: true },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'role_permission',
        modelName: 'role_permission',
        sequelize: sequelize
    });
    return RolePermission;
};