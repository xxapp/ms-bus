import * as avalon from 'avalon2';
import * as Schema from 'async-validator';

export function createForm(options?) {
    return new Form(options);
}

const defaultOptions = {
    record: {},
    fields: {},
    onFieldsChange: avalon.noop
};

function Form(options) {
    avalon.mix(this, defaultOptions, options)
}

Form.prototype.setFieldsValue = function (fields) {
    Object.keys(fields).forEach((name) => {
        const field = fields[name];

        setValue(this.record, name, field.value);

        this.fields[name] && this.validateField(name, this.fields[name]).then(result => {
            console.log(result.name, this.fields);
            if (result.isOk) {
                this.trigger('error', result.name, []);
            } else {
                this.trigger('error', result.name, [{
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

Form.prototype.on = function (type: string, fieldName: string|Function, listener = fieldName) {
    const fields = typeof fieldName == 'function' ? this.fields : {[fieldName]:this.fields[fieldName]};
    Object.keys(fields).forEach(name => {
        let listeners = fields[name]['on' + type];
        if (listeners) {
            listeners.push(listener);
        } else {
            fields[name]['on' + type] = [listener];
        }
    });
}

Form.prototype.trigger = function (type: string, fieldName: any, payload = fieldName) {
    const types = arguments.length > 2 ? 
        [this.fields[fieldName]['on' + type]] : 
        Object.keys(this.fields).map(name => this.fields[name]['on' + type]);
    types.forEach(fns => {
        fns && fns.forEach(fn => fn(payload));
    });
}

Form.prototype.validateField = async function (fieldName, field, callback) {
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

Form.prototype.validateFields = async function () {

}

Form.prototype.validateAll = function () {
    console.log(this.fields);
    console.log(this.record);
    //this.validateFields(this.fields);
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
    while (prop = expr.shift()) {
        temp = temp[prop];
    }
    return temp;
}