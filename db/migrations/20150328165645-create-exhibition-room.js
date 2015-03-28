"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ExhibitionRooms', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ExhibitionId : {
            type : DataTypes.INTEGER,
            references : 'Exhibitions',
            referencesKey : 'id'
        },
        RoomId : {
            type : DataTypes.INTEGER,
            references : 'Rooms',
            referencesKey : 'id'
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowsNull : false
        }
    }, {
        freezeTableName : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ExhibitionRooms').complete(done);
  }
};
