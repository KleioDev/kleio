/**
 * Created by cesarcruz on 3/28/15.
 */

module.exports = function(sequelize, DataTypes){

    var ArtifactContent = sequelize.define('ArtifactContent', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        ArtifactId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        ContentId : {
            type : DataTypes.INTEGER,
            allowNUll : false
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    });

    return ArtifactContent;
}