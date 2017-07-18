import avalon from 'avalon2';

import 'ane';
import curdComponent from '../common-curd/common-curd';
import { demo as demoStore } from '../../services/storeService';

export const name = 'gf-demo-fast';

curdComponent.extend({
    displayName: name,
    template: __inline('./gf-demo-fast.html'),
    defaults: {
        $store: demoStore,
        pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/
    }
});