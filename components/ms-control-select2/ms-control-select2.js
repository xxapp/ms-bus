var avalon = require('avalon');
var store = require('/services/storeService');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * @require /node_modules/select2/dist/css/select2.css
 * not require /node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css
 */
require('select2');
require('/node_modules/select2/dist/js/i18n/zh-CN');

/**
 * select2组件
 * @prop label 选择框前的label标签内容
 * @prop col 指定name属性值
 * @prop store 数据源，组件会自动寻找数据源中的dict方法，如果dict没定义则使用list方法
 * @prop action 指定使用数据源中的那个方法，默认为list
 * @prop col-key 数据中作为select的value属性值的字段，默认为id
 * @prop col-val 数据中作为select的展示值的字段，默认为name
 * @prop multiple 是否多选
 * 
 * @example
 *  <ms:control-select2 label="图片尺寸">
 *      <option value="1">大图</option>
 *      <option value="2">小图</option>
 *  </ms:control-select2>
 * 
 * 
 *  <ms:control-select2 label="商品分类" store="category"></ms:control-select2>
 */
avalon.component('ms:controlSelect2', {
    $slot: 'content',
    content: '',
    $template: __inline('./ms-control-select2.html'),
    $replace: 1,
    $dynamicProp: {
        value: { type: 'String' }
    },
    $$template: function (tmpl) {
        var vm = this;
        var $parent = avalon.vmodels[this.parentVmId];
        this.model = this.model || ($parent && $parent.model) || 'record';
        if (vm.store) {
            tmpl = tmpl.replace(/\{\{content\|html\}\}/g, '');
        }
        return tmpl;
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);
        if (vm.store && !store[vm.store]) { avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js') }

        vm.$watch('value', function (v) {
            if (vm.$select.val() == v) {
                return ;
            }
            vm.$select.val(v).trigger('change');
        });
    },
    $ready: function (vm, el) {
        vm.$select = $(el).find('select');
        vm.$select.val(vm.value).trigger('change');
        var select2Options = {
            language: 'zh-CN',
            placeholder: vm.placeholder,
            allowClear: true
        };
        if (vm.store) {
            avalon.mix(select2Options, {
                ajax: {
                    delay: 500,
                    data: function (params) {
                        return store[vm.store].processRequest({
                            query: params.term,
                            page: params.page || 1
                        });
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;

                        data = store[vm.store].processResponse(data, params);
                        return {
                            results: data.rows,
                            pagination: {
                                more: (params.page * (store[vm.store].limit || 30)) < data.total
                            }
                        };
                    },
                    transport: function (params, success, failure) {
                        if (!store[vm.store][vm.action]) { avalon.error('数据源[' + vm.store + ']的[' + vm.action + ']方法没有定义，/services/storeService.js') }
                        var request = store[vm.store][vm.action](params.data);
                        request.then(success, failure);
                    }
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
                templateResult: function (r) {
                    if (r.loading) return r.text;

                    return r[vm.colVal]
                },
                templateSelection: function (r) {
                    return r[vm.colKey] || r.text;
                }
            });
        }
        vm.$select
            .select2(select2Options)
            .on('change', function () {
                vm.$dynamicProp.value.setter(this.value);
                $(this).trigger('input');
            });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
        $(el).find('select').off().select2('destroy')
    },
    $parentVmId: '',
    $select: {},
    label: '',
    col: '',
    store: '',
    action: '',
    colKey: 'id',
    colVal: 'name',
    model: '',
    placeholder: '请选择一项',
    value: '',
    multiple: false
});