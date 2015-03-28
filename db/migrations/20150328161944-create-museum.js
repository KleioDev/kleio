"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Museums', {
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
            type : DataTypes.STRING,
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
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Museums').complete(done);
  }
};
