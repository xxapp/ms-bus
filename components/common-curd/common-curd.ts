import * as avalon from 'avalon2';

import { createForm } from '../ms-form/create-form';
import * as msg from '../../services/messageService';

export default avalon.component('common-curd', {
    template: '&nbsp;',
    defaults: {
        show: false,
        isEdit: false,
        list: [],
        $searchForm: createForm({ autoAsyncChange: false }),
        pagination: {
            current: 1, pageSize: 6, total: 0
        },
        $form: null,
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
                this.isEdit = false;
                this.$form.record = this.$store.initialData();
                this.show = true;
            } else if (type === 'edit') {
                this.isEdit = true;
                this.$form.record = record;
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
            this.$form.$form.validateFields().then(isAllValid => {
                if (isAllValid) {
                    if (this.isEdit) {
                        this.$store.update(this.$form.$form.record).then(result => {
                            this.fetch();
                        });
                    } else {
                        this.$store.create(this.$form.$form.record).then(result => {
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
            if (this.$form === null) {
                this.$form = avalon.define({
                    $id: this.$id + '_form',
                    $form: createForm({
                        record: this.$store.initialData(),
                        onFieldsChange(fields, record) {
                            //avalon.mix(form.record, record);
                        }
                    }),
                    record: this.$store.initialData()
                });
            }
        },
        onDispose(event) {
            delete avalon.vmodels[this.$form.$id];
        }
    }
});