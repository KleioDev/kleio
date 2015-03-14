"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('User', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : DataTypes.STRING,
            isEmail : true,
            notEmpty : true
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        gender : {
            type : DataTypes.ENUM('male', 'female')
        },
        age : {
            type : DataTypes.INTEGER
        },
        points : {
            type : DataTypes.BIGINT,
            defaultValue : 0
        },
        banished : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }

    }, {
        freezeTableName: true,
        timestamps : true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('User').complete(done);
  }
};
