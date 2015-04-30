"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Administrators', 'confirm', {
        type : DataTypes.BOOLEAN
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Administrators', 'confirm');
  }
};
