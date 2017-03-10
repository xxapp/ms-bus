// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs', {
    paths: {
        mmState: '/vendor/mmState/mmState.js',
        'moment-locale': '/node_modules/moment/locale/zh-cn.js',
        redux: '/node_modules/redux/dist/redux.js',
        bootstrap: '/node_modules/bootstrap/dist/js/bootstrap.js'
    }
});

fis.set('project.ignore', ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js', 
                            'README.md', 'readme.txt', 'cmd.cmd', 'package.json', 'LICENSE']);
fis.set('baseurl', '');

fis.unhook('components');
fis.hook('node_modules', {
    ignoreDevDependencies: true,
    shimBuffer: false,
    shimProcess: false,
    shutup: true
});

// 默认情况下不添加hash
fis.match('**', {
    useHash: false,
    release: false
});
fis.match('/*.html', {
    release: '/$0'
});
fis.match('/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/{node_modules,components}/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/static/$0'
});
fis.match('/components/**/*.html', {
    postprocessor: fis.plugin('component-view', { }),
    release: false
});
fis.match('/{node_modules,components}/**/*.{css,eot,svg,ttf,woff,woff2,map}', {
    release: '/static/$0'
});
fis.match('/{services,events}/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/services/*.js', {
    postprocessor: function (content, file, settings) {
        return content
            .replace('__API_URL__', 'localhost:8080/api')
            .replace('__SPRING_API_URL__', 'localhost:8080/api');
    }
});
fis.match('/vendor/**/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/static/**', {
    release: '/static/$0'
});
// mock假数据
fis.match('/mock/**', {
    release: '/$0'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
})