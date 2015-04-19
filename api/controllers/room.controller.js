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
 * Query Parameters: limit, offset, and name
 */
function *index(){
    var rooms,
        offset = this.query.page,
        limit = this.query.per_page,
        name = this.query.name,
        where = {}, Beacon = this.models['Beacon'];

    if(!offset) offset = 0;

    if(!limit) limit = 25

    if(name) where.name = name;

    try {
        rooms = yield this.models['Room'].findAll({
            order : '"id" ASC',
            limit : limit,
            offset : offset,
            where : where,
            include : [Beacon]
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!rooms || rooms.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { rooms : rooms};
}

/**
 * Get a single instance of Room
 */
function *show(){
    var room,
        id = this.params.id,
        Beacon = this.models['Beacon'];

    try {
        room = yield this.models['Room'].find({
            where : {
                id : id
            },
            include : [Beacon]
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!room) this.throw('Not Found', 404);

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
        Room = this.models['Room'];

    if(!payload || !payload.name || !payload.description){
        this.throw('Invalid Payload', 400);
    }

    try {
        this.sequelize.transaction( function(t) {
            return Room.create(payload, { transaction : t});
        })
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    this.status = 201;
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

    if(!payload){
        this.throw('Invalid Payload', 400);
    }

    try {
        result = this.sequelize.transaction( function(t) {
            return Room.update(payload, { where : { id : id }}, { transaction : t});
        })
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
 * Destroy an instance of Room
 */
 function *destroy(){
    var id = this.params.id,
        result,
        Room = this.models['Room'],
        ExhibitionRoom = this.models['ExhibitionRoom'],
        Beacon = this.models['Beacon'];

    try {
        result = this.sequelize.transaction( function (t) {
            return ExhibitionRoom.destroy({ where : { RoomId : id}}, { transaction : t})
            .then(function() {
                return Beacon.update({ RoomId : null},{ where : { RoomId : id }}, { transaction : t})
                .then(function() {
                    return Room.destroy({ where : { id : id}}, { transaction : id});
                })
            })
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
 }
