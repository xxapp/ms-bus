var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var ajax = require('/services/ajaxService');

var header = avalon.define({
    $id: 'header',
    currentUserName: '',
    logout: function () {
        window.sessionStorage.clear('adminSession');
        window.location.href = '/login.html';
    }
});

exports.view = __inline('./common-header.html');
exports.controller = avalon.controller(function($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {
        beyond.initHeader();
    }
    // 进入视图
    $ctrl.$onEnter = function() {
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function() {}
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = []
});