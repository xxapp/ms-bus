var ajax = require('/services/ajaxService.js');

exports.demo = {
    key: 'region_id',
    initialData: function () {
        return {
            region_enable: 0,
            region_id: '',
            region_name: '',
            region_parent_id: '',
            region_type: ''
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/demo',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
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
    del: function (id) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

exports.category = {
    key: 'id',
    initialData: function () {
        return {
            "id": 0,
            "name": "",
            "parent_catalog": 0,
            "type": "",
            "sub_type": ""
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/category/list',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
        return ajax({
            url: '/api/category/insert',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/category/update',
            type: 'post',
            data: params
        });
    },
    del: function (id) {
        return ajax({
            url: '/api/category/delete',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

exports.supplier = {
    key: 'id',
    initialData: function () {
        return {
            "id": 0,
            "name": "",
            "info": null
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/supplier/list',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
        return ajax({
            url: '/api/supplier/insert',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/supplier/update',
            type: 'post',
            data: params
        });
    },
    del: function (id) {
        return ajax({
            url: '/api/supplier/delete',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

exports.item = {
    key: 'id',
    initialData: function () {
        return {
            "id": 0,
            "name": "",
            "type": "",
            "sub_type": "",
            "price": 0,
            "tag": {
                "thumb": "",
                "images": [
                    "",
                ],
                "catalog": "",
                "description": "",
                "large_thumb": ""
            },
            "created": "",
            "state": "",
            "inputed": "",
            "input_employee": 0,
            "removed": null,
            "view_count": 0,
            "real_view_count": 0,
            "store_count": 0,
            "supplier": 0,
            "channel": null,
            "buy_count": 0,
            "real_buy_count": 0,
            "catalog": 0
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/item/list',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
        return ajax({
            url: '/api/item/insert',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/item/update',
            type: 'post',
            data: params
        });
    },
    del: function (id) {
        return ajax({
            url: '/api/item/delete',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

exports.channel = {
    key: 'id',
    initialData: function () {
        return {
            "id": 0,
            "name": "",
            "type": "",
            "sub_type": "",
            "price": 0,
            "tag": null,
            "created": "",
            "state": "",
            "inputed": "",
            "input_employee": 0,
            "removed": null,
            "view_count": 0,
            "real_view_count": 0,
            "store_count": 0,
            "supplier": 0,
            "channel": 0,
            "buy_count": 0,
            "real_buy_count": 0,
            "catalog": 0,
            "assignee": 0,
            "suites": [
                {
                    "name": "",
                    "type": "",
                    "price": 0,
                    "effectDuration": 0
                }
            ],
            "author_name": "",
            "author_field": "",
            "brief": ""
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/channel/list',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
        return ajax({
            url: '/api/channel/insert',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/channel/update',
            type: 'post',
            data: params
        });
    },
    del: function (id) {
        return ajax({
            url: '/api/channel/delete',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};

exports.file = {
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