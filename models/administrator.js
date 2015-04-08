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
            allowNull : false
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        phone : {
            type : DataTypes.STRING
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