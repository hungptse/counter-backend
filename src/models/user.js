'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        device_id: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING ,allowNull: false, unique: true},
        password: { type: DataTypes.STRING },
        gender : {type : DataTypes.BOOLEAN },
        phone_number : {type : DataTypes.STRING},
        role_id : {type : DataTypes.INTEGER},
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        underscored: true,
        tableName: 'user',
        modelName: 'user',
        sequelize: sequelize
    });
    return User;
};