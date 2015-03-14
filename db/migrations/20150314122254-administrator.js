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
                type : DataTypes.STRING,
                field : "first_name"
            },
            lastName : {
                type : DataTypes.STRING,
                field : 'last_name'
            },
            password : {
                type : DataTypes.STRING,
                field : 'password'
            }
        },
        {
            freezeTableName : true,
            timestamps : true,
            underscored : true
        }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Administrator').complete(done);
  }
};
