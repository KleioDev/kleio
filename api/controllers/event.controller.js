/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body');

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
 * Query Parameters: page -> The page number that wants to fetched
 */
function *index() {
    var events,
        query = this.query,
        where = {};

    if(!query.offset || query.offset < 1) {
        offset = 0;
    }

    if(!query.limit){ query.limit = 25; }

    if(query.title){ where.title = query.title; }

    if(query.description){ where.description = query.description ;}

    try {

        events = yield this.models['Event'].findAll({
            order : '"eventDate" DESC',
            limit : query.limit,
            offset : offset,
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!events || events.length < 1){
        this.throw('Not Found', 404);
    }

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

    if(!event) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = event;
}

/**
 * Create an instance of Event
 * Payload: title, description, eventDate, image, location and author
 */
function *create(){
    var event = this.request.body.fields,
    result,
    Event = this.models['Event'];

    if(!event){
        this.throw('Bad Request', 400);
    }

    try {
        result = this.sequelize.transaction(function(t) {
            return Event.create(event, {transaction : t});
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
 * Update an Event instance
 * Parameter: id --> EventId
 * Payload: title, description, eventDate, image, location and author
 */
function *edit(){
    var event = this.request.body.fields,
        result,
        id = this.params.id,
        Event = this.models['Event'];

        if(!event) {
            this.throw('Bad Request', 400);
        }

        try {
            result = yield this.sequelize.transaction(function (t) {
                return Event.update(event, {
                    where : {
                        id : id
                    }
                }, {transaction : t});
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

        if(!result) {
            this.throw('Not Found', 404);
        }

        this.status = 200;
}