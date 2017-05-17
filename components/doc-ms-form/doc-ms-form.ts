import * as avalon from 'avalon2';

import ajax from '../../services/ajaxService';
import { serviceUrl } from "../../services/configService";
import { createForm, message } from "ane";

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
        fileUploadUrl: serviceUrl + '/api/file/uploadFile',
        addEducation() {
            this.record.education.push('');
        },
        removeEducation(school) {
            this.record.education.remove(school);
        },
        handleBeforeUpload(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                message.error({
                    content: '只能选择jpg或者png类型的图片！'
                });
                return false;
            }
            if (file.size / 1024 / 1024 > 1) {
                message.error({
                    content: '选择的图片必须小于1MB！'
                });
                return false;
            }
            return true;
        },
        handleChange(e) {
            console.log(e.target.value);
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
        bio: '',
        attachment: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
    };
}