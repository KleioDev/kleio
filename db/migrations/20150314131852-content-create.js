"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Content', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type: DataTypes.STRING,
            allowNull : false
        },
        mediaLink : {
            type : DataTypes.STRING,
            allowNull : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        type : {
            type : DataTypes.ENUM('image', 'video', 'audio', 'text'),
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps: true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Content').complete(done);
  }
};
