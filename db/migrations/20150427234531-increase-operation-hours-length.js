"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.changeColumn('Museums', 'hoursOfOperation', {
        type : DataTypes.STRING(1000)
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Museums', 'hoursOfOperation').complete(done);
  }
};
