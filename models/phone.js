/**
 * Created by cesarcruz on 4/28/15.
 */


module.exports = function(sequelize, DataTypes){

    var Phone = sequelize.define('Phone', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        token : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        os : {
            type : DataTypes.ENUM('android', 'ios'),
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps : true
    });

    return Phone;
}