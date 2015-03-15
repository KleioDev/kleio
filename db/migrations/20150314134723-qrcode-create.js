"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.createTable('QRCode', {
          id : {
              type : DataTypes.INTEGER,
              allowNull : false,
              primaryKey : true,
              autoIncrement : true

          },
          size : {
              type : DataTypes.STRING
          },
          text : {
              type : DataTypes.STRING
          },
          url : {
              type : DataTypes.STRING,
              isUrl : true
          },
          image : {
              type : DataTypes.STRING
          }
      }, {
          freezeTableName : true,
          timestamps : true
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('QRCode').complete(done);
  }
};
