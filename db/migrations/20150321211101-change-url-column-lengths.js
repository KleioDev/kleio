"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.changeColumn('Museum', 'image', {
          type: DataTypes.STRING(1000),
          allowNull: false,
          isUrl: true
      });

      migration.changeColumn('Museum', 'social_media_links', {
         type : DataTypes.ARRAY(DataTypes.STRING(1000)),
          allowNull : true
      });

      migration.changeColumn('Museum', 'location', {
          type : DataTypes.STRING(1000),
          allowNull : false,
          isUrl : true
      });

      migration.changeColumn('Content', 'mediaLink', {
          type : DataTypes.STRING(1000),
          allowNull : false
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
      migration.removeColumn('Museum', 'image');

      migration.removeColumn('Museum', 'social_media_links');

      migration.removeColumn('Museum', 'location');

      migration.removeColumn('Content', 'mediaLink').complete(done);
  }
};
