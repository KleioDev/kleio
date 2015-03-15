/**
 * Created by cesarcruz on 3/14/15.
 */
module.exports = function(sequelize, DataTypes){
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

    return Match;
}