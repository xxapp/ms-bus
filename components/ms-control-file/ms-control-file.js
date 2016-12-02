var avalon = require('avalon');
var store = require('/services/storeService');
var avxUtil = require('/vendor/avx-component/avx-util');

require.loadCss({
    url: '/components/ms-control-file/ms-control-file.css'
});

/**
 * 文件输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 如果有绑定的数据行，此属性值指的是数据的字段名称
 * @prop duplex 自定义的绑定数据，如果同时存在则会覆盖col
 * 
 * @example
 * ``` html
 * <!-- 注：例1和例2效果是一样的 -->
 * <ms:control-file label="标题1" col="name"></ms:control-file>
 * <ms:control-file label="标题2" duplex="record['name']"></ms:control-file>
 * <ms:control-file label="标题3" duplex="state.text"></ms:control-file>
 * ```
 */
avalon.component('ms:controlFile', {
    $template: __inline('./ms-control-file.html'),
    $replace: 1,
    $$template: function (tmpl) {
        var $parent = avalon.vmodels[this.parentVmId];
        this.model = this.model || ($parent && $parent.model) || 'record';
        if (this.duplex) {
            // 如果配置了duplex属性，则直接使用duplex的属性值绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.duplex + '"');
        }
        if (this.col) {
            // 否则用col的配置，使用record[col]去绑定控件
            return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.model + '[\'' + this.col.replace('.', '\'][\'') + '\']"');
        }
        return tmpl;
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        if (!store[vm.store]) {
            avalon.error('数据源[' + vm.store + ']似乎未定义，检查/services/storeService.js');
        }
        vm.helpId = vm.$id;
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
    helpId: '',
    model: ''
});