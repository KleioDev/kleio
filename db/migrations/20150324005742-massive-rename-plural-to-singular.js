"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.renameTable('Museum', 'Museums');

      migration.renameTable('Feedback', 'Feedbacks');

      migration.renameTable('Exhibition', 'Exhibitions');

      migration.renameTable('Object', 'Objects');

      migration.renameTable('Content', 'Contents');

      migration.renameTable('ObjectContent', 'ObjectContents').complete(done);

  },

  down: function(migration, DataTypes, done) {
    done();
  }
};
