"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ObjectContent', {
        ObjectId : {
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        ContentId : {
            type : DataTypes.INTEGER,
            references : 'Content',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ObjectContent').complete(done);
  }
};
