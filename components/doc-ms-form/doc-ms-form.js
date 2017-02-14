var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox');

var ajax = require('/services/ajaxService');
var msg = require('/services/messageService');

require('/vendor/avx-component');

var vm = avalon.define({
    $id: 'doc-ms-form',
    record: {
        name: '',
        gender: '',
        masterpiece: '',
        birthday: '',
        hobby: [],
        avatar: '',
        bio: '',
        genders: ['F', 'M']
    },
    $form_config: {
        rules: {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '请填写姓名'
                        }
                    }
                },
                hobby: {
                    validators: {
                        notEmpty: {
                            message: '请选择兴趣'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: '请选择性别'
                        }
                    }
                },
                birthday: {
                    validators: {
                        notEmpty: {
                            message: '请选择出生日期'
                        }
                    }
                },
                avatar: {
                    validators: {
                        notEmpty: {
                            message: '请选择头像图'
                        }
                    }
                },
                bio: {
                    validators: {
                        notEmpty: {
                            message: '请填写个人简介'
                        }
                    }
                }
            }
        }
    },
    json: '',
    submit: function () {
        if (!avalon.vmodels['doc_form'].validate()) {
            return false;
        }
        vm.json = JSON.stringify(vm.record.$model);
    }
});

// 导出模板
exports.view = __inline('./doc-ms-form.html');
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