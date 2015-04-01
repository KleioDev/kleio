"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Beacons', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        code : {
            type : DataTypes.STRING
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
      migration.dropTable('Beacons').complete(done);
  }
};
