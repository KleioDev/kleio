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
            allowNull : false,
            notEmpty: true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
            notEmpty: true
        },
        eventDate : {
            type : DataTypes.DATE,
            allowNull : false,
            notEmpty: true
        },
        image : {
            type : DataTypes.STRING(1000),
            notEmpty: true
        },
        location : {
            type : DataTypes.STRING(1000),
            notEmpty: true
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