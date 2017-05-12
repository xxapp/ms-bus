define('vendor/ane-component/components/ms-form/create-form.ts', function(require, exports, module) {

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
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-form/create-form.js.map
  

});
