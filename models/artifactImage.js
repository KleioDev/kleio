/**
 * Created by cesarcruz on 3/30/15.
 */

module.exports = function(sequelize, DataTypes){

    var ArtifactImage = sequelize.define('ArtifactImage', {
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
        ImageId : {
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

    return ArtifactImage;
}