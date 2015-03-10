/**
 * Created by cesarcruz on 3/10/15.
 */
var koa = require('koa'),
    database = require('./models/index');

var app = koa();

database.feedback.sync();

