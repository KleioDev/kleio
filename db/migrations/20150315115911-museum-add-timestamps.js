"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Museum', 'createdAt', {
        type : DataTypes.DATE,
        allowNull : false
    });
    migration.addColumn('Museum', 'updatedAt', {
        type : DataTypes.DATE,
        allowNull : false
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
      migration.removeColumn('Museum', 'createdAt').complete(done);
  }
};
