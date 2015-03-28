"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Administrators', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
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
    migration.dropTable('Administrators').complete(done);
  }
};
