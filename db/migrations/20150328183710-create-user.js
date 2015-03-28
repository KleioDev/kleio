"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Users', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
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
        age_range : {
            type : DataTypes.STRING
        },
        points : {
            type : DataTypes.BIGINT,
            defaultValue : 0,
            allowNull : false
        },
        active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
        facebook_id : {
            type : DataTypes.STRING
        },
        facebook_link : {
            type : DataTypes.STRING(1000)
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
    migration.dropTable('Users').complete(done);
  }
};
