window.myLog = function() {
    if (!window.myLog._div) { window.myLog.createDiv(); }

    var logEntry = document.createElement('span');
    for (var i=0; i < arguments.length; i++) {
        logEntry.innerHTML += window.myLog.toJson(arguments[i]) + '<br />';
    }
    logEntry.innerHTML += '<br />';

    window.myLog._div.appendChild(logEntry);
}
window.myLog.createDiv = function() {
    window.myLog._div = document.body.appendChild(document.createElement('div'));
    var props = {
        position:'absolute', top:'10px', right:'10px', background:'#333', border:'5px solid #333', 
        color: 'white', width: '400px', height: '300px', overflow: 'auto', fontFamily: 'courier new',
        fontSize: '11px', whiteSpace: 'nowrap'
    }
    for (var key in props) { window.myLog._div.style[key] = props[key]; }
}
window.myLog.toJson = function(obj) {
    if (typeof window.uneval == 'function') { return uneval(obj); }
    if (typeof obj == 'object') {
        if (!obj) { return 'null'; }
        var list = [];
        if (obj instanceof Array) {
            for (var i=0;i < obj.length;i++) { list.push(this.toJson(obj[i])); }
            return '[' + list.join(',') + ']';
        } else {
            for (var prop in obj) { list.push('"' + prop + '":' + this.toJson(obj[prop])); }
            return '{' + list.join(',') + '}';
        }
    } else if (typeof obj == 'string') {
        return '"' + obj.replace(/(["'])/g, '\\$1') + '"';
    } else {
        return new String(obj);
    }
}

window.myLog('log statement');
window.myLog('logging an object', { name: 'Marcus', likes: 'js' });

(function () {
    var matches = window.navigator.userAgent.match(/MSIE ([^;]*)/);
    if (!matches) { return ; }
    var ieVersion = parseInt(matches[1], 10);
    if (ieVersion < 9) {
        window.console = {
            log: window.myLog
        }
    }
})();