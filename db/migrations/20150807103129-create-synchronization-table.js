"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Synchronizations', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        lastSynchronization : {
            type : DataTypes.DATE
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNUll : false
        }
    }, {
        freezeTableName : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Synchronizations').complete(done);
  }
};
