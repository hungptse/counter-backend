'use strict';
module.exports = (sequelize, DataTypes) => {
    var Invoice = sequelize.define('Invoice', {
        store_id: { type: DataTypes.INTEGER},
        time: { type: DataTypes.DATE},
        type_id: { type: DataTypes.INTEGER },
        price: { type: DataTypes.INTEGER },
        snap_image: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        underscored: true,
        tableName: 'invoice',
        modelName: 'invoice',
        sequelize: sequelize
    });
    return Invoice;
};