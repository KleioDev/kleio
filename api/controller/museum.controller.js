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

    var middleman = utils();

    var museumController = new Router()

        .get('/museum', middleman, index)
        .get('/museum/events', middleman, events)
        .get('/museum/news', middleman, news)
        .get('/museum/about', middleman, about)
        .get('/museum/terms', middleman, terms);


    return museumController.routes();

}


function *index() {
    //Had to go OG on this foo son
    this.body = yield this.sequelize.query('SELECT * FROM "Museum" WHERE "updatedAt" = (SELECT max("updatedAt") FROM "Museum");', { type: this.sequelize.QueryTypes.SELECT});
}

function *events() {
    var events = {};
    events['events'] = yield this.models['Article'].findAll({where : {type : 'event'}});
    this.body = events;
}

function *news() {
    var news = {};
    events['news'] = yield this.models['Article'].findAll({where : {type : 'news'}});
    this.body = news;
}

function *about() {}

function *terms() {}

