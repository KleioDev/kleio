/**
 * Created by cesarcruz on 3/10/15.
 * Exhibition Model
 */

//TODO: Should a museum HAVE exhibitions? (make the relationship)
exports.module = function(sequelize, DataTypes) {

    var Exhibition = sequilize.define('Exhibition', {
        name : {
            type : DataTypes.STRING,
            field : 'name'
        },
        description : {
            type : DataTypes.TEXT,
            field : 'description'
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    return Exhibition;
}
