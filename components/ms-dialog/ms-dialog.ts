import * as avalon from 'avalon2';
import * as bootbox from 'bootbox';
import { parseSlotToVModel } from '../../vendor/avx-component/avx-util';

avalon.component('ms-dialog', {
    template: '<div style="display: none"><slot name="header" /><slot name="body"/></div>',
    defaults: {
        header: '',
        body: 'blank',
        $dialog: null,
        show: false,
        size: '',
        title: '',
        uploading: false,
        onOk() {},
        onCancel() {},
        onInit(event) {
            var vm = event.vmodel;
            vm.$watch('show', (newV) => {
                if (newV) {
                    vm.$dialog = bootbox.dialog({
                        message: vm.body,
                        title: vm.title ? vm.title : vm.header,
                        size: vm.size,
                        buttons: {
                            save: {
                                label: '保存',
                                className: "btn-primary",
                                callback() {
                                    vm.onOk();
                                    return false;
                                }
                            },
                            cancel: {
                                label: '取消',
                                className: "btn-default",
                                callback() {
                                    vm.onCancel();
                                }
                            }
                        }
                    }).on('hidden.bs.modal', (e) => { 
                        vm.onCancel(e);
                        setTimeout(() => {
                            if ($('.modal.in').length) {
                                $('body').addClass('modal-open');
                            } else {
                                $('body').removeClass('modal-open');
                            }
                        }, 100);
                    })
                    .on('shown.bs.modal', () => {
                        
                    });
                    avalon.scan(vm.$dialog.get(0));
                } else {
                    if (vm.$dialog) {
                        vm.$dialog.find('.bootbox-close-button').trigger('click');
                    }
                }
            });
        },
        onReady(event) {
            parseSlotToVModel(this, this.$render.root.children);
        },
        onDispose(event) {
        }
    }
});