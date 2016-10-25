var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/vendor/avx-component');

var dialogVm = null;
var selectorVm = avalon.define({
    $id: 'gf-select-item',
    dialogInit: function (vm) {
        dialogVm = vm;
    }
});
var dataVm = avalon.define({
    $id: 'gf-select-item_data',
    '$data-box_config': {
        store: 'item',
        actionBtns: {
            operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.choose(el)"><i class="fa fa-edit"></i> 选择</a>'
        },
        actions: {
            choose: function (record) {
                dialogVm.show = false;
                dialogVm.$post({
                    record: record
                });
            }
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
$('#dialog_layer').append(__inline('./gf-select-item.html'));
avalon.scan($('#dialog_layer').get(0), selectorVm);
// 导出逻辑
exports.open = function (cb) {
    if (dialogVm) {
        dialogVm.show = true;
        dialogVm.record = {
            thumb: ''
        };
        dialogVm.$post = function (package) {
            console.log(avalon.vmodels['data-box_select_item'].$model.checked);
            cb(package.record);
        }
    }
}