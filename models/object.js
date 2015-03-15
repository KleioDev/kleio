/**
 * Created by cesarcruz on 3/10/15.
 * Object Model
 */

exports.module = function(sequelize, DataTypes) {

    var Artist = sequelize.import(_dirname + '/artist'),
        Content = sequelize.import(__dirname + '/content'),
        Category = sequelize.import(__dirname + '/caetgories'),
        QRCode = sequelize.import(__dirname + '/qrcode'),
        ObjectContent = sequelize.import(__dirname + '/objectContent');


    var Object =  sequelize.define('Object', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT
        },
        medium : {
            type : DataTypes.STRING
        },
        classification : {
            type : DataTypes.STRING
        },
        attribution : {
            type : DataTypes.STRING
        },
        type : {
            type : DataTypes.STRING
        },
        dimensions : {
            type : DataTypes.STRING
        },
        dated : {
            type : DataTypes.STRING
        },
        period : {
            type : DataTypes.STRING
        },
        culture : {
            type : DataTypes.STRING
        },
        department : {
            type : DataTypes.STRING
        },
        objectNumber : {
            type : DataTypes.STRING
        },
        ArtistId : {
            type : DataTypes.INTEGER,
            references : 'Artist',
            referencesKey : 'id'
        }
    }, {
        freezeTableName : true,
        timestamps: true
    });

    Object.hasOne(Artist);

    Object.belongsToMany(Content, {through: ObjectContent});
    Content.belongsToMany(Object, {through: ObjectContent});

    //Object stores reference to one QRCode
    Object.belongsTo(QRCode);

    Object.belongsTo(Artist);

    Object.hasMany(Category);


    return Object;
}
