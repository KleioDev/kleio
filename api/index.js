/**
 * Created by cesarcruz on 3/15/15.
 */
var koa = require('koa'),
    app,
    controllerBundle = require('./controllers')(),
    utils = require('./middleware');
    _ = require('lodash'),
    json = require('koa-json');

/**
 * Initialize API
 * @param database
 * @returns {*|exports}
 */


module.exports = function() {

    app = koa();

    app.use(json());

    controllerBundle.controllerNames.forEach(function(name){
        app.use(controllerBundle.controllers[name]);
    });

    app.on('error', function(err){
        log.error('Server Error', err);
    })

    return app;
}


