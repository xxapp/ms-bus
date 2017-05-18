define('vendor/ane/ane-util.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  function findParentComponent(vm, ctype) {
      var parent = vm.$element.parentElement;
      while (parent) {
          if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
              return parent._vm_;
          }
          parent = parent.parentElement;
      }
      return null;
  }
  exports.findParentComponent = findParentComponent;
  function parseSlotToVModel(vmodel, vnodes) {
      if (vnodes === undefined) {
          vnodes = vmodel.$render.root ? vmodel.$render.root.children : [];
      }
      vnodes.forEach(function (vnode) {
          if (!vnode || !vnode.nodeName || vnode.dom.nodeType !== 1)
              return true;
          var slotName = vnode.dom.getAttribute('slot');
          if (slotName) {
              delete vnode.props[':skip'];
              delete vnode.props['ms-skip'];
              vmodel[slotName] = avalon.vdom(vnode, 'toHTML');
          }
          else {
              parseSlotToVModel(vmodel, vnode.children);
          }
      });
  }
  exports.parseSlotToVModel = parseSlotToVModel;
  function getChildTemplateDescriptor(vmodel, render) {
      if (render === void 0) { render = vmodel.$render; }
      return render.directives.reduce(function (acc, action) {
          if (action.is) {
              acc.push({
                  is: action.is,
                  props: action.value,
                  inlineTemplate: action.fragment,
                  children: getChildTemplateDescriptor(vmodel, action.innerRender || { directives: [] })
              });
          }
          return acc;
      }, []);
  }
  exports.getChildTemplateDescriptor = getChildTemplateDescriptor;
  function debounce(func, wait, immediate) {
      if (wait === void 0) { wait = 300; }
      if (immediate === void 0) { immediate = false; }
      var timeout;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var context = this;
          var later = function () {
              timeout = null;
              if (!immediate)
                  func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow)
              func.apply(context, args);
      };
  }
  exports.debounce = debounce;
  //# sourceMappingURL=/ms-bus/static/vendor/ane/ane-util.js.map
  

});
