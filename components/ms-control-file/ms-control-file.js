var avalon = require('avalon');
var store = require('/services/storeService');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * 文件输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 指定name属性值
 * @prop store 处理文件上传的store配置，默认为"file"
 * @prop placeholder 占位文字
 * @prop btnText 上传按钮文字，默认为"选择文件"
 * 
 * @example
 * ``` html
 * <!-- 注：例1和例2效果是一样的 -->
 * <ms:control-file label="标题1" col="name" ms-cduplex="record.name"></ms:control-file>
 * ```
 */
avalon.component('ms:controlFile', {
    $template: __inline('./ms-control-file.html'),
    $replace: 1,
    $dynamicProp: {
        duplex: { type: 'String' }
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);
        if (!store[vm.store]) {
            avalon.error('数据源[' + vm.store + ']似乎未定义，检查/services/storeService.js');
        }
        vm.helpId = vm.$id;

        vm.$watch('duplex', function (v) {
            vm.$dynamicProp.duplex.setter(v);
        });
    },
    $ready: function (vm, el) {
        function changeHandler() {
            var inputId = 'file' + vm.$id, val = this.value, index = val.lastIndexOf('\\');
            this.id = inputId;
            $(el).find('input:text').val('文件' + val.substring(index + 1) + '上传中...');
            store.file.insert({
                fileElementId: inputId,
                success: function (data, status) {
                    $(el).find('input:text').val(data.url).trigger('input');
                }
            });
            $(this).replaceWith('<input type="file" name="file">');
            $(el).find('input:file').change(changeHandler);
        }
        $(el).find('input:file').change(changeHandler);
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    store: 'file',
    label: '',
    col: '',
    duplex: '',
    placeholder: '',
    btnText: '选择文件',
    helpId: ''
});