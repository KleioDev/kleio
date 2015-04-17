"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Beacons', 'RoomId', {
        type : DataTypes.INTEGER,
        references : 'Rooms',
        referencesKey : 'id'
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Beacons', 'RoomId').complete(done);
  }
};
