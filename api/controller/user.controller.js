/**
 * Created by cesarcruz on 3/25/15.
 */

var Router = require('koa-router');
var middleware = require('../middleware');

module.exports = function() {
    var userController = new Router()

        .get('/user', index);

    return userController.routes();
}

function *index() {

}