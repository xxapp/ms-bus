define('services/storeService.ts', function(require, exports, module) {

  "use strict";
  var ajaxService_1 = require("services/ajaxService.ts");
  require("vendor/jquery/ajaxfileupload");
  exports.demo = {
      key: 'region_id',
      initialData: function () {
          return {
              region_enable: 0,
              region_id: '',
              region_name: '',
              region_parent_id: '',
              region_type: '',
              suites: [{
                      name: ''
                  }]
          };
      },
      fetch: function (params) {
          return ajaxService_1["default"]({
              url: '/api/demo',
              type: 'get',
              data: params
          });
      },
      create: function (params) {
          return ajaxService_1["default"]({
              url: '/api/demo/update',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajaxService_1["default"]({
              url: '/api/demo/update',
              type: 'post',
              data: params
          });
      },
      remove: function (id) {
          return ajaxService_1["default"]({
              url: '/api/demo/update',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  exports.file = {
      insert: function (params) {
          $.ajaxFileUpload({
              url: '/api/file/uploadFile',
              secureuri: false,
              fileElementId: params.fileElementId,
              dataType: 'json',
              success: params.success
          });
      }
  };
  exports.github = {
      limit: 30,
      repository: function (params) {
          return ajaxService_1["default"]({
              url: "/search/repositories",
              type: 'get',
              data: params
          });
      },
      processRequest: function (params) {
          return {
              q: params.query,
              start: (params.page - 1) * this.limit,
              limit: this.limit
          };
      },
      processResponse: function (data) {
          data = data.data;
          data.rows = data.items;
          data.total = data.total_count;
          return data;
      }
  };
  //# sourceMappingURL=/static/services/storeService.js.map
  

});
