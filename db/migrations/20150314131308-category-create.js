"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Category',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        category : {
            type: DataTypes.STRING,
            allowNull : false
        },
        parentCategory : {
            type : DataTypes.INTEGER,
            allowNull : true
        }
    }, {
        freezeTableName : true,
        timestamps: true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Category').complete(done);
  }
};
