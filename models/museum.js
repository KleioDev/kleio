/**
 * Created by cesarcruz on 3/10/15.
 * Museum model
 */

module.exports = function(sequelize, DataTypes) {

    var Feedback = sequelize.import(__dirname + '/feedback');

    var Administrator =  sequelize.import(__dirname + '/administrator');

    var museum = sequelize.define('Museum', {
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
        terms : {
            type : DataTypes.TEXT
        },
        about : {
            type : DataTypes.TEXT
        },
        hours_of_operation : {
            type : DataTypes.STRING,
            allowNull : false
        },
        social_media_links : {
            type : DataTypes.ARRAY(DataTypes.STRING),
            allowNull : true
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false

        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            isEmail : true
        },
        image : {
            type : DataTypes.STRING,
            allowNull : false,
            isUrl : true
        },
        location : {
            type : DataTypes.STRING,
            allowNull : false,
            isUrl : true
        }

    }, {
        freezeTableName: true,
        timestamps: true
    });

    museum.hasMany(Feedback, {as: 'Feedback'});

    museum.hasMany(Administrator, {as: 'Managers'});

    return museum;
};