"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ArtifactVideos', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ArtifactId : {
            type : DataTypes.INTEGER,
            references : 'Artifacts',
            referencesKey : 'id'
        },
        VideoId : {
            type : DataTypes.INTEGER,
            references : 'Videos',
            referencesKey : 'id'
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowsNull : false
        }
    }, {
        freezeTableName : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ArtifactVideos').complete(done);
  }
};
