import * as avalon from 'avalon2';

import ajax from '../../services/ajaxService';
import * as msg from '../../services/messageService';

import '../../components/ms-form';
import { createForm } from '../../components/ms-form/create-form';

avalon.component('doc-ms-form', {
    template: __inline('./doc-ms-form.html'),
    defaults: {
        $form: createForm({
            record: initialData()
        }),
        $rules: {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '请填写姓名'
                        }
                    }
                },
                hobby: {
                    validators: {
                        notEmpty: {
                            message: '请选择兴趣'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: '请选择性别'
                        }
                    }
                },
                birthday: {
                    validators: {
                        notEmpty: {
                            message: '请选择出生日期'
                        }
                    }
                },
                avatar: {
                    validators: {
                        notEmpty: {
                            message: '请选择头像图'
                        }
                    }
                },
                bio: {
                    validators: {
                        notEmpty: {
                            message: '请填写个人简介'
                        }
                    }
                }
            }
        },
        json: '',
        submit: function () {
            // if (!avalon.vmodels['doc_form'].validate()) {
            //     return false;
            // }
        },
        onInit(event) {
            this.$form.onFieldsChange = (fields, record) => {
                this.json = JSON.stringify(record, null, 2);
            }
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
        bio: ''
    };
}