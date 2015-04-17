/**
 * Created by cesarcruz on 4/8/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth,
        beaconController = new Router()

            .get('/beacon', loadModels, index)
            .get('/beacon/:id', loadModels, show)
            .post('/beacon', koaBody, loadModels, adminAuth, create)
            .put('/beacon/:id', koaBody, loadModels, adminAuth, edit)
            .delete('/beacon/:id', loadModels, adminAuth, destroy);

    return beaconController.routes();
}

/**
 * Get a list of Beacons
 * Query Parameters: page, per_page, beacon_code
 */
function *index() {
    var beacons,
        offset = this.query.page,
        limit = this.query.per_page,
        code = this.query.beacon_code,
        where = {}, Room = this.models['Room'];

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(code) where.code = code;

    try {

        beacons = yield this.models['Beacon'].findAll({
            limit : limit,
            offset : offset,
            where : where,
            include : [Room]
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!beacons || beacons.length < 1) this.throw('Not Found', 404);


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

    if(!beacon) this.throw('Not Found', 404);

    this.status = 200;

    this.body = beacon;
}

/**
 * Create an instance of Beacon
 * Payload: code
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        Beacon = this.models['Beacon'];

    if(!payload || !payload.code) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function(t) {
            return Beacon.create(payload, {transaction : t});
        });
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 201;

}

/**
 * Update an Beacon instance
 * Parameter: id --> BeaconId
 * Payload: code
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        Beacon = this.models['Beacon'];

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction(function (t) {
            return Beacon.update(payload, {
                where : {
                    id : id
                }
            }, {transaction : t});
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

    if(!result) this.throw('Not Found', 404);


    this.status = 200;
}