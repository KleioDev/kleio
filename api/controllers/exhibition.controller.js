/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware  = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle requests related to exhibitions
 * @returns {*}
 */
module.exports = function(){

    //TODO: Implement master collection

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var exhibitionController = new Router()

        .get('/exhibition', loadModels, index)
        .get('/exhibition/:id', loadModels, show)
        .get('/exhibition/near/me', loadModels, near)
        .post('/exhibition', koaBody, loadModels, adminAuth, create)
        .put('/exhibition/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/exhibition/:id', loadModels, adminAuth, destroy);

    return exhibitionController.routes();
}

/**
 * Get a list of al exhibitions, limited to 25 at a time.
 * Query Parameter: page -> The page number that wants to fetched
 */
function *index() {
    var exhibitions,
        offset = this.query.page,
        title = this.query.title,
        description = this.query.description,
        limit = this.query.limit;

    if(!offset || offset < 1){
        offset = 0;
    }
    var where = {active : true};

    if(title) {
        where.title = title;
    }

    if(description) {
        where.description = description;
    }

    if(!limit) {
        limit = 25;
    }

    //TODO: Show(return) number of objects in an exhibition
    try {
        exhibitions = yield this.models['Exhibition'].findAll({
            order : '"createdAt" DESC',
            limit : limit,
            offset : offset,
            where : where
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
 * Parameter: id -> ExhibitionId
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

/**
 * Get a list of exhibitions near my location
 * Query Parameters: beacon : beacon codes that will be used to locate exhibitions
 */
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

/**
 * Create an instance of Exhibition
 * Payload: title, description, active, image, museumId
 */
function *create(){
    var exhibition = this.request.body.fields,
        Exhibition = this.models['Exhibition'],
        result;

        if(!exhibition){
            this.throw('Bad Request', 400);
        }

        try {
            result = yield this.sequelize.transaction( function (t) {
                return Exhibition.create(exhibition, {transaction : t});
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
 * Update an instance of Exhibition
 * Payload: title, description, active, image, museumId
 * Note: Will only update the available payload attributes
 */
function *edit(){
    var exhibition = this.request.body.fields,
        Exhibition = this.models['Exhibition'],
        id = this.params.id,
        result;

    if(!exhibition){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Exhibition.update(exhibition, { where : { id : id } }, {transaction : t});
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
 * Destroy an instance of Exhibitions
 * Parameter: id --> Exhibition Id
 */
function *destroy(){
    var id = this.params.id,
        Exhibition = this.models['Exhibition'],
        result;

        try {
            result = yield this.sequelize.transaction( function (t) {
                return Exhibition.destroy({ where : { id : id}}, { transaction : t});
            })
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }

        if(!result) {
            this.throw('Not Found', 404);
        }

        this.status = 200;
}