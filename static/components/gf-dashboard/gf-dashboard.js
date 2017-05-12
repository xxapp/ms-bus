define('components/gf-dashboard/gf-dashboard.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_1 = require("vendor/ane-component/index.ts");
  exports.name = 'gf-dashboard';
  avalon.component(exports.name, {
      template: "\n<div>\n    <h3>{{@message}}</h3>\n    <button type=\"button\" :click=\"@show = true\">show dialog</button>\n    <ms-dialog :widget=\"{$innerVm: 'dashboard_from', show: @show, onCancel: @handleCancel}\">\n        <div slot=\"body\" ms-skip>\n            <xmp is=\"ms-form\" :widget=\"{$form: @$form}\">\n                <ms-form-item :widget=\"{label: '标题'}\">\n                    <ms-input :widget=\"{col: 'title'}\"></ms-input>\n                </ms-form-item>\n            </xmp>\n        </div>\n    </ms-dialog>\n    <br>\n    <ms-checkbox :widget=\"{checked:true,onChange:@handleChange}\">同意</ms-checkbox>\n    <ms-checkbox :widget=\"{checked:false,onChange:@handleChange}\">不同意</ms-checkbox>\n\n    <ms-select :widget=\"{showSearch:true}\">\n        <ms-select-option :widget=\"{value:'M'}\">男</ms-select-option>\n        <ms-select-option :widget=\"{value:'F', disabled:false}\">女</ms-select-option>\n    </ms-select>\n    <input type=\"text\" class=\"form-control \"/>\n</div>\n",
      defaults: {
          show: false,
          message: '欢迎',
          handleCancel: function (e) {
              //console.log(e);
              this.show = false;
          }
      }
  });
  avalon.define({
      $id: 'dashboard_from',
      title: 'Title',
      $form: ane_1.createForm({
          onFieldsChange: function (fields) {
              console.log(this.record);
          }
      })
  });
  //# sourceMappingURL=/ms-bus/static/components/gf-dashboard/gf-dashboard.js.map
  

});
