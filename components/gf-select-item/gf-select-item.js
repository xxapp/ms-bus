var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');
var msg = require('/services/messageService');

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
    onSelect: function (selection) {
        if (selection.length > 0) {
            avalon.mix(dialogVm, {
                record: selection
            });
        }
    },
    '$data-box_config': {
        store: 'item',
        actions: {
            choose: function (record) {
                dialogVm.show = false;
                dialogVm.$post({
                    record: [record]
                });
            }
        },
        searchFields: {
            name: '',
            catalog: '',
            price: '',
            state: ''
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
            cb(package.record[0]);
        }
    }
}