/**
 * Created by cesarcruz on 3/28/15.
 */

module.exports = function(sequelize, DataTypes){

    var ExhibitionRoom = sequelize.define('ExhibitionRoom', {
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
        RoomId : {
            type : DataTypes.INTEGER,
            allowNUll : false
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    });

    return ExhibitionRoom;
}