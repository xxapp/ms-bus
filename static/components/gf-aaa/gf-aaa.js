define('components/gf-aaa/gf-aaa.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  exports.name = 'gf-aaa';
  avalon.component(exports.name, {
      template: "\n<div>\n    <h1>{{@text}}</h1>\n</div>\n",
      defaults: {
          text: 'aaa'
      }
  });
  //# sourceMappingURL=/static/components/gf-aaa/gf-aaa.js.map
  

});
