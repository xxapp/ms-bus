var avalon = require('avalon');
var store = require('/services/storeService');

/**
 * 下拉框搜索组件
 * @prop label 文本框前的label标签内容
 * @prop col 搜索参数
 * @prop store 数据源，组件会自动寻找数据源中的dict方法，如果dict没定义则使用list方法
 * @prop col-key 数据中作为select的value属性值的字段，默认为id
 * @prop col-val 数据中作为select的展示值的字段，默认为name
 * 
 * @example
 *  <ms:search-item-select label="图片尺寸" col="size">
 *      <option value="1">大图</option>
 *      <option value="2">小图</option>
 *  </ms:search-item-select>
 * 
 * 
 *  <ms:search-item-select label="商品分类" store="category" col="category"></ms:search-item-select>
 */
avalon.component('ms:searchItemSelect', {
    $slot: 'content',
    content: '',
    $template: __inline('./ms-search-item-select.html'),
    $replace: 1,
    $$template: function (tmpl) {
        var vm = this;
        if (vm.store) {
            tmpl = tmpl.replace(/\{\{content\|html\}\}/g, '<option value="">-选择-</option><option ms-repeat="options" ms-attr-value="el.' + vm.colKey + '">{{el.' + vm.colVal + '}}</option>');
        }
        return tmpl;
    },
    $init: function (vm, el) {
        if (vm.store && !store[vm.store]) { avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js') }
        
        if (vm.store) {
            var dict = store[vm.store].dict || store[vm.store].list;
            dict({
                limit: 99999
            }).then(function (result) {
                vm.options = result.list;
            });
        }
        vm.$watch('val', function (newV) {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery[vm.col] = newV;
        });
    },
    store: '',
    val: '',
    col: '',
    colKey: 'id',
    colVal: 'name',
    options: [],
    $containerVmId: ''
});