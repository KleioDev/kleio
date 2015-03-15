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
            allowNull: false
        },
        MuseumId : {
            type : DataTypes.INTEGER,
            references : 'Museum',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Feedback').complete(done);
  }
};
