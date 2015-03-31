/**
 * Created by cesarcruz on 3/30/15.
 */

module.exports = function(sequelize, DataTypes){

    var ArtifactAudio = sequelize.define('ArtifactAudio', {
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
        AudioId : {
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

    return ArtifactAudio;
}