'use strict';
module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        name: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        underscored: true,
        tableName: 'role',
        modelName: 'role',
        sequelize: sequelize
    });
    return Role;
};