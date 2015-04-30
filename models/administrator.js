/**
 * Created by cesarcruz on 3/31/15.
 */

module.exports = function(sequelize, DataTypes){

    var Administrator = sequelize.define('Administrator', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            isEmail: true
        },
        firstName : {
            type : DataTypes.STRING,
            notEmpty: true
        },
        lastName : {
            type : DataTypes.STRING,
            notEmpty: true
        },
        password : {
            type : DataTypes.STRING,
            notEmpty: true
        },
        phone : {
            type : DataTypes.STRING,
            notEmpty: true
        },
        confirm : {
            type : DataTypes.BOOLEAN
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

    return Administrator;
}