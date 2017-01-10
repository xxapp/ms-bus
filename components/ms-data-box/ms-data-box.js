var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var bootbox = require('bootbox.js/bootbox');

var store = require('/services/storeService.js');
var msg = require('/services/messageService.js');
var cEvent = require('../../events/componentEvent');
var avxUtil = require('/vendor/avx-component/avx-util');

var pageSize = 10;
avalon.component('ms:dataBox', {
    $solt: 'content',
    content: '',
    $construct: function (componentDefinition, vmOpts, elemOpts) {
        componentDefinition.actions.add = avalon.noop;
        componentDefinition.actions.edit = avalon.noop;
        componentDefinition.actions.del = avalon.noop;
        for (var i in vmOpts.actions) {
            componentDefinition.actions[i] = vmOpts.actions[i];
        }
        delete vmOpts.actions;
        return avalon.mix(componentDefinition, vmOpts, elemOpts);
    },
    $template: '{{content|html}}',
    $replace: 0,
    $init: function (vm, el) {
        var entityStore;
        var dialogVm = avalon.vmodels[vm.dialogId];

        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        entityStore = store[vm.store];
        if (!vm.store) { avalon.error('没有配置数据源，<ms:data-box store="demo">......') }
        if (!entityStore) { avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js') }
        if (vm.dialogId && !dialogVm) { avalon.error('配置了dialogId:[' + vm.dialogId + ']，但是没找到对应的组件vm') }

        vm.actions.add = function () {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = false;
            avalon.mix(dialogVm, { record: entityStore.initialData() });
            dialogVm.show = true;
        }
        vm.actions.edit = function (record) {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = true;
            avalon.mix(dialogVm, { record: record.$model });
            dialogVm.show = true;
        }
        vm.actions.del = function (record) {
            bootbox.confirm("确定删除?", function (result) {
                if (result) {
                    entityStore.del(record[entityStore.key]).then(function (r) {
                        if (r.code == '0') {
                            vm.loadData();
                            msg.success('删除成功');
                        }
                    });
                }
            });
        }
        vm.loadData = function (cb, params) {
            vm.$query = avalon.mix(vm.$query, params);
            entityStore.list(vm.$query).then(function (result) {
                cb && cb();
                beyond.hideLoading();
                // 更新vm
                vm.list = result.list;
                vm.total = result.total;
            });
        }
        vm.pageChange = function (currentPage) {
            var page = {
                start: (currentPage - 1) * vm.pageSize,
                limit: vm.pageSize
            };
            vm.loadData(function () {
                vm.$query = avalon.mix(vm.$query, page);
            }, page);
        }
        vm.search = function () {
            var $form = $(this).closest('form');
            var bv = $form.data('bootstrapValidator');
            if (bv) {
                bv.validate();
                if (!bv.isValid()) {
                    return ;
                }
            }
            vm.$query.start = 0;
            vm.loadData(function () {
                vm.$query = avalon.mix(vm.$query, vm.searchFields.$model);
            }, vm.searchFields.$model);
        }
        if (dialogVm) {
            dialogVm.$beforePost = function () {
                if (vm.$beforePost == avalon.noop) {
                    return true;
                }
                return vm.$beforePost();
            }
            dialogVm.$post = function (package) {
                if (!dialogVm.$beforePost()) {
                    return false;
                }
                if (dialogVm.uploading) return false;
                dialogVm.uploading = true;
                if (vm.processData !== avalon.noop) {
                    vm.processData(package, function (handleResult) {
                        syncData.call(this, package, handleResult);
                    });
                } else {
                    syncData(package, avalon.noop);
                }
                return false;
            }
        }

        function syncData(package, handleResult) {
            if (!package.isEdit) {
                entityStore.insert(package.record).then(function (r) {
                    if (r.code == '0') {
                        msg.success('添加成功');
                        vm.loadData();
                        dialogVm.show = false;
                    }
                    handleResult(r);
                    setTimeout(function () { dialogVm.uploading = false; }, 1000);
                });
            } else {
                entityStore.update(package.record).then(function (r) {
                    if (r.code == '0') {
                        msg.success('修改成功');
                        vm.loadData();
                        dialogVm.show = false;
                    }
                    handleResult(r);
                    setTimeout(function () { dialogVm.uploading = false; }, 1000);
                });
            }
        }
    },
    $childReady: function (vm, e) {
    },
    $ready: function (vm) {
        vm.onInit(vm);
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    store: '',
    dialogId: '',
    list: [],
    $query: {
        start: 0,
        limit: pageSize
    },
    total: 1,
    pageSize: pageSize,
    searchFields: {},
    actions: {},
    loadData: avalon.noop,
    processData: avalon.noop,
    $beforePost: avalon.noop,
    pageChange: avalon.noop,
    search: avalon.noop
});