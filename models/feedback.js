/**
 * Created by cesarcruz on 3/10/15.
 * Feedback Model
 */

//TODO:What are the types of feedback?

module.exports = function(sequelize, DataTypes) {

    var Feedback =  sequelize.define('Feedback', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            notEmpty: true
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        type: {
            type: DataTypes.ENUM('general', 'bug', 'content_problem'),
            allowNull: false
        },
        resolved : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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

    return Feedback;
};