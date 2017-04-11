import * as avalon from 'avalon2';

export const name = 'gf-aaa';

avalon.component(name, {
    template: __inline('./gf-aaa.html'),
    defaults: {
        text: 'aaa'
    }
});