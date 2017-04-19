import * as avalon from 'avalon2';
import * as beyond from '../../vendor/beyond';
import { createForm } from "../ms-form/create-form";

import '/vendor/avx-component';

import { demo as demoStore } from '../../services/storeService';
import * as msg from '../../services/messageService';

export const name = 'gf-demo';

avalon.component(name, {
    template: __inline('./gf-demo.html'),
    defaults: {
        show: false,
        isEdit: false,
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
            demoStore.list({...this.$searchForm.record, ...page}).then(data => {
                this.pagination.total = data.total;
                this.list = data.list;
            });
        },
        actions(type, text, record, index) {
            if (type === 'add') {
                this.isEdit = false;
                form.record = demoStore.initialData();
                this.show = true;
            } else if (type === 'edit') {
                this.isEdit = true;
                form.record = record;
                this.show = true;
            } else if (type === 'delete') {
                demoStore.del(record.region_id).then(result => {
                    if (result.code === '0') {
                        msg.success('删除成功');
                    }
                });
            }
        },
        handleOk() {
            form.$form.validateFields().then(isAllValid => {
                if (isAllValid) {
                    if (this.isEdit) {
                        demoStore.update(form.$form.record).then(result => {
                            this.fetch();
                        });
                    } else {
                        demoStore.insert(form.$form.record).then(result => {
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
    $form: createForm({
        record: demoStore.initialData(),
        onFieldsChange(fields, record) {
            //avalon.mix(form.record, record);
        }
    }),
    record: demoStore.initialData()
});