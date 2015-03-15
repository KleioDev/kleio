"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Artist', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        biography : {
            type : DataTypes.STRING
        },
        birthDay : {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName : true,
        timestamps: true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Artist').complete(done);
  }
};
