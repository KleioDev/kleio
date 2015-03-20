/**
 * Created by cesarcruz on 3/16/15.
 */


var Router = require('koa-router');
var middleman = require('../utils')();

//TODO: Define route methods

//TODO: Define try/catch statements to queries for proper error handling

//TODO: Add status codes and error messages
/**
 * Handle routes related to the museum content
 * @param museum
 * @returns {*}
 */
module.exports = function() {

    var museumController = new Router()

        .get('/museum', middleman, index)
        .get('/museum/events', middleman, events)
        .get('/museum/events/:title', middleman, events)
        .get('/museum/news', middleman, news)
        .get('/museum/news/:title', middleman, news)
        .get('/museum/about', middleman, about)
        .get('/museum/terms', middleman, terms);

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
        data = yield yield this.models['Museum'].findAll({
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

    } else {
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
            events = yield this.models['Article'].findAll({where : {type : 'events'}, include : ['title', 'content', 'event_date']});
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
                include : ['title', 'content', 'author']
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
                }, include : ['title', 'content', 'author']
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
        about['about'] = yield this.models['Museum'].findAll({order : 'updatedAt DESC', limit : 1, include : ['about']});
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
        terms['terms'] = yield this.models['Museum'].findAll({order : 'updatedAt DESC', limit : 1, include : ['terms']});
    } catch(err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    if(terms['terms'] == undefined) {
        this.throw('Not Found', 404);
    } else {
        this.status = 200;
        this.body = terms;
    }
}

