import * as avalon from 'avalon2';
import bootbox from 'bootbox';
import beyond from '../vendor/beyond';

import msg from  './messageService';

// 拦截ajax请求，检测是否超时，以重新登录
$(document).ajaxComplete((event, xhr, settings) => {
    if (xhr.status == 200) {
        if (settings.dataType == 'json' && (xhr as any).responseJSON != void 0) {
            let result = (xhr as any).responseJSON;
            if (result.code === '20' || result.code === '21') {
                beyond.hideLoading();
                bootbox.confirm("Session已经失效，请重新登录", function (result) {
                     if (result) {
                         global.location.href = "/login.html";
                     }
                });
            } else if (result.error) {
                beyond.hideLoading();
                msg.success(result.error.message);
            }
        }
    } else if (xhr.status == undefined) {
    	beyond.hideLoading();
    } else {
        beyond.hideLoading();
        msg.error('请求错误，请联系管理员');
    }
});

export default function (options) {
    const defaultOptions = {
        url: 'http://127.0.0.1:8081',
        data: {
        },
        dataType: 'json',
        cache: false
    };
    options.data = processRequest(options.data);
    return $.ajax({ ...defaultOptions, ...options }).then(processResponse);
};

// 标准化传给后台的参数
function processRequest(r) {
    const str = r || {};
    if (str.start || str.limit) {
        str.page = {
            start: str.start || 0,
            limit: str.limit || 15
        };
        delete str.start;
        delete str.limit;
    }
    return {
        params: JSON.stringify(str)
    };
}

// 标准化后台相应数据格式
function processResponse(r) {
    let str: { code?: string, list?: any[], rows?: any[], data?: any, message?: string } = {};
    if (r.rows) {
        str = r;
        str.code = '0';
        str.list = r.rows;
        delete str.rows;
    } else {
        if (!r.error) {
            str.code = '0';
            str.data = r;
        } else {
            str.code = '1';
            str.message = r.message || r.error;
        }
    }
    return str;
}