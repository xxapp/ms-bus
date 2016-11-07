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
    // TODO: 目前只实现了对数组的支持，还需要其它监控类型
    var vmIds = vm.vmChain.split(',');
    var vmodels = avalon.vmodels, ancestorVm;
    var propCount = vm.$dynamicProp.length;
    // 按照vm链向上查找
    for (var i = 0, id; id = vmIds[i]; i++) {
        if (vmodels[id]) {
            ancestorVm = vmodels[id];
            // 对比每个定义在$dynamicProp中的属性，如果在此vm中，则添加watch来更新内部属性值
            for (var j = 0, innerPropObj; innerPropObj = vm.$dynamicProp[j]; j++) {
                var innerProp = innerPropObj.name;
                var prop = vm[camelize('prop-' + innerProp)];
                if (ancestorVm[prop]) {
                    var source = {};
                    source[innerProp] = ancestorVm[prop];
                    avalon.mix(vm, source);
                    (function (ancestorVm, prop, innerPropObj) {
                        var watchPath = prop + '.length';
                        switch (innerPropObj.type) {
                            case 'Array': watchPath  = prop + '.length'; break;
                            case 'Object': watchPath  = prop + '.*'; break;
                        }
                        ancestorVm.$watch(watchPath, function (v, oldV) {
                            var source = {};
                            source[innerPropObj.name] = ancestorVm[prop];
                            avalon.mix(vm, source);
                        });
                    })(ancestorVm, prop, innerPropObj);
                    propCount--;
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