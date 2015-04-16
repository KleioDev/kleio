"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Users', 'accessToken', {
        type : DataTypes.STRING(1000)
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Users', 'accessToken').complete(done);
  }
};
