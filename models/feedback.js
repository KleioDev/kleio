/**
 * Created by cesarcruz on 3/10/15.
 * Feedback Model
 */

//TODO:Fix this dataTypes thorHammer
module.exports = function(sequelize, DataTypes) {

    var Museum = sequelize.import(__dirname + '/museum');

    var Feedback =  sequelize.define('Feedback', {
        title : {
            type: DataTypes.STRING,
            field: 'title'
        },
        content : {
            type : DataTypes.STRING,
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

    Feedback.belongsTo(Museum);

    return Feedback;
}