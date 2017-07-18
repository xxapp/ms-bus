import 'es5-shim';
import 'es6-promise/dist/es6-promise.auto';
import 'addeventlistener-with-dispatch/src/addeventlistener-with-dispatch';

import avalon from 'avalon2';
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}

import Rx from 'rx';

avalon.define({
    $id: 'demo',
    text: 'Click Me',
    click(e) {
    }
});

// const button = document.getElementsByTagName('button')[0];

// const source = Rx.Observable.fromEvent<MouseEvent>(button, 'click')
//                             .map(e => (e.target as HTMLButtonElement).value)
//                             .debounce(500);

// const subscription = source.subscribeOnNext(value => console.log(`Input value: %${value}`));

// const throttled = Rx.Observable.fromEvent(window, 'resize').throttle(250);

// throttled.subscribeOnNext(e => {
//     console.log(window.innerHeight, window.innerWidth);
// });

// setTimeout(() => {
//     subscription.dispose();
// }, 2000)

// const source = Rx.Observable.interval(1000).bufferWithTime(3000).map(arr => arr.reduce((acc, x) => acc + x, 0));

// const subscription = source.subscribe(
//     x => console.log(`onNext: ${x}`),
//     e => console.log(`onError: ${e}`),
//     () => console.log('onCompleted'));

const codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

function isKonamiCode(buffer) {
    console.log(buffer.toString());
    return codes.toString() === buffer.toString();
}

const keys = Rx.Observable.fromEvent(document, 'keyup')
    .map(e => e.keyCode)
    .bufferWithCount(10, 1)
    .filter(isKonamiCode)
    .subscribeOnNext(() => console.log('KONAMI!'));