/**
 * Created by cesarcruz on 3/10/15.
 * Room Model
 */

module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define('Room', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        createdAt : {
            type : DataTypes.DATE,
            isNull: true
        },
        updatedAt : {
            type : DataTypes.DATE,
            isNull : true
        }
    }, {
        timestamps : true,
        classMethods : {
            associate: function(models){

                Room.hasMany(models.Beacon)

                Room.belongsToMany(models.Exhibition, { through: 'ExhibitionRoom' });
                models.Beacon.belongsToMany(Room, { through: 'ExhibitionRoom' });

            }
        }
    });

    return Room;
};