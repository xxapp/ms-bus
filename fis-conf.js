// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs', {
    paths: {
        avalon: '/node_modules/avalonjs/dist/avalon.shim.js',
        mmState: '/vendor/mmState/mmState.js',
        jquery: '/vendor/jquery/jquery.js',
        moment: '/vendor/moment/moment.min.js',
        redux: '/node_modules/redux/dist/redux.js'
    }
});

fis.set('baseurl', '');

fis.unhook('components');
fis.hook('node_modules', {
    ignoreDevDependencies: true,
    shimBuffer: false,
    shimProcess: false,
    shutup: true
});


fis.match('/test/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/{node_modules,components}/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/static/$0'
});
fis.match('/{node_modules,components}/**/*.html', {
    release: false
});
fis.match('/{services,stores}/*.js', {
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
fis.match('/{README.md,Readme.txt,cmd.cmd,package.json}', {
    release: false
})

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
})