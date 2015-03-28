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
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT
        },
        link : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    });

    return Image;
}