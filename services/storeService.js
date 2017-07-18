import ajax from './ajaxService';
import { getKeyPath } from './menuService';

export const demo = {
    key: 'region_id',
    initialData: function () {
        return {
            region_enable: 0,
            region_id: '',
            region_name: '',
            region_parent_id: '',
            region_type: '',
            suites: [{
                name: ''
            }]
        };
    },
    fetch: function (params) {
        return ajax({
            url: '/api/demo',
            type: 'get',
            data: params
        });
    },
    create: function (params) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: params
        });
    },
    remove: function (id) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

export const file = {
    insert: function (params) {
        $.ajaxFileUpload({
            url: '/api/file/uploadFile',
            secureuri: false,
            fileElementId: params.fileElementId,
            dataType: 'json',
            success: params.success
        });
    }
};

export const github = {
    limit: 30,
    repository: function (params) {
        return ajax({
            url: "/search/repositories",
            type: 'get',
            data: params
        });
    },
    processRequest: function (params) {
        return {
            q: params.query,
            start: (params.page - 1) * this.limit,
            limit: this.limit
        };
    },
    processResponse: function (data) {
        data = data.data;
        data.rows = data.items;
        data.total = data.total_count;
        return data;
    }
};

export const menu = {
    selectedKeys$: Observable(),
    openKeys$: Observable()
};
menu.selectedKeys$.subscribe(v => {
    v[0] && getKeyPath(v[0]).then(result => {
        menu.openKeys$.onNext(result.map(item => item.key));
        breadcrumb.list$.onNext(result.reverse());
    });
});

export const breadcrumb = {
    list$: Observable()
};

function Observable() {
    return {
        onNextCbList: [],
        subscribe(onNext) {
            this.onNextCbList.push(onNext);
        },
        onNext(value) {
            this.onNextCbList.forEach(cb => {
                if (typeof cb === 'function') {
                    cb(value);
                }
            });
        }
    };
}