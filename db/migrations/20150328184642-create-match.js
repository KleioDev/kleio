"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Matches', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        ArtifactId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        attempts : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        correct : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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
      migration.dropTable('Matches').complete(done);
  }

};
