/**
 * Created by cesarcruz on 3/16/15.
 */


var router = require('koa-router')();
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

    router

        .get('/museum', middleman, index)
        .get('/museum/events')
        .get('/museum/news')
        .get('/museum/about')
        .get('/museum/terms');

    function *index() {
        //var current = yield museum.findOne({where : {title : 'Musa'}});
        console.log('Something');
        console.log(this.models);
    }


    return router.routes();

}