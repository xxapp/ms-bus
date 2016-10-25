var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox.js/bootbox');
var configService = require('/services/configService');

require('/vendor/uploadify/jquery.uploadify.js');
require.loadCss({
    url: '/vendor/uploadify/uploadify.css'
});

var ajax = require('/services/ajaxService');

// 定义表单初始数据
var initialData = function () {
    return {
        region_enable: 0,
        region_id: '',
        region_name: '',
        region_parent_id: '',
        region_type: ''
    };
};
var form = avalon.define({
    $id: 'demo.form',
    demo: initialData()
});

exports.controller = avalon.controller(function($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {
        // 因为这个状态没有用mmState的模板，所以不会进入这里
    }
    // 进入视图
    $ctrl.$onEnter = function(params, rs) {
        console.log($ctrl);
        // 获取全部的参数
        var params = mmState._toParams;
        // 除了多一个parentStateName 其它和bootbox.dialog使用方法完全一样
        bootbox.stateDialog({
            parentStateName: mmState.currentState.parentState.stateName, // 这里传入保存后需要
            message: __inline('./form.html'),
            title: params.isEdit ? '修改地址' : '新增地址',
            className: params.isEdit ? 'modal-primary' : 'modal-success',
            buttons: {
                save: {
                    label: '保存',
                    className: "btn-blue",
                    callback: function (close) { 
                        // 这里发送请求
                        console.log(params.isEdit ? '修改' : '新增', form.demo.$model);
                        // 在回调里调用这个函数来关闭对话框
                        close();
                        // 返回true则直接关闭对话框
                        // 返回false则在调用close后才会关闭对话框
                        return false;
                    }
                },
                cancel: {
                    label: '取消',
                    className: "btn-default",
                    callback: function () {
                    }
                }
            }
        }).find('');
        // 初始化上传插件
        $("#file_upload_1").uploadify({
            height        : 30,
            swf           : __uri('/vendor/uploadify/uploadify.swf'),
            uploader      : configService.springApi.url + '/uploadify/uploadify.php',
            width         : 120
        });
        // 这里是将作为参数传过来的数据对象并入form vm，注意增加和修改的区别
        avalon.mix(form, { demo: params.isEdit ? params.record : initialData() });
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function(oldState, newState) {
        ///bootbox.hideAll();
    }
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = [];
});