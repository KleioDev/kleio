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
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        ContentId : {
            type : DataTypes.INTEGER,
            references : 'Content',
            referencesKey : 'id'
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
      migration.dropTable('ObjectContent').complete(done);
  }
};
