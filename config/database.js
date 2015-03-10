/**
 * Created by cesarcruz on 3/10/15.
 */
var Sequelize = require('sequelize'),
    dotenv = require('dotenv');

//Load Environment variables
dotenv.load();

exports.module = {
    sequelize : new Sequelize(process.env.DEVELOPMENT_DATABASE_NAME, process.env.DEVELOPMENT_DATABASE_USERNAME, null, {
        host : '127.0.0.1',
        pool : {
            max : 5,
            min : 0,
            idle : 10000
        },
        dialect : 'postgres'
    }),
    string : Sequelize.STRING,
    date : Sequelize.DATE,
    integer : Sequelize.INTEGER,
    boolean : Sequelize.BOOLEAN
};

