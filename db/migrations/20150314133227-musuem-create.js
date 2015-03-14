"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Museum', {
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
            type : DataTypes.TEXT
        },
        terms : {
            type : DataTypes.TEXT
        },
        about : {
            type : DataTypes.TEXT
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Musuem').complete(done);
  }
};
