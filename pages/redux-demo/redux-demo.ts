/// <reference path="../../typings/index.d.ts" />

import { createStore } from 'redux';
import * as avalon from 'avalon2';

import * as jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
/**
 * @require ../../node_modules/bootstrap/dist/css/bootstrap.css
 */
import '../../vendor/avx-component/avx-component';
import { createForm } from '../../components/ms-form/create-form';

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
        return state + 1
        case 'DECREMENT':
        return state - 1
        default:
        return state
    }
}
const store = createStore(
    counter,
    global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
)
function render() {
    vm.value = store.getState();
}
store.subscribe(render)

const vm = avalon.define({
    $id: 'demo',
    value: 0,
    title: 'hello',
    show: false,
    $form: createForm({
        onFieldsChange(fields) {
            console.log(fields);
            console.log(this.record);
        }
    }),
    increment() {
        store.dispatch({ type: 'INCREMENT' });
    },
    decrement() {
        store.dispatch({ type: 'DECREMENT' });
    },
    incrementIfOdd() {
        if (store.getState() % 2 !== 0) {
            store.dispatch({ type: 'INCREMENT' });
        }
    },
    incrementAsync() {
        setTimeout(() => {
            store.dispatch({ type: 'INCREMENT' });
        }, 1000);
    }
});