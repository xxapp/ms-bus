import * as avalon from 'avalon2';

import { createForm } from '../ms-form/create-form';
import * as notification from '../ms-notification/ms-notification';
import message from '../ms-message';

export default avalon.component('common-curd', {
    template: '&nbsp;',
    defaults: {
        show: false,
        list: [],
        $searchForm: createForm({ autoAsyncChange: false }),
        pagination: {
            current: 1, pageSize: 6, total: 0
        },
        $dialogs: {
            main: null
        },
        search() {
            this.$searchForm.validateFields().then(isAllValid => {
                if (isAllValid) {
                    this.fetch();
                }
            });
        },
        fetch() {
            const page = {
                start: this.pagination.pageSize * (this.pagination.current - 1),
                limit: this.pagination.pageSize
            };
            this.$store.fetch({...this.$searchForm.record, ...page}).then(data => {
                this.pagination.total = data.total;
                this.list = data.list;
            });
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.fetch();
        },
        handle: {},
        _handle: {
            add(text, record, index) {
                this.$dialogs.main.beginCreate(this.$store.initialData());
                this.show = true;
            },
            edit(text, record, index) {
                this.$dialogs.main.beginUpdate(record);
                this.show = true;
            },
            del(text, record, index) {
                this.$store.remove(record.region_id).then(result => {
                    if (result.code === '0') {
                        message.success({
                            content: '删除成功'
                        });
                    }
                });
            },
        },
        actions(type, ...args) {
            this.handle[type] && this.handle[type].apply(this, args);
        },
        handleOk() {
            this.$dialogs.main.submit().then(([isEdit, record]) => {
                if (typeof isEdit === 'boolean') {
                    this.show = false;
                    if (isEdit) {
                        return this.$store.update(record);
                    } else {
                        return this.$store.create(record);
                    }
                }
            }).then(result => {
                if (result !== undefined && result.code === '0') {
                    this.fetch();
                }
            });
        },
        _initMainDialog() {
            if (this.$dialogs.main === null) {
                this.$dialogs.main = avalon.define({
                    $id: this.$id + '_dialog_main',
                    title: '新增',
                    isEdit: false,
                    $form: createForm({
                        record: this.$store.initialData()
                    }),
                    record: this.$store.initialData(),
                    beginCreate(record) {
                        this.isEdit = false;
                        this.title = '新增';
                        this.record = record;
                    },
                    beginUpdate(record) {
                        this.isEdit = true;
                        this.title = '修改';
                        this.record = record;
                    },
                    submit() {
                        return this.$form.validateFields().then(isAllValid => {
                            if (isAllValid) {
                                return [this.isEdit, this.$form.record];
                            }
                        })
                    }
                });
            }
        },
        _disposeDialogs() {
            Object.keys(this.$dialogs).map(name => {
                let dialog = this.$dialogs[name];
                dialog && delete avalon.vmodels[dialog.$id];
            });
        },
        onInit(event) {
            this.fetch();
            this._initMainDialog();
            this.handle = avalon.mix(this._handle, this.handle);
        },
        onDispose(event) {
            this._disposeDialogs();
        }
    }
});