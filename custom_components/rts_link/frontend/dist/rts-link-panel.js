/*! For license information please see rts-link-panel.js.LICENSE.txt */
(()=>{"use strict";var e={};const t={};function o(r){const i=t[r];if(void 0!==i)return i.exports;const s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}(()=>{const e=Object.getPrototypeOf;let t;o.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"==typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"==typeof r.then)return r}const s=Object.create(null);o.r(s);const n={};t=t||[null,e({}),e([]),e(e)];for(var a=2&i&&r;("object"==typeof a||"function"==typeof a)&&!~t.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach(e=>n[e]=()=>r[e]);return n.default=()=>r,o.d(s,n),s}})(),o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};const r=globalThis,i=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class a{constructor(e,t,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}}const l=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[r+1],e[0]);return new a(o,e,s)},c=(e,t)=>{if(i)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of t){const t=document.createElement("style"),i=r.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=o.cssText,e.appendChild(t)}},d=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:h,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:v,getPrototypeOf:g}=Object,y=globalThis,f=y.trustedTypes,b=f?f.emptyScript:"",$=y.reactiveElementPolyfillSupport,_=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},w=(e,t)=>!h(e,t),A={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=A){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);void 0!==r&&p(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:i}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);i?.call(this,t),this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??A}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...m(e),...v(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(void 0!==r&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:x).toAttribute(t,o.type);this._$Em=e,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){const o=this.constructor,r=o._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=o.getPropertyOptions(r),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=r;const s=i.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,o,r=!1,i){if(void 0!==e){const s=this.constructor;if(!1===r&&(i=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??w)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:r,wrapped:i},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,o,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[_("elementProperties")]=new Map,C[_("finalized")]=new Map,$?.({ReactiveElement:C}),(y.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,T=e=>e,E=S.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+P,D=`<${R}>`,j=document,U=()=>j.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,H="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,I=/>/g,L=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,V=/"/g,K=/^(?:script|style|textarea|title)$/i,F=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),W=F(1),J=(F(2),F(3),Symbol.for("lit-noChange")),Y=Symbol.for("lit-nothing"),G=new WeakMap,Z=j.createTreeWalker(j,129);function Q(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const X=(e,t)=>{const o=e.length-1,r=[];let i,s=2===t?"<svg>":3===t?"<math>":"",n=z;for(let t=0;t<o;t++){const o=e[t];let a,l,c=-1,d=0;for(;d<o.length&&(n.lastIndex=d,l=n.exec(o),null!==l);)d=n.lastIndex,n===z?"!--"===l[1]?n=B:void 0!==l[1]?n=I:void 0!==l[2]?(K.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=i??z,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?V:q):n===V||n===q?n=L:n===B||n===I?n=z:(n=L,i=void 0);const h=n===L&&e[t+1].startsWith("/>")?" ":"";s+=n===z?o+D:c>=0?(r.push(a),o.slice(0,c)+O+o.slice(c)+P+h):o+P+(-2===c?t:h)}return[Q(e,s+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class ee{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let i=0,s=0;const n=e.length-1,a=this.parts,[l,c]=X(e,t);if(this.el=ee.createElement(l,o),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Z.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(O)){const t=c[s++],o=r.getAttribute(e).split(P),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?se:"?"===n[1]?ne:"@"===n[1]?ae:ie}),r.removeAttribute(e)}else e.startsWith(P)&&(a.push({type:6,index:i}),r.removeAttribute(e));if(K.test(r.tagName)){const e=r.textContent.split(P),t=e.length-1;if(t>0){r.textContent=E?E.emptyScript:"";for(let o=0;o<t;o++)r.append(e[o],U()),Z.nextNode(),a.push({type:2,index:++i});r.append(e[t],U())}}}else if(8===r.nodeType)if(r.data===R)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=r.data.indexOf(P,e+1));)a.push({type:7,index:i}),e+=P.length-1}i++}}static createElement(e,t){const o=j.createElement("template");return o.innerHTML=e,o}}function te(e,t,o=e,r){if(t===J)return t;let i=void 0!==r?o._$Co?.[r]:o._$Cl;const s=N(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e),i._$AT(e,o,r)),void 0!==r?(o._$Co??=[])[r]=i:o._$Cl=i),void 0!==i&&(t=te(e,i._$AS(e,t.values),i,r)),t}class oe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=(e?.creationScope??j).importNode(t,!0);Z.currentNode=r;let i=Z.nextNode(),s=0,n=0,a=o[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new re(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new le(i,this,e)),this._$AV.push(t),a=o[++n]}s!==a?.index&&(i=Z.nextNode(),s++)}return Z.currentNode=j,r}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class re{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),N(e)?e===Y||null==e||""===e?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==J&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Y&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=ee.createElement(Q(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new oe(r,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new ee(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const i of e)r===t.length?t.push(o=new re(this.O(U()),this.O(U()),this,this.options)):o=t[r],o._$AI(i),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=T(e).nextSibling;T(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,i){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y}_$AI(e,t=this,o,r){const i=this.strings;let s=!1;if(void 0===i)e=te(this,e,t,0),s=!N(e)||e!==this._$AH&&e!==J,s&&(this._$AH=e);else{const r=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=te(this,r[o+n],t,n),a===J&&(a=this._$AH[n]),s||=!N(a)||a!==this._$AH[n],a===Y?e=Y:e!==Y&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}s&&!r&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Y)}}class ae extends ie{constructor(e,t,o,r,i){super(e,t,o,r,i),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??Y)===J)return;const o=this._$AH,r=e===Y&&o!==Y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==Y&&(o===Y||r);r&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class le{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}}const ce=S.litHtmlPolyfillSupport;ce?.(ee,re),(S.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;class he extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const r=o?.renderBefore??t;let i=r._$litPart$;if(void 0===i){const e=o?.renderBefore??null;r._$litPart$=i=new re(t.insertBefore(U(),e),e,void 0,o??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}he._$litElement$=!0,he.finalized=!0,de.litElementHydrateSupport?.({LitElement:he});const pe=de.litElementPolyfillSupport;pe?.({LitElement:he}),(de.litElementVersions??=[]).push("4.2.2");const ue=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},me={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:w},ve=(e=me,t,o)=>{const{kind:r,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),"accessor"===r){const{name:r}=o;return{set(o){const i=t.get.call(this);t.set.call(this,o),this.requestUpdate(r,i,e,!0,o)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=o;return function(o){const i=this[r];t.call(this,o),this.requestUpdate(r,i,e,!0,o)}}throw Error("Unsupported decorator location: "+r)};function ge(e){return(t,o)=>"object"==typeof o?ve(e,t,o):((e,t,o)=>{const r=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),r?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ye(e){return ge({...e,state:!0,attribute:!1})}const fe=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,o),o);function be(e,t){return(o,r,i)=>{const s=t=>t.renderRoot?.querySelector(e)??null;if(t){const{get:e,set:t}="object"==typeof r?o:i??(()=>{const e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return fe(o,r,{get(){let o=e.call(this);return void 0===o&&(o=s(this),(null!==o||this.hasUpdated)&&t.call(this,o)),o}})}return fe(o,r,{get(){return s(this)}})}}const $e=JSON.parse('{"panel":{"title":"RTS remotes","id":"id","create":"Create","name":"Name","rename":"Rename","changeType":"Change type","add":"Pair one more cover","delete":"Delete","type":"Type","dialog":{"confirm":"Confirm","cancel":"Cancel","title":{"create":"adding a new shutter","add":"Add a shutter","remove":"Remove","rename":"Rename","changeType":"Change type"},"content":{"create":"You are about to create a new remote control, please follow these steps: <br>{{panel.dialog.step.shutter}}<br>{{panel.dialog.step.add}}","add":"You are about to add a shutter to an existing remote control, please follow these steps: <br>{{panel.dialog.step.shutter}}<br>{{panel.dialog.step.add}}","remove":"You are going to delete this remote control, are you sure?"},"step":{"shutter":"- Press the PROG button on the shutter\'s remote control for 3 seconds, the shutter should make a confirmation movement","add":"- Click the confirm button in the dialog box, the shutter should make a confirmation movement"}},"error":{"create":"Fail to creating cover","add":"Fail to adding shutter","rename":"Fail to renaming cover","changeType":"Type change failed","remove":"Fail to removing cover","emptyField":"You should provide the field","command":"The command could not be sent"},"success":{"create":"Cover successfully added","add":"Command successfully sent","rename":"Cover successfully renamed","changeType":"Type has been successfully changed","remove":"Cover successfully removed"},"coverType":{"shutter":"Shutter","button":"Button"},"newRemote":"New remote","namePlaceholder":"e.g. Living room shutter","remotes":"Remotes","empty":"No remote yet. Create the first one above.","control":{"up":"Up","my":"Stop / My","down":"Down","press":"Press"},"busy":{"create":"Sending pairing command…","add":"Sending pairing command…","remove":"Removing…","rename":"Renaming…","changeType":"Changing type…"}},"error":"Error"}');var _e=o.t($e,2);const xe=JSON.parse('{"panel":{"title":"Télécommandes RTS","id":"id","create":"Créer","name":"Nom","rename":"Renommer","changeType":"Changer le type","add":"Appairer un volet supplémentaire","delete":"Supprimer","type":"Type","dialog":{"confirm":"Confirmer","cancel":"Annuler","title":{"create":"Ajouter une télécommande","add":"Ajouter un volet","remove":"Supprimer","rename":"Renommer","changeType":"Changer le type"},"content":{"create":"Vous vous apprêtez à créer une nouvelle télécommande, pour cela veuillez suivre les étapes suivantes : <br>{{panel.dialog.step.shutter}}<br>{{panel.dialog.step.add}}","add":"Vous vous apprêtez à ajouter un volet sur une télécommande existante, pour cela veuillez suivre les étapes suivantes : <br>{{panel.dialog.step.shutter}}<br>{{panel.dialog.step.add}}","remove":"Vous allez supprimer cette télécommande, êtes vous sûr ?"},"step":{"shutter":"- Faites un appuis de 3s sur le bouton PROG de la télécommande du volet, le volet doit faire un mouvement de confirmation","add":"- Cliquez sur le bouton confirmer de la boite de dialogue, le volet doit effectuer un mouvement de confirmation"}},"error":{"create":"Ajout de la télécommande échoué","add":"Ajout du volet échoué","rename":"Renommage de la télécommande échoué","changeType":"Le changement de type à échoué","remove":"Suppression de la télécommande échoué","emptyField":"Vous devez remplir le champ","command":"La commande n\'a pas pu être envoyée"},"success":{"create":"Télécommande ajoutée","add":"Commande envoyée","rename":"Télécommande renommée","changeType":"Le type à été changé","remove":"Télécommande supprimée"},"coverType":{"shutter":"Volet","button":"Bouton"},"newRemote":"Nouvelle télécommande","namePlaceholder":"Ex : Volet salon","remotes":"Télécommandes","empty":"Aucune télécommande pour l\'instant. Crée la première ci-dessus.","control":{"up":"Monter","my":"Stop / My","down":"Descendre","press":"Appuyer"},"busy":{"create":"Envoi de la commande d\'appairage…","add":"Envoi de la commande d\'appairage…","remove":"Suppression…","rename":"Renommage…","changeType":"Changement de type…"}},"error":"Erreur"}'),we={en:_e,fr:o.t(xe,2)};function Ae(e,t,...o){const r=t.replace(/['"]+/g,"");let i=Ce(e,r);if(void 0===i)return"";i=i.replace(/{{(.*?)}}/g,(e,t)=>Ce(t,r)??"");for(let e=0;e+1<o.length;e+=2){const t=String(o[e]).replace(/^{|}$/g,"");i=i.split(`{${t}}`).join(String(o[e+1]))}return i}function Ce(e,t){const o=t=>e.split(".").reduce((e,t)=>null!==e&&"object"==typeof e?e[t]:void 0,we[t]),r=o(t)??o("en");if("string"==typeof r)return r;console.error(`translation not found : ${e}`)}const Se=l`
  :host {
    --rts-radius: var(--ha-card-border-radius, 12px);
    --rts-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
  }

  ha-card {
    display: flex;
    flex-direction: column;
    margin: 8px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin: 0 0 8px;
  }

  .hint {
    font-size: 13px;
    color: var(--secondary-text-color);
    margin: 4px 0 0;
  }

  input, select {
    box-sizing: border-box;
    height: 40px;
    padding: 0 12px;
    font: inherit;
    font-size: 15px;
    color: var(--primary-text-color);
    background-color: var(--input-fill-color, var(--secondary-background-color));
    border: 1px solid var(--rts-divider);
    border-bottom: 1px solid var(--input-idle-line-color, var(--secondary-text-color));
    border-radius: 4px 4px 0 0;
    outline: none;
  }

  input:focus, select:focus {
    border-bottom: 2px solid var(--primary-color);
  }

  input:disabled, select:disabled {
    opacity: 0.5;
  }

  label.field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    --mdc-icon-size: 20px;
  }

  .icon-btn:hover:not(:disabled) {
    background-color: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .icon-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .icon-btn.danger:hover:not(:disabled) {
    color: var(--error-color);
  }

  .icon-btn.control {
    color: var(--primary-color);
    background-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  }

  .icon-btn.control:hover:not(:disabled) {
    background-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
    color: var(--primary-color);
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid var(--rts-divider);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .dialog-content {
    line-height: 1.5;
    color: var(--primary-text-color);
  }

  .dialog-content input, .dialog-content select {
    width: 100%;
    margin-top: 8px;
  }
`;var Te=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};class Ee extends he{constructor(){super(...arguments),this.contentKey=void 0}setContentKey(e){this.contentKey=e}async open(){await this.updateComplete,this.dialogEl.open||this.dialogEl.showModal();const e=this.renderRoot.querySelector("[autofocus]");e?.focus()}finish(e){this.dialogEl.open&&this.dialogEl.close(),this.onClosed(e)}t(e){return Ae(e,this.hass.language)}onBackdropClick(e){e.target===this.dialogEl&&this.finish(!1)}onCancel(e){e.preventDefault(),this.finish(!1)}render(){return W`
      <dialog @click=${this.onBackdropClick} @cancel=${this.onCancel}>
        <div class="surface">
          <h2 class="title">${this.contentKey?this.t(`panel.dialog.title.${this.contentKey}`):""}</h2>
          <div class="dialog-content">${this.renderBody()}</div>
          <div class="actions">
            <ha-button appearance="plain" @click=${()=>{this.finish(!1)}}>
              ${this.t("panel.dialog.cancel")}
            </ha-button>
            <ha-button @click=${()=>{this.finish(!0)}}>
              ${this.t("panel.dialog.confirm")}
            </ha-button>
          </div>
        </div>
      </dialog>
    `}static get styles(){return[Se,l`
      dialog {
        padding: 0;
        border: none;
        border-radius: var(--ha-dialog-border-radius, 24px);
        width: min(520px, calc(100vw - 32px));
        background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
        color: var(--primary-text-color);
        box-shadow: var(--dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.3));
        outline: none;
      }

      dialog::backdrop {
        background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.5));
      }

      .surface {
        padding: 24px;
      }

      .title {
        margin: 0 0 16px;
        font-size: 22px;
        font-weight: 400;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
      }
    `]}}Te([ge({attribute:!1})],Ee.prototype,"hass",void 0),Te([ye()],Ee.prototype,"contentKey",void 0),Te([be("dialog")],Ee.prototype,"dialogEl",void 0);var ke=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let Oe=class extends Ee{constructor(){super(...arguments),this.name=""}async open(){await this.updateComplete,this.input.value=this.name??"",await super.open(),this.input.select()}onClosed(e){const t=this.input.value.trim();t&&this.closed(e,t)}renderBody(){return W`
      <form @submit=${e=>{e.preventDefault(),this.finish(!0)}}>
        <input type="text" id="shutterName" autocomplete="off" autofocus .value=${this.name??""}>
      </form>`}};ke([ge({attribute:!1})],Oe.prototype,"closed",void 0),ke([ge({attribute:!1})],Oe.prototype,"name",void 0),ke([be("#shutterName")],Oe.prototype,"input",void 0),Oe=ke([ue("rts-link-rename-dialog")],Oe);class Pe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Re extends Pe{constructor(e){if(super(e),this.it=Y,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Y||null==e)return this._t=void 0,this.it=e;if(e===J)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Re.directiveName="unsafeHTML",Re.resultType=1;const De=(e=>(...t)=>({_$litDirective$:e,values:t}))(Re);var je=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let Ue=class extends Ee{onClosed(e){this.closed(e)}renderBody(){return this.contentKey?W`${De(this.t(`panel.dialog.content.${this.contentKey}`))}`:W``}};var Ne;function Me(e){return Object.values(e).reduce((e,t)=>(Object(t)instanceof String&&e.push(t),e),[])}je([ge({attribute:!1})],Ue.prototype,"closed",void 0),Ue=je([ue("rts-link-confirm-dialog")],Ue),function(e){e.SHUTTER="shutter",e.BUTTON="button"}(Ne||(Ne={}));var He=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let ze=class extends Ee{constructor(){super(...arguments),this.type=Ne.SHUTTER}setSelected(e){this.type=e}async open(){await this.updateComplete,this.select.value=this.type,await super.open()}onClosed(e){const t=this.select.value;t&&this.closed(e,t)}renderBody(){return W`
      <select id="coverType" autofocus .value=${this.type}>
        ${Me(Ne).map(e=>W`
          <option value=${e} ?selected=${e===this.type}>${this.t(`panel.coverType.${e}`)}</option>`)}
      </select>`}};He([ge({attribute:!1})],ze.prototype,"closed",void 0),He([ye()],ze.prototype,"type",void 0),He([be("#coverType")],ze.prototype,"select",void 0),ze=He([ue("rts-link-change-type-dialog")],ze);var Be,Ie=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};!function(e){e[e.add=0]="add",e[e.remove=1]="remove",e[e.rename=2]="rename",e[e.changeType=3]="changeType"}(Be||(Be={}));const Le={[Ne.SHUTTER]:"mdi:window-shutter",[Ne.BUTTON]:"mdi:gesture-tap-button"};let qe=class extends he{constructor(){super(...arguments),this.disabled=!1,this.pendingId=null,this.selectedCover=void 0,this.btnClicked=void 0}t(e){return Ae(e,this.hass.language)}async command(e,t){this.pendingId=e.id;try{await this.sendCommand(e,t)}finally{this.pendingId=null}}iconButton(e,t,o,r="",i=this.disabled){return W`
      <button class="icon-btn ${r}" title=${t} aria-label=${t} .disabled=${i} @click=${o}>
        <ha-icon icon=${e}></ha-icon>
      </button>`}controls(e){const t=this.disabled||null!==this.pendingId;return(e.cover_type??Ne.SHUTTER)===Ne.BUTTON?W`${this.iconButton("mdi:gesture-tap",this.t("panel.control.press"),()=>{this.command(e,"press")},"control",t)}`:W`
      ${this.iconButton("mdi:arrow-up",this.t("panel.control.up"),()=>{this.command(e,"up")},"control",t)}
      ${this.iconButton("mdi:star-outline",this.t("panel.control.my"),()=>{this.command(e,"stop")},"control",t)}
      ${this.iconButton("mdi:arrow-down",this.t("panel.control.down"),()=>{this.command(e,"down")},"control",t)}
    `}row(e){const t=e.cover_type??Ne.SHUTTER;return W`
      <div class="row">
        <div class="identity">
          <div class="type-icon">
            ${this.pendingId===e.id?W`<div class="spinner"></div>`:W`<ha-icon icon=${Le[t]??"mdi:remote"}></ha-icon>`}
          </div>
          <div class="text">
            <div class="name">${e.name}</div>
            <div class="secondary">${this.t(`panel.coverType.${t}`)} · ${this.t("panel.id")} ${e.id}</div>
          </div>
        </div>
        <div class="controls">${this.controls(e)}</div>
        <div class="actions">
          ${this.iconButton("mdi:pencil",this.t("panel.rename"),()=>{this.openDialog(e,Be.rename,"rename")})}
          ${this.iconButton("mdi:swap-horizontal",this.t("panel.changeType"),()=>{this.openDialog(e,Be.changeType,"changeType")})}
          ${this.iconButton("mdi:link-variant-plus",this.t("panel.add"),()=>{this.openDialog(e,Be.add,"add")})}
          ${this.iconButton("mdi:delete-outline",this.t("panel.delete"),()=>{this.openDialog(e,Be.remove,"remove")},"danger")}
        </div>
      </div>`}openDialog(e,t,o){let r;switch(this.selectedCover=e,this.btnClicked=t,t){case Be.rename:r=this.renameDialog,r&&(r.name=e.name??"");break;case Be.changeType:r=this.changeTypeDialog,r&&r.setSelected(e.cover_type??Ne.SHUTTER);break;default:r=this.confirmDialog}null!=r&&(r.setContentKey(o),r.open())}handleClosedDialog(e){const t=this.selectedCover,o=this.btnClicked;if(this.selectedCover=void 0,this.btnClicked=void 0,e&&t&&void 0!==o)switch(o){case Be.add:this.addShutter(t);break;case Be.remove:this.removeCover(t);break;case Be.rename:this.rename(t);break;case Be.changeType:this.changeType(t)}}handleClosedRenameDialog(e,t){t&&this.selectedCover&&(e&&(this.selectedCover={...this.selectedCover,name:t}),this.handleClosedDialog(e))}handleClosedChangeTypeDialog(e,t){t&&this.selectedCover&&(e&&(this.selectedCover={...this.selectedCover,cover_type:t}),this.handleClosedDialog(e))}render(){let e;return e=void 0===this.datas?W`<div class="empty"><div class="spinner"></div></div>`:0===this.datas.length?W`
        <div class="empty">
          <ha-icon icon="mdi:window-shutter-open"></ha-icon>
          <div>${this.t("panel.empty")}</div>
        </div>`:W`<div class="list">${this.datas.map(e=>this.row(e))}</div>`,W`
      ${e}
      <rts-link-confirm-dialog .closed=${this.handleClosedDialog.bind(this)} .hass=${this.hass}></rts-link-confirm-dialog>
      <rts-link-rename-dialog .closed=${this.handleClosedRenameDialog.bind(this)} .hass=${this.hass}></rts-link-rename-dialog>
      <rts-link-change-type-dialog .closed=${this.handleClosedChangeTypeDialog.bind(this)} .hass=${this.hass}></rts-link-change-type-dialog>
    `}static get styles(){return[Se,l`
      .list {
        border: 1px solid var(--rts-divider);
        border-radius: 8px;
        overflow: hidden;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 8px 8px 12px;
        border-bottom: 1px solid var(--rts-divider);
      }

      .row:last-child {
        border-bottom: none;
      }

      .row:hover {
        background-color: var(--secondary-background-color);
      }

      .identity {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1 1 auto;
        min-width: 0;
      }

      .type-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 50%;
        background-color: var(--secondary-background-color);
        color: var(--state-icon-color, var(--primary-color));
      }

      .row:hover .type-icon {
        background-color: var(--card-background-color);
      }

      .text {
        min-width: 0;
      }

      .name {
        font-size: 16px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .secondary {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .controls, .actions {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }

      .controls {
        padding-right: 8px;
        border-right: 1px solid var(--rts-divider);
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 32px 16px;
        color: var(--secondary-text-color);
        --mdc-icon-size: 40px;
      }

      /* Narrow screens: actions go on a second line */
      @media (max-width: 600px) {
        .row {
          flex-wrap: wrap;
        }
        .identity {
          flex-basis: 100%;
        }
        .controls {
          padding-right: 0;
          border-right: none;
        }
        .actions {
          margin-left: auto;
          gap: 0;
        }
      }
    `]}};Ie([ge({attribute:!1})],qe.prototype,"hass",void 0),Ie([ge({type:Boolean})],qe.prototype,"disabled",void 0),Ie([ge({attribute:!1})],qe.prototype,"removeCover",void 0),Ie([ge({attribute:!1})],qe.prototype,"addShutter",void 0),Ie([ge({attribute:!1})],qe.prototype,"rename",void 0),Ie([ge({attribute:!1})],qe.prototype,"changeType",void 0),Ie([ge({attribute:!1})],qe.prototype,"sendCommand",void 0),Ie([ge({attribute:!1})],qe.prototype,"datas",void 0),Ie([ye()],qe.prototype,"pendingId",void 0),Ie([be("rts-link-confirm-dialog")],qe.prototype,"confirmDialog",void 0),Ie([be("rts-link-rename-dialog")],qe.prototype,"renameDialog",void 0),Ie([be("rts-link-change-type-dialog")],qe.prototype,"changeTypeDialog",void 0),qe=Ie([ue("rts-link-covers-table")],qe);var Ve=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let Ke=class extends he{constructor(){super(...arguments),this.error=null,this.success=null,this.coversData=void 0,this.busy=null}t(e){return Ae(e,this.hass.language)}firstUpdated(e){this.updateCoversData()}openCreateDialog(e){if(e.preventDefault(),!this.nameInput.value.trim())return this.error=this.t("panel.error.emptyField"),void this.nameInput.focus();this.error=null,this.confirmDialog.setContentKey("create"),this.confirmDialog.open()}handleAdd(e){if(!e)return;const t=this.nameInput.value.trim(),o=this.typeSelect.value;t&&o?this.run("create",async()=>await(async(e,t,o)=>await e.callApi("POST","rts_link/cover/new",{name:t,type:o}))(this.hass,t,o)).then(e=>{e&&(this.nameInput.value="")}):this.error=this.t("panel.error.emptyField")}handleAddShutter(e){this.run("add",async()=>await(async(e,t)=>await e.callApi("POST","rts_link/cover/add",{id:t}))(this.hass,e.id))}handleDelete(e){this.run("remove",async()=>await(async(e,t)=>await e.callApi("POST","rts_link/cover/remove",{id:t}))(this.hass,e.id))}handleRename(e){this.run("rename",async()=>await(async(e,t,o)=>await e.callApi("POST","rts_link/cover/rename",{id:t,name:o}))(this.hass,e.id,e.name))}handleChangeType(e){this.run("changeType",async()=>await(async(e,t,o)=>await e.callApi("POST","rts_link/cover/type",{id:t,type:o}))(this.hass,e.id,e.cover_type??Ne.SHUTTER))}async handleCommand(e,t){this.error=null,this.success=null;try{await(async(e,t,o)=>{await e.callWS({type:"rts_link_send_command",rts_id:t,command:o})})(this.hass,e.id,t)}catch(t){this.error=`${this.t("panel.error.command")} (${e.name})`}}async run(e,t){this.error=null,this.success=null,this.busy=e;let o=!1;try{o=(await t()).success}catch(e){o=!1}return this.busy=null,o?(this.success=this.t(`panel.success.${e}`),this.updateCoversData()):this.error=this.t(`panel.error.${e}`),o}updateCoversData(){(async e=>await e.callWS({type:"rts_link_get_all_covers"}))(this.hass).then(e=>{this.coversData=[...e].sort((e,t)=>e.name.localeCompare(t.name))}).catch(e=>{this.coversData=[],this.error=e.message??this.t("error")})}requestUpdate(e,t){super.requestUpdate(e,t),"panel"===e&&this.updateCoversData()}render(){const e=null!==this.busy;return W`
      <ha-card>
        <div class="header">
          <ha-icon icon="mdi:remote"></ha-icon>
          <span>${this.t("panel.title")}</span>
        </div>

        ${this.error?W`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${()=>{this.error=null}}>${this.error}</ha-alert>`:Y}
        ${this.success?W`<ha-alert alert-type="success" dismissable @alert-dismissed-clicked=${()=>{this.success=null}}>${this.success}</ha-alert>`:Y}
        ${this.busy?W`<div class="busy"><div class="spinner"></div>${this.t(`panel.busy.${this.busy}`)}</div>`:Y}

        <div class="card-content">
          <section>
            <h3 class="section-title">${this.t("panel.newRemote")}</h3>
            <form class="add-form" @submit=${this.openCreateDialog}>
              <label class="field name">
                ${this.t("panel.name")}
                <input type="text" id="shutterName" autocomplete="off" .disabled=${e}
                       placeholder=${this.t("panel.namePlaceholder")}>
              </label>
              <label class="field">
                ${this.t("panel.type")}
                <select id="coverType" .disabled=${e}>
                  ${Me(Ne).map(e=>W`<option value=${e}>${this.t(`panel.coverType.${e}`)}</option>`)}
                </select>
              </label>
              <ha-button class="create" .disabled=${e} @click=${this.openCreateDialog}>
                <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                ${this.t("panel.create")}
              </ha-button>
            </form>
          </section>

          <section>
            <h3 class="section-title">
              ${this.t("panel.remotes")}${this.coversData?W` <span class="count">${this.coversData.length}</span>`:Y}
            </h3>
            <rts-link-covers-table
              .hass=${this.hass}
              .datas=${this.coversData}
              .disabled=${e}
              .removeCover=${this.handleDelete.bind(this)}
              .addShutter=${this.handleAddShutter.bind(this)}
              .rename=${this.handleRename.bind(this)}
              .changeType=${this.handleChangeType.bind(this)}
              .sendCommand=${this.handleCommand.bind(this)}
            ></rts-link-covers-table>
          </section>
        </div>
      </ha-card>
      <rts-link-confirm-dialog .closed=${this.handleAdd.bind(this)} .hass=${this.hass}></rts-link-confirm-dialog>
    `}static get styles(){return[Se,l`
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 16px 8px;
        font-size: 20px;
        color: var(--primary-text-color);
      }

      .header ha-icon {
        color: var(--primary-color);
      }

      ha-alert {
        display: block;
        margin: 0 16px 8px;
      }

      .busy {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 16px 8px;
        padding: 10px 12px;
        border-radius: 8px;
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 8px 16px 16px;
      }

      .add-form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 12px;
      }

      .add-form .name {
        flex: 1 1 200px;
      }

      .add-form input {
        width: 100%;
      }

      .count {
        display: inline-block;
        min-width: 20px;
        padding: 0 6px;
        margin-left: 4px;
        border-radius: 10px;
        text-align: center;
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      :host([narrow]) .add-form .create {
        width: 100%;
      }
    `]}};Ve([ge({attribute:!1})],Ke.prototype,"hass",void 0),Ve([ge({attribute:!1})],Ke.prototype,"panel",void 0),Ve([ge({type:Boolean,reflect:!0})],Ke.prototype,"narrow",void 0),Ve([ge({attribute:!1})],Ke.prototype,"reload",void 0),Ve([ye()],Ke.prototype,"error",void 0),Ve([ye()],Ke.prototype,"success",void 0),Ve([ye()],Ke.prototype,"coversData",void 0),Ve([ye()],Ke.prototype,"busy",void 0),Ve([be("rts-link-confirm-dialog")],Ke.prototype,"confirmDialog",void 0),Ve([be("#shutterName")],Ke.prototype,"nameInput",void 0),Ve([be("#coverType")],Ke.prototype,"typeSelect",void 0),Ke=Ve([ue("rts-link-covers-card")],Ke);var Fe=function(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let We=class extends he{render(){return W`
            <div class="header">
                <div class="toolbar">
                    <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
                    <div class="main-title">RTS Link</div>
                    <div class="version">
                            v${"0.0.0"}
                    </div>
                </div>
            </div>
            <div class="view">
                ${this.getCards()}
            </div>
        `}reload(){const e=this.shadowRoot?.querySelectorAll(".card");void 0!==e&&e.forEach(e=>{e.requestUpdate("panel")})}getCards(){return W`
            <rts-link-covers-card class="card" .hass=${this.hass} .narrow=${this.narrow} .panel=${this.panel} .reload="${this.reload.bind(this)}"></rts-link-covers-card>
        `}};We.styles=l`
          .header {
            background-color: var(--app-header-background-color);
            color: var(--app-header-text-color, white);
            border-bottom: var(--app-header-border-bottom, none);
          }
          .toolbar {
            height: var(--header-height);
            display: flex;
            align-items: center;
            font-size: 20px;
            padding: 0 16px;
            font-weight: 400;
            box-sizing: border-box;
          }
          .main-title {
            margin: 0 0 0 24px;
            line-height: 20px;
            flex-grow: 1;
          }
          .version {
            font-size: 14px;
            font-weight: 500;
            color: rgba(var(--rgb-text-primary-color), 0.9);
          }
          .view {
            box-sizing: border-box;
            min-height: calc(100vh - var(--header-height, 56px));
            padding: 16px 8px 24px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            background-color: var(--primary-background-color);
          }
          .view > * {
            width: 100%;
            max-width: 760px;
          }
    `,Fe([ge()],We.prototype,"hass",void 0),Fe([ge()],We.prototype,"panel",void 0),Fe([ge({type:Boolean,reflect:!0})],We.prototype,"narrow",void 0),We=Fe([ue("rts-link-panel")],We)})();