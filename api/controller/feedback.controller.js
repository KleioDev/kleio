/**
 * Created by cesarcruz on 3/23/15.
 */

var Router = require('koa-router');
var middleware = require('../middleware');
var koaBody = require('koa-better-body')();

module.exports = function() {

    var feedbackController = new Router()

    .post('/feedback', loadModels, koaBody, create);

    return feedbackController.routes();
}

function *create() {
    var data = this.request.body.fields;

    try {
        yield this.models['Feedback'].create(data);
    } catch (err) {
        if(err.name == 'SequelizeValidationError') {
            //Invalid parameters
            this.throw('Invalid Parameters', 400);
        }
    }
    this.status = 201;
}