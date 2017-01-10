var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;

var position = 'top-right', timeout = 5000;

exports.info = function (message) {
    Notify(message, position, timeout, 'info', 'fa-envelope', true);
}

exports.success = function (message) {
    Notify(message, position, timeout, 'success', 'fa-check', true);
}

exports.error = function (message) {
    Notify(message, position, timeout, 'danger', 'fa-bolt', true);
}

exports.warning = function (message) {
    Notify(message, position, timeout, 'warning', 'fa-warning', true);
}