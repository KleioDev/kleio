/**
 * Created by cesarcruz on 3/10/15.
 * User Model
 */

//TODO: Add testing
exports.module = function(sequelize, DataTypes) {

    var Object = sequelize.import(__dirtname + '/object');

    var User = sequelize.define('User', {
        email : {
            type : DataTypes.STRING,
            field : "email",
            isEmail : true,
            notEmpty : true
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
            field : 'points',
            defaultValue : 0
        },
        banished : {
            type : DataTypes.BOOLEAN,
            field : 'banished',
            defaultValue : false
        }

    }, {
        freezeTableName: true,
        timestamps : true
    });

    //Match table will be used to keep track of users and their history in ImageHunt.
    var Match = sequelize.define('Match', {
       matched : {
           type : DataTypes.BOOLEAN,
           field : 'matched',
           defaultValue : false
       },

        attempts : {
            type : DataTypes.INTEGER,
            field : 'attempts',
            defaultValue : 0
        }
    }, {
        freezeTableName : true,
        timestamps : true
    });

    User.belongsToMany(Object, {through : Match});

    return User;
}
