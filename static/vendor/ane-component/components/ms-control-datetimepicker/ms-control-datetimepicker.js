define('vendor/ane-component/components/ms-control-datetimepicker/ms-control-datetimepicker', function(require, exports, module) {

  "use strict";
  var avalon = require('avalon');
  var moment = require('node_modules/moment/moment');
  require('node_modules/moment/locale/zh-cn');
  moment.locale('zh-cn');
  require.loadCss({
      url: '/static/node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
  });
  require('node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker');
  var avxUtil = require('vendor/ane-component/ane-util.ts');
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
      $template: "\n<div class=\"form-group \">\n    <label class=\"control-label \">{{label}}</label>\n    <div class=\"input-group \">\n        <input class=\"form-control date-picker \" type=\"text\" ms-attr-name=\"col\">\n        <span class=\"input-group-addon \">\n            <i class=\"fa fa-calendar \"></i>\n        </span>\n    </div>\n</div>\n",
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
      $template: "\n<div class=\"form-group \">\n    <label class=\"control-label \">{{label}}</label>\n    <div class=\"input-group \">\n        <input class=\"form-control date-picker \" type=\"text\" ms-attr-name=\"col\">\n        <span class=\"input-group-addon \">\n            <i class=\"fa fa-calendar \"></i>\n        </span>\n    </div>\n</div>\n",
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
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-control-datetimepicker/ms-control-datetimepicker.js.map
  

});
