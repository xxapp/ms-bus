define('components/gf-demo/gf-demo.ts', function(require, exports, module) {

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
  var ane_1 = require("vendor/ane-component/index.ts");
  var storeService_1 = require("services/storeService.ts");
  exports.name = 'gf-demo';
  avalon.component(exports.name, {
      template: "\n<div class=\"row \">\n    <div class=\"col-xs-12 col-md-12 \">\n        <ms-dialog :widget=\"{$innerVm: 'demo_form', show: @show, onOk: @handleOk, title: @isEdit ? '修改' : '新增', onCancel: function () { @show = false; }}\">\n            <div slot=\"body\" ms-skip>\n                <xmp is=\"ms-form\" :widget=\"{$form: @$form}\">\n                    <ms-form-item :widget=\"{label: 'ID'}\">\n                        <ms-input :widget=\"{value:@record.region_id,col: 'region_id', $rules: { required: true, message: '地区ID不能为空' }}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '名称'}\">\n                        <ms-input :widget=\"{value:@record.region_name,col: 'region_name', $rules: { required: true, message: '地区名称不能为空' }}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: 'PID'}\">\n                        <ms-input :widget=\"{value:@record.region_parent_id,col: 'region_parent_id', $rules: { required: true, message: '地区PID不能为空' }}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '套餐'}\" :for=\"($index, el) in @record.suites\">\n                        <ms-input :widget=\"{value:el.name,col: 'suites[' + $index + '].name'}\"></ms-input>\n                    </ms-form-item>\n                </xmp>\n            </div>\n        </ms-dialog>\n        <div class=\"widget \">\n            <div class=\"widget-header bg-red \">\n                <span class=\"widget-caption \">地区列表</span>\n            </div>\n            <div class=\"widget-body \">\n                <ms-form :widget=\"{$form:@$searchForm,type:'search',inline:true}\">\n                    <ms-form-item :widget=\"{label: 'ID'}\">\n                        <ms-input :widget=\"{col: 'region_id'}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '名称'}\">\n                        <ms-input :widget=\"{col: 'region_name.firstName'}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '开始日期'}\">\n                        <ms-input :widget=\"{col: 'startDate', $rules: { pattern: @pattern, message: '日期格式不正确' }}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '结束日期'}\">\n                        <ms-input :widget=\"{col: 'endDate'}\"></ms-input>\n                    </ms-form-item>\n                    <button type=\"button\" class=\"btn btn-info \" :click=\"@search\">\n                        <span class=\"fa fa-search \"></span>搜索\n                    </button>\n                </ms-form>\n                <div class=\"table-toolbar \">\n                    <button class=\"btn btn-info \" :click=\"actions('add')\">\n                        <span class=\"fa fa-plus \">\n                        </span>新增地区\n                    </button>\n                </div>\n                <ms-table :widget=\"{data:@list,actions:@actions,pagination:@pagination,onChange:@handleTableChange}\">\n                    <ms-table-header :widget=\"{dataIndex:'region_id',type:'selection'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'地区',dataIndex:'region_name'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'PID',dataIndex:'region_parent_id'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'操作',dataIndex:'region_id'}\">\n                        <button type=\"button\" class=\"btn btn-primary btn-xs \" :click=\"handle('edit')\"><i class=\"fa fa-edit \"></i> 编辑</button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs \" :click=\"handle('delete')\"><i class=\"fa fa-trash-o \"></i> 删除</button>\n                    </ms-table-header>\n                </ms-table>\n            </div>\n        </div>\n    </div>\n</div>\n",
      defaults: {
          show: false,
          list: [],
          $searchForm: ane_1.createForm({ autoAsyncChange: false }),
          pagination: {
              current: 1, pageSize: 6, total: 0
          },
          pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/,
          search: function () {
              var _this = this;
              this.$searchForm.validateFields().then(function (isAllValid) {
                  if (isAllValid) {
                      _this.fetch();
                  }
              });
          },
          fetch: function () {
              var _this = this;
              var page = {
                  start: this.pagination.pageSize * (this.pagination.current - 1),
                  limit: this.pagination.pageSize
              };
              storeService_1.demo.fetch(__assign({}, this.$searchForm.record, page)).then(function (data) {
                  _this.pagination.total = data.total;
                  _this.list = data.list;
              });
          },
          actions: function (type, text, record, index) {
              if (type === 'add') {
                  form.isEdit = false;
                  form.title = '新增';
                  form.record = storeService_1.demo.initialData();
                  this.show = true;
              }
              else if (type === 'edit') {
                  form.isEdit = true;
                  form.title = '修改';
                  form.record = record;
                  this.show = true;
              }
              else if (type === 'delete') {
                  storeService_1.demo.remove(record.region_id).then(function (result) {
                      if (result.code === '0') {
                          ane_1.message.success({
                              content: '删除成功'
                          });
                      }
                  });
              }
          },
          handleOk: function () {
              var _this = this;
              form.$form.validateFields().then(function (isAllValid) {
                  if (isAllValid) {
                      if (form.isEdit) {
                          storeService_1.demo.update(form.$form.record).then(function (result) {
                              _this.fetch();
                          });
                      }
                      else {
                          storeService_1.demo.create(form.$form.record).then(function (result) {
                              _this.fetch();
                          });
                      }
                      _this.show = false;
                  }
              });
          },
          handleTableChange: function (pagination) {
              this.pagination.current = pagination.current;
              this.fetch();
          },
          onInit: function (event) {
              this.fetch();
          }
      }
  });
  var form = avalon.define({
      $id: 'demo_form',
      title: '',
      isEdit: false,
      $form: ane_1.createForm({
          record: storeService_1.demo.initialData(),
          onFieldsChange: function (fields, record) {
              //avalon.mix(form.record, record);
          }
      }),
      record: storeService_1.demo.initialData()
  });
  //# sourceMappingURL=/ms-bus/static/components/gf-demo/gf-demo.js.map
  

});
