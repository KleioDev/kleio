/**
 * Created by cesarcruz on 3/15/15.
 */
var koa = require('koa');
var router = require('koa-router')(),
    app,
    museumController = require('./controller/museum.controller.js');

module.exports = function(database) {

    app = koa();

    //Add models to context
    this.models = database;

    museumController();

    router

        .get('/', hello);

    app
        .use(router.routes())
        .use(router.allowedMethods());

    function *hello(){
        this.body = 'Hello World';
    }

//Add Models to context
    function *addToContext(models) {
        Object.assign(this, models);
        yield next;
    }

    return app;
}


