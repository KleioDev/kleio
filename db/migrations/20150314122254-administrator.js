"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Administrator',
        {
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                field : 'email',
                isEmail : true
            },
            firstName : {
                type : DataTypes.STRING
            },
            lastName : {
                type : DataTypes.STRING
            },
            password : {
                type : DataTypes.STRING
            }
        },
        {
            freezeTableName : true,
            timestamps : true
        }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Administrator').complete(done);
  }
};
