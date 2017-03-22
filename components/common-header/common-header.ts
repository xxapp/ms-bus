import * as avalon from 'avalon2';
import beyond from '../../vendor/beyond';
import ajax from '../../services/ajaxService';

avalon.component('common-header', {
    template: __inline('./common-header.html'),
    defaults: {
        currentUserName: '',
        logout() {
            global.sessionStorage.removeItem('adminSession');
            global.location.href = '/login.html';
        }
    }
});