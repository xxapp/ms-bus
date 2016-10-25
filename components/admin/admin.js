var avalon = require('avalonjs/dist/avalon.shim.js');

avalon.component("ms:button", {
    a: 1,
    $replace: 1,
    $ready: function() {
        console.log("BUTTON构建完成")
    },
    $template: '<button type="button" ms-attr-id="a">{{a}}</button>'
});

avalon.component('ms:amazingAvalon', {
    text: 'Hello World',
    $replace: 1,
    $init: function (vm) {
        vm.changeToUpperCase = function () {
            vm.text = vm.text.toUpperCase();
        }
    },
    $template: '<div><input ms-duplex="text"><button ms-click="changeToUpperCase">Upper Case</button></div>',
    changeToUpperCase: function () {}
});

avalon.define({
    $id: 'component',
    array: [1,2,3],
    $opts: {
        text: 'Amazing Avalon'
    }
});
avalon.scan();