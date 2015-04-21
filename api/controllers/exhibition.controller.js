/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware  = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to exhibitions
 * @returns {*}
 */
module.exports = function(){

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
 * Query parameters : page, per_page, title
 */
function *index() {
    var exhibitions,
        offset = this.query.page,
        title = this.query.title,
        limit = this.query.per_page,
        where = {active : true};

    if(!offset) offset = 0;

    if(title) where.title = title;

    if(!limit) limit = 25;

    try {
        exhibitions = yield this.models['Exhibition'].findAll({
            order : '"createdAt" DESC',
            limit : limit,
            offset : offset * limit,
            where : where
        });

    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitions || exhibitions.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { exhibitions : exhibitions};

}

/**
 * Get a single exhibition based on id parameter
 * Parameter: id -> ExhibitionId
 */
function *show(){
    var exhibition,
        id = this.params.id,
        Artifact = this.models['Artifact'],
        Beacons = this.models['Beacon'];

    try {
        exhibition = yield this.models['Exhibition'].find({
            where : { id : id},
            include : [Artifact, Beacons]
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibition) this.throw('Not Found', 404);

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

    if(!exhibitions || exhibitions.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { exhibitions : exhibitions['Exhibitions']};
}

/**
 * Create an instance of Exhibition
 * Payload: title, description, active, image, museumId
 */
function *create(){
    var payload = this.request.body.fields,
        Exhibition = this.models['Exhibition'],
        result;

        if(!payload) this.throw('Invalid Payload', 400);

        try {
            result = yield this.sequelize.transaction( function (t) {
                return Exhibition.create(payload, {transaction : t});
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
 * Update an instance of Exhibition
 * Payload: title, description, active, image, museumId
 * Note: Will only update the available payload attributes
 */
function *edit(){
    var payload = this.request.body.fields,
        Exhibition = this.models['Exhibition'],
        id = this.params.id,
        result;

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction( function (t) {
            return Exhibition.update(payload, { where : { id : id } }, {transaction : t});
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
 * Destroy an instance of Exhibitions
 * Parameter: id --> Exhibition Id
 */
function *destroy(){
    var id = this.params.id,
        Exhibition = this.models['Exhibition'],
        Artifact = this.models['Artifact'],
        ExhibitionRoom = this.models['ExhibitionRoom'],
        ExhibitionBeacon = this.models['ExhibitionBeacon'],
        result;

        try {
            result = yield this.sequelize.transaction( function (t) {
                return Artifact.update({ ExhibitionId : null}, {where : { ExhibitionId : id}}, { transaction : t})
                .then(function(){
                    return ExhibitionRoom.destroy({ where : { ExhibitionId : id}}, { transaction : t})
                    .then( function () {
                        return ExhibitionBeacon.destroy({ where : {ExhibitionId : id}}, { transaction : t})
                        .then( function () {
                            return Exhibition.destroy({ where : { id : id}}, { transaction : t});
                        })
                    })
                })
            })
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }

        if(!result) this.throw('Not Found', 404);

        this.status = 200;
}