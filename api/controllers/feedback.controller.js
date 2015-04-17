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

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var feedbackController = new Router()

        .get('/feedback', loadModels, adminAuth, index)
        .get('/feedback/:id', loadModels, adminAuth, show)
        .put('/feedback/:id', koaBody, loadModels, adminAuth, edit)
        .post('/feedback', koaBody, loadModels, create)
        .delete('/feedback/:id', koaBody, loadModels, adminAuth, destroy);

    return feedbackController.routes();

}

/**
 * Get a list of all feedback
 * Query parameters : page, per_page, title, seen, type, resolved
 */
function *index(){
    var feedbacks,
        offset = this.query.page,
        limit = this.query.per_page,
        title = this.query.title,
        seen = this.query.seen,
        type = this.query.type,
        where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(title) where.title = title;

    if(seen) where.seen = true;

    if(type) where.type = type;


    try {
        feedbacks = yield this.models['Feedback'].findAll({
            limit : limit,
            offset : offset,
            where : where
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!feedbacks || feedbacks.length < 1) this.throw('Not Found', 404);

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

    if(!feedback) this.throw('Not Found', 404);

    this.status = 200;

    this.body = feedback;
}

/**
 * Update an instance of Feedback
 * Parameter: id --> Feedback Id
 * Payload: title, message, type, MuseumId
 */
function *edit(){
    var payload = this.request.body.fields,
        Feedback = this.models['Feedback'],
        id = this.params.id,
        result;

        if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction( function (t) {
            return Feedback.update(payload, { where : { id : id } }, {transaction : t});
        });
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}

/**
 * Submit Feedback information
 * Payload : title, message, type
 *
 */
function *create(){
    var payload = this.request.body.fields,
        result;

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.models['Feedback'].create(feedback);
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 201;
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

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}