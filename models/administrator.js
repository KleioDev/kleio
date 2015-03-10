/**
 * Created by cesarcruz on 3/10/15.
 * Administrator Model
 */


exports.module = function(sequelize, DataTypes) {
    var administrator = sequelize.define('administrator', {
        email : {
            type : DataTypes.STRING,
            field : 'email'
        },
        firstName : {
            type : DataTypes.STRING,
            field : "first_name"
        },
        lastName : {
            type : DataTypes.STRING,
            field : 'last_name'
        },
        password : {
            type : DataTypes.STRING,
            field : 'password'
        }
    },  {
        freezeTableName : true
    });

    return administrator;
}