;/*!vendor/ane/ane-util.ts*/
define('vendor/ane/ane-util.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  function findParentComponent(vm, ctype) {
      var parent = vm.$element.parentElement;
      while (parent) {
          if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
              return parent._vm_;
          }
          parent = parent.parentElement;
      }
      return null;
  }
  exports.findParentComponent = findParentComponent;
  function parseSlotToVModel(vmodel, vnodes) {
      if (vnodes === undefined) {
          vnodes = vmodel.$render.root ? vmodel.$render.root.children : [];
      }
      vnodes.forEach(function (vnode) {
          if (!vnode || !vnode.nodeName || vnode.dom.nodeType !== 1)
              return true;
          var slotName = vnode.dom.getAttribute('slot');
          if (slotName) {
              delete vnode.props[':skip'];
              delete vnode.props['ms-skip'];
              vmodel[slotName] = avalon.vdom(vnode, 'toHTML');
          }
          else {
              parseSlotToVModel(vmodel, vnode.children);
          }
      });
  }
  exports.parseSlotToVModel = parseSlotToVModel;
  function getChildTemplateDescriptor(vmodel, render) {
      if (render === void 0) { render = vmodel.$render; }
      return render.directives.reduce(function (acc, action) {
          if (action.is) {
              acc.push({
                  is: action.is,
                  props: action.value,
                  inlineTemplate: action.fragment,
                  children: getChildTemplateDescriptor(vmodel, action.innerRender || { directives: [] })
              });
          }
          return acc;
      }, []);
  }
  exports.getChildTemplateDescriptor = getChildTemplateDescriptor;
  function debounce(func, wait, immediate) {
      if (wait === void 0) { wait = 300; }
      if (immediate === void 0) { immediate = false; }
      var timeout;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var context = this;
          var later = function () {
              timeout = null;
              if (!immediate)
                  func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow)
              func.apply(context, args);
      };
  }
  exports.debounce = debounce;
    

});

