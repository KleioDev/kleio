"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Exhibition', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        museumId : {
            type : DataTypes.INTEGER,
            references : 'Museum',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps: true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Exhibition').complete(done);
  }
};
