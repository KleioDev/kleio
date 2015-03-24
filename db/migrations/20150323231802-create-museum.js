"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Museum', {
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
        terms : {
            type : DataTypes.TEXT
        },
        about : {
            type : DataTypes.TEXT
        },
        hours_of_operation : {
            type : DataTypes.STRING,
            allowNull : false
        },
        social_media_links : {
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
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Museum').complete(done);
  }
};
