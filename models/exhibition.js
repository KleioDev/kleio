/**
 * Created by cesarcruz on 3/10/15.
 * Exhibition Model
 */

exports.module = function(sequelize, DataTypes) {
    return sequilize.define('Exhibition', {
        name : {
            type : DataTypes.STRING,
            field : 'name'
        },
        description : {
            type : DataTypes.STRING,
            field : 'description'
        }
    }, {
        freezeTableName : true
    })
}
