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
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-upload/ms-upload-list.js.map
  

});
