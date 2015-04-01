/**
 * Created by cesarcruz on 3/31/15.
 */

module.exports = function(sequelize, DataTypes){

    var ExhibitionBeacon = sequelize.define('ExhibitionBeacon', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ExhibitionId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        BeaconId : {
            type : DataTypes.INTEGER,
            allowNUll : false
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

    return ExhibitionBeacon;
}