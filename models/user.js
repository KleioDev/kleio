/**
 * Created by cesarcruz on 3/10/15.
 * User Model
 */

//TODO: Add testing
exports.module = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        email : {
            type : DataTypes.STRING,
            field : "email"
        },
        firstName : {
            type : DataTypes.STRING,
            field : "first_name"
        },
        lastName : {
            type : DataTypes.STRING,
            field : 'last_name'
        },
        gender : {
            type : DataTypes.ENUM('male', 'female'),
            field : 'gender'
        },
        age : {
            type : DataTypes.INTEGER,
            field : 'age'
        },
        points : {
            type : DataTypes.BIGINT,
            field : 'points'
        },
        banished : {
            type : DataTypes.BOOLEAN,
            field : 'banished',
            defaultValue : false
        }

    }, {
        freezeTableName: true
    });
}
