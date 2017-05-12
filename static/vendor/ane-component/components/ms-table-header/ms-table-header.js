define('vendor/ane-component/components/ms-table-header/ms-table-header.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  avalon.component('ms-table-header', {
      template: '<th><slot /></th>',
      soleSlot: 'content',
      defaults: {
          content: '',
          col: ''
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-table-header/ms-table-header.js.map
  

});
