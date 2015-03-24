"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Feedback', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        seen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: DataTypes.ENUM('complain', 'suggestion'),
        },
        MuseumId : {
            type : DataTypes.INTEGER,
        },
        createdAt : {
            type : DataTypes.DATE,
        },
        updatedAt : {
            type : DataTypes.DATE,
        }
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Feedback').complete(done);
  }
};
