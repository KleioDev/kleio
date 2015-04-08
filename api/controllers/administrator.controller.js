/**
 * Created by cesarcruz on 4/7/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    bcrypt = require('bcrypt'),
    koaBody = require('koa-better-body')();

/**
 * Handle request related to Artifacts
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel();

    var administratorController = new Router()
        .get('/administrator', loadModels, index)
        .get('/administrator/:id', loadModels, show)
        .post('/administrator', koaBody, loadModels, create)
       // .put('/administrator/:id', loadModels, edit)
       // .delete('/administrator/:id', loadModels, destroy);

    return administratorController.routes();
}

/**
 * Get a list of administrators for the Museum
 * Parameters: {
 *  limit : amount of administrators to fetch in a single try.
 *  page : the number of the page to fetch
 *  }
 */
function *index(){
    var offset = this.request.query.page,
        limit = this.request.query.limit,
        administrators;

    if(!offset) { //Set default offset
        offset = 0;
    }

    if(!limit) { //Set default limit
        limit = 10
    }

    try {
        administrators = yield this.models['Administrator'].findAll({
            limit : limit,
            offset : offset,
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone']
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!administrators || administrators.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { administrators : administrators}
}

function *show(){
    var id = this.params.id,
    administrator;

    try {
        administrator = yield this.models['Administrator'].find({
            where : {
                id : id
            },
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!administrator) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = administrator;
}



/**
 * Create an Administrator Instance
 * Payload: Name, email, phone and a password.
 */
function *create(){
    var administrator = this.request.body.fields,
        Administrator = this.models['Administrator'];

    if(!administrator){
        this.throw('Bad Request', 400);
    }

    //TODO: Make async later
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(administrator.password, salt);

    administrator.password = hash;

    try {
        yield this.sequelize.transaction(function(t){
            return Administrator.create(administrator, { transaction : t});
        })
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Parameters', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    this.status = 200;

}