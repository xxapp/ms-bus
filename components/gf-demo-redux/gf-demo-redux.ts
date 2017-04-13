import * as avalon from 'avalon2';
import { createStore } from 'redux';
import * as beyond from '../../vendor/beyond';
import { createForm } from "../ms-form/create-form";

import '/vendor/avx-component';

import { demo as demoStore } from '../../services/storeService';
import * as msg from '../../services/messageService';

export const name = 'gf-demo-redux';

const store = createStore(function (state, action) {
    if (state === undefined) {
        state = {
            show: false,
            isEdit: false,
            list: [],
            total: 0,
            page: 1
        };
    }

    return state;
});

avalon.component(name, {
    template: __inline('./gf-demo-redux.html'),
    defaults: {
        show: false,
        isEdit: false,
        list: [],
        $searchForm: createForm(),
        pagination: {
            current: 1, total: 0, pageSize: 6
        },
        pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/,
        search() {
            this.fetch(this.$searchForm.record);
        },
        fetch(params = {}) {
            demoStore.list(params).then(data => {
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
                        demoStore.update(form.$form.record);
                    } else {
                        demoStore.insert(form.$form.record);
                    }
                    this.show = false;
                }
            })
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.fetch({
                start: pagination.pageSize * (pagination.current - 1),
                limit: pagination.pageSize
            });
        },
        onInit(event) {
            const {
                show, isEdit, list, total, page
            } = store.getState();
            this.list = list;
            this.pagination.total = total;
            this.pagination.current = page;
            this.isEdit = isEdit;
            this.show = show;

            this.fetch({
                start: this.pagination.pageSize * (this.pagination.current - 1),
                limit: this.pagination.pageSize
            });
        },
        onReady(event) {
        }
    }
});
const form = avalon.define({
    $id: 'demo_redux_form',
    $form: createForm({
        record: demoStore.initialData(),
        onFieldsChange(fields, record) {
            //avalon.mix(form.record, record);
        }
    }),
    record: demoStore.initialData()
});