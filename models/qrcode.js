/**
 * Created by cesarcruz on 3/10/15.
 * QRCODE Model
 */

exports.module = function(sequelize, DataTypes) {
    return sequilize.define('QRCOde', {
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
        }
    }, {
        freezeTableName : true,
        timestamps : true
    });
};
