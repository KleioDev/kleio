"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Audibles', 'lang', {
        type : DataTypes.ENUM('eng', 'esp')
    });

      migration.addColumn('Images', 'lang', {
          type : DataTypes.ENUM('eng', 'esp')
      });

      migration.addColumn('Videos', 'lang', {
          type : DataTypes.ENUM('eng', 'esp')
      });

      migration.addColumn('Texts', 'lang', {
          type : DataTypes.ENUM('eng', 'esp')
      });

      migration.addColumn('News', 'lang', {
          type : DataTypes.ENUM('eng', 'esp')
      });

      migration.addColumn('Events', 'lang', {
          type : DataTypes.ENUM('eng', 'esp')
      }).complete(done);

  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Audibles', 'lang');

      migration.removeColumn('Videos', 'lang');

      migration.removeColumn('Images', 'lang');

      migration.removeColumn('Texts', 'lang');

      migration.removeColumn('News', 'lang');

      migration.removeColumn('Events', 'lang').complete(done);
  }
};
