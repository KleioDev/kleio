"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Administrators', 'phone', {
        type : DataTypes.STRING
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Administrators', 'phone').complete(done);
  }
};
