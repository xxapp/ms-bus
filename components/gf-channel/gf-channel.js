var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');
var msg = require('/services/messageService');

require('/vendor/avx-component');
var itemSelector = require('/components/gf-select-item');

var demo = avalon.define({
    $id: 'gf-channel',
    '$data-box_config': {
        store: 'channel',
        dialogId: 'dialog_channel',
        processData: function (payload, post) {
            // payload包含一些状态数据和要提交要用到的数据
            console.log(payload.isEdit ? '修改' : '新增', payload.record);
            post(function (r) {
                console.log(r);
            });
        },
        searchFields: {
            name: '',
            author_name: '',
            author_field: ''
        }
    },
    dataBoxInit: function (vm) {
        vm.loadData(function () {
            // 隐藏加载动画
            beyond.hideLoading();
        });
        // 自定义dialog逻辑
        avalon.vmodels['dialog_channel'].state = {
            selectItem: function () {
                itemSelector.open(function (selection) {
                    avalon.vmodels['dialog_channel'].state.selection = selection.name;
                });
            },
            selection: ''
        };
    }
});

// 导出模板
exports.view = __inline('./gf-channel.html');
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