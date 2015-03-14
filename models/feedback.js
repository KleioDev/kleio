/**
 * Created by cesarcruz on 3/10/15.
 * Feedback Model
 */

//TODO:What are the types of feedback?

module.exports = function(sequelize, DataTypes) {

    var Feedback =  sequelize.define('Feedback', {
        title : {
            type: DataTypes.STRING,
            field: 'title'
        },
        content : {
            type : DataTypes.TEXT,
            field: 'content'
        },
        date : {
            type: DataTypes.DATE,
            field: 'date'
        },
        seen : {
            type : DataTypes.BOOLEAN,
            field : 'seen'
        },
        type : {
            type : DataTypes.STRING,
            field : 'type'
        },
        freezeTableName : true,
        timestamps : true
    });

    return Feedback;
}