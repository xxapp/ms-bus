define('vendor/ane/components/ms-control-select2/ms-control-select2', function(require, exports, module) {

  "use strict";
  var avalon = require('avalon');
  var store = require('services/storeService.ts');
  var avxUtil = require('/vendor/ane-component/ane-util');
  /**
   * @require node_modules/select2/dist/css/select2.css
   * not require /node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css
   */
  require('node_modules/select2/dist/js/select2');
  require('node_modules/select2/dist/js/i18n/zh-CN');
  /**
   * select2组件
   * @prop label 选择框前的label标签内容
   * @prop col 指定name属性值
   * @prop store 数据源，组件会自动寻找storeService.js中的配置
   * @prop action 指定使用数据源中的那个方法，默认为list
   * @prop col-key 数据中作为select的value属性值的字段，默认为id
   * @prop col-val 数据中作为select的展示值的字段，默认为name
   * @prop multiple 是否多选
   * @prop value-list 值列表，当multiple为true时有效，可通过ms-cprop双向绑定
   *
   * @example
   *  <ms:control-select2 label="图片尺寸">
   *      <option value="1">大图</option>
   *      <option value="2">小图</option>
   *  </ms:control-select2>
   *
   *
   *  <ms:control-select2 label="商品分类" store="category"></ms:control-select2>
   *
   * <ms:control-select2
          label="代表作"
          col="masterpiece"
          ms-cprop-value-list="record.masterpiece"
          multiple="true">
      </ms:control-select2>
   */
  avalon.component('ms:controlSelect2', {
      $slot: 'content',
      content: '',
      $template: "\n<div class=\"form-group \">\n    <label class=\"control-label \">{{label}}</label>\n    <select class=\"form-control \" ms-attr-name=\"col\" ms-attr-multiple=\"multiple\">{{content|html}}</select>\n</div>\n",
      $replace: 1,
      $dynamicProp: {
          duplex: { type: 'String' },
          'value-list': { type: 'Array' }
      },
      $$template: function (tmpl) {
          var vm = this;
          var $parent = avalon.vmodels[this.parentVmId];
          this.model = this.model || ($parent && $parent.model) || 'record';
          if (vm.store) {
              tmpl = tmpl.replace(/\{\{content\|html\}\}/g, '<option ms-repeat="options" ms-attr-value="el.id" ms-attr-selected="el.selected">{{el.text}}</option>');
          }
          return tmpl;
      },
      $init: function (vm, el) {
          vm.$parentVmId = avxUtil.pickToRefs(vm, el);
          avxUtil.enableDynamicProp(vm, el);
          if (vm.store && !store[vm.store]) {
              avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js');
          }
          vm.$watch('duplex', function (v) {
              if (vm.$select.val() == v) {
                  return;
              }
              vm.$select.val(v).trigger('change');
          });
          vm.$watch('*', function (v, oldV, path) {
              if (path === 'valueList') {
                  if (vm.$select.val().toString() == v.$model.toString()) {
                      return;
                  }
                  vm.$select.val(v.$model).trigger('change');
              }
          });
      },
      $ready: function (vm, el) {
          vm.$select = $(el).find('select');
          if (vm.store) {
              if (vm.multiple) {
                  vm.options = [];
                  avalon.each(vm.valueList, function (i, n) {
                      vm.options.push({ id: n, text: n });
                  });
                  vm.$select.val(vm.valueList.$model).trigger('change');
              }
              else {
                  vm.options = [];
                  if (vm.duplex) {
                      vm.options.push({ id: vm.duplex, text: vm.duplex, selected: true });
                  }
                  vm.$select.val(vm.duplex).trigger('change');
              }
          }
          else {
              if (vm.multiple) {
                  vm.$select.val(vm.valueList.$model).trigger('change');
              }
              else {
                  vm.$select.val(vm.duplex).trigger('change');
              }
          }
          var select2Options = {
              language: 'zh-CN',
              placeholder: vm.placeholder,
              allowClear: true
          };
          if (vm.store) {
              avalon.mix(select2Options, {
                  ajax: {
                      delay: 500,
                      data: function (params) {
                          return store[vm.store].processRequest({
                              query: params.term,
                              page: params.page || 1
                          });
                      },
                      processResults: function (data, params) {
                          params.page = params.page || 1;
                          data = store[vm.store].processResponse(data, params);
                          return {
                              results: data.rows,
                              pagination: {
                                  more: (params.page * (store[vm.store].limit || 30)) < data.total
                              }
                          };
                      },
                      transport: function (params, success, failure) {
                          if (!store[vm.store][vm.action]) {
                              avalon.error('数据源[' + vm.store + ']的[' + vm.action + ']方法没有定义，/services/storeService.js');
                          }
                          var request = store[vm.store][vm.action](params.data);
                          request.then(success, failure);
                      }
                  },
                  escapeMarkup: function (markup) { return markup; },
                  minimumInputLength: 1,
                  templateResult: function (r) {
                      if (r.loading)
                          return r.text;
                      return r[vm.colVal];
                  },
                  templateSelection: function (r) {
                      return r[vm.colKey] || r.text;
                  }
              });
          }
          vm.$select
              .select2(select2Options)
              .on('change', function () {
              if (vm.multiple) {
                  vm.$dynamicProp['value-list'].setter(vm.$select.val());
              }
              else {
                  vm.$dynamicProp.duplex.setter(this.value);
              }
              $(this).trigger('input');
          });
      },
      $dispose: function (vm, el) {
          avxUtil.removeFromRefs(vm, el);
          $(el).find('select').off().select2('destroy');
      },
      $parentVmId: '',
      $select: {},
      label: '',
      col: '',
      store: '',
      action: '',
      colKey: 'id',
      colVal: 'name',
      model: '',
      placeholder: '请选择一项',
      duplex: '',
      valueList: [],
      options: [],
      multiple: false
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-control-select2/ms-control-select2.js.map
  

});
