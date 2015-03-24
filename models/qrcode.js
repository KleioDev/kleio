/**
 * Created by cesarcruz on 3/10/15.
 * QRCODE Model
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Qrcode', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true

        },
        size : {
            type : DataTypes.STRING
        },
        text : {
            type : DataTypes.STRING
        },
        url : {
            type : DataTypes.STRING,
            isUrl : true
        },
        image : {
            type : DataTypes.STRING
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps : true
    });
};
