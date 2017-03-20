var avalon = require('avalon2');
var beyond = require('/vendor/beyond');
var ajax = require('/services/ajaxService');

avalon.component('common-header', {
    template: __inline('./common-header.html'),
    defaults: {
        currentUserName: '',
        logout: function () {
            window.sessionStorage.clear('adminSession');
            window.location.href = '/login.html';
        }
    }
});