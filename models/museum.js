/**
 * Created by cesarcruz on 3/10/15.
 * Museum model
 */

module.exports = function(sequelize, DataTypes) {

    var museum = sequelize.define('Museum', {
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
            type : DataTypes.TEXT
        },
        terms : {
            type : DataTypes.TEXT
        },
        about : {
            type : DataTypes.TEXT
        },
        hoursOfOperation : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        socialMediaLinks : {
            type : DataTypes.ARRAY(DataTypes.STRING(1000)),
            allowNull : true
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false

        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            isEmail : true
        },
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            isUrl : true
        },
        location : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            isUrl : true
        },
        phoneExtension : {
          type : DataTypes.STRING,
          allowNull : true
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

    return museum;
};