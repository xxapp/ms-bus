define('components/doc-ms-form/doc-ms-form.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_1 = require("vendor/ane-component/index.ts");
  exports.name = 'doc-ms-form';
  avalon.component(exports.name, {
      template: "\n<div class=\"row \">\n    <div class=\"col-xs-12 col-md-12 \">\n        <div class=\"widget \">\n            <div class=\"widget-header bg-green \">\n                <span class=\"widget-caption \">Form组件</span>\n            </div>\n            <div class=\"widget-body \">\n                <ms-form :widget=\"{$form: @$form}\">\n                    <ms-form-item :widget=\"{label:'姓名'}\">\n                        <ms-input :widget=\"{value:@record.name,col:'name',$rules:{required:true,message:'请输入文字'}}\"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label:'兴趣'}\">\n                        <ms-checkbox-group\n                            :widget=\"{value:@record.hobby,col:'hobby',options:[\n                                        { label: '编程', value: 'code' },\n                                        { label: '其他', value: 'other' }\n                                    ],$rules:{required:true,type:'array'}}\">\n                        </ms-checkbox-group>\n                    </ms-form-item>\n                    <div class=\"form-title \">教育经历</div>\n                    <!--ms-for: ($index,school) in @record.education-->\n                    <div style=\"width: 500px;\">\n                        <ms-form-item>\n                            <ms-input :widget=\"{value:school,col:'education[' + $index +']',placeholder:'学校',$rules:{required:true,message:'请输入文字'}}\"></ms-input>\n                            <button type=\"button\" class=\"btn btn-danger \" style=\"position: absolute;top: 1px;right: -55px;\" :click=\"@removeEducation(school)\">删除</button>\n                        </ms-form-item>\n                    </div>\n                    <!--ms-for-end:-->\n                    <button type=\"button\" class=\"btn btn-primary \" :click=\"@addEducation\"><i class=\"fa fa-plus-circle \"></i> 添加教育经历</button>\n                    <ms-form-item :widget=\"{label:'性别'}\">\n                        <ms-radio-group\n                            :widget=\"{value:@record.gender,col:'gender',options:[\n                                        { label: '男', value: 'M' },\n                                        { label: '女', value: 'F' }\n                                    ],$rules:{required:true}}\">\n                        </ms-radio-group>\n                    </ms-form-item>\n                    <!--<ms:control-select2 label=\"性别\" col=\"gender\" ms-cduplex=\"record.gender\">\n                        <option value=\"M\">男</option>\n                        <option value=\"F\">女</option>\n                    </ms:control-select2>\n                    <ms:control-select2 \n                        label=\"代表作\" \n                        col=\"masterpiece\" \n                        ms-cprop-value-list=\"record.masterpiece\" \n                        store=\"github\" \n                        action=\"repository\" \n                        col-key=\"full_name\" \n                        col-val=\"full_name\"\n                        multiple=\"true\">\n                    </ms:control-select2>\n                    <ms:control-datepicker label=\"出生日期\" col=\"birthday\" ms-cduplex=\"record.birthday\"></ms:control-datepicker>-->\n                    <ms-form-item :widget=\"{label:'头像'}\">\n                        <ms-upload :widget=\"{value:[@record.avatar],col:'avatar',action: '/api/file/uploadFile',listType:'picture-card',showUploadList:false,beforeUpload:@handleBeforeUpload,$rules:{required:true,message:'请选择头像'}}\">\n                            <i class=\"fa fa-plus \"></i>选择图片\n                        </ms-upload>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label:'个人简介'}\">\n                        <ms-textarea :widget=\"{value:@record.bio,col:'bio',rows:5,$rules:{required:true}}\"></ms-textarea>\n                    </ms-form-item>\n                    <ms-form-item :widget=\"{label:'附件'}\">\n                        <ms-upload :widget=\"{value:@record.attachment,col:'attachment',action: '/api/file/uploadFile',listType:'text-list',$rules:{required:true,type:'array'}}\">\n                            <i class=\"fa fa-upload \"></i>选择文件\n                        </ms-upload>\n                    </ms-form-item>\n                </ms-form>\n                <pre>{{@json}}</pre>\n                <div class=\"row \">\n                    <div class=\"col-md-12 \">\n                        <button class=\"btn btn-info pull-right \" :click=\"@submit\"><i class=\"fa fa-save \"></i>提交</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
      defaults: {
          $form: ane_1.createForm({
              record: initialData()
          }),
          record: initialData(),
          json: '',
          expire: 0,
          addEducation: function () {
              this.record.education.push('');
          },
          removeEducation: function (school) {
              this.record.education.remove(school);
          },
          handleBeforeUpload: function (file) {
              if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                  ane_1.message.error({
                      content: '只能选择jpg或者png类型的图片！'
                  });
                  return false;
              }
              if (file.size / 1024 / 1024 > 1) {
                  ane_1.message.error({
                      content: '选择的图片必须小于1MB！'
                  });
                  return false;
              }
              return true;
          },
          submit: function () {
              // if (!avalon.vmodels['doc_form'].validate()) {
              //     return false;
              // }
              this.$form.validateFields();
          },
          onInit: function (event) {
              var _this = this;
              this.$form.onFieldsChange = function (fields, record) {
                  _this.json = JSON.stringify(record, null, 2);
              };
              this.$watch('expire', function (v) {
                  console.log(v);
              });
          }
      }
  });
  function initialData() {
      return {
          name: '123',
          gender: 'F',
          masterpiece: ['xxapp/msBus'],
          birthday: '2017-03-25T16:00:00Z',
          hobby: ['code'],
          avatar: '',
          education: ['常乐男子职业技术学院'],
          bio: '',
          attachment: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
      };
  }
  //# sourceMappingURL=/ms-bus/static/components/doc-ms-form/doc-ms-form.js.map
  

});
