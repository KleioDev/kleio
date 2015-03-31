/**
 * Created by cesarcruz on 3/30/15.
 */

module.exports = function(sequelize, DataTypes){

    var ArtifactAudible = sequelize.define('ArtifactAudible', {
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
        AudibleId : {
            type : DataTypes.INTEGER,
            allowNUll : false
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps : true
    });

    return ArtifactAudible;
}