;/*!vendor/ane/components/ms-checkbox/ms-checkbox.ts*/
define('vendor/ane/components/ms-checkbox/ms-checkbox.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  if (avalon.msie <= 8) {
      var doc = document;
      var head = doc.getElementsByTagName('head')[0];
      var style = doc.createElement('style');
      var cssStr = "\n        .checkbox-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .checkbox-inner-ie span {\n            display: none !important;\n        }\n    ";
      style.setAttribute('type', 'text/css');
      if (style.styleSheet) {
          style.styleSheet.cssText = cssStr;
      }
      else {
          style.appendChild(doc.createTextNode(cssStr));
      }
      head.appendChild(style);
  }
  avalon.component('ms-checkbox', {
      soleSlot: 'label',
      template: "\n<div :class=\"@wrapper \" class=\"checkbox-wrapper_nvmxj_2 \" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"checkbox-inner_nvmxj_5 checkbox-inner-ie \">\n        <input type=\"checkbox\"\n            :attr=\"{id:@helpId,disabled:@disabled}\"\n            :duplex-checked=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text \"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>\n",
      defaults: {
          wrapper: 'checkbox',
          label: '',
          checked: false,
          group: false,
          disabled: false,
          onChange: avalon.noop,
          flush: avalon.noop,
          helpId: '',
          onInit: function (event) {
              this.helpId = this.$id;
              // // inline在IE8下显示有问题，待解决
              // if (this.inline != void 0) {
              //     this.wrapper = 'checkbox-inline';
              // }
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
          },
          onDispose: function (vm, el) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-pagination/ms-pagination.ts*/
define('vendor/ane/components/ms-pagination/ms-pagination.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  /**
   * 分页组件
   * @prop {Number} [current=1] 当前页
   * @prop {Number} [pageSize=10] 每页的数据量
   * @prop {Number} total 数据总量
   * @event {Function} onChange 当页码改变时触发，参数current
   *
   * @example
   * ```
   * <ms-pagination :widget="{total:100,onChange:@handlePageChange}"></ms-pagination>
   *
   * <ms-pagination :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination>
   * ```
   */
  avalon.component('ms-pagination', {
      template: "\n<div class=\"btn-group \">\n    <a class=\"btn blue \" :attr=\"{disabled:@current===1}\" :click=\"@prevPage\">\n        <i class=\"icon-step-backward \"></i>上一页\n    </a>\n    <a class=\"btn success \">{{ @current }}/{{ Math.ceil(@total/@pageSize) }}</a>\n    <a class=\"btn blue \" :attr=\"{disabled:@current===Math.ceil(@total/@pageSize)}\" :click=\"@nextPage\">\n        <i class=\"icon-step-forward \"></i>下一页\n    </a>\n</div>\n",
      defaults: {
          current: 1,
          pageSize: 10,
          total: 0,
          prevPage: function () {
              if (this.current > 1) {
                  this.onChange(--this.current);
              }
          },
          nextPage: function () {
              if (this.current < Math.ceil(this.total / this.pageSize)) {
                  this.onChange(++this.current);
              }
          },
          onChange: avalon.noop,
          onInit: function (event) {
          },
          onReady: function (event) {
          },
          onDispose: function (event) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-loading/ms-loading-directive.ts*/
define('vendor/ane/components/ms-loading/ms-loading-directive.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  '';
  /**
   * loading 指令
   *
   * @example
   * ``` html
   * <table :loading="true">...</table>
   * ```
   */
  avalon.directive('loading', {
      init: function () {
          this.instance = null;
          this.oldPositionStyle = '';
      },
      update: function (vdom, value) {
          var _this = this;
          if (value) {
              if (this.instance === null) {
                  var t_1 = setInterval(function () {
                      var dom = vdom.dom;
                      var computedStyle = global.getComputedStyle ? global.getComputedStyle(dom) : dom.currentStyle;
                      var width = dom.offsetWidth, height = dom.offsetHeight, className = dom.className;
                      var borderLeftWidth = computedStyle.borderLeftWidth, borderTopWidth = computedStyle.borderTopWidth, display = computedStyle.display;
                      _this.oldPositionStyle = dom.style.position;
                      // 如果元素是隐藏的，什么都不做
                      if (display === 'none') {
                          clearInterval(t_1);
                      }
                      // 如果宽度和高度都不为0，则添加loading遮罩
                      if (width !== 0 && height !== 0) {
                          clearInterval(t_1);
                      }
                      else {
                          return;
                      }
                      var maskElement = global.document.createElement('div');
                      maskElement.className = 'ane-loading-mask';
                      maskElement.innerText = '加载中...';
                      maskElement.style.left = 0 - (borderLeftWidth === 'medium' ? 0 : parseFloat(borderLeftWidth)) + 'px';
                      maskElement.style.top = 0 - (borderTopWidth === 'medium' ? 0 : parseFloat(borderTopWidth)) + 'px';
                      maskElement.style.width = width + 'px';
                      maskElement.style.height = height + 'px';
                      maskElement.style.lineHeight = height + 'px';
                      dom.style.position = 'relative';
                      if (!~(" " + className + " ").indexOf(' masked ')) {
                          dom.className += ' masked';
                      }
                      dom.appendChild(maskElement);
                      _this.instance = maskElement;
                      console.log('mask初始化完成');
                  }, 100);
              }
              else {
                  var dom = vdom.dom;
                  var maskElement = this.instance;
                  var className = dom.className;
                  this.oldPositionStyle = dom.style.position;
                  maskElement.style.display = 'block';
                  dom.style.position = 'relative';
                  if (!~(" " + className + " ").indexOf(' masked ')) {
                      dom.className = className + ' masked';
                  }
              }
          }
          else {
              setTimeout(function () {
                  if (_this.instance !== null) {
                      var dom = vdom.dom;
                      var maskElement = _this.instance;
                      var className = dom.className;
                      maskElement.style.display = 'none';
                      if (_this.oldPositionStyle) {
                          dom.style.position = _this.oldPositionStyle;
                      }
                      dom.className = (" " + className + " ").replace(/\s*masked\s*/, ' ');
                  }
              }, 100);
          }
      },
      beforeDispose: function () {
          var dom = this.node.dom;
          this.instance !== null && dom.removeChild(this.instance);
      }
  });
  /**
   * 全局 loading 方法
   *
   * @example
   * ``` js
   * import { Loading } from './components/ms-loading';
   * Loading.show();
   * setTimeout(() => {
   *   Loading.hide();
   * }, 5000)
   * ```
   */
  var loadingDirective = avalon.directives['loading'];
  var globalLoadingContext = {
      node: { dom: document.body }
  };
  exports.Loading = {
      show: function () {
          if (globalLoadingContext.instance === undefined) {
              loadingDirective.init.call(globalLoadingContext);
              avalon.ready(function () {
                  loadingDirective.update.call(globalLoadingContext, {
                      dom: globalLoadingContext.node.dom
                  }, true);
              });
          }
          else {
              loadingDirective.update.call(globalLoadingContext, {
                  dom: globalLoadingContext.node.dom
              }, true);
          }
      },
      hide: function () {
          if (globalLoadingContext.instance !== undefined) {
              loadingDirective.update.call(globalLoadingContext, {
                  dom: globalLoadingContext.node.dom
              }, false);
          }
      }
  };
    

});

;/*!vendor/ane/components/ms-loading/index.ts*/
define('vendor/ane/components/ms-loading/index.ts', function(require, exports, module) {

  "use strict";
  var ms_loading_directive_1 = require("vendor/ane/components/ms-loading/ms-loading-directive.ts");
  exports.Loading = ms_loading_directive_1.Loading;
    

});

;/*!vendor/ane/components/ms-table/ms-table.ts*/
define('vendor/ane/components/ms-table/ms-table.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  require("vendor/ane/components/ms-checkbox/ms-checkbox.ts");
  require("vendor/ane/components/ms-pagination/ms-pagination.ts");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  require("vendor/ane/components/ms-loading/index.ts");
  var defaultPagination = function () {
      return {
          current: 1, pageSize: 10, total: NaN, onChange: avalon.noop
      };
  };
  avalon.component('ms-table', {
      soleSlot: 'header',
      template: "\n<div>\n    <table class=\"table \" :loading=\"!window.isNaN(@paginationConfig.total) && @loading\">\n        <thead>\n            <tr>\n                <th :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@isAllChecked,onChange:@handleCheckAll}\"></ms-checkbox>\n                </th>\n                <th :for=\"el in @columns\">{{el.title}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"($index, record) in @getCurrentPageData()\">\n                <td :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@checked.indexOf(record[@key])!=-1,onChange:function(){@handleCheck(arguments[0].target.checked,record)}}\"></ms-checkbox>\n                </td>\n                <td :for=\"col in @columns\" :html=\"col.template\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"table-pagination_1p5ox_2 pull-right \">\n        <ms-pagination :widget=\"{current:@paginationConfig.current,pageSize:@paginationConfig.pageSize,total:@total,onChange:@handlePageChange}\"></ms-pagination>\n    </div>\n    <div class=\"clearfix \"></div>\n</div>\n",
      defaults: {
          header: '',
          columns: [],
          data: [],
          key: 'id',
          loading: false,
          needSelection: false,
          checked: [],
          selection: [],
          isAllChecked: false,
          onSelect: avalon.noop,
          onSelectAll: avalon.noop,
          selectionChange: avalon.noop,
          handleCheckAll: function (e) {
              var _this = this;
              var data = this.getCurrentPageData();
              if (e.target.checked) {
                  data.forEach(function (record) {
                      _this.checked.ensure(record[_this.key]);
                      _this.selection.ensure(record);
                  });
              }
              else {
                  if (!isNaN(this.paginationConfig.total)) {
                      this.checked.clear();
                      this.selection.clear();
                  }
                  else {
                      this.checked.removeAll(function (el) { return data.map(function (record) { return record[_this.key]; }).indexOf(el) !== -1; });
                      this.selection.removeAll(function (el) { return data.indexOf(el) !== -1; });
                  }
              }
              this.selectionChange(this.checked, this.selection.$model);
              this.onSelectAll(e.target.checked, this.selection.$model);
          },
          handleCheck: function (checked, record) {
              if (checked) {
                  this.checked.ensure(record[this.key]);
                  this.selection.ensure(record);
              }
              else {
                  this.checked.remove(record[this.key]);
                  this.selection.remove(record);
              }
              this.selectionChange(this.checked, this.selection.$model);
              this.onSelect(record.$model, checked, this.selection.$model);
          },
          actions: {},
          handle: function (type, col, record, $index) {
              var extra = [];
              for (var _i = 4; _i < arguments.length; _i++) {
                  extra[_i - 4] = arguments[_i];
              }
              var text = record[col.dataIndex].$model || record[col.dataIndex];
              this.actions.apply(this, [type, text, record.$model, $index].concat(extra));
          },
          pagination: defaultPagination(),
          paginationConfig: defaultPagination(),
          handlePageChange: function (currentPage) {
              this.paginationConfig.onChange(currentPage);
              this.paginationConfig.current = currentPage;
              this.$fire('checked.length', this.checked.length);
              this.onChange(this.paginationConfig.$model);
          },
          getCurrentPageData: function () {
              return !isNaN(this.paginationConfig.total) ? this.data : this.data.slice(this.paginationConfig.pageSize * (this.paginationConfig.current - 1), this.paginationConfig.pageSize * this.paginationConfig.current);
          },
          $computed: {
              total: function () {
                  return !isNaN(this.paginationConfig.total) ? this.paginationConfig.total : this.data.length;
              }
          },
          onChange: avalon.noop,
          onInit: function (event) {
              var _this = this;
              var descriptor = ane_util_1.getChildTemplateDescriptor(this);
              descriptor.forEach(function (column) {
                  if (column.props.type == 'selection') {
                      _this.key = column.props.dataIndex || _this.key;
                      _this.needSelection = true;
                      return false;
                  }
              });
              this.columns = getColumnConfig(descriptor);
              this.$watch('checked.length', function (newV) {
                  var currentPageKeys = _this.getCurrentPageData()
                      .map(function (record) { return record[_this.key]; });
                  _this.isAllChecked = currentPageKeys
                      .filter(function (key) { return _this.checked.contains(key); })
                      .length == currentPageKeys.length;
              });
              this.$watch('data', function (v) {
                  _this.isAllChecked = false;
                  _this.checked.clear();
                  _this.selection.clear();
              });
              this.$watch('data.length', function (v) {
                  _this.isAllChecked = false;
                  _this.checked.clear();
                  _this.selection.clear();
              });
              this.$watch('pagination', function (v) {
                  avalon.mix(_this.paginationConfig, v);
              });
              this.$watch('pagination.current', function (v) {
                  _this.paginationConfig.current = v;
              });
              this.$watch('pagination.pageSize', function (v) {
                  _this.paginationConfig.pageSize = v;
              });
              this.$watch('pagination.total', function (v) {
                  _this.paginationConfig.total = v;
              });
              this.$watch('pagination.onChange', function (v) {
                  _this.paginationConfig.onChange = v;
              });
              this.$fire('pagination', this.pagination.$model);
          },
          onReady: function (event) {
          },
          onDispose: function (vm, el) {
          }
      }
  });
  function getColumnConfig(descriptor, level) {
      if (level === void 0) { level = 1; }
      return descriptor.reduce(function (acc, column) {
          if (column.is != 'ms-table-header')
              return acc;
          if (column.props.type == 'selection') {
              return acc;
          }
          var inlineTemplate = column.inlineTemplate;
          inlineTemplate = inlineTemplate.replace(/(ms-|:)skip="[^"]*"/g, '');
          inlineTemplate = inlineTemplate.replace(/<\s*ms-table-header[^>]*>.*<\/\s*ms-table-header\s*>/g, '');
          inlineTemplate = inlineTemplate.replace(/(ms-|:)click="handle\(([^"]*)\)"/g, function ($0, $1, $2, $3) {
              return ($1 + "click=\"handle(" + $2 + ",)\"").replace(/,/, ', col, record, $index,').replace(/,\)/, ')');
          });
          acc.push({
              title: column.props.title,
              dataIndex: column.props.dataIndex || '',
              template: /^\s*$/.test(inlineTemplate) ? '{{record.' + column.props.dataIndex + '}}' : inlineTemplate
          });
          return acc.concat(getColumnConfig(column.children, level + 1));
      }, []);
  }
    

});

