"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Events', 'notified', {
        type : DataTypes.BOOLEAN(),
        defaultValue : false
    });

    migration.addColumn('News', 'notified', {
        type : DataTypes.BOOLEAN(),
        defaultValue : false
    }).complete(done);


  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Events', 'notified');

    migration.removeColumn('News', 'notified').complete(done);
  }
};
