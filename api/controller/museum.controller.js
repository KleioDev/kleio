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
        .get('/museum/events/:title', middleman, singleEvent)
        .get('/museum/news', middleman, news)
        .get('/museum/news/:title', middleman, singleNews)
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
    var museum;

    try {
        //Had to go OG on this foo son
        museum =  yield this.models['Museum'].findAll({
            order : '"updatedAt" DESC',
            limit : 1,
            attributes : ['title', 'description', 'hours_of_operation', 'email', 'phone', 'image', 'location']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    //Check errors
    if(!museum || museum.length < 1) {
        this.throw('Not Found', 404);

    }
    var resBody = {
        title : data[0].dataValues.title,
        description : data[0].dataValues.description,
        hours_of_operation : data[0].dataValues.hours_of_operation,
        contact : {
            phone : data[0].dataValues.phone,
            email : data[0].dataValues.email
        },
        media_links : data[0].dataValues.social_media_links,
        image : data[0].dataValues.image,
        location : data[0].dataValues.location
    }

    this.status = 200;
    this.body = resBody;


}

/**
 * Handle event requests
 * Get all events or filter by ID
 */
function *events() {
    var events,
        resBody;

    try {
        events = yield this.models['Article'].findAll({
            where : {
                type : 'events'
            }, attributes : ['title', 'content', 'event_date']
        });
    }
    catch (err) {
        this.throw(err.message, 500);
    }

    if(!events || (events.instanceOf(Array) && events.length < 1)) {
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
 * Handle single event requests
 */
function *singleEvent() {
    var event;

    if(this.params.title) {
        try {
            event = yield this.models['Article'].findOne({
                where : {
                    type : 'events',
                    title : this.params.title,
                    attributes : ['title', 'content', 'event_day']
                }
            });

            if(!event['title']) {
                this.throw('Not Found', 404);
            }

            this.status = 200;
            this.body = event;

        } catch(err) {
            this.throw(err.message, err.status || 500);
        }
    } else {
        //Redirect to events feed
        this.redirect('/museum/events');
    }
}

/**
 * Handle museum news requests
 * Return a single news article or the feed of news articles
 */
function *news() {
    var news,
        resBody;

    try {
        news = yield this.models['Article'].findAll({
            where : {
                type : 'news'
            }, attributes : ['title', 'content', 'author']
        });
        resBody = {
            news: news
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!news || news.length < 1) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
    this.body = resBody;
}

/**
 * Handle single news requests
 */
function *singleNews() {
    var news;

    if(this.params.title) {
        try {
            news = yield this.model['Article'].findOne({
                where : {
                    type : 'news',
                    title : this.params.title
                },
                attributes : ['title', 'content', 'author']
            });
        } catch (err) {
            this.throw(err.message, err.status || 500);
        }

        if(!news['title']) {
            this.throw('Not Found', 404);
        }

        this.status = 200;
        this.body = news;

    } else {
        this.redirect('/museum/news');
    }
}

/**
 * Handle museum about requests
 */
function *about() {
    var about = {};
    try {
        about['about'] = yield this.models['Museum'].findAll({
            order : 'updatedAt DESC',
            limit : 1,
            attributes : ['about']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!about['about']) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
    this.body = about;
}

/**
 * Handle museum terms requests
 */
function *terms() {
    var terms = {};
    try {
        terms['terms'] = yield this.models['Museum'].findAll({
            order : 'updatedAt DESC',
            limit : 1,
            attributes : ['terms']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!terms['terms']) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
    this.body = terms;
}

/**
 * Handle feedback requests
 * Insert feedback by users into the database
 */
function *feedback() {
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

