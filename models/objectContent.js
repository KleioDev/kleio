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
            type : DataTypes.INTEGER
        },
        ContentId : {
            type : DataTypes.INTEGER
        },
        updatedAt : {
            type : DataTypes.DATE
        },
        createdAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps : true
    });

    return ObjectContent;
};