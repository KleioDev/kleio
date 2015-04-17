"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('Rooms', 'ibeacons').complete(done);

  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.addColumn('Rooms', 'ibeacons', {
        type : DataTypes.ARRAY(DataTypes.STRING(1000))
    }).complete(done);
  }
};
