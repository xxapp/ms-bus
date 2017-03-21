var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');

require('/vendor/avx-component');

var currentState = mmState.currentState;
/**
 * data-box配置
 * @type component-config
 * @param store 数据源，对应/services/storeService.js中的配置
 * @param dialogId 指定表单的dialog，dialog定义在data-box的前面
 * @param processData 可选，在这个函数可以在提交数据前对数据进行处理，两个参数，payload包含一些状态数据和要提交要用到的数据，post在执行后立即提交数据。不配置此项则不做任何额外处理
 */
var demo = avalon.define({
    $id: 'demo',
    '$data-box_config': {
        store: 'demo',
        dialogId: 'dialog_demo',
        processData: function (payload, post) {
            // payload包含一些状态数据和要提交要用到的数据
            console.log(payload.isEdit ? '修改' : '新增', payload.record);
            post(function (r) {
                console.log(r);
            });
        },
        $beforePost: function () {
            return avalon.vmodels['form_demo'].validate();
        },
        searchFields: {
            region_id: '',
            region_name: {firstName: 'hello'},
            startDate: '',
            endDate: ''
        }
    },
    '$form_search_config': {
        model: 'searchFields',
        rules: {
            container: 'tooltip',
            fields: {
                startDate: {
                    icon: false,
                    validators: {
                        date: {
                            format: 'YYYY-MM-DD',
                            max: 'endDate',
                            message: '开始日期不能晚于结束日期'
                        }
                    }
                },
                endDate: {
                    icon: false,
                    validators: {
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'startDate',
                            message: '结束日期不能早于开始日期'
                        }
                    }
                }
            }
        },
        domEvents: {
            'success.field.bv': function(e, data) {
                if (data.field === 'startDate' && !data.bv.isValidField('endDate')) {
                    data.bv.revalidateField('endDate');
                }

                if (data.field === 'endDate' && !data.bv.isValidField('startDate')) {
                    data.bv.revalidateField('startDate');
                }
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
demo.$watch('text-input', function (newV, oldV) {
    demo.buttonText = newV;
});
var form = avalon.define({
    $id: 'demo.form',
    $form_config: {
        rules: {
            fields: {
                region_id: {
                    validators: {
                        notEmpty: {
                            message: '地区ID不能为空'
                        }
                    }
                },
                region_name: {
                    validators: {
                        notEmpty: {
                            message: '地区名称不能为空'
                        }
                    }
                },
                region_parent_id: {
                    validators: {
                        notEmpty: {
                            message: '地区PID不能为空'
                        }
                    }
                }
            }
        }
    }
});

// 导出模板
exports.view = __inline('./gf-demo.html');
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