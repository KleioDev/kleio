"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Room', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        identifier : {
            type : DataTypes.STRING
        },
        description : {
            type : DataTypes.TEXT
        },
        ibeacons : {
            type : DataTypes.ARRAY(Sequelize.STRING)
        }
    }, {
        freezeTableName : true,
        timestamps : true,
        underscored : true
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Room').complete(done);
  }
};
