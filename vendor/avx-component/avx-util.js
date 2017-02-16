var avalon = require('avalon');
var $ = require('jquery');

/**
 * 判断父组件 vm 的 $refs 链上有没有名为 childVmId 的组件
 */
exports.containChild = function (vm, childVmId) {
    if (!vm.$refs) {
        return false
    }
    else if (vm.$refs.hasOwnProperty(childVmId)) {
        return true;
    } else {
        for (var i in vm.$refs) {
            if (vm.$refs.hasOwnProperty(i)) {
                if (this.containChild(vm.$refs[i], childVmId)) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 给声明子组件的元素加标记，用于那些不能自动把子组件添加到父组件 $refs 对象的情况，让子组件自己把自己添加到父组件的 $refs 中去
 * @param {Component} vm 父组件 VM
 * @param {Element} el 声明子组件的元素
 */
exports.markPick = function (vm, el) {
    $(el).attr('parent-vm-id', vm.$id);
}

/**
 * 判断如果父组件的 $refs 对象中不存在自己，则把自己加到父组件的 $refs 中去
 * @param {Component} vm 子组件 VM
 * @param {Element} el 声明子组件的元素
 * @return {String} 父组件 VM 的 $id
 */
exports.pickToRefs = function (vm, el) {
    var parentVmId = $(el).attr('parent-vm-id');
    var parentVm = avalon.vmodels[parentVmId];
    if (parentVm && !parentVm.$refs.hasOwnProperty(vm.$id)) {
        parentVm.$refs[vm.$id] = vm;
        return parentVmId;
    }
    return '';
}

/**
 * 把子组件 VM 从父组件的 $refs 中移除
 */
exports.removeFromRefs = function (vm, el) {
    var parentVmId = vm.$parentVmId;
    var parentVm = avalon.vmodels[parentVmId];
    if (parentVm && parentVm.$refs.hasOwnProperty(vm.$id)) {
        delete parentVm.$refs[vm.$id];
    }
}

/**
 * 实现组件动态参数，即传入组件且配置在 $dynamicProp 中的参数，如果在外面被修改，则将传入组件内的参数同时修改
 * @param {Component} vm 组件 VM
 */
exports.enableDynamicProp = function (vm, el) {
    var vmChain = el.getAttribute('data-vm-chain');
    if (vmChain === null) {
        return ;
    }
    var vmIds = vmChain.split(',');
    var vmodels = avalon.vmodels, ancestorVm;
    var propCount = vm.$dynamicProp.length;
    // 按照vm链向上查找
    for (var i = 0, id; id = vmIds[i]; i++) {
        if (vmodels.hasOwnProperty(id)) {
            ancestorVm = vmodels[id];
            // 对比每个定义在$dynamicProp中的属性，如果在此vm中，则添加watch来更新内部属性值
            for (var innerProp in vm.$dynamicProp) {
                var innerPropObj = vm.$dynamicProp[innerProp];
                var prop = el.getAttribute('data-prop-' + innerProp);
                if (!prop) { continue; }
                var value = excuteProp(ancestorVm, prop);
                if (value !== undefined && value !== null && !innerPropObj.matched) {
                    var source = {};
                    source[camelize(innerProp)] = value;
                    avalon.mix(vm, source);
                    // 根据不同的类型，添加不同的watch
                    (function (ancestorVm, prop, innerProp, innerPropObj) {
                        var watchPath = prop, simple = false;
                        switch (innerPropObj.type) {
                            case 'Array': watchPath = prop + '.length';  break;
                            case 'Object': watchPath = prop + '.*'; break;
                            case 'Boolean':
                            case 'Number':
                            case 'String': watchPath = prop; simple = true; break;
                            case 'Function': break;
                        }
                        if (innerPropObj.type != 'Function' && prop.indexOf('$') != 0) {
                            ancestorVm.$watch(watchPath, function (v, oldV) {
                                var source = {};
                                if (simple) {
                                    source[camelize(innerProp)] = excuteProp(ancestorVm, prop);
                                } else {
                                    source[camelize(innerProp)] = excuteProp(ancestorVm, prop).$model;
                                }
                                avalon.mix(vm, source);
                            });
                            innerPropObj.setter = function (val) {
                                excuteProp(ancestorVm, prop, val);
                            }
                        } else if (innerProp == 'config') {
                            avalon.mix(vm, excuteProp(ancestorVm, prop));
                        } else if (innerPropObj.type == 'Function') {
                            // 如果是Function类型的参数，改变此函数内部this的指向后赋值
                            var source = {};
                            source[camelize(innerProp)] = function () {
                                return excuteProp(ancestorVm, prop).apply(avalon.isWindow(this) ? ancestorVm : this, Array.prototype.slice.call(arguments));
                            };
                            avalon.mix(vm, source);
                        } else {
                            // 如果传入参数的外部引用属性名以'$'开头，则不去监控，直接赋值
                            var source = {};
                            source[camelize(innerProp)] = excuteProp(ancestorVm, prop);
                            avalon.mix(vm, source);
                        }
                        if (innerPropObj.type == 'Array') {
                            // 应对外部vm属性重新赋值的情况
                            ancestorVm.$watch('*', function (v, oldV, path) {
                                if (path === prop) {
                                    var source = {};
                                    if (simple) {
                                        source[camelize(innerProp)] = excuteProp(ancestorVm, prop);
                                    } else {
                                        source[camelize(innerProp)] = excuteProp(ancestorVm, prop).$model;
                                    }
                                    avalon.mix(vm, source);
                                }
                                //unwatch();
                            });
                        }
                    })(ancestorVm, prop, innerProp, innerPropObj);
                    innerPropObj.matched = true;
                }
            }
            // 如果全部找到，则不在向上查找
            if (propCount === 0) {
                break;
            }
        }
    }
}

/**
 * 将字符串转为驼峰风格
 */
function camelize(str) {
    return str.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase()
    });
}

/**
 * 根据表达式获取/设置对象的属性值
 */
function excuteProp(obj, expr, val) {
    // 'record.gender[0].name[test].kk[bar]' --> ["record", "gender", "0", "name", "test", "bar", ""]
    var rDivider = /\.|\]\.|\]\[|\]|\[/;
    // '"bar"' --> 'bar'
    var rNormalize = /^(\'|\")|(\'|\")$/g;

    var result = obj, parent;
    var propList = expr.split(rDivider);

    if (!result) { return result; }
    for (var i = propList.length - 1; i >= 0; i--) {
        var item = propList[i].replace(rNormalize, '');
        if (!item) {
            propList.splice(i, i + 1);
        }
    }
    for (var i = 0, len = propList.length; i < len; i++) {
        var item = propList[i].replace(rNormalize, '');
        if (!item) { continue; }
        if (result[item] === undefined || result[item] === null) {
            return result[item];
        } else {
            if (val && i == len - 1) {
                if (result[item].toString() !== val.toString()) {
                    // 阻止循环调用
                    result[item] = val;
                }
            }
            result = result[item];
        }
    }

    return result;
}

exports.generateID = function (prefix) {
    prefix = prefix || "avx"
    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
}