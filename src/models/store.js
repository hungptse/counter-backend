'use strict';
module.exports = (sequelize, DataTypes) => {
    var Store = sequelize.define('Store', {
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        store_id: { type: DataTypes.INTEGER }
    }, {
        underscored: true,
        tableName: 'store',
        modelName: 'store',
        sequelize: sequelize
    });
    return Store;
};
