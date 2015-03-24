/**
 * Created by cesarcruz on 3/23/15.
 */

var Router = require('koa-router');
var middleware = require('../middleware');
var koaBody = require('koa-better-body')();

module.exports = function() {

    var loadModels = middleware.loadModel();
    var feedbackController = new Router()

    .post('/feedback', loadModels, koaBody, create);

    return feedbackController.routes();
}

function *create() {
    var data = this.request.body.fields,
        museumId,
        result;

    if(!data) {
        this.throw('Bad Request', 404);
    }

    try {
        //Get the most recent Museum
        museumId = yield this.models['Museum'].findAll({
            order : '"updatedAt" DESC',
            limit : 1,
            attributes : ['id']
        });

        data['MuseumId'] = museumId[0].dataValues.id;

        result = yield this.models['Feedback'].create(data);

    } catch (err) {
        if(err.name == 'SequelizeValidationError') {
            //Invalid parameters
            this.throw('Invalid Parameters', 400);
        }
    }

    this.body = result;
    this.status = 201;
}