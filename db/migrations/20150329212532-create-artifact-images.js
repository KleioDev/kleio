"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ArtifactImages', {
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
        ImageId : {
            type : DataTypes.INTEGER,
            references : 'Images',
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
    migration.dropTable('ArtifactImages').complete(done);
  }
};
