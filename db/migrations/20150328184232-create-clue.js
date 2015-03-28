"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Clues', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        pointsValue : {
            type : DataTypes.INTEGER,
            defaultValue : 15
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
    migration.dropTable('Clues').complete(done);
  }
};
