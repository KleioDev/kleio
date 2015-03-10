/**
 * Created by cesarcruz on 3/10/15.
 * Feedback Model
 */

//TODO:Fix this dataTypes thorHammer
exports.module = function(sequelize, dataTypes) {
    var Feedback = sequelize.define('Feedback', {
        title : {
            type: dataTypes.STRING,
            field: 'title'
        },
        content : {
            type : dataTypes.STRING,
            field: 'content'
        },
        date : {
            type: dataTypes.DATE,
            field: 'date'
        },
        seen : {
            type : dataTypes.BOOLEAN,
            field : 'seen'
        },
        type : {
            type : dataTypes.STRING,
            field : 'type'
        }
    }, {
        getterMethods : {
            getTitle : function() {
                return this.title;
            },
            getContent : function() {
                return this.content;
            }
        },
        freezeTableName : true,
        timestamps : false
    });

    return Feedback;
}