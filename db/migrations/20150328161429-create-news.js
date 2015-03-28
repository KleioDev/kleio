"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.createTable('News', {
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
              type : DataTypes.TEXT,
              allowNull : false
          },
          image : {
              type : DataTypes.STRING(1000),
              allowNull : true
          },
          AdministratorId : { //The Author of the Event
              type : DataTypes.INTEGER,
              references : 'Administrators',
              referencesKey : 'id'
          },
          createdAt : {
              type : DataTypes.DATE,
              allowNull : false
          },
          updatedAt : {
              type : DataTypes.DATE,
              allowNull : false
          }
      }, {
          freezeTableName : true
      }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('News').complete(done);
  }
};
