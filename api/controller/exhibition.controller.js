/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware  = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    //TODO: Implement master collection

    var loadModels = middleware.loadModel();

    var exhibitionController = new Router()

        .get('/exhibition', loadModels, index)
        .get('/exhibition/:id', loadModels, show)
        .get('/exhibition/near/me', loadModels, near);

    return exhibitionController.routes();
}

/**
 *
 */
function *index() {
    var exhibitions,
        offset = this.query.page;

    if(!offset || offset < 1){
        offset = 1;
    }

    //TODO: Show(return) number of objects in an exhibition
    try {
        exhibitions = yield this.models['Exhibition'].findAll({
            order : '"createdAt" DESC',
            limit : 10,
            attributes : ['image', 'title', 'description']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitions || exhibitions.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { exhibitions : exhibitions};

}

/**
 * Get a single exhibition based on id parameter
 */
function *show(){
    var exhibition,
        id = this.params.id;

    if(!id || id < 1){
        this.throw('Bad Request', 400);
    }

    try {
        exhibition = yield this.models['Exhibition'].find({
            where : { id : id}
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibition){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = exhibition;

}

function *near(){
    var exhibitions,
        beacons = [],
        query = this.request.query,
        Exhibition = this.models['Exhibition'];

    try {
        Object.keys(query).forEach(function(code, index){
            beacons.push(query[code]);
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }


    try {
        exhibitions = yield this.models['Beacon'].find({
            where : {
                code : beacons
            },
            include : [Exhibition]

        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitions || exhibitions.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { exhibitions : exhibitions['Exhibitions']};
}