/**
 * Created by cesarcruz on 3/16/15.
 */


var Router = require('koa-router');
var middleman = require('../utils')();
var koaBody = require('koa-better-body')();


//TODO: Finish feedback routes and current events/news routes
//TODO: Add status codes and error messages (add this.throw)
//TODO: Change re-analyze middleware functions
/**
 * Handle routes related to the museum content
 * @param museum
 * @returns {*}
 */
module.exports = function() {

    var museumController = new Router()

        .get('/museum', middleman, index)
        .get('/museum/events', middleman, events)
        .get('/museum/news', middleman, news)
        .get('/museum/news/:title', middleman, news)
        .get('/museum/about', middleman, about)
        .get('/museum/terms', middleman, terms)
        .post('/museum/feedback', koaBody, middleman, feedback);

    return museumController.routes();
}

/**
 * Handle museum requests
 * Return: Museum information
 */
function *index() {
    var data;

    try {
        //Had to go OG on this foo son
        data =  yield this.models['Museum'].findAll({
            order : '"updatedAt" DESC',
            limit : 1,
            attributes : ['title', 'description', 'hours_of_operation', 'email', 'phone', 'image', 'location']
        });
    } catch(err) {

        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    //Check errors
    if(data == undefined || data.length < 1) {
        this.throw('Not Found', 404);

    }
        var resBody = {
            title : data[0].dataValues.title,
            "description" : data[0].dataValues.description,
            "hours_of_operation" : data[0].dataValues.hours_of_operation,
            "contact" : {
                "phone" : data[0].dataValues.phone,
                email : data[0].dataValues.email
            },
            "media_links" : data[0].dataValues.social_media_links,
            "image" : data[0].dataValues.image,
            "location" : data[0].dataValues.location
        }

        this.status = 200;

        this.body = resBody;


}

/**
 * Handle event requests
 * Get all events or filter by ID
 */
function *events() {
    //TODO: Sanitize parameters
    var events,
        resBody;

    try {
        if (this.params.title) {
            events = yield this.models['Article'].findOne( {where : {type : 'events', title : this.params.title}});

        } else {
            events = yield this.models['Article'].findAll({where : {type : 'events'}, attributes : ['title', 'content', 'event_date']});
        }
    }
    catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    if(events == undefined || (events.instanceOf(Array) && events.length < 1)) {
        this.throw('Not found', 404);
    } else {
        resBody = {
            events : events
        }
        this.status = 200;
        this.body = resBody;
    }
}

/**
 * Handle museum news requests
 * Return a single news article or the feed of news articles
 */
function *news() {
    //TODO: sanitize Parameters
    var news,
        resBody;

    try {
        if(this.params.title) {
            news = yield this.model['Article'].findOne({
                where : {
                    type : 'news',
                    title : this.params.title
                },
                attributes : ['title', 'content', 'author']
            });

            resBody = {
                title : news.title,
                content : news.content,
                author : news.author
            }
        } else {
            news = yield this.models['Article'].findAll({
                where : {
                    type : 'news'
                }, attributes : ['title', 'content', 'author']
            });

            resBody = {
                news : news
            }
        }
    } catch(err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    this.status = 200;
    this.body = resBody;
}

/**
 * Handle museum about requests
 */
function *about() {
    var about = {};
    try {
        about['about'] = yield this.models['Museum'].findAll({order : 'updatedAt DESC', limit : 1, attributes : ['about']});
    } catch(err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    if(about['about'] == undefined) {
        this.throw('Not Found', 404);
    } else {
        this.status = 200;
        this.body = about;
    }
}

/**
 * Handle museum terms requests
 */
function *terms() {
    var terms = {};
    try {
        terms['terms'] = yield this.models['Museum'].findAll({order : 'updatedAt DESC', limit : 1, attributes : ['terms']});
    } catch(err) {
        this.throw(err.message, 500);
    }

    if(terms['terms'] == undefined) {
        this.throw('Not Found', 404);
    } else {
        this.status = 200;
        this.body = terms;
    }
}

/**
 * Handle feedback requests
 * Insert feedback by users into the database
 */
function *feedback() {
    if(this.request.body) {
        try {
            yield this.models['Feedback'].create(this.request.fields);
        } catch (err) {
            this.throw(err.message, 500);
        }
    }
}

