!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).VueImageBox={})}(this,function(e){"use strict";var t={props:["images","index","bgcolor"],data:function(){return{imageIndex:this.index}},mounted:function(){var e=this;window.addEventListener("keydown",function(t){37===t.keyCode&&e.previousImage(),39===t.keyCode&&e.nextImage(),27===t.keyCode&&e.close()})},watch:{index:function(e){this.imageIndex=e}},methods:{close:function(){this.imageIndex=null,this.$emit("close")},previousImage:function(){null!==this.imageIndex&&(this.imageIndex=this.imageIndex>0?this.imageIndex-1:this.images.length-1)},nextImage:function(){null!==this.imageIndex&&(this.imageIndex=this.imageIndex<this.images.length-1?this.imageIndex+1:0)}},computed:{imageUrl:function(){return this.images[this.imageIndex].imageUrl},imageCaption:function(){return this.images[this.imageIndex].caption},hasMultipleImages:function(){return this.images.length>1},imgBox_style:function(){var e="";return null!==this.bgcolor&&(e+="background-color: "+this.bgcolor+";"),e}}};var i=function(e,t,i,n,o,a,s,r,l,d){"boolean"!=typeof s&&(l=r,r=s,s=!1);var c,m="function"==typeof i?i.options:i;if(e&&e.render&&(m.render=e.render,m.staticRenderFns=e.staticRenderFns,m._compiled=!0,o&&(m.functional=!0)),n&&(m._scopeId=n),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,l(e)),e&&e._registeredComponents&&e._registeredComponents.add(a)},m._ssrRegister=c):t&&(c=s?function(){t.call(this,d(this.$root.$options.shadowRoot))}:function(e){t.call(this,r(e))}),c)if(m.functional){var g=m.render;m.render=function(e,t){return c.call(t),g(e,t)}}else{var u=m.beforeCreate;m.beforeCreate=u?[].concat(u,c):[c]}return i},n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var o=document.head||document.getElementsByTagName("head")[0],a={};var s=i({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"image-box"}},[null!==e.imageIndex?i("div",{staticClass:"imgBox",style:e.imgBox_style,on:{click:e.close}},[i("button",{staticClass:"imgBox__close",attrs:{type:"button"},on:{click:e.close}},[e._v("\n      ×\n    ")]),e._v(" "),e.hasMultipleImages?i("button",{staticClass:"imgBox__previous",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),e.previousImage(t)}}},[e._v("\n      ‹\n    ")]):e._e(),e._v(" "),e.images?i("div",{staticClass:"imgBox__container"},[i("figure",[i("transition",{attrs:{name:"image-fade"}},[i("img",{key:e.imageUrl,attrs:{src:e.imageUrl,title:e.imageCaption,alt:e.imageCaption},on:{click:function(t){return t.stopPropagation(),e.nextImage(t)}}})]),e._v(" "),i("figcaption",[e._v("\n          "+e._s(e.imageCaption)+"\n        ")])],1)]):e._e(),e._v(" "),e.hasMultipleImages?i("button",{staticClass:"imgBox__next",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),e.nextImage(t)}}},[e._v("\n      ›\n    ")]):e._e()]):e._e()])},staticRenderFns:[]},function(e){e&&e("data-v-42f8ed72_0",{source:".image-box-enter{opacity:0}.imgBox{transition:opacity .2s ease;position:fixed;z-index:1000;top:0;left:0;width:100%;min-height:100%;height:100vh;background-color:rgba(0,0,0,.9);display:table}.imgBox__container{position:absolute;overflow:hidden;cursor:pointer;max-width:100vw;height:100vh;margin:1rem auto;left:.5rem;right:.5rem}.imgBox figure{margin:0;height:100%}.imgBox figure img{margin-top:3rem;height:100%;width:100%;height:calc(100% - 4.5rem);object-fit:contain}.imgBox figure figcaption{position:absolute;top:0;width:100%;line-height:2.5rem;background-color:rgba(0,0,0,.25);color:#fff}.imgBox__close{color:#fff;position:absolute;top:5px;right:0;background-color:transparent;border:none;font-size:48px;width:50px;height:50px;cursor:pointer;z-index:900}.imgBox__close:focus{outline:0}.imgBox__next,.imgBox__previous{position:absolute;top:50%;margin-top:-25px;width:50px;height:50px;z-index:900;cursor:pointer;color:#fff;font-size:64px;line-height:64px;background-color:transparent;border:none}.imgBox__next:focus,.imgBox__previous:focus{outline:0}.imgBox__previous{left:0}.imgBox__next{right:0}.image-fade-enter{opacity:0}.image-fade-enter-active{transition:all .5s ease}",map:void 0,media:void 0})},t,void 0,!1,void 0,function(e){return function(e,t){return function(e,t){var i=n?t.media||"default":e,s=a[i]||(a[i]={ids:new Set,styles:[]});if(!s.ids.has(e)){s.ids.add(e);var r=t.source;if(t.map&&(r+="\n/*# sourceURL="+t.map.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),s.element||(s.element=document.createElement("style"),s.element.type="text/css",t.media&&s.element.setAttribute("media",t.media),o.appendChild(s.element)),"styleSheet"in s.element)s.styles.push(r),s.element.styleSheet.cssText=s.styles.filter(Boolean).join("\n");else{var l=s.ids.size-1,d=document.createTextNode(r),c=s.element.childNodes;c[l]&&s.element.removeChild(c[l]),c.length?s.element.insertBefore(d,c[l]):s.element.appendChild(d)}}}(e,t)}},void 0);function r(e){r.installed||(r.installed=!0,e.component("VueImageBox",s))}var l={install:r},d=null;"undefined"!=typeof window?d=window.Vue:"undefined"!=typeof global&&(d=global.Vue),d&&d.use(l),s.install=r,e.default=s,Object.defineProperty(e,"__esModule",{value:!0})});