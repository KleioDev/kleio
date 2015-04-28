/**
 * Created by cesarcruz on 3/28/15.
 */

module.exports = function(sequelize, DataTypes){

    var Events = sequelize.define('Event', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        eventDate : {
            type : DataTypes.DATE,
            allowNull : false
        },
        image : {
            type : DataTypes.STRING(1000)
        },
        location : {
            type : DataTypes.STRING(1000)
        },
        notified : {
            type : DataTypes.BOOLEAN(),
            defaultValue : false
        },
        author : { //The Author of the Event
            type : DataTypes.INTEGER
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

    return Events;
}