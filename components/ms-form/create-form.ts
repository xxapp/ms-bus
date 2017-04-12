import * as avalon from 'avalon2';
import * as Schema from 'async-validator';

export function createForm(options?) {
    return new Form(options);
}

const defaultOptions = {
    record: {},
    fields: {},
    onFieldsChange: avalon.noop,
    all: {}
};

function Form(options) {
    avalon.mix(this, defaultOptions, options)
}

Form.prototype.setFieldsValue = function (fields) {
    Object.keys(fields).forEach((name) => {
        const field = fields[name];

        setValue(this.record, name, field.value);

        !field.denyValidate && this.fields[name] && this.validateField(name, this.fields[name]).then(result => {
            if (result.isOk) {
                this.trigger('error' + result.name, []);
            } else {
                this.trigger('error' + result.name, [{
                    message: result.message
                }]);
            }
        });
    });
    this.onFieldsChange(fields, this.record);
}

Form.prototype.addFields = function (fields) {
    Object.keys(fields).forEach(name => {
        this.fields[name] = fields[name];
    });
}

Form.prototype.on = function (type: string, listener) {
    (this.all[type] || (this.all[type] = [])).push(listener);
}

Form.prototype.trigger = function (type: string, payload) {
    (this.all[type] || []).map(handler => { handler(payload) });
}

Form.prototype.validateField = async function (fieldName, field) {
    const rules = field.rules;
    const value = getValue(this.record, fieldName);
    let result: any = { isOk: true, name: fieldName };
    if (!rules) return result;
    const validator = new Schema({
        [fieldName]: rules
    });
    result = await new Promise((resolve, reject) => {
        validator.validate({ [fieldName]: value }, (errors, fields) => {
            if (errors) {
                resolve({
                    isOk: false, name: fieldName, message: errors[0].message
                });
            } else {
                resolve({
                    isOk: true, name: fieldName
                });
            }
        });
    });
    return result;
}

Form.prototype.validateFields = function (fields = this.fields) {
    const flatRecord = {}, ruleMap = {};
    Object.keys(fields).map(name => {
        ruleMap[name] = fields[name].rules;
        flatRecord[name] = getValue(this.record, name);
    });
    const validator = new Schema(ruleMap);
    return new Promise((resolve, reject) => {
        validator.validate(flatRecord, (errors, fields) => {
            const errorFields = Object.keys(fields);
            let isAllValid = true;
            Object.keys(this.fields).map(name => {
                if (~errorFields.indexOf(name)) {
                    isAllValid = false;
                    this.trigger('error' + name, fields[name]);
                } else {
                    this.trigger('error' + name, []);
                }
            });
            resolve(isAllValid);
        })
    });
}

Form.prototype.resetFields = function (fields = this.fields) {
    this.record = {};
    this.trigger('reset', fields);
}

/**
 * 根据表达式构给对象赋值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 * @param {*} val 值
 */
function setValue(record, expr, val) {
    const rSplit = /\.|\].|\[|\]/;
    let temp = record, prop;
    expr = expr.split(rSplit).filter(prop => !!prop);
    const valType = Object.prototype.toString.call(val);
    let mirrorVal;
    if (valType == '[object Array]') {
        mirrorVal = avalon.mix(true, {}, { t: val }).t;
    } else if (valType == '[object Object]') {
        mirrorVal = avalon.mix(true, {}, val);
    } else {
        mirrorVal = val;
    }

    while (prop = expr.shift()) {
        if (expr.length === 0) {
            temp[prop] = mirrorVal;
        } else {
            temp = temp[prop] = temp[prop] || {};
        }
    }
}

/**
 * 根据表达式构从对象取值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 */
function getValue(record, expr) {
    const rSplit = /\.|\].|\[|\]/;
    let temp = record, prop;
    expr = expr.split(rSplit).filter(prop => !!prop);
    while ((prop = expr.shift()) && temp) {
        temp = temp[prop];
    }
    return temp;
}