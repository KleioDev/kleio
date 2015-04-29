"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('Matches', 'qrcode');
    migration.addColumn('Clues', 'ArtifactId', {
        type : DataTypes.INTEGER,
        references : 'Artifacts',
        referencesKey : 'id'
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Clues', 'ArtifactId').complete(done);
  }
};
