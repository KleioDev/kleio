/**
 * Created by cesarcruz on 3/28/15.
 */


module.exports = function(sequelize, DataTypes){

    var Video = sequelize.define('Video', {
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
            type : DataTypes.TEXT
        },
        link : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        lang : {
            type : DataTypes.ENUM('eng', 'esp'),
            defaultValue : 'esp'
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

    return Video;
}