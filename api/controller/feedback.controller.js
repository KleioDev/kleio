/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel();

    var feedbackController = new Router()

        .post('/feedback', koaBody, loadModels, create);

    return feedbackController.routes();

}

function *create(){
    var data = this.request.body.fields,
        result,
        feedback;

    if(!feedback){
        this.throw('Bad Request', 400);
    }

    try {
        feedback = yield this.models['Feedback'].build(data);
    } catch(err) {
        this.throw('Invalid Parameters', 400);
    }

    try {
        result = yield feedback.save();
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = result;

}