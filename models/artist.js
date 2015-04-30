/**
 * Created by cesarcruz on 3/10/15.
 * Artist Model
 */

module.exports = function(sequelize, DataTypes) {
    var Artist =  sequelize.define('Artist', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type: DataTypes.STRING,
            allowNull : false,
            notEmpty: true
        },
        biography : {
            type : DataTypes.STRING,
            notEmpty: true
        },
        birthDay : {
            type: DataTypes.STRING,
            notEmpty: true
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps: true
    });

    return Artist;
};