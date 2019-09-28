'use strict';
module.exports = (sequelize, DataTypes) => {
    var CounterTime = sequelize.define('CounterTime', {
        value: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        counter_id: { type: DataTypes.INTEGER },
    }, {
        underscored: true,
        tableName: 'counter_time',
        modelName: 'counter_time',
        sequelize: sequelize
    });
    return CounterTime;
};