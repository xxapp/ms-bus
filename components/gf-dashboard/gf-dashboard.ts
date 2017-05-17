import * as avalon from 'avalon2';
import { createForm, notification } from 'ane';
import ajax from '../../services/ajaxService'

export const name = 'gf-dashboard';

avalon.component(name, {
    template: __inline('./gf-dashboard.html'),
    defaults: {
        show: false,
        message: '欢迎',
        masterpiece: ['ane', 'ms-bus'],
        handleCancel(e) {
            //console.log(e);
            this.show = false;
        },
        handleSelectChange(e) {
            console.log(e.target.value);
        },
        fetchOptions(query) {
            return ajax({
                url: 'https://randomuser.me/api/?results=5',
            }).then(body => {
                return body.data.results.map(user => ({
                    label: `${user.name.first}${user.name.last}`,
                    value: user.login.username
                }));
            });
        }
    }
});

avalon.define({
    $id: 'dashboard_from',
    title: 'Title',
    $form: createForm({
        onFieldsChange(fields) {
            console.log(this.record);
        }
    })
});