var avalon = require('avalon2');

var states = {}

avalon.component('ms-view', {
    template: '<div ms-html="@page" class="ms-view"></div>',
    defaults: {
        page: '&nbsp;',
        path: 'no',
       
        onReady: function(e) {
            var path = e.vmodel.path
            var state = states[path]
            avalon.vmodels[state.vm.$id] = state.vm
            setTimeout(function() {//必须等它扫描完这个template,才能替换
                e.vmodel.page = state.html
            },100)

        },
        onDispose: function(e) {
            var path = e.vmodel.path
            var state = states[path]
            var vm = state.vm
            var render = vm.render
            render && render.dispose()
            delete avalon.vmodels[vm.$id]
        }
    }
});

exports.add = function addState(path, html, vm) {
    states[path] = {
        vm: vm,
        html: html
    }
}

exports.resolve = function (path) {
    var state = states[path];
    state.html = typeof state.html == 'function' ? state.html() : state.html;
    state.vm = typeof state.vm == 'function' ? state.vm() : state.vm;
    return Promise.all([state.html, state.vm]).then(function (result) {
        state.html = result[0];
        state.vm = result[1];
    });
}