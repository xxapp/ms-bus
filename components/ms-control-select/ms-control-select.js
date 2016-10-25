var avalon = require('avalon');
var store = require('/services/storeService');

/**
 * 文本输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 如果有绑定的数据行，此属性值指的是数据的字段名称
 * @prop duplex 自定义的绑定数据，如果同时存在则会覆盖col
 * @prop store 数据源，组件会自动寻找数据源中的dict方法，如果dict没定义则使用list方法
 * @prop col-key 数据中作为select的value属性值的字段，默认为id
 * @prop col-val 数据中作为select的展示值的字段，默认为name
 * 
 * @example
 *  <ms:control-select label="图片尺寸">
 *      <option value="1">大图</option>
 *      <option value="2">小图</option>
 *  </ms:control-select>
 * 
 * 
 *  <ms:control-select label="商品分类" store="category"></ms:control-select>
 */
avalon.component('ms:controlSelect', {
    $slot: 'content',
    content: '',
    $template: __inline('./ms-control-select.html'),
    $replace: 1,
    $$template: function (tmpl) {
        var vm = this;
        if (vm.store) {
            tmpl = tmpl.replace(/\{\{content\|html\}\}/g, '<option ms-repeat="options" ms-attr-value="el.' + vm.colKey + '">{{el.' + vm.colVal + '}}</option>');
        }
        
        if (this.duplex) {
            // 如果配置了duplex属性，则直接使用duplex的属性值绑定控件
            tmpl =  tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.duplex + '"');
        }
        if (this.col) {
            // 否则用col的配置，使用record[col]去绑定控件
            tmpl =  tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="record[\'' + this.col.replace('.', '\'][\'') + '\']"');
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
    },
    label: '',
    col: '',
    duplex: '',
    store: '',
    colKey: 'id',
    colVal: 'name',
    options: []
});