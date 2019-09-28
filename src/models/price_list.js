'use strict';
module.exports = (sequelize, DataTypes) => {
    var PriceList = sequelize.define('PriceDetail', {
        store_id: { type: DataTypes.INTEGER },
        name: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'price_list',
        modelName: 'price_list',
        sequelize: sequelize
    });
    return PriceList;
};
