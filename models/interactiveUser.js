/**
 * Created by cesarcruz on 5/3/15.
 */
module.exports = function(sequelize, DataTypes) {

    var interactiveUser = sequelize.define('interactiveUser', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        month : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        year : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        interactiveUser : {
            type : DataTypes.STRING(1000),
            allowNull : false
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

    return interactiveUser;

};