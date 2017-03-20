var avalon = require('avalon2');

avalon.component('gf-dashboard', {
    template: __inline('./gf-dashboard.html'),
    defaults: {
        message: 'welcome'
    }
});