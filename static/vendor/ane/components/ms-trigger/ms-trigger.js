define("vendor/ane/components/ms-trigger/ms-trigger.ts",function(t){"use strict";var e=t("node_modules/avalon2/dist/avalon"),i=t("node_modules/dom-align/lib/index");e.component("ms-trigger",{template:'<span style="display:none;"></span>',defaults:{width:0,visible:!1,innerVmId:"",innerClass:"",innerTemplate:"",initialized:!1,withInBox:function(){return!0},getTarget:e.noop,onHide:e.noop,hide:function(t){t.style.top="-9999px",t.style.left="-9999px",this.onHide()},initPanel:function(t){var i=this,n=document,o=n.body,s=n.createElement("div");s.setAttribute("id",this.$id),s.setAttribute("style","position: absolute; top: 0px; left: 0px; width: 100%;"),t.setAttribute("class",this.innerClass),t.setAttribute("style","z-index: 1050;left: -9999px;top: -9999px;position: absolute;outline: none;overflow: hidden;"),t.setAttribute(":important",this.innerVmId),t.innerHTML=this.innerTemplate.replace(/\n/g,""),s.appendChild(t),o.appendChild(s),e.scan(t,e.vmodels[this.innerVmId]),e.bind(n,"click",function(n){!i.visible||t===n.target||e.contains(t,n.target)||i.withInBox(n.target)||i.hide(t)})},onInit:function(){var t=this,e=document,n=e.createElement("div");this.$watch("visible",function(e){e?(t.initialized||(t.initPanel(n),t.initialized=!0),n.style.width=0===t.width?"auto":t.width+"px",n.scrollTop=0,i(n,t.getTarget(),{points:["tl","bl"],offset:[0,1],overflow:{adjustY:!0}})):t.hide(n)})},onDispose:function(){var t=document,e=t.body,i=t.getElementById(this.$id);e.removeChild(i)}}})});