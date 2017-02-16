var avalon = require('avalon');
var moment = require('moment');
require('moment-locale');
moment.locale('zh-cn');
require.loadCss({
    url: __uri('/node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css')
});
require('eonasdan-bootstrap-datetimepicker');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * datepicker组件
 * @prop label 文本框前的label标签内容
 * @prop col 指定name属性值
 * @prop format 日期展示格式
 * 
 * @example
 * ``` html
 * <ms:control-datepicker label="标题1" col="name" ms-cduplex="record.name"></ms:control-datepicker>
 * ```
 */
avalon.component('ms:controlDatepicker', {
    $template: __inline('./ms-control-datetimepicker.html'),
    $replace: 1,
    $dynamicProp: {
        duplex: { type: 'String' }
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        vm.$watch('duplex', function (v) {
            $('#' + vm.$datepickerId).data("DateTimePicker").date(moment(v).format());
        });
    },
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val(moment(vm.duplex).format());
        datepicker.datetimepicker({
            format: vm.format,
            showClose: false
        });
        datepicker.on('dp.change', function (e) {
            vm.$dynamicProp.duplex.setter(moment(e.target.value).utc().format());
            datepicker.trigger('input');
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    label: '',
    col: '',
    duplex: '',
    format: 'YYYY-MM-DD',
    $datepickerId: ''
});

/**
 * datetimepicker组件
 * 参考datepicker组件
 */
avalon.component('ms:controlDatetimepicker', {
    $template: __inline('./ms-control-datetimepicker.html'),
    $replace: 1,
    $dynamicProp: {
        duplex: { type: 'String' }
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        vm.$watch('duplex', function (v) {
            $('#' + vm.$datepickerId).data("DateTimePicker").date(moment(v).format());
        });
    },
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val(moment(vm.duplex).format());
        datepicker.datetimepicker({
            format: vm.format,
            showClose: true
        });
        datepicker.on('dp.change', function (e) {
            vm.$dynamicProp.duplex.setter(moment(e.target.value).utc().format());
            datepicker.trigger('input');
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    label: '',
    col: '',
    duplex: '',
    format: 'YYYY-MM-DD HH:mm:ss',
    $datepickerId: ''
});