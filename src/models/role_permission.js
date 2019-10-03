'use strict';
module.exports = (sequelize, DataTypes) => {
    var RolePermission = sequelize.define('RolePermission', {
        role_id: { type: DataTypes.INTEGER },
        permission_name: { type: DataTypes.STRING },
        is_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'role_permission',
        modelName: 'role_permission',
        sequelize: sequelize
    });
    return RolePermission;
};