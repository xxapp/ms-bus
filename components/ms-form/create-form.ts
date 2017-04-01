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
        const props = name.split('.');
        const field = fields[name];

        if (props.length === 1) {
            // 没有复杂的路径，简单处理
            setValue(this.record, props[0], field.value, field.key);
        } else {
            props.forEach((prop) => {
                setValue(this.record, prop, field.value, field.key);
            });
        }
        this.fields[name] && this.validateField(name, this.fields[name]).then(result => {
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

/**
 * 根据表达式构给对象赋值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 * @param {*} val 值
 * @param {Number|String} key 额外的键值，一般用于数组赋值
 */
function setValue(record, expr, val, key = 0) {
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

    if (matches) {
        const prop = matches[1];
        record[prop] = record[prop] || [];
        record[prop][key] = val;
    } else {
        const prop = expr;
        record[prop] = record[prop] || {};
        record[prop] = val;
    }
}

/**
 * 根据表达式构从对象取值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 * @param {Number|String} key 额外的键值，一般用于数组赋值，默认为0
 */
function getValue(record, expr, key = 0) {
    const rSplit = /\.|(\[\])\.|(\[\])/;
    expr = expr.split(rSplit).filter(prop => !!prop);
    if (expr.length === 1) {
        return record[expr[0]];
    } else if (expr[1] === '[]') {
        return record[expr[0]][key];
    }
    return getValueFromSimpleProperty(record, expr, key);
}

/**
 * 根据表达式递归获取简单属性的值
 * @param {*} record 数据对象
 * @param {string[]} expr 对象属性路径表达式数组
 * @param {Number|String} key 额外的键值，一般用于数组赋值，默认为0
 */
function getValueFromSimpleProperty(record, expr, key) {
    let result;
    if (expr[0] == '[]') {
        result = record[key];
    } else {
        result = record[expr[0]];
    }
    if (expr.length === 1) {
        return result;
    } else {
        expr.shift();
        return getValueFromSimpleProperty(result, expr, key);
    }
}