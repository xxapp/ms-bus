define('vendor/ane-component/components/ms-table/ms-table.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  require("vendor/ane-component/components/ms-checkbox/ms-checkbox.ts");
  require("vendor/ane-component/components/ms-pagination/ms-pagination.ts");
  var ane_util_1 = require("vendor/ane-component/ane-util.ts");
  require("vendor/ane-component/components/ms-loading/index.ts");
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
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-table/ms-table.js.map
  

});
