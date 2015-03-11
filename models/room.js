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
            type : DataTypes.STRING,
            field : 'description'
        },
        ibeacons : {
            type : DataTypes.ARRAY(Sequelize.TEXT),
            field : 'ibeacons'
        }
    }, {
        freezeTableName : true
    })
}