define('vendor/ane-component/components/ms-upload/ms-upload.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  '';
  require("vendor/ane-component/components/ms-upload/ms-upload-list.ts");
  require("vendor/ane-component/components/ms-upload/ms-upload-card.ts");
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
              var value;
              this.fileList.removeAll(function (f) { return f.uid === file.uid; });
              this.value.remove(file.url);
              value = this.value.$model || this.value || [''];
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
                  var value = v.$model || v || [''];
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
                      if (!_this.showUploadList) {
                          _this.value = [response.url];
                      }
                      else {
                          _this.value.push(response.url);
                      }
                  },
                  onFailure: function (file, err) {
                      updateFileObj(_this.fileList, file.index, function (f) {
                          f.status = 'error';
                          f.url = 'data:image/gif;base64,MA==';
                      });
                      throw err;
                  },
                  onComplete: function () {
                      var value = _this.value.$model || _this.value || [''];
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
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-upload/ms-upload.js.map
  

});
