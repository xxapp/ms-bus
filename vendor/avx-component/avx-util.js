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