;/*!vendor/ane/components/ms-table-header/ms-table-header.ts*/
define('vendor/ane/components/ms-table-header/ms-table-header.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  avalon.component('ms-table-header', {
      template: '<th><slot /></th>',
      soleSlot: 'content',
      defaults: {
          content: '',
          col: ''
      }
  });
    

});

;/*!vendor/ane/components/ms-dialog/ms-dialog.ts*/
define('vendor/ane/components/ms-dialog/ms-dialog.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var bootbox = require("node_modules/bootbox/bootbox");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  avalon.component('ms-dialog', {
      template: '<div style="display: none"><slot name="header" /><slot name="body"/></div>',
      defaults: {
          body: 'blank',
          $dialog: null,
          show: false,
          size: '',
          uploading: false,
          $innerVm: '',
          onOk: function () { },
          onCancel: function () { },
          onInit: function (event) {
              var _this = this;
              var vm = event.vmodel;
              vm.$watch('show', function (newV) {
                  if (newV) {
                      vm.$dialog = bootbox.dialog({
                          message: vm.body,
                          title: '{{title}}',
                          size: vm.size,
                          buttons: {
                              save: {
                                  label: '保存',
                                  className: 'btn-primary',
                                  callback: function () {
                                      vm.onOk();
                                      return false;
                                  }
                              },
                              cancel: {
                                  label: '取消',
                                  className: 'btn-default',
                                  callback: function () {
                                      vm.onCancel();
                                  }
                              }
                          }
                      }).on('hidden.bs.modal', function (e) {
                          setTimeout(function () {
                              if ($('.modal.in').length) {
                                  $('body').addClass('modal-open');
                              }
                              else {
                                  $('body').removeClass('modal-open');
                              }
                          }, 100);
                      })
                          .on('shown.bs.modal', function () {
                      });
                      vm.$dialog.find('.modal-content').attr(':controller', _this.$innerVm);
                      avalon.scan(vm.$dialog.get(0));
                  }
                  else {
                      if (vm.$dialog) {
                          vm.$dialog.find('.bootbox-close-button').trigger('click');
                      }
                  }
              });
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
              this.show && this.$fire('show', true);
          },
          onDispose: function (event) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-form/ms-form.ts*/
define('vendor/ane/components/ms-form/ms-form.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  /**
   * Form组件
   * @prop $from 表单数据管理类
   * @prop type 如果为 search，则只在表单项的值被用户手动修改时，才会加入到最后要提交的数据对象上，用于搜索表单
   * @prop horizontal 是否添加 form-horizontal 到 class
   * @prop inline 是否添加 form-inline 到 class
   *
   * @example
   * <ms-form>
   *   <ms-form-item :widget="{label: '标题'}">
         <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
       </ms-form-item>
   * </ms-form>
   */
  avalon.component('ms-form', {
      template: "<form role=\"form\" :class=\"[(@horizontal ? 'form-horizontal' : ''), (@inline ? 'form-inline' : '')]\"><slot /></form>",
      defaults: {
          items: '',
          $form: null,
          type: '',
          horizontal: false,
          inline: false,
          onFormChange: function (meta) {
              if (this.$form) {
                  this.$form.setFieldsValue((_a = {},
                      _a[meta.name] = { value: meta.value },
                      _a));
              }
              var _a;
          },
          onInit: function (event) {
              event.target._ctype_ = 'ms-form';
              event.target._vm_ = this;
          },
          onReady: function (event) {
          }
      },
      soleSlot: 'items'
  });
    

});

;/*!vendor/ane/components/ms-form/ms-form-item.ts*/
define('vendor/ane/components/ms-form/ms-form-item.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  /**
   * 表单项组件
   * @prop label 表单项标签
   *
   * @example
   * ``` html
   * <ms-form-item :widget="{label: '标题'}">
          <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
      </ms-form-item>
   * ```
   */
  avalon.component('ms-form-item', {
      template: "\n<div class=\"form-group has-feedback \" :css=\"[@inline && @inlineFormGroupStyle]\" :class=\"[@className,(@hasRules && @dirty ? (@reasons.length ? 'has-error' : 'has-success') : '')] \">\n    <label class=\"control-label \" :if=\"@label.length\">{{@label}}</label>\n    <slot />\n    <i class=\"form-control-feedback \" :if=\"@hasRules\" :class=\"[(@dirty ? 'glyphicon' : ''), (@reasons.length ? 'glyphicon-remove' : 'glyphicon-ok')] \" :visible=\"@dirty\"></i>\n    <small class=\"help-block \" :css=\"[@inline && @inlineMessageStyle]\" :if=\"@hasRules && @reasons.length\">{{@reasons.length ? @reasons[0].message : ''}}</small>\n</div>\n",
      defaults: {
          $formVm: null,
          label: '',
          control: '',
          inline: false,
          dirty: false,
          reasons: [],
          hasRules: false,
          className: '',
          inlineFormGroupStyle: { verticalAlign: 'top' },
          inlineMessageStyle: { marginBottom: 0 },
          onFieldChange: function (descriptor) {
              var _this = this;
              this.$formVm.type !== 'search' && this.$formVm.$form.setFieldsValue((_a = {},
                  _a[descriptor.name] = { value: descriptor.value, denyValidate: descriptor.denyValidate },
                  _a));
              if (!descriptor.rules)
                  return;
              this.hasRules = true;
              this.$formVm.$form.addFields((_b = {},
                  _b[descriptor.name] = { rules: descriptor.rules },
                  _b));
              this.$formVm.$form.on('error' + descriptor.name, function (reasons) {
                  _this.dirty = true;
                  _this.reasons = reasons;
              });
              this.$formVm.$form.on('reset', function (fields) {
                  if (~Object.keys(fields).indexOf(descriptor.name)) {
                      _this.dirty = false;
                      _this.reasons = [];
                  }
              });
              var _a, _b;
          },
          onFormChange: function (meta) {
              if (this.$formVm.$form.autoAsyncChange) {
                  this.dirty = true;
              }
              this.$formVm.onFormChange(meta);
          },
          onInit: function (event) {
              event.target._ctype_ = 'ms-form-item';
              event.target._vm_ = this;
              this.$formVm = ane_util_1.findParentComponent(this, 'ms-form');
              if (this.$formVm === null) {
                  throw 'ms-form-item 必须放在 ms-form 内';
              }
              this.inline = this.$formVm.inline;
          },
          onReady: function (event) {
          }
      },
      soleSlot: 'control'
  });
    

});

