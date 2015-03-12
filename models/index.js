/**
 * Created by cesarcruz on 3/10/15.
 * Initialize Sequelize and import models
 */


var Sequelize = require('sequelize'),
    dotenv = require('dotenv');

//Load environment variables
dotenv.load();

//Sequelize instance
//TODO: Make thread safe? does it even apply to node?
var sequelize = new Sequelize(process.env.DEVELOPMENT_DATABASE_NAME, process.env.DEVELOPMENT_DATABASE_USERNAME, null, {
    host : '127.0.0.1',
    pool : {
        max : 5,
        min : 0,
        idle : 10000
    },
    dialect : 'postgres'
});

var Feedback = sequelize.import(__dirname + '/feedback');

//Initialize the feedback model
module.exports = {
    feedback : Feedback
};
