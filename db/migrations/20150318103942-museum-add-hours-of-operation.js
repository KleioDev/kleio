"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Museum', 'hours_of_operation', {
        type : DataTypes.STRING,
        allowNull : false
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Museum', 'hours_of_operation').complete(done);
  }
};
