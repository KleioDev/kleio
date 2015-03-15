"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Match', {
        UserId : {
            type : DataTypes.INTEGER,
            references : 'User',
            referencesKey : 'id'
        },
        ObjectId : {
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        attempts : {
            type : DataTypes.INTEGER,
            defaultValue : 0,
            allowNull : false
        },
        matched : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
   migration.dropTable('Match').complete(done);
  }
};
