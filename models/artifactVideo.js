/**
 * Created by cesarcruz on 3/30/15.
 */

module.exports = function(sequelize, DataTypes){

    var ArtifactVideo = sequelize.define('ArtifactVideo', {
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
        VideoId : {
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

    return ArtifactVideo;
}