;/*!vendor/ane/components/ms-form/index.ts*/
define('vendor/ane/components/ms-form/index.ts', function(require, exports, module) {

  "use strict";
  require("vendor/ane/components/ms-form/ms-form.ts");
  require("vendor/ane/components/ms-form/ms-form-item.ts");
    

});

;/*!vendor/ane/components/ms-form/create-form.ts*/
define('vendor/ane/components/ms-form/create-form.ts', function(require, exports, module) {

  "use strict";
  var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator = (this && this.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
      return { next: verb(0), "throw": verb(1), "return": verb(2) };
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [0, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var avalon = require("node_modules/avalon2/dist/avalon");
  var Schema = require("node_modules/async-validator/lib/index");
  function createForm(options) {
      return new Form(options);
  }
  exports.createForm = createForm;
  var defaultOptions = {
      record: {},
      autoAsyncChange: true,
      onFieldsChange: avalon.noop
  };
  function Form(options) {
      this.cachedRecord = {};
      this.fields = {};
      this.all = {};
      avalon.mix(this, defaultOptions, options);
  }
  Form.prototype.setFieldsValue = function (fields) {
      var _this = this;
      if (!this.autoAsyncChange) {
          Object.keys(fields).forEach(function (name) {
              setValue(_this.cachedRecord, name, fields[name].value);
          });
          return;
      }
      Object.keys(fields).forEach(function (name) {
          var field = fields[name];
          setValue(_this.record, name, field.value);
          if (!field.denyValidate && _this.fields[name]) {
              _this.validateField(name, _this.fields[name]).then(function (result) {
                  if (result.isOk) {
                      _this.trigger('error' + result.name, []);
                  }
                  else {
                      _this.trigger('error' + result.name, [{
                              message: result.message
                          }]);
                  }
              });
          }
      });
      this.onFieldsChange(fields, this.record);
  };
  Form.prototype.addFields = function (fields) {
      var _this = this;
      Object.keys(fields).forEach(function (name) {
          _this.fields[name] = fields[name];
      });
  };
  Form.prototype.on = function (type, listener) {
      (this.all[type] || (this.all[type] = [])).push(listener);
  };
  Form.prototype.trigger = function (type, payload) {
      (this.all[type] || []).map(function (handler) { handler(payload); });
  };
  Form.prototype.validateField = function (fieldName, field) {
      return __awaiter(this, void 0, void 0, function () {
          var rules, value, result, validator, _a;
          return __generator(this, function (_b) {
              switch (_b.label) {
                  case 0:
                      rules = field.rules;
                      value = getValue(this.record, fieldName);
                      result = { isOk: true, name: fieldName };
                      if (!rules)
                          return [2 /*return*/, result];
                      validator = new Schema((_a = {},
                          _a[fieldName] = rules,
                          _a));
                      return [4 /*yield*/, new Promise(function (resolve, reject) {
                              validator.validate((_a = {}, _a[fieldName] = value, _a), function (errors, fields) {
                                  if (errors) {
                                      resolve({
                                          isOk: false, name: fieldName, message: errors[0].message
                                      });
                                  }
                                  else {
                                      resolve({
                                          isOk: true, name: fieldName
                                      });
                                  }
                              });
                              var _a;
                          })];
                  case 1:
                      result = _b.sent();
                      return [2 /*return*/, result];
              }
          });
      });
  };
  Form.prototype.validateFields = function (fields) {
      var _this = this;
      if (fields === void 0) { fields = this.fields; }
      var flatRecord = {}, ruleMap = {};
      if (!this.autoAsyncChange) {
          this.record = avalon.mix(true, {}, this.record, this.cachedRecord);
      }
      Object.keys(fields).map(function (name) {
          ruleMap[name] = fields[name].rules;
          flatRecord[name] = getValue(_this.record, name);
      });
      var validator = new Schema(ruleMap);
      return new Promise(function (resolve, reject) {
          validator.validate(flatRecord, function (errors, fields) {
              var errorFields = Object.keys(fields || {});
              var isAllValid = true;
              Object.keys(_this.fields).map(function (name) {
                  if (~errorFields.indexOf(name)) {
                      isAllValid = false;
                      _this.trigger('error' + name, fields[name]);
                  }
                  else {
                      _this.trigger('error' + name, []);
                  }
              });
              resolve(isAllValid);
          });
      });
  };
  Form.prototype.resetFields = function (fields) {
      if (fields === void 0) { fields = this.fields; }
      this.record = {};
      this.trigger('reset', fields);
  };
  /**
   * 根据表达式构给对象赋值，属性路径中最多只允许存在一个数组
   * @param {*} record 数据对象
   * @param {String} expr 对象属性路径表达式
   * @param {*} val 值
   */
  function setValue(record, expr, val) {
      var rSplit = /\.|\].|\[|\]/;
      var temp = record, prop;
      expr = expr.split(rSplit).filter(function (prop) { return !!prop; });
      var valType = Object.prototype.toString.call(val);
      var mirrorVal;
      if (valType == '[object Array]') {
          mirrorVal = avalon.mix(true, {}, { t: val }).t;
      }
      else if (valType == '[object Object]') {
          mirrorVal = avalon.mix(true, {}, val);
      }
      else {
          mirrorVal = val;
      }
      while (prop = expr.shift()) {
          if (expr.length === 0) {
              temp[prop] = mirrorVal;
          }
          else {
              temp = temp[prop] = temp[prop] || {};
          }
      }
  }
  /**
   * 根据表达式构从对象取值，属性路径中最多只允许存在一个数组
   * @param {*} record 数据对象
   * @param {String} expr 对象属性路径表达式
   */
  function getValue(record, expr) {
      var rSplit = /\.|\].|\[|\]/;
      var temp = record, prop;
      expr = expr.split(rSplit).filter(function (prop) { return !!prop; });
      while ((prop = expr.shift()) && temp) {
          temp = temp[prop];
      }
      return temp;
  }
    

});

