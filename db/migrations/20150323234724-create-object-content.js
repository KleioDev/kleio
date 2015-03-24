"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ObjectContent', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ObjectId : {
            type : DataTypes.INTEGER
        },
        ContentId : {
            type : DataTypes.INTEGER
        },
        updatedAt : {
            type : DataTypes.DATE
        },
        createdAt : {
            type : DataTypes.DATE
        }
    }, {
        freezeTableName : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ObjectContent').complete(done);
  }
};
