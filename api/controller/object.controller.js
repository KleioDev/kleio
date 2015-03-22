/**
 * Created by cesarcruz on 3/22/15.
 */


var Router = require('koa-router');
var middleware = require('../middleware');
var koaBody = require('koa-better-body')();

module.exports = function () {

    var loadModels = middleware.loadModel();

    var objectController = new Router();

    //TODO: Define Routes
}