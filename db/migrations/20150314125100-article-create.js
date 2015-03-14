"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Article', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        category : {
            type : DataTypes.STRING,
            field : "category"
        },
        author : {
            type : DataTypes.INTEGER,
            references : 'Administrator',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps : true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Article').comlete(done);
  }
};
