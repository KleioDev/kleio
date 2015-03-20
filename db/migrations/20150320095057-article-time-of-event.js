"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.addColumn('Article', 'event_date', {
          type : DataTypes.DATE,
          allowNull : true
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Article', 'event_date').complete(done);
  }
};
