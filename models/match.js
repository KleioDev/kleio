/**
 * Created by cesarcruz on 3/14/15.
 */
module.exports = function(sequelize, DataTypes){
    //Match table will be used to keep track of users and their history in ImageHunt.
    var Match = sequelize.define('Match', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        ClueId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        qrcode : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        attempts : {
            type : DataTypes.INTEGER
        },
        correct : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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

    return Match;
};