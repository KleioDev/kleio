/**
 * Created by cesarcruz on 3/10/15.
 * Administrator Model
 */


exports.module = function(sequelize, DataTypes) {

    var Articles = sequelize.import(__dirname + '/article');

    var Content = sequelize.import(__dirname + '/content');

    var Administrator = sequelize.define('Administrator', {
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

    Administrator.hasMany(Articles);

    Administrator.belongsToMany(Content, {through: 'ManagesContent'});



    return Administrator;
}