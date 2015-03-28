/**
 * Created by cesarcruz on 3/28/15.
 */

module.exports = function(sequelize, DataTypes){

    var News = sequelize.define('News', {
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
        image : {
            type : DataTypes.STRING(1000),
            allowNull : true
        },
        AdministratorId : { //The Author of the Event
            type : DataTypes.INTEGER
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    });

    return News;
}