"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ObjectContent', {
        objectId : {
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        contentId : {
            type : DataTypes.INTEGER,
            references : 'Content',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps : true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('ObjectContent').complete(done);
  }
};
