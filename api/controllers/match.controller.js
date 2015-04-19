/**
 * Created by cesarcruz on 4/1/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Matches
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        auth = middleware.authentication,
        matchController = new Router()

        .get('/match/:id', loadModels, auth, index)
        .post('/match', loadModels, koaBody, auth, create);

    return matchController.routes();
}

/**
 * Get a Clue to initiate the match process
 * Parameter: id -> is 0 return a random clue, if > 0, return the appropriate Clue
 */
function *index(){
    var clue,
        id = parseInt(this.params.id),
        count;

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        if(id === 0){ //GET a random Clue
            count = yield this.models['Clue'].count();
            clue = yield this.models['Clue'].find({
                where : {
                    id : Math.random() * (count - 1) + 1
                }
            });
        } else {
            clue = yield this.models['Clue'].find({
                where : {
                    id : id
                }
            });
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!clue) this.throw('Not Found', 404);

    this.status = 200;

    this.body = clue;


}

/**
 * Submit a guess to a given Clue
 * Payload : {
 *  ClueId : An Integer with the id of the Clue,
 *  UserId : An Integer with the id of the User trying to match.
 *  qrcode : A String with the qr code that is being tested
 */
function *create(){
    var match,
        artifact,
        attempt = this.request.body.fields,
        result;

    try {
        //Check to see if the user has tried this before.
        match = yield this.models['Match'].find({
            where : {
                UserId : attempt.UserId,
                ClueId : attempt.ClueId
            }
        });

        artifact = yield this.models['Artifact'].find({
            where : {
                qrcode : attempt.qrcode
            }
        });

        if(artifact){
            attempt['correct'] = true;

            if(match){
                match['correct'] = true;
            }
        }

        if(!match){

            attempt['attempts'] = 1;

            console.log(attempt);

            yield this.models['Match'].create(attempt);

        } else {
            match.attempts++;

            if(match.attempts > 3){
                this.throw('Forbidden', 403);
            }

            if(match.correct){
               this.throw('Clue already solved', 403);
            }
            result = match.save();
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = result;
}