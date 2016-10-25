var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/vendor/avx-component');
var itemSelector = require('/components/gf-select-item');

var demo = avalon.define({
    $id: 'gf-channel',
    '$data-box_config': {
        store: 'channel',
        dialogId: 'dialog_channel',
        actionBtns: {
            operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
        },
        processData: function (package, post) {
            // package包含一些状态数据和要提交要用到的数据
            console.log(package.isEdit ? '修改' : '新增', package.record);
            post(function (r) {
                console.log(r);
            });
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