"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Artifacts', 'interactions', {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Artifacts', 'interactions').complete(done);
  }
};
