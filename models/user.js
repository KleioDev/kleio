/**
 * Created by cesarcruz on 3/10/15.
 * User Model
 */

//TODO: Add testing
module.exports = function(sequelize, DataTypes) {


    var User = sequelize.define('User', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : DataTypes.STRING,
            isEmail : true,
            notEmpty : true,
            allowNull : false
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        gender : {
            type : DataTypes.ENUM('male', 'female')
        },
        age_range : {
            type : DataTypes.STRING
        },
        points : {
            type : DataTypes.BIGINT,
            defaultValue : 0
        },
        active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
        facebook_id : {
            type : DataType.STRING
        },
        facebook_link : {
            type : DataTypes.STRING(1000)
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

    return User;
};
