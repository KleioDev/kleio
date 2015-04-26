"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('News', 'location', {
        type : DataTypes.STRING(1000)
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('News', 'location').complete(done);
  }
};
