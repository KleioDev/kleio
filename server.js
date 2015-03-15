/**
 * Created by cesarcruz on 3/10/15.
 */
var koa = require('koa'),
    database = require('./models/index');

var app = koa();

console.log(database.sequelize.model('Museum').create({
    title : 'Musa',
    description : 'Museo del colegio de Mayagüez',
    terms : 'No bregues tierra',
    about : 'Establecido en Junio del 2015'
}));