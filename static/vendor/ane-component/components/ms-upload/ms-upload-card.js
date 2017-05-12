define('vendor/ane-component/components/ms-upload/ms-upload-card.ts', function(require, exports, module) {

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
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-upload/ms-upload-card.js.map
  

});
