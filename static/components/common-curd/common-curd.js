define('components/common-curd/common-curd.ts', function(require, exports, module) {

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
  exports.__esModule = true;
  exports["default"] = avalon.component('common-curd', {
      template: '&nbsp;',
      defaults: {
          show: false,
          loading: false,
          list: [],
          $searchForm: ane_1.createForm({ autoAsyncChange: false }),
          pagination: {
              current: 1, pageSize: 6, total: 0
          },
          $dialogs: {
              main: null
          },
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
              this.loading = true;
              this.$store.fetch(__assign({}, this.$searchForm.record, page)).then(function (data) {
                  _this.pagination.total = data.total;
                  _this.list = data.list;
                  console.log('数据加载完成，即将关闭mask');
                  _this.loading = false;
              }, function () {
                  _this.loading = false;
              });
          },
          handleTableChange: function (pagination) {
              this.pagination.current = pagination.current;
              this.fetch();
          },
          handle: {},
          _handle: {
              add: function (text, record, index) {
                  this.$dialogs.main.beginCreate(this.$store.initialData());
                  this.show = true;
              },
              edit: function (text, record, index) {
                  this.$dialogs.main.beginUpdate(record);
                  this.show = true;
              },
              del: function (text, record, index) {
                  this.$store.remove(record.region_id).then(function (result) {
                      if (result.code === '0') {
                          ane_1.message.success({
                              content: '删除成功'
                          });
                      }
                  });
              }
          },
          actions: function (type) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              this.handle[type] && this.handle[type].apply(this, args);
          },
          handleOk: function () {
              var _this = this;
              this.$dialogs.main.submit().then(function (_a) {
                  var isEdit = _a[0], record = _a[1];
                  if (typeof isEdit === 'boolean') {
                      _this.show = false;
                      if (isEdit) {
                          return _this.$store.update(record);
                      }
                      else {
                          return _this.$store.create(record);
                      }
                  }
              }).then(function (result) {
                  if (result !== undefined && result.code === '0') {
                      _this.fetch();
                  }
              });
          },
          _initMainDialog: function () {
              if (this.$dialogs.main === null) {
                  this.$dialogs.main = avalon.define({
                      $id: this.$id + '_dialog_main',
                      title: '新增',
                      isEdit: false,
                      $form: ane_1.createForm({
                          record: this.$store.initialData()
                      }),
                      record: this.$store.initialData(),
                      beginCreate: function (record) {
                          this.isEdit = false;
                          this.title = '新增';
                          this.record = record;
                      },
                      beginUpdate: function (record) {
                          this.isEdit = true;
                          this.title = '修改';
                          this.record = record;
                      },
                      submit: function () {
                          var _this = this;
                          return this.$form.validateFields().then(function (isAllValid) {
                              if (isAllValid) {
                                  return [_this.isEdit, _this.$form.record];
                              }
                          });
                      }
                  });
              }
          },
          _disposeDialogs: function () {
              var _this = this;
              Object.keys(this.$dialogs).map(function (name) {
                  var dialog = _this.$dialogs[name];
                  dialog && delete avalon.vmodels[dialog.$id];
              });
          },
          onInit: function (event) {
              this.fetch();
              this._initMainDialog();
              this.handle = avalon.mix(this._handle, this.handle);
          },
          onDispose: function (event) {
              this._disposeDialogs();
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/components/common-curd/common-curd.js.map
  

});
