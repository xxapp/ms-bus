bootbox.setLocale('zh_CN');
avalon.config({
    debug: false
});
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}