/**
 * Created by cesarcruz on 3/10/15.
 * Room Model
 */

module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define('Room', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        identifier : {
            type : DataTypes.STRING
        },
        description : {
            type : DataTypes.TEXT
        },
        ibeacons : {
            type : DataTypes.ARRAY(DataTypes.STRING)
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps : true
    });

    return Room;
};