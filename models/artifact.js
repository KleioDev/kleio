/**
 * Created by cesarcruz on 3/10/15.
 * Object Model
 */

module.exports = function(sequelize, DataTypes) {


    var Object =  sequelize.define('Object', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT
        },
        medium : {
            type : DataTypes.STRING
        },
        classification : {
            type : DataTypes.STRING
        },
        attribution : {
            type : DataTypes.STRING
        },
        type : {
            type : DataTypes.STRING
        },
        dimensions : {
            type : DataTypes.STRING
        },
        dated : {
            type : DataTypes.STRING
        },
        period : {
            type : DataTypes.STRING
        },
        culture : {
            type : DataTypes.STRING
        },
        department : {
            type : DataTypes.STRING
        },
        objectNumber : {
            type : DataTypes.STRING
        },
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        ArtistId : {
            type : DataTypes.INTEGER
        },
        qrcode : {
            type : DataTypes.STRING,
            isUrl : true
        },
        CategoryId : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        ClueId : {
            type : DataType.INTEGER
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps: true
    });

    return Object;
};

