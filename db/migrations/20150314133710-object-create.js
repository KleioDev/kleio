"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Object', {
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
        ArtistId : {
            type : DataTypes.INTEGER,
            references : 'Artist',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps: true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Object').complete(done);
  }
};
