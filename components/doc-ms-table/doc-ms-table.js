var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');
var msg = require('/services/messageService');

require('/vendor/avx-component');

var demo = avalon.define({
    $id: 'doc-ms-table',
    tableData: [
        {
            "region_id": "10",
            "region_parent_id": "1",
            "region_name": "河北",
            "region_nick": "",
            "region_type": "2",
            "region_enble": 1
        },
        {
            "region_id": "635",
            "region_parent_id": "67",
            "region_name": "永昌县",
            "region_nick": null,
            "region_type": "2",
            "region_enble": 1
        },
        {
            "region_id": "636",
            "region_parent_id": "68",
            "region_name": "肃州区",
            "region_nick": null,
            "region_type": "2",
            "region_enble": 1
        },
        {
            "region_id": "637",
            "region_parent_id": "68",
            "region_name": "玉门市",
            "region_nick": null,
            "region_type": "2",
            "region_enble": 1
        },
        {
            "region_id": "638",
            "region_parent_id": "68",
            "region_name": "敦煌市",
            "region_nick": null,
            "region_type": "2",
            "region_enble": 1
        },
        {
            "region_id": "639",
            "region_parent_id": "68",
            "region_name": "金塔县",
            "region_nick": null,
            "region_type": "2",
            "region_enble": 1
        }
    ]
});

// 导出模板
exports.view = __inline('./doc-ms-table.html');
// 导出逻辑
exports.controller = avalon.controller(function($ctrl) {
    $ctrl.$onRendered = function() {
        beyond.hideLoading();
    }
    $ctrl.$onEnter = function(params, rs) {
    }
    $ctrl.$onBeforeUnload = function(oldState, newState) {
    }
    $ctrl.$vmodels = [];
});