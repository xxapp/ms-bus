import * as avalon from 'avalon2';

import { createForm } from '../ms-form/create-form';
import * as msg from '../../services/messageService';

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
        actions(type, text, record, index) {
            if (type === 'add') {
                this.$dialogs.main.isEdit = false;
                this.$dialogs.main.title = '新增';
                this.$dialogs.main.record = this.$store.initialData();
                this.show = true;
            } else if (type === 'edit') {
                this.$dialogs.main.isEdit = true;
                this.$dialogs.main.title = '修改';
                this.$dialogs.main.record = record;
                this.show = true;
            } else if (type === 'delete') {
                this.$store.remove(record.region_id).then(result => {
                    if (result.code === '0') {
                        msg.success('删除成功');
                    }
                });
            }
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
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.fetch();
        },
        onInit(event) {
            this.fetch();
            if (this.$dialogs.main === null) {
                this.$dialogs.main = avalon.define({
                    $id: this.$id + '_dialog_main',
                    title: '新增',
                    isEdit: false,
                    $form: createForm({
                        record: this.$store.initialData(),
                        onFieldsChange(fields, record) {
                            //avalon.mix(form.record, record);
                        }
                    }),
                    record: this.$store.initialData(),
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
        onDispose(event) {
            Object.keys(this.$dialogs).map(name => {
                let dialog = this.$dialogs[name];
                dialog && delete avalon.vmodels[dialog.$id];
            });
        }
    }
});