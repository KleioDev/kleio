/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Feedback
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel();

    var feedbackController = new Router()

        .get('/feedback', loadModels, index)
        .get('/feedback/:id', loadModels, show)
        .put('/feedback/:id', koaBody, loadModels, edit)
        .post('/feedback', koaBody, loadModels, create)
        .delete('/feedback/:id', koaBody, loadModels, destroy);

    return feedbackController.routes();

}

/**
 * Get a list of all feedback
 * Parameter: limit : limit the amount of instances returned, offset : page fetched from the database, based on limit
 */
function *index(){
    var feedbacks,
        offset = this.request.query.offset,
        limit = this.request.query.limit;

        if(!offset) {
            offset = 0;
        }

        if(!limit) {
            limit = 25;
        }

    try {
        feedbacks = yield this.models['Feedback'].findAll({
            limit : limit,
            offset : offset
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!feedbacks || feedbacks.length < 1) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { feedbacks : feedbacks };
}

/**
 * Show a single instance of Feedback
 * Parameter: id --> Feedback Id
 */
function *show(){
    var id = this.params.id,
        feedback;

    try {
        feedback = yield this.models['Feedback'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!feedback) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = feedback;
}

/**
 * Update an instance of Feedback
 * Parameter: id --> Feedback Id
 * Payload: title, message, type, MuseumId
 */
function *edit(){
    var feedback = this.request.body.fields,
        Feedback = this.models['Feedback'],
        id = this.params.id,
        result;

        if(!feedback){
            this.throw('Bad Request', 400);
        }

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Feedback.update(feedback, { where : { id : id } }, {transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

/**
 * Submit Feedback information
 * Payload : {
 *  title : String with the title
 *  message : String with the feedback message
 *  type : String with the feedback type, could be bug, general or content_issue
 * }
 */
function *create(){
    //x-www-form-urlencoded
    var feedback = this.request.body.fields,
        result;

    if(!feedback){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.models['Feedback'].create(feedback);
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Parameters', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result){
        this.throw('Not Found', 404);
    }

    this.status = 200;

}

/**
 * Destroy an instance of Feedback
 * Parameter: id --> Feedback Id
 */
function *destroy(){
    var id = this.params.id,
        Feedback = this.models['Feedback'],
        result;

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Feedback.destroy({ where : { id : id}}, { transaction : t});
        })
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}