;/*!vendor/ane/components/ms-form/ms-control.ts*/
define('vendor/ane/components/ms-form/ms-control.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  exports.__esModule = true;
  /**
   * 表单控制组件，只能从此继承，不能呢实例此组件
   * @prop value 组件值
   * @prop col 字段路径
   *
   * @example
   * ``` js
   * import controlComponent from '../ms-from/ms-control';
   * controlComponent.extend({
   *      displayName: 'ms-input',
   *      template: '../ms-input.html',
   *      defaults: {...}
   * })
   * ```
   */
  exports["default"] = avalon.component('ms-control', {
      template: '&nbsp;',
      defaults: {
          $formItem: null,
          $rules: null,
          value: '',
          col: '',
          placeholder: '',
          onChange: avalon.noop,
          emitValue: function (e) {
              var v = e.target.value;
              this.$formItem && this.$formItem.onFormChange({
                  name: this.col, value: v, denyValidate: e.denyValidate
              });
          },
          handleChange: function (e) {
              this.emitValue(e);
              this.onChange(e);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-form/utils.ts*/
define('vendor/ane/components/ms-form/utils.ts', function(require, exports, module) {

  "use strict";
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  function emitToFormItem(vmodel) {
      vmodel.$formItem = ane_util_1.findParentComponent(vmodel, 'ms-form-item');
      if (vmodel.$formItem === null) {
          return;
      }
      vmodel.$formItem.onFieldChange({
          name: vmodel.col, rules: vmodel.$rules, value: vmodel.value, denyValidate: true
      });
  }
  exports.emitToFormItem = emitToFormItem;
    

});

;/*!vendor/ane/components/ms-input/ms-input.ts*/
define('vendor/ane/components/ms-input/ms-input.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  /**
   * 文本输入组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   *
   * @example
   * ``` html
   * <ms-input :widget="{value: @title1, col: 'title'}"></ms-input>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-input',
      template: "\n<input type=\"text\" class=\"form-control \" \n    :duplex=\"@text\" \n    :attr=\"{name:@col,placeholder:@placeholder}\" \n    :rules=\"{required:true}\"\n    data-duplex-changed=\"@handleChange\">\n",
      defaults: {
          text: '',
          mapValueToText: function (value) {
              this.text = value;
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToText(v);
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'changed'
                  });
              });
              this.mapValueToText(this.value);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-textarea/ms-textarea.ts*/
define('vendor/ane/components/ms-textarea/ms-textarea.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  /**
   * 多行文本输入组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   * @prop rows 文本框行数
   *
   * @example
   * ``` html
   * <ms-textarea :widget="{value: @bio, col: 'bio', rows: 3}"></ms-textarea>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-textarea',
      template: "\n<textarea class=\"form-control \" \n    :duplex=\"@text\" \n    :attr=\"{rows:@rows,name:@col}\"\n    data-duplex-changed=\"@handleChange\"></textarea>\n",
      defaults: {
          rows: '',
          text: '',
          mapValueToText: function (value) {
              this.text = value;
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToText(v);
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'changed'
                  });
              });
              this.mapValueToText(this.value);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-trigger/ms-trigger.ts*/
define('vendor/ane/components/ms-trigger/ms-trigger.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var domAlign = require("node_modules/dom-align/lib/index");
  avalon.component('ms-trigger', {
      template: '<span style="display:none;"></span>',
      defaults: {
          width: 0,
          visible: false,
          innerVmId: '',
          innerClass: '',
          innerTemplate: '',
          withInBox: function () { return true; },
          getTarget: avalon.noop,
          onHide: avalon.noop,
          hide: function (panel) {
              panel.style.top = '-9999px';
              panel.style.left = '-9999px';
              this.onHide();
          },
          onInit: function (event) {
              var _this = this;
              var DOC = document, body = DOC.body;
              var medium = DOC.createElement('div');
              var panel = DOC.createElement('div');
              medium.setAttribute('id', this.$id);
              medium.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%;');
              panel.setAttribute('class', this.innerClass);
              panel.setAttribute(':important', this.innerVmId);
              panel.innerHTML = this.innerTemplate;
              medium.appendChild(panel);
              body.appendChild(medium);
              avalon.scan(panel, avalon.vmodels[this.innerVmId]);
              avalon.bind(body, 'click', function (e) {
                  if (_this.visible && panel !== e.target && !avalon.contains(panel, e.target) && !_this.withInBox(e.target)) {
                      _this.hide(panel);
                  }
              });
              this.$watch('visible', function (v) {
                  if (v) {
                      panel.style.width = _this.width + 'px';
                      panel.scrollTop = 0;
                      domAlign(panel, _this.getTarget(), {
                          points: ['tl', 'bl'],
                          offset: [0, 1],
                          //targetOffset: ['0%','100%']
                          overflow: {
                              adjustY: true
                          }
                      });
                  }
                  else {
                      _this.hide(panel);
                  }
              });
          },
          onDispose: function (event) {
              var DOC = document, body = DOC.body;
              var medium = DOC.getElementById(this.$id);
              body.removeChild(medium);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-trigger/index.ts*/
define('vendor/ane/components/ms-trigger/index.ts', function(require, exports, module) {

  "use strict";
  require("vendor/ane/components/ms-trigger/ms-trigger.ts");
    

});

;/*!vendor/ane/components/ms-select/ms-select.ts*/
define('vendor/ane/components/ms-select/ms-select.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  require("vendor/ane/components/ms-trigger/index.ts");
  '';
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
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
          // 声明周期
          mapValueToSelection: function (value) {
              this.selection = this.options.filter(function (o) { return value.contains(o.value); });
              avalon.vmodels[this.panelVmId].selection = this.selection.toJSON();
          },
          onInit: function (event) {
              var _this = this;
              var self = this;
              if (this.options.length === 0) {
                  var descriptor = ane_util_1.getChildTemplateDescriptor(this);
                  this.options = getOptions(descriptor);
              }
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  var value = v.toJSON();
                  _this.mapValueToSelection(v);
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
              this.mapValueToSelection(this.value);
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
    

});

;/*!vendor/ane/components/ms-select/ms-select-option.ts*/
define('vendor/ane/components/ms-select/ms-select-option.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  avalon.component('ms-select-option', {
      template: '&nbsp;',
      soleSlot: 'label',
      defaults: {
          label: '',
          value: '',
          disabled: false
      }
  });
    

});

;/*!vendor/ane/components/ms-select/index.ts*/
define('vendor/ane/components/ms-select/index.ts', function(require, exports, module) {

  "use strict";
  require("vendor/ane/components/ms-select/ms-select.ts");
  require("vendor/ane/components/ms-select/ms-select-option.ts");
    

});

;/*!vendor/ane/components/ms-upload/ms-upload-list.ts*/
define('vendor/ane/components/ms-upload/ms-upload-list.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  avalon.component('ms-upload-list', {
      template: "\n<ul class=\"bus-upload-list \">\n    <li :for=\"($index, file) in @fileList\"\n        :class=\"[@getTextClass(file)] \">\n        <div class=\"bus-upload-list-info \">\n            <i class=\"fa fa-file-o text-muted \"></i>\n            <span :attr=\"{title:file.name}\">{{file.name}}</span>\n        </div>\n        <i class=\"fa fa-times bus-upload-btn-close \" :click=\"del(file)\"></i>\n        <span class=\"bus-upload-list-progress \" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <i class=\"fa fa-check-circle text-success \" :class=\"[(file.status === 'done' ? '' : 'hide')] \"></i>\n    </li>\n</ul>\n",
      defaults: {
          fileList: [],
          getTextClass: function (file) {
              switch (file.status) {
                  case 'done': return 'text-primary';
                  case 'uploading': return 'text-muted';
                  case 'error': return 'text-danger';
              }
              return '';
          },
          onRemove: avalon.noop,
          del: function (file) {
              this.onRemove(file);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-upload/ms-upload-card.ts*/
define('vendor/ane/components/ms-upload/ms-upload-card.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  avalon.component('ms-upload-card', {
      template: "\n<div class=\"bus-upload-card \">\n    <div class=\"bus-upload-card-item \" :class=\"[(file.status === 'error' ? 'bordered-danger' : '')] \" :for=\"($index, file) in @fileList\">\n        <img :attr=\"{src:file.url,alt:file.name,title:file.name}\">\n        <span class=\"bus-upload-card-progress \" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <span class=\"bus-upload-card-tool \">\n            <i class=\"fa fa-eye \"></i>\n            <i class=\"fa fa-trash-o \" :click=\"del(file)\"></i>\n        </span>\n    </div>\n</div>\n",
      defaults: {
          fileList: [],
          getTextClass: function (file) {
              switch (file.status) {
                  case 'done': return 'text-primary';
                  case 'uploading': return 'text-muted';
                  case 'error': return 'text-danger';
              }
              return '';
          },
          onRemove: avalon.noop,
          del: function (file) {
              this.onRemove(file);
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-upload/ms-upload.ts*/
define('vendor/ane/components/ms-upload/ms-upload.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  '';
  require("vendor/ane/components/ms-upload/ms-upload-list.ts");
  require("vendor/ane/components/ms-upload/ms-upload-card.ts");
  var up_loader_1 = require("node_modules/up-loader/dist/up-loader");
  /**
   * 文件上传组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   *
   * @example
   * ``` html
   * <ms-upload :widget="{value:@record.attachment,col:'attachment',$rules:{required:true,type:'array'}}">
   *      <i class="fa fa-upload"></i>选择附件
   * </ms-upload>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-upload',
      template: "\n<div class=\"bus-upload-container \">\n    <div class=\"bus-upload-card-wall \" :if=\"@showUploadList && @listType==='picture-card'\">\n        <ms-upload-card :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-card>\n    </div>\n    <label :visible=\"!@showUploadList && @listType==='picture-card' && @fileList.length > 0\" class=\"bus-upload-card-item \" :attr=\"{'for':@helpId}\">\n        <img :attr=\"{src:@fileList[0]?@fileList[0].url:blankImg,alt:@fileList[0]?@fileList[0].name:'',title:@fileList[0]?@fileList[0].name:''}\">\n    </label>\n    <label :visible=\"@showUploadList || @fileList.length == 0\" :class=\"[(@listType==='picture-card'?@cardClass:@btnClass)] \" :attr=\"{'for':@helpId}\"><slot /></label>\n    <form><input type=\"file\" name=\"file\" :attr=\"{id:@helpId}\"></form>\n    <div :if=\"@showUploadList && @listType!=='picture-card'\">\n        <ms-upload-list :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-list>\n    </div>\n</div>\n",
      soleSlot: 'trigger',
      defaults: {
          helpId: '',
          trigger: '',
          value: [],
          fileList: [],
          action: '',
          listType: 'text-list',
          showUploadList: true,
          btnClass: 'btn btn-default',
          cardClass: 'bus-upload-select-card bus-upload-card-item',
          blankImg: 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
          $uploader: null,
          beforeUpload: function () {
              return true;
          },
          handleRemove: function (file) {
              this.fileList.removeAll(function (f) { return f.uid === file.uid; });
              var value = this.fileList.filter(function (f) { return f.status === 'done'; }).map(function (f) { return f.url; });
              this.handleChange({
                  target: { value: this.showUploadList ? value : value[0] },
                  type: 'file-upload'
              });
          },
          mapValueToFileList: function (value) {
              var _this = this;
              value.map(function (url, i) {
                  if (url === '') {
                      return;
                  }
                  _this.fileList.push({
                      uid: -(i + 1),
                      name: url.replace(/.*\/([^\/]+)\/?/, '$1'),
                      url: url,
                      status: 'done',
                      progress: 0
                  });
              });
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.helpId = this.$id;
              this.mapValueToFileList(this.value);
              this.$watch('value', function (v) {
                  var value = v.toJSON();
                  _this.fileList.clear();
                  _this.mapValueToFileList(value);
                  _this.handleChange({
                      target: { value: _this.showUploadList ? value : value[0] },
                      denyValidate: true,
                      type: 'file-upload'
                  });
              });
          },
          onReady: function (event) {
              var _this = this;
              this.$uploader = up_loader_1["default"].init({
                  url: this.action,
                  fileInput: event.target.getElementsByTagName('input').file,
                  filter: function (files) {
                      // 如果不支持图片信息的预览，则不进行过滤和限制
                      return files.filter(function (file) { return !file.size || _this.beforeUpload(file); });
                  },
                  onSelect: function (files, allFiles) {
                      allFiles.map(function (file) {
                          if (!_this.showUploadList) {
                              _this.fileList.set(0, {
                                  uid: file.index,
                                  name: file.name,
                                  status: 'uploading',
                                  progress: 0,
                                  url: _this.blankImg
                              });
                              return;
                          }
                          if (_this.fileList.every(function (f) { return f.uid !== file.index; })) {
                              _this.fileList.push({
                                  uid: file.index,
                                  name: file.name,
                                  status: 'uploading',
                                  progress: 0,
                                  url: _this.blankImg
                              });
                          }
                          else {
                              updateFileObj(_this.fileList, file.index, function (f) {
                                  f.status = 'uploading';
                                  f.progress = 0;
                              });
                          }
                      });
                      _this.$uploader.upload();
                  },
                  onProgress: function (file, loaded, total) {
                      updateFileObj(_this.fileList, file.index, function (f) { return f.progress = (loaded / total * 100).toFixed(); });
                  },
                  onSuccess: function (file, response) {
                      updateFileObj(_this.fileList, file.index, function (f) {
                          f.status = 'done';
                          f.progress = 100;
                          f.url = response.url;
                      });
                  },
                  onFailure: function (file, err) {
                      updateFileObj(_this.fileList, file.index, function (f) {
                          f.status = 'error';
                          f.url = 'data:image/gif;base64,MA==';
                      });
                      throw err;
                  },
                  onComplete: function () {
                      var value = _this.fileList.filter(function (f) { return f.status === 'done'; }).map(function (f) { return f.url; });
                      _this.handleChange({
                          target: { value: _this.showUploadList ? value : value[0] },
                          type: 'file-upload'
                      });
                  }
              });
          },
          onDispose: function (event) {
          }
      }
  });
  function updateFileObj(fileList, uid, callback) {
      fileList.forEach(function (f) {
          if (f.uid === uid) {
              callback(f);
              return false;
          }
      });
  }
    

});

;/*!vendor/ane/components/ms-checkbox/ms-checkbox-group.ts*/
define('vendor/ane/components/ms-checkbox/ms-checkbox-group.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  require("vendor/ane/components/ms-checkbox/ms-checkbox.ts");
  ms_control_1["default"].extend({
      displayName: 'ms-checkbox-group',
      template: "\n<div class=\"checkbox-group \">\n    <ms-checkbox \n        :widget=\"{\n            checked:@selection.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-checkbox>\n</div>\n",
      defaults: {
          value: [],
          disabled: false,
          options: [],
          selection: [],
          toggleOption: function (option) {
              var optionIndex = this.selection.indexOf(option.value);
              if (optionIndex === -1) {
                  this.selection.push(option.value);
              }
              else {
                  this.selection.remove(option.value);
              }
              this.handleChange({
                  target: { value: this.selection.toJSON() },
                  type: 'checkbox-group'
              });
          },
          mapValueToSelection: function (value) {
              this.selection = this.options.filter(function (o) { return value.contains(o.value); }).map(function (o) { return o.value; });
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToSelection(v);
                  _this.handleChange({
                      target: { value: v.toJSON() },
                      denyValidate: true,
                      type: 'checkbox-group'
                  });
              });
              this.mapValueToSelection(this.value);
          },
          onReady: function (event) {
              //vm.elHiddenInput = $(el).find('input:hidden');
          },
          onDispose: function (event) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-radio/ms-radio.ts*/
define('vendor/ane/components/ms-radio/ms-radio.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  if (avalon.msie <= 8) {
      var doc = document;
      var head = doc.getElementsByTagName('head')[0];
      var style = doc.createElement('style');
      var cssStr = "\n        .radio-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .radio-inner-ie span {\n            display: none !important;\n        }\n    ";
      style.setAttribute('type', 'text/css');
      if (style.styleSheet) {
          style.styleSheet.cssText = cssStr;
      }
      else {
          style.appendChild(doc.createTextNode(cssStr));
      }
      head.appendChild(style);
  }
  avalon.component('ms-radio', {
      soleSlot: 'label',
      template: "\n<div :class=\"@wrapper \" class=\"radio-wrapper_vkaeg_2 \" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"radio-inner_vkaeg_5 radio-inner-ie \">\n        <input type=\"radio\"\n            :attr=\"{id:@helpId,disabled:@disabled,value:@value,name:@name}\"\n            :duplex=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text \"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>\n",
      defaults: {
          wrapper: 'radio',
          label: '',
          checked: '',
          value: '',
          name: '',
          group: false,
          disabled: false,
          onChange: function (e) {
              this.onChange(e);
          },
          helpId: '',
          onInit: function (event) {
              this.helpId = this.$id;
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
          },
          onDispose: function (vm, el) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-radio/ms-radio-group.ts*/
define('vendor/ane/components/ms-radio/ms-radio-group.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  require("vendor/ane/components/ms-radio/ms-radio.ts");
  ms_control_1["default"].extend({
      displayName: 'ms-radio-group',
      template: "\n<div class=\"checkbox-group \">\n    <ms-radio \n        :widget=\"{\n            checked:@selected,\n            value:option.value,\n            name:@helpId,\n            group:true,\n            onChange:function(){\n                @toggleOption(arguments[0], option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-radio>\n</div>\n",
      defaults: {
          value: '',
          disabled: false,
          options: [],
          selected: '',
          toggleOption: function (e, option) {
              this.selected = option.value;
              this.handleChange({
                  target: { value: this.selected },
                  type: 'radio-group'
              });
          },
          helpId: '',
          mapValueToSelected: function (value) {
              this.selected = value;
          },
          onInit: function (event) {
              var _this = this;
              this.helpId = this.$id;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToSelected(v);
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'radio-group'
                  });
              });
              this.mapValueToSelected(this.value);
          },
          onReady: function (event) {
          },
          onDispose: function (event) {
          }
      }
  });
    

});

;/*!vendor/ane/components/ms-radio/index.ts*/
define('vendor/ane/components/ms-radio/index.ts', function(require, exports, module) {

  "use strict";
  require("vendor/ane/components/ms-radio/ms-radio.ts");
  require("vendor/ane/components/ms-radio/ms-radio-group.ts");
    

});

;/*!vendor/ane/components/ms-notification/ms-notification.ts*/
define('vendor/ane/components/ms-notification/ms-notification.ts', function(require, exports, module) {

  "use strict";
  var noty = require("node_modules/noty/js/noty/packaged/jquery.noty.packaged");
  var defaultOptions = {
      timeout: 3000
  };
  exports.__esModule = true;
  exports["default"] = {
      info: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-info-circle'),
              type: 'information',
              timeout: timeout || defaultOptions.timeout
          });
      },
      success: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-check-circle'),
              type: 'success',
              timeout: timeout || defaultOptions.timeout
          });
      },
      error: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-times-circle'),
              type: 'error',
              timeout: timeout || defaultOptions.timeout
          });
      },
      warning: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-warning'),
              type: 'warning',
              timeout: timeout || defaultOptions.timeout
          });
      },
      warn: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          this.warning({ message: message, title: title, timeout: timeout });
      },
      config: function (options) {
          if (options.timeout !== undefined) {
              defaultOptions.timeout = options.timeout;
          }
      }
  };
  function template(title, message, icon) {
      title = title ? "<strong>" + title + "</strong><br>" : '';
      return "<div>\n                <i class=\"" + icon + " pull-left\" style=\"font-size: 38px;min-width: 38px;text-align: center;\"></i>\n                " + title + "\n                " + message + "\n            </div>";
  }
    

});

