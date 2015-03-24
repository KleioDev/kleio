/**
 * Created by cesarcruz on 3/10/15.
 * Object Model
 */

module.exports = function(sequelize, DataTypes) {

    var Artist = sequelize.import(__dirname + '/artist'),
        Content = sequelize.import(__dirname + '/content'),
        Category = sequelize.import(__dirname + '/categories'),
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
        image : {
            type : DataTypes.STRING(1000),
            allowNull : false
        },
        ArtistId : {
            type : DataTypes.INTEGER
        },
        QrcodeId : {
            type : DataTypes.INTEGER
        },
        CategoryId : {
            type : DataTypes.INTEGER
        },
        createdAt : {
            type : DataTypes.DATE
        },
        updatedAt : {
            type : DataTypes.DATE
        }
    }, {
        timestamps: true
    });

    Object.belongsTo(Artist);

    Object.belongsToMany(Content, {through: ObjectContent});

    Object.belongsTo(QRCode);

    Object.belongsTo(Artist);

    return Object;
};

