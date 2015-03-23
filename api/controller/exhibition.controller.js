/**
 * Created by cesarcruz on 3/22/15.
 */


var Router = require('koa-router');
var middleware = require('../middleware');
var koaBody = require('koa-better-body')();

module.exports = function () {

    var loadModels = middleware.loadModel();

    var exhibitionController = new Router()

    .get('/exhibition', loadModels, index)
    .get('/exhibition/:near', loadModels, near);

    return exhibitionController.routes();
}

function *index() {
    var result,
        offset = this.request.query.page;

    if(!offset) {
        offset = 1;
    }

    try {
        result = yield this.models['Exhibition'].findAll({
            limit : 10,
            offset : offset
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result || result.length < 1) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { exhibitions : result }
}

//TODO: Implement this
function *near() {
}