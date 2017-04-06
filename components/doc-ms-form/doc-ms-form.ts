import * as avalon from 'avalon2';

import ajax from '../../services/ajaxService';
import * as msg from '../../services/messageService';

import '../../components/ms-form';
import { createForm } from '../../components/ms-form/create-form';
import '../../components/ms-form/ms-form-item';
import '../../components/ms-input/ms-input';
import '../../components/ms-textarea/ms-textarea';
import '../../components/ms-checkbox/ms-checkbox-group';

avalon.component('doc-ms-form', {
    template: __inline('./doc-ms-form.html'),
    defaults: {
        $form: createForm({
            record: initialData()
        }),
        record: initialData(),
        json: '',
        expire: 0,
        submit: function () {
            // if (!avalon.vmodels['doc_form'].validate()) {
            //     return false;
            // }
            this.$form.validateAll();
        },
        onInit(event) {
            this.$form.onFieldsChange = (fields, record) => {
                avalon.mix(true, this.record, record);
                this.json = JSON.stringify(record, null, 2);
            }
            this.$watch('expire', v => {
                console.log(v);
            })
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
        education: ['成都信息工程大学'],
        bio: ''
    };
}