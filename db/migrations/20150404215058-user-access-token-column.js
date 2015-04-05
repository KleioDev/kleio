"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Users', 'accessToken', {
        type : DataTypes.STRING
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Users', 'accessToken').complete(done);
  }
};
