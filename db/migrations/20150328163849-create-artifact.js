"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Artifacts', {
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
            type : DataTypes.INTEGER,
            references : 'Artists',
            referencesKey : 'id'
        },
        qrcode : {
            type : DataTypes.STRING(1000)
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
    migration.dropTable('Artifacts').complete(done);
  }
};
