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
        href: '#!/demo',
        childStates: ['root.supplier']
    }, {
        name: 'category',
        title: 'Category',
        stateName: 'root.category',
        icon: 'glyphicon-category',
        href: '#!/category'
    }]
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
    console.log('进入' + level + '级, 开始遍历');
    for (var i = 0, item; item = menuLet[i++]; ) {
        if (item.name === name || item.stateName === name) {
            console.log('找到' + name, '在' + level + '级');
            process && process(item, level);
            finded = true;
            break;
        }
        console.log(item.childStates, name);
        if (item.childStates && ~item.childStates.indexOf(name)) {
            process && process(item, level);
            finded = true;
            break;
        }
        if (item.children && walkMenu(name, process, level + 1, item.children)) {
            console.log('在子节点找到' + name, '在' + level + '级');
            process && process(item, level);
            finded = true;
            break;
        }
    }
    return finded;
}

exports.walkMenu = walkMenu;
exports.menu = menuPromise;