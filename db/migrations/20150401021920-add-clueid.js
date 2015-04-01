"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Matches', 'ClueId', {
        type : DataTypes.INTEGER,
        references : 'Clues',
        referencesKey : 'id'
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Matches', 'ClueId').complete(done);
  }
};
