import * as avalon from 'avalon2';

import '../../vendor/avx-component';
import curdComponent from '../common-curd/common-curd';
import * as stores from '../../services/storeService';

export const name = 'gf-demo-fast';

curdComponent.extend({
    displayName: name,
    template: __inline('./gf-demo-fast.html'),
    defaults: {
        $store: stores['demo'],
        pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/
    }
});