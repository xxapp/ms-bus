define("vendor/ane/components/ms-form/utils.ts",function(e,n){"use strict";function t(e,n){void 0===n&&(n={}),e.$formItem=r.findParentComponent(e,"ms-form-item"),null!==e.$formItem&&e.$formItem.onFieldChange(o({name:e.col,rules:e.$rules,value:e.value,denyValidate:!0},n))}var o=this&&this.__assign||Object.assign||function(e){for(var n,t=1,o=arguments.length;o>t;t++){n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r=e("vendor/ane/ane-util.ts");n.emitToFormItem=t});