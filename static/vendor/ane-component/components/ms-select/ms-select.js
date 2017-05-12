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
   * @prop showSearch 是否显示搜索框
   *
   * @example
   *  <ms-select :widget="{showSearch:true}">
   *      <ms-select-option :widget="{value:'M'}">男</ms-select-option>
   *      <ms-select-option :widget="{value:'F', disabled:false}">女</ms-select-option>
   *  </ms-select>
   */
  ms_control_1["default"].extend({
      displayName: 'ms-select',
      template: "\n<div class=\"bus-select form-control \" :click=\"handleClick\">\n    <span class=\"bus-select-selected \" :visible=\"!@showSearch || !@panelVisible\">{{@displayValue}}</span>\n    <input class=\"bus-select-search \" type=\"text\" :duplex=\"@searchValue\" :visible=\"@showSearch && @panelVisible\" />\n    <ms-trigger :widget=\"{\n        left: @left,\n        top: @top,\n        width: @width,\n        height: @height,\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide}\">\n    </ms-trigger>\n</div>\n",
      defaults: {
          width: 0,
          value: [],
          options: [],
          displayValue: '',
          showSearch: false,
          searchValue: '',
          panelVmId: '',
          panelVisible: false,
          panelClass: 'bus-select-dropdown',
          panelTemplate: "\n<div style=\"overflow: auto\">\n    <ul class=\"bus-select-dropdown-menu \">\n        <li class=\"bus-select-dropdown-menu-item \"\n            :class=\"[ (option.value === @selected ? 'bus-select-dropdown-menu-item-selected' : ''), (option.disabled ? 'bus-select-dropdown-menu-item-disabled' : '') ] \"\n            :for=\"option in @getFilteredOptions()\" :click=\"handleOptionClick($event, option)\">{{option.label}}</li>\n        <li class=\"bus-select-dropdown-menu-item bus-select-dropdown-menu-item-disabled \"\n            :visible=\"@getFilteredOptions().length <= 0\">未找到匹配项</li>\n    </ul>\n</div>\n",
          handleClick: function (e) {
              this.searchValue = '';
              this.width = this.$element.offsetWidth;
              this.panelVisible = true;
              this.$element.children[1].focus();
          },
          withInBox: function (el) {
              return this.$element === el || avalon.contains(this.$element, el);
          },
          getTarget: function () {
              return this.$element;
          },
          handlePanelHide: function () {
              this.panelVisible = false;
          },
          onInit: function (event) {
              var _this = this;
              var self = this;
              var descriptor = ane_util_1.getChildTemplateDescriptor(this);
              this.options = getOptions(descriptor);
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  var value = v.$model || v || [''];
                  _this.handleChange({
                      target: { value: value[0] },
                      denyValidate: true,
                      type: 'select'
                  });
              });
              this.panelVmId = this.$id + '_panel';
              var innerVm = avalon.define({
                  $id: this.panelVmId,
                  selected: '',
                  options: this.options.toJSON(),
                  searchValue: '',
                  getFilteredOptions: function () {
                      return this.options.filter(this.filterFn);
                  },
                  filterFn: function (el) {
                      var reg = new RegExp(avalon.escapeRegExp(_this.searchValue), 'i');
                      return reg.test(el.label) || reg.test(el.value);
                  },
                  handleOptionClick: function (e, option) {
                      if (option.disabled) {
                          return false;
                      }
                      this.selected = option.value;
                      self.value.push(option.value);
                      self.handleChange({
                          target: { value: option.value },
                          type: 'select'
                      });
                      self.displayValue = option.label;
                      self.panelVisible = false;
                  }
              });
              this.$watch('searchValue', function (v) {
                  innerVm.searchValue = v;
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
