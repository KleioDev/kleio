/**
 * Created by cesarcruz on 3/10/15.
 * Articles model
 */

exports.module = function(sequelize, DataTypes) {


    var Article = sequelize.define('Article', {
        title : {
            type : DataTypes.STRING,
            field : "title"
        },
        content : {
            type : DataTypes.TEXT,
            field : "content"
        },
        category : {
            type : DataTypes.STRING,
            field : "category"
        },
        author : {
            type : DataTypes.STRING,
            field : "author"
        },
        date : {
            type : DataTypes.DATE,
            field : "date"
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    return Article;
}