"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Audibles', {
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
        link : {
            type : DataTypes.STRING(1000),
            allowNull : false
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
      migration.dropTable('Audibles').complete(done);
  }
};
