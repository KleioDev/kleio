"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Feedbacks', {
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
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        type: {
            type: DataTypes.ENUM('general', 'bug', 'content_problem'),
            allowNull: false
        },
        resolved : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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
    migration.dropTable('Feedbacks').complete(done);
  }
};
