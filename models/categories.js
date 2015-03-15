/**
 * Created by cesarcruz on 3/10/15.
 * Category Model
 */

module.exports = function(sequelize, DataTypes) {


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

    Category.belongsTo(Category, {as : 'parentCategory_fk'});

    return Category;
};