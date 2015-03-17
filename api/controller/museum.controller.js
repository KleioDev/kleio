/**
 * Created by cesarcruz on 3/16/15.
 */


var Router = require('koa-router');
var utils = require('../utils');

//TODO: Define routes

//TODO: Define route methods

/**
 *
 * @param museum
 * @returns {*}
 */
module.exports = function() {

    var middleman = utils('Museum');

    var museumController = new Router()

        .get('/museum', middleman, index)
        .get('/museum/events')
        .get('/museum/news')
        .get('/museum/about')
        .get('/museum/terms');


    return museumController.routes();

}


function *index() {
    var data = yield this.model.findOne({ where : {title : 'Musa'}});
    this.body = data;

}