"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ArtifactAudibles', {
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
        AudioId : {
            type : DataTypes.INTEGER,
            references : 'Audibles',
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
    migration.dropTable('ArtifactAudibles').complete(done);
  }
};
