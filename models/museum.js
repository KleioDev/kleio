/**
 * Created by cesarcruz on 3/10/15.
 * Museum model
 */

exports.module = function(sequelize, DataTypes) {
    var museum = sequelize.define('Museum', {
        title : {
            type : DataTypes.STRING,
            field : "title"
        },
        description : {
            type : DataTypes.STRING,
            field : "description"
        },
        terms : {
            type : DataTypes.STRING,
            field : 'types'
        },
        about : {
            type : DataTypes.STRING,
            field : 'about'
        }
    }, {
        freezeTableName: true
    });

    return museum;
}