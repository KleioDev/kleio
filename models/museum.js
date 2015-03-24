/**
 * Created by cesarcruz on 3/10/15.
 * Museum model
 */

module.exports = function(sequelize, DataTypes) {

    var Feedback = sequelize.import(__dirname + '/feedback'),
        Exhibition = sequelize.import(__dirname + '/exhibition'),
        Administrator = sequelize.import(__dirname + '/administrator');


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
            type : DataTypes.ARRAY(DataTypes.STRING(1000)),
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
            type : DataTypes.STRING(1000),
            allowNull : false,
            isUrl : true
        },
        location : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            isUrl : true
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }

    }, {
        timestamps: true
    });

    museum.hasMany(Exhibition);

    museum.hasMany(Feedback);

    museum.hasMany(Administrator);

    return museum;
};