define('vendor/ane/fis-conf', function(require, exports, module) {

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
  fis.match('**', {
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
      .match('ane.js', {
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
          ],
          'ane.js': [
              'index.ts',
              'index.ts:deps',
              '!node_modules/async-validator/lib/index.js',
              '!node_modules/async-validator/lib/index.js:deps',
              '!node_modules/bootstrap/dist/js/bootstrap.js',
              '!node_modules/bootbox/bootbox.js',
              '!node_modules/noty/js/noty/packaged/jquery.noty.packaged.js',
              '!node_modules/dom-align/lib/index.js',
              '!node_modules/dom-align/lib/index.js:deps',
              '!node_modules/moment/moment.js',
              '!node_modules/up-loader/dist/up-loader.js'
          ]
      }),
      postpackager: fis.plugin('loader', {
          useInlineMap: false
      })
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane/fis-conf.js.map
  

});
