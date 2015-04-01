/**
 * Created by cesarcruz on 3/31/15.
 */

module.exports = function(sequelize, DataTypes){

    var Beacon = sequelize.define('Beacon', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        code : {
            type : DataTypes.STRING
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

    return Beacon;
}