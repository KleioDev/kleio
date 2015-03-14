/**
 * Created by cesarcruz on 3/10/15.
 * Room Model
 */

exports.module = function(sequelize, DataTypes) {
    return sequilize.define('Room', {
        identifier : {
            type : DataTypes.STRING,
            field : 'identifier'
        },
        description : {
            type : DataTypes.TEXT,
            field : 'description'
        },
        ibeacons : {
            type : DataTypes.ARRAY(Sequelize.STRING),
            field : 'ibeacons'
        }
    }, {
        freezeTableName : true
    })
}