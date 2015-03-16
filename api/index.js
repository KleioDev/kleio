/**
 * Created by cesarcruz on 3/15/15.
 */
var koa = require('koa');
var router = require('koa-router')();

var app = koa();

router

    .get('/', hello);

app
    .use(router.routes())
    .use(router.allowedMethods());

function *hello(){
    this.body = 'Hello World';
}

exports.app = app;

