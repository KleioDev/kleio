"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Artifacts', 'ExhibitionId', {
        type : DataTypes.INTEGER,
        references : 'Exhibitions',
        referencesKey : 'id'
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Artifacts', 'ExhibitionId').complete(done);
  }
};
