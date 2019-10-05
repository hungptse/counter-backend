'use strict';
module.exports = (sequelize, DataTypes) => {
    var Store = sequelize.define('Store', {
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        company_id: { type: DataTypes.INTEGER },
        city: { type: DataTypes.STRING },
    }, {
        underscored: true,
        tableName: 'store',
        modelName: 'store',
        sequelize: sequelize
    });
    return Store;
};
