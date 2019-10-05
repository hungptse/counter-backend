'use strict';
module.exports = (sequelize, DataTypes) => {
    var UserStore = sequelize.define('UserStore', {
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        user_id: { type: DataTypes.INTEGER },
        store_id: { type: DataTypes.INTEGER },
    }, {
        underscored: true,
        tableName: 'user_store',
        modelName: 'user_store',
        sequelize: sequelize
    });
    return UserStore;
};
