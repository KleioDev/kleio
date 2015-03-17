/**
 * Created by cesarcruz on 3/15/15.
 */
var koa = require('koa'),
    app,
    controllerBundle = require('./controller')(),
    utils = require('./utils');
    _ = require('lodash');

/**
 * Initialize API
 * @param database
 * @returns {*|exports}
 */

//TODO: Somehow add models here


module.exports = function(database) {

    app = koa();

    //Add models to context
    var middleman = utils(database);

    controllerBundle.controllerNames.forEach(function(name){
        app.use(controllerBundle.controllers[name]);
    });

    function *hello(){
        this.body = 'Hello World';
    }

    return app;
}


