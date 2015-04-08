"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Artifacts', 'deletedAt', {
        type : DataTypes.DATE
    });

      migration.addColumn('Exhibitions', 'deletedAt', {
          type : DataTypes.DATE
      }).complete(done);

  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Artifacts', 'deletedAt');

    migration.removeColumn('Exhibitions', 'deletedAt').complete(done);
  }
};
