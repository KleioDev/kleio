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
            allowNull : false
        },
        biography : {
            type : DataTypes.STRING
        },
        birthDay : {
            type: DataTypes.STRING
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    return Artist;
};