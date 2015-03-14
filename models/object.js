/**
 * Created by cesarcruz on 3/10/15.
 * Object Model
 */

exports.module = function(sequelize, DataTypes) {

    var Artist = sequelize.import(_dirname + '/artist'),
        Content = sequelize.import(__dirname + '/content'),
        Category = sequilze.import(__dirname + '/caetgories'),
        QRCode = sequelize.import(__dirname + '/qrcode');


    var Object =  sequelize.define('Object', {
        title : {
            type : DataTypes.STRING,
            field : 'title'
        },
        description : {
            type : DataTypes.TEXT,
            field : 'description'
        },
        medium : {
            type : DataTypes.STRING,
            field : 'medium'
        },
        classification : {
            type : DataTypes.STRING,
            field : 'classification'
        },
        attribution : {
            type : DataTypes.STRING,
            field : 'attribution'
        },
        type : {
            type : DataTypes.STRING,
            field : 'type'
        },
        dimensions : {
            type : DataTypes.STRING,
            field : 'dimensions'
        },
        dated : {
            type : DataTypes.STRING,
            field : 'dated'
        },
        period : {
            type : DataTypes.STRING,
            field : 'period'
        },
        culture : {
            type : DataTypes.STRING,
            field : 'culture'
        },
        department : {
            type : DataTypes.STRING,
            field : 'department'
        },
        objectNumber : {
            type : DataTypes.STRING,
            field : 'object_number'
        },
        artist : {
            type : DataTypes.INTEGER,
            field : 'artist'
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    Object.hasOne(Artist);

    Object.belongsToMany(Content, {through: 'ObjectContent'});
    Content.belongsToMany(Object, {through: 'ObjectContent'});

    //Object stores reference to one QRCode
    Object.belongsTo(QRCode);

    Object.belongsTo(Artist);

    Object.hasMany(Category);


    return Object;
}
