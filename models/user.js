/**
 * Created by cesarcruz on 3/10/15.
 * User Model
 */

//TODO: Add testing
exports.module = function(sequelize, DataTypes) {

    var Object = sequelize.import(__dirtname + '/object');

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
        age : {
            type : DataTypes.INTEGER
        },
        points : {
            type : DataTypes.BIGINT,
            defaultValue : 0
        },
        banished : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }

    }, {
        freezeTableName: true,
        timestamps : true
    });



    User.belongsToMany(Object, {through : Match});

    return User;
}
