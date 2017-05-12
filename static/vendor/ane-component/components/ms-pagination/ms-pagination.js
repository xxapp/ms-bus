define('vendor/ane-component/components/ms-pagination/ms-pagination.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  /**
   * 分页组件
   * @prop {Number} [current=1] 当前页
   * @prop {Number} [pageSize=10] 每页的数据量
   * @prop {Number} total 数据总量
   * @event {Function} onChange 当页码改变时触发，参数current
   *
   * @example
   * ```
   * <ms-pagination :widget="{total:100,onChange:@handlePageChange}"></ms-pagination>
   *
   * <ms-pagination :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination>
   * ```
   */
  avalon.component('ms-pagination', {
      template: "\n<div class=\"btn-group \">\n    <a class=\"btn blue \" :attr=\"{disabled:@current===1}\" :click=\"@prevPage\">\n        <i class=\"icon-step-backward \"></i>上一页\n    </a>\n    <a class=\"btn success \">{{ @current }}/{{ Math.ceil(@total/@pageSize) }}</a>\n    <a class=\"btn blue \" :attr=\"{disabled:@current===Math.ceil(@total/@pageSize)}\" :click=\"@nextPage\">\n        <i class=\"icon-step-forward \"></i>下一页\n    </a>\n</div>\n",
      defaults: {
          current: 1,
          pageSize: 10,
          total: 0,
          prevPage: function () {
              if (this.current > 1) {
                  this.onChange(--this.current);
              }
          },
          nextPage: function () {
              if (this.current < Math.ceil(this.total / this.pageSize)) {
                  this.onChange(++this.current);
              }
          },
          onChange: avalon.noop,
          onInit: function (event) {
          },
          onReady: function (event) {
          },
          onDispose: function (event) {
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-pagination/ms-pagination.js.map
  

});
