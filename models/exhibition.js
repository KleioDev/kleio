/**
 * Created by cesarcruz on 3/10/15.
 * Exhibition Model
 */

//TODO: Should a museum HAVE exhibitions? (make the relationship)
module.exports = function(sequelize, DataTypes) {

    var Exhibition = sequelize.define('Exhibition', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        MuseumId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    return Exhibition;
};
