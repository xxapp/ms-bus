import * as avalon from 'avalon2';

import ajax from '../../services/ajaxService';
import notification from '../ms-notification';

import '../../components/ms-form';
import { createForm } from '../../components/ms-form/create-form';
import '../../components/ms-input/ms-input';
import '../../components/ms-textarea/ms-textarea';
import '../../components/ms-checkbox/ms-checkbox-group';

export const name = 'doc-ms-form';

avalon.component(name, {
    template: __inline('./doc-ms-form.html'),
    defaults: {
        $form: createForm({
            record: initialData()
        }),
        record: initialData(),
        json: '',
        expire: 0,
        addEducation() {
            this.record.education.push('');
        },
        removeEducation(school) {
            this.record.education.remove(school);
        },
        submit() {
            // if (!avalon.vmodels['doc_form'].validate()) {
            //     return false;
            // }
            this.$form.validateFields();
        },
        onInit(event) {
            this.$form.onFieldsChange = (fields, record) => {
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
        education: ['常乐男子职业技术学院'],
        bio: ''
    };
}