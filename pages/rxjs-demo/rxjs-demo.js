import 'es5-shim';
import 'es6-promise/dist/es6-promise.auto';

import * as avalon from 'avalon2';
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}

import * as Rx from 'rx';

avalon.define({
    $id: 'demo'
});

const source = Rx.Observable.range(1, 5);

const subscription = source.subscripe(
    x => console.log('onNext: ' + x),
    e => console.log('onError: ' + e.message),
    () => console.log('onComplete')
);