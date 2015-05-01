"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('Feedbacks', 'MuseumId');

    migration.removeColumn('Exhibitions', 'MuseumId').complete(done);
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
