/**
 * Created by cesarcruz on 5/3/15.
 */
var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var analyticsController = new Router()
        .get('/active/user', loadModels, active)
        .get('/interactive/user', loadModels, interactive);

    return analyticsController.routes();
}

function *active(){

    var monthlyActiveUser = this.models['MonthlyActiveUser'];
    var interactiveUser = this.models['InteractiveUser'];
    var data = {};
    try{
        var months = yield monthlyActiveUser.findAll({
            attributes : ['month', 'year']
        });
        //if its somehow different:
        //var months = yield interactiveUser.findAll({
        //    attributes : ['month', 'year']
        //});

        for(var i = 0; i < months.length; i = i + 1) {

            data['' + months[i].month + '-' + months[i].year] = {};
            data['' + months[i].month + '-' + months[i].year].active = yield monthlyActiveUser.count();
            data['' + months[i].month + '-' + months[i].year].period = '' + months[i].month + '-' + months[i].year;

        }
        //if its the same this should be easy
        for(var i = 0; i < months.length; i = i + 1) {

            data['' + months[i].month + '-' + months[i].year].interactive = yield interactiveUser.count();
        }

    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = data;
}

function *interactive(){

}