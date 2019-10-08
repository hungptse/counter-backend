'use strict';
module.exports = (sequelize, DataTypes) => {
    var PriceDetail = sequelize.define('PriceDetail', {
        plist_id: { type: DataTypes.INTEGER },
        type_id: { type: DataTypes.STRING },
        voltage_level: { type: DataTypes.INTEGER },
        time_type: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        underscored: true,
        tableName: 'price_detail',
        modelName: 'price_detail',
        sequelize: sequelize
    });
    // var PriceDetail = sequelize.define('PriceDetail', {
    //     plist_id: { type: DataTypes.INTEGER },
    //     start_hour: { type: DataTypes.TIME },
    //     end_hour: { type: DataTypes.TIME },
    //     price: { type: DataTypes.INTEGER },
    //     day_of_week: { type: DataTypes.INTEGER },
    //     type_id: { type: DataTypes.STRING },
    //     is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    // }, {
    //     underscored: true,
    //     tableName: 'price_detail',
    //     modelName: 'price_detail',
    //     sequelize: sequelize
    // });
    return PriceDetail;
};
