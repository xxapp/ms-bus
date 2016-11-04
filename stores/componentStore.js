var avalon = require('avalon');
var Redux = require('redux');

// 存储各个组件向其它组件派发的数据
module.exports = Redux.createStore(function (state, action) {
    switch (action.type) {
        case 'checkHeader': {
            return avalon.mix(true, state, {
                checkHeader: {
                    checked: action.checked,
                    key: action.key
                }
            });
        }
        default: {
            return state;
        }
    }
}, {
    checkHeader: {
        checked: false,
        key: 'id'
    }
});