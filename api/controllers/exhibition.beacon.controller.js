/**
 * Created by cesarcruz on 4/16/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){
    var adminAuth = middleware.adminAuth,
        loadModels = middleware.loadModel();

    var exhibitionBeaconController = new Router()

        .get('/exhibition/beacon', loadModels, index)
        .get('/exhibition/beacon/:id', loadModels, show)
        .post('/exhibition/beacon', loadModels, koaBody, create)
        .put('/exhibition/beacon/:id', loadModels, koaBody, edit)
        .delete('/exhibition/beacon/:id', loadModels, destroy);

    return exhibitionBeaconController.routes();
}

/**
 * Get a list of all associations between exhibitions
 * and all of the iBeacons that belong to the exhibitions
 */
function *index(){
    var exhibitionBeacons;

    try{
        exhibitionBeacons = yield this.models['ExhibitionBeacon'].findAll();
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitionBeacons || exhibitionBeacons.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { exhibitionBeacons : exhibitionBeacons };
}

/**
 * Get a single association between an Exhibition and
 * an iBeacon
 */
function *show(){
    var id = this.params.id,
        exhibitionBeacon;

    try{
        exhibitionBeacon = yield this.models['ExhibitionBeacon'].find({
            where : {
                id : id
            }
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitionBeacon){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = exhibitionBeacon;
}

/**
 * Create an association between an Exhibition and an iBeacon
 */
function *create(){
    var payload = this.request.body.fields,
        ExhibitionBeacon = this.models['ExhibitionBeacon'];

    if(!payload || !payload.ExhibitionId || !payload.BeaconId) this.throw('Bad Request: Invalid Payload Parameters');

    try{
        yield this.sequelize.transaction( function (t) {
            return ExhibitionBeacon.create({
                ExhibitionId : payload.ExhibitionId,
                BeaconId : payload.BeaconId
            }, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

}

/**
 * Edit an existing association between Exhibition and iBeacons
 */
function *edit(){
    var payload = this.request.body.fields,
        id = this.params.id,
        ExhibitionBeacon = this.models['ExhibitionBeacon'];

    if(!payload) this.throw('Bad Request: Invalid Payload Parameters', 400);

    try {
        yield this.sequelize.transaction( function (t) {
            return ExhibitionBeacon.update(payload, {
                where : {
                    id : id
                }
            }, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;
}

/**
 * Dissociate Exhibition from iBeacons
 */
function *destroy(){
    var id = this.params.id,
        ExhibitionBeacon = this.models['ExhibitionBeacon'];

    try {
        yield this.sequelize.transaction( function (t) {
            return ExhibitionBeacon.destroy({ where : { id : id }}, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;
}