;/*!vendor/ane/components/ms-notification/index.ts*/
define('vendor/ane/components/ms-notification/index.ts', function(require, exports, module) {

  "use strict";
  var ms_notification_1 = require("vendor/ane/components/ms-notification/ms-notification.ts");
  exports.__esModule = true;
  exports["default"] = ms_notification_1["default"];
    

});

;/*!vendor/ane/components/ms-message/ms-message.ts*/
define('vendor/ane/components/ms-message/ms-message.ts', function(require, exports, module) {

  "use strict";
  var noty = require("node_modules/noty/js/noty/packaged/jquery.noty.packaged");
  var defaultOptions = {
      duration: 1500
  };
  exports.__esModule = true;
  exports["default"] = {
      info: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-info-circle"></i>' + content,
              type: 'information',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      success: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-check-circle"></i>' + content,
              type: 'success',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      error: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-times-circle"></i>' + content,
              type: 'error',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      warning: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-warning"></i>' + content,
              type: 'warning',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      warn: function (_a) {
          var content = _a.content, duration = _a.duration;
          this.warning({ content: content, duration: duration });
      },
      config: function (options) {
          if (options.duration !== undefined) {
              defaultOptions.duration = options.duration;
          }
      }
  };
    

});

;/*!vendor/ane/components/ms-message/index.ts*/
define('vendor/ane/components/ms-message/index.ts', function(require, exports, module) {

  "use strict";
  var ms_message_1 = require("vendor/ane/components/ms-message/ms-message.ts");
  exports.__esModule = true;
  exports["default"] = ms_message_1["default"];
    

});

