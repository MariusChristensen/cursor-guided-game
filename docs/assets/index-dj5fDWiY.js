(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const B={GRID_SIZE:20,TILE_COUNT:20,GAME_SPEED:13,FRAME_TIME:1e3/60,GOLDEN_APPLE_CHANCE:.15,GOLDEN_APPLE_DURATION:5e3,COLORS:{BACKGROUND:"#222831",SNAKE_BASE:"#3eb892",SNAKE_LIGHT:"#45c09c",SNAKE_DARK:"#39a885",TONGUE:"#ff1744"},FRUITS:[{name:"Apple",color:"#e63946",points:10,leafColor:"#2a9d8f"},{name:"Golden Apple",color:"#ffd700",points:50,leafColor:"#ff9f1c"}],MAX_NAME_LENGTH:20,MIN_NAME_LENGTH:1,ERRORS:{LOAD_SCORES:"Failed to load high scores",SAVE_SCORES:"Failed to save high scores"}};var fo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Al=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const o=r[e++];t[n++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=r[e++],a=r[e++],u=r[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(h>>10)),t[n++]=String.fromCharCode(56320+(h&1023))}else{const o=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},fa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const o=r[s],a=s+1<r.length,u=a?r[s+1]:0,h=s+2<r.length,f=h?r[s+2]:0,m=o>>2,v=(o&3)<<4|u>>4;let R=(u&15)<<2|f>>6,P=f&63;h||(P=64,a||(R=64)),n.push(e[m],e[v],e[R],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(da(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Al(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const o=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const f=s<r.length?e[r.charAt(s)]:64;++s;const v=s<r.length?e[r.charAt(s)]:64;if(++s,o==null||u==null||f==null||v==null)throw new wl;const R=o<<2|u>>4;if(n.push(R),f!==64){const P=u<<4&240|f>>2;if(n.push(P),v!==64){const b=f<<6&192|v;n.push(b)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class wl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Rl=function(r){const t=da(r);return fa.encodeByteArray(t,!0)},rr=function(r){return Rl(r).replace(/\./g,"")},Sl=function(r){try{return fa.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=()=>Cl().__FIREBASE_DEFAULTS__,bl=()=>{if(typeof process>"u"||typeof fo>"u")return;const r=fo.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Vl=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&Sl(r[1]);return t&&JSON.parse(t)},ks=()=>{try{return Pl()||bl()||Vl()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Dl=r=>{var t,e;return(e=(t=ks())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[r]},Nl=r=>{const t=Dl(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},ma=()=>{var r;return(r=ks())===null||r===void 0?void 0:r.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",s=r.iat||0,o=r.sub||r.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},r);return[rr(JSON.stringify(e)),rr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ll(){var r;const t=(r=ks())===null||r===void 0?void 0:r.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ml(){return!Ll()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fl(){try{return typeof indexedDB=="object"}catch{return!1}}function Bl(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul="FirebaseError";class Ne extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Ul,Object.setPrototypeOf(this,Ne.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pa.prototype.create)}}class pa{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?ql(o,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Ne(s,u,n)}}function ql(r,t){return r.replace(Gl,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Gl=/\{\$([^}]+)}/g;function fs(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const o=r[s],a=t[s];if(mo(o)&&mo(a)){if(!fs(o,a))return!1}else if(o!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function mo(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(r){return r&&r._delegate?r._delegate:r}class dn{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new kl;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t?.identifier),s=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if($l(t))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});n.resolve(o)}catch{}}}}clearInstance(t=se){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=se){return this.instances.has(t)}getOptions(t=se){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);n===u&&a.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),o=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:zl(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=se){return this.component?this.component.multipleInstances?t:se:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zl(r){return r===se?void 0:r}function $l(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new jl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(z||(z={}));const Hl={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},Ql=z.INFO,Wl={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},Xl=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=Wl[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ga{constructor(t){this.name=t,this._logLevel=Ql,this._logHandler=Xl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Hl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const Yl=(r,t)=>t.some(e=>r instanceof e);let po,go;function Jl(){return po||(po=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zl(){return go||(go=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _a=new WeakMap,ms=new WeakMap,ya=new WeakMap,ns=new WeakMap,xs=new WeakMap;function tu(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",o),r.removeEventListener("error",a)},o=()=>{e(zt(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",o),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&_a.set(e,r)}).catch(()=>{}),xs.set(t,r),t}function eu(r){if(ms.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",o),r.removeEventListener("error",a),r.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",o),r.addEventListener("error",a),r.addEventListener("abort",a)});ms.set(r,t)}let ps={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return ms.get(r);if(t==="objectStoreNames")return r.objectStoreNames||ya.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return zt(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function nu(r){ps=r(ps)}function ru(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(rs(this),t,...e);return ya.set(n,t.sort?t.sort():[t]),zt(n)}:Zl().includes(r)?function(...t){return r.apply(rs(this),t),zt(_a.get(this))}:function(...t){return zt(r.apply(rs(this),t))}}function su(r){return typeof r=="function"?ru(r):(r instanceof IDBTransaction&&eu(r),Yl(r,Jl())?new Proxy(r,ps):r)}function zt(r){if(r instanceof IDBRequest)return tu(r);if(ns.has(r))return ns.get(r);const t=su(r);return t!==r&&(ns.set(r,t),xs.set(t,r)),t}const rs=r=>xs.get(r);function iu(r,t,{blocked:e,upgrade:n,blocking:s,terminated:o}={}){const a=indexedDB.open(r,t),u=zt(a);return n&&a.addEventListener("upgradeneeded",h=>{n(zt(a.result),h.oldVersion,h.newVersion,zt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const ou=["get","getKey","getAll","getAllKeys","count"],au=["put","add","delete","clear"],ss=new Map;function _o(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(ss.get(t))return ss.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=au.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||ou.includes(e)))return;const o=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return n&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),s&&h.done]))[0]};return ss.set(t,o),o}nu(r=>({...r,get:(t,e,n)=>_o(t,e)||r.get(t,e,n),has:(t,e)=>!!_o(t,e)||r.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(lu(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function lu(r){const t=r.getComponent();return t?.type==="VERSION"}const gs="@firebase/app",yo="0.10.17";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=new ga("@firebase/app"),uu="@firebase/app-compat",hu="@firebase/analytics-compat",du="@firebase/analytics",fu="@firebase/app-check-compat",mu="@firebase/app-check",pu="@firebase/auth",gu="@firebase/auth-compat",_u="@firebase/database",yu="@firebase/data-connect",Eu="@firebase/database-compat",Tu="@firebase/functions",vu="@firebase/functions-compat",Iu="@firebase/installations",Au="@firebase/installations-compat",wu="@firebase/messaging",Ru="@firebase/messaging-compat",Su="@firebase/performance",Cu="@firebase/performance-compat",Pu="@firebase/remote-config",bu="@firebase/remote-config-compat",Vu="@firebase/storage",Du="@firebase/storage-compat",Nu="@firebase/firestore",ku="@firebase/vertexai",xu="@firebase/firestore-compat",Ou="firebase",Lu="11.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="[DEFAULT]",Mu={[gs]:"fire-core",[uu]:"fire-core-compat",[du]:"fire-analytics",[hu]:"fire-analytics-compat",[mu]:"fire-app-check",[fu]:"fire-app-check-compat",[pu]:"fire-auth",[gu]:"fire-auth-compat",[_u]:"fire-rtdb",[yu]:"fire-data-connect",[Eu]:"fire-rtdb-compat",[Tu]:"fire-fn",[vu]:"fire-fn-compat",[Iu]:"fire-iid",[Au]:"fire-iid-compat",[wu]:"fire-fcm",[Ru]:"fire-fcm-compat",[Su]:"fire-perf",[Cu]:"fire-perf-compat",[Pu]:"fire-rc",[bu]:"fire-rc-compat",[Vu]:"fire-gcs",[Du]:"fire-gcs-compat",[Nu]:"fire-fst",[xu]:"fire-fst-compat",[ku]:"fire-vertex","fire-js":"fire-js",[Ou]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new Map,Fu=new Map,ys=new Map;function Eo(r,t){try{r.container.addComponent(t)}catch(e){Lt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function ir(r){const t=r.name;if(ys.has(t))return Lt.debug(`There were multiple attempts to register component ${t}.`),!1;ys.set(t,r);for(const e of sr.values())Eo(e,r);for(const e of Fu.values())Eo(e,r);return!0}function Bu(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new pa("app","Firebase",Uu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu=Lu;function Ea(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n=Object.assign({name:_s,automaticDataCollectionEnabled:!1},t),s=n.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(e||(e=ma()),!e)throw $t.create("no-options");const o=sr.get(s);if(o){if(fs(e,o.options)&&fs(n,o.config))return o;throw $t.create("duplicate-app",{appName:s})}const a=new Kl(s);for(const h of ys.values())a.addComponent(h);const u=new qu(e,n,a);return sr.set(s,u),u}function ju(r=_s){const t=sr.get(r);if(!t&&r===_s&&ma())return Ea();if(!t)throw $t.create("no-app",{appName:r});return t}function Ie(r,t,e){var n;let s=(n=Mu[r])!==null&&n!==void 0?n:r;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const u=[`Unable to register library "${s}" with version "${t}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Lt.warn(u.join(" "));return}ir(new dn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="firebase-heartbeat-database",$u=1,fn="firebase-heartbeat-store";let is=null;function Ta(){return is||(is=iu(zu,$u,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(fn)}catch(e){console.warn(e)}}}}).catch(r=>{throw $t.create("idb-open",{originalErrorMessage:r.message})})),is}async function Ku(r){try{const e=(await Ta()).transaction(fn),n=await e.objectStore(fn).get(va(r));return await e.done,n}catch(t){if(t instanceof Ne)Lt.warn(t.message);else{const e=$t.create("idb-get",{originalErrorMessage:t?.message});Lt.warn(e.message)}}}async function To(r,t){try{const n=(await Ta()).transaction(fn,"readwrite");await n.objectStore(fn).put(t,va(r)),await n.done}catch(e){if(e instanceof Ne)Lt.warn(e.message);else{const n=$t.create("idb-set",{originalErrorMessage:e?.message});Lt.warn(n.message)}}}function va(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=1024,Qu=30*24*60*60*1e3;class Wu{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Yu(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=vo();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=Qu}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Lt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=vo(),{heartbeatsToSend:n,unsentEntries:s}=Xu(this._heartbeatsCache.heartbeats),o=rr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Lt.warn(e),""}}}function vo(){return new Date().toISOString().substring(0,10)}function Xu(r,t=Hu){const e=[];let n=r.slice();for(const s of r){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Io(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Io(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class Yu{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fl()?Bl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Ku(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return To(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return To(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Io(r){return rr(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(r){ir(new dn("platform-logger",t=>new cu(t),"PRIVATE")),ir(new dn("heartbeat",t=>new Wu(t),"PRIVATE")),Ie(gs,yo,r),Ie(gs,yo,"esm2017"),Ie("fire-js","")}Ju("");var Ao=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ae,Ia;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function _(){}_.prototype=p.prototype,T.D=p.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(y,E,A){for(var g=Array(arguments.length-2),kt=2;kt<arguments.length;kt++)g[kt-2]=arguments[kt];return p.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)y[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=T.g[0],_=T.g[1],E=T.g[2];var A=T.g[3],g=p+(A^_&(E^A))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+y[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+y[2]+606105819&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+y[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+y[6]+2821735955&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+y[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+y[10]+4294925233&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+y[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+y[14]+2792965006&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^A&(_^E))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+y[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+y[11]+643717713&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+y[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+y[15]+3634488961&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+y[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+y[3]+4107603335&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+y[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+y[7]+1735328473&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^A)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+y[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+y[11]+1839030562&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+y[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+y[7]+4139469664&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+y[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+y[3]+3572445317&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+y[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+y[15]+530742520&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~A))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+y[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+y[14]+2878612391&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+y[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+y[10]+4293915773&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+y[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+y[6]+2734768916&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+y[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+y[2]+718787259&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+y[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}n.prototype.u=function(T,p){p===void 0&&(p=T.length);for(var _=p-this.blockSize,y=this.B,E=this.h,A=0;A<p;){if(E==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<p;)if(y[E++]=T.charCodeAt(A++),E==this.blockSize){s(this,y),E=0;break}}else for(;A<p;)if(y[E++]=T[A++],E==this.blockSize){s(this,y),E=0;break}}this.h=E,this.o+=p},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;var _=8*this.o;for(p=T.length-8;p<T.length;++p)T[p]=_&255,_/=256;for(this.u(T),T=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)T[_++]=this.g[p]>>>y&255;return T};function o(T,p){var _=u;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=p(T)}function a(T,p){this.h=p;for(var _=[],y=!0,E=T.length-1;0<=E;E--){var A=T[E]|0;y&&A==p||(_[E]=A,y=!1)}this.g=_}var u={};function h(T){return-128<=T&&128>T?o(T,function(p){return new a([p|0],0>p?-1:0)}):new a([T|0],0>T?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return v;if(0>T)return N(f(-T));for(var p=[],_=1,y=0;T>=_;y++)p[y]=T/_|0,_*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return N(m(T.substring(1),p));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=v,E=0;E<T.length;E+=8){var A=Math.min(8,T.length-E),g=parseInt(T.substring(E,E+A),p);8>A?(A=f(Math.pow(p,A)),y=y.j(A).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var v=h(0),R=h(1),P=h(16777216);r=a.prototype,r.m=function(){if(D(this))return-N(this).m();for(var T=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);T+=(0<=y?y:4294967296+y)*p,p*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(D(this))return"-"+N(this).toString(T);for(var p=f(Math.pow(T,6)),_=this,y="";;){var E=et(_,p).g;_=U(_,E.j(p));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=E,b(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(var p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function D(T){return T.h==-1}r.l=function(T){return T=U(this,T),D(T)?-1:b(T)?0:1};function N(T){for(var p=T.g.length,_=[],y=0;y<p;y++)_[y]=~T.g[y];return new a(_,~T.h).add(R)}r.abs=function(){return D(this)?N(this):this},r.add=function(T){for(var p=Math.max(this.g.length,T.g.length),_=[],y=0,E=0;E<=p;E++){var A=y+(this.i(E)&65535)+(T.i(E)&65535),g=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);y=g>>>16,A&=65535,g&=65535,_[E]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function U(T,p){return T.add(N(p))}r.j=function(T){if(b(this)||b(T))return v;if(D(this))return D(T)?N(this).j(N(T)):N(N(this).j(T));if(D(T))return N(this.j(N(T)));if(0>this.l(P)&&0>T.l(P))return f(this.m()*T.m());for(var p=this.g.length+T.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<T.g.length;E++){var A=this.i(y)>>>16,g=this.i(y)&65535,kt=T.i(E)>>>16,Fe=T.i(E)&65535;_[2*y+2*E]+=g*Fe,K(_,2*y+2*E),_[2*y+2*E+1]+=A*Fe,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*kt,K(_,2*y+2*E+1),_[2*y+2*E+2]+=A*kt,K(_,2*y+2*E+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function K(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function Q(T,p){this.g=T,this.h=p}function et(T,p){if(b(p))throw Error("division by zero");if(b(T))return new Q(v,v);if(D(T))return p=et(N(T),p),new Q(N(p.g),N(p.h));if(D(p))return p=et(T,N(p)),new Q(N(p.g),p.h);if(30<T.g.length){if(D(T)||D(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=p;0>=y.l(T);)_=Nt(_),y=Nt(y);var E=at(_,1),A=at(y,1);for(y=at(y,2),_=at(_,2);!b(y);){var g=A.add(y);0>=g.l(T)&&(E=E.add(_),A=g),y=at(y,1),_=at(_,1)}return p=U(T,E.j(p)),new Q(E,p)}for(E=v;0<=T.l(p);){for(_=Math.max(1,Math.floor(T.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=f(_),g=A.j(p);D(g)||0<g.l(T);)_-=y,A=f(_),g=A.j(p);b(A)&&(A=R),E=E.add(A),T=U(T,g)}return new Q(E,T)}r.A=function(T){return et(this,T).h},r.and=function(T){for(var p=Math.max(this.g.length,T.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&T.i(y);return new a(_,this.h&T.h)},r.or=function(T){for(var p=Math.max(this.g.length,T.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|T.i(y);return new a(_,this.h|T.h)},r.xor=function(T){for(var p=Math.max(this.g.length,T.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^T.i(y);return new a(_,this.h^T.h)};function Nt(T){for(var p=T.g.length+1,_=[],y=0;y<p;y++)_[y]=T.i(y)<<1|T.i(y-1)>>>31;return new a(_,T.h)}function at(T,p){var _=p>>5;p%=32;for(var y=T.g.length-_,E=[],A=0;A<y;A++)E[A]=0<p?T.i(A+_)>>>p|T.i(A+_+1)<<32-p:T.i(A+_);return new a(E,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Ia=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,ae=a}).apply(typeof Ao<"u"?Ao:typeof self<"u"?self:typeof window<"u"?window:{});var $n=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Aa,rn,wa,Yn,Es,Ra,Sa,Ca;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,l){return i==Array.prototype||i==Object.prototype||(i[c]=l.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof $n=="object"&&$n];for(var c=0;c<i.length;++c){var l=i[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function s(i,c){if(c)t:{var l=n;i=i.split(".");for(var d=0;d<i.length-1;d++){var I=i[d];if(!(I in l))break t;l=l[I]}i=i[i.length-1],d=l[i],c=c(d),c!=d&&c!=null&&t(l,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var l=0,d=!1,I={next:function(){if(!d&&l<i.length){var w=l++;return{value:c(w,i[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(i){return i||function(){return o(this,function(c,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function h(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function f(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function m(i,c,l){return i.call.apply(i.bind,arguments)}function v(i,c,l){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),i.apply(c,I)}}return function(){return i.apply(c,arguments)}}function R(i,c,l){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:v,R.apply(null,arguments)}function P(i,c){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function b(i,c){function l(){}l.prototype=c.prototype,i.aa=c.prototype,i.prototype=new l,i.prototype.constructor=i,i.Qb=function(d,I,w){for(var V=Array(arguments.length-2),W=2;W<arguments.length;W++)V[W-2]=arguments[W];return c.prototype[I].apply(d,V)}}function D(i){const c=i.length;if(0<c){const l=Array(c);for(let d=0;d<c;d++)l[d]=i[d];return l}return[]}function N(i,c){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const I=i.length||0,w=d.length||0;i.length=I+w;for(let V=0;V<w;V++)i[I+V]=d[V]}else i.push(d)}}class U{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(i){return/^[\s\xa0]*$/.test(i)}function Q(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function et(i){return et[" "](i),i}et[" "]=function(){};var Nt=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function at(i,c,l){for(const d in i)c.call(l,i[d],d,i)}function T(i,c){for(const l in i)c.call(void 0,i[l],l,i)}function p(i){const c={};for(const l in i)c[l]=i[l];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,c){let l,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(l in d)i[l]=d[l];for(let w=0;w<_.length;w++)l=_[w],Object.prototype.hasOwnProperty.call(d,l)&&(i[l]=d[l])}}function E(i){var c=1;i=i.split(":");const l=[];for(;0<c&&i.length;)l.push(i.shift()),c--;return i.length&&l.push(i.join(":")),l}function A(i){u.setTimeout(()=>{throw i},0)}function g(){var i=Nr;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class kt{constructor(){this.h=this.g=null}add(c,l){const d=Fe.get();d.set(c,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Fe=new U(()=>new Gc,i=>i.reset());class Gc{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Be,Ue=!1,Nr=new kt,di=()=>{const i=u.Promise.resolve(void 0);Be=()=>{i.then(jc)}};var jc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(l){A(l)}var c=Fe;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}Ue=!1};function Bt(){this.s=this.s,this.C=this.C}Bt.prototype.s=!1,Bt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Bt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var zc=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};u.addEventListener("test",l,c),u.removeEventListener("test",l,c)}catch{}return i}();function qe(i,c){if(dt.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var l=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(Nt){t:{try{et(c.nodeName);var I=!0;break t}catch{}I=!1}I||(c=null)}}else l=="mouseover"?c=i.fromElement:l=="mouseout"&&(c=i.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:$c[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&qe.aa.h.call(this)}}b(qe,dt);var $c={2:"touch",3:"pen",4:"mouse"};qe.prototype.h=function(){qe.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Sn="closure_listenable_"+(1e6*Math.random()|0),Kc=0;function Hc(i,c,l,d,I){this.listener=i,this.proxy=null,this.src=c,this.type=l,this.capture=!!d,this.ha=I,this.key=++Kc,this.da=this.fa=!1}function Cn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Pn(i){this.src=i,this.g={},this.h=0}Pn.prototype.add=function(i,c,l,d,I){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var V=xr(i,c,d,I);return-1<V?(c=i[V],l||(c.fa=!1)):(c=new Hc(c,this.src,w,!!d,I),c.fa=l,i.push(c)),c};function kr(i,c){var l=c.type;if(l in i.g){var d=i.g[l],I=Array.prototype.indexOf.call(d,c,void 0),w;(w=0<=I)&&Array.prototype.splice.call(d,I,1),w&&(Cn(c),i.g[l].length==0&&(delete i.g[l],i.h--))}}function xr(i,c,l,d){for(var I=0;I<i.length;++I){var w=i[I];if(!w.da&&w.listener==c&&w.capture==!!l&&w.ha==d)return I}return-1}var Or="closure_lm_"+(1e6*Math.random()|0),Lr={};function fi(i,c,l,d,I){if(Array.isArray(c)){for(var w=0;w<c.length;w++)fi(i,c[w],l,d,I);return null}return l=gi(l),i&&i[Sn]?i.K(c,l,f(d)?!!d.capture:!!d,I):Qc(i,c,l,!1,d,I)}function Qc(i,c,l,d,I,w){if(!c)throw Error("Invalid event type");var V=f(I)?!!I.capture:!!I,W=Fr(i);if(W||(i[Or]=W=new Pn(i)),l=W.add(c,l,d,V,w),l.proxy)return l;if(d=Wc(),l.proxy=d,d.src=i,d.listener=l,i.addEventListener)zc||(I=V),I===void 0&&(I=!1),i.addEventListener(c.toString(),d,I);else if(i.attachEvent)i.attachEvent(pi(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Wc(){function i(l){return c.call(i.src,i.listener,l)}const c=Xc;return i}function mi(i,c,l,d,I){if(Array.isArray(c))for(var w=0;w<c.length;w++)mi(i,c[w],l,d,I);else d=f(d)?!!d.capture:!!d,l=gi(l),i&&i[Sn]?(i=i.i,c=String(c).toString(),c in i.g&&(w=i.g[c],l=xr(w,l,d,I),-1<l&&(Cn(w[l]),Array.prototype.splice.call(w,l,1),w.length==0&&(delete i.g[c],i.h--)))):i&&(i=Fr(i))&&(c=i.g[c.toString()],i=-1,c&&(i=xr(c,l,d,I)),(l=-1<i?c[i]:null)&&Mr(l))}function Mr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[Sn])kr(c.i,i);else{var l=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(l,d,i.capture):c.detachEvent?c.detachEvent(pi(l),d):c.addListener&&c.removeListener&&c.removeListener(d),(l=Fr(c))?(kr(l,i),l.h==0&&(l.src=null,c[Or]=null)):Cn(i)}}}function pi(i){return i in Lr?Lr[i]:Lr[i]="on"+i}function Xc(i,c){if(i.da)i=!0;else{c=new qe(c,this);var l=i.listener,d=i.ha||i.src;i.fa&&Mr(i),i=l.call(d,c)}return i}function Fr(i){return i=i[Or],i instanceof Pn?i:null}var Br="__closure_events_fn_"+(1e9*Math.random()>>>0);function gi(i){return typeof i=="function"?i:(i[Br]||(i[Br]=function(c){return i.handleEvent(c)}),i[Br])}function ft(){Bt.call(this),this.i=new Pn(this),this.M=this,this.F=null}b(ft,Bt),ft.prototype[Sn]=!0,ft.prototype.removeEventListener=function(i,c,l,d){mi(this,i,c,l,d)};function Et(i,c){var l,d=i.F;if(d)for(l=[];d;d=d.F)l.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new dt(c,i);else if(c instanceof dt)c.target=c.target||i;else{var I=c;c=new dt(d,i),y(c,I)}if(I=!0,l)for(var w=l.length-1;0<=w;w--){var V=c.g=l[w];I=bn(V,d,!0,c)&&I}if(V=c.g=i,I=bn(V,d,!0,c)&&I,I=bn(V,d,!1,c)&&I,l)for(w=0;w<l.length;w++)V=c.g=l[w],I=bn(V,d,!1,c)&&I}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var l=i.g[c],d=0;d<l.length;d++)Cn(l[d]);delete i.g[c],i.h--}}this.F=null},ft.prototype.K=function(i,c,l,d){return this.i.add(String(i),c,!1,l,d)},ft.prototype.L=function(i,c,l,d){return this.i.add(String(i),c,!0,l,d)};function bn(i,c,l,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,w=0;w<c.length;++w){var V=c[w];if(V&&!V.da&&V.capture==l){var W=V.listener,ct=V.ha||V.src;V.fa&&kr(i.i,V),I=W.call(ct,d)!==!1&&I}}return I&&!d.defaultPrevented}function _i(i,c,l){if(typeof i=="function")l&&(i=R(i,l));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(i,c||0)}function yi(i){i.g=_i(()=>{i.g=null,i.i&&(i.i=!1,yi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Yc extends Bt{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:yi(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ge(i){Bt.call(this),this.h=i,this.g={}}b(Ge,Bt);var Ei=[];function Ti(i){at(i.g,function(c,l){this.g.hasOwnProperty(l)&&Mr(c)},i),i.g={}}Ge.prototype.N=function(){Ge.aa.N.call(this),Ti(this)},Ge.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ur=u.JSON.stringify,Jc=u.JSON.parse,Zc=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function qr(){}qr.prototype.h=null;function vi(i){return i.h||(i.h=i.i())}function Ii(){}var je={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Gr(){dt.call(this,"d")}b(Gr,dt);function jr(){dt.call(this,"c")}b(jr,dt);var te={},Ai=null;function Vn(){return Ai=Ai||new ft}te.La="serverreachability";function wi(i){dt.call(this,te.La,i)}b(wi,dt);function ze(i){const c=Vn();Et(c,new wi(c))}te.STAT_EVENT="statevent";function Ri(i,c){dt.call(this,te.STAT_EVENT,i),this.stat=c}b(Ri,dt);function Tt(i){const c=Vn();Et(c,new Ri(c,i))}te.Ma="timingevent";function Si(i,c){dt.call(this,te.Ma,i),this.size=c}b(Si,dt);function $e(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},c)}function Ke(){this.g=!0}Ke.prototype.xa=function(){this.g=!1};function tl(i,c,l,d,I,w){i.info(function(){if(i.g)if(w)for(var V="",W=w.split("&"),ct=0;ct<W.length;ct++){var $=W[ct].split("=");if(1<$.length){var mt=$[0];$=$[1];var pt=mt.split("_");V=2<=pt.length&&pt[1]=="type"?V+(mt+"="+$+"&"):V+(mt+"=redacted&")}}else V=null;else V=w;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+c+`
`+l+`
`+V})}function el(i,c,l,d,I,w,V){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+c+`
`+l+`
`+w+" "+V})}function fe(i,c,l,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+rl(i,l)+(d?" "+d:"")})}function nl(i,c){i.info(function(){return"TIMEOUT: "+c})}Ke.prototype.info=function(){};function rl(i,c){if(!i.g)return c;if(!c)return null;try{var l=JSON.parse(c);if(l){for(i=0;i<l.length;i++)if(Array.isArray(l[i])){var d=l[i];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var w=I[0];if(w!="noop"&&w!="stop"&&w!="close")for(var V=1;V<I.length;V++)I[V]=""}}}}return Ur(l)}catch{return c}}var Dn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ci={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},zr;function Nn(){}b(Nn,qr),Nn.prototype.g=function(){return new XMLHttpRequest},Nn.prototype.i=function(){return{}},zr=new Nn;function Ut(i,c,l,d){this.j=i,this.i=c,this.l=l,this.R=d||1,this.U=new Ge(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pi}function Pi(){this.i=null,this.g="",this.h=!1}var bi={},$r={};function Kr(i,c,l){i.L=1,i.v=Ln(xt(c)),i.m=l,i.P=!0,Vi(i,null)}function Vi(i,c){i.F=Date.now(),kn(i),i.A=xt(i.v);var l=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),zi(l.i,"t",d),i.C=0,l=i.j.J,i.h=new Pi,i.g=co(i.j,l?c:null,!i.m),0<i.O&&(i.M=new Yc(R(i.Y,i,i.g),i.O)),c=i.U,l=i.g,d=i.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ei[0]=I.toString()),I=Ei);for(var w=0;w<I.length;w++){var V=fi(l,I[w],d||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),ze(),tl(i.i,i.u,i.A,i.l,i.R,i.m)}Ut.prototype.ca=function(i){i=i.target;const c=this.M;c&&Ot(i)==3?c.j():this.Y(i)},Ut.prototype.Y=function(i){try{if(i==this.g)t:{const pt=Ot(this.g);var c=this.g.Ba();const ge=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Yi(this.g)))){this.J||pt!=4||c==7||(c==8||0>=ge?ze(3):ze(2)),Hr(this);var l=this.g.Z();this.X=l;e:if(Di(this)){var d=Yi(this.g);i="";var I=d.length,w=Ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ee(this),He(this);var V="";break e}this.h.i=new u.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,i+=this.h.i.decode(d[c],{stream:!(w&&c==I-1)});d.length=0,this.h.g+=i,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=l==200,el(this.i,this.u,this.A,this.l,this.R,pt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ct=this.g;if((W=ct.g?ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var $=W;break e}}$=null}if(l=$)fe(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Qr(this,l);else{this.o=!1,this.s=3,Tt(12),ee(this),He(this);break t}}if(this.P){l=!0;let Rt;for(;!this.J&&this.C<V.length;)if(Rt=sl(this,V),Rt==$r){pt==4&&(this.s=4,Tt(14),l=!1),fe(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==bi){this.s=4,Tt(15),fe(this.i,this.l,V,"[Invalid Chunk]"),l=!1;break}else fe(this.i,this.l,Rt,null),Qr(this,Rt);if(Di(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||V.length!=0||this.h.h||(this.s=1,Tt(16),l=!1),this.o=this.o&&l,!l)fe(this.i,this.l,V,"[Invalid Chunked Response]"),ee(this),He(this);else if(0<V.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),ts(mt),mt.M=!0,Tt(11))}}else fe(this.i,this.l,V,null),Qr(this,V);pt==4&&ee(this),this.o&&!this.J&&(pt==4?so(this.j,this):(this.o=!1,kn(this)))}else vl(this.g),l==400&&0<V.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),ee(this),He(this)}}}catch{}finally{}};function Di(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function sl(i,c){var l=i.C,d=c.indexOf(`
`,l);return d==-1?$r:(l=Number(c.substring(l,d)),isNaN(l)?bi:(d+=1,d+l>c.length?$r:(c=c.slice(d,d+l),i.C=d+l,c)))}Ut.prototype.cancel=function(){this.J=!0,ee(this)};function kn(i){i.S=Date.now()+i.I,Ni(i,i.I)}function Ni(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=$e(R(i.ba,i),c)}function Hr(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Ut.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(nl(this.i,this.A),this.L!=2&&(ze(),Tt(17)),ee(this),this.s=2,He(this)):Ni(this,this.S-i)};function He(i){i.j.G==0||i.J||so(i.j,i)}function ee(i){Hr(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,Ti(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function Qr(i,c){try{var l=i.j;if(l.G!=0&&(l.g==i||Wr(l.h,i))){if(!i.K&&Wr(l.h,i)&&l.G==3){try{var d=l.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<i.F)Gn(l),Un(l);else break t;Zr(l),Tt(18)}}else l.za=I[1],0<l.za-l.T&&37500>I[2]&&l.F&&l.v==0&&!l.C&&(l.C=$e(R(l.Za,l),6e3));if(1>=Oi(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else re(l,11)}else if((i.K||l.g==i)&&Gn(l),!K(c))for(I=l.Da.g.parse(c),c=0;c<I.length;c++){let $=I[c];if(l.T=$[0],$=$[1],l.G==2)if($[0]=="c"){l.K=$[1],l.ia=$[2];const mt=$[3];mt!=null&&(l.la=mt,l.j.info("VER="+l.la));const pt=$[4];pt!=null&&(l.Aa=pt,l.j.info("SVER="+l.Aa));const ge=$[5];ge!=null&&typeof ge=="number"&&0<ge&&(d=1.5*ge,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const Rt=i.g;if(Rt){const zn=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(zn){var w=d.h;w.g||zn.indexOf("spdy")==-1&&zn.indexOf("quic")==-1&&zn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Xr(w,w.h),w.h=null))}if(d.D){const es=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;es&&(d.ya=es,X(d.I,d.D,es))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-i.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var V=i;if(d.qa=ao(d,d.J?d.ia:null,d.W),V.K){Li(d.h,V);var W=V,ct=d.L;ct&&(W.I=ct),W.B&&(Hr(W),kn(W)),d.g=V}else no(d);0<l.i.length&&qn(l)}else $[0]!="stop"&&$[0]!="close"||re(l,7);else l.G==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?re(l,7):Jr(l):$[0]!="noop"&&l.l&&l.l.ta($),l.v=0)}}ze(4)}catch{}}var il=class{constructor(i,c){this.g=i,this.map=c}};function ki(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xi(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Oi(i){return i.h?1:i.g?i.g.size:0}function Wr(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function Xr(i,c){i.g?i.g.add(c):i.h=c}function Li(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}ki.prototype.cancel=function(){if(this.i=Mi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Mi(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const l of i.g.values())c=c.concat(l.D);return c}return D(i.i)}function ol(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var c=[],l=i.length,d=0;d<l;d++)c.push(i[d]);return c}c=[],l=0;for(d in i)c[l++]=i[d];return c}function al(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var c=[];i=i.length;for(var l=0;l<i;l++)c.push(l);return c}c=[],l=0;for(const d in i)c[l++]=d;return c}}}function Fi(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var l=al(i),d=ol(i),I=d.length,w=0;w<I;w++)c.call(void 0,d[w],l&&l[w],i)}var Bi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cl(i,c){if(i){i=i.split("&");for(var l=0;l<i.length;l++){var d=i[l].indexOf("="),I=null;if(0<=d){var w=i[l].substring(0,d);I=i[l].substring(d+1)}else w=i[l];c(w,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function ne(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof ne){this.h=i.h,xn(this,i.j),this.o=i.o,this.g=i.g,On(this,i.s),this.l=i.l;var c=i.i,l=new Xe;l.i=c.i,c.g&&(l.g=new Map(c.g),l.h=c.h),Ui(this,l),this.m=i.m}else i&&(c=String(i).match(Bi))?(this.h=!1,xn(this,c[1]||"",!0),this.o=Qe(c[2]||""),this.g=Qe(c[3]||"",!0),On(this,c[4]),this.l=Qe(c[5]||"",!0),Ui(this,c[6]||"",!0),this.m=Qe(c[7]||"")):(this.h=!1,this.i=new Xe(null,this.h))}ne.prototype.toString=function(){var i=[],c=this.j;c&&i.push(We(c,qi,!0),":");var l=this.g;return(l||c=="file")&&(i.push("//"),(c=this.o)&&i.push(We(c,qi,!0),"@"),i.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&i.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(We(l,l.charAt(0)=="/"?hl:ul,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",We(l,fl)),i.join("")};function xt(i){return new ne(i)}function xn(i,c,l){i.j=l?Qe(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function On(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function Ui(i,c,l){c instanceof Xe?(i.i=c,ml(i.i,i.h)):(l||(c=We(c,dl)),i.i=new Xe(c,i.h))}function X(i,c,l){i.i.set(c,l)}function Ln(i){return X(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Qe(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function We(i,c,l){return typeof i=="string"?(i=encodeURI(i).replace(c,ll),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ll(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var qi=/[#\/\?@]/g,ul=/[#\?:]/g,hl=/[#\?]/g,dl=/[#\?@]/g,fl=/#/g;function Xe(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function qt(i){i.g||(i.g=new Map,i.h=0,i.i&&cl(i.i,function(c,l){i.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}r=Xe.prototype,r.add=function(i,c){qt(this),this.i=null,i=me(this,i);var l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(c),this.h+=1,this};function Gi(i,c){qt(i),c=me(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function ji(i,c){return qt(i),c=me(i,c),i.g.has(c)}r.forEach=function(i,c){qt(this),this.g.forEach(function(l,d){l.forEach(function(I){i.call(c,I,d,this)},this)},this)},r.na=function(){qt(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),l=[];for(let d=0;d<c.length;d++){const I=i[d];for(let w=0;w<I.length;w++)l.push(c[d])}return l},r.V=function(i){qt(this);let c=[];if(typeof i=="string")ji(this,i)&&(c=c.concat(this.g.get(me(this,i))));else{i=Array.from(this.g.values());for(let l=0;l<i.length;l++)c=c.concat(i[l])}return c},r.set=function(i,c){return qt(this),this.i=null,i=me(this,i),ji(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},r.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function zi(i,c,l){Gi(i,c),0<l.length&&(i.i=null,i.g.set(me(i,c),D(l)),i.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var l=0;l<c.length;l++){var d=c[l];const w=encodeURIComponent(String(d)),V=this.V(d);for(d=0;d<V.length;d++){var I=w;V[d]!==""&&(I+="="+encodeURIComponent(String(V[d]))),i.push(I)}}return this.i=i.join("&")};function me(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function ml(i,c){c&&!i.j&&(qt(i),i.i=null,i.g.forEach(function(l,d){var I=d.toLowerCase();d!=I&&(Gi(this,d),zi(this,I,l))},i)),i.j=c}function pl(i,c){const l=new Ke;if(u.Image){const d=new Image;d.onload=P(Gt,l,"TestLoadImage: loaded",!0,c,d),d.onerror=P(Gt,l,"TestLoadImage: error",!1,c,d),d.onabort=P(Gt,l,"TestLoadImage: abort",!1,c,d),d.ontimeout=P(Gt,l,"TestLoadImage: timeout",!1,c,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function gl(i,c){const l=new Ke,d=new AbortController,I=setTimeout(()=>{d.abort(),Gt(l,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(w=>{clearTimeout(I),w.ok?Gt(l,"TestPingServer: ok",!0,c):Gt(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),Gt(l,"TestPingServer: error",!1,c)})}function Gt(i,c,l,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(l)}catch{}}function _l(){this.g=new Zc}function yl(i,c,l){const d=l||"";try{Fi(i,function(I,w){let V=I;f(I)&&(V=Ur(I)),c.push(d+w+"="+encodeURIComponent(V))})}catch(I){throw c.push(d+"type="+encodeURIComponent("_badmap")),I}}function Mn(i){this.l=i.Ub||null,this.j=i.eb||!1}b(Mn,qr),Mn.prototype.g=function(){return new Fn(this.l,this.j)},Mn.prototype.i=function(i){return function(){return i}}({});function Fn(i,c){ft.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Fn,ft),r=Fn.prototype,r.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,Je(this)},r.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ye(this)),this.readyState=0},r.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Je(this)),this.g&&(this.readyState=3,Je(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$i(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function $i(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}r.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?Ye(this):Je(this),this.readyState==3&&$i(this)}},r.Ra=function(i){this.g&&(this.response=this.responseText=i,Ye(this))},r.Qa=function(i){this.g&&(this.response=i,Ye(this))},r.ga=function(){this.g&&Ye(this)};function Ye(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Je(i)}r.setRequestHeader=function(i,c){this.u.append(i,c)},r.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=c.next();return i.join(`\r
`)};function Je(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Fn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ki(i){let c="";return at(i,function(l,d){c+=d,c+=":",c+=l,c+=`\r
`}),c}function Yr(i,c,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=Ki(l),typeof i=="string"?l!=null&&encodeURIComponent(String(l)):X(i,c,l))}function Z(i){ft.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(Z,ft);var El=/^https?$/i,Tl=["POST","PUT"];r=Z.prototype,r.Ha=function(i){this.J=i},r.ea=function(i,c,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():zr.g(),this.v=this.o?vi(this.o):vi(zr),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(w){Hi(this,w);return}if(i=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)l.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())l.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),I=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Tl,c,void 0))||d||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,V]of l)this.g.setRequestHeader(w,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xi(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){Hi(this,w)}};function Hi(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,Qi(i),Bn(i)}function Qi(i){i.A||(i.A=!0,Et(i,"complete"),Et(i,"error"))}r.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Et(this,"complete"),Et(this,"abort"),Bn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Bn(this,!0)),Z.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Wi(this):this.bb())},r.bb=function(){Wi(this)};function Wi(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Ot(i)!=4||i.Z()!=2)){if(i.u&&Ot(i)==4)_i(i.Ea,0,i);else if(Et(i,"readystatechange"),Ot(i)==4){i.h=!1;try{const V=i.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var l;if(!(l=c)){var d;if(d=V===0){var I=String(i.D).match(Bi)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),d=!El.test(I?I.toLowerCase():"")}l=d}if(l)Et(i,"complete"),Et(i,"success");else{i.m=6;try{var w=2<Ot(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",Qi(i)}}finally{Bn(i)}}}}function Bn(i,c){if(i.g){Xi(i);const l=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||Et(i,"ready");try{l.onreadystatechange=d}catch{}}}function Xi(i){i.I&&(u.clearTimeout(i.I),i.I=null)}r.isActive=function(){return!!this.g};function Ot(i){return i.g?i.g.readyState:0}r.Z=function(){try{return 2<Ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),Jc(c)}};function Yi(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function vl(i){const c={};i=(i.g&&2<=Ot(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(K(i[d]))continue;var l=E(i[d]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=c[I]||[];c[I]=w,w.push(l)}T(c,function(d){return d.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ze(i,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||c}function Ji(i){this.Aa=0,this.i=[],this.j=new Ke,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,i),this.cb=Ze("retryDelaySeedMs",1e4,i),this.Wa=Ze("forwardChannelMaxRetries",2,i),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new ki(i&&i.concurrentRequestLimit),this.Da=new _l,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Ji.prototype,r.la=8,r.G=1,r.connect=function(i,c,l,d){Tt(0),this.W=i,this.H=c||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=ao(this,null,this.W),qn(this)};function Jr(i){if(Zi(i),i.G==3){var c=i.U++,l=xt(i.I);if(X(l,"SID",i.K),X(l,"RID",c),X(l,"TYPE","terminate"),tn(i,l),c=new Ut(i,i.j,c),c.L=2,c.v=Ln(xt(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=c.v,l=!0),l||(c.g=co(c.j,null),c.g.ea(c.v)),c.F=Date.now(),kn(c)}oo(i)}function Un(i){i.g&&(ts(i),i.g.cancel(),i.g=null)}function Zi(i){Un(i),i.u&&(u.clearTimeout(i.u),i.u=null),Gn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function qn(i){if(!xi(i.h)&&!i.s){i.s=!0;var c=i.Ga;Be||di(),Ue||(Be(),Ue=!0),Nr.add(c,i),i.B=0}}function Il(i,c){return Oi(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=$e(R(i.Ga,i,c),io(i,i.B)),i.B++,!0)}r.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const I=new Ut(this,this.j,i);let w=this.o;if(this.S&&(w?(w=p(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(I.H=w,w=null),this.P)t:{for(var c=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=l;break t}if(c===4096||l===this.i.length-1){c=l+1;break t}}c=1e3}else c=1e3;c=eo(this,I,c),l=xt(this.I),X(l,"RID",i),X(l,"CVER",22),this.D&&X(l,"X-HTTP-Session-Id",this.D),tn(this,l),w&&(this.O?c="headers="+encodeURIComponent(String(Ki(w)))+"&"+c:this.m&&Yr(l,this.m,w)),Xr(this.h,I),this.Ua&&X(l,"TYPE","init"),this.P?(X(l,"$req",c),X(l,"SID","null"),I.T=!0,Kr(I,l,null)):Kr(I,l,c),this.G=2}}else this.G==3&&(i?to(this,i):this.i.length==0||xi(this.h)||to(this))};function to(i,c){var l;c?l=c.l:l=i.U++;const d=xt(i.I);X(d,"SID",i.K),X(d,"RID",l),X(d,"AID",i.T),tn(i,d),i.m&&i.o&&Yr(d,i.m,i.o),l=new Ut(i,i.j,l,i.B+1),i.m===null&&(l.H=i.o),c&&(i.i=c.D.concat(i.i)),c=eo(i,l,1e3),l.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Xr(i.h,l),Kr(l,d,c)}function tn(i,c){i.H&&at(i.H,function(l,d){X(c,d,l)}),i.l&&Fi({},function(l,d){X(c,d,l)})}function eo(i,c,l){l=Math.min(i.i.length,l);var d=i.l?R(i.l.Na,i.l,i):null;t:{var I=i.i;let w=-1;for(;;){const V=["count="+l];w==-1?0<l?(w=I[0].g,V.push("ofs="+w)):w=0:V.push("ofs="+w);let W=!0;for(let ct=0;ct<l;ct++){let $=I[ct].g;const mt=I[ct].map;if($-=w,0>$)w=Math.max(0,I[ct].g-100),W=!1;else try{yl(mt,V,"req"+$+"_")}catch{d&&d(mt)}}if(W){d=V.join("&");break t}}}return i=i.i.splice(0,l),c.D=i,d}function no(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;Be||di(),Ue||(Be(),Ue=!0),Nr.add(c,i),i.v=0}}function Zr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=$e(R(i.Fa,i),io(i,i.v)),i.v++,!0)}r.Fa=function(){if(this.u=null,ro(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=$e(R(this.ab,this),i)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),Un(this),ro(this))};function ts(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function ro(i){i.g=new Ut(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=xt(i.qa);X(c,"RID","rpc"),X(c,"SID",i.K),X(c,"AID",i.T),X(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&X(c,"TO",i.ja),X(c,"TYPE","xmlhttp"),tn(i,c),i.m&&i.o&&Yr(c,i.m,i.o),i.L&&(i.g.I=i.L);var l=i.g;i=i.ia,l.L=1,l.v=Ln(xt(c)),l.m=null,l.P=!0,Vi(l,i)}r.Za=function(){this.C!=null&&(this.C=null,Un(this),Zr(this),Tt(19))};function Gn(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function so(i,c){var l=null;if(i.g==c){Gn(i),ts(i),i.g=null;var d=2}else if(Wr(i.h,c))l=c.D,Li(i.h,c),d=1;else return;if(i.G!=0){if(c.o)if(d==1){l=c.m?c.m.length:0,c=Date.now()-c.F;var I=i.B;d=Vn(),Et(d,new Si(d,l)),qn(i)}else no(i);else if(I=c.s,I==3||I==0&&0<c.X||!(d==1&&Il(i,c)||d==2&&Zr(i)))switch(l&&0<l.length&&(c=i.h,c.i=c.i.concat(l)),I){case 1:re(i,5);break;case 4:re(i,10);break;case 3:re(i,6);break;default:re(i,2)}}}function io(i,c){let l=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(l*=2),l*c}function re(i,c){if(i.j.info("Error code "+c),c==2){var l=R(i.fb,i),d=i.Xa;const I=!d;d=new ne(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||xn(d,"https"),Ln(d),I?pl(d.toString(),l):gl(d.toString(),l)}else Tt(2);i.G=0,i.l&&i.l.sa(c),oo(i),Zi(i)}r.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function oo(i){if(i.G=0,i.ka=[],i.l){const c=Mi(i.h);(c.length!=0||i.i.length!=0)&&(N(i.ka,c),N(i.ka,i.i),i.h.i.length=0,D(i.i),i.i.length=0),i.l.ra()}}function ao(i,c,l){var d=l instanceof ne?xt(l):new ne(l);if(d.g!="")c&&(d.g=c+"."+d.g),On(d,d.s);else{var I=u.location;d=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var w=new ne(null);d&&xn(w,d),c&&(w.g=c),I&&On(w,I),l&&(w.l=l),d=w}return l=i.D,c=i.ya,l&&c&&X(d,l,c),X(d,"VER",i.la),tn(i,d),d}function co(i,c,l){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new Z(new Mn({eb:l})):new Z(i.pa),c.Ha(i.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function lo(){}r=lo.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function jn(){}jn.prototype.g=function(i,c){return new It(i,c)};function It(i,c){ft.call(this),this.g=new Ji(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!K(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new pe(this)}b(It,ft),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){Jr(this.g)},It.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.u&&(l={},l.__data__=Ur(i),i=l);c.i.push(new il(c.Ya++,i)),c.G==3&&qn(c)},It.prototype.N=function(){this.g.l=null,delete this.j,Jr(this.g),delete this.g,It.aa.N.call(this)};function uo(i){Gr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const l in c){i=l;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}b(uo,Gr);function ho(){jr.call(this),this.status=1}b(ho,jr);function pe(i){this.g=i}b(pe,lo),pe.prototype.ua=function(){Et(this.g,"a")},pe.prototype.ta=function(i){Et(this.g,new uo(i))},pe.prototype.sa=function(i){Et(this.g,new ho)},pe.prototype.ra=function(){Et(this.g,"b")},jn.prototype.createWebChannel=jn.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,Ca=function(){return new jn},Sa=function(){return Vn()},Ra=te,Es={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Dn.NO_ERROR=0,Dn.TIMEOUT=8,Dn.HTTP_ERROR=6,Yn=Dn,Ci.COMPLETE="complete",wa=Ci,Ii.EventType=je,je.OPEN="a",je.CLOSE="b",je.ERROR="c",je.MESSAGE="d",ft.prototype.listen=ft.prototype.K,rn=Ii,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,Aa=Z}).apply(typeof $n<"u"?$n:typeof self<"u"?self:typeof window<"u"?window:{});const wo="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}_t.UNAUTHENTICATED=new _t(null),_t.GOOGLE_CREDENTIALS=new _t("google-credentials-uid"),_t.FIRST_PARTY=new _t("first-party-uid"),_t.MOCK_USER=new _t("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ke="11.0.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=new ga("@firebase/firestore");function ye(){return ce.logLevel}function k(r,...t){if(ce.logLevel<=z.DEBUG){const e=t.map(Os);ce.debug(`Firestore (${ke}): ${r}`,...e)}}function Mt(r,...t){if(ce.logLevel<=z.ERROR){const e=t.map(Os);ce.error(`Firestore (${ke}): ${r}`,...e)}}function Re(r,...t){if(ce.logLevel<=z.WARN){const e=t.map(Os);ce.warn(`Firestore (${ke}): ${r}`,...e)}}function Os(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r="Unexpected state"){const t=`FIRESTORE (${ke}) INTERNAL ASSERTION FAILED: `+r;throw Mt(t),new Error(t)}function H(r,t){r||L()}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends Ne{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Zu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class th{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class eh{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0);let n=this.i;const s=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},u=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(H(typeof n.accessToken=="string"),new Pa(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string"),new _t(t)}}class nh{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const t=this.I();return t&&this.T.set("Authorization",t),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class rh{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new nh(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class sh{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ih{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){H(this.o===void 0);const n=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string"),this.R=e.token,new sh(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=oh(40);for(let o=0;o<s.length;++o)n.length<20&&s[o]<e&&(n+=t.charAt(s[o]%t.length))}return n}}function G(r,t){return r<t?-1:r>t?1:0}function Se(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{static now(){return st.fromMillis(Date.now())}static fromDate(t){return st.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new st(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?G(this.nanoseconds,t.nanoseconds):G(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{static fromTimestamp(t){return new M(t)}static min(){return new M(new st(0,0))}static max(){return new M(new st(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(t,e,n){e===void 0?e=0:e>t.length&&L(),n===void 0?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return mn.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof mn?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const o=t.get(s),a=e.get(s);if(o<a)return-1;if(o>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends mn{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new x(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const ah=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends mn{construct(t,e,n){return new ut(t,e,n)}static isValidIdentifier(t){return ah.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ut(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const o=()=>{if(n.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new x(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(o(),s++)}if(o(),a)throw new x(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ut(e)}static emptyPath(){return new ut([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(Y.fromString(t))}static fromName(t){return new O(Y.fromString(t).popFirst(5))}static empty(){return new O(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new Y(t.slice()))}}function ch(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=M.fromTimestamp(n===1e9?new st(e+1,0):new st(e,n));return new Qt(s,O.empty(),t)}function lh(r){return new Qt(r.readTime,r.key,-1)}class Qt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Qt(M.min(),O.empty(),-1)}static max(){return new Qt(M.max(),O.empty(),-1)}}function uh(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(r.documentKey,t.documentKey),e!==0?e:G(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class dh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xe(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==hh)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((n,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,n)=>{e(t)})}static reject(t){return new S((e,n)=>{n(t)})}static waitFor(t){return new S((e,n)=>{let s=0,o=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++o,a&&o===s&&e()},h=>n(h))}),a=!0,o===s&&e()})}static or(t){let e=S.resolve(!1);for(const n of t)e=e.next(s=>s?S.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,o)=>{n.push(e.call(this,s,o))}),this.waitFor(n)}static mapArray(t,e){return new S((n,s)=>{const o=t.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{a[f]=m,++u,u===o&&n(a)},m=>s(m))}})}static doWhile(t,e){return new S((n,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):n()};o()})}}function fh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Oe(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}gr.oe=-1;function _r(r){return r==null}function or(r){return r===0&&1/r==-1/0}function mh(r){return typeof r=="number"&&Number.isInteger(r)&&!or(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Ro(t)),t=gh(r.get(e),t);return Ro(t)}function gh(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const o=r.charAt(s);switch(o){case"\0":e+="";break;case"":e+="";break;default:e+=o}}return e}function Ro(r){return r+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function le(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Va(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t,e){this.comparator=t,this.root=e||lt.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,lt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Kn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Kn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Kn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Kn(this.root,t,this.comparator,!0)}}class Kn{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class lt{constructor(t,e,n,s,o){this.key=t,this.value=e,this.color=n??lt.RED,this.left=s??lt.EMPTY,this.right=o??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,o){return new lt(t??this.key,e??this.value,n??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const o=n(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,n),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return lt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,s,o){return this}insert(t,e,n){return new lt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Co(this.data.getIterator())}getIteratorFrom(t){return new Co(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof it)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=n.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new it(this.comparator);return e.data=t,e}}class Co{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(ut.comparator)}static empty(){return new St([])}unionWith(t){let e=new it(ut.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Se(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Da("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return G(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const _h=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(r){if(H(!!r),typeof r=="string"){let t=0;const e=_h.exec(r);if(H(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:tt(r.seconds),nanos:tt(r.nanos)}}function tt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function yr(r){const t=r.mapValue.fields.__previous_value__;return Ls(t)?yr(t):t}function pn(r){const t=Wt(r.mapValue.fields.__local_write_time__.timestampValue);return new st(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(t,e,n,s,o,a,u,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class gn{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new gn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof gn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Yt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ls(r)?4:Th(r)?9007199254740991:Eh(r)?10:11:L()}function Dt(r,t){if(r===t)return!0;const e=Yt(r);if(e!==Yt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return pn(r).isEqual(pn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Wt(s.timestampValue),u=Wt(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,o){return Xt(s.bytesValue).isEqual(Xt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(r,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),u=tt(o.doubleValue);return a===u?or(a)===or(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return Se(r.arrayValue.values||[],t.arrayValue.values||[],Dt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},u=o.mapValue.fields||{};if(So(a)!==So(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Dt(a[h],u[h])))return!1;return!0}(r,t);default:return L()}}function _n(r,t){return(r.values||[]).find(e=>Dt(e,t))!==void 0}function Ce(r,t){if(r===t)return 0;const e=Yt(r),n=Yt(t);if(e!==n)return G(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,t.booleanValue);case 2:return function(o,a){const u=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(r,t);case 3:return Po(r.timestampValue,t.timestampValue);case 4:return Po(pn(r),pn(t));case 5:return G(r.stringValue,t.stringValue);case 6:return function(o,a){const u=Xt(o),h=Xt(a);return u.compareTo(h)}(r.bytesValue,t.bytesValue);case 7:return function(o,a){const u=o.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){const m=G(u[f],h[f]);if(m!==0)return m}return G(u.length,h.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,a){const u=G(tt(o.latitude),tt(a.latitude));return u!==0?u:G(tt(o.longitude),tt(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return bo(r.arrayValue,t.arrayValue);case 10:return function(o,a){var u,h,f,m;const v=o.fields||{},R=a.fields||{},P=(u=v.value)===null||u===void 0?void 0:u.arrayValue,b=(h=R.value)===null||h===void 0?void 0:h.arrayValue,D=G(((f=P?.values)===null||f===void 0?void 0:f.length)||0,((m=b?.values)===null||m===void 0?void 0:m.length)||0);return D!==0?D:bo(P,b)}(r.mapValue,t.mapValue);case 11:return function(o,a){if(o===Hn.mapValue&&a===Hn.mapValue)return 0;if(o===Hn.mapValue)return 1;if(a===Hn.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let v=0;v<h.length&&v<m.length;++v){const R=G(h[v],m[v]);if(R!==0)return R;const P=Ce(u[h[v]],f[m[v]]);if(P!==0)return P}return G(h.length,m.length)}(r.mapValue,t.mapValue);default:throw L()}}function Po(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return G(r,t);const e=Wt(r),n=Wt(t),s=G(e.seconds,n.seconds);return s!==0?s:G(e.nanos,n.nanos)}function bo(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const o=Ce(e[s],n[s]);if(o)return o}return G(e.length,n.length)}function Pe(r){return Ts(r)}function Ts(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Wt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return O.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const o of e.values||[])s?s=!1:n+=",",n+=Ts(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of n)o?o=!1:s+=",",s+=`${a}:${Ts(e.fields[a])}`;return s+"}"}(r.mapValue):L()}function Jn(r){switch(Yt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=yr(r);return t?16+Jn(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,o)=>s+Jn(o),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return le(n.fields,(o,a)=>{s+=o.length+Jn(a)}),s}(r.mapValue);default:throw L()}}function Vo(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function vs(r){return!!r&&"integerValue"in r}function Ms(r){return!!r&&"arrayValue"in r}function Do(r){return!!r&&"nullValue"in r}function No(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Zn(r){return!!r&&"mapValue"in r}function Eh(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function cn(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return le(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=cn(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=cn(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Th(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Zn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=cn(e)}setAll(t){let e=ut.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=cn(a):s.push(u.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,s)}delete(t){const e=this.field(t.popLast());Zn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Dt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Zn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){le(e,(s,o)=>t[s]=o);for(const s of n)delete t[s]}clone(){return new At(cn(this.value))}}function Na(r){const t=[];return le(r.fields,(e,n)=>{const s=new ut([e]);if(Zn(n)){const o=Na(n.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(t,e,n,s,o,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(t){return new yt(t,0,M.min(),M.min(),M.min(),At.empty(),0)}static newFoundDocument(t,e,n,s){return new yt(t,1,e,M.min(),n,s,0)}static newNoDocument(t,e){return new yt(t,2,e,M.min(),M.min(),At.empty(),0)}static newUnknownDocument(t,e){return new yt(t,3,e,M.min(),M.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(M.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof yt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t,e){this.position=t,this.inclusive=e}}function ko(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const o=t[s],a=r.position[s];if(o.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),e.key):n=Ce(a,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function xo(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Dt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(t,e="asc"){this.field=t,this.dir=e}}function vh(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{}class rt extends ka{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Ah(t,e,n):e==="array-contains"?new Sh(t,n):e==="in"?new Ch(t,n):e==="not-in"?new Ph(t,n):e==="array-contains-any"?new bh(t,n):new rt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new wh(t,n):new Rh(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Ce(e,this.value)):e!==null&&Yt(this.value)===Yt(e)&&this.matchesComparison(Ce(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends ka{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Ct(t,e)}matches(t){return xa(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function xa(r){return r.op==="and"}function Oa(r){return Ih(r)&&xa(r)}function Ih(r){for(const t of r.filters)if(t instanceof Ct)return!1;return!0}function Is(r){if(r instanceof rt)return r.field.canonicalString()+r.op.toString()+Pe(r.value);if(Oa(r))return r.filters.map(t=>Is(t)).join(",");{const t=r.filters.map(e=>Is(e)).join(",");return`${r.op}(${t})`}}function La(r,t){return r instanceof rt?function(n,s){return s instanceof rt&&n.op===s.op&&n.field.isEqual(s.field)&&Dt(n.value,s.value)}(r,t):r instanceof Ct?function(n,s){return s instanceof Ct&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((o,a,u)=>o&&La(a,s.filters[u]),!0):!1}(r,t):void L()}function Ma(r){return r instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${Pe(e.value)}`}(r):r instanceof Ct?function(e){return e.op.toString()+" {"+e.getFilters().map(Ma).join(" ,")+"}"}(r):"Filter"}class Ah extends rt{constructor(t,e,n){super(t,e,n),this.key=O.fromName(n.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class wh extends rt{constructor(t,e){super(t,"in",e),this.keys=Fa("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Rh extends rt{constructor(t,e){super(t,"not-in",e),this.keys=Fa("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Fa(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>O.fromName(n.referenceValue))}class Sh extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ms(e)&&_n(e.arrayValue,this.value)}}class Ch extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&_n(this.value.arrayValue,e)}}class Ph extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(_n(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!_n(this.value.arrayValue,e)}}class bh extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ms(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>_n(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(t,e=null,n=[],s=[],o=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=o,this.startAt=a,this.endAt=u,this.ue=null}}function Oo(r,t=null,e=[],n=[],s=null,o=null,a=null){return new Vh(r,t,e,n,s,o,a)}function Fs(r){const t=F(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Is(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),_r(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Pe(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Pe(n)).join(",")),t.ue=e}return t.ue}function Bs(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!vh(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!La(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!xo(r.startAt,t.startAt)&&xo(r.endAt,t.endAt)}function As(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(t,e=null,n=[],s=[],o=null,a="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Dh(r,t,e,n,s,o,a,u){return new Le(r,t,e,n,s,o,a,u)}function Ba(r){return new Le(r)}function Lo(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Ua(r){return r.collectionGroup!==null}function ln(r){const t=F(r);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new it(ut.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new yn(o,n))}),e.has(ut.keyField().canonicalString())||t.ce.push(new yn(ut.keyField(),n))}return t.ce}function Pt(r){const t=F(r);return t.le||(t.le=Nh(t,ln(r))),t.le}function Nh(r,t){if(r.limitType==="F")return Oo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new yn(s.field,o)});const e=r.endAt?new ar(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new ar(r.startAt.position,r.startAt.inclusive):null;return Oo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function ws(r,t){const e=r.filters.concat([t]);return new Le(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function cr(r,t,e){return new Le(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Er(r,t){return Bs(Pt(r),Pt(t))&&r.limitType===t.limitType}function qa(r){return`${Fs(Pt(r))}|lt:${r.limitType}`}function Ee(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>Ma(s)).join(", ")}]`),_r(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Pe(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Pe(s)).join(",")),`Target(${n})`}(Pt(r))}; limitType=${r.limitType})`}function Tr(r,t){return t.isFoundDocument()&&function(n,s){const o=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):O.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,s){for(const o of ln(n))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const o of n.filters)if(!o.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,h){const f=ko(a,u,h);return a.inclusive?f<=0:f<0}(n.startAt,ln(n),s)||n.endAt&&!function(a,u,h){const f=ko(a,u,h);return a.inclusive?f>=0:f>0}(n.endAt,ln(n),s))}(r,t)}function kh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ga(r){return(t,e)=>{let n=!1;for(const s of ln(r)){const o=xh(s,t,e);if(o!==0)return o;n=n||s.field.isKeyField()}return 0}}function xh(r,t,e){const n=r.field.isKeyField()?O.comparator(t.key,e.key):function(o,a,u){const h=a.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Ce(h,f):L()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,o]of n)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){le(this.inner,(e,n)=>{for(const[s,o]of n)t(s,o)})}isEmpty(){return Va(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=new J(O.comparator);function Ft(){return Oh}const ja=new J(O.comparator);function sn(...r){let t=ja;for(const e of r)t=t.insert(e.key,e);return t}function za(r){let t=ja;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function oe(){return un()}function $a(){return un()}function un(){return new ue(r=>r.toString(),(r,t)=>r.isEqual(t))}const Lh=new J(O.comparator),Mh=new it(O.comparator);function q(...r){let t=Mh;for(const e of r)t=t.add(e);return t}const Fh=new it(G);function Bh(){return Fh}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Us(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:or(t)?"-0":t}}function Ka(r){return{integerValue:""+r}}function Uh(r,t){return mh(t)?Ka(t):Us(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(){this._=void 0}}function qh(r,t,e){return r instanceof lr?function(s,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Ls(o)&&(o=yr(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(e,t):r instanceof En?Qa(r,t):r instanceof Tn?Wa(r,t):function(s,o){const a=Ha(s,o),u=Mo(a)+Mo(s.Pe);return vs(a)&&vs(s.Pe)?Ka(u):Us(s.serializer,u)}(r,t)}function Gh(r,t,e){return r instanceof En?Qa(r,t):r instanceof Tn?Wa(r,t):e}function Ha(r,t){return r instanceof ur?function(n){return vs(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class lr extends vr{}class En extends vr{constructor(t){super(),this.elements=t}}function Qa(r,t){const e=Xa(t);for(const n of r.elements)e.some(s=>Dt(s,n))||e.push(n);return{arrayValue:{values:e}}}class Tn extends vr{constructor(t){super(),this.elements=t}}function Wa(r,t){let e=Xa(t);for(const n of r.elements)e=e.filter(s=>!Dt(s,n));return{arrayValue:{values:e}}}class ur extends vr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function Mo(r){return tt(r.integerValue||r.doubleValue)}function Xa(r){return Ms(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function jh(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof En&&s instanceof En||n instanceof Tn&&s instanceof Tn?Se(n.elements,s.elements,Dt):n instanceof ur&&s instanceof ur?Dt(n.Pe,s.Pe):n instanceof lr&&s instanceof lr}(r.transform,t.transform)}class zh{constructor(t,e){this.version=t,this.transformResults=e}}class bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new bt}static exists(t){return new bt(void 0,t)}static updateTime(t){return new bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function tr(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Ir{}function Ya(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new qs(r.key,bt.none()):new In(r.key,r.data,bt.none());{const e=r.data,n=At.empty();let s=new it(ut.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?n.delete(o):n.set(o,a),s=s.add(o)}return new he(r.key,n,new St(s.toArray()),bt.none())}}function $h(r,t,e){r instanceof In?function(s,o,a){const u=s.value.clone(),h=Bo(s.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof he?function(s,o,a){if(!tr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const u=Bo(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Ja(s)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(r,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function hn(r,t,e,n){return r instanceof In?function(o,a,u,h){if(!tr(o.precondition,a))return u;const f=o.value.clone(),m=Uo(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(r,t,e,n):r instanceof he?function(o,a,u,h){if(!tr(o.precondition,a))return u;const f=Uo(o.fieldTransforms,h,a),m=a.data;return m.setAll(Ja(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(v=>v.field))}(r,t,e,n):function(o,a,u){return tr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function Kh(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),o=Ha(n.transform,s||null);o!=null&&(e===null&&(e=At.empty()),e.set(n.field,o))}return e||null}function Fo(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Se(n,s,(o,a)=>jh(o,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class In extends Ir{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class he extends Ir{constructor(t,e,n,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ja(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Bo(r,t,e){const n=new Map;H(r.length===e.length);for(let s=0;s<e.length;s++){const o=r[s],a=o.transform,u=t.data.field(o.field);n.set(o.field,Gh(a,u,e[s]))}return n}function Uo(r,t,e){const n=new Map;for(const s of r){const o=s.transform,a=e.data.field(s.field);n.set(s.field,qh(o,a,t))}return n}class qs extends Ir{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Hh extends Ir{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&$h(o,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=$a();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=e.has(s.key)?null:u;const h=Ya(a,u);h!==null&&n.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(M.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&Se(this.mutations,t.mutations,(e,n)=>Fo(e,n))&&Se(this.baseMutations,t.baseMutations,(e,n)=>Fo(e,n))}}class Gs{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){H(t.mutations.length===n.length);let s=function(){return Lh}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,n[a].version);return new Gs(t,e,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt,j;function Yh(r){switch(r){default:return L();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Za(r){if(r===void 0)return Mt("GRPC error has no .code"),C.UNKNOWN;switch(r){case nt.OK:return C.OK;case nt.CANCELLED:return C.CANCELLED;case nt.UNKNOWN:return C.UNKNOWN;case nt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case nt.INTERNAL:return C.INTERNAL;case nt.UNAVAILABLE:return C.UNAVAILABLE;case nt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case nt.NOT_FOUND:return C.NOT_FOUND;case nt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case nt.ABORTED:return C.ABORTED;case nt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case nt.DATA_LOSS:return C.DATA_LOSS;default:return L()}}(j=nt||(nt={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=new ae([4294967295,4294967295],0);function qo(r){const t=Jh().encode(r),e=new Ia;return e.update(t),new Uint8Array(e.digest())}function Go(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ae([e,n],0),new ae([s,o],0)]}class js{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new on(`Invalid padding: ${e}`);if(n<0)throw new on(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new on(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new on(`Invalid padding when bitmap length is 0: ${e}`);this.Te=8*t.length-e,this.Ie=ae.fromNumber(this.Te)}Ee(t,e,n){let s=t.add(e.multiply(ae.fromNumber(n)));return s.compare(Zh)===1&&(s=new ae([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Ie).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Te===0)return!1;const e=qo(t),[n,s]=Go(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,s,o);if(!this.de(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new js(o,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.Te===0)return;const e=qo(t),[n,s]=Go(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,s,o);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class on extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t,e,n,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,An.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Ar(M.min(),s,new J(G),Ft(),q())}}class An{constructor(t,e,n,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new An(n,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(t,e,n,s){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=s}}class tc{constructor(t,e){this.targetId=t,this.me=e}}class ec{constructor(t,e,n=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class jo{constructor(){this.fe=0,this.ge=zo(),this.pe=ht.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=q(),e=q(),n=q();return this.ge.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:L()}}),new An(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=zo()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,H(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class td{constructor(t){this.Le=t,this.Be=new Map,this.ke=Ft(),this.qe=Qn(),this.Qe=Qn(),this.Ke=new J(G)}$e(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.Ue(e,t.Ve):this.We(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.We(e,t.key,t.Ve)}Ge(t){this.forEachTarget(t,e=>{const n=this.ze(e);switch(t.state){case 0:this.je(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.je(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.je(e)&&(this.He(e),n.De(t.resumeToken));break;default:L()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,s)=>{this.je(s)&&e(s)})}Je(t){const e=t.targetId,n=t.me.count,s=this.Ye(e);if(s){const o=s.target;if(As(o))if(n===0){const a=new O(o.path);this.We(e,a,yt.newNoDocument(a,M.min()))}else H(n===1);else{const a=this.Ze(e);if(a!==n){const u=this.Xe(t),h=u?this.et(u,t,a):1;if(h!==0){this.He(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(e,f)}}}}}Xe(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:o=0}=e;let a,u;try{a=Xt(n).toUint8Array()}catch(h){if(h instanceof Da)return Re("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new js(a,s,o)}catch(h){return Re(h instanceof on?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.Te===0?null:u}et(t,e,n){return e.me.count===n-this.rt(t,e.targetId)?0:2}rt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let s=0;return n.forEach(o=>{const a=this.Le.nt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(u)||(this.We(e,o,null),s++)}),s}it(t){const e=new Map;this.Be.forEach((o,a)=>{const u=this.Ye(a);if(u){if(o.current&&As(u.target)){const h=new O(u.target.path);this.st(h).has(a)||this.ot(a,h)||this.We(a,h,yt.newNoDocument(h,t))}o.be&&(e.set(a,o.ve()),o.Ce())}});let n=q();this.Qe.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{const f=this.Ye(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(t));const s=new Ar(t,e,this.Ke,this.ke,n);return this.ke=Ft(),this.qe=Qn(),this.Qe=Qn(),this.Ke=new J(G),s}Ue(t,e){if(!this.je(t))return;const n=this.ot(t,e.key)?2:0;this.ze(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t)),this.Qe=this.Qe.insert(e.key,this._t(e.key).add(t))}We(t,e,n){if(!this.je(t))return;const s=this.ze(t);this.ot(t,e)?s.Fe(e,1):s.Me(e),this.Qe=this.Qe.insert(e,this._t(e).delete(t)),this.Qe=this.Qe.insert(e,this._t(e).add(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ze(t){const e=this.ze(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.ze(t).xe()}ze(t){let e=this.Be.get(t);return e||(e=new jo,this.Be.set(t,e)),e}_t(t){let e=this.Qe.get(t);return e||(e=new it(G),this.Qe=this.Qe.insert(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new it(G),this.qe=this.qe.insert(t,e)),e}je(t){const e=this.Ye(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Ye(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ut(t)}He(t){this.Be.set(t,new jo),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.We(t,e,null)})}ot(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Qn(){return new J(O.comparator)}function zo(){return new J(O.comparator)}const ed={asc:"ASCENDING",desc:"DESCENDING"},nd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rd={and:"AND",or:"OR"};class sd{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Rs(r,t){return r.useProto3Json||_r(t)?t:{value:t}}function hr(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nc(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function id(r,t){return hr(r,t.toTimestamp())}function Vt(r){return H(!!r),M.fromTimestamp(function(e){const n=Wt(e);return new st(n.seconds,n.nanos)}(r))}function zs(r,t){return Ss(r,t).canonicalString()}function Ss(r,t){const e=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function rc(r){const t=Y.fromString(r);return H(cc(t)),t}function Cs(r,t){return zs(r.databaseId,t.path)}function os(r,t){const e=rc(t);if(e.get(1)!==r.databaseId.projectId)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new O(ic(e))}function sc(r,t){return zs(r.databaseId,t)}function od(r){const t=rc(r);return t.length===4?Y.emptyPath():ic(t)}function Ps(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function ic(r){return H(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function $o(r,t,e){return{name:Cs(r,t),fields:e.value.mapValue.fields}}function ad(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(H(m===void 0||typeof m=="string"),ht.fromBase64String(m||"")):(H(m===void 0||m instanceof Buffer||m instanceof Uint8Array),ht.fromUint8Array(m||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(f){const m=f.code===void 0?C.UNKNOWN:Za(f.code);return new x(m,f.message||"")}(a);e=new ec(n,s,o,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=os(r,n.document.name),o=Vt(n.document.updateTime),a=n.document.createTime?Vt(n.document.createTime):M.min(),u=new At({mapValue:{fields:n.document.fields}}),h=yt.newFoundDocument(s,o,a,u),f=n.targetIds||[],m=n.removedTargetIds||[];e=new er(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=os(r,n.document),o=n.readTime?Vt(n.readTime):M.min(),a=yt.newNoDocument(s,o),u=n.removedTargetIds||[];e=new er([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=os(r,n.document),o=n.removedTargetIds||[];e=new er([],o,s,null)}else{if(!("filter"in t))return L();{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:o}=n,a=new Xh(s,o),u=n.targetId;e=new tc(u,a)}}return e}function cd(r,t){let e;if(t instanceof In)e={update:$o(r,t.key,t.value)};else if(t instanceof qs)e={delete:Cs(r,t.key)};else if(t instanceof he)e={update:$o(r,t.key,t.data),updateMask:_d(t.fieldMask)};else{if(!(t instanceof Hh))return L();e={verify:Cs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,a){const u=a.transform;if(u instanceof lr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof En)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Tn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof ur)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw L()}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:id(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L()}(r,t.precondition)),e}function ld(r,t){return r&&r.length>0?(H(t!==void 0),r.map(e=>function(s,o){let a=s.updateTime?Vt(s.updateTime):Vt(o);return a.isEqual(M.min())&&(a=Vt(o)),new zh(a,s.transformResults||[])}(e,t))):[]}function ud(r,t){return{documents:[sc(r,t.path)]}}function hd(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=sc(r,s);const o=function(f){if(f.length!==0)return ac(Ct.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(m=>function(R){return{field:Te(R.field),direction:md(R.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Rs(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{ct:e,parent:s}}function dd(r){let t=od(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){H(n===1);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(v){const R=oc(v);return R instanceof Ct&&Oa(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(v){return v.map(R=>function(b){return new yn(ve(b.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(R))}(e.orderBy));let u=null;e.limit&&(u=function(v){let R;return R=typeof v=="object"?v.value:v,_r(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(v){const R=!!v.before,P=v.values||[];return new ar(P,R)}(e.startAt));let f=null;return e.endAt&&(f=function(v){const R=!v.before,P=v.values||[];return new ar(P,R)}(e.endAt)),Dh(t,s,a,o,u,"F",h,f)}function fd(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function oc(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=ve(e.unaryFilter.field);return rt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=ve(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=ve(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=ve(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(e){return rt.create(ve(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Ct.create(e.compositeFilter.filters.map(n=>oc(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(r):L()}function md(r){return ed[r]}function pd(r){return nd[r]}function gd(r){return rd[r]}function Te(r){return{fieldPath:r.canonicalString()}}function ve(r){return ut.fromServerFormat(r.fieldPath)}function ac(r){return r instanceof rt?function(e){if(e.op==="=="){if(No(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NAN"}};if(Do(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(No(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NOT_NAN"}};if(Do(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Te(e.field),op:pd(e.op),value:e.value}}}(r):r instanceof Ct?function(e){const n=e.getFilters().map(s=>ac(s));return n.length===1?n[0]:{compositeFilter:{op:gd(e.op),filters:n}}}(r):L()}function _d(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function cc(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e,n,s,o=M.min(),a=M.min(),u=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(t){return new jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(t){this.ht=t}}function Ed(r){const t=dd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?cr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(){this.ln=new vd}addToCollectionParentIndex(t,e){return this.ln.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.ln.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Qt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Qt.min())}updateCollectionGroup(t,e,n){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class vd{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new it(Y.comparator),o=!s.has(n);return this.index[e]=s.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new it(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(41943040,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(t){this.kn=t}next(){return this.kn+=2,this.kn}static qn(){return new be(0)}static Qn(){return new be(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho([r,t],[e,n]){const s=G(r,e);return s===0?G(t,n):s}class Id{constructor(t){this.Gn=t,this.buffer=new it(Ho),this.zn=0}jn(){return++this.zn}Hn(t){const e=[t,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Ho(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ad{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(t){k("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Oe(e)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await xe(e)}await this.Yn(3e5)})}}class wd{constructor(t,e){this.Zn=t,this.params=e}calculateTargetCount(t,e){return this.Zn.Xn(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return S.resolve(gr.oe);const n=new Id(e);return this.Zn.forEachTarget(t,s=>n.Hn(s.sequenceNumber)).next(()=>this.Zn.er(t,s=>n.Hn(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Zn.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Zn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Ko)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ko):this.tr(t,e))}getCacheSize(t){return this.Zn.getCacheSize(t)}tr(t,e){let n,s,o,a,u,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(v=>(v>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),s=this.params.maximumSequenceNumbersToCollect):s=v,a=Date.now(),this.nthSequenceNumber(t,s))).next(v=>(n=v,u=Date.now(),this.removeTargets(t,n,e))).next(v=>(o=v,h=Date.now(),this.removeOrphanedDocuments(t,n))).next(v=>(f=Date.now(),ye()<=z.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${v} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:v})))}}function Rd(r,t){return new wd(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(){this.changes=new ue(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,yt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?S.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&hn(n.mutation,s,St.empty(),st.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,q()).next(()=>n))}getLocalViewOfDocuments(t,e,n=q()){const s=oe();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(o=>{let a=sn();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=oe();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,q()))}populateOverlays(t,e,n){const s=[];return n.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let o=Ft();const a=un(),u=function(){return un()}();return e.forEach((h,f)=>{const m=n.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof he)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),hn(m.mutation,f,m.mutation.getFieldMask(),st.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>a.set(f,m)),e.forEach((f,m)=>{var v;return u.set(f,new Cd(m,(v=a.get(f))!==null&&v!==void 0?v:null))}),u))}recalculateAndSaveOverlays(t,e){const n=un();let s=new J((a,u)=>a-u),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=n.get(h)||St.empty();m=u.applyToLocalView(f,m),n.set(h,m);const v=(s.get(u.batchId)||q()).add(h);s=s.insert(u.batchId,v)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,m=h.value,v=$a();m.forEach(R=>{if(!o.has(R)){const P=Ya(e.get(R),n.get(R));P!==null&&v.set(R,P),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,v))}return S.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ua(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-o.size):S.resolve(oe());let u=-1,h=o;return a.next(f=>S.forEach(f,(m,v)=>(u<v.largestBatchId&&(u=v.largestBatchId),o.get(m)?S.resolve():this.remoteDocumentCache.getEntry(t,m).next(R=>{h=h.insert(m,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,q())).next(m=>({batchId:u,changes:za(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(n=>{let s=sn();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const o=e.collectionGroup;let a=sn();return this.indexManager.getCollectionParents(t,o).next(u=>S.forEach(u,h=>{const f=function(v,R){return new Le(R,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,n,s).next(m=>{m.forEach((v,R)=>{a=a.insert(v,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,s))).next(a=>{o.forEach((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,yt.newInvalidDocument(m)))});let u=sn();return a.forEach((h,f)=>{const m=o.get(h);m!==void 0&&hn(m.mutation,f,St.empty(),st.now()),Tr(e,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(t){this.serializer=t,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(t,e){return S.resolve(this.Tr.get(e))}saveBundleMetadata(t,e){return this.Tr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Vt(s.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Ir.get(e))}saveNamedQuery(t,e){return this.Ir.set(e.name,function(s){return{name:s.name,query:Ed(s.bundledQuery),readTime:Vt(s.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(){this.overlays=new J(O.comparator),this.Er=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const n=oe();return S.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&n.set(s,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,o)=>{this.Tt(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Er.get(n);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Er.delete(n)),S.resolve()}getOverlaysForCollection(t,e,n){const s=oe(),o=e.length+1,a=new O(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>n&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let o=new J((f,m)=>f-m);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>n){let m=o.get(f.largestBatchId);m===null&&(m=oe(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const u=oe(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>u.set(f,m)),!(u.size()>=s)););return S.resolve(u)}Tt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Er.get(s.largestBatchId).delete(n.key);this.Er.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Wh(e,n));let o=this.Er.get(e);o===void 0&&(o=q(),this.Er.set(e,o)),this.Er.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(){this.dr=new it(ot.Ar),this.Rr=new it(ot.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(t,e){const n=new ot(t,e);this.dr=this.dr.add(n),this.Rr=this.Rr.add(n)}mr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.gr(new ot(t,e))}pr(t,e){t.forEach(n=>this.removeReference(n,e))}yr(t){const e=new O(new Y([])),n=new ot(e,t),s=new ot(e,t+1),o=[];return this.Rr.forEachInRange([n,s],a=>{this.gr(a),o.push(a.key)}),o}wr(){this.dr.forEach(t=>this.gr(t))}gr(t){this.dr=this.dr.delete(t),this.Rr=this.Rr.delete(t)}Sr(t){const e=new O(new Y([])),n=new ot(e,t),s=new ot(e,t+1);let o=q();return this.Rr.forEachInRange([n,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ot(t,0),n=this.dr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class ot{constructor(t,e){this.key=t,this.br=e}static Ar(t,e){return O.comparator(t.key,e.key)||G(t.br,e.br)}static Vr(t,e){return G(t.br,e.br)||O.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Dr=1,this.vr=new it(ot.Ar)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const o=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Qh(o,e,n,s);this.mutationQueue.push(a);for(const u of s)this.vr=this.vr.add(new ot(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.Cr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Fr(n),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ot(e,0),s=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.vr.forEachInRange([n,s],a=>{const u=this.Cr(a.br);o.push(u)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new it(G);return e.forEach(s=>{const o=new ot(s,0),a=new ot(s,Number.POSITIVE_INFINITY);this.vr.forEachInRange([o,a],u=>{n=n.add(u.br)})}),S.resolve(this.Mr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let o=n;O.isDocumentKey(o)||(o=o.child(""));const a=new ot(new O(o),0);let u=new it(G);return this.vr.forEachWhile(h=>{const f=h.key.path;return!!n.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.br)),!0)},a),S.resolve(this.Mr(u))}Mr(t){const e=[];return t.forEach(n=>{const s=this.Cr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){H(this.Or(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.vr;return S.forEach(e.mutations,s=>{const o=new ot(s.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.vr=n})}Ln(t){}containsKey(t,e){const n=new ot(e,0),s=this.vr.firstAfterOrEqual(n);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}Or(t,e){return this.Fr(t)}Fr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Cr(t){const e=this.Fr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(t){this.Nr=t,this.docs=function(){return new J(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),o=s?s.size:0,a=this.Nr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return S.resolve(n?n.document.mutableCopy():yt.newInvalidDocument(e))}getEntries(t,e){let n=Ft();return e.forEach(s=>{const o=this.docs.get(s);n=n.insert(s,o?o.document.mutableCopy():yt.newInvalidDocument(s))}),S.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let o=Ft();const a=e.path,u=new O(a.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||uh(lh(m),n)<=0||(s.has(m.key)||Tr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,n,s){L()}Lr(t,e){return S.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new xd(this)}getSize(t){return S.resolve(this.size)}}class xd extends Sd{constructor(t){super(),this.hr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.hr.addEntry(t,s)):this.hr.removeEntry(n)}),S.waitFor(e)}getFromCache(t,e){return this.hr.getEntry(t,e)}getAllFromCache(t,e){return this.hr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(t){this.persistence=t,this.Br=new ue(e=>Fs(e),Bs),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.kr=0,this.qr=new $s,this.targetCount=0,this.Qr=be.qn()}forEachTarget(t,e){return this.Br.forEach((n,s)=>e(s)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.kr)}allocateTargetId(t){return this.highestTargetId=this.Qr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.kr&&(this.kr=e),S.resolve()}Un(t){this.Br.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Qr=new be(e),this.highestTargetId=e),t.sequenceNumber>this.kr&&(this.kr=t.sequenceNumber)}addTargetData(t,e){return this.Un(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Un(e),S.resolve()}removeTargetData(t,e){return this.Br.delete(e.target),this.qr.yr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,n){let s=0;const o=[];return this.Br.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.Br.delete(a),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const n=this.Br.get(e)||null;return S.resolve(n)}addMatchingKeys(t,e,n){return this.qr.mr(e,n),S.resolve()}removeMatchingKeys(t,e,n){this.qr.pr(e,n);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.qr.yr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const n=this.qr.Sr(e);return S.resolve(n)}containsKey(t,e){return S.resolve(this.qr.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e){this.Kr={},this.overlays={},this.$r=new gr(0),this.Ur=!1,this.Ur=!0,this.Wr=new Dd,this.referenceDelegate=t(this),this.Gr=new Od(this),this.indexManager=new Td,this.remoteDocumentCache=function(s){return new kd(s)}(n=>this.referenceDelegate.zr(n)),this.serializer=new yd(e),this.jr=new bd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Vd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.Kr[t.toKey()];return n||(n=new Nd(e,this.referenceDelegate),this.Kr[t.toKey()]=n),n}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(t,e,n){k("MemoryPersistence","Starting transaction:",t);const s=new Ld(this.$r.next());return this.referenceDelegate.Hr(),n(s).next(o=>this.referenceDelegate.Jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Yr(t,e){return S.or(Object.values(this.Kr).map(n=>()=>n.containsKey(t,e)))}}class Ld extends dh{constructor(t){super(),this.currentSequenceNumber=t}}class Ks{constructor(t){this.persistence=t,this.Zr=new $s,this.Xr=null}static ei(t){return new Ks(t)}get ti(){if(this.Xr)return this.Xr;throw L()}addReference(t,e,n){return this.Zr.addReference(n,e),this.ti.delete(n.toString()),S.resolve()}removeReference(t,e,n){return this.Zr.removeReference(n,e),this.ti.add(n.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.ti.add(e.toString()),S.resolve()}removeTarget(t,e){this.Zr.yr(e.targetId).forEach(s=>this.ti.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.ti.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}Hr(){this.Xr=new Set}Jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.ti,n=>{const s=O.fromPath(n);return this.ni(t,s).next(o=>{o||e.removeEntry(s,M.min())})}).next(()=>(this.Xr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ni(t,e).next(n=>{n?this.ti.delete(e.toString()):this.ti.add(e.toString())})}zr(t){return 0}ni(t,e){return S.or([()=>S.resolve(this.Zr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Yr(t,e)])}}class dr{constructor(t,e){this.persistence=t,this.ri=new ue(n=>ph(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Rd(this,e)}static ei(t,e){return new dr(t,e)}Hr(){}Jr(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Xn(t){const e=this.nr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}nr(t){let e=0;return this.er(t,n=>{e++}).next(()=>e)}er(t,e){return S.forEach(this.ri,(n,s)=>this.ir(t,n,s).next(o=>o?S.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.Lr(t,a=>this.ir(t,a,e).next(u=>{u||(n++,o.removeEntry(a,M.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}removeReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}zr(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Jn(t.data.value)),e}ir(t,e,n){return S.or([()=>this.persistence.Yr(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.ri.get(e);return S.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Wi=n,this.Gi=s}static zi(t,e){let n=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Hs(t,e.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return Ml()?8:fh(Ol())>0?6:4}()}initialize(t,e){this.Zi=t,this.indexManager=e,this.ji=!0}getDocumentsMatchingQuery(t,e,n,s){const o={result:null};return this.Xi(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.es(t,e,s,n).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Md;return this.ts(t,e,a).next(u=>{if(o.result=u,this.Hi)return this.ns(t,e,a,u.size)})}).next(()=>o.result)}ns(t,e,n,s){return n.documentReadCount<this.Ji?(ye()<=z.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Ee(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),S.resolve()):(ye()<=z.DEBUG&&k("QueryEngine","Query:",Ee(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Yi*s?(ye()<=z.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Ee(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Pt(e))):S.resolve())}Xi(t,e){if(Lo(e))return S.resolve(null);let n=Pt(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=cr(e,null,"F"),n=Pt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const a=q(...o);return this.Zi.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(h=>{const f=this.rs(e,u);return this.ss(e,f,a,h.readTime)?this.Xi(t,cr(e,null,"F")):this.os(t,f,e,h)}))})))}es(t,e,n,s){return Lo(e)||s.isEqual(M.min())?S.resolve(null):this.Zi.getDocuments(t,n).next(o=>{const a=this.rs(e,o);return this.ss(e,a,n,s)?S.resolve(null):(ye()<=z.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ee(e)),this.os(t,a,e,ch(s,-1)).next(u=>u))})}rs(t,e){let n=new it(Ga(t));return e.forEach((s,o)=>{Tr(t,o)&&(n=n.add(o))}),n}ss(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ts(t,e,n){return ye()<=z.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Ee(e)),this.Zi.getDocumentsMatchingQuery(t,e,Qt.min(),n)}os(t,e,n,s){return this.Zi.getDocumentsMatchingQuery(t,n,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(t,e,n,s){this.persistence=t,this._s=e,this.serializer=s,this.us=new J(G),this.cs=new ue(o=>Fs(o),Bs),this.ls=new Map,this.hs=t.getRemoteDocumentCache(),this.Gr=t.getTargetCache(),this.jr=t.getBundleCache(),this.Ps(n)}Ps(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Pd(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.us))}}function Ud(r,t,e,n){return new Bd(r,t,e,n)}async function uc(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(o=>(s=o,e.Ps(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const a=[],u=[];let h=q();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){u.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(n,h).next(f=>({Ts:f,removedBatchIds:a,addedBatchIds:u}))})})}function qd(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),o=e.hs.newChangeBuffer({trackRemovals:!0});return function(u,h,f,m){const v=f.batch,R=v.keys();let P=S.resolve();return R.forEach(b=>{P=P.next(()=>m.getEntry(h,b)).next(D=>{const N=f.docVersions.get(b);H(N!==null),D.version.compareTo(N)<0&&(v.applyToRemoteDocument(D,f),D.isValidDocument()&&(D.setReadTime(f.commitVersion),m.addEntry(D)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(h,v))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let h=q();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function hc(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Gr.getLastRemoteSnapshotVersion(e))}function Gd(r,t){const e=F(r),n=t.snapshotVersion;let s=e.us;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.hs.newChangeBuffer({trackRemovals:!0});s=e.us;const u=[];t.targetChanges.forEach((m,v)=>{const R=s.get(v);if(!R)return;u.push(e.Gr.removeMatchingKeys(o,m.removedDocuments,v).next(()=>e.Gr.addMatchingKeys(o,m.addedDocuments,v)));let P=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(v)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,n)),s=s.insert(v,P),function(D,N,U){return D.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(R,P,m)&&u.push(e.Gr.updateTargetData(o,P))});let h=Ft(),f=q();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),u.push(jd(o,a,t.documentUpdates).next(m=>{h=m.Is,f=m.Es})),!n.isEqual(M.min())){const m=e.Gr.getLastRemoteSnapshotVersion(o).next(v=>e.Gr.setTargetsMetadata(o,o.currentSequenceNumber,n));u.push(m)}return S.waitFor(u).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.us=s,o))}function jd(r,t,e){let n=q(),s=q();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let a=Ft();return e.forEach((u,h)=>{const f=o.get(u);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(M.min())?(t.removeEntry(u,h.readTime),a=a.insert(u,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(u,h)):k("LocalStore","Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",h.version)}),{Is:a,Es:s}})}function zd(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function $d(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.Gr.getTargetData(n,t).next(o=>o?(s=o,S.resolve(s)):e.Gr.allocateTargetId(n).next(a=>(s=new jt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Gr.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.us.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.us=e.us.insert(n.targetId,n),e.cs.set(t,n.targetId)),n})}async function bs(r,t,e){const n=F(r),s=n.us.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Oe(a))throw a;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}n.us=n.us.remove(t),n.cs.delete(s.target)}function Qo(r,t,e){const n=F(r);let s=M.min(),o=q();return n.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,m){const v=F(h),R=v.cs.get(m);return R!==void 0?S.resolve(v.us.get(R)):v.Gr.getTargetData(f,m)}(n,a,Pt(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Gr.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>n._s.getDocumentsMatchingQuery(a,t,e?s:M.min(),e?o:q())).next(u=>(Kd(n,kh(t),u),{documents:u,ds:o})))}function Kd(r,t,e){let n=r.ls.get(t)||M.min();e.forEach((s,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.ls.set(t,n)}class Wo{constructor(){this.activeTargetIds=Bh()}ps(t){this.activeTargetIds=this.activeTargetIds.add(t)}ys(t){this.activeTargetIds=this.activeTargetIds.delete(t)}gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Hd{constructor(){this._o=new Wo,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this._o.ps(t),this.ao[t]||"not-current"}updateQueryState(t,e,n){this.ao[t]=e}removeLocalQueryTarget(t){this._o.ys(t)}isLocalQueryTarget(t){return this._o.activeTargetIds.has(t)}clearQueryState(t){delete this.ao[t]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(t){return this._o.activeTargetIds.has(t)}start(){return this._o=new Wo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{uo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(t){this.To.push(t)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.To)t(0)}Po(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.To)t(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wn=null;function as(){return Wn===null?Wn=function(){return 268435456+Math.round(2147483648*Math.random())}():Wn++,"0x"+Wn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(t){this.Eo=t.Eo,this.Ao=t.Ao}Ro(t){this.Vo=t}mo(t){this.fo=t}po(t){this.yo=t}onMessage(t){this.wo=t}close(){this.Ao()}send(t){this.Eo(t)}So(){this.Vo()}bo(){this.fo()}Do(t){this.yo(t)}vo(t){this.wo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection";class Yd extends class{get Co(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Fo=n+"://"+e.host,this.Mo=`projects/${s}/databases/${o}`,this.xo=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}Oo(e,n,s,o,a){const u=as(),h=this.No(e,n.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${u}:`,h,s);const f={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(f,o,a),this.Bo(e,h,f,s).then(m=>(k("RestConnection",`Received RPC '${e}' ${u}: `,m),m),m=>{throw Re("RestConnection",`RPC '${e}' ${u} failed with error: `,m,"url: ",h,"request:",s),m})}ko(e,n,s,o,a,u){return this.Oo(e,n,s,o,a)}Lo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ke}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((o,a)=>e[a]=o),s&&s.headers.forEach((o,a)=>e[a]=o)}No(e,n){const s=Wd[e];return`${this.Fo}/v1/${n}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Bo(t,e,n,s){const o=as();return new Promise((a,u)=>{const h=new Aa;h.setWithCredentials(!0),h.listenOnce(wa.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Yn.NO_ERROR:const m=h.getResponseJson();k(gt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),a(m);break;case Yn.TIMEOUT:k(gt,`RPC '${t}' ${o} timed out`),u(new x(C.DEADLINE_EXCEEDED,"Request time out"));break;case Yn.HTTP_ERROR:const v=h.getStatus();if(k(gt,`RPC '${t}' ${o} failed with status:`,v,"response text:",h.getResponseText()),v>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const P=R?.error;if(P&&P.status&&P.message){const b=function(N){const U=N.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(U)>=0?U:C.UNKNOWN}(P.status);u(new x(b,P.message))}else u(new x(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new x(C.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(gt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(s);k(gt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,n,15)})}qo(t,e,n){const s=as(),o=[this.Fo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Ca(),u=Sa(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Lo(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const m=o.join("");k(gt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const v=a.createWebChannel(m,h);let R=!1,P=!1;const b=new Xd({Eo:N=>{P?k(gt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(R||(k(gt,`Opening RPC '${t}' stream ${s} transport.`),v.open(),R=!0),k(gt,`RPC '${t}' stream ${s} sending:`,N),v.send(N))},Ao:()=>v.close()}),D=(N,U,K)=>{N.listen(U,Q=>{try{K(Q)}catch(et){setTimeout(()=>{throw et},0)}})};return D(v,rn.EventType.OPEN,()=>{P||(k(gt,`RPC '${t}' stream ${s} transport opened.`),b.So())}),D(v,rn.EventType.CLOSE,()=>{P||(P=!0,k(gt,`RPC '${t}' stream ${s} transport closed`),b.Do())}),D(v,rn.EventType.ERROR,N=>{P||(P=!0,Re(gt,`RPC '${t}' stream ${s} transport errored:`,N),b.Do(new x(C.UNAVAILABLE,"The operation could not be completed")))}),D(v,rn.EventType.MESSAGE,N=>{var U;if(!P){const K=N.data[0];H(!!K);const Q=K,et=Q?.error||((U=Q[0])===null||U===void 0?void 0:U.error);if(et){k(gt,`RPC '${t}' stream ${s} received error:`,et);const Nt=et.status;let at=function(_){const y=nt[_];if(y!==void 0)return Za(y)}(Nt),T=et.message;at===void 0&&(at=C.INTERNAL,T="Unknown error status: "+Nt+" with message "+et.message),P=!0,b.Do(new x(at,T)),v.close()}else k(gt,`RPC '${t}' stream ${s} received:`,K),b.vo(K)}}),D(u,Ra.STAT_EVENT,N=>{N.stat===Es.PROXY?k(gt,`RPC '${t}' stream ${s} detected buffering proxy`):N.stat===Es.NOPROXY&&k(gt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{b.bo()},0),b}}function cs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(r){return new sd(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(t,e,n=1e3,s=1.5,o=6e4){this.li=t,this.timerId=e,this.Qo=n,this.Ko=s,this.$o=o,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(t){this.cancel();const e=Math.floor(this.Uo+this.Ho()),n=Math.max(0,Date.now()-this.Go),s=Math.max(0,e-n);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Uo} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,s,()=>(this.Go=Date.now(),t())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(t,e,n,s,o,a,u,h){this.li=t,this.Yo=n,this.Zo=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new dc(t,e)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(t){this.l_(),this.stream.send(t)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(t,e){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,t!==4?this.r_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Mt(e.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.po(e)}P_(){}auth(){this.state=1;const t=this.T_(this.Xo),e=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Xo===e&&this.I_(n,s)},n=>{t(()=>{const s=new x(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.E_(s)})})}I_(t,e){const n=this.T_(this.Xo);this.stream=this.d_(t,e),this.stream.Ro(()=>{n(()=>this.listener.Ro())}),this.stream.mo(()=>{n(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(s=>{n(()=>this.E_(s))}),this.stream.onMessage(s=>{n(()=>++this.n_==1?this.A_(s):this.onNext(s))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}T_(t){return e=>{this.li.enqueueAndForget(()=>this.Xo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Jd extends fc{constructor(t,e,n,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=o}d_(t,e){return this.connection.qo("Listen",t,e)}A_(t){return this.onNext(t)}onNext(t){this.r_.reset();const e=ad(this.serializer,t),n=function(o){if(!("targetChange"in o))return M.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?M.min():a.readTime?Vt(a.readTime):M.min()}(t);return this.listener.R_(e,n)}V_(t){const e={};e.database=Ps(this.serializer),e.addTarget=function(o,a){let u;const h=a.target;if(u=As(h)?{documents:ud(o,h)}:{query:hd(o,h).ct},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=nc(o,a.resumeToken);const f=Rs(o,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(M.min())>0){u.readTime=hr(o,a.snapshotVersion.toTimestamp());const f=Rs(o,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,t);const n=fd(this.serializer,t);n&&(e.labels=n),this.c_(e)}m_(t){const e={};e.database=Ps(this.serializer),e.removeTarget=t,this.c_(e)}}class Zd extends fc{constructor(t,e,n,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=o}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(t,e){return this.connection.qo("Write",t,e)}A_(t){return H(!!t.streamToken),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0),this.listener.p_()}onNext(t){H(!!t.streamToken),this.lastStreamToken=t.streamToken,this.r_.reset();const e=ld(t.writeResults,t.commitTime),n=Vt(t.commitTime);return this.listener.y_(n,e)}w_(){const t={};t.database=Ps(this.serializer),this.c_(t)}g_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>cd(this.serializer,n))};this.c_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.S_=!1}b_(){if(this.S_)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(t,e,n,s){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Oo(t,Ss(e,n),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(C.UNKNOWN,o.toString())})}ko(t,e,n,s,o){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.ko(t,Ss(e,n),s,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(C.UNKNOWN,a.toString())})}terminate(){this.S_=!0,this.connection.terminate()}}class ef{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(t){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.M_("Offline")))}set(t){this.N_(),this.D_=0,t==="Online"&&(this.C_=!1),this.M_(t)}M_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}x_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.C_?(Mt(e),this.C_=!1):k("OnlineStateTracker",e)}N_(){this.v_!==null&&(this.v_.cancel(),this.v_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(t,e,n,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=o,this.Q_.uo(a=>{n.enqueueAndForget(async()=>{de(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=F(h);f.k_.add(4),await wn(f),f.K_.set("Unknown"),f.k_.delete(4),await Rr(f)}(this))})}),this.K_=new ef(n,s)}}async function Rr(r){if(de(r))for(const t of r.q_)await t(!0)}async function wn(r){for(const t of r.q_)await t(!1)}function mc(r,t){const e=F(r);e.B_.has(t.targetId)||(e.B_.set(t.targetId,t),Ys(e)?Xs(e):Me(e).s_()&&Ws(e,t))}function Qs(r,t){const e=F(r),n=Me(e);e.B_.delete(t),n.s_()&&pc(e,t),e.B_.size===0&&(n.s_()?n.a_():de(e)&&e.K_.set("Unknown"))}function Ws(r,t){if(r.U_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(M.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Me(r).V_(t)}function pc(r,t){r.U_.xe(t),Me(r).m_(t)}function Xs(r){r.U_=new td({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ut:t=>r.B_.get(t)||null,nt:()=>r.datastore.serializer.databaseId}),Me(r).start(),r.K_.F_()}function Ys(r){return de(r)&&!Me(r).i_()&&r.B_.size>0}function de(r){return F(r).k_.size===0}function gc(r){r.U_=void 0}async function rf(r){r.K_.set("Online")}async function sf(r){r.B_.forEach((t,e)=>{Ws(r,t)})}async function of(r,t){gc(r),Ys(r)?(r.K_.O_(t),Xs(r)):r.K_.set("Unknown")}async function af(r,t,e){if(r.K_.set("Online"),t instanceof ec&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const u of o.targetIds)s.B_.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.B_.delete(u),s.U_.removeTarget(u))}(r,t)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await fr(r,n)}else if(t instanceof er?r.U_.$e(t):t instanceof tc?r.U_.Je(t):r.U_.Ge(t),!e.isEqual(M.min()))try{const n=await hc(r.localStore);e.compareTo(n)>=0&&await function(o,a){const u=o.U_.it(a);return u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.B_.get(f);m&&o.B_.set(f,m.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{const m=o.B_.get(h);if(!m)return;o.B_.set(h,m.withResumeToken(ht.EMPTY_BYTE_STRING,m.snapshotVersion)),pc(o,h);const v=new jt(m.target,h,f,m.sequenceNumber);Ws(o,v)}),o.remoteSyncer.applyRemoteEvent(u)}(r,e)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await fr(r,n)}}async function fr(r,t,e){if(!Oe(t))throw t;r.k_.add(1),await wn(r),r.K_.set("Offline"),e||(e=()=>hc(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),r.k_.delete(1),await Rr(r)})}function _c(r,t){return t().catch(e=>fr(r,e,t))}async function Sr(r){const t=F(r),e=Jt(t);let n=t.L_.length>0?t.L_[t.L_.length-1].batchId:-1;for(;cf(t);)try{const s=await zd(t.localStore,n);if(s===null){t.L_.length===0&&e.a_();break}n=s.batchId,lf(t,s)}catch(s){await fr(t,s)}yc(t)&&Ec(t)}function cf(r){return de(r)&&r.L_.length<10}function lf(r,t){r.L_.push(t);const e=Jt(r);e.s_()&&e.f_&&e.g_(t.mutations)}function yc(r){return de(r)&&!Jt(r).i_()&&r.L_.length>0}function Ec(r){Jt(r).start()}async function uf(r){Jt(r).w_()}async function hf(r){const t=Jt(r);for(const e of r.L_)t.g_(e.mutations)}async function df(r,t,e){const n=r.L_.shift(),s=Gs.from(n,t,e);await _c(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Sr(r)}async function ff(r,t){t&&Jt(r).f_&&await async function(n,s){if(function(a){return Yh(a)&&a!==C.ABORTED}(s.code)){const o=n.L_.shift();Jt(n).__(),await _c(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Sr(n)}}(r,t),yc(r)&&Ec(r)}async function Yo(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=de(e);e.k_.add(3),await wn(e),n&&e.K_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.k_.delete(3),await Rr(e)}async function mf(r,t){const e=F(r);t?(e.k_.delete(2),await Rr(e)):t||(e.k_.add(2),await wn(e),e.K_.set("Unknown"))}function Me(r){return r.W_||(r.W_=function(e,n,s){const o=F(e);return o.b_(),new Jd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(r.datastore,r.asyncQueue,{Ro:rf.bind(null,r),mo:sf.bind(null,r),po:of.bind(null,r),R_:af.bind(null,r)}),r.q_.push(async t=>{t?(r.W_.__(),Ys(r)?Xs(r):r.K_.set("Unknown")):(await r.W_.stop(),gc(r))})),r.W_}function Jt(r){return r.G_||(r.G_=function(e,n,s){const o=F(e);return o.b_(),new Zd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(r.datastore,r.asyncQueue,{Ro:()=>Promise.resolve(),mo:uf.bind(null,r),po:ff.bind(null,r),p_:hf.bind(null,r),y_:df.bind(null,r)}),r.q_.push(async t=>{t?(r.G_.__(),await Sr(r)):(await r.G_.stop(),r.L_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.L_.length} pending writes`),r.L_=[]))})),r.G_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(t,e,n,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=o,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,o){const a=Date.now()+n,u=new Js(t,e,a,s,o);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zs(r,t){if(Mt("AsyncQueue",`${t}: ${r}`),Oe(r))return new x(C.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{static emptySet(t){return new Ae(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||O.comparator(e.key,n.key):(e,n)=>O.comparator(e.key,n.key),this.keyedMap=sn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ae)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=n.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new Ae;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(){this.z_=new J(O.comparator)}track(t){const e=t.doc.key,n=this.z_.get(e);n?t.type!==0&&n.type===3?this.z_=this.z_.insert(e,t):t.type===3&&n.type!==1?this.z_=this.z_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.z_=this.z_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.z_=this.z_.remove(e):t.type===1&&n.type===2?this.z_=this.z_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):L():this.z_=this.z_.insert(e,t)}j_(){const t=[];return this.z_.inorderTraversal((e,n)=>{t.push(n)}),t}}class Ve{constructor(t,e,n,s,o,a,u,h,f){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,n,s,o){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new Ve(t,e,Ae.emptySet(e),a,n,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Er(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(t=>t.Z_())}}class gf{constructor(){this.queries=Zo(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(e,n){const s=F(e),o=s.queries;s.queries=Zo(),o.forEach((a,u)=>{for(const h of u.J_)h.onError(n)})})(this,new x(C.ABORTED,"Firestore shutting down"))}}function Zo(){return new ue(r=>qa(r),Er)}async function _f(r,t){const e=F(r);let n=3;const s=t.query;let o=e.queries.get(s);o?!o.Y_()&&t.Z_()&&(n=2):(o=new pf,n=t.Z_()?0:1);try{switch(n){case 0:o.H_=await e.onListen(s,!0);break;case 1:o.H_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Zs(a,`Initialization of query '${Ee(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,o),o.J_.push(t),t.ea(e.onlineState),o.H_&&t.ta(o.H_)&&ti(e)}async function yf(r,t){const e=F(r),n=t.query;let s=3;const o=e.queries.get(n);if(o){const a=o.J_.indexOf(t);a>=0&&(o.J_.splice(a,1),o.J_.length===0?s=t.Z_()?0:1:!o.Y_()&&t.Z_()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Ef(r,t){const e=F(r);let n=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const u of a.J_)u.ta(s)&&(n=!0);a.H_=s}}n&&ti(e)}function Tf(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const o of s.J_)o.onError(e);n.queries.delete(t)}function ti(r){r.X_.forEach(t=>{t.next()})}var Vs,ta;(ta=Vs||(Vs={})).na="default",ta.Cache="cache";class vf{constructor(t,e,n){this.query=t,this.ra=e,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=n||{}}ta(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Ve(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ia?this.oa(t)&&(this.ra.next(t),e=!0):this._a(t,this.onlineState)&&(this.aa(t),e=!0),this.sa=t,e}onError(t){this.ra.error(t)}ea(t){this.onlineState=t;let e=!1;return this.sa&&!this.ia&&this._a(this.sa,t)&&(this.aa(this.sa),e=!0),e}_a(t,e){if(!t.fromCache||!this.Z_())return!0;const n=e!=="Offline";return(!this.options.ua||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}oa(t){if(t.docChanges.length>0)return!0;const e=this.sa&&this.sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}aa(t){t=Ve.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ia=!0,this.ra.next(t)}Z_(){return this.options.source!==Vs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(t){this.key=t}}class vc{constructor(t){this.key=t}}class If{constructor(t,e){this.query=t,this.da=e,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=q(),this.mutatedKeys=q(),this.Va=Ga(t),this.ma=new Ae(this.Va)}get fa(){return this.da}ga(t,e){const n=e?e.pa:new Jo,s=e?e.ma:this.ma;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,v)=>{const R=s.get(m),P=Tr(this.query,v)?v:null,b=!!R&&this.mutatedKeys.has(R.key),D=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let N=!1;R&&P?R.data.isEqual(P.data)?b!==D&&(n.track({type:3,doc:P}),N=!0):this.ya(R,P)||(n.track({type:2,doc:P}),N=!0,(h&&this.Va(P,h)>0||f&&this.Va(P,f)<0)&&(u=!0)):!R&&P?(n.track({type:0,doc:P}),N=!0):R&&!P&&(n.track({type:1,doc:R}),N=!0,(h||f)&&(u=!0)),N&&(P?(a=a.add(P),o=D?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),n.track({type:1,doc:m})}return{ma:a,pa:n,ss:u,mutatedKeys:o}}ya(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const o=this.ma;this.ma=t.ma,this.mutatedKeys=t.mutatedKeys;const a=t.pa.j_();a.sort((m,v)=>function(P,b){const D=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return D(P)-D(b)}(m.type,v.type)||this.Va(m.doc,v.doc)),this.wa(n),s=s!=null&&s;const u=e&&!s?this.Sa():[],h=this.Ra.size===0&&this.current&&!s?1:0,f=h!==this.Aa;return this.Aa=h,a.length!==0||f?{snapshot:new Ve(this.query,t.ma,o,a,t.mutatedKeys,h===0,f,!1,!!n&&n.resumeToken.approximateByteSize()>0),ba:u}:{ba:u}}ea(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new Jo,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(t){return!this.da.has(t)&&!!this.ma.has(t)&&!this.ma.get(t).hasLocalMutations}wa(t){t&&(t.addedDocuments.forEach(e=>this.da=this.da.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.da=this.da.delete(e)),this.current=t.current)}Sa(){if(!this.current)return[];const t=this.Ra;this.Ra=q(),this.ma.forEach(n=>{this.Da(n.key)&&(this.Ra=this.Ra.add(n.key))});const e=[];return t.forEach(n=>{this.Ra.has(n)||e.push(new vc(n))}),this.Ra.forEach(n=>{t.has(n)||e.push(new Tc(n))}),e}va(t){this.da=t.ds,this.Ra=q();const e=this.ga(t.documents);return this.applyChanges(e,!0)}Ca(){return Ve.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}}class Af{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class wf{constructor(t){this.key=t,this.Fa=!1}}class Rf{constructor(t,e,n,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ma={},this.xa=new ue(u=>qa(u),Er),this.Oa=new Map,this.Na=new Set,this.La=new J(O.comparator),this.Ba=new Map,this.ka=new $s,this.qa={},this.Qa=new Map,this.Ka=be.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}}async function Sf(r,t,e=!0){const n=Cc(r);let s;const o=n.xa.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Ca()):s=await Ic(n,t,e,!0),s}async function Cf(r,t){const e=Cc(r);await Ic(e,t,!0,!1)}async function Ic(r,t,e,n){const s=await $d(r.localStore,Pt(t)),o=s.targetId,a=r.sharedClientState.addLocalQueryTarget(o,e);let u;return n&&(u=await Pf(r,t,o,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&mc(r.remoteStore,s),u}async function Pf(r,t,e,n,s){r.Ua=(v,R,P)=>async function(D,N,U,K){let Q=N.view.ga(U);Q.ss&&(Q=await Qo(D.localStore,N.query,!1).then(({documents:T})=>N.view.ga(T,Q)));const et=K&&K.targetChanges.get(N.targetId),Nt=K&&K.targetMismatches.get(N.targetId)!=null,at=N.view.applyChanges(Q,D.isPrimaryClient,et,Nt);return na(D,N.targetId,at.ba),at.snapshot}(r,v,R,P);const o=await Qo(r.localStore,t,!0),a=new If(t,o.ds),u=a.ga(o.documents),h=An.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),f=a.applyChanges(u,r.isPrimaryClient,h);na(r,e,f.ba);const m=new Af(t,e,a);return r.xa.set(t,m),r.Oa.has(e)?r.Oa.get(e).push(t):r.Oa.set(e,[t]),f.snapshot}async function bf(r,t,e){const n=F(r),s=n.xa.get(t),o=n.Oa.get(s.targetId);if(o.length>1)return n.Oa.set(s.targetId,o.filter(a=>!Er(a,t))),void n.xa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await bs(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Qs(n.remoteStore,s.targetId),Ds(n,s.targetId)}).catch(xe)):(Ds(n,s.targetId),await bs(n.localStore,s.targetId,!0))}async function Vf(r,t){const e=F(r),n=e.xa.get(t),s=e.Oa.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Qs(e.remoteStore,n.targetId))}async function Df(r,t,e){const n=Ff(r);try{const s=await function(a,u){const h=F(a),f=st.now(),m=u.reduce((P,b)=>P.add(b.key),q());let v,R;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let b=Ft(),D=q();return h.hs.getEntries(P,m).next(N=>{b=N,b.forEach((U,K)=>{K.isValidDocument()||(D=D.add(U))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,b)).next(N=>{v=N;const U=[];for(const K of u){const Q=Kh(K,v.get(K.key).overlayedDocument);Q!=null&&U.push(new he(K.key,Q,Na(Q.value.mapValue),bt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,U,u)}).next(N=>{R=N;const U=N.applyToLocalDocumentSet(v,D);return h.documentOverlayCache.saveOverlays(P,N.batchId,U)})}).then(()=>({batchId:R.batchId,changes:za(v)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,h){let f=a.qa[a.currentUser.toKey()];f||(f=new J(G)),f=f.insert(u,h),a.qa[a.currentUser.toKey()]=f}(n,s.batchId,e),await Rn(n,s.changes),await Sr(n.remoteStore)}catch(s){const o=Zs(s,"Failed to persist write");e.reject(o)}}async function Ac(r,t){const e=F(r);try{const n=await Gd(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Ba.get(o);a&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Fa=!0:s.modifiedDocuments.size>0?H(a.Fa):s.removedDocuments.size>0&&(H(a.Fa),a.Fa=!1))}),await Rn(e,n,t)}catch(n){await xe(n)}}function ea(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.xa.forEach((o,a)=>{const u=a.view.ea(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const h=F(a);h.onlineState=u;let f=!1;h.queries.forEach((m,v)=>{for(const R of v.J_)R.ea(u)&&(f=!0)}),f&&ti(h)}(n.eventManager,t),s.length&&n.Ma.R_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Nf(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Ba.get(t),o=s&&s.key;if(o){let a=new J(O.comparator);a=a.insert(o,yt.newNoDocument(o,M.min()));const u=q().add(o),h=new Ar(M.min(),new Map,new J(G),a,u);await Ac(n,h),n.La=n.La.remove(o),n.Ba.delete(t),ei(n)}else await bs(n.localStore,t,!1).then(()=>Ds(n,t,e)).catch(xe)}async function kf(r,t){const e=F(r),n=t.batch.batchId;try{const s=await qd(e.localStore,t);Rc(e,n,null),wc(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Rn(e,s)}catch(s){await xe(s)}}async function xf(r,t,e){const n=F(r);try{const s=await function(a,u){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,u).next(v=>(H(v!==null),m=v.keys(),h.mutationQueue.removeMutationBatch(f,v))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(n.localStore,t);Rc(n,t,e),wc(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Rn(n,s)}catch(s){await xe(s)}}function wc(r,t){(r.Qa.get(t)||[]).forEach(e=>{e.resolve()}),r.Qa.delete(t)}function Rc(r,t,e){const n=F(r);let s=n.qa[n.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),n.qa[n.currentUser.toKey()]=s}}function Ds(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Oa.get(t))r.xa.delete(n),e&&r.Ma.Wa(n,e);r.Oa.delete(t),r.isPrimaryClient&&r.ka.yr(t).forEach(n=>{r.ka.containsKey(n)||Sc(r,n)})}function Sc(r,t){r.Na.delete(t.path.canonicalString());const e=r.La.get(t);e!==null&&(Qs(r.remoteStore,e),r.La=r.La.remove(t),r.Ba.delete(e),ei(r))}function na(r,t,e){for(const n of e)n instanceof Tc?(r.ka.addReference(n.key,t),Of(r,n)):n instanceof vc?(k("SyncEngine","Document no longer in limbo: "+n.key),r.ka.removeReference(n.key,t),r.ka.containsKey(n.key)||Sc(r,n.key)):L()}function Of(r,t){const e=t.key,n=e.path.canonicalString();r.La.get(e)||r.Na.has(n)||(k("SyncEngine","New document in limbo: "+e),r.Na.add(n),ei(r))}function ei(r){for(;r.Na.size>0&&r.La.size<r.maxConcurrentLimboResolutions;){const t=r.Na.values().next().value;r.Na.delete(t);const e=new O(Y.fromString(t)),n=r.Ka.next();r.Ba.set(n,new wf(e)),r.La=r.La.insert(e,n),mc(r.remoteStore,new jt(Pt(Ba(e.path)),n,"TargetPurposeLimboResolution",gr.oe))}}async function Rn(r,t,e){const n=F(r),s=[],o=[],a=[];n.xa.isEmpty()||(n.xa.forEach((u,h)=>{a.push(n.Ua(h,t,e).then(f=>{var m;if((f||e)&&n.isPrimaryClient){const v=f?!f.fromCache:(m=e?.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;n.sharedClientState.updateQueryState(h.targetId,v?"current":"not-current")}if(f){s.push(f);const v=Hs.zi(h.targetId,f);o.push(v)}}))}),await Promise.all(a),n.Ma.R_(s),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>S.forEach(f,R=>S.forEach(R.Wi,P=>m.persistence.referenceDelegate.addReference(v,R.targetId,P)).next(()=>S.forEach(R.Gi,P=>m.persistence.referenceDelegate.removeReference(v,R.targetId,P)))))}catch(v){if(!Oe(v))throw v;k("LocalStore","Failed to update sequence numbers: "+v)}for(const v of f){const R=v.targetId;if(!v.fromCache){const P=m.us.get(R),b=P.snapshotVersion,D=P.withLastLimboFreeSnapshotVersion(b);m.us=m.us.insert(R,D)}}}(n.localStore,o))}async function Lf(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const n=await uc(e.localStore,t);e.currentUser=t,function(o,a){o.Qa.forEach(u=>{u.forEach(h=>{h.reject(new x(C.CANCELLED,a))})}),o.Qa.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Rn(e,n.Ts)}}function Mf(r,t){const e=F(r),n=e.Ba.get(t);if(n&&n.Fa)return q().add(n.key);{let s=q();const o=e.Oa.get(t);if(!o)return s;for(const a of o){const u=e.xa.get(a);s=s.unionWith(u.view.fa)}return s}}function Cc(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ac.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Mf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Nf.bind(null,t),t.Ma.R_=Ef.bind(null,t.eventManager),t.Ma.Wa=Tf.bind(null,t.eventManager),t}function Ff(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=kf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=xf.bind(null,t),t}class mr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=wr(t.databaseInfo.databaseId),this.sharedClientState=this.za(t),this.persistence=this.ja(t),await this.persistence.start(),this.localStore=this.Ha(t),this.gcScheduler=this.Ja(t,this.localStore),this.indexBackfillerScheduler=this.Ya(t,this.localStore)}Ja(t,e){return null}Ya(t,e){return null}Ha(t){return Ud(this.persistence,new Fd,t.initialUser,this.serializer)}ja(t){return new lc(Ks.ei,this.serializer)}za(t){return new Hd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}mr.provider={build:()=>new mr};class Bf extends mr{constructor(t){super(),this.cacheSizeBytes=t}Ja(t,e){H(this.persistence.referenceDelegate instanceof dr);const n=this.persistence.referenceDelegate.garbageCollector;return new Ad(n,t.asyncQueue,e)}ja(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new lc(n=>dr.ei(n,e),this.serializer)}}class Ns{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ea(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Lf.bind(null,this.syncEngine),await mf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new gf}()}createDatastore(t){const e=wr(t.databaseInfo.databaseId),n=function(o){return new Yd(o)}(t.databaseInfo);return function(o,a,u,h){return new tf(o,a,u,h)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,o,a,u){return new nf(n,s,o,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>ea(this.syncEngine,e,0),function(){return Xo.p()?new Xo:new Qd}())}createSyncEngine(t,e){return function(s,o,a,u,h,f,m){const v=new Rf(s,o,a,u,h,f);return m&&(v.$a=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);k("RemoteStore","RemoteStore shutting down."),o.k_.add(5),await wn(o),o.Q_.shutdown(),o.K_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Ns.provider={build:()=>new Ns};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Xa(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Xa(this.observer.error,t):Mt("Uncaught Error in snapshot listener:",t.toString()))}eu(){this.muted=!0}Xa(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(t,e,n,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=_t.UNAUTHENTICATED,this.clientId=ba.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async a=>{k("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(k("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Zs(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function ls(r,t){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await uc(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function ra(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Gf(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Yo(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Yo(t.remoteStore,s)),r._onlineComponents=t}async function Gf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await ls(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Re("Error using user provided cache. Falling back to memory cache: "+e),await ls(r,new mr)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await ls(r,new Bf(void 0));return r._offlineComponents}async function Pc(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await ra(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await ra(r,new Ns))),r._onlineComponents}function jf(r){return Pc(r).then(t=>t.syncEngine)}async function zf(r){const t=await Pc(r),e=t.eventManager;return e.onListen=Sf.bind(null,t.syncEngine),e.onUnlisten=bf.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Cf.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Vf.bind(null,t.syncEngine),e}function $f(r,t,e={}){const n=new Kt;return r.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,f){const m=new Uf({next:R=>{m.eu(),a.enqueueAndForget(()=>yf(o,v)),R.fromCache&&h.source==="server"?f.reject(new x(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(R)},error:R=>f.reject(R)}),v=new vf(u,m,{includeMetadataChanges:!0,ua:!0});return _f(o,v)}(await zf(r),r.asyncQueue,t,e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(r,t,e){if(!e)throw new x(C.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Kf(r,t,e,n){if(t===!0&&n===!0)throw new x(C.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function ia(r){if(!O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function oa(r){if(O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Cr(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":L()}function vn(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new x(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Cr(r);throw new x(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new x(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Kf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bc((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Pr{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new aa({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new x(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new aa(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Zu;switch(n.type){case"firstParty":return new rh(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=sa.get(e);n&&(k("ComponentProvider","Removing Datastore"),sa.delete(e),n.terminate())}(this),Promise.resolve()}}function Hf(r,t,e,n={}){var s;const o=(r=vn(r,Pr))._getSettings(),a=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Re("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),n.mockUserToken){let u,h;if(typeof n.mockUserToken=="string")u=n.mockUserToken,h=_t.MOCK_USER;else{u=xl(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const f=n.mockUserToken.sub||n.mockUserToken.user_id;if(!f)throw new x(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new _t(f)}r._authCredentials=new th(new Pa(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Zt(this.firestore,t,this._query)}}class wt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new wt(this.firestore,t,this._key)}}class Ht extends Zt{constructor(t,e,n){super(t,e,Ba(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new wt(this.firestore,null,new O(t))}withConverter(t){return new Ht(this.firestore,t,this._path)}}function _e(r,t,...e){if(r=we(r),Vc("collection","path",t),r instanceof Pr){const n=Y.fromString(t,...e);return oa(n),new Ht(r,null,n)}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return oa(n),new Ht(r.firestore,null,n)}}function Qf(r,t,...e){if(r=we(r),arguments.length===1&&(t=ba.newId()),Vc("doc","path",t),r instanceof Pr){const n=Y.fromString(t,...e);return ia(n),new wt(r,null,new O(n))}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return ia(n),new wt(r.firestore,r instanceof Ht?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(t=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new dc(this,"async_queue_retry"),this.fu=()=>{const n=cs();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.r_.Jo()},this.gu=t;const e=cs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.pu(),this.yu(t)}enterRestrictedMode(t){if(!this.Eu){this.Eu=!0,this.Vu=t||!1;const e=cs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.fu)}}enqueue(t){if(this.pu(),this.Eu)return new Promise(()=>{});const e=new Kt;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Iu.push(t),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(t){if(!Oe(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(t){const e=this.gu.then(()=>(this.Ru=!0,t().catch(n=>{this.Au=n,this.Ru=!1;const s=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(n);throw Mt("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.Ru=!1,n))));return this.gu=e,e}enqueueAfterDelay(t,e,n){this.pu(),this.mu.indexOf(t)>-1&&(e=0);const s=Js.createAndSchedule(this,t,e,n,o=>this.Su(o));return this.du.push(s),s}pu(){this.Au&&L()}verifyOperationInProgress(){}async bu(){let t;do t=this.gu,await t;while(t!==this.gu)}Du(t){for(const e of this.du)if(e.timerId===t)return!0;return!1}vu(t){return this.bu().then(()=>{this.du.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.du)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.bu()})}Cu(t){this.mu.push(t)}Su(t){const e=this.du.indexOf(t);this.du.splice(e,1)}}class br extends Pr{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new ca,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ca(t),this._firestoreClient=void 0,await t}}}function Wf(r,t){const e=typeof r=="object"?r:ju(),n=typeof r=="string"?r:"(default)",s=Bu(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const o=Nl("firestore");o&&Hf(s,...o)}return s}function Dc(r){if(r._terminated)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Xf(r),r._firestoreClient}function Xf(r){var t,e,n;const s=r._freezeSettings(),o=function(u,h,f,m){return new yh(u,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,bc(m.experimentalLongPollingOptions),m.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new qf(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(u){const h=u?._online.build();return{_offline:u?._offline.build(h),_online:h}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(t){this._byteString=t}static fromBase64String(t){try{return new De(ht.fromBase64String(t))}catch(e){throw new x(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new De(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new x(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new x(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new x(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return G(this._lat,t._lat)||G(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf=/^__.*__$/;class Jf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new In(t,this.data,e,this.fieldTransforms)}}function kc(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class ii{constructor(t,e,n,s,o,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,o===void 0&&this.Fu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(t){return new ii(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.xu({path:n,Nu:!1});return s.Lu(t),s}Bu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.xu({path:n,Nu:!1});return s.Fu(),s}ku(t){return this.xu({path:void 0,Nu:!0})}qu(t){return pr(t,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Fu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Lu(this.path.get(t))}Lu(t){if(t.length===0)throw this.qu("Document fields must not be empty");if(kc(this.Mu)&&Yf.test(t))throw this.qu('Document fields cannot begin and end with "__"')}}class Zf{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||wr(t)}$u(t,e,n,s=!1){return new ii({Mu:t,methodName:e,Ku:n,path:ut.emptyPath(),Nu:!1,Qu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function xc(r){const t=r._freezeSettings(),e=wr(r._databaseId);return new Zf(r._databaseId,!!t.ignoreUndefinedProperties,e)}function tm(r,t,e,n,s,o={}){const a=r.$u(o.merge||o.mergeFields?2:0,t,e,s);Mc("Data must be an object, but it was:",a,n);const u=Oc(n,a);let h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const v of o.mergeFields){const R=nm(t,v,e);if(!a.contains(R))throw new x(C.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);sm(m,R)||m.push(R)}h=new St(m),f=a.fieldTransforms.filter(v=>h.covers(v.field))}else h=null,f=a.fieldTransforms;return new Jf(new At(u),h,f)}function em(r,t,e,n=!1){return oi(e,r.$u(n?4:3,t))}function oi(r,t){if(Lc(r=we(r)))return Mc("Unsupported field value:",t,r),Oc(r,t);if(r instanceof Nc)return function(n,s){if(!kc(s.Mu))throw s.qu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.qu(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.Nu&&t.Mu!==4)throw t.qu("Nested arrays are not supported");return function(n,s){const o=[];let a=0;for(const u of n){let h=oi(u,s.ku(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(r,t)}return function(n,s){if((n=we(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Uh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=st.fromDate(n);return{timestampValue:hr(s.serializer,o)}}if(n instanceof st){const o=new st(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:hr(s.serializer,o)}}if(n instanceof ri)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof De)return{bytesValue:nc(s.serializer,n._byteString)};if(n instanceof wt){const o=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(o))throw s.qu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:zs(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof si)return function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw u.qu("VectorValues must only contain numeric values.");return Us(u.serializer,h)})}}}}}}(n,s);throw s.qu(`Unsupported field value: ${Cr(n)}`)}(r,t)}function Oc(r,t){const e={};return Va(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):le(r,(n,s)=>{const o=oi(s,t.Ou(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function Lc(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof st||r instanceof ri||r instanceof De||r instanceof wt||r instanceof Nc||r instanceof si)}function Mc(r,t,e){if(!Lc(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const n=Cr(e);throw n==="an object"?t.qu(r+" a custom object"):t.qu(r+" "+n)}}function nm(r,t,e){if((t=we(t))instanceof ni)return t._internalPath;if(typeof t=="string")return Fc(r,t);throw pr("Field path arguments must be of type string or ",r,!1,void 0,e)}const rm=new RegExp("[~\\*/\\[\\]]");function Fc(r,t,e){if(t.search(rm)>=0)throw pr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new ni(...t.split("."))._internalPath}catch{throw pr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function pr(r,t,e,n,s){const o=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${n}`),a&&(h+=` in document ${s}`),h+=")"),new x(C.INVALID_ARGUMENT,u+r+h)}function sm(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(t,e,n,s,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new im(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Vr("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class im extends Bc{data(){return super.data()}}function Vr(r,t){return typeof t=="string"?Fc(r,t):t instanceof ni?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ai{}class ci extends ai{}function en(r,t,...e){let n=[];t instanceof ai&&n.push(t),n=n.concat(e),function(o){const a=o.filter(h=>h instanceof li).length,u=o.filter(h=>h instanceof Dr).length;if(a>1||a>0&&u>0)throw new x(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Dr extends ci{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Dr(t,e,n)}_apply(t){const e=this._parse(t);return Uc(t._query,e),new Zt(t.firestore,t.converter,ws(t._query,e))}_parse(t){const e=xc(t.firestore);return function(o,a,u,h,f,m,v){let R;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new x(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){ha(v,m);const P=[];for(const b of v)P.push(ua(h,o,b));R={arrayValue:{values:P}}}else R=ua(h,o,v)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||ha(v,m),R=em(u,a,v,m==="in"||m==="not-in");return rt.create(f,m,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function am(r,t,e){const n=t,s=Vr("where",r);return Dr._create(s,n,e)}class li extends ai{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new li(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Ct.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let a=s;const u=o.getFlattenedFilters();for(const h of u)Uc(a,h),a=ws(a,h)}(t._query,e),new Zt(t.firestore,t.converter,ws(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ui extends ci{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ui(t,e)}_apply(t){const e=function(s,o,a){if(s.startAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new yn(o,a)}(t._query,this._field,this._direction);return new Zt(t.firestore,t.converter,function(s,o){const a=s.explicitOrderBy.concat([o]);return new Le(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function us(r,t="asc"){const e=t,n=Vr("orderBy",r);return ui._create(n,e)}class hi extends ci{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new hi(t,e,n)}_apply(t){return new Zt(t.firestore,t.converter,cr(t._query,this._limit,this._limitType))}}function la(r){return hi._create("limit",r,"F")}function ua(r,t,e){if(typeof(e=we(e))=="string"){if(e==="")throw new x(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ua(t)&&e.indexOf("/")!==-1)throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Y.fromString(e));if(!O.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Vo(r,new O(n))}if(e instanceof wt)return Vo(r,e._key);throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Cr(e)}.`)}function ha(r,t){if(!Array.isArray(r)||r.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Uc(r,t){const e=function(s,o){for(const a of s)for(const u of a.getFlattenedFilters())if(o.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class cm{convertValue(t,e="none"){switch(Yt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return le(t,(s,o)=>{n[s]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,s;const o=(s=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>tt(a.doubleValue));return new si(o)}convertGeoPoint(t){return new ri(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=yr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(pn(t));default:return null}}convertTimestamp(t){const e=Wt(t);return new st(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);H(cc(n));const s=new gn(n.get(1),n.get(3)),o=new O(n.popFirst(5));return s.isEqual(e)||Mt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(r,t,e){let n;return n=r?r.toFirestore(t):t,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class um extends Bc{constructor(t,e,n,s,o,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new nr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Vr("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class nr extends um{data(t={}){return super.data(t)}}class hm{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Xn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new nr(this._firestore,this._userDataWriter,n.key,n,new Xn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new x(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const h=new nr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Xn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const h=new nr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Xn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:dm(u.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function dm(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}class fm extends cm{constructor(t){super(),this.firestore=t}convertBytes(t){return new De(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new wt(this.firestore,null,e)}}function nn(r){r=vn(r,Zt);const t=vn(r.firestore,br),e=Dc(t),n=new fm(t);return om(r._query),$f(e,r._query).then(s=>new hm(t,n,r,s))}function hs(r){return qc(vn(r.firestore,br),[new qs(r._key,bt.none())])}function mm(r,t){const e=vn(r.firestore,br),n=Qf(r),s=lm(r.converter,t);return qc(e,[tm(xc(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,bt.exists(!1))]).then(()=>n)}function qc(r,t){return function(n,s){const o=new Kt;return n.asyncQueue.enqueueAndForget(async()=>Df(await jf(n),s,o)),o.promise}(Dc(r),t)}(function(t,e=!0){(function(s){ke=s})(Gu),ir(new dn("firestore",(n,{instanceIdentifier:s,options:o})=>{const a=n.getProvider("app").getImmediate(),u=new br(new eh(n.getProvider("auth-internal")),new ih(n.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new x(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gn(f.options.projectId,m)}(a,s),a);return o=Object.assign({useFetchStreams:e},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),Ie(wo,"4.7.5",t),Ie(wo,"4.7.5","esm2017")})();var pm="firebase",gm="11.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ie(pm,gm,"app");const _m={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_FIREBASE_API_KEY:"AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",VITE_FIREBASE_APP_ID:"1:701773775110:web:252b8dd41bcb28ea545e87",VITE_FIREBASE_AUTH_DOMAIN:"snakeysnake-34426.firebaseapp.com",VITE_FIREBASE_MEASUREMENT_ID:"G-S95YBN43ME",VITE_FIREBASE_MESSAGING_SENDER_ID:"701773775110",VITE_FIREBASE_PROJECT_ID:"snakeysnake-34426",VITE_FIREBASE_STORAGE_BUCKET:"snakeysnake-34426.firebasestorage.app"},an={apiKey:"AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",authDomain:"snakeysnake-34426.firebaseapp.com",projectId:"snakeysnake-34426",storageBucket:"snakeysnake-34426.firebasestorage.app",messagingSenderId:"701773775110",appId:"1:701773775110:web:252b8dd41bcb28ea545e87",measurementId:"G-S95YBN43ME"},ym=["VITE_FIREBASE_API_KEY","VITE_FIREBASE_AUTH_DOMAIN","VITE_FIREBASE_PROJECT_ID","VITE_FIREBASE_STORAGE_BUCKET","VITE_FIREBASE_MESSAGING_SENDER_ID","VITE_FIREBASE_APP_ID","VITE_FIREBASE_MEASUREMENT_ID"],ds=ym.filter(r=>!_m[r]);if(ds.length>0)throw console.error("Missing required environment variables:",ds),new Error(`Missing required environment variables: ${ds.join(", ")}`);console.log("Initializing Firebase with config:",{...an,apiKey:an.apiKey?"exists":"missing",appId:an.appId?"exists":"missing",projectId:an.projectId});let ie;try{const r=Ea(an);ie=Wf(r),console.log("Firebase initialized successfully")}catch(r){throw console.error("Error initializing Firebase:",r),r}class Em{constructor(){this.canvas=document.getElementById("gameCanvas"),this.ctx=this.canvas.getContext("2d"),this.currentScoreElement=document.getElementById("currentScore"),this.highScoreElement=document.getElementById("highScore"),this.modal=document.getElementById("gameOverModal"),this.finalScoreElement=document.getElementById("finalScore"),this.finalHighScoreElement=document.getElementById("finalHighScore"),this.submitScoreButton=document.getElementById("submitScore"),this.playerNameInput=document.getElementById("playerName"),this.nameInputContainer=document.getElementById("nameInputContainer"),this.validateElements(),this.initializeGame(),this.setupEventListeners(),this.initializePointsGuide(),this.setupAdminPanel()}validateElements(){if(!this.canvas||!this.ctx||!this.currentScoreElement||!this.highScoreElement||!this.modal||!this.finalScoreElement||!this.finalHighScoreElement||!this.submitScoreButton||!this.playerNameInput||!this.nameInputContainer)throw new Error("Required DOM elements not found")}initializeGame(){this.lastRenderTime=0,this.gameOver=!1,this.snake=[{x:10,y:10}],this.dx=0,this.dy=0,this.score=0,this.highScore=parseInt(localStorage.getItem("snakeHighScore"))||0,this.highScoreElement.textContent=this.highScore,this.food=this.getRandomFoodPosition(),this.goldenApple=null,this.goldenAppleTimer=null,this.lastDirectionChange=0,this.directionChangeThreshold=50}setupEventListeners(){this.boundHandleKeyPress=this.handleKeyPress.bind(this),this.boundGameLoop=this.gameLoop.bind(this),document.addEventListener("keydown",this.boundHandleKeyPress)}cleanup(){this.goldenAppleTimer&&(clearTimeout(this.goldenAppleTimer),this.goldenAppleTimer=null),document.removeEventListener("keydown",this.boundHandleKeyPress)}handleKeyPress(t){if(t.key.startsWith("Arrow")&&t.preventDefault(),this.gameOver){if(t.key===" "){document.activeElement!==this.playerNameInput&&(t.preventDefault(),this.startNewGame());return}if(t.key==="Enter"&&this.nameInputContainer.style.display==="block"){t.preventDefault(),this.playerNameInput.value.trim()&&this.boundSubmitScore();return}return}const e=Date.now();if(e-this.lastDirectionChange<this.directionChangeThreshold)return;const n=this.snake[0];let s=n.x,o=n.y;switch(t.key){case"ArrowUp":this.dy===0&&(o=n.y-1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=0,this.dy=-1,this.lastDirectionChange=e));break;case"ArrowDown":this.dy===0&&(o=n.y+1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=0,this.dy=1,this.lastDirectionChange=e));break;case"ArrowLeft":this.dx===0&&(s=n.x-1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=-1,this.dy=0,this.lastDirectionChange=e));break;case"ArrowRight":this.dx===0&&(s=n.x+1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=1,this.dy=0,this.lastDirectionChange=e));break}}getRandomPosition(){let t,e=!1;for(;!e;){t={x:Math.floor(Math.random()*B.TILE_COUNT),y:Math.floor(Math.random()*B.TILE_COUNT)},e=!0;for(let n of this.snake)if(n.x===t.x&&n.y===t.y){e=!1;break}this.food&&t.x===this.food.x&&t.y===this.food.y&&(e=!1),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(e=!1)}return t}getRandomFoodPosition(){return{...this.getRandomPosition(),type:B.FRUITS[0]}}trySpawnGoldenApple(){if(!this.goldenApple&&Math.random()<B.GOLDEN_APPLE_CHANCE){const t=this.getRandomPosition();this.goldenApple={...t,type:B.FRUITS[1]},this.goldenAppleTimer=setTimeout(()=>{this.goldenApple=null},B.GOLDEN_APPLE_DURATION)}}update(){const t={x:this.snake[0].x+this.dx,y:this.snake[0].y+this.dy};this.snake.unshift(t);let e=!1;if(t.x===this.food.x&&t.y===this.food.y&&(this.score+=this.food.type.points,this.currentScoreElement.textContent=this.score,this.currentScoreElement.classList.add("score-update"),setTimeout(()=>{this.currentScoreElement.classList.remove("score-update")},300),this.food=this.getRandomFoodPosition(),this.trySpawnGoldenApple(),e=!0),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(this.score+=this.goldenApple.type.points,this.currentScoreElement.textContent=this.score,this.currentScoreElement.classList.add("score-update"),setTimeout(()=>{this.currentScoreElement.classList.remove("score-update")},300),clearTimeout(this.goldenAppleTimer),this.goldenApple=null,e=!0),e||this.snake.pop(),this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.highScore),this.highScoreElement.textContent=this.highScore),t.x<0||t.x>=B.TILE_COUNT||t.y<0||t.y>=B.TILE_COUNT){this.gameOver=!0,this.showGameOver();return}for(let n=1;n<this.snake.length;n++)if(t.x===this.snake[n].x&&t.y===this.snake[n].y){this.gameOver=!0,this.showGameOver();return}}render(){if(this.snake.length>0){this.ctx.fillStyle=B.COLORS.BACKGROUND,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.beginPath();const t={x:this.snake[0].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[0].y*B.GRID_SIZE+B.GRID_SIZE/2};this.ctx.moveTo(t.x,t.y);for(let N=0;N<this.snake.length-1;N++){const U={x:this.snake[N].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[N].y*B.GRID_SIZE+B.GRID_SIZE/2},K={x:this.snake[N+1].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[N+1].y*B.GRID_SIZE+B.GRID_SIZE/2},Q=(U.x+K.x)/2,et=(U.y+K.y)/2;this.ctx.quadraticCurveTo(U.x,U.y,Q,et)}this.ctx.shadowColor="rgba(0, 0, 0, 0.4)",this.ctx.shadowBlur=6,this.ctx.shadowOffsetX=2,this.ctx.shadowOffsetY=2;const e=this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height);e.addColorStop(0,B.COLORS.SNAKE_BASE),e.addColorStop(.3,B.COLORS.SNAKE_LIGHT),e.addColorStop(.6,B.COLORS.SNAKE_BASE),e.addColorStop(.9,B.COLORS.SNAKE_DARK),this.ctx.strokeStyle=e,this.ctx.lineWidth=B.GRID_SIZE-2,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.stroke(),this.ctx.shadowColor="transparent",this.ctx.shadowBlur=0,this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0;const n=this.snake[0],s=n.x*B.GRID_SIZE+B.GRID_SIZE/2,o=n.y*B.GRID_SIZE+B.GRID_SIZE/2,a=(B.GRID_SIZE-2)/2,u=this.ctx.createRadialGradient(s-a/2,o-a/2,a/4,s,o,a);u.addColorStop(0,B.COLORS.SNAKE_LIGHT),u.addColorStop(.7,B.COLORS.SNAKE_BASE),u.addColorStop(1,B.COLORS.SNAKE_DARK),this.ctx.beginPath(),this.ctx.fillStyle=u,this.ctx.arc(s,o,a,0,Math.PI*2),this.ctx.fill();const h=a*.5;let f=s-h,m=s+h,v=o,R=s,P=o,b=s,D=o;this.dx===1?(v=o-a*.3,R=s+a*.8,b=s+a+8):this.dx===-1?(v=o-a*.3,R=s-a*.8,b=s-a-8):this.dy===-1?(f=s-a*.3,m=s+a*.3,v=o-h,P=o-a*.8,D=o-a-8):this.dy===1&&(f=s-a*.3,m=s+a*.3,v=o+h,P=o+a*.8,D=o+a+8),this.ctx.fillStyle="#000",this.ctx.beginPath(),this.ctx.arc(f,v,2.5,0,Math.PI*2),this.ctx.arc(m,v,2.5,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.8)",this.ctx.beginPath(),this.ctx.arc(f-.5,v-.5,1,0,Math.PI*2),this.ctx.arc(m-.5,v-.5,1,0,Math.PI*2),this.ctx.fill(),(this.dx!==0||this.dy!==0)&&(this.ctx.strokeStyle=B.COLORS.TONGUE,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(R,P),this.ctx.lineTo(b,D),this.dx===1?(this.ctx.quadraticCurveTo(b+2,D,b+2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b+2,D,b+2,D+3)):this.dx===-1?(this.ctx.quadraticCurveTo(b-2,D,b-2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b-2,D,b-2,D+3)):this.dy===-1?(this.ctx.quadraticCurveTo(b,D-2,b-3,D-2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D-2,b+3,D-2)):this.dy===1&&(this.ctx.quadraticCurveTo(b,D+2,b-3,D+2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D+2,b+3,D+2)),this.ctx.stroke())}this.drawFruit(this.food),this.goldenApple&&this.drawFruit(this.goldenApple)}drawFruit(t){const e=t.x*B.GRID_SIZE,n=t.y*B.GRID_SIZE;this.ctx.fillStyle=t.type.color,this.ctx.beginPath(),this.ctx.arc(e+B.GRID_SIZE/2,n+B.GRID_SIZE/2,B.GRID_SIZE/2-2,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle=t.type.leafColor,this.ctx.beginPath(),this.ctx.ellipse(e+B.GRID_SIZE/2,n,4,8,Math.PI/4,0,Math.PI*2),this.ctx.fill()}gameLoop(t){try{if(this.gameOver||(window.requestAnimationFrame(this.boundGameLoop),(t-this.lastRenderTime)/1e3<1/B.GAME_SPEED))return;this.lastRenderTime=t,this.update(),this.render()}catch(e){console.error("Game loop error:",e),this.gameOver=!0,this.showGameOver()}}async showGameOver(){this.cleanup(),this.finalScoreElement.textContent=this.score,this.finalHighScoreElement.textContent=this.highScore,this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.highScore),this.highScoreElement.textContent=this.highScore);const t=document.querySelector(".celebration-message");t&&t.remove(),await this.checkAndShowNameInput(),this.modal.style.display="block",this.boundSubmitScore&&this.submitScoreButton.removeEventListener("click",this.boundSubmitScore),this.boundSubmitScore=async()=>{const e=this.playerNameInput.value.trim();e&&await this.saveGlobalScore(e,this.score)},this.submitScoreButton.addEventListener("click",this.boundSubmitScore)}async checkAndShowNameInput(){try{const t=localStorage.getItem("lastScoreSubmission"),e=Date.now();if(t&&e-parseInt(t)<6e4){this.nameInputContainer.style.display="none",this.modal.querySelector(".modal-content").insertAdjacentHTML("beforeend",`
              <p class="restart-hint">
                  Please wait before submitting another score.<br>
                  Press <span class="key">Space</span> to restart
              </p>
          `);return}const s=await this.getGlobalTopScores(),o=s.length<5||this.score>s[s.length-1].score;this.nameInputContainer.style.display=o?"block":"none",o||document.querySelector(".restart-hint")||this.modal.querySelector(".modal-content").insertAdjacentHTML("beforeend",`
                  <p class="restart-hint">
                      Press <span class="key">Space</span> to restart
                  </p>
              `)}catch(t){console.error("Error checking top scores:",t),this.nameInputContainer.style.display="none"}}async getGlobalTopScores(){try{const t=en(_e(ie,"highscores"),us("score","desc"),la(5));return(await nn(t)).docs.map(s=>({id:s.id,...s.data()}))}catch(t){return console.error("Error fetching global scores:",t),[]}}async saveGlobalScore(t,e){try{const n=this.sanitizePlayerName(t),s=n.toLowerCase();if(!n||!Number.isInteger(e)||e<0)throw new Error("Invalid score or name");const o=en(_e(ie,"highscores"),am("nameLower","==",s)),a=await nn(o);if(!a.empty){const b=a.docs[0].data().score;if(e<=b){const D=document.getElementById("nameInputContainer");D.style.display="none";const N=`
            <div class="celebration-message">
              <p>You already have a higher score of ${b} in the Hall of Fame!</p>
            </div>
          `,U=document.querySelector(".celebration-message");U&&U.remove(),D.insertAdjacentHTML("afterend",N);return}await hs(a.docs[0].ref)}const u=en(_e(ie,"highscores"),us("score","desc")),f=(await nn(u)).docs;if(f.length>=15){const b=f[f.length-1].data().score;if(e>b)await hs(f[f.length-1].ref);else if(e<=b){console.log("Score not high enough for top 15");return}}const m={name:n,nameLower:s,score:e,timestamp:new Date};console.log("Attempting to save score:",m),await mm(_e(ie,"highscores"),m),await this.updateGlobalTopScores();const v=`
        <div class="celebration-message">
          <h3>🏆 Incredible Score! 🏆</h3>
          <p>You've made it into the Hall of Fame!</p>
        </div>
      `,R=document.getElementById("nameInputContainer");R.style.display="none";const P=document.querySelector(".celebration-message");P&&P.remove(),R.insertAdjacentHTML("afterend",v)}catch(n){console.error("Error saving global score:",n),alert("Failed to save score. Please try again.")}}async startNewGame(){this.modal.style.display="none",this.nameInputContainer.style.display="none",this.playerNameInput.value="",this.initializeGame(),this.setupEventListeners(),await this.updateGlobalTopScores(),requestAnimationFrame(this.boundGameLoop)}initializePointsGuide(){document.querySelectorAll(".apple-icon").forEach(e=>{const n=e.getContext("2d"),s=e.classList.contains("golden"),o={type:B.FRUITS[s?1:0]};n.fillStyle=o.type.color,n.beginPath(),n.arc(10,10,8,0,Math.PI*2),n.fill(),n.fillStyle=o.type.leafColor,n.beginPath(),n.ellipse(10,4,2,4,Math.PI/4,0,Math.PI*2),n.fill()})}async updateGlobalTopScores(){try{const t=en(_e(ie,"highscores"),us("score","desc"),la(5)),n=(await nn(t)).docs.map(u=>({id:u.id,...u.data()})),s=document.getElementById("topScores"),a=Array.from({length:5},(u,h)=>{const f=n[h]||null;return`
              <li>
                  <div class="score-row">
                      <div class="score-left">
                          <span class="position">${h+1}.</span>
                          <span class="player-name">${f?f.name:"---"}</span>
                      </div>
                      <span class="score-value">${f?f.score:"---"}</span>
                  </div>
              </li>
          `}).join("");s.innerHTML=a}catch(t){console.error("Error in updateGlobalTopScores:",t)}}sanitizePlayerName(t){return t?t.replace(/[<>]/g,"").replace(/[^\w\s-]/g,"").trim():""}setupAdminPanel(){const t=document.getElementById("adminButton"),e=document.getElementById("adminModal"),n=document.getElementById("adminLogin"),s=document.getElementById("adminControls"),o=document.getElementById("adminPassword"),a=document.getElementById("adminLoginBtn"),u=document.getElementById("clearLeaderboard"),h=document.getElementById("closeAdminPanel");if(!t||!e||!n||!s||!o||!a||!u||!h){console.warn("Admin panel elements not found, skipping setup");return}const f="snake123";t.addEventListener("click",()=>{e.style.display="block",n.style.display="flex",s.style.display="none",o.value=""}),a.addEventListener("click",()=>{o.value===f&&(n.style.display="none",s.style.display="flex")}),u.addEventListener("click",async()=>{if(confirm("Are you sure you want to clear all scores?"))try{const v=en(_e(ie,"highscores")),P=(await nn(v)).docs.map(b=>hs(b.ref));await Promise.all(P),await this.updateGlobalTopScores(),e.style.display="none",alert("All scores have been cleared!")}catch(v){console.error("Error clearing scores:",v),alert("Failed to clear scores. Please try again.")}}),h.addEventListener("click",()=>{e.style.display="none"}),window.addEventListener("click",m=>{m.target===e&&(e.style.display="none")})}}window.onerror=function(r,t,e,n,s){console.error("Game error:",{message:r,source:t,lineno:e,colno:n,error:s});const o=window.gameInstance;return o&&(o.cleanup(),o.showGameOver()),!0};try{window.gameInstance=new Em,window.gameInstance.startNewGame()}catch(r){console.error("Failed to initialize game:",r)}
