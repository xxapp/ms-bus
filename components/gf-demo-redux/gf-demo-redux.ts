import * as avalon from 'avalon2';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as beyond from '../../vendor/beyond';
import { createForm } from "../ms-form/create-form";

import '/vendor/avx-component';

import { demo as demoStore } from '../../services/storeService';
import * as msg from '../../services/messageService';

export const name = 'gf-demo-redux';

function fetch(params) {
    return (dispatch, getState) => {
        const { page, pageSize } = getState().region;
        demoStore.list({
            start: pageSize * (params.page - 1),
            limit: pageSize
        }).then(data => {
            dispatch({
                type: 'region/fetch',
                payload: {
                    list: data.list,
                    total: data.total,
                    page: params.page || page
                }
            });
        });
    }
}
function insert(params) {
    return (dispatch, getState) => {
        const { page } = getState().region;
        demoStore.insert(params).then(data => {
            dispatch(fetch({ page }));
        });
    }
}
function update(params) {
    return (dispatch, getState) => {
        const { page } = getState().region;
        demoStore.update(params).then(data => {
            dispatch(fetch({ page }));
        });
    }
}
function del(params) {
    return (dispatch, getState) => {
        const { page } = getState().region;
        demoStore.del(params).then(result => {
            if (result.code === '0') {
                msg.success('删除成功');
            }
            dispatch(fetch({ page }));
        });
    }
}

const region = function regionReducer(state, action) {
    if (state === undefined) {
        state = {
            show: false,
            isEdit: false,
            list: [],
            total: 0,
            page: 1,
            pageSize: 6
        };
    }
    switch (action.type) {
        case 'opendialog': 
            state = {
                ...state,
                show: true
            };
            break;
        case 'region/fetch':
            state = {
                ...state,
                ...action.payload
            };
            break;
        case 'next':
            state = {
                ...state,
                page: 2
            };
            break;
    }

    return state;
}
const store = createStore(combineReducers({
    region, 
}), applyMiddleware(thunk));
window.mystore = store;

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
            store.dispatch(fetch(params));
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
                store.dispatch(del(record.region_id));
            }
        },
        handleOk() {
            form.$form.validateFields().then(isAllValid => {
                if (isAllValid) {
                    if (this.isEdit) {
                        store.dispatch(insert(form.$form.record));
                    } else {
                        store.dispatch(insert(form.$form.record));
                    }
                    this.show = false;
                }
            })
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.fetch({ page: pagination.current });
        },
        mapStateToVm() {
            const {
                show, isEdit, list, total, page, pageSize
            } = store.getState().region;
            this.list = list;
            this.pagination.total = total;
            this.pagination.current = page;
            this.pagination.pageSize = pageSize;
            this.isEdit = isEdit;
            this.show = show;
        },
        onInit(event) {
            this.mapStateToVm();
            store.subscribe(() => {
                this.mapStateToVm();
            });
            this.fetch();
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