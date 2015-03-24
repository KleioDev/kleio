/**
 * Created by cesarcruz on 3/10/15.
 * Administrator Model
 */


module.exports = function(sequelize, DataTypes) {

    var Articles = sequelize.import(__dirname + '/article');

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
        },
        MuseumId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    },
    {
        freezeTableName : true,
            timestamps : true
    });

    Administrator.hasMany(Articles);

    return Administrator;
};