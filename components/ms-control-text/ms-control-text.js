var avalon = require('avalon2');

/**
 * 文本输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 指定name属性值
 * @prop value 组件值
 * 
 * @example
 * ``` html
 * <ms-control-text :widget="{label: '标题1', col: 'name', value: @title1}"></ms-control-text>
 * ```
 */
avalon.component('ms-control-text', {
    template: __inline('./ms-control-text.html'),
    defaults: {
        label: '',
        col: '123',
        value: ''
    }
});