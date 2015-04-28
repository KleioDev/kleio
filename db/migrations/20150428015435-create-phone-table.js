"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable('Phones', {
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                allowNull : false
            },
            token : {
                type : DataTypes.STRING(1000),
                allowNull : false
            },
            os : {
                type : DataTypes.ENUM('android', 'ios'),
                allowNull : false
            },
            createdAt : {
                type : DataTypes.DATE
            },
            updatedAt : {
                type : DataTypes.DATE
            }
        }, {
            freezeTableName : true
        }).complete(done);
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable('Phones').complete(done);
    }
};
