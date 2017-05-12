define('vendor/ane-component/ane-util.ts', function(require, exports, module) {

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
  //# sourceMappingURL=/static/vendor/ane-component/ane-util.js.map
  

});
