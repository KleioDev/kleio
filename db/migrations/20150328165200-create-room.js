"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Rooms', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        ibeacons : {
            type : DataTypes.ARRAY(DataTypes.STRING)
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
    migration.dropTable('Rooms').complete(done);
  }
};
