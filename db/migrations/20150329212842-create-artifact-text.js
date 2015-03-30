"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ArtifactTexts', {
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
        TextId : {
            type : DataTypes.INTEGER,
            references : 'Texts',
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
    migration.dropTable('ArtifactTexts').complete(done);
  }
};
