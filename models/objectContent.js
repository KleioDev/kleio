/**
 * Created by cesarcruz on 3/14/15.
 */
module.exports = function(sequelize, DataTypes){
    //Match table will be used to keep track of users and their history in ImageHunt.
    var ObjectContent = sequelize.define('ObjectContent', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ObjectId : {
            type : DataTypes.INTEGER,
            references : 'Object',
            referencesKey : 'id'
        },
        ContentId : {
            type : DataTypes.INTEGER,
            references : 'Content',
            referencesKey : 'id'
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        timestamps : true
    });

    return ObjectContent;
};