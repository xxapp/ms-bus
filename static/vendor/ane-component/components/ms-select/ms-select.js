define('vendor/ane-component/components/ms-select/ms-select.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  require("vendor/ane-component/components/ms-trigger/index.ts");
  '';
  var ane_util_1 = require("vendor/ane-component/ane-util.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  /**
   * 选择组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   * @prop options 下拉选项
   * @prop mode 模式 'combobox' | 'multiple' | 'tags' 默认为 ''
   * @prop showSearch 是否显示搜索框
   * @prop remote 是否为远程搜索
   * @prop remoteMethod 当remote为true时调用，包含远程搜索要执行的请求，返回一个Promise<options>
   *
   * @example
   * ``` html
   * <ms-select :widget="{showSearch:true}">
   *     <ms-select-option :widget="{value:'M'}">男</ms-select-option>
   *     <ms-select-option :widget="{value:'F', disabled:false}">女</ms-select-option>
   * </ms-select>
   *
   * <!--
   * fetchOptions(query) {
   *     return ajax({ url, data: { query } });
   * }
   * -->
   * <ms-select :widget="{mode:'combobox',showSearch:true,remote:true,remoteMethod:@fetchOptions}"></ms-select>
   *
   * <ms-select :widget="{showSearch:true,mode:'multiple'}">
   *     <ms-select-option :widget="{value:'ane'}">Ane</ms-select-option>
   *     <ms-select-option :widget="{value:'ms-bus'}">ms-bus</ms-select-option>
   *     <ms-select-option :widget="{value:'up-loader'}">up-loader</ms-select-option>
   * </ms-select>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-select',
      template: "\n<div class=\"bus-select form-control \"\n    :class=\"[(@isMultiple ? 'bus-select-multiple' : '')] \"\n    :click=\"@handleClick\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    aria-haspopup=\"true\"\n    :attr=\"{'aria-expanded': @panelVisible + ''}\">\n    <ul class=\"bus-select-selection \" :class=\"[(@isMultiple ? 'bus-select-tags' : '')] \">\n        <li class=\"bus-select-selected \" :visible=\"!@isMultiple && (!@showSearch || !@panelVisible)\">{{@displayValue}}</li>\n        <li class=\"bus-select-choice \" :for=\"choice in @selection\">\n            <span>{{choice.label}}</span>\n            <i class=\"fa fa-times \" :click=\"@removeSelection($event, choice) | stop\"></i>\n        </li>\n        <li class=\"bus-select-search \">\n            <input class=\"bus-select-search-field \"\n                name=\"search\"\n                type=\"text\"\n                autocomplete=\"off\"\n                :duplex=\"@searchValue\"\n                :visible=\"@showSearch && @panelVisible\"\n                :keydown=\"@handleDelete\" />\n        </li>\n    </ul>\n    <i class=\"fa bus-select-arrow \"\n        :class=\"[(@panelVisible ? 'fa-caret-up' : 'fa-caret-down')] \"\n        :visible=\"@mode === ''\"></i>\n    <ms-trigger :widget=\"{\n        width: @width,\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide}\">\n    </ms-trigger>\n</div>\n",
      defaults: {
          width: 0,
          value: [],
          mode: '',
          options: [],
          selection: [],
          remote: false,
          remoteMethod: avalon.noop,
          // 下拉框展示和操作部分
          displayValue: '',
          showSearch: false,
          searchValue: '',
          focusSearch: function () {
              this.$element.getElementsByTagName('input').search.focus();
          },
          withInBox: function (el) {
              return this.$element === el || avalon.contains(this.$element, el);
          },
          getTarget: function () {
              return this.$element;
          },
          handleClick: function (e) {
              if (!this.panelVisible) {
                  this.searchValue = '';
                  this.width = this.$element.offsetWidth;
                  this.panelVisible = true;
                  this.focusSearch();
              }
              else if (!this.isMultiple) {
                  this.panelVisible = false;
              }
          },
          handleDelete: function (e) {
              if ((e.which === 8 || e.which === 46) && this.searchValue === '') {
                  this.selection.removeAt(this.selection.length - 1);
                  var selection = this.selection.toJSON();
                  var value = selection.map(function (s) { return s.value; });
                  avalon.vmodels[this.panelVmId].selection = selection;
                  this.handleChange({
                      target: { value: this.isMultiple ? value : value[0] || '' },
                      type: 'select'
                  });
              }
          },
          removeSelection: function (e, option) {
              this.selection.removeAll(function (o) { return o.value === option.value; });
              var selection = this.selection.toJSON();
              var value = selection.map(function (s) { return s.value; });
              avalon.vmodels[this.panelVmId].selection = selection;
              this.focusSearch();
              this.handleChange({
                  target: { value: this.isMultiple ? value : value[0] || '' },
                  type: 'select'
              });
          },
          // 下拉框下拉列表部分
          panelVmId: '',
          panelVisible: false,
          panelClass: 'bus-select-dropdown',
          panelTemplate: "\n<div style=\"overflow: auto\">\n    <ul class=\"bus-select-dropdown-menu \" role=\"menu\">\n        <li class=\"bus-select-dropdown-menu-item \"\n            :class=\"[ (@selection.some(function(){return arguments[0].value===option.value}) ? 'bus-select-dropdown-menu-item-selected' : ''), (option.disabled ? 'bus-select-dropdown-menu-item-disabled' : '') ] \"\n            :for=\"option in @getFilteredOptions()\"\n            :click=\"@handleOptionClick($event, option)\"\n            role=\"menuitem\">\n            {{option.label}}\n            <i class=\"fa fa-check \" :visible=\"@isMultiple\"></i>\n        </li>\n        <li class=\"bus-select-dropdown-menu-item bus-select-dropdown-menu-item-disabled \"\n            :visible=\"@getFilteredOptions().length <= 0 && @searchValue && !@loading\">无数据</li>\n        <li class=\"bus-select-dropdown-menu-item bus-select-dropdown-menu-item-disabled \"\n            :visible=\"@loading\">加载中</li>\n    </ul>\n</div>\n",
          handlePanelHide: function () {
              this.panelVisible = false;
          },
          $computed: {
              isMultiple: {
                  get: function () {
                      return this.mode === 'multiple' || this.mode === 'tags';
                  }
              }
          },
          onInit: function (event) {
              var _this = this;
              var self = this;
              var descriptor = ane_util_1.getChildTemplateDescriptor(this);
              this.options = getOptions(descriptor);
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  var value = v.toJSON();
                  _this.handleChange({
                      target: { value: _this.isMultiple ? value : value[0] || '' },
                      denyValidate: true,
                      type: 'select'
                  });
              });
              this.panelVmId = this.$id + '_panel';
              var innerVm = avalon.define({
                  $id: this.panelVmId,
                  selection: [],
                  loading: false,
                  isMultiple: this.isMultiple,
                  options: this.options.toJSON(),
                  searchValue: '',
                  getFilteredOptions: function () {
                      return this.options.filter(this.filterFn);
                  },
                  filterFn: function (el) {
                      if (this.loading) {
                          return false;
                      }
                      if (self.remote) {
                          return true;
                      }
                      var reg = new RegExp(avalon.escapeRegExp(this.searchValue), 'i');
                      return reg.test(el.label) || reg.test(el.value);
                  },
                  handleOptionClick: function (e, option) {
                      if (option.disabled) {
                          return false;
                      }
                      if (self.isMultiple) {
                          if (this.selection.some(function (o) { return o.value === option.value; })) {
                              this.selection.removeAll(function (o) { return o.value === option.value; });
                          }
                          else {
                              this.selection.push(option);
                          }
                          self.focusSearch();
                      }
                      else {
                          this.selection = [option];
                          self.panelVisible = false;
                      }
                      var selection = this.selection.toJSON();
                      var value = selection.map(function (s) { return s.value; });
                      self.handleChange({
                          target: { value: self.isMultiple ? value : value[0] || '' },
                          type: 'select'
                      });
                      self.displayValue = option.label;
                      self.selection = selection;
                  }
              });
              this.$watch('searchValue', ane_util_1.debounce(function (v) {
                  innerVm.searchValue = v;
                  if (_this.remote && !!v) {
                      innerVm.loading = true;
                      _this.remoteMethod(v).then(function (options) {
                          innerVm.loading = false;
                          innerVm.options = options;
                      });
                  }
              }));
              this.$watch('isMultiple', function (v) {
                  innerVm.isMultiple = v;
              });
          },
          onDispose: function () {
              delete avalon.vmodels[this.panelVmId];
          }
      }
  });
  function getOptions(descriptor) {
      return descriptor.reduce(function (acc, option) {
          if (option.is != 'ms-select-option')
              return acc;
          var label = option.inlineTemplate;
          acc.push({
              label: option.inlineTemplate || '',
              value: option.props.value || '',
              disabled: option.props.disabled || false
          });
          return acc;
      }, []);
  }
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-select/ms-select.js.map
  

});
