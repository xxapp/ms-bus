import * as avalon from 'avalon2';

export function createForm(options?) {
    return new Form(options);
}

const defaultOptions = {
    record: null,
    onFieldsChange: avalon.noop
};

function Form(options) {
    avalon.mix(this, defaultOptions, options)
}

Form.prototype.setFieldsValue = function (fields) {
    Object.keys(fields).forEach((name) => {
        const props = name.split('.');
        const field = fields[name];

        if (props.length === 1) {
            // 没有复杂的路径，简单处理
            setValue(this, props[0], field.value, field.key);
        } else {
            props.forEach((prop) => {
                setValue(this.record, prop, field.value, field.key);
            });
        }
    });
    this.onFieldsChange(fields, this.record);
}

/**
 * 根据表达式构给对象赋值
 * @param {Form} obj Form 对象
 * @param {String} expr 对象属性路径表达式
 * @param {*} val 值
 * @param {Number|String} key 额外的键值，一般用于数组赋值
 */
function setValue(form, expr, val, key) {
    const rArray = /(.*)\[\]$/;
    const valType = Object.prototype.toString.call(val);
    let mirrorVal;
    if (valType == '[object Array]') {
        mirrorVal = avalon.mix(true, {}, { t: val }).t;
    } else if (valType == '[object Object]') {
        mirrorVal = avalon.mix(true, {}, val);
    } else {
        mirrorVal = val;
    }

    const matches = expr.match(rArray);

    const obj = form.record = form.record || {};
    if (matches) {
        const prop = matches[1];
        obj[prop] = obj[prop] || [];
        obj[prop][key] = val;
    } else {
        const prop = expr;
        obj[prop] = obj[prop] || {};
        obj[prop] = val;
    }
}