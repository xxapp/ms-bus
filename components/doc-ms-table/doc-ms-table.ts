import * as avalon from 'avalon2';
import * as beyond from '../../vendor/beyond';
import * as bootbox from 'bootbox';

import ajax from '../../services/ajaxService';
import * as notification from '../ms-notification/ms-notification';

import '../../components/ms-table';
import '../../components/ms-table-header';

export const name = 'doc-ms-table';

avalon.component(name, {
    template: __inline('./doc-ms-table.html'),
    defaults: {
        list: avalon.range(29).map(n => ({
            id: n, name: `老狼${n}`, address: '深山', province: '老林'
        })),
        remoteList: [],
        pagination: {
            pageSize: 6, total: 0
        },
        fetch(params = {}) {
            $.ajax({
                url: '/api/demo',
                method: 'get',
                data: {
                    ...params
                },
                type: 'json'
            }).then(data => {
                this.pagination.total = data.total;
                data.rows[0].region_parent_id = Date.now();
                this.remoteList = data.rows;
            });
        },
        handleTableChange(pagination) {
            if (this.pagination.hasOwnProperty('current')) {
                this.pagination.current = pagination.current;
            }
            this.fetch({
                start: pagination.pageSize * (pagination.current - 1),
                limit: pagination.pageSize
            });
        },
        action(type, text, record, index) {
            if (type == 'delete') {
                this.list.removeAll(el => el.id == record.id );
                notification.success({
                    message: '删除成功'
                });
            }
        },
        handleSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
        },
        handleSelectAll(selected, selectedRows) {
            console.log(selected, selectedRows);
        },
        handleSelectionChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        handleChange(e) {

        },
        onInit(event) {
            this.fetch();
        }
    }
});