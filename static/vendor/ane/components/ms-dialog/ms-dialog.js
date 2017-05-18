define('vendor/ane/components/ms-dialog/ms-dialog.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var bootbox = require("node_modules/bootbox/bootbox");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  avalon.component('ms-dialog', {
      template: '<div style="display: none"><slot name="header" /><slot name="body"/></div>',
      defaults: {
          body: 'blank',
          $dialog: null,
          show: false,
          size: '',
          uploading: false,
          $innerVm: '',
          onOk: function () { },
          onCancel: function () { },
          onInit: function (event) {
              var _this = this;
              var vm = event.vmodel;
              vm.$watch('show', function (newV) {
                  if (newV) {
                      vm.$dialog = bootbox.dialog({
                          message: vm.body,
                          title: '{{title}}',
                          size: vm.size,
                          buttons: {
                              save: {
                                  label: '保存',
                                  className: 'btn-primary',
                                  callback: function () {
                                      vm.onOk();
                                      return false;
                                  }
                              },
                              cancel: {
                                  label: '取消',
                                  className: 'btn-default',
                                  callback: function () {
                                      vm.onCancel();
                                  }
                              }
                          }
                      }).on('hidden.bs.modal', function (e) {
                          setTimeout(function () {
                              if ($('.modal.in').length) {
                                  $('body').addClass('modal-open');
                              }
                              else {
                                  $('body').removeClass('modal-open');
                              }
                          }, 100);
                      })
                          .on('shown.bs.modal', function () {
                      });
                      vm.$dialog.find('.modal-content').attr(':controller', _this.$innerVm);
                      avalon.scan(vm.$dialog.get(0));
                  }
                  else {
                      if (vm.$dialog) {
                          vm.$dialog.find('.bootbox-close-button').trigger('click');
                      }
                  }
              });
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
              this.show && this.$fire('show', true);
          },
          onDispose: function (event) {
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-dialog/ms-dialog.js.map
  

});
