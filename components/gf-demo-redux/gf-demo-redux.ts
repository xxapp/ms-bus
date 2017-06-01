import * as avalon from 'avalon2';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createForm, message } from "ane";

import { demo as demoStore } from '../../services/storeService';

export const name = 'gf-demo-redux';

function fetch(params) {
    return (dispatch, getState) => {
        const { page, pageSize, search } = getState().region;
        demoStore.fetch({
            ...search,
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
function insert(params?) {
    return (dispatch, getState) => {
        const { page, record } = getState().region;
        demoStore.create(record).then(data => {
            dispatch({ type: 'region/closeDialog' });
            dispatch(fetch({ page }));
        });
    }
}
function update(params?) {
    return (dispatch, getState) => {
        const { page, record } = getState().region;
        demoStore.update(record).then(data => {
            dispatch(fetch({ page }));
        });
    }
}
function del(params) {
    return (dispatch, getState) => {
        const { page } = getState().region;
        demoStore.remove(params).then(result => {
            if (result.code === '0') {
                message.success({
                    content: '删除成功'
                });
            }
            dispatch(fetch({ page }));
        });
    }
}

interface RegionEntity {
    region_id: string,
    region_name: string,
    region_parent_id: string,
    suites: {
        name: string
    }[]
}

interface Region {
    show: boolean,
    isEdit: boolean,
    list: RegionEntity[],
    total: number,
    page: number,
    pageSize: number,
    search: {
        region_id: string,
        region_name: {
            firstName: string
        },
        startDate: string,
        endDate: string
    },
    record: RegionEntity
}
interface All {
    region: Region
}

const region = function regionReducer(state: Region, action): Region {
    if (state === undefined) {
        state = {
            show: false,
            isEdit: false,
            list: [],
            total: 0,
            page: 1,
            pageSize: 6,
            search: null,
            record: null
        };
    }
    switch (action.type) {
        case 'region/closeDialog':
            return {
                ...state,
                show: false
            };
        case 'region/fetch':
            return {
                ...state,
                ...action.payload
            };
        case 'region/readyForAdd':
            return {
                ...state,
                isEdit: false,
                show: true
            };
        case 'region/readyForEdit':
            return {
                ...state,
                isEdit: true,
                show: true
            };
        case 'region/changeSearch':
            return {
                ...state,
                search: action.payload
            }
        case 'region/changeRecord':
            return {
                ...state,
                record: action.payload
            }
        default:
            return state;
    }
}
const store = createStore<All>(
    combineReducers<All>({
        region
    }), 
    global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

avalon.component(name, {
    template: __inline('./gf-demo-redux.html'),
    defaults: {
        show: false,
        isEdit: false,
        list: [],
        $searchForm: createForm({
            onFieldsChange(fields, record) {
                store.dispatch({ type: 'region/changeSearch', payload: record });
            }
        }),
        pagination: {
            current: 1, total: 0, pageSize: 6
        },
        pattern: /^\d+-\d+-\d+( \d+:\d+:\d+)?$/,
        search() {
            this.fetch();
        },
        fetch(params = {}) {
            store.dispatch(fetch(params));
        },
        actions(type, text, record, index) {
            if (type === 'add') {
                form.title = '新增';
                form.record = demoStore.initialData();
                store.dispatch({ type: 'region/readyForAdd' });
            } else if (type === 'edit') {
                form.title = '修改';
                form.record = record;
                store.dispatch({ type: 'region/readyForEdit' });
            } else if (type === 'delete') {
                store.dispatch(del(record.region_id));
            }
        },
        handleOk() {
            form.$form.validateFields().then(isAllValid => {
                if (isAllValid) {
                    if (this.isEdit) {
                        store.dispatch(update());
                    } else {
                        store.dispatch(insert());
                    }
                    store.dispatch({ type: 'region/closeDialog' });
                }
            })
        },
        handleCancel() {
            store.dispatch({ type: 'region/closeDialog' });
        },
        handleTableChange(pagination) {
            this.fetch({ page: pagination.current });
        },
        mapStateToVm() {
            const {
                show, isEdit, list, total, page, pageSize, search, record
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
    title: '',
    $form: createForm({
        record: demoStore.initialData(),
        onFieldsChange(fields, record) {
            //avalon.mix(form.record, record);
            store.dispatch({ type: 'region/changeRecord', payload: record });
        }
    }),
    record: demoStore.initialData()
});