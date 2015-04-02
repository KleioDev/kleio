/**
 * Created by cesarcruz on 3/17/15.
 */

var fs = require('fs');
var path = require('path');
var basename  = path.basename(module.filename);

/**
 * Require all controllers and pass along to API initializer
 * @returns {{}}
 */
module.exports = function() {

    var controllers = {},
        controllerNames = [],
        controllerBundle = {};

    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== basename);
        })
        .forEach(function(file) {
            controllerNames.push(file);
            controllers[file] = require('./' + file)();
        });

    controllerBundle['controllers'] = controllers;
    controllerBundle['controllerNames'] = controllerNames;

    return controllerBundle;
}