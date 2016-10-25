var ajax = require('/services/ajaxService');

var menu = [{
    name: 'dashboard',
    stateName: 'root',
    title: '主页',
    icon: 'glyphicon-home',
    href: '#!/'
}, {
    name: 'demo1',
    title: '例子一级',
    icon: 'glyphicon-home',
    href: 'javascript:;',
    children: [{
        name: 'demo',
        stateName: 'root.demo',
        title: '例子',
        icon: 'glyphicon-home',
        href: '#!/demo'
    }]
}, {
    name: 'category',
    title: 'Category',
    stateName: 'root.category',
    icon: 'glyphicon-category',
    href: '#!/category'
}, {
    name: 'item',
    title: 'item',
    stateName: 'root.item',
    icon: 'glyphicon-category',
    href: '#!/item'
}, {
    name: 'channel',
    title: 'channel',
    stateName: 'root.channel',
    icon: 'glyphicon-category',
    href: '#!/channel'
}, {
    name: 'supplier',
    title: 'supplier',
    stateName: 'root.supplier',
    icon: 'glyphicon-category',
    href: '#!/supplier'
}];

// 根据权限过滤菜单
var menuPromise = new Promise(function (rs, rj) {
    // ajax({
    //     type: 'get',
    //     data: {
    //         method: 'adminAccount.getCurrentPermission'
    //     }
    // }).then(function (result) {
    //     if (result.code === '0') {
    //     	$('#loadImg').css('display','none');
    //         for (var i = 0, item; item = menu[i++]; ) {
    //             if (item.name === 'dashboard' || item.name === 'demo1') {
    //                 item.show = true;
    //             } else {
    //                 item.show = false;
    //             }
    //             var hasPermission = false;
    //             for (var j = 0, permission; permission = result.list[j++]; ) {
    //                 if (permission.permission_name === item.name) {
    //                     hasPermission = true;
    //                     break;
    //                 }
    //             }
    //             if (hasPermission) {
    //                 item.show = true;
    //             }
    //         }
    //         rs(menu.slice(0));
    //     } else {
    //         rj();
    //     }
    // });
    $('#loadImg').css('display','none');
    rs(menu.slice(0));
});

function walkMenu(name, process, level, menuLet) {
    var finded = false;
    level = !level ? 1 : level;
    menuLet = !menuLet ? menu.slice(0) : menuLet;
    for (var i = 0, item; item = menuLet[i++]; ) {
        process && process(item, level);
        if (item.name === name || item.stateName === name) {
            finded = true;
            break;
        }
        if (item.children && walkMenu(name, process, level + 1, item.children)) {
            finded = true;
            break;
        }
    }
    return finded;
}

exports.walkMenu = walkMenu;
exports.menu = menuPromise;