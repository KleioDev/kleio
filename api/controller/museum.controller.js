/**
 * Created by cesarcruz on 3/16/15.
 */


var Router = require('koa-router');
var utils = require('../utils');

//TODO: Define routes

//TODO: Define route methods

//TODO: Define try/catch statements to queries for proper error handling

//TODO: Add status codes and error messages
/**
 * Handle routes related to the museum content
 * @param museum
 * @returns {*}
 */
module.exports = function()
{

    var middleman = utils();

    var museumController = new Router()

        .get('/museum', middleman, index)
        .get('/museum/events', middleman, events)
        .get('/museum/events/:id', middleman, events)
        .get('/museum/news', middleman, news)
        .get('/museum/news/:id', middleman, news)
        .get('/museum/about', middleman, about)
        .get('/museum/terms', middleman, terms);


    return museumController.routes();

}


function *index()
{
    var data;

    try {
        //Had to go OG on this foo son
        data = yield this.sequelize.query('SELECT * FROM "Museum" WHERE "updatedAt" = (SELECT max("updatedAt") FROM "Museum");', { type: this.sequelize.QueryTypes.SELECT});
    } catch(err) {

        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }

    //Check errors
    if(data.length == 0 || data == undefined) {
        this.throw('Not Found', 404);

    } else {
        var resBody = {
            "title" : data.title,
            "description" : data.description,
            "hours_of_operation" : data.hours_of_operation,
            "contact" : {
                "phone" : data.phone,
                email : data.email
            },
            "media_links" : data.social_media_links,
            "image" : data.image
        }

        this.status = 200;

        this.body = resBody;
    }

}

function *events()
{
    try
    {
        var events = {};
        events['events'] = yield this.models['Article'].findAll({where : {type : 'sauce'}});
    }
    catch (err)
    {
        this.body = 'Error has been caught';
    }



}

function *news()
{
    try
    {
        var news = {};
        news['news'] = yield this.models['Article'].findAll({where : {type : 'news'}});
        this.body = news;
    } catch(err)
    {
        console.log('something');
    }

}

function *about() {}

function *terms() {}

