/**
 * Created by cesarcruz on 3/10/15.
 * QRCODE Model
 */

exports.module = function(sequelize, DataTypes) {
    return sequilize.define('QRCOde', {
        size : {
            type : DataTypes.STRING,
            field : 'size'
        },
        text : {
            type : DataTypes.STRING,
            field : 'text'
        },
        url : {
            type : DataTypes.STRING,
            field : 'url'
        },
        image : {
            type : DataTypes.STRING,
            field : 'image'
        }
    }, {
        freezeTableName : true
    })
}
