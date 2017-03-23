import * as avalon from 'avalon2';
import '../../vendor/avx-component/avx-component';
import { createForm } from '../../components/ms-form/create-form';

avalon.component('gf-dashboard', {
    template: __inline('./gf-dashboard.html'),
    defaults: {
        show: false,
        message: '欢迎',
        handleCancel(e) {
            //console.log(e);
            this.show = false;
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