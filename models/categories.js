/**
 * Created by cesarcruz on 3/10/15.
 * Category Model
 */

exports.module = function(sequelize, dataTypes) {
    return sequelize.define('Category', {
        category : {
            type: dataTypes.STRING,
            field: 'category'
        },
        parent : {
            type : dataTypes.INTEGER,
            field: 'parent'
        }
    }, {
        freezeTableName : true
    });
}