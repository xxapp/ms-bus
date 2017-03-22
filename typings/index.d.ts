/// <reference path="./avalon.d.ts" />
/// <reference path="./mmRouter.d.ts" />


interface MyWindow extends Window {
    Promise: Promise<any>,
    $,
    jQuery
}

declare var global: MyWindow

declare var require

declare var module: {
    exports: any
}

declare var exports: any