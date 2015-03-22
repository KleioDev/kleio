/**
 * Created by cesarcruz on 3/21/15.
 */
/**
 * Relay all application level information
 *
 */

var database = require('../models');
var server = require('../server');

module.exports = {
    models : database.sequelize.models,
    server : server.app
}