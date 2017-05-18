define('components/doc-ms-table/doc-ms-table.ts', function(require, exports, module) {

  "use strict";
  var __assign = (this && this.__assign) || Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ajaxService_1 = require("services/ajaxService.ts");
  var ane_1 = require("vendor/ane/index.ts");
  exports.name = 'doc-ms-table';
  avalon.component(exports.name, {
      template: "\n<div class=\"row \">\n    <div class=\"col-xs-12 col-md-12 \">\n        <div class=\"widget \">\n            <div class=\"widget-header bg-green \">\n                <span class=\"widget-caption \">Table组件</span>\n            </div>\n            <div class=\"widget-body \">\n                <div class=\"form-title \">本地分页</div>\n                <ms-table :widget=\"{data:@list,actions:@actions,onSelect:@handleSelect,onSelectAll:@handleSelectAll,selectionChange:@handleSelectionChange}\">\n                    <ms-table-header :widget=\"{dataIndex:'id',type:'selection'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'地址',dataIndex:'address'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'省份',dataIndex:'province'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'名称'}\"><span :skip>{{record.name}}</span></ms-table-header>\n                    <ms-table-header :widget=\"{title:'操作',dataIndex:'name'}\">\n                        <button type=\"button\" class=\"btn btn-danger btn-xs \" :click=\"handle('delete')\">删除</button>\n                        <!--<button type=\"button\" class=\"btn btn-danger btn-xs \" :click=\"action('delete', record[col.dataIndex].$model || record[col.dataIndex], record.$model, $index)\">删除</button>-->\n                    </ms-table-header>\n                </ms-table>\n                \n                <div class=\"form-title \">远程数据分页</div>\n                <ms-table :widget=\"{data:@remoteList,loading:@loading,pagination:@pagination,onChange:@handleTableChange}\">\n                    <ms-table-header :widget=\"{dataIndex:'region_id',type:'selection'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'地区',dataIndex:'region_name'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'PID',dataIndex:'region_parent_id'}\"></ms-table-header>\n                    <!--<ms-table-header :widget=\"{title:'操作'}\">\n                        <button type=\"button\" class=\"btn btn-danger btn-xs \" :click=\"handle('delete')\">删除</button>\n                    </ms-table-header>-->\n                </ms-table>\n            </div>\n        </div>\n    </div>\n</div>\n",
      defaults: {
          list: avalon.range(29).map(function (n) { return ({
              id: n, name: "\u8001\u72FC" + n, address: '深山', province: '老林'
          }); }),
          remoteList: [],
          loading: false,
          pagination: {
              pageSize: 6, total: 0
          },
          fetch: function (params) {
              var _this = this;
              if (params === void 0) { params = {}; }
              this.loading = true;
              ajaxService_1["default"]({
                  url: '/api/demo',
                  method: 'get',
                  data: __assign({}, params)
              }).then(function (data) {
                  _this.pagination.total = data.total;
                  data.list[0].region_parent_id = Date.now();
                  _this.remoteList = data.list;
                  _this.loading = false;
              });
          },
          handleTableChange: function (pagination) {
              if (this.pagination.hasOwnProperty('current')) {
                  this.pagination.current = pagination.current;
              }
              this.fetch({
                  start: pagination.pageSize * (pagination.current - 1),
                  limit: pagination.pageSize
              });
          },
          actions: function (type, text, record, index) {
              if (type == 'delete') {
                  this.list.removeAll(function (el) { return el.id == record.id; });
                  ane_1.message.success({
                      content: '删除成功'
                  });
              }
          },
          handleSelect: function (record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
          },
          handleSelectAll: function (selected, selectedRows) {
              console.log(selected, selectedRows);
          },
          handleSelectionChange: function (selectedRowKeys, selectedRows) {
              console.log("selectedRowKeys: " + selectedRowKeys, 'selectedRows: ', selectedRows);
          },
          handleChange: function (e) {
          },
          onInit: function (event) {
              this.fetch();
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/components/doc-ms-table/doc-ms-table.js.map
  

});
