var avalon = require('avalon');
var moment = require('moment');
require('/vendor/moment/zh-cn');
moment.locale('zh-cn');
require.loadCss({
    url: __uri('/vendor/bootstrapDatetimepicker/bootstrap-datetimepicker.css')
});
require('/vendor/bootstrapDatetimepicker/bootstrap-datetimepicker.min');

/**
 * datepicker组件
 * @prop label 文本框前的label标签内容
 * @prop col 如果有绑定的数据行，此属性值指的是数据的字段名称
 * @prop duplex 自定义的绑定数据，如果同时存在则会覆盖col
 * @prop format 日期展示格式
 * 
 * @example
 * ``` html
 * <!-- 注：例1和例2效果是一样的 -->
 * <ms:control-datepicker label="标题1" col="name"></ms:control-datepicker>
 * <ms:control-datepicker label="标题2" duplex="record['name']"></ms:control-datepicker>
 * <ms:control-datepicker label="标题3" duplex="state.text"></ms:control-datepicker>
 * ```
 */
avalon.component('ms:controlDatepicker', {
    $template: __inline('./ms-control-datetimepicker.html'),
    $replace: 1,
    $$template: function (tmpl) {
        if (this.duplex) {
            // 如果配置了duplex属性，则直接使用duplex的属性值绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.duplex + '"');
        }
        if (this.col) {
            // 否则用col的配置，使用record[col]去绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="record[\'' + this.col.replace('.', '\'][\'') + '\']"');
        }
        return tmpl;
    },
    $init: function (vm, el) {},
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        var $input = $(el).find('input:hidden');
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val(moment($input.val()).format());
        datepicker.datetimepicker({
            format: vm.format,
            showClose: false
        });
        datepicker.on('dp.change', function (e) {
            $input.val(moment(e.target.value).utc().format());
            datepicker.trigger('input');
        });
    },
    $dispose: function (vm) {
    },
    label: '',
    col: '',
    duplex: '',
    format: 'YYYY-MM-DD',
    $datepickerId: ''
});


avalon.component('ms:controlDatetimepicker', {
    $template: __inline('./ms-control-datetimepicker.html'),
    $replace: 1,
    $$template: function (tmpl) {
        if (this.duplex) {
            // 如果配置了duplex属性，则直接使用duplex的属性值绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.duplex + '"');
        }
        if (this.col) {
            // 否则用col的配置，使用record[col]去绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="record[\'' + this.col.replace('.', '\'][\'') + '\']"');
        }
        return tmpl;
    },
    $init: function (vm, el) {},
    $ready: function (vm, el) {
        var datepickerId = 'picker' + vm.$id, datepicker;
        var $input = $(el).find('input.hidden');
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val(moment($input.val()).format());
        datepicker.datetimepicker({
            format: vm.format,
            showClose: true
        });
        datepicker.on('dp.change', function (e) {
            $input.val(moment(e.target.value).utc().format());
            datepicker.trigger('input');
        });
    },
    $dispose: function (vm) {
    },
    label: '',
    col: '',
    duplex: '',
    format: 'YYYY-MM-DD HH:mm:ss',
    $datepickerId: ''
});