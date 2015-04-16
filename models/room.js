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
        name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        ibeacons : {
            type : DataTypes.ARRAY(DataTypes.STRING)
        },
        createdAt : {
            type : DataTypes.DATE,
            isNull: true
        },
        updatedAt : {
            type : DataTypes.DATE,
            isNull : true
        }
    }, {
        timestamps : true
    });

    return Room;
};