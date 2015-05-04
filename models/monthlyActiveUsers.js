module.exports = function(sequelize, DataTypes) {

    var monthlyActiveUsers = sequelize.define('MonthlyActiveUser', {
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
        activeUser : {
            type : DataTypes.INTEGER,
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

    return monthlyActiveUsers;

};