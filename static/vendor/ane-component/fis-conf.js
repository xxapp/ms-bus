define('vendor/ane-component/fis-conf', function(require, exports, module) {

  "use strict";
  fis.hook('commonjs', {
      extList: ['.js', '.ts']
  });
  fis.set('project.ignore', ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js',
      'README.md', 'karma.conf.js', 'package.json', 'LICENSE']);
  fis.set('baseurl', '');
  fis.unhook('components');
  fis.hook('node_modules', {
      ignoreDevDependencies: true,
      shimBuffer: false,
      shimProcess: false,
      shutup: true
  });
  fis.media('dev').match('**', {
      release: '/$0'
  });
  fis.match('::package', {
      postpackager: fis.plugin('loader', {
          useInlineMap: true
      })
  });
  fis.media('qa')
      .match('**', {
      release: false,
      useHash: false
  })
      .match('**.ts', {
      preprocessor: fis.plugin('js-require-css'),
      parser: fis.plugin('typescript', {
          jsx: 1,
          showNotices: false,
          sourceMap: false,
          target: 0,
          allowSyntheticDefaultImports: true
      }),
      rExt: '.js'
  })
      .match('/node_modules/**/*.{ts,js}', {
      isMod: true,
      release: '/$0'
  })
      .match('/components/**/*.{ts,js}', {
      isMod: true,
      release: '/$0'
  })
      .match('/*.ts', {
      isMod: true,
      release: '/$0'
  })
      .match('/components/**/*.html', {
      postprocessor: fis.plugin('component-view', {})
  })
      .match('/{node_modules,components}/**/*.{css,eot,svg,ttf,woff,woff2,map}', {
      release: '/$0'
  })
      .match('/tests/index.js', {
      release: '/$0'
  })
      .match('ane-test.js', {
      release: '/$0'
  })
      .match('::package', {
      packager: fis.plugin('deps-pack', {
          'ane-test.js': [
              '/tests/index.js',
              '/tests/index.js:deps'
          ]
      })
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/fis-conf.js.map
  

});
