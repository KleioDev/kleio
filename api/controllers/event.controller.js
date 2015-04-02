/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle requests related to events
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel();

    var eventController = new Router()

        .get('/events', loadModels, index)
        .get('/events/:id', loadModels, show);


    return eventController.routes();
}

/**
 * Get a list of Museum Events, limited to 25 at a given time.
 * Query Parameters: page -> The page number that wants to fetched
 */
function *index() {
    var events,
        offset = this.query.page;

    if(!offset || offset < 1) {
        offset = 0;
    }

    try {

        events = yield this.models['Event'].findAll({
            order : '"eventDate" DESC',
            limit : 25,
            attributes : ['id', 'title', 'description', 'eventDate'],
            offset : offset
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

    //Check for a valid parameter
    //if(typeof id !== 'number'){
    //    this.throw('Bad Request', 400);
    //}

    try {
        event = yield this.models['Event'].find({
            where : { id : this.params.id}
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