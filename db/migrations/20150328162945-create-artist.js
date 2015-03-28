"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Artists', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        biography : {
            type : DataTypes.STRING
        },
        birthDay : {
            type: DataTypes.STRING
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
    migration.dropTable('Artists').complete(done);
  }
};
