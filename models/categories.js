/**
 * Created by cesarcruz on 3/10/15.
 * Category Model
 */

exports.module = function(sequelize, dataTypes) {


    var Category =  sequelize.define('Category', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        category : {
            type: DataTypes.STRING,
            allowNull : false
        },
        parentCategory : {
            type : DataTypes.INTEGER,
            allowNull : true
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    Category.belongsTo(Category, {as : 'parentCategory'});

    return Category;
}