'use strict';
module.exports = (sequelize, DataTypes) => {
    var Counter = sequelize.define('Counter', {
        brand: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: true },
        type_id: { type: DataTypes.INTEGER },
        store_id: { type: DataTypes.INTEGER},
    }, {
        underscored: true,
        tableName: 'counter',
        modelName: 'counter',
        sequelize: sequelize
    });
    return Counter;
};