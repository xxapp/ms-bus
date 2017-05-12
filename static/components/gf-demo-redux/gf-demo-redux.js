define('components/gf-demo-redux/gf-demo-redux.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
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
  var redux_1 = require("node_modules/redux/dist/redux");
  var redux_thunk_1 = require("node_modules/redux-thunk/lib/index");
  var ane_1 = require("vendor/ane-component/index.ts");
  var storeService_1 = require("services/storeService.ts");
  exports.name = 'gf-demo-redux';
  function fetch(params) {
      return function (dispatch, getState) {
          var _a = getState().region, page = _a.page, pageSize = _a.pageSize, search = _a.search;
          storeService_1.demo.fetch(__assign({}, search, { start: pageSize * (params.page - 1), limit: pageSize })).then(function (data) {
              dispatch({
                  type: 'region/fetch',
                  payload: {
                      list: data.list,
                      total: data.total,
                      page: params.page || page
                  }
              });
          });
      };
  }
  function insert(params) {
      return function (dispatch, getState) {
          var _a = getState().region, page = _a.page, record = _a.record;
          storeService_1.demo.create(record).then(function (data) {
              dispatch({ type: 'region/closeDialog' });
              dispatch(fetch({ page: page }));
          });
      };
  }
  function update(params) {
      return function (dispatch, getState) {
          var _a = getState().region, page = _a.page, record = _a.record;
          storeService_1.demo.update(record).then(function (data) {
              dispatch(fetch({ page: page }));
          });
      };
  }
  function del(params) {
      return function (dispatch, getState) {
          var page = getState().region.page;
          storeService_1.demo.remove(params).then(function (result) {
              if (result.code === '0') {
                  ane_1.message.success({
                      content: '删除成功'
                  });
              }
              dispatch(fetch({ page: page }));
          });
      };
  }
  var region = function regionReducer(state, action) {
      if (state === undefined) {
          state = {
              show: false,
              isEdit: false,
              list: [],
              total: 0,
              page: 1,
              pageSize: 6,
              search: null,
              record: null
          };
      }
      switch (action.type) {
          case 'region/closeDialog':
              return __assign({}, state, { show: false });
          case 'region/fetch':
              return __assign({}, state, action.payload);
          case 'region/readyForAdd':
              return __assign({}, state, { isEdit: false, show: true });
          case 'region/readyForEdit':
              return __assign({}, state, { isEdit: true, show: true });
          case 'region/changeSearch':
              return __assign({}, state, { search: action.payload });
          case 'region/changeRecord':
              return __assign({}, state, { record: action.payload });
          default:
              return state;
      }
  };
  var store = redux_1.createStore(redux_1.combineReducers({
      region: region
  }), global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(), redux_1.applyMiddleware(redux_thunk_1["default"]));
  avalon.component(exports.name, {
      template: "\n<div class=\"row \">\n    <div class=\"col-xs-12 col-md-12 \">\n        <ms-dialog :widget=\"{$innerVm: 'demo_redux_form', show: @show, onOk: @handleOk, title: @isEdit ? '修改' : '新增', onCancel: handleCancel}\">\n            <div slot=\"body\" ms-skip>\n                <div :important=\"demo_redux_form\">\n                    <xmp is=\"ms-form\" :widget=\"{$form: @$form}\">\n                        <ms-form-item :widget=\"{label: 'ID'}\">\n                            <ms-input :widget=\"{value:@record.region_id,col: 'region_id', $rules: { required: true, message: '地区ID不能为空' }}\"></ms-input>\n                        </ms-form-item>\n                        <ms-form-item :widget=\"{label: '名称'}\">\n                            <ms-input :widget=\"{value:@record.region_name,col: 'region_name', $rules: { required: true, message: '地区名称不能为空' }}\"></ms-input>\n                        </ms-form-item>\n                        <ms-form-item :widget=\"{label: 'PID'}\">\n                            <ms-input :widget=\"{value:@record.region_parent_id,col: 'region_parent_id', $rules: { required: true, message: '地区PID不能为空' }}\"></ms-input>\n                        </ms-form-item>\n                        <ms-form-item :widget=\"{label: '套餐'}\" :for=\"($index, el) in @record.suites\">\n                            <ms-input :widget=\"{value:el.name,col: 'suites[' + $index + '].name'}\"></ms-input>\n                        </ms-form-item>\n                    </xmp>\n                </div>\n            </div>\n        </ms-dialog>\n        <div class=\"widget \">\n            <div class=\"widget-header bg-red \">\n                <span class=\"widget-caption \">地区列表</span>\n            </div>\n            <div class=\"widget-body \">\n                <ms-form :widget=\"{$form:@$searchForm,type:'search',inline:true}\">\n                    <ms-form-item :widget=\"{label: 'ID'}\">\n                        <ms-input :widget=\"{col: 'region_id'}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '名称'}\">\n                        <ms-input :widget=\"{col: 'region_name.firstName'}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '开始日期'}\">\n                        <ms-input :widget=\"{col: 'startDate', $rules: { pattern: @pattern, message: '日期格式不正确' }}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label: '结束日期'}\">\n                        <ms-input :widget=\"{col: 'endDate'}\"></ms-input>\n                    </ms-form-item>\n                    <button type=\"button\" class=\"btn btn-info \" :click=\"@search\">\n                        <span class=\"fa fa-search \"></span>搜索\n                    </button>\n                </ms-form>\n                <div class=\"table-toolbar \">\n                    <button class=\"btn btn-info \" :click=\"actions('add')\">\n                        <span class=\"fa fa-plus \">\n                        </span>新增地区\n                    </button>\n                </div>\n                <ms-table :widget=\"{data:@list,actions:@actions,pagination:@pagination,onChange:@handleTableChange}\">\n                    <ms-table-header :widget=\"{dataIndex:'region_id',type:'selection'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'地区',dataIndex:'region_name'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'PID',dataIndex:'region_parent_id'}\"></ms-table-header>\n                    <ms-table-header :widget=\"{title:'操作',dataIndex:'region_id'}\">\n                        <button type=\"button\" class=\"btn btn-primary btn-xs \" :click=\"handle('edit')\"><i class=\"fa fa-edit \"></i> 编辑</button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs \" :click=\"handle('delete')\"><i class=\"fa fa-trash-o \"></i> 删除</button>\n                    </ms-table-header>\n                </ms-table>\n            </div>\n        </div>\n    </div>\n</div>\n",
      defaults: {
          show: false,
          isEdit: false,
          list: [],
          $searchForm: ane_1.createForm({
              onFieldsChange: function (fields, record) {
                  store.dispatch({ type: 'region/changeSearch', payload: record });
              }
          }),
          pagination: {
              current: 1, total: 0, pageSize: 6
          },
          pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/,
          search: function () {
              this.fetch();
          },
          fetch: function (params) {
              if (params === void 0) { params = {}; }
              store.dispatch(fetch(params));
          },
          actions: function (type, text, record, index) {
              if (type === 'add') {
                  form.title = '新增';
                  form.record = storeService_1.demo.initialData();
                  store.dispatch({ type: 'region/readyForAdd' });
              }
              else if (type === 'edit') {
                  form.title = '修改';
                  form.record = record;
                  store.dispatch({ type: 'region/readyForEdit' });
              }
              else if (type === 'delete') {
                  store.dispatch(del(record.region_id));
              }
          },
          handleOk: function () {
              var _this = this;
              form.$form.validateFields().then(function (isAllValid) {
                  if (isAllValid) {
                      if (_this.isEdit) {
                          store.dispatch(update());
                      }
                      else {
                          store.dispatch(insert());
                      }
                      store.dispatch({ type: 'region/closeDialog' });
                  }
              });
          },
          handleCancel: function () {
              store.dispatch({ type: 'region/closeDialog' });
          },
          handleTableChange: function (pagination) {
              this.fetch({ page: pagination.current });
          },
          mapStateToVm: function () {
              var _a = store.getState().region, show = _a.show, isEdit = _a.isEdit, list = _a.list, total = _a.total, page = _a.page, pageSize = _a.pageSize, search = _a.search, record = _a.record;
              this.list = list;
              this.pagination.total = total;
              this.pagination.current = page;
              this.pagination.pageSize = pageSize;
              this.isEdit = isEdit;
              this.show = show;
          },
          onInit: function (event) {
              var _this = this;
              this.mapStateToVm();
              store.subscribe(function () {
                  _this.mapStateToVm();
              });
              this.fetch();
          },
          onReady: function (event) {
          }
      }
  });
  var form = avalon.define({
      $id: 'demo_redux_form',
      title: '',
      $form: ane_1.createForm({
          record: storeService_1.demo.initialData(),
          onFieldsChange: function (fields, record) {
              //avalon.mix(form.record, record);
              store.dispatch({ type: 'region/changeRecord', payload: record });
          }
      }),
      record: storeService_1.demo.initialData()
  });
  //# sourceMappingURL=/ms-bus/static/components/gf-demo-redux/gf-demo-redux.js.map
  

});
