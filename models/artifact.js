/**
 * Created by cesarcruz on 3/10/15.
 * Object Model
 */

module.exports = function(sequelize, DataTypes) {

    var Video = sequelize.import(__dirname + '/video'),
        Audio = sequelize.import(__dirname + '/audio'),
        Image = sequelize.import(__dirname + '/image'),
        Text = sequelize.import(__dirname + '/text'),
        Artist = sequelize.import(__dirname + '/artist');

    var Artifact =  sequelize.define('Artifact', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT
        },
        medium : {
            type : DataTypes.STRING
        },
        classification : {
            type : DataTypes.STRING
        },
        attribution : {
            type : DataTypes.STRING
        },
        type : {
            type : DataTypes.STRING
        },
        dimensions : {
            type : DataTypes.STRING
        },
        dated : {
            type : DataTypes.STRING
        },
        period : {
            type : DataTypes.STRING
        },
        culture : {
            type : DataTypes.STRING
        },
        department : {
            type : DataTypes.STRING
        },
        objectNumber : {
            type : DataTypes.STRING
        },
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        ArtistId : {
            type : DataTypes.INTEGER
        },
        qrcode : {
            type : DataTypes.STRING(1000),
            isUrl : true
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps: true,
        classMethods : {
            associate: function(models){
                Artifact.belongsTo(Artist, {foreignKey : 'ArtistId'});

                Artifact.belongsToMany(models.Video, { through: 'ArtifactVideo' });
                models.Video.belongsToMany(Artifact, { through: 'ArtifactVideo' });

                Artifact.belongsToMany(models.Audible, { through: 'ArtifactAudible' });
                models.Audible.belongsToMany(Artifact, { through : 'ArtifactAudible' });

                Artifact.belongsToMany(models.Image, { through: 'ArtifactImage' });
                models.Image.belongsToMany(Artifact, { through : 'ArtifactImage' });

                Artifact.belongsToMany(models.Text, { through: 'ArtifactText' });
                models.Text.belongsToMany(Artifact, { through : 'ArtifactText' });
            }
        }
    });

    return Artifact;
};

