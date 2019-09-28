'use strict';
module.exports = (sequelize, DataTypes) => {
    var CounterType = sequelize.define('CounterType', {
        name: { type: DataTypes.STRING, allowNull: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        underscored: true,
        tableName: 'counter_type',
        modelName: 'counter_type',
        sequelize: sequelize
    });
    return Counter;
};