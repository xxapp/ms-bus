var avalon = require('avalon2');

function createForm(options) {
    return new Form(options);
}

var defaultOptions = {
    record: null,
    onFieldsChange: avalon.noop
};

function Form(options) {
    avalon.mix(this, defaultOptions, options)
}

Form.prototype.setFieldsValue = function (fields) {
    var self = this;
    Object.keys(fields).forEach(function (name) {
        var props = name.split('.');
        var field = fields[name];

        if (props.length === 1) {
            // 没有复杂的路径，简单处理
            setValue(self, props[0], field.value, field.key);
        } else {
            props.forEach(function (prop) {
                setValue(self.record, prop, field.value, field.key);
            });
        }
    });
    self.onFieldsChange(fields);
}

/**
 * 根据表达式构给对象赋值
 * @param {Form} obj Form 对象
 * @param {String} expr 对象属性路径表达式
 * @param {*} val 值
 * @param {Number|String} key 额外的键值，一般用于数组赋值
 */
function setValue(form, expr, val, key) {
    var rArray = /(.*)\[\]$/;
    var mirrorVal, valType = Object.prototype.toString.call(val);
    if (valType == '[object Array]') {
        mirrorVal = avalon.mix(true, {}, { t: val }).t;
    } else if (valType == '[object Object]') {
        mirrorVal = avalon.mix(true, {}, val);
    } else {
        mirrorVal = val;
    }

    var matches = expr.match(rArray);

    var obj = form.record = form.record || {};
    if (matches) {
        var prop = matches[1];
        obj[prop] = obj[prop] || [];
        obj[prop][key] = val;
    } else {
        var prop = expr;
        obj[prop] = obj[prop] || {};
        obj[prop] = val;
    }
}

module.exports = createForm;