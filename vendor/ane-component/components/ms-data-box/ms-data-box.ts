import * as avalon from 'avalon2';
import * as beyond from '../../vendor/beyond';
import * as bootbox from 'bootbox';

import * as store from '../../services/storeService.js';
import notification from '../ms-notification';

import { pageSize } from "../../services/configService";

avalon.component('ms-dataBox', {
    template: __inline('./ms-data-box.html'),
    defaults: {
        
    }
});