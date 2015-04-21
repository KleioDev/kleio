/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to events
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var eventController = new Router()

        .get('/events', loadModels, index)
        .get('/events/:id', loadModels, show)
        .post('/events', koaBody, loadModels, adminAuth, create)
        .put('/events/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/events/:id', loadModels, adminAuth, destroy);


    return eventController.routes();
}

/**
 * Get a list of Museum Events, limited to 25 at a given time.
 * Query Parameters: page, per_page, title
 */
function *index() {
    var events,
        offset = this.query.page,
        limit = this.query.per_page,
        title = this.query.title,
        where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(title) where.title = title;

    try {

        events = yield this.models['Event'].findAll({
            order : '"eventDate" DESC',
            limit : limit,
            offset : offset * limit,
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!events || events.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { events : events};
}

/**
 * Get a Museum Event
 * Parameter: id -> Event id
 */
function *show() {
    var event,
        id = this.params.id;

    try {
        event = yield this.models['Event'].find({
            where : { id : id}
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!event) this.throw('Not Found', 404);

    this.status = 200;

    this.body = event;
}

/**
 * Create an instance of Event
 * Payload: title, description, eventDate, image, location and author
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        Event = this.models['Event'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = this.sequelize.transaction(function(t) {
            return Event.create(payload, {transaction : t});
        });
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
 * Update an Event instance
 * Parameter: id --> EventId
 * Payload: title, description, eventDate, image, location and author
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        Event = this.models['Event'];

        if(!payload) this.throw('Invalid Payload', 400);


        try {
            result = yield this.sequelize.transaction(function (t) {
                return Event.update(payload, {
                    where : {
                        id : id
                    }
                }, {transaction : t});
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
 * Destroy an Event instance
 * Parameter: id --> EventId
 */
function *destroy() {
    var id = this.params.id,
        Event = this.models['Event'],
        result;

        try {
            result = yield this.sequelize.transaction(function (t) {
                return Event.destroy({
                    where : {
                        id : id
                    }
                });
            });
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }

        if(!result) this.throw('Not Found', 404);


        this.status = 200;
}