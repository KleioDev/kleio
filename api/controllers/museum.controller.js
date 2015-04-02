/**
 * Created by cesarcruz on 3/29/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle Requests Related to the Museum
 * @returns {*}
 */
module.exports = function(){
    var loadModels =  middleware.loadModel();

    var museumController = new Router()

        .get('/museum', loadModels, index);

    return museumController.routes();
}

/**
 * Get the most recently updated version of the Museum instance
 */
function *index(){

    try{
        var museum = yield this.models['Museum'].findAll({
            order : '"updatedAt" DESC',
            limit : 1,
            attributes : ['name', 'description', 'hoursOfOperation', 'email', 'phone', 'image', 'location', 'terms', 'about']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!museum || museum.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = museum[0];
}