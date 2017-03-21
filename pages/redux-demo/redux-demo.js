var Redux = require('redux');
var avalon = require('avalon2');

global.jQuery = global.$ = require('jquery');
/**
 * @require ../../node_modules/bootstrap/dist/css/bootstrap.css
 */
require('/vendor/avx-component');
var createForm = require('/components/ms-form/create-form');

function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }
    switch (action.type) {
        case 'INCREMENT':
        return state + 1
        case 'DECREMENT':
        return state - 1
        default:
        return state
    }
}
var store = Redux.createStore(
    counter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
function render() {
    vm.value = store.getState();
}
store.subscribe(render)

var vm = avalon.define({
    $id: 'demo',
    value: 0,
    title: 'hello',
    $form: createForm({
        onFieldsChange: function (fields) {
            console.log(fields);
            console.log(this.record);
        }
    }),
    increment: function () {
        store.dispatch({ type: 'INCREMENT' });
    },
    decrement: function () {
        store.dispatch({ type: 'DECREMENT' });
    },
    incrementIfOdd: function () {
        if (store.getState() % 2 !== 0) {
            store.dispatch({ type: 'INCREMENT' });
        }
    },
    incrementAsync: function () {
        setTimeout(function () {
            store.dispatch({ type: 'INCREMENT' });
        }, 1000);
    }
});