var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');
var msg = require('/services/messageService');

require('/vendor/avx-component');

var demo = avalon.define({
    $id: 'gf-category',
    '$data-box_config': {
        store: 'category',
        dialogId: 'dialog_category',
        processData: function (payload, post) {
            // payload包含一些状态数据和要提交要用到的数据
            console.log(payload.isEdit ? '修改' : '新增', payload.record);
            post(function (r) {
                console.log(r);
            });
        },
        searchFields: {
            name: ''
        }
    },
    dataBoxInit: function (vm) {
        vm.loadData(function () {
            // 隐藏加载动画
            beyond.hideLoading();
        });
    }
});

// 导出模板
exports.view = __inline('./gf-category.html');
// 导出逻辑
exports.controller = avalon.controller(function($ctrl) {
    $ctrl.$onRendered = function() {
    }
    $ctrl.$onEnter = function(params, rs) {
    }
    $ctrl.$onBeforeUnload = function(oldState, newState) {
    }
    $ctrl.$vmodels = [];
});