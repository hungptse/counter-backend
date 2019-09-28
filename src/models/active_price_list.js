'use strict';
module.exports = (sequelize, DataTypes) => {
    var ActivePriceList = sequelize.define('ActivePriceList', {
        plist_id: { type: DataTypes.INTEGER },
        store_id: { type: DataTypes.INTEGER },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'active_price_list',
        modelName: 'active_price_list',
        sequelize: sequelize
    });
    return ActivePriceList;
};
