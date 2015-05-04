"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('MothlyActiveUsers', {
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
        activeUser : {
            type : DataTypes.INTEGER,
            references : 'Users',
            referencesKey : 'id'
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
    migration.dropTable('MonthlyActiveUsers').complete(done);
  }
};
