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
            field: 'name',
            allowNull : false
        },
        biography : {
            type : DataTypes.STRING,
            field: 'biography'
        },
        birthDay : {
            type: DataTypes.STRING,
            field: 'birth_day'
        }
    }, {
        freezeTableName : true,
        timestamps: true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Artist').complete(done);
  }
};
