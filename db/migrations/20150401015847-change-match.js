"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.addColumn('Matches', 'qrcode', {
          type : DataTypes.STRING(1000)
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Matches', 'qrcode').complete(done);
  }
};
