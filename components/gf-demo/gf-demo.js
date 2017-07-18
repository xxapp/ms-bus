import avalon from 'avalon2';

import { createForm, message } from "ane";

import { demo as demoStore } from '../../services/storeService';

export const name = 'gf-demo';

avalon.component(name, {
    template: __inline('./gf-demo.html'),
    defaults: {
        show: false,
        list: [],
        $searchForm: createForm({ autoAsyncChange: false }),
        pagination: {
            current: 1, pageSize: 6, total: 0
        },
        pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/,
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
            demoStore.fetch({...this.$searchForm.record, ...page}).then(data => {
                this.pagination.total = data.total;
                this.list = data.list;
            });
        },
        actions(type, text, record, index) {
            if (type === 'add') {
                form.isEdit = false;
                form.title = '新增';
                form.record = demoStore.initialData();
                this.show = true;
            } else if (type === 'edit') {
                form.isEdit = true;
                form.title = '修改';
                form.record = record;
                this.show = true;
            } else if (type === 'delete') {
                demoStore.remove(record.region_id).then(result => {
                    if (result.code === '0') {
                        message.success({
                            content: '删除成功'
                        });
                    }
                });
            }
        },
        handleOk() {
            form.$form.validateFields().then(isAllValid => {
                if (isAllValid) {
                    if (form.isEdit) {
                        demoStore.update(form.$form.record).then(result => {
                            this.fetch();
                        });
                    } else {
                        demoStore.create(form.$form.record).then(result => {
                            this.fetch();
                        });
                    }
                    this.show = false;
                }
            })
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.fetch();
        },
        onInit(event) {
            this.fetch();
        }
    }
});
var form = avalon.define({
    $id: 'demo_form',
    title: '',
    isEdit: false,
    $form: createForm({
        record: demoStore.initialData(),
        onFieldsChange(fields, record) {
            //avalon.mix(form.record, record);
        }
    }),
    record: demoStore.initialData()
});