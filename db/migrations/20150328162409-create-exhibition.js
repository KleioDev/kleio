"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Exhibitions', {
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
            allowNull : true
        },
        image : {
            type : DataTypes.STRING(1000)
        },
        active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
        MuseumId : {
            type : DataTypes.INTEGER,
            references : 'Museums',
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
    migration.dropTable('Exhibitions').complete(done);
  }
};
