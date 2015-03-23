"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Object', 'image', {
        type : DataTypes.STRING(1000),
        allowNull : false
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Object', 'image').complete(done);
  }
};
