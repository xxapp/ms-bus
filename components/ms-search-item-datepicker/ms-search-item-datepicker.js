var avalon = require('avalon');
var moment = require('moment');
require.loadCss({
    url: __uri('/vendor/bootstrapDatetimepicker/bootstrap-datetimepicker.css')
});
require('/vendor/bootstrapDatetimepicker/bootstrap-datetimepicker.min');

/**
 * datepicker搜索组件
 * @prop label 文本框前的label标签内容
 * @prop col 搜索参数
 * @prop format 日期展示格式
 * 
 * @example
 * ``` html
 * <!-- 注：例1和例2效果是一样的 -->
 * <ms:search-item-datepicker label="标题1" col="name"></ms:search-item-datepicker>
 * <ms:search-item-datepicker label="标题2" duplex="record['name']"></ms:search-item-datepicker>
 * <ms:search-item-datepicker label="标题3" duplex="state.text"></ms:search-item-datepicker>
 * ```
 */
avalon.component('ms:searchItemDatepicker', {
    $template: __inline('./ms-search-item-datepicker.html'),
    $replace: 1,
    $init: function (vm, el) {},
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        var $input = $(el).find('input:hidden');
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val($input.val());
        datepicker.datetimepicker({
            format: vm.format
        });
        datepicker.on('dp.change', function (e) {
            $input.val(moment(e.target.value).utc().format());
        });
        vm.$watch('val', function (newV) {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery[vm.col] = newV;
        });
    },
    $dispose: function (vm) {
    },
    label: '',
    col: '',
    val: '',
    format: 'YYYY-MM-DD',
    $datepickerId: ''
});

avalon.component('ms:searchItemDatetimepicker', {
    $template: __inline('./ms-search-item-datepicker.html'),
    $replace: 1,
    $init: function (vm, el) {},
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        var $input = $(el).find('input.hidden');
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val($input.val());
        datepicker.datetimepicker({
            format: vm.format,
            showClose: true
        });
        datepicker.on('dp.change', function (e) {
            $input.val(moment(e.target.value).utc().format());
        });
        vm.$watch('val', function (newV) {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery[vm.col] = newV;
        });
    },
    $dispose: function (vm) {
    },
    label: '',
    col: '',
    val: '',
    format: 'YYYY-MM-DD HH:mm:ss',
    $datepickerId: ''
});