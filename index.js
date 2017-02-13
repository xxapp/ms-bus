global.jQuery = global.$ = require('jquery');
/**
 * @require ./node_modules/bootstrap/dist/css/bootstrap.css
 */
require('bootstrap');

var avalon = require('avalon');
require('mmState');
var beyond = require('/vendor/beyond');

require('/services/routerService');

// root vm
var root = avalon.define({
    $id: 'root',
    page: '',
    title: '仪表板',
    breadCrumb: [],
    user: {}
});
root.$watch('title', function(v) {
    this.title = v;
});

// avalon.component全局配置
avalon.libraries.ms.$init = function(vm) {
    for (var i in vm) {
        if (vm.hasOwnProperty(i) && typeof vm[i] === "function") {
            if (i === '$$template') {
                vm[i] = vm[i].bind(vm);
            }
        }
    }
}

avalon.history.start({
    fireAnchor: false
});

avalon.scan();