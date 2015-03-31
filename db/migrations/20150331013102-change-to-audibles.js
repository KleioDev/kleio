"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameColumn('ArtifactAudibles', 'AudioId', 'AudibleId').complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ArtifactAudibles').complete(done);
  }
};
