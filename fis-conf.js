// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs', {
    paths: {
        'moment-locale': './node_modules/moment/locale/zh-cn.js',
        redux: './node_modules/redux/dist/redux.js',
        bootstrap: './node_modules/bootstrap/dist/js/bootstrap.js'
    },
    extList: ['.js', '.ts']
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
['/{pages,components,services,vendor}/**.{ts,js}', '/*.{ts,js}'].forEach(function (blob) {
    fis.match(blob, {
        preprocessor: fis.plugin('js-require-css'),
        parser: fis.plugin('typescript', {
            jsx: 1,
            showNotices: false,
            sourceMap: true,
            target: 0,
            allowSyntheticDefaultImports: true
        }),
        rExt: '.js'
    });
});
fis.match('**', {
    useHash: false,
    release: false
});
fis.match('**.js.map', {
    release: '/static/$0'
});
fis.match('/*.html', {
    release: '/$0'
});
fis.match('/pages/**/*.html', {
    release: '/$0'
});
fis.match('/*.{ts,js}', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/pages/**/*.{ts,js}', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/{node_modules,components}/**/*.{ts,js}', {
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
fis.match('/services/*.{ts,js}', {
    isMod: true,
    release: '/static/$0'
});
fis.media('dev').match('/services/configService.{ts,js}', {
    postprocessor: function (content, file, settings) {
        return content
            .replace('__DOMAIN__', '')
            .replace('__SERVICE_URL__', '');
    }
});
fis.match('/vendor/**/*.{ts,js}', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/static/**', {
    release: '/static/$0'
});
// mock假数据
fis.media('dev').match('/mock/**', {
    release: '/$0'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true,
        obtainStyle: false
    })
})

fis.media('gh-pages')
.match('**', {
    domain: '/ms-bus'
})
.match('/services/configService.{ts,js}', {
    postprocessor: function (content, file, settings) {
        return content
            .replace('__DOMAIN__', '/ms-bus')
            .replace('__SERVICE_URL__', 'https://www.easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3');
    }
})
.match('*.{js,ts}', {
    optimizer: fis.plugin('uglify-js')
})
.match('*.{css}', {
  optimizer: fis.plugin('clean-css')
})
.match('app.js', {
    release: '/$0'
})
.match('vendor.js', {
    release: '/$0'
})
.match('app.css', {
    release: '/$0'
})
.match('::package', {
    packager: fis.plugin('deps-pack', {
        useTrack: false,
        'app.js': [
            'index.ts',
            'index.ts:deps',
            '!node_modules/**',
            '!node_modules/**:deps'
        ],
        'vendor.js': [
            'index.ts',
            'index.ts:deps'
        ],
        'app.css': [
            'index.ts:deps'
        ]
    }),
});
// .match('/mock/**', {
//     release: '/$0'
// });