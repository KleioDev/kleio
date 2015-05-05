"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Exhibitions', 'tmsID', {
        type : DataTypes.INTEGER
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Exhibitions', 'tmsID').complete(done);
  }
};
