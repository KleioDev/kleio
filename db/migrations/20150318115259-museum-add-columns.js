"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.addColumn('Museum', 'social_media_links', {
          type : DataTypes.ARRAY(DataTypes.STRING),
          allowNull : true
      });

      migration.addColumn('Museum', 'phone', {
          type : DataTypes.STRING,
          allowNull : false
      });

      migration.addColumn('Museum', 'email', {
          type : DataTypes.STRING,
          allowNull : false,
          isEmail : true
      });

      migration.addColumn('Museum', 'image', {
          type : DataTypes.STRING,
          allowNull : false,
          isUrl : true
      })

      migration.addColumn('Museum', 'location', {
          type : DataTypes.STRING,
          allowNull : false,
          isUrl : true
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
      migration.removeColumn('Museum', 'social_media_links');

      migration.removeColumn('Museum', 'phone');

      migration.removeColumn('Museum', 'email');

      migration.removeColumn('Museum', 'image');

      migration.removeColumn('Museum', 'location').complete(done);
  }
};
