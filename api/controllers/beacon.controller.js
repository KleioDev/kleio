/**
 * Created by cesarcruz on 4/8/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel(),
        beaconController = new Router()

            .get('/beacon', loadModels, index)
            .get('/beacon/:id', loadModels, show)
            .post('/beacon', koaBody, loadModels, create)
            .put('/beacon/:id', koaBody, loadModels, edit)
            .delete('/beacon/:id', loadModels, destroy);

    return beaconController.routes();
}

/**
 * Get a list of Beacons
 * Query Parameters: page -> The page number that wants to fetched
 */
function *index() {
    var beacons,
        offset = this.request.query.offset,
        limit = this.request.query.limit;

    if(!offset || offset < 1) {
        offset = 0;
    }

    if(!limit || limit < 1){
        limit = 25;
    }

    try {

        beacons = yield this.models['Beacon'].findAll({
            limit : limit,
            offset : offset
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!beacons || beacons.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { beacons : beacons};
}

/**
 * Get a single beacon
 * Parameter: id -> Beacon id
 */
function *show() {
    var beacon,
        id = this.params.id;

    try {
        beacon = yield this.models['Beacon'].find({
            where : { id : id}
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!beacon) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = beacon;
}

/**
 * Create an instance of Beacon
 * Payload: code
 */
function *create(){
    var beacon = this.request.body.fields,
        result,
        Beacon = this.models['Beacon'];

    if(!beacon){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction(function(t) {
            return Beacon.create(beacon, {transaction : t});
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
 * Update an Beacon instance
 * Parameter: id --> BeaconId
 * Payload: code
 */
function *edit(){
    var beacon = this.request.body.fields,
        result,
        id = this.params.id,
        Beacon = this.models['Beacon'];

    if(!beacon) {
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction(function (t) {
            return Beacon.update(beacon, {
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
 * Destroy a Beacon instance
 * Parameter: id --> BeaconId
 */
function *destroy() {
    var id = this.params.id,
        Beacon = this.models['Beacon'],
        result;

    try {
        result = yield this.sequelize.transaction(function (t) {
            return Beacon.destroy({
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