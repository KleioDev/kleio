/**
 * Created by cesarcruz on 3/10/15.
 * Exhibition Model
 */

//TODO: Should a museum HAVE exhibitions? (make the relationship)
exports.module = function(sequelize, DataTypes) {

    var Exhibition = sequilize.define('Exhibition', {
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
            references : 'Museum',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps: true,
        underscored : true
    });

    return Exhibition;
};
