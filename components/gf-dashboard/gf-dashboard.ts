import * as avalon from 'avalon2';
import '../../vendor/avx-component/avx-component';
import { createForm } from '../../components/ms-form/create-form';
import * as msg from '../../services/messageService';

export const name = 'gf-dashboard';

avalon.component(name, {
    template: __inline('./gf-dashboard.html'),
    defaults: {
        show: false,
        message: '欢迎',
        handleCancel(e) {
            //console.log(e);
            this.show = false;
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