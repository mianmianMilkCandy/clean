(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const Pt=globalThis,Cr=Pt.ShadowRoot&&(Pt.ShadyCSS===void 0||Pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pr=Symbol(),Ur=new WeakMap;let ha=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Pr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Cr&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=Ur.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Ur.set(t,e))}return e}toString(){return this.cssText}};const go=a=>new ha(typeof a=="string"?a:a+"",void 0,Pr),I=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((r,o,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[i+1],a[0]);return new ha(t,a,Pr)},xo=(a,e)=>{if(Cr)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),o=Pt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,a.appendChild(r)}},Hr=Cr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return go(t)})(a):a;const{is:_o,defineProperty:wo,getOwnPropertyDescriptor:ko,getOwnPropertyNames:Co,getOwnPropertySymbols:Po,getPrototypeOf:So}=Object,It=globalThis,qr=It.trustedTypes,$o=qr?qr.emptyScript:"",Ao=It.reactiveElementPolyfillSupport,tt=(a,e)=>a,St={toAttribute(a,e){switch(e){case Boolean:a=a?$o:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Sr=(a,e)=>!_o(a,e),jr={attribute:!0,type:String,converter:St,reflect:!1,useDefault:!1,hasChanged:Sr};Symbol.metadata??=Symbol("metadata"),It.litPropertyMetadata??=new WeakMap;let Ye=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=jr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&wo(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:i}=ko(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const s=o?.call(this);i?.call(this,n),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??jr}static _$Ei(){if(this.hasOwnProperty(tt("elementProperties")))return;const e=So(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(tt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(tt("properties"))){const t=this.properties,r=[...Co(t),...Po(t)];for(const o of r)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(Hr(o))}else e!==void 0&&t.push(Hr(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const i=(r.converter?.toAttribute!==void 0?r.converter:St).toAttribute(t,r.type);this._$Em=e,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const i=r.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:St;this._$Em=o;const s=n.fromAttribute(t,i.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,r,o=!1,i){if(e!==void 0){const n=this.constructor;if(o===!1&&(i=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??Sr)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,i]of r){const{wrapped:n}=i,s=this[o];n!==!0||this._$AL.has(o)||s===void 0||this.C(o,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Ye.elementStyles=[],Ye.shadowRootOptions={mode:"open"},Ye[tt("elementProperties")]=new Map,Ye[tt("finalized")]=new Map,Ao?.({ReactiveElement:Ye}),(It.reactiveElementVersions??=[]).push("2.1.2");const $r=globalThis,Yr=a=>a,$t=$r.trustedTypes,Gr=$t?$t.createPolicy("lit-html",{createHTML:a=>a}):void 0,fa="$lit$",Te=`lit$${Math.random().toFixed(9).slice(2)}$`,ma="?"+Te,To=`<${ma}>`,Me=document,ot=()=>Me.createComment(""),it=a=>a===null||typeof a!="object"&&typeof a!="function",Ar=Array.isArray,Eo=a=>Ar(a)||typeof a?.[Symbol.iterator]=="function",Yt=`[ 	
\f\r]`,Qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kr=/-->/g,Xr=/>/g,Oe=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wr=/'/g,Zr=/"/g,va=/^(?:script|style|textarea|title)$/i,Do=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),y=Do(1),ce=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Jr=new WeakMap,Le=Me.createTreeWalker(Me,129);function ba(a,e){if(!Ar(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gr!==void 0?Gr.createHTML(e):e}const Io=(a,e)=>{const t=a.length-1,r=[];let o,i=e===2?"<svg>":e===3?"<math>":"",n=Qe;for(let s=0;s<t;s++){const d=a[s];let p,h,m=-1,b=0;for(;b<d.length&&(n.lastIndex=b,h=n.exec(d),h!==null);)b=n.lastIndex,n===Qe?h[1]==="!--"?n=Kr:h[1]!==void 0?n=Xr:h[2]!==void 0?(va.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=Oe):h[3]!==void 0&&(n=Oe):n===Oe?h[0]===">"?(n=o??Qe,m=-1):h[1]===void 0?m=-2:(m=n.lastIndex-h[2].length,p=h[1],n=h[3]===void 0?Oe:h[3]==='"'?Zr:Wr):n===Zr||n===Wr?n=Oe:n===Kr||n===Xr?n=Qe:(n=Oe,o=void 0);const k=n===Oe&&a[s+1].startsWith("/>")?" ":"";i+=n===Qe?d+To:m>=0?(r.push(p),d.slice(0,m)+fa+d.slice(m)+Te+k):d+Te+(m===-2?s:k)}return[ba(a,i+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class nt{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let i=0,n=0;const s=e.length-1,d=this.parts,[p,h]=Io(e,t);if(this.el=nt.createElement(p,r),Le.currentNode=this.el.content,t===2||t===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=Le.nextNode())!==null&&d.length<s;){if(o.nodeType===1){if(o.hasAttributes())for(const m of o.getAttributeNames())if(m.endsWith(fa)){const b=h[n++],k=o.getAttribute(m).split(Te),x=/([.?@])?(.*)/.exec(b);d.push({type:1,index:i,name:x[2],strings:k,ctor:x[1]==="."?Oo:x[1]==="?"?Fo:x[1]==="@"?Lo:zt}),o.removeAttribute(m)}else m.startsWith(Te)&&(d.push({type:6,index:i}),o.removeAttribute(m));if(va.test(o.tagName)){const m=o.textContent.split(Te),b=m.length-1;if(b>0){o.textContent=$t?$t.emptyScript:"";for(let k=0;k<b;k++)o.append(m[k],ot()),Le.nextNode(),d.push({type:2,index:++i});o.append(m[b],ot())}}}else if(o.nodeType===8)if(o.data===ma)d.push({type:2,index:i});else{let m=-1;for(;(m=o.data.indexOf(Te,m+1))!==-1;)d.push({type:7,index:i}),m+=Te.length-1}i++}}static createElement(e,t){const r=Me.createElement("template");return r.innerHTML=e,r}}function Ke(a,e,t=a,r){if(e===ce)return e;let o=r!==void 0?t._$Co?.[r]:t._$Cl;const i=it(e)?void 0:e._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(a),o._$AT(a,t,r)),r!==void 0?(t._$Co??=[])[r]=o:t._$Cl=o),o!==void 0&&(e=Ke(a,o._$AS(a,e.values),o,r)),e}class zo{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??Me).importNode(t,!0);Le.currentNode=o;let i=Le.nextNode(),n=0,s=0,d=r[0];for(;d!==void 0;){if(n===d.index){let p;d.type===2?p=new lt(i,i.nextSibling,this,e):d.type===1?p=new d.ctor(i,d.name,d.strings,this,e):d.type===6&&(p=new Ro(i,this,e)),this._$AV.push(p),d=r[++s]}n!==d?.index&&(i=Le.nextNode(),n++)}return Le.currentNode=Me,o}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class lt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ke(this,e,t),it(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==ce&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Eo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&it(this._$AH)?this._$AA.nextSibling.data=e:this.T(Me.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=nt.createElement(ba(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{const i=new zo(o,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=Jr.get(e.strings);return t===void 0&&Jr.set(e.strings,t=new nt(e)),t}k(e){Ar(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const i of e)o===t.length?t.push(r=new lt(this.O(ot()),this.O(ot()),this,this.options)):r=t[o],r._$AI(i),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const r=Yr(e).nextSibling;Yr(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class zt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,i){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=v}_$AI(e,t=this,r,o){const i=this.strings;let n=!1;if(i===void 0)e=Ke(this,e,t,0),n=!it(e)||e!==this._$AH&&e!==ce,n&&(this._$AH=e);else{const s=e;let d,p;for(e=i[0],d=0;d<i.length-1;d++)p=Ke(this,s[r+d],t,d),p===ce&&(p=this._$AH[d]),n||=!it(p)||p!==this._$AH[d],p===v?e=v:e!==v&&(e+=(p??"")+i[d+1]),this._$AH[d]=p}n&&!o&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oo extends zt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class Fo extends zt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class Lo extends zt{constructor(e,t,r,o,i){super(e,t,r,o,i),this.type=5}_$AI(e,t=this){if((e=Ke(this,e,t,0)??v)===ce)return;const r=this._$AH,o=e===v&&r!==v||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==v&&(r===v||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ro{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Ke(this,e)}}const Mo=$r.litHtmlPolyfillSupport;Mo?.(nt,lt),($r.litHtmlVersions??=[]).push("3.3.3");const ya=(a,e,t)=>{const r=t?.renderBefore??e;let o=r._$litPart$;if(o===void 0){const i=t?.renderBefore??null;r._$litPart$=o=new lt(e.insertBefore(ot(),i),i,void 0,t??{})}return o._$AI(a),o};const Tr=globalThis;let O=class extends Ye{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ya(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ce}};O._$litElement$=!0,O.finalized=!0,Tr.litElementHydrateSupport?.({LitElement:O});const Bo=Tr.litElementPolyfillSupport;Bo?.({LitElement:O});(Tr.litElementVersions??=[]).push("4.2.2");const B=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};const No={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:Sr},Vo=(a=No,e,t)=>{const{kind:r,metadata:o}=t;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),r==="setter"&&((a=Object.create(a)).wrapped=!0),i.set(t.name,a),r==="accessor"){const{name:n}=t;return{set(s){const d=e.get.call(this);e.set.call(this,s),this.requestUpdate(n,d,a,!0,s)},init(s){return s!==void 0&&this.C(n,void 0,a,s),s}}}if(r==="setter"){const{name:n}=t;return function(s){const d=this[n];e.call(this,s),this.requestUpdate(n,d,a,!0,s)}}throw Error("Unsupported decorator location: "+r)};function f(a){return(e,t)=>typeof t=="object"?Vo(a,e,t):((r,o,i)=>{const n=o.hasOwnProperty(i);return o.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(o,i):void 0})(a,e,t)}function T(a){return f({...a,state:!0,attribute:!1})}const ga=(a,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(a,e,t),t);function J(a,e){return(t,r,o)=>{const i=n=>n.renderRoot?.querySelector(a)??null;return ga(t,r,{get(){return i(this)}})}}function Ot(a){return(e,t)=>{const{slot:r,selector:o}=a??{},i="slot"+(r?`[name=${r}]`:":not([name])");return ga(e,t,{get(){const n=this.renderRoot?.querySelector(i),s=n?.assignedElements(a)??[];return o===void 0?s:s.filter(d=>d.matches(o))}})}}function c(a,e,t,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,e,t,r);else for(var s=a.length-1;s>=0;s--)(n=a[s])&&(i=(o<3?n(i):o>3?n(e,t,i):n(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i}const Ft=I`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:max(48px,100%);left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;Ft.styleSheet;const xa=Symbol("attachableController");let _a;_a=new MutationObserver(a=>{for(const e of a)e.target[xa]?.hostConnected()});class wa{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[xa]=this,_a?.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}const Uo=["focusin","focusout","pointerdown"];class Er extends O{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new wa(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){if(!e[Qr]){switch(e.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[Qr]=!0}}onControlChange(e,t){for(const r of Uo)e?.removeEventListener(r,this),t?.addEventListener(r,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}c([f({type:Boolean,reflect:!0})],Er.prototype,"visible",void 0);c([f({type:Boolean,reflect:!0})],Er.prototype,"inward",void 0);const Qr=Symbol("handledByFocusRing");const ka=I`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;ka.styleSheet;let Zt=class extends Er{};Zt.styles=[ka];Zt=c([B("md-focus-ring")],Zt);const Ae={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Dr=a=>(...e)=>({_$litDirective$:a,values:e});let Ir=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const he=Dr(class extends Ir{constructor(a){if(super(a),a.type!==Ae.ATTRIBUTE||a.name!=="class"||a.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(e=>a[e]).join(" ")+" "}update(a,[e]){if(this.st===void 0){this.st=new Set,a.strings!==void 0&&(this.nt=new Set(a.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}const t=a.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||this.nt?.has(r)||(o?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return ce}});const Xe={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};const Ho=450,ea=225,qo=.2,jo=10,Yo=75,Go=.35,Ko="::after",Xo="forwards";var re;(function(a){a[a.INACTIVE=0]="INACTIVE",a[a.TOUCH_DELAY=1]="TOUCH_DELAY",a[a.HOLDING=2]="HOLDING",a[a.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(re||(re={}));const Wo=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],Zo=150,Jo=window.matchMedia("(forced-colors: active)");class ct extends O{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=re.INACTIVE,this.attachableController=new wa(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return y`<div class="surface ${he(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==re.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===re.HOLDING){this.state=re.WAITING_FOR_CLICK;return}if(this.state===re.TOUCH_DELAY){this.state=re.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=re.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=re.TOUCH_DELAY,await new Promise(t=>{setTimeout(t,Zo)}),this.state===re.TOUCH_DELAY&&(this.state=re.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===re.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===re.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:e,width:t}=this.getBoundingClientRect(),r=Math.max(e,t),o=Math.max(Go*r,Yo),i=this.currentCSSZoom??1,n=Math.floor(r*qo/i),d=Math.sqrt(t**2+e**2)+jo;this.initialSize=n;const p=(d+o)/n;this.rippleScale=`${p/i}`,this.rippleSize=`${n}px`}getNormalizedPointerEventCoords(e){const{scrollX:t,scrollY:r}=window,{left:o,top:i}=this.getBoundingClientRect(),n=t+o,s=r+i,{pageX:d,pageY:p}=e,h=this.currentCSSZoom??1;return{x:(d-n)/h,y:(p-s)/h}}getTranslationCoordinates(e){const{height:t,width:r}=this.getBoundingClientRect(),o=this.currentCSSZoom??1,i={x:(r/o-this.initialSize)/2,y:(t/o-this.initialSize)/2};let n;return e instanceof PointerEvent?n=this.getNormalizedPointerEventCoords(e):n={x:r/o/2,y:t/o/2},n={x:n.x-this.initialSize/2,y:n.y-this.initialSize/2},{startPoint:n,endPoint:i}}startPressAnimation(e){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();const{startPoint:t,endPoint:r}=this.getTranslationCoordinates(e),o=`${t.x}px, ${t.y}px`,i=`${r.x}px, ${r.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${i}) scale(${this.rippleScale})`]},{pseudoElement:Ko,duration:Ho,easing:Xe.STANDARD,fill:Xo})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=re.INACTIVE;const e=this.growAnimation;let t=1/0;if(typeof e?.currentTime=="number"?t=e.currentTime:e?.currentTime&&(t=e.currentTime.to("ms").value),t>=ea){this.pressed=!1;return}await new Promise(r=>{setTimeout(r,ea-t)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const t=e.buttons===1;return this.isTouch(e)||t}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!Jo?.matches)switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,t){for(const r of Wo)e?.removeEventListener(r,this),t?.addEventListener(r,this)}}c([f({type:Boolean,reflect:!0})],ct.prototype,"disabled",void 0);c([T()],ct.prototype,"hovered",void 0);c([T()],ct.prototype,"pressed",void 0);c([J(".surface")],ct.prototype,"mdRoot",void 0);const Ca=I`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;Ca.styleSheet;let Jt=class extends ct{};Jt.styles=[Ca];Jt=c([B("md-ripple")],Jt);const Pa=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],Qo=Pa.map(Sa);function Gt(a){return Qo.includes(a)}function Sa(a){return a.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}const bt=Symbol("privateIgnoreAttributeChangesFor");function Ie(a){var e;class t extends a{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(o,i,n){if(!Gt(o)){super.attributeChangedCallback(o,i,n);return}if(this[bt].has(o))return;this[bt].add(o),this.removeAttribute(o),this[bt].delete(o);const s=er(o);n===null?delete this.dataset[s]:this.dataset[s]=n,this.requestUpdate(er(o),i)}getAttribute(o){return Gt(o)?super.getAttribute(Qt(o)):super.getAttribute(o)}removeAttribute(o){super.removeAttribute(o),Gt(o)&&(super.removeAttribute(Qt(o)),this.requestUpdate())}}return e=bt,ei(t),t}function ei(a){for(const e of Pa){const t=Sa(e),r=Qt(t),o=er(t);a.createProperty(e,{attribute:t,noAccessor:!0}),a.createProperty(Symbol(r),{attribute:r,noAccessor:!0}),Object.defineProperty(a.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[o]??null},set(i){const n=this.dataset[o]??null;i!==n&&(i===null?delete this.dataset[o]:this.dataset[o]=i,this.requestUpdate(e,n))}})}}function Qt(a){return`data-${a}`}function er(a){return a.replace(/-\w/,e=>e[1].toUpperCase())}function $a(a){const e=new MouseEvent("click",{bubbles:!0});return a.dispatchEvent(e),e}function Aa(a){return a.currentTarget!==a.target||a.composedPath()[0]!==a.target||a.target.disabled?!1:!ti(a)}function ti(a){const e=tr;return e&&(a.preventDefault(),a.stopImmediatePropagation()),ri(),e}let tr=!1;async function ri(){tr=!0,await null,tr=!1}const le=Symbol("internals"),Kt=Symbol("privateInternals");function Lt(a){class e extends a{get[le](){return this[Kt]||(this[Kt]=this.attachInternals()),this[Kt]}}return e}const rt=Symbol("getFormValue"),rr=Symbol("getFormState");function Rt(a){class e extends a{get form(){return this[le].form}get labels(){return this[le].labels}get name(){return this.getAttribute("name")??""}set name(r){this.setAttribute("name",r)}get disabled(){return this.hasAttribute("disabled")}set disabled(r){this.toggleAttribute("disabled",!!r)}attributeChangedCallback(r,o,i){if(r==="name"||r==="disabled"){const n=r==="disabled"?o!==null:o;this.requestUpdate(r,n);return}super.attributeChangedCallback(r,o,i)}requestUpdate(r,o,i){super.requestUpdate(r,o,i),this[le].setFormValue(this[rt](),this[rr]())}[rt](){return this.getAttribute("value")}[rr](){return this[rt]()}formDisabledCallback(r){this.disabled=r}}return e.formAssociated=!0,c([f({noAccessor:!0})],e.prototype,"name",null),c([f({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}const Ta=Symbol("dispatchHooks");function Ea(a,e){const t=a[Ta];if(!t)throw new Error(`'${a.type}' event needs setupDispatchHooks().`);t.addEventListener("after",e,{once:!0})}const ta=new WeakMap;function Da(a,...e){let t=ta.get(a);t||(t=new Set,ta.set(a,t));for(const r of e)t.has(r)||(a.addEventListener(r,o=>{const i=new EventTarget;o[Ta]=i;const n=new AbortController,s=()=>{n.abort(),i.dispatchEvent(new Event("after"))},d=m=>function(){m.call(this),s()};o.stopPropagation=d(o.stopPropagation),o.stopImmediatePropagation=d(o.stopImmediatePropagation);const p=o.composedPath();let h;o.composed&&o.bubbles?h=p[p.length-1]:o.bubbles?h=p[0].getRootNode():h=p[0],h.addEventListener(r,()=>{s()},{once:!0,signal:n.signal})},{capture:!0}),t.add(r))}function Ia(a){class e extends a{get name(){return this.getAttribute("name")??""}set name(r){this.setAttribute("name",r)}constructor(...r){super(...r),this.type="submit",this.value="",Da(this,"click"),this.addEventListener("click",async o=>{const i=this.type==="reset",n=this.type==="submit",s=this[le],{form:d}=s;!d||!(n||i)||Ea(o,()=>{if(!o.defaultPrevented){if(i){d.reset();return}d.addEventListener("submit",p=>{Object.defineProperty(p,"submitter",{configurable:!0,enumerable:!0,get:()=>this})},{capture:!0,once:!0}),s.setFormValue(this.value),d.requestSubmit()}})})}}return c([f()],e.prototype,"type",void 0),c([f({reflect:!0})],e.prototype,"value",void 0),e}const ai=Ie(Ia(Rt(Lt(O))));class de extends ai{constructor(){super(),this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(){this.buttonElement?.focus()}blur(){this.buttonElement?.blur()}render(){const e=this.disabled||this.softDisabled,t=this.href?this.renderLink():this.renderButton(),r=this.href?"link":"button";return y`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${r}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${r}
        ?disabled="${e}"></md-ripple>
      ${t}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:r}=this;return y`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||v}
      aria-label="${e||v}"
      aria-haspopup="${t||v}"
      aria-expanded="${r||v}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:r}=this;return y`<a
      id="link"
      class="button"
      aria-label="${e||v}"
      aria-haspopup="${t||v}"
      aria-expanded="${r||v}"
      aria-disabled=${this.disabled||this.softDisabled||v}
      tabindex="${this.disabled&&!this.softDisabled?-1:v}"
      href=${this.href}
      download=${this.download||v}
      target=${this.target||v}
      >${this.renderContent()}
    </a>`}renderContent(){const e=y`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return y`
      <span class="touch"></span>
      ${this.trailingIcon?v:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:v}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!Aa(e)||!this.buttonElement||(this.focus(),$a(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}de.shadowRootOptions={mode:"open",delegatesFocus:!0};c([f({type:Boolean,attribute:"soft-disabled",reflect:!0})],de.prototype,"softDisabled",void 0);c([f()],de.prototype,"href",void 0);c([f()],de.prototype,"download",void 0);c([f()],de.prototype,"target",void 0);c([f({type:Boolean,attribute:"trailing-icon",reflect:!0})],de.prototype,"trailingIcon",void 0);c([f({type:Boolean,attribute:"has-icon",reflect:!0})],de.prototype,"hasIcon",void 0);c([J(".button")],de.prototype,"buttonElement",void 0);c([Ot({slot:"icon",flatten:!0})],de.prototype,"assignedIcons",void 0);class oi extends de{}const za=I`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;za.styleSheet;let ar=class extends oi{};ar.styles=[Ft,za];ar=c([B("md-text-button")],ar);var ii=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,Mt=(a,e,t,r)=>{for(var o=r>1?void 0:r?ni(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ii(e,t,o),o};const si=4200;let We=class extends O{constructor(){super(...arguments),this.message="",this.actionLabel="知道了",this.visible=!1,this.timer=0}show(a,e){this.message=a,e?.actionLabel&&(this.actionLabel=e.actionLabel),this.visible=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.dismiss(),si)}dismiss(){this.visible=!1,window.clearTimeout(this.timer)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){return y`
      <div class="bar ${this.visible?"visible":""}" role="status" aria-live="polite">
        <span class="text">${this.message}</span>
        <md-text-button @click=${this.dismiss}>${this.actionLabel}</md-text-button>
      </div>
    `}};We.styles=I`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 24px;
      display: flex;
      justify-content: center;
      pointer-events: none;
      z-index: 120;
    }
    .bar {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 288px;
      max-width: 560px;
      padding: 14px 12px 14px 20px;
      background: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
      border-radius: 8px;
      box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 2px 4px rgba(0, 0, 0, 0.24);
      transform: translateY(140%);
      opacity: 0;
      transition:
        transform 0.42s var(--app-ease-spring),
        opacity 0.3s var(--app-ease-standard);
    }
    .bar.visible {
      transform: translateY(0);
      opacity: 1;
    }
    .text {
      flex: 1;
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.4;
    }
    md-text-button {
      --md-text-button-label-text-color: var(--md-sys-color-inverse-primary);
      --md-text-button-hover-state-layer-color: var(--md-sys-color-inverse-primary);
      --md-text-button-focus-state-layer-color: var(--md-sys-color-inverse-primary);
      color: var(--md-sys-color-inverse-primary);
    }
  `;Mt([f({type:String})],We.prototype,"message",2);Mt([f({type:String})],We.prototype,"actionLabel",2);Mt([T()],We.prototype,"visible",2);We=Mt([B("app-snackbar")],We);class li extends O{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return y`<span class="shadow"></span>`}}const Oa=I`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;Oa.styleSheet;let or=class extends li{};or.styles=[Oa];or=c([B("md-elevation")],or);class ci extends de{renderElevationOrOutline(){return y`<md-elevation part="elevation"></md-elevation>`}}const Fa=I`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;Fa.styleSheet;const La=I`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;La.styleSheet;let ir=class extends ci{};ir.styles=[Ft,La,Fa];ir=c([B("md-filled-button")],ir);class di extends de{renderElevationOrOutline(){return y`<div class="outline"></div>`}}const Ra=I`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;Ra.styleSheet;let nr=class extends di{};nr.styles=[Ft,Ra];nr=c([B("md-outlined-button")],nr);function zr(a,e){e.bubbles&&(!a.shadowRoot||e.composed)&&e.stopPropagation();const t=Reflect.construct(e.constructor,[e.type,e]),r=a.dispatchEvent(t);return r||e.preventDefault(),r}const At=Symbol("createValidator"),Tt=Symbol("getValidityAnchor"),Xt=Symbol("privateValidator"),ge=Symbol("privateSyncValidity"),yt=Symbol("privateCustomValidationMessage");function Ma(a){var e;class t extends a{constructor(){super(...arguments),this[e]=""}get validity(){return this[ge](),this[le].validity}get validationMessage(){return this[ge](),this[le].validationMessage}get willValidate(){return this[ge](),this[le].willValidate}checkValidity(){return this[ge](),this[le].checkValidity()}reportValidity(){return this[ge](),this[le].reportValidity()}setCustomValidity(o){this[yt]=o,this[ge]()}requestUpdate(o,i,n){super.requestUpdate(o,i,n),this[ge]()}firstUpdated(o){super.firstUpdated(o),this[ge]()}[(e=yt,ge)](){this[Xt]||(this[Xt]=this[At]());const{validity:o,validationMessage:i}=this[Xt].getValidity(),n=!!this[yt],s=this[yt]||i;this[le].setValidity({...o,customError:n},s,this[Tt]()??void 0)}[At](){throw new Error("Implement [createValidator]")}[Tt](){throw new Error("Implement [getValidityAnchor]")}}return t}class Ba{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:r,validationMessage:o}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:o,validity:{badInput:r.badInput,customError:r.customError,patternMismatch:r.patternMismatch,rangeOverflow:r.rangeOverflow,rangeUnderflow:r.rangeUnderflow,stepMismatch:r.stepMismatch,tooLong:r.tooLong,tooShort:r.tooShort,typeMismatch:r.typeMismatch,valueMissing:r.valueMissing}},this.currentValidity}}class ui extends Ba{computeValidity(e){return this.checkboxControl||(this.checkboxControl=document.createElement("input"),this.checkboxControl.type="checkbox"),this.checkboxControl.checked=e.checked,this.checkboxControl.required=e.required,{validity:this.checkboxControl.validity,validationMessage:this.checkboxControl.validationMessage}}equals(e,t){return e.checked===t.checked&&e.required===t.required}copy({checked:e,required:t}){return{checked:e,required:t}}}const pi=Ie(Ma(Rt(Lt(O))));class be extends pi{constructor(){super(),this.checked=!1,this.indeterminate=!1,this.required=!1,this.value="on",this.prevChecked=!1,this.prevDisabled=!1,this.prevIndeterminate=!1,this.addEventListener("click",e=>{!Aa(e)||!this.input||(this.focus(),$a(this.input))})}update(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&(this.prevChecked=e.get("checked")??this.checked,this.prevDisabled=e.get("disabled")??this.disabled,this.prevIndeterminate=e.get("indeterminate")??this.indeterminate),super.update(e)}render(){const e=!this.prevChecked&&!this.prevIndeterminate,t=this.prevChecked&&!this.prevIndeterminate,r=this.prevIndeterminate,o=this.checked&&!this.indeterminate,i=this.indeterminate,n=he({disabled:this.disabled,selected:o||i,unselected:!o&&!i,checked:o,indeterminate:i,"prev-unselected":e,"prev-checked":t,"prev-indeterminate":r,"prev-disabled":this.prevDisabled}),{ariaLabel:s,ariaInvalid:d}=this;return y`
      <div class="container ${n}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${i?"mixed":v}
          aria-label=${s||v}
          aria-invalid=${d||v}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `}handleInput(e){const t=e.target;this.checked=t.checked,this.indeterminate=t.indeterminate}handleChange(e){zr(this,e)}[rt](){return!this.checked||this.indeterminate?null:this.value}[rr](){return String(this.checked)}formResetCallback(){this.checked=this.hasAttribute("checked")}formStateRestoreCallback(e){this.checked=e==="true"}[At](){return new ui(()=>this)}[Tt](){return this.input}}be.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0};c([f({type:Boolean})],be.prototype,"checked",void 0);c([f({type:Boolean})],be.prototype,"indeterminate",void 0);c([f({type:Boolean})],be.prototype,"required",void 0);c([f()],be.prototype,"value",void 0);c([T()],be.prototype,"prevChecked",void 0);c([T()],be.prototype,"prevDisabled",void 0);c([T()],be.prototype,"prevIndeterminate",void 0);c([J("input")],be.prototype,"input",void 0);const Na=I`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;Na.styleSheet;let sr=class extends be{};sr.styles=[Na];sr=c([B("md-checkbox")],sr);class Bt extends O{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}c([f({type:Boolean,reflect:!0})],Bt.prototype,"inset",void 0);c([f({type:Boolean,reflect:!0,attribute:"inset-start"})],Bt.prototype,"insetStart",void 0);c([f({type:Boolean,reflect:!0,attribute:"inset-end"})],Bt.prototype,"insetEnd",void 0);const Va=I`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;Va.styleSheet;let lr=class extends Bt{};lr.styles=[Va];lr=c([B("md-divider")],lr);const hi={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:Xe.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:Xe.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},fi={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:Xe.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:Xe.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};const mi=Ie(O);class Y extends mi{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>hi,this.getCloseAnimation=()=>fi,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),this.querySelector("[autofocus]")?.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const t=this.dialog;if(!t.open||this.isOpening){this.open=!1;return}const r=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=r;return}await this.animateDialog(this.getCloseAnimation()),t.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),t={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},r=this.open&&!this.noFocusTrap,o=y`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:i}=this;return y`
      <div class="scrim"></div>
      <dialog
        class=${he(t)}
        aria-label=${i||v}
        aria-labelledby=${this.hasHeadline?"headline":v}
        role=${this.type==="alert"?"alertdialog":v}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||v}>
        ${r?o:v}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||v}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${r?o:v}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(const t of e)this.handleAnchorIntersection(t)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){const t=e.target,{submitter:r}=e;t.getAttribute("method")!=="dialog"||!r||this.close(r.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const t=!zr(this,e);e.preventDefault(),!t&&this.close()}handleClose(){this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,this.dialog?.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){if(this.cancelAnimations?.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:t,scrim:r,container:o,headline:i,content:n,actions:s}=this;if(!t||!r||!o||!i||!n||!s)return;const{container:d,dialog:p,scrim:h,headline:m,content:b,actions:k}=e,x=[[t,p??[]],[r,h??[]],[o,d??[]],[i,m??[]],[n,b??[]],[s,k??[]]],_=[];for(const[w,R]of x)for(const z of R){const U=w.animate(...z);this.cancelAnimations.signal.addEventListener("abort",()=>{U.cancel()}),_.push(U)}await Promise.all(_.map(w=>w.finished.catch(()=>{})))}handleHeadlineChange(e){const t=e.target;this.hasHeadline=t.assignedElements().length>0}handleActionsChange(e){const t=e.target;this.hasActions=t.assignedElements().length>0}handleIconChange(e){const t=e.target;this.hasIcon=t.assignedElements().length>0}handleAnchorIntersection(e){const{target:t,isIntersecting:r}=e;t===this.topAnchor&&(this.isAtScrollTop=r),t===this.bottomAnchor&&(this.isAtScrollBottom=r)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){const[t,r]=this.getFirstAndLastFocusableChildren();if(!t||!r){this.dialog?.focus();return}const o=e.target===this.firstFocusTrap,i=!o,n=e.relatedTarget===t,s=e.relatedTarget===r,d=!n&&!s;if(i&&s||o&&d){t.focus();return}if(o&&n||i&&d){r.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,t=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const r=this.treewalker.currentNode;vi(r)&&(e||(e=r),t=r)}return[e,t]}}c([f({type:Boolean})],Y.prototype,"open",null);c([f({type:Boolean})],Y.prototype,"quick",void 0);c([f({attribute:!1})],Y.prototype,"returnValue",void 0);c([f()],Y.prototype,"type",void 0);c([f({type:Boolean,attribute:"no-focus-trap"})],Y.prototype,"noFocusTrap",void 0);c([J("dialog")],Y.prototype,"dialog",void 0);c([J(".scrim")],Y.prototype,"scrim",void 0);c([J(".container")],Y.prototype,"container",void 0);c([J(".headline")],Y.prototype,"headline",void 0);c([J(".content")],Y.prototype,"content",void 0);c([J(".actions")],Y.prototype,"actions",void 0);c([T()],Y.prototype,"isAtScrollTop",void 0);c([T()],Y.prototype,"isAtScrollBottom",void 0);c([J(".scroller")],Y.prototype,"scroller",void 0);c([J(".top.anchor")],Y.prototype,"topAnchor",void 0);c([J(".bottom.anchor")],Y.prototype,"bottomAnchor",void 0);c([J(".focus-trap")],Y.prototype,"firstFocusTrap",void 0);c([T()],Y.prototype,"hasHeadline",void 0);c([T()],Y.prototype,"hasActions",void 0);c([T()],Y.prototype,"hasIcon",void 0);function vi(a){const e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",t=":not(:disabled,[disabled])";return a.matches(e+t+':not([tabindex^="-"])')?!0:!a.localName.includes("-")||!a.matches(t)?!1:a.shadowRoot?.delegatesFocus??!1}const Ua=I`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;Ua.styleSheet;let cr=class extends Y{};cr.styles=[Ua];cr=c([B("md-dialog")],cr);class bi extends O{render(){return y`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}const Ha=I`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;Ha.styleSheet;let dr=class extends bi{};dr.styles=[Ha];dr=c([B("md-icon")],dr);const qa=Symbol.for(""),yi=a=>{if(a?.r===qa)return a?._$litStatic$},Et=(a,...e)=>({_$litStatic$:e.reduce((t,r,o)=>t+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+a[o+1],a[0]),r:qa}),ra=new Map,gi=a=>(e,...t)=>{const r=t.length;let o,i;const n=[],s=[];let d,p=0,h=!1;for(;p<r;){for(d=e[p];p<r&&(i=t[p],(o=yi(i))!==void 0);)d+=o+e[++p],h=!0;p!==r&&s.push(i),n.push(d),p++}if(p===r&&n.push(e[r]),h){const m=n.join("$$lit$$");(e=ra.get(m))===void 0&&(n.raw=n,ra.set(m,e=n)),t=s}return a(e,...t)},ja=gi(y);function aa(a,e=!0){return e&&getComputedStyle(a).getPropertyValue("direction").trim()==="rtl"}const xi=Ie(Ia(Rt(Lt(O))));class fe extends xi{constructor(){super(),this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.flipIcon=aa(this,this.flipIconInRtl),Da(this,"click"),this.addEventListener("click",e=>{if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}const t=this.selected;Ea(e,()=>{!this.toggle||this.disabled||e.defaultPrevented||(this.selected=!t,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))})})}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const e=this.href?Et`div`:Et`button`,{ariaLabel:t,ariaHasPopup:r,ariaExpanded:o}=this,i=t&&this.ariaLabelSelected,n=this.toggle?this.selected:v;let s=v;return this.href||(s=i&&this.selected?this.ariaLabelSelected:t),ja`<${e}
        class="icon-button ${he(this.getRenderClasses())}"
        id="button"
        aria-label="${s||v}"
        aria-haspopup="${!this.href&&r||v}"
        aria-expanded="${!this.href&&o||v}"
        aria-pressed="${n}"
        aria-disabled=${!this.href&&this.softDisabled||v}
        ?disabled="${!this.href&&this.disabled}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?v:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():v}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return y`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||v}"
        target="${this.target||v}"
        aria-label="${e||v}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return y`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return y`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return y`<span class="touch"></span>`}renderFocusRing(){return y`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const e=!this.href&&(this.disabled||this.softDisabled);return y`<md-ripple
      for=${this.href?"link":v}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=aa(this,this.flipIconInRtl),super.connectedCallback()}}fe.shadowRootOptions={mode:"open",delegatesFocus:!0};c([f({type:Boolean,attribute:"soft-disabled",reflect:!0})],fe.prototype,"softDisabled",void 0);c([f({type:Boolean,attribute:"flip-icon-in-rtl"})],fe.prototype,"flipIconInRtl",void 0);c([f()],fe.prototype,"href",void 0);c([f()],fe.prototype,"download",void 0);c([f()],fe.prototype,"target",void 0);c([f({attribute:"aria-label-selected"})],fe.prototype,"ariaLabelSelected",void 0);c([f({type:Boolean})],fe.prototype,"toggle",void 0);c([f({type:Boolean,reflect:!0})],fe.prototype,"selected",void 0);c([T()],fe.prototype,"flipIcon",void 0);const Ya=I`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;Ya.styleSheet;const Ga=I`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;Ga.styleSheet;let ur=class extends fe{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};ur.styles=[Ya,Ga];ur=c([B("md-icon-button")],ur);var _i=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,Or=(a,e,t,r)=>{for(var o=r>1?void 0:r?wi(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&_i(e,t,o),o};let st=class extends O{constructor(){super(...arguments),this.heading="C盘垃圾清理",this.scrolled=!1}render(){return y`
      <header>
        <span class="leading"><slot name="leading"></slot></span>
        <span class="title">${this.heading}</span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </header>
    `}};st.styles=I`
    :host {
      display: block;
      height: 64px;
      flex: 0 0 auto;
    }
    header {
      height: 64px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px 0 4px;
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      transition:
        background-color 0.25s var(--app-ease-standard),
        box-shadow 0.25s var(--app-ease-standard);
      position: relative;
      z-index: 10;
    }
    :host([scrolled]) header {
      background: var(--md-sys-color-surface-container);
      box-shadow: 0 1px 0 0 var(--md-sys-color-outline-variant);
    }
    .title {
      flex: 1;
      font-size: var(--md-sys-typescale-title-large-size);
      line-height: var(--md-sys-typescale-title-large-line-height);
      font-weight: var(--md-sys-typescale-title-large-weight);
      color: var(--md-sys-color-on-surface);
      padding-left: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .leading {
      color: var(--md-sys-color-on-surface-variant);
      display: flex;
      align-items: center;
    }
    .trailing {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `;Or([f({type:String})],st.prototype,"heading",2);Or([f({type:Boolean,reflect:!0})],st.prototype,"scrolled",2);st=Or([B("app-bar")],st);var ki=Object.defineProperty,Ci=Object.getOwnPropertyDescriptor,Be=(a,e,t,r)=>{for(var o=r>1?void 0:r?Ci(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ki(e,t,o),o};let we=class extends O{constructor(){super(...arguments),this.open=!1,this.heading="确认/取消",this.body="",this.confirmLabel="确定",this.cancelLabel="取消",this.iconName="info"}show(){this.open=!0}onClose(a){const e=this.renderRoot.querySelector("md-dialog");this.open=!1,e?.close(),this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}onDialogClosed(){this.open&&(this.open=!1,this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0})))}render(){return y`
      <md-dialog .open=${this.open} @closed=${()=>this.onDialogClosed()}>
        <div slot="headline" class="headline-row">
          <md-icon>${this.iconName}</md-icon>
          <span>${this.heading}</span>
        </div>
        <div slot="content" class="body">${this.body}</div>
        <div slot="actions" class="actions">
          <md-text-button @click=${()=>this.onClose("cancel")}>${this.cancelLabel}</md-text-button>
          <md-text-button @click=${()=>this.onClose("confirm")}>${this.confirmLabel}</md-text-button>
        </div>
      </md-dialog>
    `}};we.styles=I`
    :host {
      display: contents;
    }
    md-dialog {
      --md-dialog-container-shape: var(--app-shape-dialog);
      --md-dialog-container-color: var(--md-sys-color-surface-container-high);
    }
    .headline-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--app-font-family);
      font-size: var(--md-sys-typescale-headline-small-size);
      line-height: var(--md-sys-typescale-headline-small-line-height);
      font-weight: var(--md-sys-typescale-headline-small-weight);
      color: var(--md-sys-color-on-surface);
      padding: 6px 4px 0;
    }
    md-icon {
      color: var(--md-sys-color-primary);
      flex: 0 0 auto;
    }
    .body {
      margin: 16px 0 4px;
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.5;
      color: var(--md-sys-color-on-surface-variant);
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      padding-bottom: 4px;
    }
  `;Be([f({type:Boolean})],we.prototype,"open",2);Be([f({type:String})],we.prototype,"heading",2);Be([f({type:String})],we.prototype,"body",2);Be([f({type:String})],we.prototype,"confirmLabel",2);Be([f({type:String})],we.prototype,"cancelLabel",2);Be([f({type:String,attribute:"icon-name"})],we.prototype,"iconName",2);we=Be([B("app-confirm-dialog")],we);const Pi="";async function Fe(a,e){const t=new AbortController,r=await fetch(`${Pi}${a}`,{...e,signal:e?.signal??t.signal,headers:{"Content-Type":"application/json",...e?.headers??{}}});if(!r.ok){let o=`HTTP ${r.status}`;try{const i=await r.json();i?.error&&(o=i.error)}catch{}throw new Error(o)}return await r.json()}const pe={async health(){return Fe("/api/health")},async diskUsage(){return Fe("/api/disk-usage")},async scan(){return Fe("/api/scan",{method:"POST"})},async scanStart(){return Fe("/api/scan/start",{method:"POST"})},async scanProgress(){return Fe("/api/scan/progress")},async clean(a){return Fe("/api/clean",{method:"POST",body:JSON.stringify({paths:a})})},async submitFeedback(a){return Fe("/api/feedback",{method:"POST",body:JSON.stringify(a)})}},Si="c-drive-cleaner",$i=1;function Ai(){return new Promise((a,e)=>{const t=indexedDB.open(Si,$i);t.onupgradeneeded=()=>{const r=t.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv"),r.objectStoreNames.contains("feedback")||r.createObjectStore("feedback",{keyPath:"id"})},t.onsuccess=()=>a(t.result),t.onerror=()=>e(t.error)})}function qe(a,e,t){return Ai().then(r=>new Promise((o,i)=>{const n=r.transaction(a,e),s=t(n.objectStore(a));s.onsuccess=()=>o(s.result),s.onerror=()=>i(s.error),n.oncomplete=()=>r.close()}))}const W={async getKV(a){return qe("kv","readonly",e=>e.get(a))},async setKV(a,e){await qe("kv","readwrite",t=>t.put(e,a))},async removeKV(a){await qe("kv","readwrite",e=>e.delete(a))},async getDraft(){return W.getKV("feedback-draft")},async saveDraft(a){await W.setKV("feedback-draft",a)},async clearDraft(){await W.removeKV("feedback-draft")},async listFeedback(){return(await qe("feedback","readonly",e=>e.getAll())??[]).sort((e,t)=>t.submittedAt-e.submittedAt)},async addFeedback(a){await qe("feedback","readwrite",e=>e.add(a))},async clearFeedback(){await qe("feedback","readwrite",a=>a.clear())},async getScanCache(){return W.getKV("scan-cache")},async saveScanCache(a){await W.setKV("scan-cache",a)},async clearScanCache(){await W.removeKV("scan-cache")},async clearAll(){await W.clearDraft(),await W.clearFeedback(),await W.clearScanCache()}},gt=460,oa="cubic-bezier(0.34, 1.46, 0.64, 1)",ia="cubic-bezier(0.2, 0, 0, 1)";class Ti{constructor(){this.screenLookup=()=>null,this.navHandler=null,this.active={screen:"home",direction:"right"},this.animating=!1}init(e,t){this.screenLookup=e,this.navHandler=t,history.state||history.replaceState({screen:"home",direction:"right"},""),window.addEventListener("popstate",()=>this.handlePop())}get current(){return this.active.screen}get currentDetail(){return history.state?.detail}navigate(e,t){const r=this.active.screen,o={screen:e,direction:t.direction,detail:t.detail};history.pushState(o,""),this.navHandler?.(e,t),this.playForward(r,e,t.direction),this.active={screen:e,direction:t.direction}}back(){history.back()}handlePop(){const e=history.state??{screen:"home",direction:"right"},t={...this.active};this.navHandler?.(e.screen,{direction:e.direction,detail:e.detail}),this.playReverse(t,e.screen),this.active={screen:e.screen,direction:e.direction}}playForward(e,t,r){const o=this.screenLookup(e),i=this.screenLookup(t);if(!o||!i||e===t){i&&(i.style.visibility="visible"),o&&e!==t&&(o.style.visibility="hidden");return}const n=r==="bottom"?"Y":"X",s=`translate${n}(100%)`,d=`translate${n}(${r==="bottom"?"-14%":"-10%"})`;i.style.visibility="visible",i.style.zIndex="2",o.style.zIndex="1";const p=i.animate([{transform:s,opacity:.45},{transform:"translate(0, 0)",opacity:1}],{duration:gt,easing:oa,fill:"both"}),h=o.animate([{transform:"translate(0, 0)",opacity:1},{transform:d,opacity:0}],{duration:gt*.7,easing:ia,fill:"both"});let m=0;const b=()=>{m+=1,!(m<2)&&(h.cancel(),o.style.visibility="hidden",o.style.zIndex="0",i.style.zIndex="1")};p.onfinish=b,p.oncancel=b,this.animating}playReverse(e,t){const r=this.screenLookup(e.screen),o=this.screenLookup(t);if(!r||!o||e.screen===t){o&&(o.style.visibility="visible"),r&&e.screen!==t&&(r.style.visibility="hidden");return}const i=e.direction==="bottom"?"Y":"X",n=`translate${i}(100%)`,s=`translate${i}(${e.direction==="bottom"?"-14%":"-10%"})`;r.style.zIndex="2",o.style.zIndex="1",o.style.visibility="visible";const d=r.animate([{transform:"translate(0, 0)",opacity:1},{transform:n,opacity:.45}],{duration:gt*.7,easing:ia,fill:"both"}),p=o.animate([{transform:s,opacity:0},{transform:"translate(0, 0)",opacity:1}],{duration:gt,easing:oa,fill:"both"});let h=0;const m=()=>{h+=1,!(h<2)&&(d.cancel(),r.style.visibility="hidden",r.style.zIndex="0",o.style.zIndex="1")};p.onfinish=m,p.oncancel=m}}const se=new Ti,L={serverOnline:null,serverChecked:!1,diskUsage:null,scan:null,scanning:!1},pr=new Set;function ne(){pr.forEach(a=>a())}function Fr(a){return pr.add(a),()=>pr.delete(a)}function oe(a,e=2){if(!Number.isFinite(a)||a<0)return"0 B";const t=["B","KB","MB","GB","TB"];let r=0,o=a;for(;o>=1024&&r<t.length-1;)o/=1024,r+=1;return`${o.toFixed(r<=1?0:e)} ${t[r]}`}const Ka=["sys","browser","wechat","qq"],hr={sys:"settings_suggest",browser:"language",wechat:"chat",qq:"forum"};var Ei=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,ze=(a,e,t,r)=>{for(var o=r>1?void 0:r?Di(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ei(e,t,o),o};let ve=class extends O{constructor(){super(...arguments),this.scan=null,this.selected=new Set,this.cleaning=!1,this.cleanResult=null,this.cleanFailed="",this.dialogAction=null,this.cleanConfirmOpen=!1,this.autoHomeTimer=null,this._defaultApplied=!1}connectedCallback(){super.connectedCallback(),this.scan=L.scan,this.unsubscribe=Fr(()=>{this.scan=L.scan}),this.addEventListener("screen-active",()=>{this.handleActivation()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.autoHomeTimer!==null&&(window.clearTimeout(this.autoHomeTimer),this.autoHomeTimer=null)}async handleActivation(){if(!this.scan){const a=await W.getScanCache();a&&(this.scan=a,L.scan=a,ne())}if(this.scan&&this.selected.size===0&&!this._defaultApplied){this._defaultApplied=!0;const a=new Set;for(const e of this.scan.targets)(e.category==="browser"||/缓存|Cache|Temp|Prefetch|Download/i.test(e.name+e.path))&&a.add(e.path);this.selected=a}try{L.diskUsage=await pe.diskUsage(),ne()}catch{}}get grouped(){return this.scan?Ka.map(a=>({category:a,items:this.scan.targets.filter(e=>e.category===a)})).filter(a=>a.items.length>0):[]}get selectedSize(){return this.scan?this.scan.targets.filter(a=>this.selected.has(a.path)).reduce((a,e)=>a+e.size,0):0}toggle(a,e){const t=new Set(this.selected);e?t.add(a):t.delete(a),this.selected=t}toggleCategory(a,e){const t=this.grouped.find(o=>o.category===a),r=new Set(this.selected);for(const o of t?.items??[])e?r.add(o.path):r.delete(o.path);this.selected=r}toggleAll(a){this.selected=a?new Set(this.scan?.targets.map(e=>e.path)??[]):new Set}requestHome(){this.dialogAction="home"}requestBackScan(){this.dialogAction="scan"}async onDialogConfirm(){const a=this.dialogAction;this.dialogAction=null,a==="home"?se.navigate("home",{direction:"right"}):a==="scan"&&se.navigate("scan",{direction:"right"})}finishCleanAndGoHome(){this.autoHomeTimer!==null&&(window.clearTimeout(this.autoHomeTimer),this.autoHomeTimer=null),this.cleanResult=null,se.navigate("home",{direction:"right"})}async startClean(){if(!(this.cleaning||this.selected.size===0)){this.cleaning=!0,this.cleanFailed="";try{const a=await pe.clean([...this.selected]);this.cleanResult=a,this.autoHomeTimer!==null&&window.clearTimeout(this.autoHomeTimer),this.autoHomeTimer=window.setTimeout(()=>this.finishCleanAndGoHome(),2800);try{L.diskUsage=await pe.diskUsage()}catch{}try{const e=await pe.scan();L.scan=e,this.scan=e,await W.saveScanCache(e),this.selected=new Set}catch{}ne()}catch(a){this.cleanFailed=a instanceof Error?a.message:"清理失败"}finally{this.cleaning=!1}}}goScanForFresh(){se.navigate("scan",{direction:"right",detail:{rescan:!0}})}renderStat(a,e,t,r=!1){return y`
      <div class="stat ${r?"tone-primary":""}">
        <md-icon>${a}</md-icon>
        <div>
          <div class="k">${e}</div>
          <div class="v">${t}</div>
        </div>
      </div>
    `}render(){const a=L.diskUsage,e=this.scan?.totalSize??0,t=y`
      <div class="empty">
        <md-icon>find_in_page</md-icon>
        <div class="hint">暂无扫描结果，请先扫描电脑垃圾文件后再勾选清理。</div>
        <md-filled-button @click=${this.goScanForFresh}>
          <md-icon slot="icon">search</md-icon>去扫描
        </md-filled-button>
      </div>
    `,r=this.scan&&this.scan.targets.length>0?this.grouped.map(o=>y`
              <div class="category-block">
                <div class="category-head">
                  <md-checkbox
                    touch-target="wrapper"
                    .checked=${o.items.every(i=>this.selected.has(i.path))}
                    .indeterminate=${o.items.some(i=>this.selected.has(i.path))&&!o.items.every(i=>this.selected.has(i.path))}
                    @change=${i=>this.toggleCategory(o.category,i.target.checked)}
                  ></md-checkbox>
                  <md-icon>${hr[o.category]}</md-icon>
                  <span class="title">${o.category==="sys"?"系统及通用垃圾":o.category==="browser"?"浏览器缓存":o.category==="wechat"?"微信聊天缓存":"QQ聊天缓存"}</span>
                  <span class="size">${oe(o.items.reduce((i,n)=>i+n.size,0))}</span>
                </div>
                <div class="rows">
                  ${o.items.map(i=>y`
                      <div class="row" @click=${()=>this.toggle(i.path,!this.selected.has(i.path))}>
                        <md-ripple></md-ripple>
                        <md-checkbox
                          touch-target="wrapper"
                          .checked=${this.selected.has(i.path)}
                          @click=${n=>n.stopPropagation()}
                          @change=${n=>this.toggle(i.path,n.target.checked)}
                        ></md-checkbox>
                        <div class="info">
                          <div class="name">${i.name}</div>
                          <div class="path" title=${i.path}>${i.path}</div>
                        </div>
                        <div class="size">${oe(i.size)}</div>
                      </div>
                    `)}
                </div>
              </div>
            `):(this.scan,t);return y`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="toolbar-row">
        <div class="button-group">
          <md-outlined-button @click=${this.requestHome}>主页</md-outlined-button>
          <md-outlined-button @click=${this.requestBackScan}>返回清理页面</md-outlined-button>
        </div>
      </div>

      <div class="stage">
        <div class="container-frame">
          <div class="stats-row">
            ${this.renderStat("database","C盘容量",a?oe(a.total):"--")}
            ${this.renderStat("data_usage","占用空间",a?oe(a.used):"--")}
            ${this.renderStat("free_cancellation","剩余空间",a?oe(a.free):"--")}
            ${this.renderStat("delete_sweep","垃圾文件占用量",oe(e),!0)}
          </div>
          <div class="list-area">${r}</div>
          <div class="bottom-bar">
            <span class="selection-info">
              已勾选 <b>${this.selected.size}</b> 项 · 可释放约 <b>${oe(this.selectedSize)}</b>
            </span>
            <md-outlined-button
              ?disabled=${!this.scan?.targets.length}
              @click=${()=>this.toggleAll(this.selected.size<(this.scan?.targets.length??0))}
            >
              ${this.selected.size<(this.scan?.targets.length??0)?"全选":"全不选"}
            </md-outlined-button>
            <md-filled-button
              ?disabled=${this.selected.size===0||this.cleaning}
              @click=${()=>this.cleanConfirmOpen=!0}
            >
              ${this.cleaning?"清理中…":"开始清理"}
              <md-icon slot="icon">delete_sweep</md-icon>
            </md-filled-button>
          </div>
        </div>
      </div>

      ${this.cleanFailed?y`<app-confirm-dialog
            .open=${!0}
            heading="清理失败"
            body=${this.cleanFailed}
            icon-name="error"
            @confirm=${()=>this.cleanFailed=""}
            @cancel=${()=>this.cleanFailed=""}
          ></app-confirm-dialog>`:v}

      <app-confirm-dialog
        .open=${this.cleanConfirmOpen}
        heading="确认清理"
        .body=${`即将清空已勾选目录中的内容，共 ${this.selected.size} 项、约 ${oe(this.selectedSize)}。微信 File、QQ FileRecv 目录包含聊天接收的文件，清理后无法恢复。`}
        icon-name="delete_forever"
        confirm-label="清理"
        @confirm=${()=>{this.cleanConfirmOpen=!1,this.startClean()}}
        @cancel=${()=>this.cleanConfirmOpen=!1}
      ></app-confirm-dialog>

      ${this.cleanResult?y`<md-dialog open @closed=${()=>this.cleanResult=null}>
            <div slot="headline">清理完成</div>
            <div slot="content" class="result-body">
              <span class="freed">已释放 ${oe(this.cleanResult.freed)}</span>
              ${this.cleanResult.failures.length>0?y`<div>以下目录部分内容被占用或权限不足，未能完全清理：</div>
                    <ul class="fail-list">
                      ${this.cleanResult.failures.map(o=>y`<li>${o.name}：${o.error}</li>`)}
                    </ul>`:y`<div>所选目录内容已全部清理完成。</div>`}
              <div class="auto-home-hint">即将自动返回主页面…</div>
            </div>
            <div slot="actions">
              <md-text-button @click=${()=>this.finishCleanAndGoHome()}>知道了</md-text-button>
            </div>
          </md-dialog>`:v}

      <app-confirm-dialog
        .open=${this.dialogAction!==null}
        heading="确认/取消"
        body="真的不需要清理电脑垃圾文件返回到主页面吗？"
        icon-name="info"
        @confirm=${()=>{this.onDialogConfirm()}}
        @cancel=${()=>this.dialogAction=null}
      ></app-confirm-dialog>
    `}};ve.styles=I`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .toolbar-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 24px 12px;
    }
    .button-group {
      display: flex;
      gap: 3px;
    }
    .button-group md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
      --md-outlined-button-container-height: 48px;
      --md-outlined-button-outline-color: var(--md-sys-color-outline);
      --md-outlined-button-outline-width: 1px;
      background: var(--md-sys-color-surface);
    }
    .button-group md-outlined-button:first-child {
      --md-outlined-button-container-shape: var(--app-shape-button-group-inner);
      border-end-end-radius: var(--app-shape-button-group-inner);
      border-start-end-radius: var(--app-shape-button-group-inner);
    }
    .button-group md-outlined-button:last-child {
      --md-outlined-button-container-shape: var(--app-shape-button-group-inner);
      border-start-start-radius: var(--app-shape-button-group-inner);
      border-end-start-radius: var(--app-shape-button-group-inner);
    }
    .stage {
      flex: 1;
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding: 0 24px 24px;
      min-height: 0;
    }
    .container-frame {
      width: min(1036px, 100%);
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .stats-row {
      flex: 0 0 auto;
      display: flex;
      gap: 12px;
      padding: 20px 24px 14px;
      flex-wrap: wrap;
    }
    .stat {
      flex: 1;
      min-width: 150px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: var(--md-sys-color-surface-container-low);
      border-radius: var(--app-shape-list-inner);
    }
    .stat.tone-primary {
      background: var(--md-sys-color-primary-container);
    }
    .stat md-icon {
      color: var(--md-sys-color-primary);
      flex: 0 0 auto;
    }
    .stat.tone-primary md-icon {
      color: var(--md-sys-color-on-primary-container);
    }
    .stat .k {
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .stat.tone-primary .k {
      color: var(--md-sys-color-on-primary-container);
    }
    .stat .v {
      font-size: 19px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
    }
    .stat.tone-primary .v {
      color: var(--md-sys-color-on-primary-container);
    }
    .list-area {
      flex: 1;
      overflow-y: auto;
      padding: 4px 24px 8px;
      min-height: 0;
    }
    .category-block {
      margin-bottom: 18px;
    }
    .category-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 10px;
      color: var(--md-sys-color-on-surface);
    }
    .category-head md-icon {
      color: var(--md-sys-color-primary);
    }
    .category-head .title {
      font-size: var(--md-sys-typescale-title-medium-size);
      font-weight: var(--md-sys-typescale-title-medium-weight);
    }
    .category-head .size {
      margin-left: auto;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .rows {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .row {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px 10px 10px;
      background: var(--md-sys-color-surface-container-low);
      border-radius: var(--app-shape-list-inner);
      cursor: pointer;
      overflow: hidden;
      transition: background-color 0.2s var(--app-ease-standard);
    }
    .row:hover {
      background: var(--md-sys-color-surface-container);
    }
    .row:first-child {
      border-start-start-radius: var(--app-shape-list-outer);
      border-start-end-radius: var(--app-shape-list-outer);
    }
    .row:last-child {
      border-end-start-radius: var(--app-shape-list-outer);
      border-end-end-radius: var(--app-shape-list-outer);
    }
    .row md-checkbox {
      flex: 0 0 auto;
    }
    .row .info {
      flex: 1;
      min-width: 0;
    }
    .row .name {
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row .path {
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: rtl;
      text-align: left;
    }
    .row .size {
      font-size: var(--md-sys-typescale-body-medium-size);
      font-weight: 500;
      white-space: nowrap;
      color: var(--md-sys-color-on-surface-variant);
    }
    .bottom-bar {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 24px 18px;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-surface-container-high);
    }
    .selection-info {
      flex: 1;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .selection-info b {
      color: var(--md-sys-color-on-surface);
      font-size: var(--md-sys-typescale-body-large-size);
    }
    md-filled-button {
      --md-filled-button-container-shape: var(--app-shape-full);
      --md-filled-button-container-height: 56px;
    }
    .empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      color: var(--md-sys-color-on-surface-variant);
      padding: 24px;
    }
    .empty md-icon {
      font-size: 56px;
      color: var(--md-sys-color-on-surface-variant);
    }
    .empty .hint {
      max-width: 460px;
      line-height: 1.5;
    }
    md-dialog {
      --md-dialog-container-shape: var(--app-shape-dialog);
    }
    .result-body {
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.6;
      color: var(--md-sys-color-on-surface-variant);
    }
    .result-body .freed {
      font-size: 22px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
    }
    .result-body .auto-home-hint {
      margin-top: 10px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .fail-list {
      margin: 8px 0 0;
      padding-left: 18px;
      color: var(--md-sys-color-on-error-container);
    }
    .warn-note {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: var(--app-shape-list-inner);
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      font-size: var(--md-sys-typescale-body-small-size);
      line-height: 1.5;
    }
  `;ze([T()],ve.prototype,"scan",2);ze([T()],ve.prototype,"selected",2);ze([T()],ve.prototype,"cleaning",2);ze([T()],ve.prototype,"cleanResult",2);ze([T()],ve.prototype,"cleanFailed",2);ze([T()],ve.prototype,"dialogAction",2);ze([T()],ve.prototype,"cleanConfirmOpen",2);ve=ze([B("clean-screen")],ve);class j extends O{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const e=this.count??-1,t=this.max??-1;return e<0||t<=0?"":`${e} / ${t}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){const e=this.renderLabel(!0),t=this.renderLabel(!1),r=this.renderOutline?.(e),o={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return y`
      <div class="field ${he(o)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${r}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${r?v:e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:e,counterText:t}=this;if(!e&&!t)return v;const r=y`<span>${e}</span>`,o=t?y`<span class="counter">${t}</span>`:v,n=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":v;return y`
      <div class="supporting-text" role=${n}>${r}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const e of this.slottedAriaDescribedBy)ya(y`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return v;let t;e?t=this.focused||this.populated||this.isAnimating:t=!this.focused&&!this.populated&&!this.isAnimating;const r={hidden:!t,floating:e,resting:!e},o=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return y`
      <span class="label ${he(r)}" aria-hidden=${!t}
        >${o}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:t}){if(!this.label)return;e??=this.focused,t??=this.populated;const r=e||t,o=this.focused||this.populated;if(r===o)return;const i=this.getLabelKeyframes();i.length&&(this.isAnimating=!0,this.labelAnimation?.cancel(),this.labelAnimation=this.floatingLabelEl?.animate(i,{duration:150,easing:Xe.STANDARD}),this.labelAnimation?.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:e,restingLabelEl:t}=this;if(!e||!t)return[];const{x:r,y:o,height:i}=e.getBoundingClientRect(),{x:n,y:s,height:d}=t.getBoundingClientRect(),p=e.scrollWidth,h=t.scrollWidth;if(p===0||h===0)return[];const m=h/p,b=n-r,k=s-o+Math.round((d-i*m)/2),x=`translateX(${b}px) translateY(${k}px) scale(${m})`,_="translateX(0) translateY(0) scale(1)",w=t.clientWidth,z=h>w?`${w/m}px`:"";return this.focused||this.populated?[{transform:x,width:z},{transform:_,width:z}]:[{transform:_,width:z},{transform:x,width:z}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}c([f({type:Boolean})],j.prototype,"disabled",void 0);c([f({type:Boolean})],j.prototype,"error",void 0);c([f({type:Boolean})],j.prototype,"focused",void 0);c([f()],j.prototype,"label",void 0);c([f({type:Boolean,attribute:"no-asterisk"})],j.prototype,"noAsterisk",void 0);c([f({type:Boolean})],j.prototype,"populated",void 0);c([f({type:Boolean})],j.prototype,"required",void 0);c([f({type:Boolean})],j.prototype,"resizable",void 0);c([f({attribute:"supporting-text"})],j.prototype,"supportingText",void 0);c([f({attribute:"error-text"})],j.prototype,"errorText",void 0);c([f({type:Number})],j.prototype,"count",void 0);c([f({type:Number})],j.prototype,"max",void 0);c([f({type:Boolean,attribute:"has-start"})],j.prototype,"hasStart",void 0);c([f({type:Boolean,attribute:"has-end"})],j.prototype,"hasEnd",void 0);c([Ot({slot:"aria-describedby"})],j.prototype,"slottedAriaDescribedBy",void 0);c([T()],j.prototype,"isAnimating",void 0);c([T()],j.prototype,"refreshErrorAlert",void 0);c([T()],j.prototype,"disableTransitions",void 0);c([J(".label.floating")],j.prototype,"floatingLabelEl",void 0);c([J(".label.resting")],j.prototype,"restingLabelEl",void 0);c([J(".container")],j.prototype,"containerEl",void 0);class Ii extends j{renderOutline(e){return y`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${e}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `}}const Xa=I`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;Xa.styleSheet;const Wa=I`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;Wa.styleSheet;let fr=class extends Ii{};fr.styles=[Wa,Xa];fr=c([B("md-outlined-field")],fr);const Za=I`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;Za.styleSheet;const zi=a=>a.strings===void 0,Oi={},Fi=(a,e=Oi)=>a._$AH=e;const na=Dr(class extends Ir{constructor(a){if(super(a),a.type!==Ae.PROPERTY&&a.type!==Ae.ATTRIBUTE&&a.type!==Ae.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!zi(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[e]){if(e===ce||e===v)return e;const t=a.element,r=a.name;if(a.type===Ae.PROPERTY){if(e===t[r])return ce}else if(a.type===Ae.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(r))return ce}else if(a.type===Ae.ATTRIBUTE&&t.getAttribute(r)===e+"")return ce;return Fi(a),e}});const Ja="important",Li=" !"+Ja,Dt=Dr(class extends Ir{constructor(a){if(super(a),a.type!==Ae.ATTRIBUTE||a.name!=="style"||a.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(a){return Object.keys(a).reduce((e,t)=>{const r=a[t];return r==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(a,[e]){const{style:t}=a.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?t.removeProperty(r):t[r]=null);for(const r in e){const o=e[r];if(o!=null){this.ft.add(r);const i=typeof o=="string"&&o.endsWith(Li);r.includes("-")||i?t.setProperty(r,i?o.slice(0,-11):o,i?Ja:""):t[r]=o}}return ce}});const Ri={fromAttribute(a){return a??""},toAttribute(a){return a||null}};const mr=Symbol("onReportValidity"),xt=Symbol("privateCleanupFormListeners"),_t=Symbol("privateDoNotReportInvalid"),wt=Symbol("privateIsSelfReportingValidity"),kt=Symbol("privateCallOnReportValidity");function Mi(a){var e,t,r;class o extends a{constructor(...n){super(...n),this[e]=new AbortController,this[t]=!1,this[r]=!1,this.addEventListener("invalid",s=>{this[_t]||!s.isTrusted||this.addEventListener("invalid",()=>{this[kt](s)},{once:!0})},{capture:!0})}checkValidity(){this[_t]=!0;const n=super.checkValidity();return this[_t]=!1,n}reportValidity(){this[wt]=!0;const n=super.reportValidity();return n&&this[kt](null),this[wt]=!1,n}[(e=xt,t=_t,r=wt,kt)](n){const s=n?.defaultPrevented;s||(this[mr](n),!(!s&&n?.defaultPrevented))||(this[wt]||Vi(this[le].form,this))&&this.focus()}[mr](n){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(n){super.formAssociatedCallback&&super.formAssociatedCallback(n),this[xt].abort(),n&&(this[xt]=new AbortController,Bi(this,n,()=>{this[kt](null)},this[xt].signal))}}return o}function Bi(a,e,t,r){const o=Ni(e);let i=!1,n,s=!1;o.addEventListener("before",()=>{s=!0,n=new AbortController,i=!1,a.addEventListener("invalid",()=>{i=!0},{signal:n.signal})},{signal:r}),o.addEventListener("after",()=>{s=!1,n?.abort(),!i&&t()},{signal:r}),e.addEventListener("submit",()=>{s||t()},{signal:r})}const Wt=new WeakMap;function Ni(a){if(!Wt.has(a)){const e=new EventTarget;Wt.set(a,e);for(const t of["reportValidity","requestSubmit"]){const r=a[t];a[t]=function(){e.dispatchEvent(new Event("before"));const o=Reflect.apply(r,this,arguments);return e.dispatchEvent(new Event("after")),o}}}return Wt.get(a)}function Vi(a,e){if(!a)return!0;let t;for(const r of a.elements)if(r.matches(":invalid")){t=r;break}return t===e}class Ui extends Ba{computeValidity({state:e,renderedControl:t}){let r=t;et(e)&&!r?(r=this.inputControl||document.createElement("input"),this.inputControl=r):r||(r=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=r);const o=et(e)?r:null;if(o&&(o.type=e.type),r.value!==e.value&&(r.value=e.value),r.required=e.required,o){const i=e;i.pattern?o.pattern=i.pattern:o.removeAttribute("pattern"),i.min?o.min=i.min:o.removeAttribute("min"),i.max?o.max=i.max:o.removeAttribute("max"),i.step?o.step=i.step:o.removeAttribute("step")}return(e.minLength??-1)>-1?r.setAttribute("minlength",String(e.minLength)):r.removeAttribute("minlength"),(e.maxLength??-1)>-1?r.setAttribute("maxlength",String(e.maxLength)):r.removeAttribute("maxlength"),{validity:r.validity,validationMessage:r.validationMessage}}equals({state:e},{state:t}){const r=e.type===t.type&&e.value===t.value&&e.required===t.required&&e.minLength===t.minLength&&e.maxLength===t.maxLength;return!et(e)||!et(t)?r:r&&e.pattern===t.pattern&&e.min===t.min&&e.max===t.max&&e.step===t.step}copy({state:e}){return{state:et(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){const{type:t,pattern:r,min:o,max:i,step:n}=e;return{...this.copySharedState(e),type:t,pattern:r,min:o,max:i,step:n}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:t,minLength:r,maxLength:o}){return{value:e,required:t,minLength:r,maxLength:o}}}function et(a){return a.type!=="textarea"}const Hi=Ie(Mi(Ma(Rt(Lt(O)))));class D extends Hi{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){const e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){const t=this.getInput();t&&(t.valueAsNumber=e,this.value=t.value)}get valueAsDate(){const e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){const t=this.getInput();t&&(t.valueAsDate=e,this.value=t.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,t,r){this.getInputOrTextarea().setSelectionRange(e,t,r)}showPicker(){const e=this.getInput();e&&e.showPicker()}stepDown(e){const t=this.getInput();t&&(t.stepDown(e),this.value=t.value)}stepUp(e){const t=this.getInput();t&&(t.stepUp(e),this.value=t.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,t,r){e==="value"&&this.dirty||super.attributeChangedCallback(e,t,r)}render(){const e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return y`
      <span class="text-field ${he(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){const t=this.getInputOrTextarea().value;this.value!==t&&(this.value=t)}renderField(){return ja`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type==="textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`}renderLeadingIcon(){return y`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return y`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const e={direction:this.textDirection},t=this.ariaLabel||this.label||v,r=this.autocomplete,o=(this.maxLength??-1)>-1,i=(this.minLength??-1)>-1;if(this.type==="textarea")return y`
        <textarea
          class="input"
          style=${Dt(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r||v}
          name=${this.name||v}
          ?disabled=${this.disabled}
          maxlength=${o?this.maxLength:v}
          minlength=${i?this.minLength:v}
          placeholder=${this.placeholder||v}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${na(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const n=this.renderPrefix(),s=this.renderSuffix(),d=this.inputMode;return y`
      <div class="input-wrapper">
        ${n}
        <input
          class="input"
          style=${Dt(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r||v}
          name=${this.name||v}
          ?disabled=${this.disabled}
          inputmode=${d||v}
          max=${this.max||v}
          maxlength=${o?this.maxLength:v}
          min=${this.min||v}
          minlength=${i?this.minLength:v}
          pattern=${this.pattern||v}
          placeholder=${this.placeholder||v}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||v}
          type=${this.type}
          .value=${na(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${s}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,t){return e?y`<span class="${he({suffix:t,prefix:!t})}">${e}</span>`:v}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){this.focused=this.inputOrTextarea?.matches(":focus")??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){zr(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[rt](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[At](){return new Ui(()=>({state:this,renderedControl:this.inputOrTextarea}))}[Tt](){return this.inputOrTextarea}[mr](e){e?.preventDefault();const t=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,t===this.getErrorText()&&this.field?.reannounceError()}}D.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0};c([f({type:Boolean,reflect:!0})],D.prototype,"error",void 0);c([f({attribute:"error-text"})],D.prototype,"errorText",void 0);c([f()],D.prototype,"label",void 0);c([f({type:Boolean,attribute:"no-asterisk"})],D.prototype,"noAsterisk",void 0);c([f({type:Boolean,reflect:!0})],D.prototype,"required",void 0);c([f()],D.prototype,"value",void 0);c([f({attribute:"prefix-text"})],D.prototype,"prefixText",void 0);c([f({attribute:"suffix-text"})],D.prototype,"suffixText",void 0);c([f({type:Boolean,attribute:"has-leading-icon"})],D.prototype,"hasLeadingIcon",void 0);c([f({type:Boolean,attribute:"has-trailing-icon"})],D.prototype,"hasTrailingIcon",void 0);c([f({attribute:"supporting-text"})],D.prototype,"supportingText",void 0);c([f({attribute:"text-direction"})],D.prototype,"textDirection",void 0);c([f({type:Number})],D.prototype,"rows",void 0);c([f({type:Number})],D.prototype,"cols",void 0);c([f({reflect:!0})],D.prototype,"inputMode",void 0);c([f()],D.prototype,"max",void 0);c([f({type:Number})],D.prototype,"maxLength",void 0);c([f()],D.prototype,"min",void 0);c([f({type:Number})],D.prototype,"minLength",void 0);c([f({type:Boolean,attribute:"no-spinner"})],D.prototype,"noSpinner",void 0);c([f()],D.prototype,"pattern",void 0);c([f({reflect:!0,converter:Ri})],D.prototype,"placeholder",void 0);c([f({type:Boolean,reflect:!0})],D.prototype,"readOnly",void 0);c([f({type:Boolean,reflect:!0})],D.prototype,"multiple",void 0);c([f()],D.prototype,"step",void 0);c([f({reflect:!0})],D.prototype,"type",void 0);c([f({reflect:!0})],D.prototype,"autocomplete",void 0);c([T()],D.prototype,"dirty",void 0);c([T()],D.prototype,"focused",void 0);c([T()],D.prototype,"nativeError",void 0);c([T()],D.prototype,"nativeErrorText",void 0);c([J(".input")],D.prototype,"inputOrTextarea",void 0);c([J(".field")],D.prototype,"field",void 0);c([Ot({slot:"leading-icon"})],D.prototype,"leadingIcons",void 0);c([Ot({slot:"trailing-icon"})],D.prototype,"trailingIcons",void 0);class qi extends D{constructor(){super(...arguments),this.fieldTag=Et`md-outlined-field`}}const Qa=I`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;Qa.styleSheet;let vr=class extends qi{constructor(){super(...arguments),this.fieldTag=Et`md-outlined-field`}};vr.styles=[Qa,Za];vr=c([B("md-outlined-text-field")],vr);var ji=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,Ne=(a,e,t,r)=>{for(var o=r>1?void 0:r?Yi(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ji(e,t,o),o};const Gi=/^([^\s@]+@[^\s@]+\.[^\s@]+|1[3-9]\d{9}|[0-9]{3,4}-?[0-9]{7,8})$/;let ke=class extends O{constructor(){super(...arguments),this.suggestion="",this.feedback="",this.contact="",this.errors={},this.submitting=!1,this.offline=!1,this.draftTimer=0}connectedCallback(){super.connectedCallback(),this.addEventListener("screen-active",()=>{this.restoreDraft()})}async restoreDraft(){const a=await W.getDraft();a&&(this.suggestion=a.suggestion??"",this.feedback=a.feedback??"",this.contact=a.contact??"")}saveDraft(){window.clearTimeout(this.draftTimer),this.draftTimer=window.setTimeout(()=>{W.saveDraft({suggestion:this.suggestion,feedback:this.feedback,contact:this.contact})},400)}updateField(a,e){if(this[a]=e,this.errors[a]){const t={...this.errors};delete t[a],this.errors=t}this.saveDraft()}validate(){const a={};return!this.suggestion.trim()&&!this.feedback.trim()&&(a.content="请至少填写“建议”或“反馈”中的一项"),this.contact.trim()&&!Gi.test(this.contact.trim())&&(a.contact="联系方式需为有效邮箱或手机号"),this.errors=a,Object.keys(a).length===0}async submit(){if(this.submitting||!this.validate())return;const a={suggestion:this.suggestion.trim(),feedback:this.feedback.trim(),contact:this.contact.trim()};this.submitting=!0;let e=!1,t=!1;try{const o=await pe.submitFeedback(a);t=o.saved,e=o.emailed}catch{t=!1}try{await W.addFeedback({...a,id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,submittedAt:Date.now(),emailed:e})}catch{}this.submitting=!1,await W.clearDraft();const r=t?e?"提交成功，已发送至邮箱，即将返回主页":"提交成功（已送达本地服务，邮箱未配置 SMTP），即将返回主页":"本地服务未运行，反馈已保存在浏览器中";this.dispatchEvent(new CustomEvent("show-snackbar",{bubbles:!0,composed:!0,detail:{message:r}})),window.setTimeout(()=>se.back(),620)}goBack(){se.back()}render(){return y`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="toolbar-row">
        <md-outlined-button @click=${this.goBack}>返回</md-outlined-button>
      </div>

      <div class="stage">
        <div class="container-frame">
          <div class="field-row">
            <span class="field-label">建议：</span>
            <div class="field-wrap multi">
              <md-outlined-text-field
                type="textarea"
                rows="2"
                label="对产品的改进建议"
                .value=${this.suggestion}
                @input=${a=>this.updateField("suggestion",a.target.value)}
              ></md-outlined-text-field>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">反馈：</span>
            <div class="field-wrap multi">
              <md-outlined-text-field
                type="textarea"
                rows="2"
                label="使用中遇到的问题"
                .value=${this.feedback}
                @input=${a=>this.updateField("feedback",a.target.value)}
              ></md-outlined-text-field>
              ${this.errors.content?y`<div class="error-text">${this.errors.content}</div>`:v}
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">联系方式：</span>
            <div class="field-wrap">
              <md-outlined-text-field
                type="text"
                label="邮箱或手机号（选填）"
                .value=${this.contact}
                @input=${a=>this.updateField("contact",a.target.value)}
              ></md-outlined-text-field>
              ${this.errors.contact?y`<div class="error-text">${this.errors.contact}</div>`:v}
            </div>
          </div>

          <div class="actions-row">
            <md-filled-button
              ?disabled=${this.submitting}
              @click=${()=>{this.submit()}}
            >
              ${this.submitting?"提交中…":"提交确认"}
            </md-filled-button>
          </div>
        </div>
      </div>
    `}};ke.styles=I`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .toolbar-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 24px 12px;
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
      width: 88px;
    }
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 24px 24px;
      min-height: 0;
    }
    .container-frame {
      width: min(996px, 100%);
      height: min(528px, 100%);
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 36px 44px;
      overflow-y: auto;
    }
    .field-row {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .field-label {
      flex: 0 0 auto;
      width: 148px;
      text-align: right;
      font-size: 28px;
      line-height: 1.3;
      font-weight: 400;
      color: var(--md-sys-color-on-surface);
    }
    .field-wrap {
      flex: 1;
      min-width: 0;
    }
    md-outlined-text-field {
      width: 100%;
      --md-outlined-text-field-container-shape: var(--app-shape-textfield);
      --md-outlined-text-field-container-height: 56px;
      --md-outlined-text-field-input-text-font: var(--app-font-family);
      --md-outlined-text-field-input-text-size: 15px;
      --md-outlined-text-field-outline-color: var(--md-sys-color-outline);
      --md-outlined-text-field-focus-outline-color: var(--md-sys-color-primary);
      --md-outlined-text-field-textarea-padding: 14px 16px;
    }
    md-outlined-text-field[error] {
      --md-outlined-text-field-input-text-color: var(--md-sys-color-on-surface);
    }
    .error-text {
      margin: 6px 0 0 6px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-error);
      line-height: 1.4;
    }
    .multi md-outlined-text-field {
      --md-outlined-text-field-container-height: 92px;
    }
    .actions-row {
      margin-top: auto;
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }
    md-filled-button {
      --md-filled-button-container-shape: var(--app-shape-full);
      width: 380px;
      --md-filled-button-container-height: 56px;
    }
    .offline-hint {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .offline-hint md-icon {
      font-size: 18px;
    }
  `;Ne([T()],ke.prototype,"suggestion",2);Ne([T()],ke.prototype,"feedback",2);Ne([T()],ke.prototype,"contact",2);Ne([T()],ke.prototype,"errors",2);Ne([T()],ke.prototype,"submitting",2);Ne([T()],ke.prototype,"offline",2);ke=Ne([B("feedback-screen")],ke);const Ki=Ie(O);class dt extends Ki{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return y`
      <button
        class="fab ${he(this.getRenderClasses())}"
        aria-label=${e||v}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!e,large:this.size==="large"&&!e,extended:e}}renderTouchTarget(){return y`<div class="touch-target"></div>`}renderLabel(){return this.label?y`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return y`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":v}>
        <span></span>
      </slot>
    </span>`}}dt.shadowRootOptions={mode:"open",delegatesFocus:!0};c([f({reflect:!0})],dt.prototype,"size",void 0);c([f()],dt.prototype,"label",void 0);c([f({type:Boolean})],dt.prototype,"lowered",void 0);class eo extends dt{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}c([f()],eo.prototype,"variant",void 0);const to=I`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;to.styleSheet;const ro=I`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;ro.styleSheet;const ao=I`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;ao.styleSheet;let br=class extends eo{};br.styles=[ao,to,ro];br=c([B("md-fab")],br);var Xi=Object.defineProperty,Wi=Object.getOwnPropertyDescriptor,Je=(a,e,t,r)=>{for(var o=r>1?void 0:r?Wi(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Xi(e,t,o),o};let De=class extends O{constructor(){super(...arguments),this.showClearDialog=!1,this.offline=!1,this.serverChecked=!1,this.quickStartOpen=!1,this.guideVisible=!1}connectedCallback(){super.connectedCallback(),this.offline=L.serverOnline===!1,this.serverChecked=L.serverChecked,this.unsubscribe=Fr(()=>{this.offline=L.serverOnline===!1,this.serverChecked=L.serverChecked})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.()}goScan(){this.guideVisible=!1,se.navigate("scan",{direction:"bottom",detail:{rescan:!0}})}goFeedback(){se.navigate("feedback",{direction:"right"})}onLearnUsage(){this.quickStartOpen=!this.quickStartOpen,this.quickStartOpen?this.guideVisible=!0:this.guideVisible=!1}skipGuide(){this.guideVisible=!1}async onClearData(){try{await W.clearAll(),L.scan=null,ne(),this.dispatchEvent(new CustomEvent("show-snackbar",{bubbles:!0,composed:!0,detail:{message:"已清除本地缓存数据"}}))}catch{this.dispatchEvent(new CustomEvent("show-snackbar",{bubbles:!0,composed:!0,detail:{message:"清除失败，请重试"}}))}}render(){return y`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
        <md-icon-button slot="trailing" aria-label="清除本地数据" @click=${()=>this.showClearDialog=!0}>
          <md-icon>remove</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="content">
        ${this.offline?y`<div class="offline-bar">
              <md-icon>warning</md-icon>
              <span
                >本地清理服务未运行：请在应用目录执行
                <code>python server.py</code>
                后刷新页面，即可扫描并清理真实垃圾文件。</span
              >
            </div>`:""}

        <div class="tabs">
          <div class="list-item" role="button" tabindex="0" @click=${this.goScan} @keydown=${a=>a.key==="Enter"&&this.goScan()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">开始扫描电脑垃圾文件</span>
            <md-icon>chevron_right</md-icon>
          </div>
          <div class="list-item" role="button" tabindex="0" @click=${this.goFeedback} @keydown=${a=>a.key==="Enter"&&this.goFeedback()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">建议与反馈</span>
            <md-icon>chevron_right</md-icon>
          </div>
          <div class="list-item" role="button" tabindex="0" @click=${this.onLearnUsage} @keydown=${a=>a.key==="Enter"&&this.onLearnUsage()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">了解使用</span>
            <md-icon>${this.quickStartOpen?"expand_less":"chevron_right"}</md-icon>
          </div>
        </div>

        ${this.quickStartOpen?y`
              <div class="quick-start">
                <div
                  class="hero-card"
                  role="button"
                  tabindex="0"
                  @click=${this.goScan}
                  @keydown=${a=>a.key==="Enter"&&this.goScan()}
                >
                  <md-ripple></md-ripple>
                  <p class="card-title">点击开始扫描快速开始</p>
                  <md-fab variant="primary" label="快速开始" @click=${a=>{a.stopPropagation(),this.goScan()}}>
                    <md-icon slot="icon">bolt</md-icon>
                  </md-fab>
                </div>
              </div>
            `:""}
      </div>

      ${this.guideVisible?y`
            <div class="guide-overlay" @click=${this.skipGuide}>
              <div class="guide-card" role="dialog" aria-label="使用引导" @click=${a=>a.stopPropagation()}>
                <md-icon class="guide-arrow">arrow_downward</md-icon>
                <div class="guide-text">
                  点击下方的 <b>「快速开始」</b> 按钮，<br />
                  立即开始扫描电脑垃圾文件。
                </div>
                <md-outlined-button @click=${this.skipGuide}>
                  <md-icon slot="icon">close</md-icon>跳过指引
                </md-outlined-button>
              </div>
            </div>
          `:""}

      <app-confirm-dialog
        .open=${this.showClearDialog}
        heading="确认/取消"
        body="确定清除本机保存的扫描缓存与反馈草稿吗？"
        icon-name="delete_forever"
        confirm-label="清除"
        @confirm=${()=>{this.showClearDialog=!1,this.onClearData()}}
        @cancel=${()=>this.showClearDialog=!1}
      ></app-confirm-dialog>
    `}};De.styles=I`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 16px clamp(16px, 6vw, 64px) 24px;
      overflow-y: auto;
    }
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 18px;
      width: min(560px, 100%);
    }
    .list-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      height: 72px;
      padding: 0 24px 0 20px;
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      border-radius: var(--app-shape-list-outer);
      cursor: pointer;
      overflow: hidden;
      -webkit-user-select: none;
      user-select: none;
      transition: transform 0.18s var(--app-ease-spring);
    }
    .list-item:active {
      transform: scale(0.98);
    }
    .list-item .text {
      flex: 1;
      font-size: var(--md-sys-typescale-body-large-size);
      line-height: var(--md-sys-typescale-body-large-line-height);
      font-weight: 500;
      white-space: nowrap;
    }
    .list-item md-icon {
      color: var(--md-sys-color-on-primary-container);
    }
    /* ---- 快速开始区域（点击「了解使用」后展开） ---- */
    .quick-start {
      width: min(560px, 100%);
      animation: quick-start-expand 0.35s var(--app-ease-spring);
    }
    @keyframes quick-start-expand {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .hero-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      height: 188px;
      width: 100%;
      background: var(--md-sys-color-surface-container-highest);
      border-radius: var(--app-shape-card);
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.18s var(--app-ease-spring), box-shadow 0.25s var(--app-ease-standard);
    }
    .hero-card:hover {
      box-shadow: 0 2px 10px 2px rgba(11, 87, 208, 0.12);
    }
    .hero-card:active {
      transform: scale(0.985);
    }
    .hero-card .card-title {
      font-size: var(--md-sys-typescale-title-medium-size);
      line-height: 1.4;
      font-weight: var(--md-sys-typescale-title-medium-weight);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }
    .hero-card md-fab {
      --md-fab-container-shape: var(--app-shape-full);
      --md-fab-primary-container-color: var(--md-sys-color-primary);
      --md-fab-primary-label-text-color: var(--md-sys-color-on-primary);
      --md-fab-primary-icon-color: var(--md-sys-color-on-primary);
      --md-fab-primary-hover-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-primary-pressed-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-label-text-font: var(--app-font-family);
      --md-fab-label-text-size: 15px;
      --md-fab-label-text-weight: 500;
      --md-fab-container-height: 56px;
      width: 160px;
    }
    /* ---- 上层引导界面（箭头指示 + 跳过指引） ---- */
    .guide-overlay {
      position: absolute;
      inset: 0;
      z-index: 30;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: guide-fade-in 0.2s var(--app-ease-standard);
    }
    @keyframes guide-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .guide-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      max-width: 440px;
      padding: 28px 36px 24px;
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-dialog);
      box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.22);
    }
    .guide-arrow {
      font-size: 48px;
      color: var(--md-sys-color-primary);
      animation: guide-bounce 1.1s var(--app-ease-standard) infinite;
    }
    @keyframes guide-bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(12px);
      }
    }
    .guide-text {
      font-size: var(--md-sys-typescale-body-large-size);
      line-height: 1.6;
      color: var(--md-sys-color-on-surface);
      text-align: center;
    }
    .guide-text b {
      color: var(--md-sys-color-primary);
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
    }
    .offline-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      border-radius: var(--app-shape-list-inner);
      font-size: var(--md-sys-typescale-body-medium-size);
      width: min(560px, 100%);
    }
    .offline-bar md-icon {
      font-size: 20px;
    }
    .offline-bar code {
      font-family: 'Cascadia Code', Consolas, monospace;
      background: rgba(65, 14, 11, 0.08);
      padding: 1px 6px;
      border-radius: 4px;
    }
  `;Je([T()],De.prototype,"showClearDialog",2);Je([T()],De.prototype,"offline",2);Je([T()],De.prototype,"serverChecked",2);Je([T()],De.prototype,"quickStartOpen",2);Je([T()],De.prototype,"guideVisible",2);De=Je([B("home-screen")],De);const Zi=Ie(O);class Ve extends Zi{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return y`
      <div class="container ${he(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&e.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return y`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return y`<span class="outline"></span>`}renderLeadingIcon(){return y`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return y`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:y`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const t=e.target;this.hasIcon=t.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable){e.stopImmediatePropagation(),e.preventDefault();return}}}Ve.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0};c([f({type:Boolean,reflect:!0})],Ve.prototype,"disabled",void 0);c([f({type:Boolean,attribute:"soft-disabled",reflect:!0})],Ve.prototype,"softDisabled",void 0);c([f({type:Boolean,attribute:"always-focusable"})],Ve.prototype,"alwaysFocusable",void 0);c([f()],Ve.prototype,"label",void 0);c([f({type:Boolean,reflect:!0,attribute:"has-icon"})],Ve.prototype,"hasIcon",void 0);class ut extends Ve{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(e){const{ariaLabel:t}=this;return this.href?y`
        <a
          class="primary action"
          id="link"
          aria-label=${t||v}
          href=${this.href}
          download=${this.download||v}
          target=${this.target||v}
          >${e}</a
        >
      `:y`
      <button
        class="primary action"
        id="button"
        aria-label=${t||v}
        aria-disabled=${this.softDisabled||v}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `}renderOutline(){return this.elevated?y`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}c([f({type:Boolean})],ut.prototype,"elevated",void 0);c([f()],ut.prototype,"href",void 0);c([f()],ut.prototype,"download",void 0);c([f()],ut.prototype,"target",void 0);const oo=I`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;oo.styleSheet;const io=I`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;io.styleSheet;const no=I`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;no.styleSheet;let yr=class extends ut{};yr.styles=[no,io,oo];yr=c([B("md-assist-chip")],yr);const Ji=Ie(O);class pt extends Ji{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:e}=this;return y`
      <div
        class="progress ${he(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||v}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?v:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}c([f({type:Number})],pt.prototype,"value",void 0);c([f({type:Number})],pt.prototype,"max",void 0);c([f({type:Boolean})],pt.prototype,"indeterminate",void 0);c([f({type:Boolean,attribute:"four-color"})],pt.prototype,"fourColor",void 0);class so extends pt{constructor(){super(...arguments),this.buffer=0}renderIndicator(){const e={transform:`scaleX(${(this.indeterminate?1:this.value/this.max)*100}%)`},t=this.buffer??0,r=t>0,i={transform:`scaleX(${(this.indeterminate||!r?1:t/this.max)*100}%)`},n=this.indeterminate||!r||t>=this.max||this.value>=this.max;return y`
      <div class="dots" ?hidden=${n}></div>
      <div class="inactive-track" style=${Dt(i)}></div>
      <div class="bar primary-bar" style=${Dt(e)}>
        <div class="bar-inner"></div>
      </div>
      <div class="bar secondary-bar">
        <div class="bar-inner"></div>
      </div>
    `}}c([f({type:Number})],so.prototype,"buffer",void 0);const lo=I`:host{--_active-indicator-color: var(--md-linear-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-linear-progress-active-indicator-height, 4px);--_four-color-active-indicator-four-color: var(--md-linear-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-linear-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-linear-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-linear-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_track-color: var(--md-linear-progress-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_track-height: var(--md-linear-progress-track-height, 4px);--_track-shape: var(--md-linear-progress-track-shape, var(--md-sys-shape-corner-none, 0px));border-radius:var(--_track-shape);display:flex;position:relative;min-width:80px;height:var(--_track-height);content-visibility:auto;contain:strict}.progress,.dots,.inactive-track,.bar,.bar-inner{position:absolute}.progress{direction:ltr;inset:0;border-radius:inherit;overflow:hidden;display:flex;align-items:center}.bar{animation:none;width:100%;height:var(--_active-indicator-height);transform-origin:left center;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1)}.secondary-bar{display:none}.bar-inner{inset:0;animation:none;background:var(--_active-indicator-color)}.inactive-track{background:var(--_track-color);inset:0;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1);transform-origin:left center}.dots{inset:0;animation:linear infinite 250ms;animation-name:buffering;background-color:var(--_track-color);background-repeat:repeat-x;-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");z-index:-1}.dots[hidden]{display:none}.indeterminate .bar{transition:none}.indeterminate .primary-bar{inset-inline-start:-145.167%}.indeterminate .secondary-bar{inset-inline-start:-54.8889%;display:block}.indeterminate .primary-bar{animation:linear infinite 2s;animation-name:primary-indeterminate-translate}.indeterminate .primary-bar>.bar-inner{animation:linear infinite 2s primary-indeterminate-scale}.indeterminate.four-color .primary-bar>.bar-inner{animation-name:primary-indeterminate-scale,four-color;animation-duration:2s,4s}.indeterminate .secondary-bar{animation:linear infinite 2s;animation-name:secondary-indeterminate-translate}.indeterminate .secondary-bar>.bar-inner{animation:linear infinite 2s secondary-indeterminate-scale}.indeterminate.four-color .secondary-bar>.bar-inner{animation-name:secondary-indeterminate-scale,four-color;animation-duration:2s,4s}:host(:dir(rtl)){transform:scale(-1)}@keyframes primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes buffering{0%{transform:translateX(calc(var(--_track-height) / 2 * 5))}}@keyframes primary-indeterminate-translate{0%{transform:translateX(0px)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0px)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.6714%)}100%{transform:translateX(200.611%)}}@keyframes secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0px)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.6519%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.3862%)}100%{transform:translateX(160.278%)}}@keyframes four-color{0%{background:var(--_four-color-active-indicator-one-color)}15%{background:var(--_four-color-active-indicator-one-color)}25%{background:var(--_four-color-active-indicator-two-color)}40%{background:var(--_four-color-active-indicator-two-color)}50%{background:var(--_four-color-active-indicator-three-color)}65%{background:var(--_four-color-active-indicator-three-color)}75%{background:var(--_four-color-active-indicator-four-color)}90%{background:var(--_four-color-active-indicator-four-color)}100%{background:var(--_four-color-active-indicator-one-color)}}@media(forced-colors: active){:host{outline:1px solid CanvasText}.bar-inner,.dots{background-color:CanvasText}}
`;lo.styleSheet;let gr=class extends so{};gr.styles=[lo];gr=c([B("md-linear-progress")],gr);var Qi=Object.defineProperty,en=Object.getOwnPropertyDescriptor,Nt=(a,e,t,r)=>{for(var o=r>1?void 0:r?en(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Qi(e,t,o),o};function sa(a,e,t){if(!Number.isFinite(e)||e>60)return t;const r=Math.PI*2/e,o=(a%r+r)%r;return t*Math.cos(Math.PI/e)/Math.cos(o-Math.PI/e)}const Ct=[3,4,5,6,1/0],la=72;let Ze=class extends O{constructor(){super(...arguments),this.size=44,this.boxed=!1,this.colorVar="--md-sys-color-primary",this.raf=0,this.startTime=0,this.loop=a=>{const e=(a-this.startTime)/1e3,t=this.renderRoot.querySelector("polygon");t&&(t.setAttribute("points",this.buildPoints(e)),t.setAttribute("transform",`rotate(${e*140%360} 50 50)`)),this.raf=requestAnimationFrame(this.loop)}}connectedCallback(){super.connectedCallback(),this.startTime=performance.now(),this.loop(this.startTime)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf)}buildPoints(a){const t=a/1%Ct.length,r=Math.floor(t),o=t-r,i=.55;let n=0;if(o>i){const m=(o-i)/(1-i);n=m<.5?2*m*m:1-Math.pow(-2*m+2,2)/2}const s=Ct[r],d=Ct[(r+1)%Ct.length],p=46,h=[];for(let m=0;m<la;m+=1){const b=m/la*Math.PI*2,k=sa(b,s,p),x=sa(b,d,p),_=k+(x-k)*n,w=50+_*Math.cos(b-Math.PI/2),R=50+_*Math.sin(b-Math.PI/2);h.push(`${w.toFixed(2)},${R.toFixed(2)}`)}return h.join(" ")}render(){const a=Math.round(this.size*(this.boxed?.52:1)),e=y`<svg width="${a}" height="${a}" viewBox="0 0 100 100" aria-label="加载中" role="progressbar">
      <polygon points="" style="fill: var(${this.colorVar})" />
    </svg>`;return this.boxed?y`<span class="circle" style="width:${this.size}px;height:${this.size}px">${e}</span>`:e}};Ze.styles=I`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--md-sys-color-secondary-container);
    }
    svg {
      display: block;
    }
  `;Nt([f({type:Number})],Ze.prototype,"size",2);Nt([f({type:Boolean,reflect:!0})],Ze.prototype,"boxed",2);Nt([f({type:String})],Ze.prototype,"colorVar",2);Ze=Nt([B("app-loading-indicator")],Ze);var tn=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,Ue=(a,e,t,r)=>{for(var o=r>1?void 0:r?rn(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&tn(e,t,o),o};let Ce=class extends O{constructor(){super(...arguments),this.scan=null,this.scanning=!1,this.error="",this.offline=!1,this.showStartDialog=!1,this.progress=null}connectedCallback(){super.connectedCallback(),this.scan=L.scan,this.offline=L.serverOnline===!1,this.unsubscribe=Fr(()=>{this.scan=L.scan}),this.addEventListener("screen-active",()=>{this.handleActivation()})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.stopPolling()}async handleActivation(){if(!this.scan){const e=await W.getScanCache();e&&(this.scan=e,L.scan=e,ne())}if((se.currentDetail??{}).rescan||!this.scan){try{const e=await pe.scanProgress();if(e.state==="scanning"){this.progress=e,this.beginScanFollow();return}}catch{}this.showStartDialog=!0}this.refreshDisk()}async refreshDisk(){try{L.diskUsage=await pe.diskUsage(),ne(),this.offline=!1}catch{this.offline=!0}}async startScan(){if(this.showStartDialog=!1,!this.scanning){this.scanning=!0,this.error="",this.progress=null,L.scanning=!0,ne();try{await pe.scanStart(),this.offline=!1,this.beginScanFollow()}catch(a){this.scanning=!1,L.scanning=!1,ne(),this.error=a instanceof Error?a.message:"扫描启动失败",this.offline=!0}}}beginScanFollow(){this.stopPolling(),this.scanning=!0,L.scanning=!0,ne(),this.pollTimer=window.setInterval(()=>{this.pollProgress()},400)}async pollProgress(){try{const a=await pe.scanProgress();this.progress=a,this.offline=!1,a.state==="done"&&a.result?(this.stopPolling(),this.scanning=!1,L.scanning=!1,this.scan=a.result,L.scan=a.result,ne(),await W.saveScanCache(a.result),se.navigate("clean",{direction:"right"})):a.state==="error"&&(this.stopPolling(),this.scanning=!1,L.scanning=!1,ne(),this.error=a.error||"扫描失败")}catch{}}stopPolling(){this.pollTimer!==void 0&&(window.clearInterval(this.pollTimer),this.pollTimer=void 0)}goClean(){se.navigate("clean",{direction:"right"})}goBack(){se.back()}renderSummary(a){const e=L.diskUsage,t=Ka.filter(r=>(a.totals[r]??0)>0||r==="sys");return y`
      <div class="summary">
        <div class="total-block">
          <div class="label">共发现 ${a.targets.length} 个垃圾目录</div>
          <div class="value">${oe(a.totalSize)}</div>
        </div>
        <div class="disk-block">
          <div class="disk-item">
            <span class="k">C盘总容量</span>
            <span class="v">${e?oe(e.total):"--"}</span>
          </div>
          <div class="disk-item">
            <span class="k">已用空间</span>
            <span class="v">${e?oe(e.used):"--"}</span>
          </div>
          <div class="disk-item">
            <span class="k">剩余空间</span>
            <span class="v">${e?oe(e.free):"--"}</span>
          </div>
        </div>
      </div>
      <div class="chips">
        ${t.map(r=>y`
            <md-assist-chip label="${r==="sys"?"系统及通用":r==="browser"?"浏览器缓存":r==="wechat"?"微信缓存":"QQ缓存"} ${oe(a.totals[r]??0)}">
              <md-icon slot="icon">${hr[r]}</md-icon>
            </md-assist-chip>
          `)}
      </div>
    `}render(){const a=Math.max(0,Math.min(100,this.progress?.percent??0)),e=this.progress?.current??"正在准备…",t=this.error?y`
          <div class="empty">
            <md-icon>cloud_off</md-icon>
            <div class="hint">
              无法连接本地清理服务（${this.error}）。<br />
              请在应用目录运行 <b>python server.py</b> 后重试。
            </div>
            <md-outlined-button @click=${()=>this.showStartDialog=!0}>
              <md-icon slot="icon">refresh</md-icon>重新扫描
            </md-outlined-button>
          </div>
        `:y`
          <div class="empty">
            <md-icon>search</md-icon>
            <div class="hint">
              将扫描系统临时文件、浏览器缓存、微信与 QQ 聊天缓存，<br />
              全程约需 10~20 秒。
            </div>
            <div class="ready-actions">
              <md-outlined-button @click=${()=>this.showStartDialog=!0}>
                <md-icon slot="icon">play_arrow</md-icon>开始扫描
              </md-outlined-button>
            </div>
          </div>
        `,r=y`
      <div class="empty">
        <app-loading-indicator size="44" color-var="--md-sys-color-primary"></app-loading-indicator>
        <div class="progress-box">
          <div class="progress-head">
            <span>正在扫描电脑垃圾文件…</span>
            <span class="progress-percent">${a}%</span>
          </div>
          <md-linear-progress .value=${a/100}></md-linear-progress>
          <div class="progress-current">
            <md-icon>folder_open</md-icon>
            <span>${e}</span>
          </div>
        </div>
      </div>
    `,o=this.scan&&this.scan.targets.length>0?y`
            ${this.renderSummary(this.scan)}
            <div class="targets">
              ${this.scan.targets.map(i=>y`
                  <div class="target-row">
                    <md-icon>${hr[i.category]}</md-icon>
                    <div class="target-info">
                      <div class="target-name">${i.name}</div>
                      <div class="target-path" title=${i.path}>${i.path}</div>
                    </div>
                    <div class="target-size">${oe(i.size)}</div>
                  </div>
                `)}
            </div>
          `:this.scan?y`
              <div class="empty">
                <md-icon>verified</md-icon>
                <div class="hint">未发现垃圾文件，系统非常干净。</div>
              </div>
            `:this.scanning?r:t;return y`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="toolbar-row">
        <md-outlined-button @click=${this.goBack}>返回</md-outlined-button>
      </div>

      <div class="stage">
        <div class="container-frame">
          <div class="scroll-area">${o}</div>
          <div class="bottom-row">
            ${this.scanning?y`
                  <div class="scan-status">
                    <app-loading-indicator size="44" color-var="--md-sys-color-primary"></app-loading-indicator>
                    <span>正在扫描… ${a}%</span>
                  </div>
                `:""}
            <md-fab
              variant="primary"
              label=${this.scanning?"扫描中…":"前往清理垃圾"}
              ?disabled=${this.scanning}
              @click=${this.goClean}
            >
              <md-icon slot="icon">arrow_forward_ios</md-icon>
            </md-fab>
          </div>
        </div>
      </div>

      <app-confirm-dialog
        .open=${this.showStartDialog}
        heading="确定开始扫描"
        body="即将扫描系统临时文件、浏览器缓存、微信与 QQ 聊天缓存，全程约需 10~20 秒。确定开始扫描吗？"
        icon-name="search"
        confirm-label="确定开始扫描"
        cancel-label="取消"
        @confirm=${()=>{this.startScan()}}
        @cancel=${()=>this.showStartDialog=!1}
      ></app-confirm-dialog>
    `}};Ce.styles=I`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .toolbar-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 24px 12px;
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
      width: 88px;
    }
    .stage {
      flex: 1;
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding: 0 24px 24px;
      min-height: 0;
    }
    .container-frame {
      position: relative;
      width: min(1048px, 100%);
      background: var(--md-sys-color-primary-container);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: var(--md-sys-color-on-primary-container);
    }
    .scroll-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px 28px 12px;
      min-height: 0;
    }
    .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(4, 30, 73, 0.12);
      margin-bottom: 12px;
    }
    .total-block .label {
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
      opacity: 0.75;
    }
    .total-block .value {
      font-size: 34px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--md-sys-color-on-primary-container);
    }
    .disk-block {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
    }
    .disk-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .disk-item .k {
      opacity: 0.7;
      font-size: var(--md-sys-typescale-body-small-size);
    }
    .disk-item .v {
      font-weight: 500;
    }
    .chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .chips md-assist-chip {
      --md-assist-chip-container-shape: var(--app-shape-full);
      --md-assist-chip-container-color: rgba(255, 255, 255, 0.55);
      --md-assist-chip-label-text-color: var(--md-sys-color-on-primary-container);
      --md-assist-chip-outline-color: rgba(4, 30, 73, 0.2);
      --md-assist-chip-icon-color: var(--md-sys-color-on-primary-container);
      --md-assist-chip-label-text-font: var(--app-font-family);
    }
    .targets {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .target-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.42);
      border-radius: var(--app-shape-list-inner);
    }
    .target-row:first-child {
      border-start-start-radius: var(--app-shape-list-outer);
      border-start-end-radius: var(--app-shape-list-outer);
    }
    .target-row:last-child {
      border-end-start-radius: var(--app-shape-list-outer);
      border-end-end-radius: var(--app-shape-list-outer);
    }
    .target-row md-icon {
      color: var(--md-sys-color-on-primary-container);
      flex: 0 0 auto;
    }
    .target-info {
      flex: 1;
      min-width: 0;
    }
    .target-name {
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .target-path {
      font-size: var(--md-sys-typescale-body-small-size);
      opacity: 0.72;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: rtl;
      text-align: left;
    }
    .target-size {
      font-size: var(--md-sys-typescale-body-medium-size);
      font-weight: 500;
      color: var(--md-sys-color-on-primary-container);
      white-space: nowrap;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 100%;
      text-align: center;
      color: var(--md-sys-color-on-primary-container);
    }
    .empty md-icon {
      font-size: 56px;
    }
    .empty .hint {
      max-width: 480px;
      font-size: var(--md-sys-typescale-body-medium-size);
      opacity: 0.8;
      line-height: 1.5;
    }
    .bottom-row {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 14px 24px 22px;
      background: linear-gradient(to top, rgba(211, 227, 253, 0.95), rgba(211, 227, 253, 0));
    }
    .bottom-row md-fab {
      --md-fab-container-shape: var(--app-shape-full);
      --md-fab-primary-container-color: var(--md-sys-color-primary);
      --md-fab-primary-label-text-color: var(--md-sys-color-on-primary);
      --md-fab-primary-icon-color: var(--md-sys-color-on-primary);
      --md-fab-primary-hover-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-primary-pressed-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-label-text-font: var(--app-font-family);
      --md-fab-label-text-size: 16px;
      --md-fab-label-text-weight: 500;
      --md-fab-container-height: 56px;
      flex: 1;
      min-width: 0;
    }
    .scan-status {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
      white-space: nowrap;
    }
    /* ---- 扫描进度（进度条加载模块） ---- */
    .progress-box {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 14px;
      width: min(560px, 86%);
    }
    .progress-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
    }
    .progress-percent {
      font-size: 22px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
    .progress-current {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--md-sys-typescale-body-medium-size);
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .progress-current md-icon {
      font-size: 18px;
      flex: 0 0 auto;
    }
    md-linear-progress {
      --md-linear-progress-active-indicator-color: var(--md-sys-color-primary);
      --md-linear-progress-track-color: rgba(4, 30, 73, 0.14);
      --md-linear-progress-active-indicator-height: 10px;
      --md-linear-progress-track-shape: var(--app-shape-full);
      border-radius: var(--app-shape-full);
    }
    /* ---- 待扫描（等待用户确认） ---- */
    .ready-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
    }
  `;Ue([T()],Ce.prototype,"scan",2);Ue([T()],Ce.prototype,"scanning",2);Ue([T()],Ce.prototype,"error",2);Ue([T()],Ce.prototype,"offline",2);Ue([T()],Ce.prototype,"showStartDialog",2);Ue([T()],Ce.prototype,"progress",2);Ce=Ue([B("scan-screen")],Ce);var an=Object.getOwnPropertyDescriptor,on=(a,e,t,r)=>{for(var o=r>1?void 0:r?an(e,t):e,i=a.length-1,n;i>=0;i--)(n=a[i])&&(o=n(o)||o);return o};let xr=class extends O{constructor(){super(...arguments),this.screens=null}firstUpdated(){const a=e=>this.renderRoot.querySelector(`${e}-screen`);this.screens={home:a("home"),scan:a("scan"),feedback:a("feedback"),clean:a("clean")};for(const[e,t]of Object.entries(this.screens))e!==se.current&&(t.style.visibility="hidden");se.init(e=>this.screens?.[e]??null,(e,t)=>{this.screens?.[e]?.dispatchEvent(new CustomEvent("screen-active",{bubbles:!1}))}),this.checkServer()}async checkServer(){try{await pe.health(),L.serverOnline=!0,L.serverChecked=!0,ne(),L.diskUsage=await pe.diskUsage(),ne()}catch{L.serverOnline=!1,L.serverChecked=!0,ne()}}onSnackbar(a){const e=a.detail;this.renderRoot.querySelector("app-snackbar")?.show(e.message,{actionLabel:e.actionLabel})}render(){return y`
      <div class="screens" @show-snackbar=${a=>this.onSnackbar(a)}>
        <home-screen></home-screen>
        <scan-screen></scan-screen>
        <feedback-screen></feedback-screen>
        <clean-screen></clean-screen>
      </div>
      <app-snackbar></app-snackbar>
    `}};xr.styles=I`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--md-sys-color-surface);
      position: relative;
      overflow: hidden;
    }
    .screens {
      position: absolute;
      inset: 0;
    }
    home-screen,
    scan-screen,
    feedback-screen,
    clean-screen {
      position: absolute;
      inset: 0;
      will-change: transform, opacity;
    }
  `;xr=on([B("cleaner-app")],xr);function ie(a){return a<0?-1:a===0?0:1}function at(a,e,t){return(1-t)*a+t*e}function nn(a,e,t){return t<a?a:t>e?e:t}function ee(a,e,t){return t<a?a:t>e?e:t}function Vt(a){return a=a%360,a<0&&(a=a+360),a}function sn(a,e){return Vt(e-a)<=180?1:-1}function ln(a,e){return 180-Math.abs(Math.abs(a-e)-180)}function _r(a,e){const t=a[0]*e[0][0]+a[1]*e[0][1]+a[2]*e[0][2],r=a[0]*e[1][0]+a[1]*e[1][1]+a[2]*e[1][2],o=a[0]*e[2][0]+a[1]*e[2][1]+a[2]*e[2][2];return[t,r,o]}const cn=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],dn=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],un=[95.047,100,108.883];function Lr(a,e,t){return(255<<24|(a&255)<<16|(e&255)<<8|t&255)>>>0}function ca(a){const e=Re(a[0]),t=Re(a[1]),r=Re(a[2]);return Lr(e,t,r)}function co(a){return a>>16&255}function uo(a){return a>>8&255}function po(a){return a&255}function pn(a,e,t){const r=dn,o=r[0][0]*a+r[0][1]*e+r[0][2]*t,i=r[1][0]*a+r[1][1]*e+r[1][2]*t,n=r[2][0]*a+r[2][1]*e+r[2][2]*t,s=Re(o),d=Re(i),p=Re(n);return Lr(s,d,p)}function hn(a){const e=Ge(co(a)),t=Ge(uo(a)),r=Ge(po(a));return _r([e,t,r],cn)}function fn(a){const e=Ee(a),t=Re(e);return Lr(t,t,t)}function wr(a){const e=hn(a)[1];return 116*ho(e/100)-16}function Ee(a){return 100*vn((a+16)/116)}function kr(a){return ho(a/100)*116-16}function Ge(a){const e=a/255;return e<=.040449936?e/12.92*100:Math.pow((e+.055)/1.055,2.4)*100}function Re(a){const e=a/100;let t=0;return e<=.0031308?t=e*12.92:t=1.055*Math.pow(e,1/2.4)-.055,nn(0,255,Math.round(t*255))}function mn(){return un}function ho(a){const e=.008856451679035631,t=24389/27;return a>e?Math.pow(a,1/3):(t*a+16)/116}function vn(a){const e=.008856451679035631,t=24389/27,r=a*a*a;return r>e?r:(116*a-16)/t}class me{static make(e=mn(),t=200/Math.PI*Ee(50)/100,r=50,o=2,i=!1){const n=e,s=n[0]*.401288+n[1]*.650173+n[2]*-.051461,d=n[0]*-.250268+n[1]*1.204414+n[2]*.045854,p=n[0]*-.002079+n[1]*.048952+n[2]*.953127,h=.8+o/10,m=h>=.9?at(.59,.69,(h-.9)*10):at(.525,.59,(h-.8)*10);let b=i?1:h*(1-1/3.6*Math.exp((-t-42)/92));b=b>1?1:b<0?0:b;const k=h,x=[b*(100/s)+1-b,b*(100/d)+1-b,b*(100/p)+1-b],_=1/(5*t+1),w=_*_*_*_,R=1-w,z=w*t+.1*R*R*Math.cbrt(5*t),U=Ee(r)/e[1],K=1.48+Math.sqrt(U),X=.725/Math.pow(U,.2),H=X,M=[Math.pow(z*x[0]*s/100,.42),Math.pow(z*x[1]*d/100,.42),Math.pow(z*x[2]*p/100,.42)],G=[400*M[0]/(M[0]+27.13),400*M[1]/(M[1]+27.13),400*M[2]/(M[2]+27.13)],Q=(2*G[0]+G[1]+.05*G[2])*X;return new me(U,Q,X,H,m,k,x,z,Math.pow(z,.25),K)}constructor(e,t,r,o,i,n,s,d,p,h){this.n=e,this.aw=t,this.nbb=r,this.ncb=o,this.c=i,this.nc=n,this.rgbD=s,this.fl=d,this.fLRoot=p,this.z=h}}me.DEFAULT=me.make();class Z{constructor(e,t,r,o,i,n,s,d,p){this.hue=e,this.chroma=t,this.j=r,this.q=o,this.m=i,this.s=n,this.jstar=s,this.astar=d,this.bstar=p}distance(e){const t=this.jstar-e.jstar,r=this.astar-e.astar,o=this.bstar-e.bstar,i=Math.sqrt(t*t+r*r+o*o);return 1.41*Math.pow(i,.63)}static fromInt(e){return Z.fromIntInViewingConditions(e,me.DEFAULT)}static fromIntInViewingConditions(e,t){const r=(e&16711680)>>16,o=(e&65280)>>8,i=e&255,n=Ge(r),s=Ge(o),d=Ge(i),p=.41233895*n+.35762064*s+.18051042*d,h=.2126*n+.7152*s+.0722*d,m=.01932141*n+.11916382*s+.95034478*d,b=.401288*p+.650173*h-.051461*m,k=-.250268*p+1.204414*h+.045854*m,x=-.002079*p+.048952*h+.953127*m,_=t.rgbD[0]*b,w=t.rgbD[1]*k,R=t.rgbD[2]*x,z=Math.pow(t.fl*Math.abs(_)/100,.42),U=Math.pow(t.fl*Math.abs(w)/100,.42),K=Math.pow(t.fl*Math.abs(R)/100,.42),X=ie(_)*400*z/(z+27.13),H=ie(w)*400*U/(U+27.13),M=ie(R)*400*K/(K+27.13),G=(11*X+-12*H+M)/11,Q=(X+H-2*M)/9,q=(20*X+20*H+21*M)/20,ye=(40*X+20*H+M)/20,He=Math.atan2(Q,G)*180/Math.PI,ue=Vt(He),ht=ue*Math.PI/180,ft=ye*t.nbb,Se=100*Math.pow(ft/t.aw,t.c*t.z),mt=4/t.c*Math.sqrt(Se/100)*(t.aw+4)*t.fLRoot,Ut=ue<20.14?ue+360:ue,Ht=.25*(Math.cos(Ut*Math.PI/180+2)+3.8),jt=5e4/13*Ht*t.nc*t.ncb*Math.sqrt(G*G+Q*Q)/(q+.305),vt=Math.pow(jt,.9)*Math.pow(1.64-Math.pow(.29,t.n),.73),Br=vt*Math.sqrt(Se/100),Nr=Br*t.fLRoot,mo=50*Math.sqrt(vt*t.c/(t.aw+4)),vo=(1+100*.007)*Se/(1+.007*Se),Vr=1/.0228*Math.log(1+.0228*Nr),bo=Vr*Math.cos(ht),yo=Vr*Math.sin(ht);return new Z(ue,Br,Se,mt,Nr,mo,vo,bo,yo)}static fromJch(e,t,r){return Z.fromJchInViewingConditions(e,t,r,me.DEFAULT)}static fromJchInViewingConditions(e,t,r,o){const i=4/o.c*Math.sqrt(e/100)*(o.aw+4)*o.fLRoot,n=t*o.fLRoot,s=t/Math.sqrt(e/100),d=50*Math.sqrt(s*o.c/(o.aw+4)),p=r*Math.PI/180,h=(1+100*.007)*e/(1+.007*e),m=1/.0228*Math.log(1+.0228*n),b=m*Math.cos(p),k=m*Math.sin(p);return new Z(r,t,e,i,n,d,h,b,k)}static fromUcs(e,t,r){return Z.fromUcsInViewingConditions(e,t,r,me.DEFAULT)}static fromUcsInViewingConditions(e,t,r,o){const i=t,n=r,s=Math.sqrt(i*i+n*n),p=(Math.exp(s*.0228)-1)/.0228/o.fLRoot;let h=Math.atan2(n,i)*(180/Math.PI);h<0&&(h+=360);const m=e/(1-(e-100)*.007);return Z.fromJchInViewingConditions(m,p,h,o)}toInt(){return this.viewed(me.DEFAULT)}viewed(e){const t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),r=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,i=.25*(Math.cos(o+2)+3.8),n=e.aw*Math.pow(this.j/100,1/e.c/e.z),s=i*(5e4/13)*e.nc*e.ncb,d=n/e.nbb,p=Math.sin(o),h=Math.cos(o),m=23*(d+.305)*r/(23*s+11*r*h+108*r*p),b=m*h,k=m*p,x=(460*d+451*b+288*k)/1403,_=(460*d-891*b-261*k)/1403,w=(460*d-220*b-6300*k)/1403,R=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),z=ie(x)*(100/e.fl)*Math.pow(R,1/.42),U=Math.max(0,27.13*Math.abs(_)/(400-Math.abs(_))),K=ie(_)*(100/e.fl)*Math.pow(U,1/.42),X=Math.max(0,27.13*Math.abs(w)/(400-Math.abs(w))),H=ie(w)*(100/e.fl)*Math.pow(X,1/.42),M=z/e.rgbD[0],G=K/e.rgbD[1],Q=H/e.rgbD[2],q=1.86206786*M-1.01125463*G+.14918677*Q,ye=.38752654*M+.62144744*G-.00897398*Q,Pe=-.0158415*M-.03412294*G+1.04996444*Q;return pn(q,ye,Pe)}static fromXyzInViewingConditions(e,t,r,o){const i=.401288*e+.650173*t-.051461*r,n=-.250268*e+1.204414*t+.045854*r,s=-.002079*e+.048952*t+.953127*r,d=o.rgbD[0]*i,p=o.rgbD[1]*n,h=o.rgbD[2]*s,m=Math.pow(o.fl*Math.abs(d)/100,.42),b=Math.pow(o.fl*Math.abs(p)/100,.42),k=Math.pow(o.fl*Math.abs(h)/100,.42),x=ie(d)*400*m/(m+27.13),_=ie(p)*400*b/(b+27.13),w=ie(h)*400*k/(k+27.13),R=(11*x+-12*_+w)/11,z=(x+_-2*w)/9,U=(20*x+20*_+21*w)/20,K=(40*x+20*_+w)/20,H=Math.atan2(z,R)*180/Math.PI,M=H<0?H+360:H>=360?H-360:H,G=M*Math.PI/180,Q=K*o.nbb,q=100*Math.pow(Q/o.aw,o.c*o.z),ye=4/o.c*Math.sqrt(q/100)*(o.aw+4)*o.fLRoot,Pe=M<20.14?M+360:M,He=1/4*(Math.cos(Pe*Math.PI/180+2)+3.8),ht=5e4/13*He*o.nc*o.ncb*Math.sqrt(R*R+z*z)/(U+.305),ft=Math.pow(ht,.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),Se=ft*Math.sqrt(q/100),mt=Se*o.fLRoot,Ut=50*Math.sqrt(ft*o.c/(o.aw+4)),Ht=(1+100*.007)*q/(1+.007*q),qt=Math.log(1+.0228*mt)/.0228,jt=qt*Math.cos(G),vt=qt*Math.sin(G);return new Z(M,Se,q,ye,mt,Ut,Ht,jt,vt)}xyzInViewingConditions(e){const t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),r=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,i=.25*(Math.cos(o+2)+3.8),n=e.aw*Math.pow(this.j/100,1/e.c/e.z),s=i*(5e4/13)*e.nc*e.ncb,d=n/e.nbb,p=Math.sin(o),h=Math.cos(o),m=23*(d+.305)*r/(23*s+11*r*h+108*r*p),b=m*h,k=m*p,x=(460*d+451*b+288*k)/1403,_=(460*d-891*b-261*k)/1403,w=(460*d-220*b-6300*k)/1403,R=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),z=ie(x)*(100/e.fl)*Math.pow(R,1/.42),U=Math.max(0,27.13*Math.abs(_)/(400-Math.abs(_))),K=ie(_)*(100/e.fl)*Math.pow(U,1/.42),X=Math.max(0,27.13*Math.abs(w)/(400-Math.abs(w))),H=ie(w)*(100/e.fl)*Math.pow(X,1/.42),M=z/e.rgbD[0],G=K/e.rgbD[1],Q=H/e.rgbD[2],q=1.86206786*M-1.01125463*G+.14918677*Q,ye=.38752654*M+.62144744*G-.00897398*Q,Pe=-.0158415*M-.03412294*G+1.04996444*Q;return[q,ye,Pe]}}class S{static sanitizeRadians(e){return(e+Math.PI*8)%(Math.PI*2)}static trueDelinearized(e){const t=e/100;let r=0;return t<=.0031308?r=t*12.92:r=1.055*Math.pow(t,1/2.4)-.055,r*255}static chromaticAdaptation(e){const t=Math.pow(Math.abs(e),.42);return ie(e)*400*t/(t+27.13)}static hueOf(e){const t=_r(e,S.SCALED_DISCOUNT_FROM_LINRGB),r=S.chromaticAdaptation(t[0]),o=S.chromaticAdaptation(t[1]),i=S.chromaticAdaptation(t[2]),n=(11*r+-12*o+i)/11,s=(r+o-2*i)/9;return Math.atan2(s,n)}static areInCyclicOrder(e,t,r){const o=S.sanitizeRadians(t-e),i=S.sanitizeRadians(r-e);return o<i}static intercept(e,t,r){return(t-e)/(r-e)}static lerpPoint(e,t,r){return[e[0]+(r[0]-e[0])*t,e[1]+(r[1]-e[1])*t,e[2]+(r[2]-e[2])*t]}static setCoordinate(e,t,r,o){const i=S.intercept(e[o],t,r[o]);return S.lerpPoint(e,i,r)}static isBounded(e){return 0<=e&&e<=100}static nthVertex(e,t){const r=S.Y_FROM_LINRGB[0],o=S.Y_FROM_LINRGB[1],i=S.Y_FROM_LINRGB[2],n=t%4<=1?0:100,s=t%2===0?0:100;if(t<4){const d=n,p=s,h=(e-d*o-p*i)/r;return S.isBounded(h)?[h,d,p]:[-1,-1,-1]}else if(t<8){const d=n,p=s,h=(e-p*r-d*i)/o;return S.isBounded(h)?[p,h,d]:[-1,-1,-1]}else{const d=n,p=s,h=(e-d*r-p*o)/i;return S.isBounded(h)?[d,p,h]:[-1,-1,-1]}}static bisectToSegment(e,t){let r=[-1,-1,-1],o=r,i=0,n=0,s=!1,d=!0;for(let p=0;p<12;p++){const h=S.nthVertex(e,p);if(h[0]<0)continue;const m=S.hueOf(h);if(!s){r=h,o=h,i=m,n=m,s=!0;continue}(d||S.areInCyclicOrder(i,m,n))&&(d=!1,S.areInCyclicOrder(i,t,m)?(o=h,n=m):(r=h,i=m))}return[r,o]}static midpoint(e,t){return[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}static bisectToLimit(e,t){const r=S.bisectToSegment(e,t);let o=r[0],i=S.hueOf(o),n=r[1];for(let s=0;s<3;s++)if(o[s]!==n[s]){let d=-1,p=255;o[s]<n[s]?(d=S.criticalPlaneBelow(S.trueDelinearized(o[s])),p=S.criticalPlaneAbove(S.trueDelinearized(n[s]))):(d=S.criticalPlaneAbove(S.trueDelinearized(o[s])),p=S.criticalPlaneBelow(S.trueDelinearized(n[s])));for(let h=0;h<8&&!(Math.abs(p-d)<=1);h++){const m=Math.floor((d+p)/2),b=S.CRITICAL_PLANES[m],k=S.setCoordinate(o,b,n,s),x=S.hueOf(k);S.areInCyclicOrder(i,t,x)?(n=k,p=m):(o=k,i=x,d=m)}}return S.midpoint(o,n)}static inverseChromaticAdaptation(e){const t=Math.abs(e),r=Math.max(0,27.13*t/(400-t));return ie(e)*Math.pow(r,1/.42)}static findResultByJ(e,t,r){let o=Math.sqrt(r)*11;const i=me.DEFAULT,n=1/Math.pow(1.64-Math.pow(.29,i.n),.73),d=.25*(Math.cos(e+2)+3.8)*(5e4/13)*i.nc*i.ncb,p=Math.sin(e),h=Math.cos(e);for(let m=0;m<5;m++){const b=o/100,k=t===0||o===0?0:t/Math.sqrt(b),x=Math.pow(k*n,1/.9),w=i.aw*Math.pow(b,1/i.c/i.z)/i.nbb,R=23*(w+.305)*x/(23*d+11*x*h+108*x*p),z=R*h,U=R*p,K=(460*w+451*z+288*U)/1403,X=(460*w-891*z-261*U)/1403,H=(460*w-220*z-6300*U)/1403,M=S.inverseChromaticAdaptation(K),G=S.inverseChromaticAdaptation(X),Q=S.inverseChromaticAdaptation(H),q=_r([M,G,Q],S.LINRGB_FROM_SCALED_DISCOUNT);if(q[0]<0||q[1]<0||q[2]<0)return 0;const ye=S.Y_FROM_LINRGB[0],Pe=S.Y_FROM_LINRGB[1],He=S.Y_FROM_LINRGB[2],ue=ye*q[0]+Pe*q[1]+He*q[2];if(ue<=0)return 0;if(m===4||Math.abs(ue-r)<.002)return q[0]>100.01||q[1]>100.01||q[2]>100.01?0:ca(q);o=o-(ue-r)*o/(2*ue)}return 0}static solveToInt(e,t,r){if(t<1e-4||r<1e-4||r>99.9999)return fn(r);e=Vt(e);const o=e/180*Math.PI,i=Ee(r),n=S.findResultByJ(o,t,i);if(n!==0)return n;const s=S.bisectToLimit(i,o);return ca(s)}static solveToCam(e,t,r){return Z.fromInt(S.solveToInt(e,t,r))}}S.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];S.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];S.Y_FROM_LINRGB=[.2126,.7152,.0722];S.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class A{static from(e,t,r){return new A(S.solveToInt(e,t,r))}static fromInt(e){return new A(e)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(e){this.setInternalState(S.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(e){this.setInternalState(S.solveToInt(this.internalHue,e,this.internalTone))}get tone(){return this.internalTone}set tone(e){this.setInternalState(S.solveToInt(this.internalHue,this.internalChroma,e))}setValue(e,t){this[e]=t}toString(){return`HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`}static isBlue(e){return e>=250&&e<270}static isYellow(e){return e>=105&&e<125}static isCyan(e){return e>=170&&e<207}constructor(e){this.argb=e;const t=Z.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=wr(e),this.argb=e}setInternalState(e){const t=Z.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=wr(e),this.argb=e}inViewingConditions(e){const r=Z.fromInt(this.toInt()).xyzInViewingConditions(e),o=Z.fromXyzInViewingConditions(r[0],r[1],r[2],me.make());return A.from(o.hue,o.chroma,kr(r[1]))}}class Rr{static harmonize(e,t){const r=A.fromInt(e),o=A.fromInt(t),i=ln(r.hue,o.hue),n=Math.min(i*.5,15),s=Vt(r.hue+n*sn(r.hue,o.hue));return A.from(s,r.chroma,r.tone).toInt()}static hctHue(e,t,r){const o=Rr.cam16Ucs(e,t,r),i=Z.fromInt(o),n=Z.fromInt(e);return A.from(i.hue,n.chroma,wr(e)).toInt()}static cam16Ucs(e,t,r){const o=Z.fromInt(e),i=Z.fromInt(t),n=o.jstar,s=o.astar,d=o.bstar,p=i.jstar,h=i.astar,m=i.bstar,b=n+(p-n)*r,k=s+(h-s)*r,x=d+(m-d)*r;return Z.fromUcs(b,k,x).toInt()}}class N{static ratioOfTones(e,t){return e=ee(0,100,e),t=ee(0,100,t),N.ratioOfYs(Ee(e),Ee(t))}static ratioOfYs(e,t){const r=e>t?e:t,o=r===t?e:t;return(r+5)/(o+5)}static lighter(e,t){if(e<0||e>100)return-1;const r=Ee(e),o=t*(r+5)-5,i=N.ratioOfYs(o,r),n=Math.abs(i-t);if(i<t&&n>.04)return-1;const s=kr(o)+.4;return s<0||s>100?-1:s}static darker(e,t){if(e<0||e>100)return-1;const r=Ee(e),o=(r+5)/t-5,i=N.ratioOfYs(r,o),n=Math.abs(i-t);if(i<t&&n>.04)return-1;const s=kr(o)-.4;return s<0||s>100?-1:s}static lighterUnsafe(e,t){const r=N.lighter(e,t);return r<0?100:r}static darkerUnsafe(e,t){const r=N.darker(e,t);return r<0?0:r}}class Mr{static isDisliked(e){const t=Math.round(e.hue)>=90&&Math.round(e.hue)<=111,r=Math.round(e.chroma)>16,o=Math.round(e.tone)<65;return t&&r&&o}static fixIfDisliked(e){return Mr.isDisliked(e)?A.from(e.hue,e.chroma,70):e}}function bn(a,e,t){if(a.name!==t.name)throw new Error(`Attempting to extend color ${a.name} with color ${t.name} of different name for spec version ${e}.`);if(a.isBackground!==t.isBackground)throw new Error(`Attempting to extend color ${a.name} as a ${a.isBackground?"background":"foreground"} with color ${t.name} as a ${t.isBackground?"background":"foreground"} for spec version ${e}.`)}function $(a,e,t){return bn(a,e,t),u.fromPalette({name:a.name,palette:r=>r.specVersion===e?t.palette(r):a.palette(r),tone:r=>r.specVersion===e?t.tone(r):a.tone(r),isBackground:a.isBackground,chromaMultiplier:r=>{const o=r.specVersion===e?t.chromaMultiplier:a.chromaMultiplier;return o!==void 0?o(r):1},background:r=>{const o=r.specVersion===e?t.background:a.background;return o!==void 0?o(r):void 0},secondBackground:r=>{const o=r.specVersion===e?t.secondBackground:a.secondBackground;return o!==void 0?o(r):void 0},contrastCurve:r=>{const o=r.specVersion===e?t.contrastCurve:a.contrastCurve;return o!==void 0?o(r):void 0},toneDeltaPair:r=>{const o=r.specVersion===e?t.toneDeltaPair:a.toneDeltaPair;return o!==void 0?o(r):void 0}})}class u{static fromPalette(e){return new u(e.name??"",e.palette,e.tone??u.getInitialToneFromBackground(e.background),e.isBackground??!1,e.chromaMultiplier,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}static getInitialToneFromBackground(e){return e===void 0?t=>50:t=>e(t)?e(t).getTone(t):50}constructor(e,t,r,o,i,n,s,d,p){if(this.name=e,this.palette=t,this.tone=r,this.isBackground=o,this.chromaMultiplier=i,this.background=n,this.secondBackground=s,this.contrastCurve=d,this.toneDeltaPair=p,this.hctCache=new Map,!n&&s)throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!n&&d)throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(n&&!d)throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}clone(){return u.fromPalette({name:this.name,palette:this.palette,tone:this.tone,isBackground:this.isBackground,chromaMultiplier:this.chromaMultiplier,background:this.background,secondBackground:this.secondBackground,contrastCurve:this.contrastCurve,toneDeltaPair:this.toneDeltaPair})}clearCache(){this.hctCache.clear()}getArgb(e){return this.getHct(e).toInt()}getHct(e){const t=this.hctCache.get(e);if(t!=null)return t;const r=da(e.specVersion).getHct(e,this);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,r),r}getTone(e){return da(e.specVersion).getTone(e,this)}static foregroundTone(e,t){const r=N.lighterUnsafe(e,t),o=N.darkerUnsafe(e,t),i=N.ratioOfTones(r,e),n=N.ratioOfTones(o,e);if(u.tonePrefersLightForeground(e)){const d=Math.abs(i-n)<.1&&i<t&&n<t;return i>=t||i>=n||d?r:o}else return n>=t||n>=i?o:r}static tonePrefersLightForeground(e){return Math.round(e)<60}static toneAllowsLightForeground(e){return Math.round(e)<=49}static enableLightForeground(e){return u.tonePrefersLightForeground(e)&&!u.toneAllowsLightForeground(e)?49:e}}class yn{getHct(e,t){const r=t.getTone(e);return t.palette(e).getHct(r)}getTone(e,t){const r=e.contrastLevel<0,o=t.toneDeltaPair?t.toneDeltaPair(e):void 0;if(o){const i=o.roleA,n=o.roleB,s=o.delta,d=o.polarity,p=o.stayTogether,h=d==="nearer"||d==="lighter"&&!e.isDark||d==="darker"&&e.isDark,m=h?i:n,b=h?n:i,k=t.name===m.name,x=e.isDark?1:-1;let _=m.tone(e),w=b.tone(e);if(t.background&&m.contrastCurve&&b.contrastCurve){const R=t.background(e),z=m.contrastCurve(e),U=b.contrastCurve(e);if(R&&z&&U){const K=R.getTone(e),X=z.get(e.contrastLevel),H=U.get(e.contrastLevel);N.ratioOfTones(K,_)<X&&(_=u.foregroundTone(K,X)),N.ratioOfTones(K,w)<H&&(w=u.foregroundTone(K,H)),r&&(_=u.foregroundTone(K,X),w=u.foregroundTone(K,H))}}return(w-_)*x<s&&(w=ee(0,100,_+s*x),(w-_)*x>=s||(_=ee(0,100,w-s*x))),50<=_&&_<60?x>0?(_=60,w=Math.max(w,_+s*x)):(_=49,w=Math.min(w,_+s*x)):50<=w&&w<60&&(p?x>0?(_=60,w=Math.max(w,_+s*x)):(_=49,w=Math.min(w,_+s*x)):x>0?w=60:w=49),k?_:w}else{let i=t.tone(e);if(t.background==null||t.background(e)===void 0||t.contrastCurve==null||t.contrastCurve(e)===void 0)return i;const n=t.background(e).getTone(e),s=t.contrastCurve(e).get(e.contrastLevel);if(N.ratioOfTones(n,i)>=s||(i=u.foregroundTone(n,s)),r&&(i=u.foregroundTone(n,s)),t.isBackground&&50<=i&&i<60&&(N.ratioOfTones(49,n)>=s?i=49:i=60),t.secondBackground==null||t.secondBackground(e)===void 0)return i;const[d,p]=[t.background,t.secondBackground],[h,m]=[d(e).getTone(e),p(e).getTone(e)],[b,k]=[Math.max(h,m),Math.min(h,m)];if(N.ratioOfTones(b,i)>=s&&N.ratioOfTones(k,i)>=s)return i;const x=N.lighter(b,s),_=N.darker(k,s),w=[];return x!==-1&&w.push(x),_!==-1&&w.push(_),u.tonePrefersLightForeground(h)||u.tonePrefersLightForeground(m)?x<0?100:x:w.length===1?w[0]:_<0?0:_}}}class gn{getHct(e,t){const r=t.palette(e),o=t.getTone(e),i=r.hue,n=r.chroma*(t.chromaMultiplier?t.chromaMultiplier(e):1);return A.from(i,n,o)}getTone(e,t){const r=t.toneDeltaPair?t.toneDeltaPair(e):void 0;if(r){const o=r.roleA,i=r.roleB,n=r.polarity,s=r.constraint,d=n==="darker"||n==="relative_lighter"&&e.isDark||n==="relative_darker"&&!e.isDark?-r.delta:r.delta,p=t.name===o.name,h=p?o:i,m=p?i:o;let b=h.tone(e),k=m.getTone(e);const x=d*(p?1:-1);if(s==="exact"?b=ee(0,100,k+x):s==="nearer"?x>0?b=ee(0,100,ee(k,k+x,b)):b=ee(0,100,ee(k+x,k,b)):s==="farther"&&(x>0?b=ee(k+x,100,b):b=ee(0,k+x,b)),t.background&&t.contrastCurve){const _=t.background(e),w=t.contrastCurve(e);if(_&&w){const R=_.getTone(e),z=w.get(e.contrastLevel);b=N.ratioOfTones(R,b)>=z&&e.contrastLevel>=0?b:u.foregroundTone(R,z)}}return t.isBackground&&!t.name.endsWith("_fixed_dim")&&(b>=57?b=ee(65,100,b):b=ee(0,49,b)),b}else{let o=t.tone(e);if(t.background==null||t.background(e)===void 0||t.contrastCurve==null||t.contrastCurve(e)===void 0)return o;const i=t.background(e).getTone(e),n=t.contrastCurve(e).get(e.contrastLevel);if(o=N.ratioOfTones(i,o)>=n&&e.contrastLevel>=0?o:u.foregroundTone(i,n),t.isBackground&&!t.name.endsWith("_fixed_dim")&&(o>=57?o=ee(65,100,o):o=ee(0,49,o)),t.secondBackground==null||t.secondBackground(e)===void 0)return o;const[s,d]=[t.background,t.secondBackground],[p,h]=[s(e).getTone(e),d(e).getTone(e)],[m,b]=[Math.max(p,h),Math.min(p,h)];if(N.ratioOfTones(m,o)>=n&&N.ratioOfTones(b,o)>=n)return o;const k=N.lighter(m,n),x=N.darker(b,n),_=[];return k!==-1&&_.push(k),x!==-1&&_.push(x),u.tonePrefersLightForeground(p)||u.tonePrefersLightForeground(h)?k<0?100:k:_.length===1?_[0]:x<0?0:x}}}const xn=new yn,_n=new gn;function da(a){return a==="2025"?_n:xn}class ae{static fromInt(e){const t=A.fromInt(e);return ae.fromHct(t)}static fromHct(e){return new ae(e.hue,e.chroma,e)}static fromHueAndChroma(e,t){const r=new wn(e,t).create();return new ae(e,t,r)}constructor(e,t,r){this.hue=e,this.chroma=t,this.keyColor=r,this.cache=new Map}tone(e){let t=this.cache.get(e);return t===void 0&&(e==99&&A.isYellow(this.hue)?t=this.averageArgb(this.tone(98),this.tone(100)):t=A.from(this.hue,this.chroma,e).toInt(),this.cache.set(e,t)),t}getHct(e){return A.fromInt(this.tone(e))}averageArgb(e,t){const r=e>>>16&255,o=e>>>8&255,i=e&255,n=t>>>16&255,s=t>>>8&255,d=t&255,p=Math.round((r+n)/2),h=Math.round((o+s)/2),m=Math.round((i+d)/2);return(255<<24|(p&255)<<16|(h&255)<<8|m&255)>>>0}}class wn{constructor(e,t){this.hue=e,this.requestedChroma=t,this.chromaCache=new Map,this.maxChromaValue=200}create(){let o=0,i=100;for(;o<i;){const n=Math.floor((o+i)/2),s=this.maxChroma(n)<this.maxChroma(n+1);if(this.maxChroma(n)>=this.requestedChroma-.01)if(Math.abs(o-50)<Math.abs(i-50))i=n;else{if(o===n)return A.from(this.hue,this.requestedChroma,o);o=n}else s?o=n+1:i=n}return A.from(this.hue,this.requestedChroma,o)}maxChroma(e){if(this.chromaCache.has(e))return this.chromaCache.get(e);const t=A.from(this.hue,this.maxChromaValue,e).chroma;return this.chromaCache.set(e,t),t}}class C{constructor(e,t,r,o){this.low=e,this.normal=t,this.medium=r,this.high=o}get(e){return e<=-1?this.low:e<0?at(this.low,this.normal,(e- -1)/1):e<.5?at(this.normal,this.medium,(e-0)/.5):e<1?at(this.medium,this.high,(e-.5)/.5):this.high}}class F{constructor(e,t,r,o,i,n){this.roleA=e,this.roleB=t,this.delta=r,this.polarity=o,this.stayTogether=i,this.constraint=n,this.constraint=n??"exact"}}var g;(function(a){a[a.MONOCHROME=0]="MONOCHROME",a[a.NEUTRAL=1]="NEUTRAL",a[a.TONAL_SPOT=2]="TONAL_SPOT",a[a.VIBRANT=3]="VIBRANT",a[a.EXPRESSIVE=4]="EXPRESSIVE",a[a.FIDELITY=5]="FIDELITY",a[a.CONTENT=6]="CONTENT",a[a.RAINBOW=7]="RAINBOW",a[a.FRUIT_SALAD=8]="FRUIT_SALAD"})(g||(g={}));function je(a){return a.variant===g.FIDELITY||a.variant===g.CONTENT}function V(a){return a.variant===g.MONOCHROME}function kn(a,e,t,r){let o=t,i=A.from(a,e,t);if(i.chroma<e){let n=i.chroma;for(;i.chroma<e;){o+=r?-1:1;const s=A.from(a,e,o);if(n>s.chroma||Math.abs(s.chroma-e)<.4)break;const d=Math.abs(s.chroma-e),p=Math.abs(i.chroma-e);d<p&&(i=s),n=Math.max(n,s.chroma)}}return o}class Cn{primaryPaletteKeyColor(){return u.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone})}secondaryPaletteKeyColor(){return u.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone})}tertiaryPaletteKeyColor(){return u.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone})}neutralPaletteKeyColor(){return u.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone})}neutralVariantPaletteKeyColor(){return u.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone})}errorPaletteKeyColor(){return u.fromPalette({name:"error_palette_key_color",palette:e=>e.errorPalette,tone:e=>e.errorPalette.keyColor.tone})}background(){return u.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}onBackground(){return u.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.background(),contrastCurve:e=>new C(3,3,4.5,7)})}surface(){return u.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}surfaceDim(){return u.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new C(87,87,80,75).get(e.contrastLevel),isBackground:!0})}surfaceBright(){return u.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(24,24,29,34).get(e.contrastLevel):98,isBackground:!0})}surfaceContainerLowest(){return u.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(4,4,2,0).get(e.contrastLevel):100,isBackground:!0})}surfaceContainerLow(){return u.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(10,10,11,12).get(e.contrastLevel):new C(96,96,96,95).get(e.contrastLevel),isBackground:!0})}surfaceContainer(){return u.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(12,12,16,20).get(e.contrastLevel):new C(94,94,92,90).get(e.contrastLevel),isBackground:!0})}surfaceContainerHigh(){return u.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(17,17,21,25).get(e.contrastLevel):new C(92,92,88,85).get(e.contrastLevel),isBackground:!0})}surfaceContainerHighest(){return u.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new C(22,22,26,30).get(e.contrastLevel):new C(90,90,84,80).get(e.contrastLevel),isBackground:!0})}onSurface(){return u.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.highestSurface(e),contrastCurve:e=>new C(4.5,7,11,21)})}surfaceVariant(){return u.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0})}onSurfaceVariant(){return u.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>this.highestSurface(e),contrastCurve:e=>new C(3,4.5,7,11)})}inverseSurface(){return u.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20,isBackground:!0})}inverseOnSurface(){return u.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>this.inverseSurface(),contrastCurve:e=>new C(4.5,7,11,21)})}outline(){return u.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1.5,3,4.5,7)})}outlineVariant(){return u.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5)})}shadow(){return u.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0})}scrim(){return u.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0})}surfaceTint(){return u.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0})}primary(){return u.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>V(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(3,4.5,7,7),toneDeltaPair:e=>new F(this.primaryContainer(),this.primary(),10,"nearer",!1)})}primaryDim(){}onPrimary(){return u.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>V(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.primary(),contrastCurve:e=>new C(4.5,7,11,21)})}primaryContainer(){return u.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>je(e)?e.sourceColorHct.tone:V(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.primaryContainer(),this.primary(),10,"nearer",!1)})}onPrimaryContainer(){return u.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>je(e)?u.foregroundTone(this.primaryContainer().tone(e),4.5):V(e)?e.isDark?0:100:e.isDark?90:30,background:e=>this.primaryContainer(),contrastCurve:e=>new C(3,4.5,7,11)})}inversePrimary(){return u.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>this.inverseSurface(),contrastCurve:e=>new C(3,4.5,7,7)})}secondary(){return u.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(3,4.5,7,7),toneDeltaPair:e=>new F(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}secondaryDim(){}onSecondary(){return u.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>V(e)?e.isDark?10:100:e.isDark?20:100,background:e=>this.secondary(),contrastCurve:e=>new C(4.5,7,11,21)})}secondaryContainer(){return u.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{const t=e.isDark?30:90;return V(e)?e.isDark?30:85:je(e)?kn(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}onSecondaryContainer(){return u.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>V(e)?e.isDark?90:10:je(e)?u.foregroundTone(this.secondaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.secondaryContainer(),contrastCurve:e=>new C(3,4.5,7,11)})}tertiary(){return u.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>V(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(3,4.5,7,7),toneDeltaPair:e=>new F(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}tertiaryDim(){}onTertiary(){return u.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>V(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.tertiary(),contrastCurve:e=>new C(4.5,7,11,21)})}tertiaryContainer(){return u.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(V(e))return e.isDark?60:49;if(!je(e))return e.isDark?30:90;const t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return Mr.fixIfDisliked(t).tone},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}onTertiaryContainer(){return u.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>V(e)?e.isDark?0:100:je(e)?u.foregroundTone(this.tertiaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.tertiaryContainer(),contrastCurve:e=>new C(3,4.5,7,11)})}error(){return u.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(3,4.5,7,7),toneDeltaPair:e=>new F(this.errorContainer(),this.error(),10,"nearer",!1)})}errorDim(){}onError(){return u.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>this.error(),contrastCurve:e=>new C(4.5,7,11,21)})}errorContainer(){return u.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.errorContainer(),this.error(),10,"nearer",!1)})}onErrorContainer(){return u.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>V(e)?e.isDark?90:10:e.isDark?90:30,background:e=>this.errorContainer(),contrastCurve:e=>new C(3,4.5,7,11)})}primaryFixed(){return u.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>V(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}primaryFixedDim(){return u.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>V(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}onPrimaryFixed(){return u.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>V(e)?100:10,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new C(4.5,7,11,21)})}onPrimaryFixedVariant(){return u.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>V(e)?90:30,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new C(3,4.5,7,11)})}secondaryFixed(){return u.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>V(e)?80:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}secondaryFixedDim(){return u.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>V(e)?70:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}onSecondaryFixed(){return u.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new C(4.5,7,11,21)})}onSecondaryFixedVariant(){return u.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>V(e)?25:30,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new C(3,4.5,7,11)})}tertiaryFixed(){return u.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>V(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}tertiaryFixedDim(){return u.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>V(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new C(1,1,3,4.5),toneDeltaPair:e=>new F(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}onTertiaryFixed(){return u.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>V(e)?100:10,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new C(4.5,7,11,21)})}onTertiaryFixedVariant(){return u.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>V(e)?90:30,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new C(3,4.5,7,11)})}highestSurface(e){return e.isDark?this.surfaceBright():this.surfaceDim()}}function E(a,e=0,t=100,r=1){let o=fo(a.hue,a.chroma*r,100,!0);return ee(e,t,o)}function $e(a,e=0,t=100){let r=fo(a.hue,a.chroma,0,!1);return ee(e,t,r)}function fo(a,e,t,r){let o=t,i=A.from(a,e,o);for(;i.chroma<e&&!(t<0||t>100);){t+=r?-1:1;const n=A.from(a,e,t);i.chroma<n.chroma&&(i=n,o=t)}return o}function P(a){return a===1.5?new C(1.5,1.5,3,5.5):a===3?new C(3,3,4.5,7):a===4.5?new C(4.5,4.5,7,11):a===6?new C(6,6,7,11):a===7?new C(7,7,11,21):a===9?new C(9,9,11,21):a===11?new C(11,11,21,21):a===21?new C(21,21,21,21):new C(a,a,7,21)}class Pn extends Cn{surface(){const e=u.fromPalette({name:"surface",palette:t=>t.neutralPalette,tone:t=>(super.surface().tone(t),t.platform==="phone"?t.isDark?4:A.isYellow(t.neutralPalette.hue)?99:t.variant===g.VIBRANT?97:98:0),isBackground:!0});return $(super.surface(),"2025",e)}surfaceDim(){const e=u.fromPalette({name:"surface_dim",palette:t=>t.neutralPalette,tone:t=>t.isDark?4:A.isYellow(t.neutralPalette.hue)?90:t.variant===g.VIBRANT?85:87,isBackground:!0,chromaMultiplier:t=>{if(!t.isDark){if(t.variant===g.NEUTRAL)return 2.5;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?2.7:1.75;if(t.variant===g.VIBRANT)return 1.36}return 1}});return $(super.surfaceDim(),"2025",e)}surfaceBright(){const e=u.fromPalette({name:"surface_bright",palette:t=>t.neutralPalette,tone:t=>t.isDark?18:A.isYellow(t.neutralPalette.hue)?99:t.variant===g.VIBRANT?97:98,isBackground:!0,chromaMultiplier:t=>{if(t.isDark){if(t.variant===g.NEUTRAL)return 2.5;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?2.7:1.75;if(t.variant===g.VIBRANT)return 1.36}return 1}});return $(super.surfaceBright(),"2025",e)}surfaceContainerLowest(){const e=u.fromPalette({name:"surface_container_lowest",palette:t=>t.neutralPalette,tone:t=>t.isDark?0:100,isBackground:!0});return $(super.surfaceContainerLowest(),"2025",e)}surfaceContainerLow(){const e=u.fromPalette({name:"surface_container_low",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?6:A.isYellow(t.neutralPalette.hue)?98:t.variant===g.VIBRANT?95:96:15,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 1.3;if(t.variant===g.TONAL_SPOT)return 1.25;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?1.3:1.15;if(t.variant===g.VIBRANT)return 1.08}return 1}});return $(super.surfaceContainerLow(),"2025",e)}surfaceContainer(){const e=u.fromPalette({name:"surface_container",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?9:A.isYellow(t.neutralPalette.hue)?96:t.variant===g.VIBRANT?92:94:20,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 1.6;if(t.variant===g.TONAL_SPOT)return 1.4;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?1.6:1.3;if(t.variant===g.VIBRANT)return 1.15}return 1}});return $(super.surfaceContainer(),"2025",e)}surfaceContainerHigh(){const e=u.fromPalette({name:"surface_container_high",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?12:A.isYellow(t.neutralPalette.hue)?94:t.variant===g.VIBRANT?90:92:25,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 1.9;if(t.variant===g.TONAL_SPOT)return 1.5;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?1.95:1.45;if(t.variant===g.VIBRANT)return 1.22}return 1}});return $(super.surfaceContainerHigh(),"2025",e)}surfaceContainerHighest(){const e=u.fromPalette({name:"surface_container_highest",palette:t=>t.neutralPalette,tone:t=>t.isDark?15:A.isYellow(t.neutralPalette.hue)?92:t.variant===g.VIBRANT?88:90,isBackground:!0,chromaMultiplier:t=>t.variant===g.NEUTRAL?2.2:t.variant===g.TONAL_SPOT?1.7:t.variant===g.EXPRESSIVE?A.isYellow(t.neutralPalette.hue)?2.3:1.6:t.variant===g.VIBRANT?1.29:1});return $(super.surfaceContainerHighest(),"2025",e)}onSurface(){const e=u.fromPalette({name:"on_surface",palette:t=>t.neutralPalette,tone:t=>t.variant===g.VIBRANT?E(t.neutralPalette,0,100,1.1):u.getInitialToneFromBackground(r=>r.platform==="phone"?this.highestSurface(r):this.surfaceContainerHigh())(t),chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 2.2;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.isDark&&t.platform==="phone"?P(11):P(9)});return $(super.onSurface(),"2025",e)}onSurfaceVariant(){const e=u.fromPalette({name:"on_surface_variant",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 2.2;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?t.isDark?P(6):P(4.5):P(7)});return $(super.onSurfaceVariant(),"2025",e)}outline(){const e=u.fromPalette({name:"outline",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 2.2;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(3):P(4.5)});return $(super.outline(),"2025",e)}outlineVariant(){const e=u.fromPalette({name:"outline_variant",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===g.NEUTRAL)return 2.2;if(t.variant===g.TONAL_SPOT)return 1.7;if(t.variant===g.EXPRESSIVE)return A.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(1.5):P(3)});return $(super.outlineVariant(),"2025",e)}inverseSurface(){const e=u.fromPalette({name:"inverse_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?98:4,isBackground:!0});return $(super.inverseSurface(),"2025",e)}inverseOnSurface(){const e=u.fromPalette({name:"inverse_on_surface",palette:t=>t.neutralPalette,background:t=>this.inverseSurface(),contrastCurve:t=>P(7)});return $(super.inverseOnSurface(),"2025",e)}primary(){const e=u.fromPalette({name:"primary",palette:t=>t.primaryPalette,tone:t=>t.variant===g.NEUTRAL?t.platform==="phone"?t.isDark?80:40:90:t.variant===g.TONAL_SPOT?t.platform==="phone"?t.isDark?80:E(t.primaryPalette):E(t.primaryPalette,0,90):t.variant===g.EXPRESSIVE?t.platform==="phone"?E(t.primaryPalette,0,A.isYellow(t.primaryPalette.hue)?25:A.isCyan(t.primaryPalette.hue)?88:98):E(t.primaryPalette):t.platform==="phone"?E(t.primaryPalette,0,A.isCyan(t.primaryPalette.hue)?88:98):E(t.primaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(4.5):P(7),toneDeltaPair:t=>t.platform==="phone"?new F(this.primaryContainer(),this.primary(),5,"relative_lighter",!0,"farther"):void 0});return $(super.primary(),"2025",e)}primaryDim(){return u.fromPalette({name:"primary_dim",palette:e=>e.primaryPalette,tone:e=>e.variant===g.NEUTRAL?85:e.variant===g.TONAL_SPOT?E(e.primaryPalette,0,90):E(e.primaryPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>P(4.5),toneDeltaPair:e=>new F(this.primaryDim(),this.primary(),5,"darker",!0,"farther")})}onPrimary(){const e=u.fromPalette({name:"on_primary",palette:t=>t.primaryPalette,background:t=>t.platform==="phone"?this.primary():this.primaryDim(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onPrimary(),"2025",e)}primaryContainer(){const e=u.fromPalette({name:"primary_container",palette:t=>t.primaryPalette,tone:t=>t.platform==="watch"?30:t.variant===g.NEUTRAL?t.isDark?30:90:t.variant===g.TONAL_SPOT?t.isDark?$e(t.primaryPalette,35,93):E(t.primaryPalette,0,90):t.variant===g.EXPRESSIVE?t.isDark?E(t.primaryPalette,30,93):E(t.primaryPalette,78,A.isCyan(t.primaryPalette.hue)?88:90):t.isDark?$e(t.primaryPalette,66,93):E(t.primaryPalette,66,A.isCyan(t.primaryPalette.hue)?88:93),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="phone"?void 0:new F(this.primaryContainer(),this.primaryDim(),10,"darker",!0,"farther"),contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.primaryContainer(),"2025",e)}onPrimaryContainer(){const e=u.fromPalette({name:"on_primary_container",palette:t=>t.primaryPalette,background:t=>this.primaryContainer(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onPrimaryContainer(),"2025",e)}primaryFixed(){const e=u.fromPalette({name:"primary_fixed",palette:t=>t.primaryPalette,tone:t=>{let r=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.primaryContainer().getTone(r)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.primaryFixed(),"2025",e)}primaryFixedDim(){const e=u.fromPalette({name:"primary_fixed_dim",palette:t=>t.primaryPalette,tone:t=>this.primaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new F(this.primaryFixedDim(),this.primaryFixed(),5,"darker",!0,"exact")});return $(super.primaryFixedDim(),"2025",e)}onPrimaryFixed(){const e=u.fromPalette({name:"on_primary_fixed",palette:t=>t.primaryPalette,background:t=>this.primaryFixedDim(),contrastCurve:t=>P(7)});return $(super.onPrimaryFixed(),"2025",e)}onPrimaryFixedVariant(){const e=u.fromPalette({name:"on_primary_fixed_variant",palette:t=>t.primaryPalette,background:t=>this.primaryFixedDim(),contrastCurve:t=>P(4.5)});return $(super.onPrimaryFixedVariant(),"2025",e)}inversePrimary(){const e=u.fromPalette({name:"inverse_primary",palette:t=>t.primaryPalette,tone:t=>E(t.primaryPalette),background:t=>this.inverseSurface(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.inversePrimary(),"2025",e)}secondary(){const e=u.fromPalette({name:"secondary",palette:t=>t.secondaryPalette,tone:t=>t.platform==="watch"?t.variant===g.NEUTRAL?90:E(t.secondaryPalette,0,90):t.variant===g.NEUTRAL?t.isDark?$e(t.secondaryPalette,0,98):E(t.secondaryPalette):t.variant===g.VIBRANT?E(t.secondaryPalette,0,t.isDark?90:98):t.isDark?80:E(t.secondaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(4.5):P(7),toneDeltaPair:t=>t.platform==="phone"?new F(this.secondaryContainer(),this.secondary(),5,"relative_lighter",!0,"farther"):void 0});return $(super.secondary(),"2025",e)}secondaryDim(){return u.fromPalette({name:"secondary_dim",palette:e=>e.secondaryPalette,tone:e=>e.variant===g.NEUTRAL?85:E(e.secondaryPalette,0,90),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>P(4.5),toneDeltaPair:e=>new F(this.secondaryDim(),this.secondary(),5,"darker",!0,"farther")})}onSecondary(){const e=u.fromPalette({name:"on_secondary",palette:t=>t.secondaryPalette,background:t=>t.platform==="phone"?this.secondary():this.secondaryDim(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onSecondary(),"2025",e)}secondaryContainer(){const e=u.fromPalette({name:"secondary_container",palette:t=>t.secondaryPalette,tone:t=>t.platform==="watch"?30:t.variant===g.VIBRANT?t.isDark?$e(t.secondaryPalette,30,40):E(t.secondaryPalette,84,90):t.variant===g.EXPRESSIVE?t.isDark?15:E(t.secondaryPalette,90,95):t.isDark?25:90,isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new F(this.secondaryContainer(),this.secondaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.secondaryContainer(),"2025",e)}onSecondaryContainer(){const e=u.fromPalette({name:"on_secondary_container",palette:t=>t.secondaryPalette,background:t=>this.secondaryContainer(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onSecondaryContainer(),"2025",e)}secondaryFixed(){const e=u.fromPalette({name:"secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>{let r=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.secondaryContainer().getTone(r)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.secondaryFixed(),"2025",e)}secondaryFixedDim(){const e=u.fromPalette({name:"secondary_fixed_dim",palette:t=>t.secondaryPalette,tone:t=>this.secondaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new F(this.secondaryFixedDim(),this.secondaryFixed(),5,"darker",!0,"exact")});return $(super.secondaryFixedDim(),"2025",e)}onSecondaryFixed(){const e=u.fromPalette({name:"on_secondary_fixed",palette:t=>t.secondaryPalette,background:t=>this.secondaryFixedDim(),contrastCurve:t=>P(7)});return $(super.onSecondaryFixed(),"2025",e)}onSecondaryFixedVariant(){const e=u.fromPalette({name:"on_secondary_fixed_variant",palette:t=>t.secondaryPalette,background:t=>this.secondaryFixedDim(),contrastCurve:t=>P(4.5)});return $(super.onSecondaryFixedVariant(),"2025",e)}tertiary(){const e=u.fromPalette({name:"tertiary",palette:t=>t.tertiaryPalette,tone:t=>t.platform==="watch"?t.variant===g.TONAL_SPOT?E(t.tertiaryPalette,0,90):E(t.tertiaryPalette):t.variant===g.EXPRESSIVE||t.variant===g.VIBRANT?E(t.tertiaryPalette,0,A.isCyan(t.tertiaryPalette.hue)?88:t.isDark?98:100):t.isDark?E(t.tertiaryPalette,0,98):E(t.tertiaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(4.5):P(7),toneDeltaPair:t=>t.platform==="phone"?new F(this.tertiaryContainer(),this.tertiary(),5,"relative_lighter",!0,"farther"):void 0});return $(super.tertiary(),"2025",e)}tertiaryDim(){return u.fromPalette({name:"tertiary_dim",palette:e=>e.tertiaryPalette,tone:e=>e.variant===g.TONAL_SPOT?E(e.tertiaryPalette,0,90):E(e.tertiaryPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>P(4.5),toneDeltaPair:e=>new F(this.tertiaryDim(),this.tertiary(),5,"darker",!0,"farther")})}onTertiary(){const e=u.fromPalette({name:"on_tertiary",palette:t=>t.tertiaryPalette,background:t=>t.platform==="phone"?this.tertiary():this.tertiaryDim(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onTertiary(),"2025",e)}tertiaryContainer(){const e=u.fromPalette({name:"tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>t.platform==="watch"?t.variant===g.TONAL_SPOT?E(t.tertiaryPalette,0,90):E(t.tertiaryPalette):t.variant===g.NEUTRAL?t.isDark?E(t.tertiaryPalette,0,93):E(t.tertiaryPalette,0,96):t.variant===g.TONAL_SPOT?E(t.tertiaryPalette,0,t.isDark?93:100):t.variant===g.EXPRESSIVE?E(t.tertiaryPalette,75,A.isCyan(t.tertiaryPalette.hue)?88:t.isDark?93:100):t.isDark?E(t.tertiaryPalette,0,93):E(t.tertiaryPalette,72,100),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new F(this.tertiaryContainer(),this.tertiaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.tertiaryContainer(),"2025",e)}onTertiaryContainer(){const e=u.fromPalette({name:"on_tertiary_container",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryContainer(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onTertiaryContainer(),"2025",e)}tertiaryFixed(){const e=u.fromPalette({name:"tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>{let r=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.tertiaryContainer().getTone(r)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.tertiaryFixed(),"2025",e)}tertiaryFixedDim(){const e=u.fromPalette({name:"tertiary_fixed_dim",palette:t=>t.tertiaryPalette,tone:t=>this.tertiaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new F(this.tertiaryFixedDim(),this.tertiaryFixed(),5,"darker",!0,"exact")});return $(super.tertiaryFixedDim(),"2025",e)}onTertiaryFixed(){const e=u.fromPalette({name:"on_tertiary_fixed",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryFixedDim(),contrastCurve:t=>P(7)});return $(super.onTertiaryFixed(),"2025",e)}onTertiaryFixedVariant(){const e=u.fromPalette({name:"on_tertiary_fixed_variant",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryFixedDim(),contrastCurve:t=>P(4.5)});return $(super.onTertiaryFixedVariant(),"2025",e)}error(){const e=u.fromPalette({name:"error",palette:t=>t.errorPalette,tone:t=>t.platform==="phone"?t.isDark?$e(t.errorPalette,0,98):E(t.errorPalette):$e(t.errorPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?P(4.5):P(7),toneDeltaPair:t=>t.platform==="phone"?new F(this.errorContainer(),this.error(),5,"relative_lighter",!0,"farther"):void 0});return $(super.error(),"2025",e)}errorDim(){return u.fromPalette({name:"error_dim",palette:e=>e.errorPalette,tone:e=>$e(e.errorPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>P(4.5),toneDeltaPair:e=>new F(this.errorDim(),this.error(),5,"darker",!0,"farther")})}onError(){const e=u.fromPalette({name:"on_error",palette:t=>t.errorPalette,background:t=>t.platform==="phone"?this.error():this.errorDim(),contrastCurve:t=>t.platform==="phone"?P(6):P(7)});return $(super.onError(),"2025",e)}errorContainer(){const e=u.fromPalette({name:"error_container",palette:t=>t.errorPalette,tone:t=>t.platform==="watch"?30:t.isDark?$e(t.errorPalette,30,93):E(t.errorPalette,0,90),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new F(this.errorContainer(),this.errorDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?P(1.5):void 0});return $(super.errorContainer(),"2025",e)}onErrorContainer(){const e=u.fromPalette({name:"on_error_container",palette:t=>t.errorPalette,background:t=>this.errorContainer(),contrastCurve:t=>t.platform==="phone"?P(4.5):P(7)});return $(super.onErrorContainer(),"2025",e)}surfaceVariant(){const e=Object.assign(this.surfaceContainerHighest().clone(),{name:"surface_variant"});return $(super.surfaceVariant(),"2025",e)}surfaceTint(){const e=Object.assign(this.primary().clone(),{name:"surface_tint"});return $(super.surfaceTint(),"2025",e)}background(){const e=Object.assign(this.surface().clone(),{name:"background"});return $(super.background(),"2025",e)}onBackground(){const e=Object.assign(this.onSurface().clone(),{name:"on_background",tone:t=>t.platform==="watch"?100:this.onSurface().getTone(t)});return $(super.onBackground(),"2025",e)}}class l{constructor(){this.allColors=[this.background(),this.onBackground(),this.surface(),this.surfaceDim(),this.surfaceBright(),this.surfaceContainerLowest(),this.surfaceContainerLow(),this.surfaceContainer(),this.surfaceContainerHigh(),this.surfaceContainerHighest(),this.onSurface(),this.onSurfaceVariant(),this.outline(),this.outlineVariant(),this.inverseSurface(),this.inverseOnSurface(),this.primary(),this.primaryDim(),this.onPrimary(),this.primaryContainer(),this.onPrimaryContainer(),this.primaryFixed(),this.primaryFixedDim(),this.onPrimaryFixed(),this.onPrimaryFixedVariant(),this.inversePrimary(),this.secondary(),this.secondaryDim(),this.onSecondary(),this.secondaryContainer(),this.onSecondaryContainer(),this.secondaryFixed(),this.secondaryFixedDim(),this.onSecondaryFixed(),this.onSecondaryFixedVariant(),this.tertiary(),this.tertiaryDim(),this.onTertiary(),this.tertiaryContainer(),this.onTertiaryContainer(),this.tertiaryFixed(),this.tertiaryFixedDim(),this.onTertiaryFixed(),this.onTertiaryFixedVariant(),this.error(),this.errorDim(),this.onError(),this.errorContainer(),this.onErrorContainer()].filter(e=>e!==void 0)}highestSurface(e){return l.colorSpec.highestSurface(e)}primaryPaletteKeyColor(){return l.colorSpec.primaryPaletteKeyColor()}secondaryPaletteKeyColor(){return l.colorSpec.secondaryPaletteKeyColor()}tertiaryPaletteKeyColor(){return l.colorSpec.tertiaryPaletteKeyColor()}neutralPaletteKeyColor(){return l.colorSpec.neutralPaletteKeyColor()}neutralVariantPaletteKeyColor(){return l.colorSpec.neutralVariantPaletteKeyColor()}errorPaletteKeyColor(){return l.colorSpec.errorPaletteKeyColor()}background(){return l.colorSpec.background()}onBackground(){return l.colorSpec.onBackground()}surface(){return l.colorSpec.surface()}surfaceDim(){return l.colorSpec.surfaceDim()}surfaceBright(){return l.colorSpec.surfaceBright()}surfaceContainerLowest(){return l.colorSpec.surfaceContainerLowest()}surfaceContainerLow(){return l.colorSpec.surfaceContainerLow()}surfaceContainer(){return l.colorSpec.surfaceContainer()}surfaceContainerHigh(){return l.colorSpec.surfaceContainerHigh()}surfaceContainerHighest(){return l.colorSpec.surfaceContainerHighest()}onSurface(){return l.colorSpec.onSurface()}surfaceVariant(){return l.colorSpec.surfaceVariant()}onSurfaceVariant(){return l.colorSpec.onSurfaceVariant()}outline(){return l.colorSpec.outline()}outlineVariant(){return l.colorSpec.outlineVariant()}inverseSurface(){return l.colorSpec.inverseSurface()}inverseOnSurface(){return l.colorSpec.inverseOnSurface()}shadow(){return l.colorSpec.shadow()}scrim(){return l.colorSpec.scrim()}surfaceTint(){return l.colorSpec.surfaceTint()}primary(){return l.colorSpec.primary()}primaryDim(){return l.colorSpec.primaryDim()}onPrimary(){return l.colorSpec.onPrimary()}primaryContainer(){return l.colorSpec.primaryContainer()}onPrimaryContainer(){return l.colorSpec.onPrimaryContainer()}inversePrimary(){return l.colorSpec.inversePrimary()}primaryFixed(){return l.colorSpec.primaryFixed()}primaryFixedDim(){return l.colorSpec.primaryFixedDim()}onPrimaryFixed(){return l.colorSpec.onPrimaryFixed()}onPrimaryFixedVariant(){return l.colorSpec.onPrimaryFixedVariant()}secondary(){return l.colorSpec.secondary()}secondaryDim(){return l.colorSpec.secondaryDim()}onSecondary(){return l.colorSpec.onSecondary()}secondaryContainer(){return l.colorSpec.secondaryContainer()}onSecondaryContainer(){return l.colorSpec.onSecondaryContainer()}secondaryFixed(){return l.colorSpec.secondaryFixed()}secondaryFixedDim(){return l.colorSpec.secondaryFixedDim()}onSecondaryFixed(){return l.colorSpec.onSecondaryFixed()}onSecondaryFixedVariant(){return l.colorSpec.onSecondaryFixedVariant()}tertiary(){return l.colorSpec.tertiary()}tertiaryDim(){return l.colorSpec.tertiaryDim()}onTertiary(){return l.colorSpec.onTertiary()}tertiaryContainer(){return l.colorSpec.tertiaryContainer()}onTertiaryContainer(){return l.colorSpec.onTertiaryContainer()}tertiaryFixed(){return l.colorSpec.tertiaryFixed()}tertiaryFixedDim(){return l.colorSpec.tertiaryFixedDim()}onTertiaryFixed(){return l.colorSpec.onTertiaryFixed()}onTertiaryFixedVariant(){return l.colorSpec.onTertiaryFixedVariant()}error(){return l.colorSpec.error()}errorDim(){return l.colorSpec.errorDim()}onError(){return l.colorSpec.onError()}errorContainer(){return l.colorSpec.errorContainer()}onErrorContainer(){return l.colorSpec.onErrorContainer()}static highestSurface(e){return l.colorSpec.highestSurface(e)}}l.contentAccentToneDelta=15;l.colorSpec=new Pn;l.primaryPaletteKeyColor=l.colorSpec.primaryPaletteKeyColor();l.secondaryPaletteKeyColor=l.colorSpec.secondaryPaletteKeyColor();l.tertiaryPaletteKeyColor=l.colorSpec.tertiaryPaletteKeyColor();l.neutralPaletteKeyColor=l.colorSpec.neutralPaletteKeyColor();l.neutralVariantPaletteKeyColor=l.colorSpec.neutralVariantPaletteKeyColor();l.background=l.colorSpec.background();l.onBackground=l.colorSpec.onBackground();l.surface=l.colorSpec.surface();l.surfaceDim=l.colorSpec.surfaceDim();l.surfaceBright=l.colorSpec.surfaceBright();l.surfaceContainerLowest=l.colorSpec.surfaceContainerLowest();l.surfaceContainerLow=l.colorSpec.surfaceContainerLow();l.surfaceContainer=l.colorSpec.surfaceContainer();l.surfaceContainerHigh=l.colorSpec.surfaceContainerHigh();l.surfaceContainerHighest=l.colorSpec.surfaceContainerHighest();l.onSurface=l.colorSpec.onSurface();l.surfaceVariant=l.colorSpec.surfaceVariant();l.onSurfaceVariant=l.colorSpec.onSurfaceVariant();l.inverseSurface=l.colorSpec.inverseSurface();l.inverseOnSurface=l.colorSpec.inverseOnSurface();l.outline=l.colorSpec.outline();l.outlineVariant=l.colorSpec.outlineVariant();l.shadow=l.colorSpec.shadow();l.scrim=l.colorSpec.scrim();l.surfaceTint=l.colorSpec.surfaceTint();l.primary=l.colorSpec.primary();l.onPrimary=l.colorSpec.onPrimary();l.primaryContainer=l.colorSpec.primaryContainer();l.onPrimaryContainer=l.colorSpec.onPrimaryContainer();l.inversePrimary=l.colorSpec.inversePrimary();l.secondary=l.colorSpec.secondary();l.onSecondary=l.colorSpec.onSecondary();l.secondaryContainer=l.colorSpec.secondaryContainer();l.onSecondaryContainer=l.colorSpec.onSecondaryContainer();l.tertiary=l.colorSpec.tertiary();l.onTertiary=l.colorSpec.onTertiary();l.tertiaryContainer=l.colorSpec.tertiaryContainer();l.onTertiaryContainer=l.colorSpec.onTertiaryContainer();l.error=l.colorSpec.error();l.onError=l.colorSpec.onError();l.errorContainer=l.colorSpec.errorContainer();l.onErrorContainer=l.colorSpec.onErrorContainer();l.primaryFixed=l.colorSpec.primaryFixed();l.primaryFixedDim=l.colorSpec.primaryFixedDim();l.onPrimaryFixed=l.colorSpec.onPrimaryFixed();l.onPrimaryFixedVariant=l.colorSpec.onPrimaryFixedVariant();l.secondaryFixed=l.colorSpec.secondaryFixed();l.secondaryFixedDim=l.colorSpec.secondaryFixedDim();l.onSecondaryFixed=l.colorSpec.onSecondaryFixed();l.onSecondaryFixedVariant=l.colorSpec.onSecondaryFixedVariant();l.tertiaryFixed=l.colorSpec.tertiaryFixed();l.tertiaryFixedDim=l.colorSpec.tertiaryFixedDim();l.onTertiaryFixed=l.colorSpec.onTertiaryFixed();l.onTertiaryFixedVariant=l.colorSpec.onTertiaryFixedVariant();class te{static of(e){return new te(e,!1)}static contentOf(e){return new te(e,!0)}static fromColors(e){return te.createPaletteFromColors(!1,e)}static contentFromColors(e){return te.createPaletteFromColors(!0,e)}static createPaletteFromColors(e,t){const r=new te(t.primary,e);if(t.secondary){const o=new te(t.secondary,e);r.a2=o.a1}if(t.tertiary){const o=new te(t.tertiary,e);r.a3=o.a1}if(t.error){const o=new te(t.error,e);r.error=o.a1}if(t.neutral){const o=new te(t.neutral,e);r.n1=o.n1}if(t.neutralVariant){const o=new te(t.neutralVariant,e);r.n2=o.n2}return r}constructor(e,t){const r=A.fromInt(e),o=r.hue,i=r.chroma;t?(this.a1=ae.fromHueAndChroma(o,i),this.a2=ae.fromHueAndChroma(o,i/3),this.a3=ae.fromHueAndChroma(o+60,i/2),this.n1=ae.fromHueAndChroma(o,Math.min(i/12,4)),this.n2=ae.fromHueAndChroma(o,Math.min(i/6,8))):(this.a1=ae.fromHueAndChroma(o,Math.max(48,i)),this.a2=ae.fromHueAndChroma(o,16),this.a3=ae.fromHueAndChroma(o+60,24),this.n1=ae.fromHueAndChroma(o,4),this.n2=ae.fromHueAndChroma(o,8)),this.error=ae.fromHueAndChroma(25,84)}}class _e{get primary(){return this.props.primary}get onPrimary(){return this.props.onPrimary}get primaryContainer(){return this.props.primaryContainer}get onPrimaryContainer(){return this.props.onPrimaryContainer}get secondary(){return this.props.secondary}get onSecondary(){return this.props.onSecondary}get secondaryContainer(){return this.props.secondaryContainer}get onSecondaryContainer(){return this.props.onSecondaryContainer}get tertiary(){return this.props.tertiary}get onTertiary(){return this.props.onTertiary}get tertiaryContainer(){return this.props.tertiaryContainer}get onTertiaryContainer(){return this.props.onTertiaryContainer}get error(){return this.props.error}get onError(){return this.props.onError}get errorContainer(){return this.props.errorContainer}get onErrorContainer(){return this.props.onErrorContainer}get background(){return this.props.background}get onBackground(){return this.props.onBackground}get surface(){return this.props.surface}get onSurface(){return this.props.onSurface}get surfaceVariant(){return this.props.surfaceVariant}get onSurfaceVariant(){return this.props.onSurfaceVariant}get outline(){return this.props.outline}get outlineVariant(){return this.props.outlineVariant}get shadow(){return this.props.shadow}get scrim(){return this.props.scrim}get inverseSurface(){return this.props.inverseSurface}get inverseOnSurface(){return this.props.inverseOnSurface}get inversePrimary(){return this.props.inversePrimary}static light(e){return _e.lightFromCorePalette(te.of(e))}static dark(e){return _e.darkFromCorePalette(te.of(e))}static lightContent(e){return _e.lightFromCorePalette(te.contentOf(e))}static darkContent(e){return _e.darkFromCorePalette(te.contentOf(e))}static lightFromCorePalette(e){return new _e({primary:e.a1.tone(40),onPrimary:e.a1.tone(100),primaryContainer:e.a1.tone(90),onPrimaryContainer:e.a1.tone(10),secondary:e.a2.tone(40),onSecondary:e.a2.tone(100),secondaryContainer:e.a2.tone(90),onSecondaryContainer:e.a2.tone(10),tertiary:e.a3.tone(40),onTertiary:e.a3.tone(100),tertiaryContainer:e.a3.tone(90),onTertiaryContainer:e.a3.tone(10),error:e.error.tone(40),onError:e.error.tone(100),errorContainer:e.error.tone(90),onErrorContainer:e.error.tone(10),background:e.n1.tone(99),onBackground:e.n1.tone(10),surface:e.n1.tone(99),onSurface:e.n1.tone(10),surfaceVariant:e.n2.tone(90),onSurfaceVariant:e.n2.tone(30),outline:e.n2.tone(50),outlineVariant:e.n2.tone(80),shadow:e.n1.tone(0),scrim:e.n1.tone(0),inverseSurface:e.n1.tone(20),inverseOnSurface:e.n1.tone(95),inversePrimary:e.a1.tone(80)})}static darkFromCorePalette(e){return new _e({primary:e.a1.tone(80),onPrimary:e.a1.tone(20),primaryContainer:e.a1.tone(30),onPrimaryContainer:e.a1.tone(90),secondary:e.a2.tone(80),onSecondary:e.a2.tone(20),secondaryContainer:e.a2.tone(30),onSecondaryContainer:e.a2.tone(90),tertiary:e.a3.tone(80),onTertiary:e.a3.tone(20),tertiaryContainer:e.a3.tone(30),onTertiaryContainer:e.a3.tone(90),error:e.error.tone(80),onError:e.error.tone(20),errorContainer:e.error.tone(30),onErrorContainer:e.error.tone(80),background:e.n1.tone(10),onBackground:e.n1.tone(90),surface:e.n1.tone(10),onSurface:e.n1.tone(90),surfaceVariant:e.n2.tone(30),onSurfaceVariant:e.n2.tone(80),outline:e.n2.tone(60),outlineVariant:e.n2.tone(30),shadow:e.n1.tone(0),scrim:e.n1.tone(0),inverseSurface:e.n1.tone(90),inverseOnSurface:e.n1.tone(20),inversePrimary:e.a1.tone(40)})}constructor(e){this.props=e}toJSON(){return{...this.props}}}function ua(a){const e=co(a),t=uo(a),r=po(a),o=[e.toString(16),t.toString(16),r.toString(16)];for(const[i,n]of o.entries())n.length===1&&(o[i]="0"+n);return"#"+o.join("")}function Sn(a){a=a.replace("#","");const e=a.length===3,t=a.length===6,r=a.length===8;if(!e&&!t&&!r)throw new Error("unexpected hex "+a);let o=0,i=0,n=0;return e?(o=xe(a.slice(0,1).repeat(2)),i=xe(a.slice(1,2).repeat(2)),n=xe(a.slice(2,3).repeat(2))):t?(o=xe(a.slice(0,2)),i=xe(a.slice(2,4)),n=xe(a.slice(4,6))):r&&(o=xe(a.slice(2,4)),i=xe(a.slice(4,6)),n=xe(a.slice(6,8))),(255<<24|(o&255)<<16|(i&255)<<8|n&255)>>>0}function xe(a){return parseInt(a,16)}function $n(a,e=[]){const t=te.of(a);return{source:a,schemes:{light:_e.light(a),dark:_e.dark(a)},palettes:{primary:t.a1,secondary:t.a2,tertiary:t.a3,neutral:t.n1,neutralVariant:t.n2,error:t.error},customColors:e.map(r=>An(a,r))}}function An(a,e){let t=e.value;const r=t,o=a;e.blend&&(t=Rr.harmonize(r,o));const n=te.of(t).a1;return{color:e,value:t,light:{color:n.tone(40),onColor:n.tone(100),colorContainer:n.tone(90),onColorContainer:n.tone(10)},dark:{color:n.tone(80),onColor:n.tone(20),colorContainer:n.tone(30),onColorContainer:n.tone(90)}}}const pa="app-accent-color",Tn={primary:"primary",onPrimary:"on-primary",primaryContainer:"primary-container",onPrimaryContainer:"on-primary-container",secondary:"secondary",onSecondary:"on-secondary",secondaryContainer:"secondary-container",onSecondaryContainer:"on-secondary-container",tertiary:"tertiary",onTertiary:"on-tertiary",tertiaryContainer:"tertiary-container",onTertiaryContainer:"on-tertiary-container",error:"error",onError:"on-error",errorContainer:"error-container",onErrorContainer:"on-error-container",surface:"surface",onSurface:"on-surface",surfaceVariant:"surface-variant",onSurfaceVariant:"on-surface-variant",surfaceDim:"surface-dim",surfaceBright:"surface-bright",surfaceContainerLowest:"surface-container-lowest",surfaceContainerLow:"surface-container-low",surfaceContainer:"surface-container",surfaceContainerHigh:"surface-container-high",surfaceContainerHighest:"surface-container-highest",outline:"outline",outlineVariant:"outline-variant",inverseSurface:"inverse-surface",inverseOnSurface:"inverse-on-surface",inversePrimary:"inverse-primary"};function En(){try{const e=new URL(location.href).searchParams.get("accent");if(e&&/^#[0-9a-fA-F]{6}$/.test(e))return localStorage.setItem(pa,e),e;const t=localStorage.getItem(pa);if(t&&/^#[0-9a-fA-F]{6}$/.test(t))return t}catch{}return null}function Dn(){const a=En();if(!a)return!1;try{const{schemes:e}=$n(Sn(a)),t=e.light;for(const[r,o]of Object.entries(Tn)){const i=t[r];typeof i=="number"&&document.documentElement.style.setProperty(`--md-sys-color-${o}`,ua(i))}return document.documentElement.style.setProperty("--md-sys-color-surface-tint",ua(t.primary)),!0}catch{return!1}}Dn();
