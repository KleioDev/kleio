/**
 * Created by cesarcruz on 3/10/15.
 */
var koa = require('koa'),
    api = require('./api'),
    mount = require('koa-mount');

var app = koa();

app.use(mount(api.app));


app.listen(4567);
console.log('listening on port 4567');