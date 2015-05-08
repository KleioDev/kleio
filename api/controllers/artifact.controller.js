/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle request related to Artifacts
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var artifactController = new Router()
        .get('/artifact', loadModels, index)
        .get('/artifact/:id', loadModels, show)
        .post('/artifact', koaBody, loadModels, adminAuth, create)
        .put('/artifact/:id', koaBody, loadModels,  edit)
        .delete('/artifact/:id', loadModels, adminAuth, destroy);

    return artifactController.routes();
}

/**
 * Get a list of all artifacts
 * The list will be limited to 10 at a time.
 * Query Parameters: page, per_page, title, exhibition_id, artist, top
 */
function *index(){
    var artifacts,
        offset = this.request.query.page,
        limit = this.request.query.per_page,
        artist = this.query.artist,
        exhibition = this.query.exhibition_id,
        title = this.query.title,
        top = this.query.top,
        where = {}, Artist = this.models['Artist'],
        Exhibition = this.models['Exhibition'];

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(title) {//Define search

        where.title = {

            $iLike : '%' + title + '%'

        }
    }

    if(exhibition) where.ExhibitionId = exhibition;

    var order = '"createdAt" DESC';
    if(top) order = '"interactions" DESC';


    if(artist){
        var res;

        try {
            res = yield this.models['Artist'].find({
                where : { name : artist},
                limit : 1
            });
        } catch(err){
            this.throw(err.message, err.status || 500);
        }

        if(!res){
            this.throw('Not Found', 404)
        }

        where.ArtistId = res.id;
    }


    try {
        artifacts = yield this.models['Artifact'].findAll({
            order : order,
            limit : limit,
            offset : offset * limit,
            where : where,
            include : [Artist, Exhibition]
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!artifacts || artifacts.length < 1) this.throw('Not Found', 404);


    this.status = 200;

    this.body = { artifacts : artifacts};

}

/**
 * Get a single artifact instance
 * Parameter: id -> ArtifactId
 */
function *show(){
    var artifact,
        id = this.params.id,
        scan = this.query.scan,
        phone = this.query.phone;


    try {
        var Artifact = this.models['Artifact'],
            Video = this.models['Video'],
            Audible = this.models['Audible'],
            Image = this.models['Image'],
            Text = this.models['Text'],
            Artist = this.models['Artist'],
            Exhibition = this.models['Exhibition'];

        artifact = yield Artifact.find({
            where : {
                id : id
            },
            include : [Video, Audible, Image, Text, Artist, Exhibition]
        });

        if(!artifact) this.throw('Not Found', 404);

        if(scan){
            var interaction = parseInt(artifact.interactions);

            artifact.interactions = interaction + 1;

            yield this.sequelize.transaction(function(t){
                return artifact.save({ transaction : t});
            });
        }

        if(phone){
            var InteractiveUser = this.models['InteractiveUser'];

            var payload = {};

            var date = new Date();

            payload.year = date.getFullYear();

            payload.month = date.getMonth();

            payload.interactiveUser = phone;

            var currInteraction = yield this.models['InteractiveUser'].find({where : {
                year : payload.year,
                month : payload.month,
                interactiveUser : payload.interactiveUser
            }});

            if(!currInteraction){
                yield this.sequelize.transaction(function(t){
                    return InteractiveUser.create(payload, { transaction : t});
                });
            }
        }




    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!artifact) this.throw('Not Found', 404);


    this.status = 200;

    this.body = artifact;
}

/**
 * Create an instance of Artifacts
 * Payload: title, description, medium, classification, attribution, type, dimensions, dated, period,
 * culture, department, objectNumber, image, ArtistId, ExhibitionId, and qrcode
 */
function *create(){
    var payload = this.request.body.fields,
        Artifact = this.models['Artifact'];

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        yield this.sequelize.transaction( function (t) {
            return Artifact.create(payload, {transaction : t});
        });
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
 * Update an instance of Artifact
 */
function *edit(){
    var payload = this.request.body.fields,
        Artifact = this.models['Artifact'],
        id = this.params.id,
        result;

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction( function (t) {
            return Artifact.update(payload, { where : { id : id } }, {transaction : t});
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
 * Destroy an instance of Artifact
 * Parameter: id --> Artifact Id
 */
function *destroy(){
    var id = this.params.id,
        Artifact = this.models['Artifact'],
        ArtifactAudible = this.models['ArtifactAudible'],
        ArtifactArchive = this.models['ArtifactText'],
        ArtifactImage = this.models['ArtifactImage'],
        ArtifactVideo = this.models['ArtifactVideo'],
        result;

    try {
        result = yield this.sequelize.transaction( function (t) {
            return ArtifactAudible.destroy({where : {ArtifactId : id}}, {transaction : t})
            .then(function () {
                return ArtifactArchive.destroy({ where : { ArtifactId : id}}, { transaction : t})
                .then(function(){
                    return ArtifactImage.destroy({ where : { ArtifactId : id}}, { transaction : t})
                    .then(function(){
                        return ArtifactVideo.destroy({where : { ArtifactId : id}}, { transaction : t})
                        .then(function(){
                            return Artifact.destroy({ where : { id : id }}, { transaction : t});
                        })
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