;/*!vendor/ane/index.ts*/
define('vendor/ane/index.ts', function(require, exports, module) {

  "use strict";
  // require('/components/ms-data-box');
  var ms_table_1 = require("vendor/ane/components/ms-table/ms-table.ts");
  exports.table = ms_table_1["default"];
  var ms_table_header_1 = require("vendor/ane/components/ms-table-header/ms-table-header.ts");
  exports.tableHeader = ms_table_header_1["default"];
  var ms_pagination_1 = require("vendor/ane/components/ms-pagination/ms-pagination.ts");
  exports.pagination = ms_pagination_1["default"];
  var ms_dialog_1 = require("vendor/ane/components/ms-dialog/ms-dialog.ts");
  exports.dialog = ms_dialog_1["default"];
  var ms_form_1 = require("vendor/ane/components/ms-form/index.ts");
  exports.form = ms_form_1["default"];
  var create_form_1 = require("vendor/ane/components/ms-form/create-form.ts");
  exports.createForm = create_form_1.createForm;
  var ms_input_1 = require("vendor/ane/components/ms-input/ms-input.ts");
  exports.input = ms_input_1["default"];
  var ms_textarea_1 = require("vendor/ane/components/ms-textarea/ms-textarea.ts");
  exports.textarea = ms_textarea_1["default"];
  // require('/components/ms-control-select');
  var ms_select_1 = require("vendor/ane/components/ms-select/index.ts");
  exports.select = ms_select_1["default"];
  // require('/components/ms-control-select2');
  var ms_upload_1 = require("vendor/ane/components/ms-upload/ms-upload.ts");
  exports.upload = ms_upload_1["default"];
  // require('/components/ms-control-datetimepicker');
  var ms_checkbox_1 = require("vendor/ane/components/ms-checkbox/ms-checkbox.ts");
  exports.checkbox = ms_checkbox_1["default"];
  var ms_checkbox_group_1 = require("vendor/ane/components/ms-checkbox/ms-checkbox-group.ts");
  exports.checkboxGroup = ms_checkbox_group_1["default"];
  var ms_radio_1 = require("vendor/ane/components/ms-radio/index.ts");
  exports.radio = ms_radio_1["default"];
  var ms_notification_1 = require("vendor/ane/components/ms-notification/index.ts");
  exports.notification = ms_notification_1["default"];
  var ms_message_1 = require("vendor/ane/components/ms-message/index.ts");
  exports.message = ms_message_1["default"];
    

});
