/**
 * Created by cesarcruz on 3/28/15.
 */

module.exports = function(sequelize, DataTypes){

    var Clue = sequelize.define('Clue', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        pointsValue : {
            type : DataTypes.INTEGER,
            defaultValue : 15
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

    return Clue;
}