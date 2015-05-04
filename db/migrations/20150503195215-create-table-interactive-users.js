"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('InteractiveUsers', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        month : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        year : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        interactiveUser : {
            type : DataTypes.STRING(1000),
            allowNull : false
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
    migration.dropTable('InteractiveUsers').complete(done);
  }
};
