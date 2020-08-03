!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(2);class o extends n.Component{constructor(t){super(t),this.element=n.createRef(),this.observer={},this.totalHeight=0,this.state={items:this.props.items,first:0,last:0},this.scroller=this.scroller.bind(this)}push(){const t=this.state;t.last<t.items.length&&(t.last++,this.setState(t,()=>{const t=this.element.current&&this.element.current.lastChild||{};t&&(this.totalHeight+=t.offsetHeight)}))}pop(){const t=this.state;if(t.last>0){t.last--;const e=this.element.current&&this.element.current.lastChild||{};e&&(this.totalHeight-=e.offsetHeight),this.setState(t)}}shift(){if(this.element.current){const t=this.state,e=this.element.current.scrollTop;if(t.first<t.last-1){t.first++;const r=this.element.current&&this.element.current.firstChild||{};r&&(this.totalHeight-=r.offsetHeight),this.setState(t,()=>{this.element.current&&e+this.element.current.offsetHeight>=this.totalHeight&&this.push()})}}}unshift(){const t=this.state;t.first>0&&(t.first--,this.setState(t,()=>{const t=this.element.current&&this.element.current.firstChild||{};t&&this.element.current&&(this.totalHeight+=t.offsetHeight,this.element.current.scrollTop=t.offsetHeight)}))}fill(){this.element.current&&this.element.current.offsetHeight>this.totalHeight&&this.state.last<this.state.items.length&&(this.push(),this.fill())}scroller(t){const e=t.currentTarget.scrollTop;if(this.element.current){const t=this.element.current.firstChild||{},r=this.element.current.lastChild||{};e+this.element.current.offsetHeight>=this.totalHeight?this.push():r&&e+this.element.current.offsetHeight<this.totalHeight-r.offsetHeight&&this.pop(),t&&e>t.offsetHeight?this.shift():0===e&&this.state.first&&this.unshift()}}componentDidMount(){this.observer=new ResizeObserver(t=>{t.forEach(t=>{const e=this.state;e.first=0,e.last=0,this.setState(e),this.totalHeight=0,this.fill()})}),this.element.current&&this.observer.observe(this.element.current)}componentWillUnmount(){this.element.current&&this.observer.unobserve(this.element.current)}render(){const{first:t,last:e}=this.state;return n.createElement("div",{style:{flex:1,overflow:"auto"},ref:this.element,onScroll:this.scroller},this.state.items.slice(t,e).map((t,e)=>n.createElement("div",{key:"item-"+e},t)))}}e.default=o},function(t,e,r){"use strict";t.exports=r(3)},function(t,e,r){"use strict";
/** @license React v16.13.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(4),o="function"==typeof Symbol&&Symbol.for,i=o?Symbol.for("react.element"):60103,u=o?Symbol.for("react.portal"):60106,s=o?Symbol.for("react.fragment"):60107,l=o?Symbol.for("react.strict_mode"):60108,c=o?Symbol.for("react.profiler"):60114,f=o?Symbol.for("react.provider"):60109,a=o?Symbol.for("react.context"):60110,h=o?Symbol.for("react.forward_ref"):60112,p=o?Symbol.for("react.suspense"):60113,y=o?Symbol.for("react.memo"):60115,m=o?Symbol.for("react.lazy"):60116,d="function"==typeof Symbol&&Symbol.iterator;function v(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g={};function S(t,e,r){this.props=t,this.context=e,this.refs=g,this.updater=r||b}function _(){}function j(t,e,r){this.props=t,this.context=e,this.refs=g,this.updater=r||b}S.prototype.isReactComponent={},S.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(v(85));this.updater.enqueueSetState(this,t,e,"setState")},S.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},_.prototype=S.prototype;var O=j.prototype=new _;O.constructor=j,n(O,S.prototype),O.isPureReactComponent=!0;var w={current:null},C=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function x(t,e,r){var n,o={},u=null,s=null;if(null!=e)for(n in void 0!==e.ref&&(s=e.ref),void 0!==e.key&&(u=""+e.key),e)C.call(e,n)&&!k.hasOwnProperty(n)&&(o[n]=e[n]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var c=Array(l),f=0;f<l;f++)c[f]=arguments[f+2];o.children=c}if(t&&t.defaultProps)for(n in l=t.defaultProps)void 0===o[n]&&(o[n]=l[n]);return{$$typeof:i,type:t,key:u,ref:s,props:o,_owner:w.current}}function P(t){return"object"==typeof t&&null!==t&&t.$$typeof===i}var E=/\/+/g,H=[];function $(t,e,r,n){if(H.length){var o=H.pop();return o.result=t,o.keyPrefix=e,o.func=r,o.context=n,o.count=0,o}return{result:t,keyPrefix:e,func:r,context:n,count:0}}function R(t){t.result=null,t.keyPrefix=null,t.func=null,t.context=null,t.count=0,10>H.length&&H.push(t)}function M(t,e,r){return null==t?0:function t(e,r,n,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case i:case u:l=!0}}if(l)return n(o,e,""===r?"."+T(e,0):r),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var c=0;c<e.length;c++){var f=r+T(s=e[c],c);l+=t(s,f,n,o)}else if(null===e||"object"!=typeof e?f=null:f="function"==typeof(f=d&&e[d]||e["@@iterator"])?f:null,"function"==typeof f)for(e=f.call(e),c=0;!(s=e.next()).done;)l+=t(s=s.value,f=r+T(s,c++),n,o);else if("object"===s)throw n=""+e,Error(v(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n,""));return l}(t,"",e,r)}function T(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+(""+t).replace(/[=:]/g,(function(t){return e[t]}))}(t.key):e.toString(36)}function A(t,e){t.func.call(t.context,e,t.count++)}function I(t,e,r){var n=t.result,o=t.keyPrefix;t=t.func.call(t.context,e,t.count++),Array.isArray(t)?U(t,n,r,(function(t){return t})):null!=t&&(P(t)&&(t=function(t,e){return{$$typeof:i,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(t,o+(!t.key||e&&e.key===t.key?"":(""+t.key).replace(E,"$&/")+"/")+r)),n.push(t))}function U(t,e,r,n,o){var i="";null!=r&&(i=(""+r).replace(E,"$&/")+"/"),M(t,I,e=$(e,i,n,o)),R(e)}var q={current:null};function D(){var t=q.current;if(null===t)throw Error(v(321));return t}var F={ReactCurrentDispatcher:q,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:w,IsSomeRendererActing:{current:!1},assign:n};e.Children={map:function(t,e,r){if(null==t)return t;var n=[];return U(t,n,null,e,r),n},forEach:function(t,e,r){if(null==t)return t;M(t,A,e=$(null,null,e,r)),R(e)},count:function(t){return M(t,(function(){return null}),null)},toArray:function(t){var e=[];return U(t,e,null,(function(t){return t})),e},only:function(t){if(!P(t))throw Error(v(143));return t}},e.Component=S,e.Fragment=s,e.Profiler=c,e.PureComponent=j,e.StrictMode=l,e.Suspense=p,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,e.cloneElement=function(t,e,r){if(null==t)throw Error(v(267,t));var o=n({},t.props),u=t.key,s=t.ref,l=t._owner;if(null!=e){if(void 0!==e.ref&&(s=e.ref,l=w.current),void 0!==e.key&&(u=""+e.key),t.type&&t.type.defaultProps)var c=t.type.defaultProps;for(f in e)C.call(e,f)&&!k.hasOwnProperty(f)&&(o[f]=void 0===e[f]&&void 0!==c?c[f]:e[f])}var f=arguments.length-2;if(1===f)o.children=r;else if(1<f){c=Array(f);for(var a=0;a<f;a++)c[a]=arguments[a+2];o.children=c}return{$$typeof:i,type:t.type,key:u,ref:s,props:o,_owner:l}},e.createContext=function(t,e){return void 0===e&&(e=null),(t={$$typeof:a,_calculateChangedBits:e,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:f,_context:t},t.Consumer=t},e.createElement=x,e.createFactory=function(t){var e=x.bind(null,t);return e.type=t,e},e.createRef=function(){return{current:null}},e.forwardRef=function(t){return{$$typeof:h,render:t}},e.isValidElement=P,e.lazy=function(t){return{$$typeof:m,_ctor:t,_status:-1,_result:null}},e.memo=function(t,e){return{$$typeof:y,type:t,compare:void 0===e?null:e}},e.useCallback=function(t,e){return D().useCallback(t,e)},e.useContext=function(t,e){return D().useContext(t,e)},e.useDebugValue=function(){},e.useEffect=function(t,e){return D().useEffect(t,e)},e.useImperativeHandle=function(t,e,r){return D().useImperativeHandle(t,e,r)},e.useLayoutEffect=function(t,e){return D().useLayoutEffect(t,e)},e.useMemo=function(t,e){return D().useMemo(t,e)},e.useReducer=function(t,e,r){return D().useReducer(t,e,r)},e.useRef=function(t){return D().useRef(t)},e.useState=function(t){return D().useState(t)},e.version="16.13.1"},function(t,e,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function u(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,s,l=u(t),c=1;c<arguments.length;c++){for(var f in r=Object(arguments[c]))o.call(r,f)&&(l[f]=r[f]);if(n){s=n(r);for(var a=0;a<s.length;a++)i.call(r,s[a])&&(l[s[a]]=r[s[a]])}}return l}}]));
//# sourceMappingURL=index.js.map