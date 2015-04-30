/**
 * Created by cesarcruz on 3/28/15.
 */


module.exports = function(sequelize, DataTypes){

    var Image = sequelize.define('Image', {
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
            notEmpty: true
        },
        link : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            notEmpty: true
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

    return Image;
}