"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.removeColumn('Article', 'category');
      migration.addColumn('Article', 'type', {
          type : DataTypes.ENUM('news', 'event'),
          defaultValue : 'news',
          allowNull : false
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Article', 'type').complete(done);
  }
};
