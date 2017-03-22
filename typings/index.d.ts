/// <reference path="./avalon.d.ts" />
/// <reference path="./mmRouter.d.ts" />
/// <reference types="jquery" />

// FIS3 inline syntax
declare var __inline

// runtime global

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

interface JQueryStatic {
    ajaxFileUpload
}