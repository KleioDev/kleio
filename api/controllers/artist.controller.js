/**
 * Created by cesarcruz on 4/19/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();


module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth,
        artistController = new Router()

        .get('/artists', loadModels, index)
        .get('/artists/:id', loadModels, show)
        .post('/artists', loadModels, koaBody, adminAuth, create)
        .put('/artists/:id', loadModels, koaBody, adminAuth, edit)
        .delete('/artists/:id', loadModels, koaBody, adminAuth, destroy);

        return artistController.routes();
}

/**
 * Get a list of all artists
 * Query parameters : page, per_page, artist
 */
function *index() {
    var artists,
        offset = this.query.page,
        limit = this.query.per_page,
        name = this.query.name,
        where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(name) where.name = name;

    try {
        artists = yield this.models['Artist'].findAll({
            offset : offset,
            limit : limit,
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!artists || artists.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { artists : artists };
}

/**
 * Get a single artist
 */
function *show() {
    var artist,
        id = this.params.id;


    try {
        artist = yield this.models['Artist'].find({
            where : { id : id}
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!artist) this.throw('Not Found', 404);

    this.status = 200;

    this.body = artist;
}

/**
 * Create an instance of Artist
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        Artist = this.models['Artist'];

    if(!payload || !payload.code) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function(t) {
            return Artist.create(payload, {transaction : t});
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
 * Update an Artist instance
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        Artist = this.models['Artist'];

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction(function (t) {
            return Artist.update(payload, {
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
 * Destroy a Artist instance
 */
function *destroy() {
    var id = this.params.id,
        Artist = this.models['Artist'],
        Artifact = this.models['Artifact'],
        result;

    try {
        result = yield this.sequelize.transaction(function (t) {
            return Artifact.update({ ArtistId : null}, { where : { ArtistId : id}}, { transaction : t})
                .then( function (t) {
                    return Artist.destroy({ where : { id : id}}, { transaction : t});
                })
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);


    this.status = 200;
}