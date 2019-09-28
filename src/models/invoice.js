'use strict';
module.exports = (sequelize, DataTypes) => {
    var Invoice = sequelize.define('Invoice', {
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        counter_id: { type: DataTypes.INTEGER},
        type_id: { type: DataTypes.INTEGER },
    }, {
        underscored: true,
        tableName: 'invoice',
        modelName: 'invoice',
        sequelize: sequelize
    });
    return Invoice;
};