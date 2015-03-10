/**
 * Created by cesarcruz on 3/10/15.
 * Content Model
 */

//TODO: type should reference something else or be of type enum
exports.module = function(sequelize, dataTypes) {
    return sequelize.define('Content', {
        title : {
            type: dataTypes.STRING,
            field: 'title'
        },
        mediaLink : {
            type : dataTypes.STRING,
            field: 'media_link'
        },
        description : {
            type : DataTypes.STRING,
            field : 'description'
        },
        type : {
            type : DataTypes.STRING,
            field : 'type'
        }
    }, {
        freezeTableName : true
    });
}