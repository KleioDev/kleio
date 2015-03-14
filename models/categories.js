/**
 * Created by cesarcruz on 3/10/15.
 * Category Model
 */

exports.module = function(sequelize, dataTypes) {


    var Category =  sequelize.define('Category', {
        category : {
            type: dataTypes.STRING,
            field: 'category'
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    Category.belongsTo(Category, {as : 'parentCategory'});

    return Category;
}