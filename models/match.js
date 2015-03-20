/**
 * Created by cesarcruz on 3/14/15.
 */
module.exports = function(sequelize, DataTypes){
    //Match table will be used to keep track of users and their history in ImageHunt.
    var Match = sequelize.define('Match', {
        UserId : {
            type : DataTypes.INTEGER,
            references : 'User',
            referencesKey : 'id'
        },
        ObjectId : {
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        attempts : {
            type : DataTypes.INTEGER,
            defaultValue : 0,
            allowNull : false
        },
        matched : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps : true
    });

    return Match;
};