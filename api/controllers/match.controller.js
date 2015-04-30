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
 *
 */
function *index(){
    var clue,
        id = parseInt(this.params.id),
        count, Match = this.models['Match'];

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        if(id === 0){

            //GET Clues that the user has not answered, nor played.
            var clues = yield this.models['Clue'].findAll({
                include : [{
                    model : Match,
                    where : {
                        UserId : { $ne : this.state.user.id},
                        attempts : 0,
                        correct : false
                    },
                    attributes : ['attempts', 'correct']
                }],
                attributes : ['image', 'pointsValue', 'id']
            });

            clue = clues[Math.floor(Math.random() * (clues.length - 1))];

        } else {

            //Get a clue that I know of
            clue = yield this.models['Clue'].find({
                where : {
                    id : id
                },
                include : [{
                    model : Match,
                    attributes : ['attempts', 'correct']

                }],
                attributes : ['image', 'pointsValue', 'id']
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
                id : attempt.qrcode
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