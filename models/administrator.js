/**
 * Created by cesarcruz on 3/10/15.
 * Administrator Model
 */


exports.module = function(sequelize, DataTypes) {

    var Articles = sequelize.import(__dirname + '/article');

    var Content = sequelize.import(__dirname + '/content');

    var Administrator = sequelize.define('Administrator', {
        id : {
            type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                allowNull : false
        },
        email : {
            type : DataTypes.STRING,
                field : 'email',
                isEmail : true
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        }
    },
    {
        freezeTableName : true,
            timestamps : true
    });

    Administrator.hasMany(Articles);

    Administrator.belongsToMany(Content, {through: 'ManagesContent'});

    return Administrator;
}