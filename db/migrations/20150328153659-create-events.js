"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Events', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            field : 'title'
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        eventDate : {
            type : DataTypes.DATE,
            allowNull : false
        },
        image : {
            type : DataTypes.STRING(1000)
        },
        location : {
            type : DataTypes.STRING(1000)
        },
        author : { //The Author of the Event
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
      migration.dropTable('Events').complete(done);
  }
};
