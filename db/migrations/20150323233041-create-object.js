"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.createTable('Object', {
          id : {
              type : DataTypes.INTEGER,
              allowNull : false,
              primaryKey : true,
              autoIncrement : true
          },
          title : {
              type : DataTypes.STRING,
              allowNull : false
          },
          description : {
              type : DataTypes.TEXT
          },
          medium : {
              type : DataTypes.STRING
          },
          classification : {
              type : DataTypes.STRING
          },
          attribution : {
              type : DataTypes.STRING
          },
          type : {
              type : DataTypes.STRING
          },
          dimensions : {
              type : DataTypes.STRING
          },
          dated : {
              type : DataTypes.STRING
          },
          period : {
              type : DataTypes.STRING
          },
          culture : {
              type : DataTypes.STRING
          },
          department : {
              type : DataTypes.STRING
          },
          objectNumber : {
              type : DataTypes.STRING
          },
          image : {
              type : DataTypes.STRING(1000),
              allowNull : false
          },
          ArtistId : {
              type : DataTypes.INTEGER
          },
          QrcodeId : {
              type : DataTypes.INTEGER
          },
          CategoryId : {
              type : DataTypes.INTEGER
          },
          createdAt : {
              type : DataTypes.DATE
          },
          updatedAt : {
              type : DataTypes.DATE
          }
      }, {
        freezeTableName : true
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Object').complete(done);
  }
};
