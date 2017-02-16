var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * 文本输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 指定name属性值
 * 
 * @example
 * ``` html
 * <ms:control-text label="标题1" col="name" ms-cduplex="record.name"></ms:control-text>
 * ```
 */
avalon.component('ms:controlText', {
    $template: __inline('./ms-control-text.html'),
    $replace: 1,
    $dynamicProp: {
        duplex: { type: 'String' }
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        vm.$watch('duplex', function (v) {
            vm.$dynamicProp.duplex.setter(v);
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    label: '',
    col: '',
    duplex: ''
});