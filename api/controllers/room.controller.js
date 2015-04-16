/**
 * Created by cesarcruz on 4/16/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth,
        roomController = new Router()

            .get('/room', loadModels, index)
            .get('/room/:id', loadModels, show)
            .post('/room', koaBody, loadModels, adminAuth, create)
            .put('/room/:id', koaBody, loadModels, adminAuth, edit)
            .delete('/room/:id', loadModels, adminAuth, destroy);

    return roomController.routes();
}

/**
 * Get a list of all rooms in the Museum
 * Query Parameters: limit, offset, name, and description
 */
function *index(){
    var rooms,
        queryString = this.query,
        where = {};

    if(!queryString.offset) queryString.offset = 0;


    if(!queryString.limit) queryString.limit = 25


    if(queryString.name) where.name = queryString.name;

    if(queryString.description) where.description = queryString.description;


    try {
        rooms = yield this.models['Room'].findAll({
            limit : queryString.limit,
            offset : queryString.offset,
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!rooms || rooms.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { rooms : rooms};
}

/**
 * Get a single instance of Room
 */
function *show(){
    var room,
        id = this.params.id;

    try {
        room = yield this.models['Room'].find({
            where : {
                id : id
            }
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!room){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = room;
}

/**
 * Create an Room instance
 * Required Payload: Name and Description
 * Optional: ibeacons
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        Room = this.models['Room'];

    if(!payload || !payload.name || !payload.description || payload.createdAt || payload.updatedAt){
        this.throw('Bad Request: Invalid Payload Parameters', 400);
    }

    try {
        result = this.sequelize.transaction( function(t) {
            return Room.create(payload, { transaction : t});
        })
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Internal Server Error', 500);

    this.status = 200;
}

/**
 * Update the attributes of a Room instance
 * Payload: name, description or ibeacons
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        Room = this.models['Room'];

    if(!payload || payload.createdAt || payload.updatedAt){
        this.throw('Bad Request: Invalid Payload Parameters', 400);
    }

    try {
        result = this.sequelize.transaction( function(t) {
            return Room.update(payload, { where : { id : id }}, { transaction : t});
        })
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Internal Server Error', 500);

    this.status = 200;
}

/**
 * Destroy an instance of Room
 */
 function *destroy(){
    var id = this.params.id,
        result;

    try {
        result = this.sequelize.transaction( function (t) {
            return Room.destroy({ where : { id : id}}, {transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Internal Server Error', 500);

    this.status = 200;
 }
