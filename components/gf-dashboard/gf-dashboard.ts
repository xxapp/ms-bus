import * as avalon from 'avalon2';
import '../../vendor/avx-component/avx-component';
import { createForm } from '../../components/ms-form/create-form';
import * as msg from '../../services/messageService';

avalon.component('gf-dashboard', {
    template: __inline('./gf-dashboard.html'),
    defaults: {
        show: false,
        message: '欢迎',
        handleCancel(e) {
            //console.log(e);
            this.show = false;
        },
        list: [{
            id: '1', name: '老狼', address: '深山', province: '老林'
        }],
        action(type, text, record, index) {
            if (type == 'delete') {
                console.log(text, record, index);
                msg.success('删除成功');
            }
        },
        handleChange(e) {

        },
        options: [
            { label: '苹果', value: 'Apple' },
            { label: '梨', value: 'Pear' },
            { label: '橘', value: 'Orange', disabled: false }
        ],
        handleCheckGroupChange(checkedValue) {
            console.log('选择了:'+ checkedValue);
        },
        onInit(event) {
        }
    }
});

avalon.define({
    $id: 'dashboard_from',
    $form: createForm({
        onFieldsChange(fields) {
            console.log(this.record);
        }
    })
});