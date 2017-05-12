define('vendor/ane-component/components/ms-control-select/ms-control-select', function(require, exports, module) {

  "use strict";
  var avalon = require('avalon');
  var store = require('services/storeService.ts');
  var avxUtil = require('vendor/ane-component/ane-util.ts');
  /**
   * 选择组件
   * @prop label 选择框前的label标签内容
   * @prop col 指定name属性值
   * @prop store 数据源，组件会自动寻找数据源中的dict方法，如果dict没定义则使用list方法
   * @prop col-key 数据中作为select的value属性值的字段，默认为id
   * @prop col-val 数据中作为select的展示值的字段，默认为name
   *
   * @example
   *  <ms:control-select label="图片尺寸">
   *      <option value="1">大图</option>
   *      <option value="2">小图</option>
   *  </ms:control-select>
   *
   *
   *  <ms:control-select label="商品分类" store="category"></ms:control-select>
   */
  avalon.component('ms:controlSelect', {
      $slot: 'content',
      content: '',
      $template: "\n<div class=\"form-group \">\n    <label class=\"control-label \">{{label}}</label>\n    <select class=\"form-control \" ms-duplex=\"duplex\" ms-attr-name=\"col\">{{content|html}}</select>\n</div>\n",
      $replace: 1,
      $dynamicProp: {
          duplex: { type: 'String' }
      },
      $$template: function (tmpl) {
          var vm = this;
          if (vm.store) {
              tmpl = tmpl.replace(/\{\{content\|html\}\}/g, '<option ms-repeat="options" ms-attr-value="el.' + vm.colKey + '">{{el.' + vm.colVal + '}}</option>');
          }
          return tmpl;
      },
      $init: function (vm, el) {
          vm.$parentVmId = avxUtil.pickToRefs(vm, el);
          avxUtil.enableDynamicProp(vm, el);
          if (vm.store && !store[vm.store]) {
              avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js');
          }
          if (vm.store) {
              var dict = store[vm.store].dict || store[vm.store].list;
              dict({
                  limit: 99999
              }).then(function (result) {
                  vm.options = result.list;
              });
          }
          vm.$watch('duplex', function (v) {
              vm.$dynamicProp.duplex.setter(v);
          });
      },
      $dispose: function (vm, el) {
          avxUtil.removeFromRefs(vm, el);
      },
      $parentVmId: '',
      label: '',
      col: '',
      duplex: '',
      store: '',
      colKey: 'id',
      colVal: 'name',
      options: []
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-control-select/ms-control-select.js.map
  

});
