(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const B={GRID_SIZE:20,TILE_COUNT:20,GAME_SPEED:13,FRAME_TIME:1e3/60,GOLDEN_APPLE_CHANCE:.15,GOLDEN_APPLE_DURATION:5e3,COLORS:{BACKGROUND:"#222831",SNAKE_BASE:"#3eb892",SNAKE_LIGHT:"#45c09c",SNAKE_DARK:"#39a885",TONGUE:"#ff1744"},FRUITS:[{name:"Apple",color:"#e63946",points:10,leafColor:"#2a9d8f"},{name:"Golden Apple",color:"#ffd700",points:50,leafColor:"#ff9f1c"}],MAX_NAME_LENGTH:20,MIN_NAME_LENGTH:1,ERRORS:{LOAD_SCORES:"Failed to load high scores",SAVE_SCORES:"Failed to save high scores"}};var ro={};/**
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
 */const ia=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},pu=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const i=r[e++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){const o=r[e++];t[n++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=r[e++],a=r[e++],l=r[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[n++]=String.fromCharCode(55296+(h>>10)),t[n++]=String.fromCharCode(56320+(h&1023))}else{const o=r[e++],a=r[e++];t[n++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},sa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const o=r[i],a=i+1<r.length,l=a?r[i+1]:0,h=i+2<r.length,f=h?r[i+2]:0,p=o>>2,I=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,P=f&63;h||(P=64,a||(R=64)),n.push(e[p],e[I],e[R],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(ia(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):pu(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const o=e[r.charAt(i++)],l=i<r.length?e[r.charAt(i)]:0;++i;const f=i<r.length?e[r.charAt(i)]:64;++i;const I=i<r.length?e[r.charAt(i)]:64;if(++i,o==null||l==null||f==null||I==null)throw new gu;const R=o<<2|l>>4;if(n.push(R),f!==64){const P=l<<4&240|f>>2;if(n.push(P),I!==64){const b=f<<6&192|I;n.push(b)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class gu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _u=function(r){const t=ia(r);return sa.encodeByteArray(t,!0)},Yn=function(r){return _u(r).replace(/\./g,"")},yu=function(r){try{return sa.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Eu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Tu=()=>Eu().__FIREBASE_DEFAULTS__,vu=()=>{if(typeof process>"u"||typeof ro>"u")return;const r=ro.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Iu=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&yu(r[1]);return t&&JSON.parse(t)},Ii=()=>{try{return Tu()||vu()||Iu()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Au=r=>{var t,e;return(e=(t=Ii())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[r]},wu=r=>{const t=Au(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},oa=()=>{var r;return(r=Ii())===null||r===void 0?void 0:r.config};/**
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
 */class Ru{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Su(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",i=r.iat||0,o=r.sub||r.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Yn(JSON.stringify(e)),Yn(JSON.stringify(a)),""].join(".")}/**
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
 */function Cu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pu(){var r;const t=(r=Ii())===null||r===void 0?void 0:r.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function bu(){return!Pu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Vu(){try{return typeof indexedDB=="object"}catch{return!1}}function Du(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
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
 */const Nu="FirebaseError";class Ve extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Nu,Object.setPrototypeOf(this,Ve.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,aa.prototype.create)}}class aa{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?ku(o,n):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Ve(i,l,n)}}function ku(r,t){return r.replace(xu,(e,n)=>{const i=t[n];return i!=null?String(i):`<${n}?>`})}const xu=/\{\$([^}]+)}/g;function ni(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const i of e){if(!n.includes(i))return!1;const o=r[i],a=t[i];if(io(o)&&io(a)){if(!ni(o,a))return!1}else if(o!==a)return!1}for(const i of n)if(!e.includes(i))return!1;return!0}function io(r){return r!==null&&typeof r=="object"}/**
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
 */function Ie(r){return r&&r._delegate?r._delegate:r}class an{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const ie="[DEFAULT]";/**
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
 */class Ou{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new Ru;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t?.identifier),i=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Mu(t))try{this.getOrInitializeService({instanceIdentifier:ie})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});n.resolve(o)}catch{}}}}clearInstance(t=ie){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ie){return this.instances.has(t)}getOptions(t=ie){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);n===l&&a.resolve(i)}return i}onInit(t,e){var n;const i=this.normalizeInstanceIdentifier(e),o=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;o.add(t),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const i of n)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Lu(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=ie){return this.component?this.component.multipleInstances?t:ie:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lu(r){return r===ie?void 0:r}function Mu(r){return r.instantiationMode==="EAGER"}/**
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
 */class Fu{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Ou(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var j;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(j||(j={}));const Bu={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},Uu=j.INFO,qu={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Gu=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),i=qu[t];if(i)console[i](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ca{constructor(t){this.name=t,this._logLevel=Uu,this._logHandler=Gu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Bu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}}const ju=(r,t)=>t.some(e=>r instanceof e);let so,oo;function $u(){return so||(so=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zu(){return oo||(oo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ua=new WeakMap,ri=new WeakMap,la=new WeakMap,Qr=new WeakMap,Ai=new WeakMap;function Ku(r){const t=new Promise((e,n)=>{const i=()=>{r.removeEventListener("success",o),r.removeEventListener("error",a)},o=()=>{e($t(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",o),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ua.set(e,r)}).catch(()=>{}),Ai.set(t,r),t}function Hu(r){if(ri.has(r))return;const t=new Promise((e,n)=>{const i=()=>{r.removeEventListener("complete",o),r.removeEventListener("error",a),r.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",o),r.addEventListener("error",a),r.addEventListener("abort",a)});ri.set(r,t)}let ii={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return ri.get(r);if(t==="objectStoreNames")return r.objectStoreNames||la.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return $t(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function Qu(r){ii=r(ii)}function Wu(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(Wr(this),t,...e);return la.set(n,t.sort?t.sort():[t]),$t(n)}:zu().includes(r)?function(...t){return r.apply(Wr(this),t),$t(ua.get(this))}:function(...t){return $t(r.apply(Wr(this),t))}}function Xu(r){return typeof r=="function"?Wu(r):(r instanceof IDBTransaction&&Hu(r),ju(r,$u())?new Proxy(r,ii):r)}function $t(r){if(r instanceof IDBRequest)return Ku(r);if(Qr.has(r))return Qr.get(r);const t=Xu(r);return t!==r&&(Qr.set(r,t),Ai.set(t,r)),t}const Wr=r=>Ai.get(r);function Yu(r,t,{blocked:e,upgrade:n,blocking:i,terminated:o}={}){const a=indexedDB.open(r,t),l=$t(a);return n&&a.addEventListener("upgradeneeded",h=>{n($t(a.result),h.oldVersion,h.newVersion,$t(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const Ju=["get","getKey","getAll","getAllKeys","count"],Zu=["put","add","delete","clear"],Xr=new Map;function ao(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(Xr.get(t))return Xr.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,i=Zu.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Ju.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,i?"readwrite":"readonly");let f=h.store;return n&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),i&&h.done]))[0]};return Xr.set(t,o),o}Qu(r=>({...r,get:(t,e,n)=>ao(t,e)||r.get(t,e,n),has:(t,e)=>!!ao(t,e)||r.has(t,e)}));/**
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
 */class tl{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(el(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function el(r){const t=r.getComponent();return t?.type==="VERSION"}const si="@firebase/app",co="0.10.17";/**
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
 */const Lt=new ca("@firebase/app"),nl="@firebase/app-compat",rl="@firebase/analytics-compat",il="@firebase/analytics",sl="@firebase/app-check-compat",ol="@firebase/app-check",al="@firebase/auth",cl="@firebase/auth-compat",ul="@firebase/database",ll="@firebase/data-connect",hl="@firebase/database-compat",dl="@firebase/functions",fl="@firebase/functions-compat",ml="@firebase/installations",pl="@firebase/installations-compat",gl="@firebase/messaging",_l="@firebase/messaging-compat",yl="@firebase/performance",El="@firebase/performance-compat",Tl="@firebase/remote-config",vl="@firebase/remote-config-compat",Il="@firebase/storage",Al="@firebase/storage-compat",wl="@firebase/firestore",Rl="@firebase/vertexai",Sl="@firebase/firestore-compat",Cl="firebase",Pl="11.1.0";/**
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
 */const oi="[DEFAULT]",bl={[si]:"fire-core",[nl]:"fire-core-compat",[il]:"fire-analytics",[rl]:"fire-analytics-compat",[ol]:"fire-app-check",[sl]:"fire-app-check-compat",[al]:"fire-auth",[cl]:"fire-auth-compat",[ul]:"fire-rtdb",[ll]:"fire-data-connect",[hl]:"fire-rtdb-compat",[dl]:"fire-fn",[fl]:"fire-fn-compat",[ml]:"fire-iid",[pl]:"fire-iid-compat",[gl]:"fire-fcm",[_l]:"fire-fcm-compat",[yl]:"fire-perf",[El]:"fire-perf-compat",[Tl]:"fire-rc",[vl]:"fire-rc-compat",[Il]:"fire-gcs",[Al]:"fire-gcs-compat",[wl]:"fire-fst",[Sl]:"fire-fst-compat",[Rl]:"fire-vertex","fire-js":"fire-js",[Cl]:"fire-js-all"};/**
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
 */const Jn=new Map,Vl=new Map,ai=new Map;function uo(r,t){try{r.container.addComponent(t)}catch(e){Lt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Zn(r){const t=r.name;if(ai.has(t))return Lt.debug(`There were multiple attempts to register component ${t}.`),!1;ai.set(t,r);for(const e of Jn.values())uo(e,r);for(const e of Vl.values())uo(e,r);return!0}function Dl(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}/**
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
 */const Nl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new aa("app","Firebase",Nl);/**
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
 */class kl{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
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
 */const xl=Pl;function ha(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n=Object.assign({name:oi,automaticDataCollectionEnabled:!1},t),i=n.name;if(typeof i!="string"||!i)throw zt.create("bad-app-name",{appName:String(i)});if(e||(e=oa()),!e)throw zt.create("no-options");const o=Jn.get(i);if(o){if(ni(e,o.options)&&ni(n,o.config))return o;throw zt.create("duplicate-app",{appName:i})}const a=new Fu(i);for(const h of ai.values())a.addComponent(h);const l=new kl(e,n,a);return Jn.set(i,l),l}function Ol(r=oi){const t=Jn.get(r);if(!t&&r===oi&&oa())return ha();if(!t)throw zt.create("no-app",{appName:r});return t}function Te(r,t,e){var n;let i=(n=bl[r])!==null&&n!==void 0?n:r;e&&(i+=`-${e}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const l=[`Unable to register library "${i}" with version "${t}":`];o&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Lt.warn(l.join(" "));return}Zn(new an(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
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
 */const Ll="firebase-heartbeat-database",Ml=1,cn="firebase-heartbeat-store";let Yr=null;function da(){return Yr||(Yr=Yu(Ll,Ml,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(cn)}catch(e){console.warn(e)}}}}).catch(r=>{throw zt.create("idb-open",{originalErrorMessage:r.message})})),Yr}async function Fl(r){try{const e=(await da()).transaction(cn),n=await e.objectStore(cn).get(fa(r));return await e.done,n}catch(t){if(t instanceof Ve)Lt.warn(t.message);else{const e=zt.create("idb-get",{originalErrorMessage:t?.message});Lt.warn(e.message)}}}async function lo(r,t){try{const n=(await da()).transaction(cn,"readwrite");await n.objectStore(cn).put(t,fa(r)),await n.done}catch(e){if(e instanceof Ve)Lt.warn(e.message);else{const n=zt.create("idb-set",{originalErrorMessage:e?.message});Lt.warn(n.message)}}}function fa(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Bl=1024,Ul=30*24*60*60*1e3;class ql{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new jl(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ho();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Ul}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Lt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ho(),{heartbeatsToSend:n,unsentEntries:i}=Gl(this._heartbeatsCache.heartbeats),o=Yn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Lt.warn(e),""}}}function ho(){return new Date().toISOString().substring(0,10)}function Gl(r,t=Bl){const e=[];let n=r.slice();for(const i of r){const o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),fo(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),fo(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class jl{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Vu()?Du().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Fl(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return lo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return lo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function fo(r){return Yn(JSON.stringify({version:2,heartbeats:r})).length}/**
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
 */function $l(r){Zn(new an("platform-logger",t=>new tl(t),"PRIVATE")),Zn(new an("heartbeat",t=>new ql(t),"PRIVATE")),Te(si,co,r),Te(si,co,"esm2017"),Te("fire-js","")}$l("");var mo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var oe,ma;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,m){function _(){}_.prototype=m.prototype,T.D=m.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(y,E,A){for(var g=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)g[Nt-2]=arguments[Nt];return m.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,m,_){_||(_=0);var y=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)y[E]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=T.g[0],_=T.g[1],E=T.g[2];var A=T.g[3],g=m+(A^_&(E^A))+y[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[2]+606105819&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[6]+2821735955&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[10]+4294925233&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[14]+2792965006&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(E^A&(_^E))+y[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[11]+643717713&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[15]+3634488961&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[3]+4107603335&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[7]+1735328473&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(_^E^A)+y[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[11]+1839030562&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[7]+4139469664&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[3]+3572445317&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[15]+530742520&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(E^(_|~A))+y[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[14]+2878612391&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[10]+4293915773&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[6]+2734768916&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[2]+718787259&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}n.prototype.u=function(T,m){m===void 0&&(m=T.length);for(var _=m-this.blockSize,y=this.B,E=this.h,A=0;A<m;){if(E==0)for(;A<=_;)i(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(y[E++]=T.charCodeAt(A++),E==this.blockSize){i(this,y),E=0;break}}else for(;A<m;)if(y[E++]=T[A++],E==this.blockSize){i(this,y),E=0;break}}this.h=E,this.o+=m},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;var _=8*this.o;for(m=T.length-8;m<T.length;++m)T[m]=_&255,_/=256;for(this.u(T),T=Array(16),m=_=0;4>m;++m)for(var y=0;32>y;y+=8)T[_++]=this.g[m]>>>y&255;return T};function o(T,m){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=m(T)}function a(T,m){this.h=m;for(var _=[],y=!0,E=T.length-1;0<=E;E--){var A=T[E]|0;y&&A==m||(_[E]=A,y=!1)}this.g=_}var l={};function h(T){return-128<=T&&128>T?o(T,function(m){return new a([m|0],0>m?-1:0)}):new a([T|0],0>T?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return I;if(0>T)return N(f(-T));for(var m=[],_=1,y=0;T>=_;y++)m[y]=T/_|0,_*=4294967296;return new a(m,0)}function p(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return N(p(T.substring(1),m));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(m,8)),y=I,E=0;E<T.length;E+=8){var A=Math.min(8,T.length-E),g=parseInt(T.substring(E,E+A),m);8>A?(A=f(Math.pow(m,A)),y=y.j(A).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var I=h(0),R=h(1),P=h(16777216);r=a.prototype,r.m=function(){if(D(this))return-N(this).m();for(var T=0,m=1,_=0;_<this.g.length;_++){var y=this.i(_);T+=(0<=y?y:4294967296+y)*m,m*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(D(this))return"-"+N(this).toString(T);for(var m=f(Math.pow(T,6)),_=this,y="";;){var E=et(_,m).g;_=$(_,E.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=E,b(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(var m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function D(T){return T.h==-1}r.l=function(T){return T=$(this,T),D(T)?-1:b(T)?0:1};function N(T){for(var m=T.g.length,_=[],y=0;y<m;y++)_[y]=~T.g[y];return new a(_,~T.h).add(R)}r.abs=function(){return D(this)?N(this):this},r.add=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0,E=0;E<=m;E++){var A=y+(this.i(E)&65535)+(T.i(E)&65535),g=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);y=g>>>16,A&=65535,g&=65535,_[E]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function $(T,m){return T.add(N(m))}r.j=function(T){if(b(this)||b(T))return I;if(D(this))return D(T)?N(this).j(N(T)):N(N(this).j(T));if(D(T))return N(this.j(N(T)));if(0>this.l(P)&&0>T.l(P))return f(this.m()*T.m());for(var m=this.g.length+T.g.length,_=[],y=0;y<2*m;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<T.g.length;E++){var A=this.i(y)>>>16,g=this.i(y)&65535,Nt=T.i(E)>>>16,Le=T.i(E)&65535;_[2*y+2*E]+=g*Le,K(_,2*y+2*E),_[2*y+2*E+1]+=A*Le,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*Nt,K(_,2*y+2*E+1),_[2*y+2*E+2]+=A*Nt,K(_,2*y+2*E+2)}for(y=0;y<m;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=m;y<2*m;y++)_[y]=0;return new a(_,0)};function K(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function Q(T,m){this.g=T,this.h=m}function et(T,m){if(b(m))throw Error("division by zero");if(b(T))return new Q(I,I);if(D(T))return m=et(N(T),m),new Q(N(m.g),N(m.h));if(D(m))return m=et(T,N(m)),new Q(N(m.g),m.h);if(30<T.g.length){if(D(T)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=m;0>=y.l(T);)_=Dt(_),y=Dt(y);var E=at(_,1),A=at(y,1);for(y=at(y,2),_=at(_,2);!b(y);){var g=A.add(y);0>=g.l(T)&&(E=E.add(_),A=g),y=at(y,1),_=at(_,1)}return m=$(T,E.j(m)),new Q(E,m)}for(E=I;0<=T.l(m);){for(_=Math.max(1,Math.floor(T.m()/m.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=f(_),g=A.j(m);D(g)||0<g.l(T);)_-=y,A=f(_),g=A.j(m);b(A)&&(A=R),E=E.add(A),T=$(T,g)}return new Q(E,T)}r.A=function(T){return et(this,T).h},r.and=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)&T.i(y);return new a(_,this.h&T.h)},r.or=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)|T.i(y);return new a(_,this.h|T.h)},r.xor=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)^T.i(y);return new a(_,this.h^T.h)};function Dt(T){for(var m=T.g.length+1,_=[],y=0;y<m;y++)_[y]=T.i(y)<<1|T.i(y-1)>>>31;return new a(_,T.h)}function at(T,m){var _=m>>5;m%=32;for(var y=T.g.length-_,E=[],A=0;A<y;A++)E[A]=0<m?T.i(A+_)>>>m|T.i(A+_+1)<<32-m:T.i(A+_);return new a(E,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ma=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,oe=a}).apply(typeof mo<"u"?mo:typeof self<"u"?self:typeof window<"u"?window:{});var Bn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pa,Ze,ga,zn,ci,_a,ya,Ea;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,u){return s==Array.prototype||s==Object.prototype||(s[c]=u.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bn=="object"&&Bn];for(var c=0;c<s.length;++c){var u=s[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var n=e(this);function i(s,c){if(c)t:{var u=n;s=s.split(".");for(var d=0;d<s.length-1;d++){var v=s[d];if(!(v in u))break t;u=u[v]}s=s[s.length-1],d=u[s],c=c(d),c!=d&&c!=null&&t(u,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var u=0,d=!1,v={next:function(){if(!d&&u<s.length){var w=u++;return{value:c(w,s[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function h(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function f(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function p(s,c,u){return s.call.apply(s.bind,arguments)}function I(s,c,u){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,d),s.apply(c,v)}}return function(){return s.apply(c,arguments)}}function R(s,c,u){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:I,R.apply(null,arguments)}function P(s,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function b(s,c){function u(){}u.prototype=c.prototype,s.aa=c.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(d,v,w){for(var V=Array(arguments.length-2),W=2;W<arguments.length;W++)V[W-2]=arguments[W];return c.prototype[v].apply(d,V)}}function D(s){const c=s.length;if(0<c){const u=Array(c);for(let d=0;d<c;d++)u[d]=s[d];return u}return[]}function N(s,c){for(let u=1;u<arguments.length;u++){const d=arguments[u];if(h(d)){const v=s.length||0,w=d.length||0;s.length=v+w;for(let V=0;V<w;V++)s[v+V]=d[V]}else s.push(d)}}class ${constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(s){return/^[\s\xa0]*$/.test(s)}function Q(){var s=l.navigator;return s&&(s=s.userAgent)?s:""}function et(s){return et[" "](s),s}et[" "]=function(){};var Dt=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function at(s,c,u){for(const d in s)c.call(u,s[d],d,s)}function T(s,c){for(const u in s)c.call(void 0,s[u],u,s)}function m(s){const c={};for(const u in s)c[u]=s[u];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,c){let u,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(u in d)s[u]=d[u];for(let w=0;w<_.length;w++)u=_[w],Object.prototype.hasOwnProperty.call(d,u)&&(s[u]=d[u])}}function E(s){var c=1;s=s.split(":");const u=[];for(;0<c&&s.length;)u.push(s.shift()),c--;return s.length&&u.push(s.join(":")),u}function A(s){l.setTimeout(()=>{throw s},0)}function g(){var s=wr;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class Nt{constructor(){this.h=this.g=null}add(c,u){const d=Le.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var Le=new $(()=>new xc,s=>s.reset());class xc{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Me,Fe=!1,wr=new Nt,rs=()=>{const s=l.Promise.resolve(void 0);Me=()=>{s.then(Oc)}};var Oc=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(u){A(u)}var c=Le;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}Fe=!1};function Bt(){this.s=this.s,this.C=this.C}Bt.prototype.s=!1,Bt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Bt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var Lc=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};l.addEventListener("test",u,c),l.removeEventListener("test",u,c)}catch{}return s}();function Be(s,c){if(dt.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(Dt){t:{try{et(c.nodeName);var v=!0;break t}catch{}v=!1}v||(c=null)}}else u=="mouseover"?c=s.fromElement:u=="mouseout"&&(c=s.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Mc[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Be.aa.h.call(this)}}b(Be,dt);var Mc={2:"touch",3:"pen",4:"mouse"};Be.prototype.h=function(){Be.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Tn="closure_listenable_"+(1e6*Math.random()|0),Fc=0;function Bc(s,c,u,d,v){this.listener=s,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=v,this.key=++Fc,this.da=this.fa=!1}function vn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function In(s){this.src=s,this.g={},this.h=0}In.prototype.add=function(s,c,u,d,v){var w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);var V=Sr(s,c,d,v);return-1<V?(c=s[V],u||(c.fa=!1)):(c=new Bc(c,this.src,w,!!d,v),c.fa=u,s.push(c)),c};function Rr(s,c){var u=c.type;if(u in s.g){var d=s.g[u],v=Array.prototype.indexOf.call(d,c,void 0),w;(w=0<=v)&&Array.prototype.splice.call(d,v,1),w&&(vn(c),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Sr(s,c,u,d){for(var v=0;v<s.length;++v){var w=s[v];if(!w.da&&w.listener==c&&w.capture==!!u&&w.ha==d)return v}return-1}var Cr="closure_lm_"+(1e6*Math.random()|0),Pr={};function is(s,c,u,d,v){if(Array.isArray(c)){for(var w=0;w<c.length;w++)is(s,c[w],u,d,v);return null}return u=as(u),s&&s[Tn]?s.K(c,u,f(d)?!!d.capture:!!d,v):Uc(s,c,u,!1,d,v)}function Uc(s,c,u,d,v,w){if(!c)throw Error("Invalid event type");var V=f(v)?!!v.capture:!!v,W=Vr(s);if(W||(s[Cr]=W=new In(s)),u=W.add(c,u,d,V,w),u.proxy)return u;if(d=qc(),u.proxy=d,d.src=s,d.listener=u,s.addEventListener)Lc||(v=V),v===void 0&&(v=!1),s.addEventListener(c.toString(),d,v);else if(s.attachEvent)s.attachEvent(os(c.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function qc(){function s(u){return c.call(s.src,s.listener,u)}const c=Gc;return s}function ss(s,c,u,d,v){if(Array.isArray(c))for(var w=0;w<c.length;w++)ss(s,c[w],u,d,v);else d=f(d)?!!d.capture:!!d,u=as(u),s&&s[Tn]?(s=s.i,c=String(c).toString(),c in s.g&&(w=s.g[c],u=Sr(w,u,d,v),-1<u&&(vn(w[u]),Array.prototype.splice.call(w,u,1),w.length==0&&(delete s.g[c],s.h--)))):s&&(s=Vr(s))&&(c=s.g[c.toString()],s=-1,c&&(s=Sr(c,u,d,v)),(u=-1<s?c[s]:null)&&br(u))}function br(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[Tn])Rr(c.i,s);else{var u=s.type,d=s.proxy;c.removeEventListener?c.removeEventListener(u,d,s.capture):c.detachEvent?c.detachEvent(os(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=Vr(c))?(Rr(u,s),u.h==0&&(u.src=null,c[Cr]=null)):vn(s)}}}function os(s){return s in Pr?Pr[s]:Pr[s]="on"+s}function Gc(s,c){if(s.da)s=!0;else{c=new Be(c,this);var u=s.listener,d=s.ha||s.src;s.fa&&br(s),s=u.call(d,c)}return s}function Vr(s){return s=s[Cr],s instanceof In?s:null}var Dr="__closure_events_fn_"+(1e9*Math.random()>>>0);function as(s){return typeof s=="function"?s:(s[Dr]||(s[Dr]=function(c){return s.handleEvent(c)}),s[Dr])}function ft(){Bt.call(this),this.i=new In(this),this.M=this,this.F=null}b(ft,Bt),ft.prototype[Tn]=!0,ft.prototype.removeEventListener=function(s,c,u,d){ss(this,s,c,u,d)};function Et(s,c){var u,d=s.F;if(d)for(u=[];d;d=d.F)u.push(d);if(s=s.M,d=c.type||c,typeof c=="string")c=new dt(c,s);else if(c instanceof dt)c.target=c.target||s;else{var v=c;c=new dt(d,s),y(c,v)}if(v=!0,u)for(var w=u.length-1;0<=w;w--){var V=c.g=u[w];v=An(V,d,!0,c)&&v}if(V=c.g=s,v=An(V,d,!0,c)&&v,v=An(V,d,!1,c)&&v,u)for(w=0;w<u.length;w++)V=c.g=u[w],v=An(V,d,!1,c)&&v}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var u=s.g[c],d=0;d<u.length;d++)vn(u[d]);delete s.g[c],s.h--}}this.F=null},ft.prototype.K=function(s,c,u,d){return this.i.add(String(s),c,!1,u,d)},ft.prototype.L=function(s,c,u,d){return this.i.add(String(s),c,!0,u,d)};function An(s,c,u,d){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var v=!0,w=0;w<c.length;++w){var V=c[w];if(V&&!V.da&&V.capture==u){var W=V.listener,ct=V.ha||V.src;V.fa&&Rr(s.i,V),v=W.call(ct,d)!==!1&&v}}return v&&!d.defaultPrevented}function cs(s,c,u){if(typeof s=="function")u&&(s=R(s,u));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(s,c||0)}function us(s){s.g=cs(()=>{s.g=null,s.i&&(s.i=!1,us(s))},s.l);const c=s.h;s.h=null,s.m.apply(null,c)}class jc extends Bt{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:us(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ue(s){Bt.call(this),this.h=s,this.g={}}b(Ue,Bt);var ls=[];function hs(s){at(s.g,function(c,u){this.g.hasOwnProperty(u)&&br(c)},s),s.g={}}Ue.prototype.N=function(){Ue.aa.N.call(this),hs(this)},Ue.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Nr=l.JSON.stringify,$c=l.JSON.parse,zc=class{stringify(s){return l.JSON.stringify(s,void 0)}parse(s){return l.JSON.parse(s,void 0)}};function kr(){}kr.prototype.h=null;function ds(s){return s.h||(s.h=s.i())}function fs(){}var qe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function xr(){dt.call(this,"d")}b(xr,dt);function Or(){dt.call(this,"c")}b(Or,dt);var te={},ms=null;function wn(){return ms=ms||new ft}te.La="serverreachability";function ps(s){dt.call(this,te.La,s)}b(ps,dt);function Ge(s){const c=wn();Et(c,new ps(c))}te.STAT_EVENT="statevent";function gs(s,c){dt.call(this,te.STAT_EVENT,s),this.stat=c}b(gs,dt);function Tt(s){const c=wn();Et(c,new gs(c,s))}te.Ma="timingevent";function _s(s,c){dt.call(this,te.Ma,s),this.size=c}b(_s,dt);function je(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){s()},c)}function $e(){this.g=!0}$e.prototype.xa=function(){this.g=!1};function Kc(s,c,u,d,v,w){s.info(function(){if(s.g)if(w)for(var V="",W=w.split("&"),ct=0;ct<W.length;ct++){var z=W[ct].split("=");if(1<z.length){var mt=z[0];z=z[1];var pt=mt.split("_");V=2<=pt.length&&pt[1]=="type"?V+(mt+"="+z+"&"):V+(mt+"=redacted&")}}else V=null;else V=w;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+c+`
`+u+`
`+V})}function Hc(s,c,u,d,v,w,V){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+c+`
`+u+`
`+w+" "+V})}function de(s,c,u,d){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+Wc(s,u)+(d?" "+d:"")})}function Qc(s,c){s.info(function(){return"TIMEOUT: "+c})}$e.prototype.info=function(){};function Wc(s,c){if(!s.g)return c;if(!c)return null;try{var u=JSON.parse(c);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var d=u[s];if(!(2>d.length)){var v=d[1];if(Array.isArray(v)&&!(1>v.length)){var w=v[0];if(w!="noop"&&w!="stop"&&w!="close")for(var V=1;V<v.length;V++)v[V]=""}}}}return Nr(u)}catch{return c}}var Rn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ys={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Lr;function Sn(){}b(Sn,kr),Sn.prototype.g=function(){return new XMLHttpRequest},Sn.prototype.i=function(){return{}},Lr=new Sn;function Ut(s,c,u,d){this.j=s,this.i=c,this.l=u,this.R=d||1,this.U=new Ue(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Es}function Es(){this.i=null,this.g="",this.h=!1}var Ts={},Mr={};function Fr(s,c,u){s.L=1,s.v=Vn(kt(c)),s.m=u,s.P=!0,vs(s,null)}function vs(s,c){s.F=Date.now(),Cn(s),s.A=kt(s.v);var u=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Os(u.i,"t",d),s.C=0,u=s.j.J,s.h=new Es,s.g=Zs(s.j,u?c:null,!s.m),0<s.O&&(s.M=new jc(R(s.Y,s,s.g),s.O)),c=s.U,u=s.g,d=s.ca;var v="readystatechange";Array.isArray(v)||(v&&(ls[0]=v.toString()),v=ls);for(var w=0;w<v.length;w++){var V=is(u,v[w],d||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),Ge(),Kc(s.i,s.u,s.A,s.l,s.R,s.m)}Ut.prototype.ca=function(s){s=s.target;const c=this.M;c&&xt(s)==3?c.j():this.Y(s)},Ut.prototype.Y=function(s){try{if(s==this.g)t:{const pt=xt(this.g);var c=this.g.Ba();const pe=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Gs(this.g)))){this.J||pt!=4||c==7||(c==8||0>=pe?Ge(3):Ge(2)),Br(this);var u=this.g.Z();this.X=u;e:if(Is(this)){var d=Gs(this.g);s="";var v=d.length,w=xt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ee(this),ze(this);var V="";break e}this.h.i=new l.TextDecoder}for(c=0;c<v;c++)this.h.h=!0,s+=this.h.i.decode(d[c],{stream:!(w&&c==v-1)});d.length=0,this.h.g+=s,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=u==200,Hc(this.i,this.u,this.A,this.l,this.R,pt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ct=this.g;if((W=ct.g?ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var z=W;break e}}z=null}if(u=z)de(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ur(this,u);else{this.o=!1,this.s=3,Tt(12),ee(this),ze(this);break t}}if(this.P){u=!0;let Rt;for(;!this.J&&this.C<V.length;)if(Rt=Xc(this,V),Rt==Mr){pt==4&&(this.s=4,Tt(14),u=!1),de(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==Ts){this.s=4,Tt(15),de(this.i,this.l,V,"[Invalid Chunk]"),u=!1;break}else de(this.i,this.l,Rt,null),Ur(this,Rt);if(Is(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||V.length!=0||this.h.h||(this.s=1,Tt(16),u=!1),this.o=this.o&&u,!u)de(this.i,this.l,V,"[Invalid Chunked Response]"),ee(this),ze(this);else if(0<V.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Kr(mt),mt.M=!0,Tt(11))}}else de(this.i,this.l,V,null),Ur(this,V);pt==4&&ee(this),this.o&&!this.J&&(pt==4?Ws(this.j,this):(this.o=!1,Cn(this)))}else fu(this.g),u==400&&0<V.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),ee(this),ze(this)}}}catch{}finally{}};function Is(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Xc(s,c){var u=s.C,d=c.indexOf(`
`,u);return d==-1?Mr:(u=Number(c.substring(u,d)),isNaN(u)?Ts:(d+=1,d+u>c.length?Mr:(c=c.slice(d,d+u),s.C=d+u,c)))}Ut.prototype.cancel=function(){this.J=!0,ee(this)};function Cn(s){s.S=Date.now()+s.I,As(s,s.I)}function As(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=je(R(s.ba,s),c)}function Br(s){s.B&&(l.clearTimeout(s.B),s.B=null)}Ut.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Qc(this.i,this.A),this.L!=2&&(Ge(),Tt(17)),ee(this),this.s=2,ze(this)):As(this,this.S-s)};function ze(s){s.j.G==0||s.J||Ws(s.j,s)}function ee(s){Br(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,hs(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Ur(s,c){try{var u=s.j;if(u.G!=0&&(u.g==s||qr(u.h,s))){if(!s.K&&qr(u.h,s)&&u.G==3){try{var d=u.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)Ln(u),xn(u);else break t;zr(u),Tt(18)}}else u.za=v[1],0<u.za-u.T&&37500>v[2]&&u.F&&u.v==0&&!u.C&&(u.C=je(R(u.Za,u),6e3));if(1>=Ss(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else re(u,11)}else if((s.K||u.g==s)&&Ln(u),!K(c))for(v=u.Da.g.parse(c),c=0;c<v.length;c++){let z=v[c];if(u.T=z[0],z=z[1],u.G==2)if(z[0]=="c"){u.K=z[1],u.ia=z[2];const mt=z[3];mt!=null&&(u.la=mt,u.j.info("VER="+u.la));const pt=z[4];pt!=null&&(u.Aa=pt,u.j.info("SVER="+u.Aa));const pe=z[5];pe!=null&&typeof pe=="number"&&0<pe&&(d=1.5*pe,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Rt=s.g;if(Rt){const Fn=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fn){var w=d.h;w.g||Fn.indexOf("spdy")==-1&&Fn.indexOf("quic")==-1&&Fn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Gr(w,w.h),w.h=null))}if(d.D){const Hr=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Hr&&(d.ya=Hr,X(d.I,d.D,Hr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var V=s;if(d.qa=Js(d,d.J?d.ia:null,d.W),V.K){Cs(d.h,V);var W=V,ct=d.L;ct&&(W.I=ct),W.B&&(Br(W),Cn(W)),d.g=V}else Hs(d);0<u.i.length&&On(u)}else z[0]!="stop"&&z[0]!="close"||re(u,7);else u.G==3&&(z[0]=="stop"||z[0]=="close"?z[0]=="stop"?re(u,7):$r(u):z[0]!="noop"&&u.l&&u.l.ta(z),u.v=0)}}Ge(4)}catch{}}var Yc=class{constructor(s,c){this.g=s,this.map=c}};function ws(s){this.l=s||10,l.PerformanceNavigationTiming?(s=l.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Rs(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Ss(s){return s.h?1:s.g?s.g.size:0}function qr(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function Gr(s,c){s.g?s.g.add(c):s.h=c}function Cs(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}ws.prototype.cancel=function(){if(this.i=Ps(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ps(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(const u of s.g.values())c=c.concat(u.D);return c}return D(s.i)}function Jc(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var c=[],u=s.length,d=0;d<u;d++)c.push(s[d]);return c}c=[],u=0;for(d in s)c[u++]=s[d];return c}function Zc(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var c=[];s=s.length;for(var u=0;u<s;u++)c.push(u);return c}c=[],u=0;for(const d in s)c[u++]=d;return c}}}function bs(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var u=Zc(s),d=Jc(s),v=d.length,w=0;w<v;w++)c.call(void 0,d[w],u&&u[w],s)}var Vs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tu(s,c){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var d=s[u].indexOf("="),v=null;if(0<=d){var w=s[u].substring(0,d);v=s[u].substring(d+1)}else w=s[u];c(w,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function ne(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof ne){this.h=s.h,Pn(this,s.j),this.o=s.o,this.g=s.g,bn(this,s.s),this.l=s.l;var c=s.i,u=new Qe;u.i=c.i,c.g&&(u.g=new Map(c.g),u.h=c.h),Ds(this,u),this.m=s.m}else s&&(c=String(s).match(Vs))?(this.h=!1,Pn(this,c[1]||"",!0),this.o=Ke(c[2]||""),this.g=Ke(c[3]||"",!0),bn(this,c[4]),this.l=Ke(c[5]||"",!0),Ds(this,c[6]||"",!0),this.m=Ke(c[7]||"")):(this.h=!1,this.i=new Qe(null,this.h))}ne.prototype.toString=function(){var s=[],c=this.j;c&&s.push(He(c,Ns,!0),":");var u=this.g;return(u||c=="file")&&(s.push("//"),(c=this.o)&&s.push(He(c,Ns,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(He(u,u.charAt(0)=="/"?ru:nu,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",He(u,su)),s.join("")};function kt(s){return new ne(s)}function Pn(s,c,u){s.j=u?Ke(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function bn(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function Ds(s,c,u){c instanceof Qe?(s.i=c,ou(s.i,s.h)):(u||(c=He(c,iu)),s.i=new Qe(c,s.h))}function X(s,c,u){s.i.set(c,u)}function Vn(s){return X(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Ke(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function He(s,c,u){return typeof s=="string"?(s=encodeURI(s).replace(c,eu),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function eu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Ns=/[#\/\?@]/g,nu=/[#\?:]/g,ru=/[#\?]/g,iu=/[#\?@]/g,su=/#/g;function Qe(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function qt(s){s.g||(s.g=new Map,s.h=0,s.i&&tu(s.i,function(c,u){s.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}r=Qe.prototype,r.add=function(s,c){qt(this),this.i=null,s=fe(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(c),this.h+=1,this};function ks(s,c){qt(s),c=fe(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function xs(s,c){return qt(s),c=fe(s,c),s.g.has(c)}r.forEach=function(s,c){qt(this),this.g.forEach(function(u,d){u.forEach(function(v){s.call(c,v,d,this)},this)},this)},r.na=function(){qt(this);const s=Array.from(this.g.values()),c=Array.from(this.g.keys()),u=[];for(let d=0;d<c.length;d++){const v=s[d];for(let w=0;w<v.length;w++)u.push(c[d])}return u},r.V=function(s){qt(this);let c=[];if(typeof s=="string")xs(this,s)&&(c=c.concat(this.g.get(fe(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)c=c.concat(s[u])}return c},r.set=function(s,c){return qt(this),this.i=null,s=fe(this,s),xs(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},r.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function Os(s,c,u){ks(s,c),0<u.length&&(s.i=null,s.g.set(fe(s,c),D(u)),s.h+=u.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],c=Array.from(this.g.keys());for(var u=0;u<c.length;u++){var d=c[u];const w=encodeURIComponent(String(d)),V=this.V(d);for(d=0;d<V.length;d++){var v=w;V[d]!==""&&(v+="="+encodeURIComponent(String(V[d]))),s.push(v)}}return this.i=s.join("&")};function fe(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function ou(s,c){c&&!s.j&&(qt(s),s.i=null,s.g.forEach(function(u,d){var v=d.toLowerCase();d!=v&&(ks(this,d),Os(this,v,u))},s)),s.j=c}function au(s,c){const u=new $e;if(l.Image){const d=new Image;d.onload=P(Gt,u,"TestLoadImage: loaded",!0,c,d),d.onerror=P(Gt,u,"TestLoadImage: error",!1,c,d),d.onabort=P(Gt,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=P(Gt,u,"TestLoadImage: timeout",!1,c,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else c(!1)}function cu(s,c){const u=new $e,d=new AbortController,v=setTimeout(()=>{d.abort(),Gt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:d.signal}).then(w=>{clearTimeout(v),w.ok?Gt(u,"TestPingServer: ok",!0,c):Gt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),Gt(u,"TestPingServer: error",!1,c)})}function Gt(s,c,u,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(u)}catch{}}function uu(){this.g=new zc}function lu(s,c,u){const d=u||"";try{bs(s,function(v,w){let V=v;f(v)&&(V=Nr(v)),c.push(d+w+"="+encodeURIComponent(V))})}catch(v){throw c.push(d+"type="+encodeURIComponent("_badmap")),v}}function Dn(s){this.l=s.Ub||null,this.j=s.eb||!1}b(Dn,kr),Dn.prototype.g=function(){return new Nn(this.l,this.j)},Dn.prototype.i=function(s){return function(){return s}}({});function Nn(s,c){ft.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Nn,ft),r=Nn.prototype,r.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,Xe(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,We(this)),this.readyState=0},r.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Xe(this)),this.g&&(this.readyState=3,Xe(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ls(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ls(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}r.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?We(this):Xe(this),this.readyState==3&&Ls(this)}},r.Ra=function(s){this.g&&(this.response=this.responseText=s,We(this))},r.Qa=function(s){this.g&&(this.response=s,We(this))},r.ga=function(){this.g&&We(this)};function We(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Xe(s)}r.setRequestHeader=function(s,c){this.u.append(s,c)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=c.next();return s.join(`\r
`)};function Xe(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Nn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Ms(s){let c="";return at(s,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function jr(s,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=Ms(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):X(s,c,u))}function Z(s){ft.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(Z,ft);var hu=/^https?$/i,du=["POST","PUT"];r=Z.prototype,r.Ha=function(s){this.J=s},r.ea=function(s,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Lr.g(),this.v=this.o?ds(this.o):ds(Lr),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(w){Fs(this,w);return}if(s=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)u.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())u.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(w=>w.toLowerCase()=="content-type"),v=l.FormData&&s instanceof l.FormData,!(0<=Array.prototype.indexOf.call(du,c,void 0))||d||v||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,V]of u)this.g.setRequestHeader(w,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{qs(this),this.u=!0,this.g.send(s),this.u=!1}catch(w){Fs(this,w)}};function Fs(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Bs(s),kn(s)}function Bs(s){s.A||(s.A=!0,Et(s,"complete"),Et(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Et(this,"complete"),Et(this,"abort"),kn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),kn(this,!0)),Z.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Us(this):this.bb())},r.bb=function(){Us(this)};function Us(s){if(s.h&&typeof a<"u"&&(!s.v[1]||xt(s)!=4||s.Z()!=2)){if(s.u&&xt(s)==4)cs(s.Ea,0,s);else if(Et(s,"readystatechange"),xt(s)==4){s.h=!1;try{const V=s.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=V===0){var v=String(s.D).match(Vs)[1]||null;!v&&l.self&&l.self.location&&(v=l.self.location.protocol.slice(0,-1)),d=!hu.test(v?v.toLowerCase():"")}u=d}if(u)Et(s,"complete"),Et(s,"success");else{s.m=6;try{var w=2<xt(s)?s.g.statusText:""}catch{w=""}s.l=w+" ["+s.Z()+"]",Bs(s)}}finally{kn(s)}}}}function kn(s,c){if(s.g){qs(s);const u=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||Et(s,"ready");try{u.onreadystatechange=d}catch{}}}function qs(s){s.I&&(l.clearTimeout(s.I),s.I=null)}r.isActive=function(){return!!this.g};function xt(s){return s.g?s.g.readyState:0}r.Z=function(){try{return 2<xt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),$c(c)}};function Gs(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function fu(s){const c={};s=(s.g&&2<=xt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(K(s[d]))continue;var u=E(s[d]);const v=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const w=c[v]||[];c[v]=w,w.push(u)}T(c,function(d){return d.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ye(s,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||c}function js(s){this.Aa=0,this.i=[],this.j=new $e,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ye("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ye("baseRetryDelayMs",5e3,s),this.cb=Ye("retryDelaySeedMs",1e4,s),this.Wa=Ye("forwardChannelMaxRetries",2,s),this.wa=Ye("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new ws(s&&s.concurrentRequestLimit),this.Da=new uu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=js.prototype,r.la=8,r.G=1,r.connect=function(s,c,u,d){Tt(0),this.W=s,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=Js(this,null,this.W),On(this)};function $r(s){if($s(s),s.G==3){var c=s.U++,u=kt(s.I);if(X(u,"SID",s.K),X(u,"RID",c),X(u,"TYPE","terminate"),Je(s,u),c=new Ut(s,s.j,c),c.L=2,c.v=Vn(kt(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=c.v,u=!0),u||(c.g=Zs(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Cn(c)}Ys(s)}function xn(s){s.g&&(Kr(s),s.g.cancel(),s.g=null)}function $s(s){xn(s),s.u&&(l.clearTimeout(s.u),s.u=null),Ln(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&l.clearTimeout(s.s),s.s=null)}function On(s){if(!Rs(s.h)&&!s.s){s.s=!0;var c=s.Ga;Me||rs(),Fe||(Me(),Fe=!0),wr.add(c,s),s.B=0}}function mu(s,c){return Ss(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=je(R(s.Ga,s,c),Xs(s,s.B)),s.B++,!0)}r.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const v=new Ut(this,this.j,s);let w=this.o;if(this.S&&(w?(w=m(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(v.H=w,w=null),this.P)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=Ks(this,v,c),u=kt(this.I),X(u,"RID",s),X(u,"CVER",22),this.D&&X(u,"X-HTTP-Session-Id",this.D),Je(this,u),w&&(this.O?c="headers="+encodeURIComponent(String(Ms(w)))+"&"+c:this.m&&jr(u,this.m,w)),Gr(this.h,v),this.Ua&&X(u,"TYPE","init"),this.P?(X(u,"$req",c),X(u,"SID","null"),v.T=!0,Fr(v,u,null)):Fr(v,u,c),this.G=2}}else this.G==3&&(s?zs(this,s):this.i.length==0||Rs(this.h)||zs(this))};function zs(s,c){var u;c?u=c.l:u=s.U++;const d=kt(s.I);X(d,"SID",s.K),X(d,"RID",u),X(d,"AID",s.T),Je(s,d),s.m&&s.o&&jr(d,s.m,s.o),u=new Ut(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),c&&(s.i=c.D.concat(s.i)),c=Ks(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Gr(s.h,u),Fr(u,d,c)}function Je(s,c){s.H&&at(s.H,function(u,d){X(c,d,u)}),s.l&&bs({},function(u,d){X(c,d,u)})}function Ks(s,c,u){u=Math.min(s.i.length,u);var d=s.l?R(s.l.Na,s.l,s):null;t:{var v=s.i;let w=-1;for(;;){const V=["count="+u];w==-1?0<u?(w=v[0].g,V.push("ofs="+w)):w=0:V.push("ofs="+w);let W=!0;for(let ct=0;ct<u;ct++){let z=v[ct].g;const mt=v[ct].map;if(z-=w,0>z)w=Math.max(0,v[ct].g-100),W=!1;else try{lu(mt,V,"req"+z+"_")}catch{d&&d(mt)}}if(W){d=V.join("&");break t}}}return s=s.i.splice(0,u),c.D=s,d}function Hs(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;Me||rs(),Fe||(Me(),Fe=!0),wr.add(c,s),s.v=0}}function zr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=je(R(s.Fa,s),Xs(s,s.v)),s.v++,!0)}r.Fa=function(){if(this.u=null,Qs(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=je(R(this.ab,this),s)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),xn(this),Qs(this))};function Kr(s){s.A!=null&&(l.clearTimeout(s.A),s.A=null)}function Qs(s){s.g=new Ut(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=kt(s.qa);X(c,"RID","rpc"),X(c,"SID",s.K),X(c,"AID",s.T),X(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&X(c,"TO",s.ja),X(c,"TYPE","xmlhttp"),Je(s,c),s.m&&s.o&&jr(c,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=Vn(kt(c)),u.m=null,u.P=!0,vs(u,s)}r.Za=function(){this.C!=null&&(this.C=null,xn(this),zr(this),Tt(19))};function Ln(s){s.C!=null&&(l.clearTimeout(s.C),s.C=null)}function Ws(s,c){var u=null;if(s.g==c){Ln(s),Kr(s),s.g=null;var d=2}else if(qr(s.h,c))u=c.D,Cs(s.h,c),d=1;else return;if(s.G!=0){if(c.o)if(d==1){u=c.m?c.m.length:0,c=Date.now()-c.F;var v=s.B;d=wn(),Et(d,new _s(d,u)),On(s)}else Hs(s);else if(v=c.s,v==3||v==0&&0<c.X||!(d==1&&mu(s,c)||d==2&&zr(s)))switch(u&&0<u.length&&(c=s.h,c.i=c.i.concat(u)),v){case 1:re(s,5);break;case 4:re(s,10);break;case 3:re(s,6);break;default:re(s,2)}}}function Xs(s,c){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*c}function re(s,c){if(s.j.info("Error code "+c),c==2){var u=R(s.fb,s),d=s.Xa;const v=!d;d=new ne(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Pn(d,"https"),Vn(d),v?au(d.toString(),u):cu(d.toString(),u)}else Tt(2);s.G=0,s.l&&s.l.sa(c),Ys(s),$s(s)}r.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function Ys(s){if(s.G=0,s.ka=[],s.l){const c=Ps(s.h);(c.length!=0||s.i.length!=0)&&(N(s.ka,c),N(s.ka,s.i),s.h.i.length=0,D(s.i),s.i.length=0),s.l.ra()}}function Js(s,c,u){var d=u instanceof ne?kt(u):new ne(u);if(d.g!="")c&&(d.g=c+"."+d.g),bn(d,d.s);else{var v=l.location;d=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;var w=new ne(null);d&&Pn(w,d),c&&(w.g=c),v&&bn(w,v),u&&(w.l=u),d=w}return u=s.D,c=s.ya,u&&c&&X(d,u,c),X(d,"VER",s.la),Je(s,d),d}function Zs(s,c,u){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new Z(new Dn({eb:u})):new Z(s.pa),c.Ha(s.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function to(){}r=to.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Mn(){}Mn.prototype.g=function(s,c){return new It(s,c)};function It(s,c){ft.call(this),this.g=new js(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!K(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new me(this)}b(It,ft),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){$r(this.g)},It.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Nr(s),s=u);c.i.push(new Yc(c.Ya++,s)),c.G==3&&On(c)},It.prototype.N=function(){this.g.l=null,delete this.j,$r(this.g),delete this.g,It.aa.N.call(this)};function eo(s){xr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){t:{for(const u in c){s=u;break t}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}b(eo,xr);function no(){Or.call(this),this.status=1}b(no,Or);function me(s){this.g=s}b(me,to),me.prototype.ua=function(){Et(this.g,"a")},me.prototype.ta=function(s){Et(this.g,new eo(s))},me.prototype.sa=function(s){Et(this.g,new no)},me.prototype.ra=function(){Et(this.g,"b")},Mn.prototype.createWebChannel=Mn.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,Ea=function(){return new Mn},ya=function(){return wn()},_a=te,ci={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Rn.NO_ERROR=0,Rn.TIMEOUT=8,Rn.HTTP_ERROR=6,zn=Rn,ys.COMPLETE="complete",ga=ys,fs.EventType=qe,qe.OPEN="a",qe.CLOSE="b",qe.ERROR="c",qe.MESSAGE="d",ft.prototype.listen=ft.prototype.K,Ze=fs,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,pa=Z}).apply(typeof Bn<"u"?Bn:typeof self<"u"?self:typeof window<"u"?window:{});const po="@firebase/firestore";/**
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
 */let De="11.0.2";/**
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
 */const ae=new ca("@firebase/firestore");function ge(){return ae.logLevel}function k(r,...t){if(ae.logLevel<=j.DEBUG){const e=t.map(wi);ae.debug(`Firestore (${De}): ${r}`,...e)}}function Mt(r,...t){if(ae.logLevel<=j.ERROR){const e=t.map(wi);ae.error(`Firestore (${De}): ${r}`,...e)}}function Ae(r,...t){if(ae.logLevel<=j.WARN){const e=t.map(wi);ae.warn(`Firestore (${De}): ${r}`,...e)}}function wi(r){if(typeof r=="string")return r;try{/**
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
 */function L(r="Unexpected state"){const t=`FIRESTORE (${De}) INTERNAL ASSERTION FAILED: `+r;throw Mt(t),new Error(t)}function H(r,t){r||L()}function F(r,t){return r}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends Ve{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ta{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class zl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class Kl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Hl{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0);let n=this.i;const i=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kt,t.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},l=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(H(typeof n.accessToken=="string"),new Ta(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string"),new _t(t)}}class Ql{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const t=this.I();return t&&this.T.set("Authorization",t),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Wl{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Ql(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Xl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Yl{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){H(this.o===void 0);const n=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const i=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string"),this.R=e.token,new Xl(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Jl(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class va{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const i=Jl(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%t.length))}return n}}function q(r,t){return r<t?-1:r>t?1:0}function we(r,t,e){return r.length===t.length&&r.every((n,i)=>e(n,t[i]))}/**
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
 */class it{static now(){return it.fromMillis(Date.now())}static fromDate(t){return it.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new it(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?q(this.nanoseconds,t.nanoseconds):q(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class M{static fromTimestamp(t){return new M(t)}static min(){return new M(new it(0,0))}static max(){return new M(new it(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class un{constructor(t,e,n){e===void 0?e=0:e>t.length&&L(),n===void 0?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return un.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof un?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=t.get(i),a=e.get(i);if(o<a)return-1;if(o>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends un{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new x(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(i=>i.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const Zl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends un{construct(t,e,n){return new lt(t,e,n)}static isValidIdentifier(t){return Zl.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new lt(["__name__"])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;i<t.length;){const l=t[i];if(l==="\\"){if(i+1===t.length)throw new x(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(n+=l,i++):(o(),i++)}if(o(),a)throw new x(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(Y.fromString(t))}static fromName(t){return new O(Y.fromString(t).popFirst(5))}static empty(){return new O(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new Y(t.slice()))}}function th(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=M.fromTimestamp(n===1e9?new it(e+1,0):new it(e,n));return new Qt(i,O.empty(),t)}function eh(r){return new Qt(r.readTime,r.key,-1)}class Qt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Qt(M.min(),O.empty(),-1)}static max(){return new Qt(M.max(),O.empty(),-1)}}function nh(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(r.documentKey,t.documentKey),e!==0?e:q(r.largestBatchId,t.largestBatchId))}/**
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
 */const rh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ih{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ne(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==rh)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,n)=>{e(t)})}static reject(t){return new S((e,n)=>{n(t)})}static waitFor(t){return new S((e,n)=>{let i=0,o=0,a=!1;t.forEach(l=>{++i,l.next(()=>{++o,a&&o===i&&e()},h=>n(h))}),a=!0,o===i&&e()})}static or(t){let e=S.resolve(!1);for(const n of t)e=e.next(i=>i?S.resolve(i):n());return e}static forEach(t,e){const n=[];return t.forEach((i,o)=>{n.push(e.call(this,i,o))}),this.waitFor(n)}static mapArray(t,e){return new S((n,i)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(p=>{a[f]=p,++l,l===o&&n(a)},p=>i(p))}})}static doWhile(t,e){return new S((n,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):n()};o()})}}function sh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ke(r){return r.name==="IndexedDbTransactionError"}/**
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
 */class hr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}hr.oe=-1;function dr(r){return r==null}function tr(r){return r===0&&1/r==-1/0}function oh(r){return typeof r=="number"&&Number.isInteger(r)&&!tr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */function ah(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=go(t)),t=ch(r.get(e),t);return go(t)}function ch(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case"":e+="";break;default:e+=o}}return e}function go(r){return r+""}/**
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
 */function _o(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function ce(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Ia(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class J{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Un(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Un(this.root,t,this.comparator,!1)}getReverseIterator(){return new Un(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Un(this.root,t,this.comparator,!0)}}class Un{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??ut.RED,this.left=i??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new ut(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ut.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,i,o){return this}insert(t,e,n){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class st{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new yo(this.data.getIterator())}getIteratorFrom(t){return new yo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof st)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new st(this.comparator);return e.data=t,e}}class yo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class St{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new St([])}unionWith(t){let e=new st(lt.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return we(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Aa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Aa("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return q(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const uh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(r){if(H(!!r),typeof r=="string"){let t=0;const e=uh.exec(r);if(H(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:tt(r.seconds),nanos:tt(r.nanos)}}function tt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
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
 */function Ri(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function fr(r){const t=r.mapValue.fields.__previous_value__;return Ri(t)?fr(t):t}function ln(r){const t=Wt(r.mapValue.fields.__local_write_time__.timestampValue);return new it(t.seconds,t.nanos)}/**
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
 */class lh{constructor(t,e,n,i,o,a,l,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f}}class hn{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new hn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof hn&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const qn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Yt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ri(r)?4:dh(r)?9007199254740991:hh(r)?10:11:L()}function Vt(r,t){if(r===t)return!0;const e=Yt(r);if(e!==Yt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return ln(r).isEqual(ln(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Wt(i.timestampValue),l=Wt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(i,o){return Xt(i.bytesValue).isEqual(Xt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(i,o){return tt(i.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(i.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(r,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return tt(i.integerValue)===tt(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=tt(i.doubleValue),l=tt(o.doubleValue);return a===l?tr(a)===tr(l):isNaN(a)&&isNaN(l)}return!1}(r,t);case 9:return we(r.arrayValue.values||[],t.arrayValue.values||[],Vt);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},l=o.mapValue.fields||{};if(_o(a)!==_o(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Vt(a[h],l[h])))return!1;return!0}(r,t);default:return L()}}function dn(r,t){return(r.values||[]).find(e=>Vt(e,t))!==void 0}function Re(r,t){if(r===t)return 0;const e=Yt(r),n=Yt(t);if(e!==n)return q(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,t.booleanValue);case 2:return function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(r,t);case 3:return Eo(r.timestampValue,t.timestampValue);case 4:return Eo(ln(r),ln(t));case 5:return q(r.stringValue,t.stringValue);case 6:return function(o,a){const l=Xt(o),h=Xt(a);return l.compareTo(h)}(r.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const p=q(l[f],h[f]);if(p!==0)return p}return q(l.length,h.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,a){const l=q(tt(o.latitude),tt(a.latitude));return l!==0?l:q(tt(o.longitude),tt(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return To(r.arrayValue,t.arrayValue);case 10:return function(o,a){var l,h,f,p;const I=o.fields||{},R=a.fields||{},P=(l=I.value)===null||l===void 0?void 0:l.arrayValue,b=(h=R.value)===null||h===void 0?void 0:h.arrayValue,D=q(((f=P?.values)===null||f===void 0?void 0:f.length)||0,((p=b?.values)===null||p===void 0?void 0:p.length)||0);return D!==0?D:To(P,b)}(r.mapValue,t.mapValue);case 11:return function(o,a){if(o===qn.mapValue&&a===qn.mapValue)return 0;if(o===qn.mapValue)return 1;if(a===qn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let I=0;I<h.length&&I<p.length;++I){const R=q(h[I],p[I]);if(R!==0)return R;const P=Re(l[h[I]],f[p[I]]);if(P!==0)return P}return q(h.length,p.length)}(r.mapValue,t.mapValue);default:throw L()}}function Eo(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return q(r,t);const e=Wt(r),n=Wt(t),i=q(e.seconds,n.seconds);return i!==0?i:q(e.nanos,n.nanos)}function To(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=Re(e[i],n[i]);if(o)return o}return q(e.length,n.length)}function Se(r){return ui(r)}function ui(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Wt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return O.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=ui(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const a of n)o?o=!1:i+=",",i+=`${a}:${ui(e.fields[a])}`;return i+"}"}(r.mapValue):L()}function Kn(r){switch(Yt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=fr(r);return t?16+Kn(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,o)=>i+Kn(o),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return ce(n.fields,(o,a)=>{i+=o.length+Kn(a)}),i}(r.mapValue);default:throw L()}}function vo(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function li(r){return!!r&&"integerValue"in r}function Si(r){return!!r&&"arrayValue"in r}function Io(r){return!!r&&"nullValue"in r}function Ao(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Hn(r){return!!r&&"mapValue"in r}function hh(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function nn(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return ce(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=nn(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=nn(r.arrayValue.values[e]);return t}return Object.assign({},r)}function dh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Hn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=nn(e)}setAll(t){let e=lt.emptyPath(),n={},i=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,n,i),n={},i=[],e=l.popLast()}a?n[l.lastSegment()]=nn(a):i.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());Hn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Vt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Hn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){ce(e,(i,o)=>t[i]=o);for(const i of n)delete t[i]}clone(){return new At(nn(this.value))}}function wa(r){const t=[];return ce(r.fields,(e,n)=>{const i=new lt([e]);if(Hn(n)){const o=wa(n.mapValue).fields;if(o.length===0)t.push(i);else for(const a of o)t.push(i.child(a))}else t.push(i)}),new St(t)}/**
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
 */class yt{constructor(t,e,n,i,o,a,l){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new yt(t,0,M.min(),M.min(),M.min(),At.empty(),0)}static newFoundDocument(t,e,n,i){return new yt(t,1,e,M.min(),n,i,0)}static newNoDocument(t,e){return new yt(t,2,e,M.min(),M.min(),At.empty(),0)}static newUnknownDocument(t,e){return new yt(t,3,e,M.min(),M.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(M.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof yt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class er{constructor(t,e){this.position=t,this.inclusive=e}}function wo(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],a=r.position[i];if(o.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),e.key):n=Re(a,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function Ro(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Vt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class fn{constructor(t,e="asc"){this.field=t,this.dir=e}}function fh(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Ra{}class rt extends Ra{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new ph(t,e,n):e==="array-contains"?new yh(t,n):e==="in"?new Eh(t,n):e==="not-in"?new Th(t,n):e==="array-contains-any"?new vh(t,n):new rt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new gh(t,n):new _h(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Re(e,this.value)):e!==null&&Yt(this.value)===Yt(e)&&this.matchesComparison(Re(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends Ra{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Ct(t,e)}matches(t){return Sa(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Sa(r){return r.op==="and"}function Ca(r){return mh(r)&&Sa(r)}function mh(r){for(const t of r.filters)if(t instanceof Ct)return!1;return!0}function hi(r){if(r instanceof rt)return r.field.canonicalString()+r.op.toString()+Se(r.value);if(Ca(r))return r.filters.map(t=>hi(t)).join(",");{const t=r.filters.map(e=>hi(e)).join(",");return`${r.op}(${t})`}}function Pa(r,t){return r instanceof rt?function(n,i){return i instanceof rt&&n.op===i.op&&n.field.isEqual(i.field)&&Vt(n.value,i.value)}(r,t):r instanceof Ct?function(n,i){return i instanceof Ct&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((o,a,l)=>o&&Pa(a,i.filters[l]),!0):!1}(r,t):void L()}function ba(r){return r instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${Se(e.value)}`}(r):r instanceof Ct?function(e){return e.op.toString()+" {"+e.getFilters().map(ba).join(" ,")+"}"}(r):"Filter"}class ph extends rt{constructor(t,e,n){super(t,e,n),this.key=O.fromName(n.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class gh extends rt{constructor(t,e){super(t,"in",e),this.keys=Va("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class _h extends rt{constructor(t,e){super(t,"not-in",e),this.keys=Va("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Va(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>O.fromName(n.referenceValue))}class yh extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Si(e)&&dn(e.arrayValue,this.value)}}class Eh extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&dn(this.value.arrayValue,e)}}class Th extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(dn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!dn(this.value.arrayValue,e)}}class vh extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Si(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>dn(this.value.arrayValue,n))}}/**
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
 */class Ih{constructor(t,e=null,n=[],i=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=a,this.endAt=l,this.ue=null}}function So(r,t=null,e=[],n=[],i=null,o=null,a=null){return new Ih(r,t,e,n,i,o,a)}function Ci(r){const t=F(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>hi(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),dr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Se(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Se(n)).join(",")),t.ue=e}return t.ue}function Pi(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!fh(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Pa(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Ro(r.startAt,t.startAt)&&Ro(r.endAt,t.endAt)}function di(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
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
 */class xe{constructor(t,e=null,n=[],i=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ah(r,t,e,n,i,o,a,l){return new xe(r,t,e,n,i,o,a,l)}function Da(r){return new xe(r)}function Co(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Na(r){return r.collectionGroup!==null}function rn(r){const t=F(r);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new st(lt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new fn(o,n))}),e.has(lt.keyField().canonicalString())||t.ce.push(new fn(lt.keyField(),n))}return t.ce}function Pt(r){const t=F(r);return t.le||(t.le=wh(t,rn(r))),t.le}function wh(r,t){if(r.limitType==="F")return So(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new fn(i.field,o)});const e=r.endAt?new er(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new er(r.startAt.position,r.startAt.inclusive):null;return So(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function fi(r,t){const e=r.filters.concat([t]);return new xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function nr(r,t,e){return new xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function mr(r,t){return Pi(Pt(r),Pt(t))&&r.limitType===t.limitType}function ka(r){return`${Ci(Pt(r))}|lt:${r.limitType}`}function _e(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(i=>ba(i)).join(", ")}]`),dr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Se(i)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Se(i)).join(",")),`Target(${n})`}(Pt(r))}; limitType=${r.limitType})`}function pr(r,t){return t.isFoundDocument()&&function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):O.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,i){for(const o of rn(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0}(r,t)&&function(n,i){return!(n.startAt&&!function(a,l,h){const f=wo(a,l,h);return a.inclusive?f<=0:f<0}(n.startAt,rn(n),i)||n.endAt&&!function(a,l,h){const f=wo(a,l,h);return a.inclusive?f>=0:f>0}(n.endAt,rn(n),i))}(r,t)}function Rh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function xa(r){return(t,e)=>{let n=!1;for(const i of rn(r)){const o=Sh(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function Sh(r,t,e){const n=r.field.isKeyField()?O.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Re(h,f):L()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
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
 */class ue{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){ce(this.inner,(e,n)=>{for(const[i,o]of n)t(i,o)})}isEmpty(){return Ia(this.inner)}size(){return this.innerSize}}/**
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
 */const Ch=new J(O.comparator);function Ft(){return Ch}const Oa=new J(O.comparator);function tn(...r){let t=Oa;for(const e of r)t=t.insert(e.key,e);return t}function La(r){let t=Oa;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function se(){return sn()}function Ma(){return sn()}function sn(){return new ue(r=>r.toString(),(r,t)=>r.isEqual(t))}const Ph=new J(O.comparator),bh=new st(O.comparator);function U(...r){let t=bh;for(const e of r)t=t.add(e);return t}const Vh=new st(q);function Dh(){return Vh}/**
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
 */function bi(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:tr(t)?"-0":t}}function Fa(r){return{integerValue:""+r}}function Nh(r,t){return oh(t)?Fa(t):bi(r,t)}/**
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
 */class gr{constructor(){this._=void 0}}function kh(r,t,e){return r instanceof rr?function(i,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Ri(o)&&(o=fr(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(e,t):r instanceof mn?Ua(r,t):r instanceof pn?qa(r,t):function(i,o){const a=Ba(i,o),l=Po(a)+Po(i.Pe);return li(a)&&li(i.Pe)?Fa(l):bi(i.serializer,l)}(r,t)}function xh(r,t,e){return r instanceof mn?Ua(r,t):r instanceof pn?qa(r,t):e}function Ba(r,t){return r instanceof ir?function(n){return li(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class rr extends gr{}class mn extends gr{constructor(t){super(),this.elements=t}}function Ua(r,t){const e=Ga(t);for(const n of r.elements)e.some(i=>Vt(i,n))||e.push(n);return{arrayValue:{values:e}}}class pn extends gr{constructor(t){super(),this.elements=t}}function qa(r,t){let e=Ga(t);for(const n of r.elements)e=e.filter(i=>!Vt(i,n));return{arrayValue:{values:e}}}class ir extends gr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function Po(r){return tt(r.integerValue||r.doubleValue)}function Ga(r){return Si(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function Oh(r,t){return r.field.isEqual(t.field)&&function(n,i){return n instanceof mn&&i instanceof mn||n instanceof pn&&i instanceof pn?we(n.elements,i.elements,Vt):n instanceof ir&&i instanceof ir?Vt(n.Pe,i.Pe):n instanceof rr&&i instanceof rr}(r.transform,t.transform)}class Lh{constructor(t,e){this.version=t,this.transformResults=e}}class Ot{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ot}static exists(t){return new Ot(void 0,t)}static updateTime(t){return new Ot(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Qn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class _r{}function ja(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new za(r.key,Ot.none()):new gn(r.key,r.data,Ot.none());{const e=r.data,n=At.empty();let i=new st(lt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?n.delete(o):n.set(o,a),i=i.add(o)}return new le(r.key,n,new St(i.toArray()),Ot.none())}}function Mh(r,t,e){r instanceof gn?function(i,o,a){const l=i.value.clone(),h=Vo(i.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):r instanceof le?function(i,o,a){if(!Qn(i.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Vo(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll($a(i)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(r,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function on(r,t,e,n){return r instanceof gn?function(o,a,l,h){if(!Qn(o.precondition,a))return l;const f=o.value.clone(),p=Do(o.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(r,t,e,n):r instanceof le?function(o,a,l,h){if(!Qn(o.precondition,a))return l;const f=Do(o.fieldTransforms,h,a),p=a.data;return p.setAll($a(o)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(r,t,e,n):function(o,a,l){return Qn(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(r,t,e)}function Fh(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=Ba(n.transform,i||null);o!=null&&(e===null&&(e=At.empty()),e.set(n.field,o))}return e||null}function bo(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&we(n,i,(o,a)=>Oh(o,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class gn extends _r{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class le extends _r{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function $a(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Vo(r,t,e){const n=new Map;H(r.length===e.length);for(let i=0;i<e.length;i++){const o=r[i],a=o.transform,l=t.data.field(o.field);n.set(o.field,xh(a,l,e[i]))}return n}function Do(r,t,e){const n=new Map;for(const i of r){const o=i.transform,a=e.data.field(i.field);n.set(i.field,kh(o,a,t))}return n}class za extends _r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Bh extends _r{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Uh{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Mh(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=on(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=on(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Ma();return this.mutations.forEach(i=>{const o=t.get(i.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(i.key)?null:l;const h=ja(a,l);h!==null&&n.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(M.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),U())}isEqual(t){return this.batchId===t.batchId&&we(this.mutations,t.mutations,(e,n)=>bo(e,n))&&we(this.baseMutations,t.baseMutations,(e,n)=>bo(e,n))}}class Vi{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){H(t.mutations.length===n.length);let i=function(){return Ph}();const o=t.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,n[a].version);return new Vi(t,e,n,i)}}/**
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
 */class qh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Gh{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var nt,G;function jh(r){switch(r){default:return L();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Ka(r){if(r===void 0)return Mt("GRPC error has no .code"),C.UNKNOWN;switch(r){case nt.OK:return C.OK;case nt.CANCELLED:return C.CANCELLED;case nt.UNKNOWN:return C.UNKNOWN;case nt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case nt.INTERNAL:return C.INTERNAL;case nt.UNAVAILABLE:return C.UNAVAILABLE;case nt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case nt.NOT_FOUND:return C.NOT_FOUND;case nt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case nt.ABORTED:return C.ABORTED;case nt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case nt.DATA_LOSS:return C.DATA_LOSS;default:return L()}}(G=nt||(nt={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function $h(){return new TextEncoder}/**
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
 */const zh=new oe([4294967295,4294967295],0);function No(r){const t=$h().encode(r),e=new ma;return e.update(t),new Uint8Array(e.digest())}function ko(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new oe([e,n],0),new oe([i,o],0)]}class Di{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new en(`Invalid padding: ${e}`);if(n<0)throw new en(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new en(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new en(`Invalid padding when bitmap length is 0: ${e}`);this.Te=8*t.length-e,this.Ie=oe.fromNumber(this.Te)}Ee(t,e,n){let i=t.add(e.multiply(oe.fromNumber(n)));return i.compare(zh)===1&&(i=new oe([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ie).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Te===0)return!1;const e=No(t),[n,i]=ko(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,i,o);if(!this.de(a))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Di(o,i,e);return n.forEach(l=>a.insert(l)),a}insert(t){if(this.Te===0)return;const e=No(t),[n,i]=ko(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,i,o);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class en extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class yr{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,_n.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new yr(M.min(),i,new J(q),Ft(),U())}}class _n{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new _n(n,e,U(),U(),U())}}/**
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
 */class Wn{constructor(t,e,n,i){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=i}}class Ha{constructor(t,e){this.targetId=t,this.me=e}}class Qa{constructor(t,e,n=ht.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class xo{constructor(){this.fe=0,this.ge=Oo(),this.pe=ht.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=U(),e=U(),n=U();return this.ge.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:L()}}),new _n(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=Oo()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,H(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Kh{constructor(t){this.Le=t,this.Be=new Map,this.ke=Ft(),this.qe=Gn(),this.Qe=Gn(),this.Ke=new J(q)}$e(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.Ue(e,t.Ve):this.We(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.We(e,t.key,t.Ve)}Ge(t){this.forEachTarget(t,e=>{const n=this.ze(e);switch(t.state){case 0:this.je(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.je(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.je(e)&&(this.He(e),n.De(t.resumeToken));break;default:L()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,i)=>{this.je(i)&&e(i)})}Je(t){const e=t.targetId,n=t.me.count,i=this.Ye(e);if(i){const o=i.target;if(di(o))if(n===0){const a=new O(o.path);this.We(e,a,yt.newNoDocument(a,M.min()))}else H(n===1);else{const a=this.Ze(e);if(a!==n){const l=this.Xe(t),h=l?this.et(l,t,a):1;if(h!==0){this.He(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(e,f)}}}}}Xe(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let a,l;try{a=Xt(n).toUint8Array()}catch(h){if(h instanceof Aa)return Ae("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Di(a,i,o)}catch(h){return Ae(h instanceof en?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.Te===0?null:l}et(t,e,n){return e.me.count===n-this.rt(t,e.targetId)?0:2}rt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let i=0;return n.forEach(o=>{const a=this.Le.nt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.We(e,o,null),i++)}),i}it(t){const e=new Map;this.Be.forEach((o,a)=>{const l=this.Ye(a);if(l){if(o.current&&di(l.target)){const h=new O(l.target.path);this.st(h).has(a)||this.ot(a,h)||this.We(a,h,yt.newNoDocument(h,t))}o.be&&(e.set(a,o.ve()),o.Ce())}});let n=U();this.Qe.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const f=this.Ye(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(n=n.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(t));const i=new yr(t,e,this.Ke,this.ke,n);return this.ke=Ft(),this.qe=Gn(),this.Qe=Gn(),this.Ke=new J(q),i}Ue(t,e){if(!this.je(t))return;const n=this.ot(t,e.key)?2:0;this.ze(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t)),this.Qe=this.Qe.insert(e.key,this._t(e.key).add(t))}We(t,e,n){if(!this.je(t))return;const i=this.ze(t);this.ot(t,e)?i.Fe(e,1):i.Me(e),this.Qe=this.Qe.insert(e,this._t(e).delete(t)),this.Qe=this.Qe.insert(e,this._t(e).add(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ze(t){const e=this.ze(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.ze(t).xe()}ze(t){let e=this.Be.get(t);return e||(e=new xo,this.Be.set(t,e)),e}_t(t){let e=this.Qe.get(t);return e||(e=new st(q),this.Qe=this.Qe.insert(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new st(q),this.qe=this.qe.insert(t,e)),e}je(t){const e=this.Ye(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Ye(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ut(t)}He(t){this.Be.set(t,new xo),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.We(t,e,null)})}ot(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Gn(){return new J(O.comparator)}function Oo(){return new J(O.comparator)}const Hh={asc:"ASCENDING",desc:"DESCENDING"},Qh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wh={and:"AND",or:"OR"};class Xh{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function mi(r,t){return r.useProto3Json||dr(t)?t:{value:t}}function sr(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Wa(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Yh(r,t){return sr(r,t.toTimestamp())}function bt(r){return H(!!r),M.fromTimestamp(function(e){const n=Wt(e);return new it(n.seconds,n.nanos)}(r))}function Ni(r,t){return pi(r,t).canonicalString()}function pi(r,t){const e=function(i){return new Y(["projects",i.projectId,"databases",i.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Xa(r){const t=Y.fromString(r);return H(ec(t)),t}function gi(r,t){return Ni(r.databaseId,t.path)}function Jr(r,t){const e=Xa(t);if(e.get(1)!==r.databaseId.projectId)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new O(Ja(e))}function Ya(r,t){return Ni(r.databaseId,t)}function Jh(r){const t=Xa(r);return t.length===4?Y.emptyPath():Ja(t)}function _i(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Ja(r){return H(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Lo(r,t,e){return{name:gi(r,t),fields:e.value.mapValue.fields}}function Zh(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,p){return f.useProto3Json?(H(p===void 0||typeof p=="string"),ht.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array),ht.fromUint8Array(p||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){const p=f.code===void 0?C.UNKNOWN:Ka(f.code);return new x(p,f.message||"")}(a);e=new Qa(n,i,o,l||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=Jr(r,n.document.name),o=bt(n.document.updateTime),a=n.document.createTime?bt(n.document.createTime):M.min(),l=new At({mapValue:{fields:n.document.fields}}),h=yt.newFoundDocument(i,o,a,l),f=n.targetIds||[],p=n.removedTargetIds||[];e=new Wn(f,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=Jr(r,n.document),o=n.readTime?bt(n.readTime):M.min(),a=yt.newNoDocument(i,o),l=n.removedTargetIds||[];e=new Wn([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=Jr(r,n.document),o=n.removedTargetIds||[];e=new Wn([],o,i,null)}else{if(!("filter"in t))return L();{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,a=new Gh(i,o),l=n.targetId;e=new Ha(l,a)}}return e}function td(r,t){let e;if(t instanceof gn)e={update:Lo(r,t.key,t.value)};else if(t instanceof za)e={delete:gi(r,t.key)};else if(t instanceof le)e={update:Lo(r,t.key,t.data),updateMask:ud(t.fieldMask)};else{if(!(t instanceof Bh))return L();e={verify:gi(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,a){const l=a.transform;if(l instanceof rr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof mn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof pn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ir)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw L()}(0,n))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Yh(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L()}(r,t.precondition)),e}function ed(r,t){return r&&r.length>0?(H(t!==void 0),r.map(e=>function(i,o){let a=i.updateTime?bt(i.updateTime):bt(o);return a.isEqual(M.min())&&(a=bt(o)),new Lh(a,i.transformResults||[])}(e,t))):[]}function nd(r,t){return{documents:[Ya(r,t.path)]}}function rd(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Ya(r,i);const o=function(f){if(f.length!==0)return tc(Ct.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(p=>function(R){return{field:ye(R.field),direction:od(R.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=mi(r,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{ct:e,parent:i}}function id(r){let t=Jh(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){H(n===1);const p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(I){const R=Za(I);return R instanceof Ct&&Ca(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(R=>function(b){return new fn(Ee(b.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(R))}(e.orderBy));let l=null;e.limit&&(l=function(I){let R;return R=typeof I=="object"?I.value:I,dr(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(I){const R=!!I.before,P=I.values||[];return new er(P,R)}(e.startAt));let f=null;return e.endAt&&(f=function(I){const R=!I.before,P=I.values||[];return new er(P,R)}(e.endAt)),Ah(t,i,a,o,l,"F",h,f)}function sd(r,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Za(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Ee(e.unaryFilter.field);return rt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Ee(e.unaryFilter.field);return rt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ee(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ee(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(e){return rt.create(Ee(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Ct.create(e.compositeFilter.filters.map(n=>Za(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(r):L()}function od(r){return Hh[r]}function ad(r){return Qh[r]}function cd(r){return Wh[r]}function ye(r){return{fieldPath:r.canonicalString()}}function Ee(r){return lt.fromServerFormat(r.fieldPath)}function tc(r){return r instanceof rt?function(e){if(e.op==="=="){if(Ao(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NAN"}};if(Io(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ao(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NAN"}};if(Io(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ye(e.field),op:ad(e.op),value:e.value}}}(r):r instanceof Ct?function(e){const n=e.getFilters().map(i=>tc(i));return n.length===1?n[0]:{compositeFilter:{op:cd(e.op),filters:n}}}(r):L()}function ud(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function ec(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class jt{constructor(t,e,n,i,o=M.min(),a=M.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class ld{constructor(t){this.ht=t}}function hd(r){const t=id({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?nr(t,t.limit,"L"):t}/**
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
 */class dd{constructor(){this.ln=new fd}addToCollectionParentIndex(t,e){return this.ln.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.ln.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Qt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Qt.min())}updateCollectionGroup(t,e,n){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class fd{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new st(Y.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new st(Y.comparator)).toArray()}}/**
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
 */const Mo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */class Ce{constructor(t){this.kn=t}next(){return this.kn+=2,this.kn}static qn(){return new Ce(0)}static Qn(){return new Ce(-1)}}/**
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
 */function Fo([r,t],[e,n]){const i=q(r,e);return i===0?q(t,n):i}class md{constructor(t){this.Gn=t,this.buffer=new st(Fo),this.zn=0}jn(){return++this.zn}Hn(t){const e=[t,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Fo(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class pd{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(t){k("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ke(e)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await Ne(e)}await this.Yn(3e5)})}}class gd{constructor(t,e){this.Zn=t,this.params=e}calculateTargetCount(t,e){return this.Zn.Xn(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return S.resolve(hr.oe);const n=new md(e);return this.Zn.forEachTarget(t,i=>n.Hn(i.sequenceNumber)).next(()=>this.Zn.er(t,i=>n.Hn(i))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Zn.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Zn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Mo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Mo):this.tr(t,e))}getCacheSize(t){return this.Zn.getCacheSize(t)}tr(t,e){let n,i,o,a,l,h,f;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),i=this.params.maximumSequenceNumbersToCollect):i=I,a=Date.now(),this.nthSequenceNumber(t,i))).next(I=>(n=I,l=Date.now(),this.removeTargets(t,n,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,n))).next(I=>(f=Date.now(),ge()<=j.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${I} documents in `+(f-h)+`ms
Total Duration: ${f-p}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:I})))}}function _d(r,t){return new gd(r,t)}/**
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
 */class yd{constructor(){this.changes=new ue(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,yt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?S.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Ed{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Td{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(n!==null&&on(n.mutation,i,St.empty(),it.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,U()).next(()=>n))}getLocalViewOfDocuments(t,e,n=U()){const i=se();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(o=>{let a=tn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=se();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,U()))}populateOverlays(t,e,n){const i=[];return n.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,n,i){let o=Ft();const a=sn(),l=function(){return sn()}();return e.forEach((h,f)=>{const p=n.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof le)?o=o.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),on(p.mutation,f,p.mutation.getFieldMask(),it.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,p)=>a.set(f,p)),e.forEach((f,p)=>{var I;return l.set(f,new Ed(p,(I=a.get(f))!==null&&I!==void 0?I:null))}),l))}recalculateAndSaveOverlays(t,e){const n=sn();let i=new J((a,l)=>a-l),o=U();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let p=n.get(h)||St.empty();p=l.applyToLocalView(f,p),n.set(h,p);const I=(i.get(l.batchId)||U()).add(h);i=i.insert(l.batchId,I)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,p=h.value,I=Ma();p.forEach(R=>{if(!o.has(R)){const P=ja(e.get(R),n.get(R));P!==null&&I.set(R,P),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,I))}return S.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,i){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Na(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):S.resolve(se());let l=-1,h=o;return a.next(f=>S.forEach(f,(p,I)=>(l<I.largestBatchId&&(l=I.largestBatchId),o.get(p)?S.resolve():this.remoteDocumentCache.getEntry(t,p).next(R=>{h=h.insert(p,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,U())).next(p=>({batchId:l,changes:La(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(n=>{let i=tn();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let a=tn();return this.indexManager.getCollectionParents(t,o).next(l=>S.forEach(l,h=>{const f=function(I,R){return new xe(R,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,n,i).next(p=>{p.forEach((I,R)=>{a=a.insert(I,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i))).next(a=>{o.forEach((h,f)=>{const p=f.getKey();a.get(p)===null&&(a=a.insert(p,yt.newInvalidDocument(p)))});let l=tn();return a.forEach((h,f)=>{const p=o.get(h);p!==void 0&&on(p.mutation,f,St.empty(),it.now()),pr(e,f)&&(l=l.insert(h,f))}),l})}}/**
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
 */class vd{constructor(t){this.serializer=t,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(t,e){return S.resolve(this.Tr.get(e))}saveBundleMetadata(t,e){return this.Tr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:bt(i.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Ir.get(e))}saveNamedQuery(t,e){return this.Ir.set(e.name,function(i){return{name:i.name,query:hd(i.bundledQuery),readTime:bt(i.readTime)}}(e)),S.resolve()}}/**
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
 */class Id{constructor(){this.overlays=new J(O.comparator),this.Er=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const n=se();return S.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&n.set(i,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((i,o)=>{this.Tt(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Er.get(n);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Er.delete(n)),S.resolve()}getOverlaysForCollection(t,e,n){const i=se(),o=e.length+1,a=new O(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>n&&i.set(h.getKey(),h)}return S.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new J((f,p)=>f-p);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>n){let p=o.get(f.largestBatchId);p===null&&(p=se(),o=o.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}const l=se(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>l.set(f,p)),!(l.size()>=i)););return S.resolve(l)}Tt(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const a=this.Er.get(i.largestBatchId).delete(n.key);this.Er.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new qh(e,n));let o=this.Er.get(e);o===void 0&&(o=U(),this.Er.set(e,o)),this.Er.set(e,o.add(n.key))}}/**
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
 */class Ad{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
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
 */class ki{constructor(){this.dr=new st(ot.Ar),this.Rr=new st(ot.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(t,e){const n=new ot(t,e);this.dr=this.dr.add(n),this.Rr=this.Rr.add(n)}mr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.gr(new ot(t,e))}pr(t,e){t.forEach(n=>this.removeReference(n,e))}yr(t){const e=new O(new Y([])),n=new ot(e,t),i=new ot(e,t+1),o=[];return this.Rr.forEachInRange([n,i],a=>{this.gr(a),o.push(a.key)}),o}wr(){this.dr.forEach(t=>this.gr(t))}gr(t){this.dr=this.dr.delete(t),this.Rr=this.Rr.delete(t)}Sr(t){const e=new O(new Y([])),n=new ot(e,t),i=new ot(e,t+1);let o=U();return this.Rr.forEachInRange([n,i],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ot(t,0),n=this.dr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class ot{constructor(t,e){this.key=t,this.br=e}static Ar(t,e){return O.comparator(t.key,e.key)||q(t.br,e.br)}static Vr(t,e){return q(t.br,e.br)||O.comparator(t.key,e.key)}}/**
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
 */class wd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Dr=1,this.vr=new st(ot.Ar)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Uh(o,e,n,i);this.mutationQueue.push(a);for(const l of i)this.vr=this.vr.add(new ot(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.Cr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.Fr(n),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.vr.forEachInRange([n,i],a=>{const l=this.Cr(a.br);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new st(q);return e.forEach(i=>{const o=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.vr.forEachInRange([o,a],l=>{n=n.add(l.br)})}),S.resolve(this.Mr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;O.isDocumentKey(o)||(o=o.child(""));const a=new ot(new O(o),0);let l=new st(q);return this.vr.forEachWhile(h=>{const f=h.key.path;return!!n.isPrefixOf(f)&&(f.length===i&&(l=l.add(h.br)),!0)},a),S.resolve(this.Mr(l))}Mr(t){const e=[];return t.forEach(n=>{const i=this.Cr(n);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){H(this.Or(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.vr;return S.forEach(e.mutations,i=>{const o=new ot(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.vr=n})}Ln(t){}containsKey(t,e){const n=new ot(e,0),i=this.vr.firstAfterOrEqual(n);return S.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}Or(t,e){return this.Fr(t)}Fr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Cr(t){const e=this.Fr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Rd{constructor(t){this.Nr=t,this.docs=function(){return new J(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,a=this.Nr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return S.resolve(n?n.document.mutableCopy():yt.newInvalidDocument(e))}getEntries(t,e){let n=Ft();return e.forEach(i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():yt.newInvalidDocument(i))}),S.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=Ft();const a=e.path,l=new O(a.child("")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||nh(eh(p),n)<=0||(i.has(p.key)||pr(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,n,i){L()}Lr(t,e){return S.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Sd(this)}getSize(t){return S.resolve(this.size)}}class Sd extends yd{constructor(t){super(),this.hr=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.hr.addEntry(t,i)):this.hr.removeEntry(n)}),S.waitFor(e)}getFromCache(t,e){return this.hr.getEntry(t,e)}getAllFromCache(t,e){return this.hr.getEntries(t,e)}}/**
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
 */class Cd{constructor(t){this.persistence=t,this.Br=new ue(e=>Ci(e),Pi),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.kr=0,this.qr=new ki,this.targetCount=0,this.Qr=Ce.qn()}forEachTarget(t,e){return this.Br.forEach((n,i)=>e(i)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.kr)}allocateTargetId(t){return this.highestTargetId=this.Qr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.kr&&(this.kr=e),S.resolve()}Un(t){this.Br.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Qr=new Ce(e),this.highestTargetId=e),t.sequenceNumber>this.kr&&(this.kr=t.sequenceNumber)}addTargetData(t,e){return this.Un(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Un(e),S.resolve()}removeTargetData(t,e){return this.Br.delete(e.target),this.qr.yr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.Br.forEach((a,l)=>{l.sequenceNumber<=e&&n.get(l.targetId)===null&&(this.Br.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const n=this.Br.get(e)||null;return S.resolve(n)}addMatchingKeys(t,e,n){return this.qr.mr(e,n),S.resolve()}removeMatchingKeys(t,e,n){this.qr.pr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.qr.yr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const n=this.qr.Sr(e);return S.resolve(n)}containsKey(t,e){return S.resolve(this.qr.containsKey(e))}}/**
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
 */class nc{constructor(t,e){this.Kr={},this.overlays={},this.$r=new hr(0),this.Ur=!1,this.Ur=!0,this.Wr=new Ad,this.referenceDelegate=t(this),this.Gr=new Cd(this),this.indexManager=new dd,this.remoteDocumentCache=function(i){return new Rd(i)}(n=>this.referenceDelegate.zr(n)),this.serializer=new ld(e),this.jr=new vd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Id,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.Kr[t.toKey()];return n||(n=new wd(e,this.referenceDelegate),this.Kr[t.toKey()]=n),n}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(t,e,n){k("MemoryPersistence","Starting transaction:",t);const i=new Pd(this.$r.next());return this.referenceDelegate.Hr(),n(i).next(o=>this.referenceDelegate.Jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Yr(t,e){return S.or(Object.values(this.Kr).map(n=>()=>n.containsKey(t,e)))}}class Pd extends ih{constructor(t){super(),this.currentSequenceNumber=t}}class xi{constructor(t){this.persistence=t,this.Zr=new ki,this.Xr=null}static ei(t){return new xi(t)}get ti(){if(this.Xr)return this.Xr;throw L()}addReference(t,e,n){return this.Zr.addReference(n,e),this.ti.delete(n.toString()),S.resolve()}removeReference(t,e,n){return this.Zr.removeReference(n,e),this.ti.add(n.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.ti.add(e.toString()),S.resolve()}removeTarget(t,e){this.Zr.yr(e.targetId).forEach(i=>this.ti.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.ti.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}Hr(){this.Xr=new Set}Jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.ti,n=>{const i=O.fromPath(n);return this.ni(t,i).next(o=>{o||e.removeEntry(i,M.min())})}).next(()=>(this.Xr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ni(t,e).next(n=>{n?this.ti.delete(e.toString()):this.ti.add(e.toString())})}zr(t){return 0}ni(t,e){return S.or([()=>S.resolve(this.Zr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Yr(t,e)])}}class or{constructor(t,e){this.persistence=t,this.ri=new ue(n=>ah(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=_d(this,e)}static ei(t,e){return new or(t,e)}Hr(){}Jr(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Xn(t){const e=this.nr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(i=>n+i))}nr(t){let e=0;return this.er(t,n=>{e++}).next(()=>e)}er(t,e){return S.forEach(this.ri,(n,i)=>this.ir(t,n,i).next(o=>o?S.resolve():e(i)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.Lr(t,a=>this.ir(t,a,e).next(l=>{l||(n++,o.removeEntry(a,M.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}removeReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}zr(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Kn(t.data.value)),e}ir(t,e,n){return S.or([()=>this.persistence.Yr(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.ri.get(e);return S.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Oi{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.Wi=n,this.Gi=i}static zi(t,e){let n=U(),i=U();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Oi(t,e.fromCache,n,i)}}/**
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
 */class bd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Vd{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return bu()?8:sh(Cu())>0?6:4}()}initialize(t,e){this.Zi=t,this.indexManager=e,this.ji=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.Xi(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.es(t,e,i,n).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new bd;return this.ts(t,e,a).next(l=>{if(o.result=l,this.Hi)return this.ns(t,e,a,l.size)})}).next(()=>o.result)}ns(t,e,n,i){return n.documentReadCount<this.Ji?(ge()<=j.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",_e(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),S.resolve()):(ge()<=j.DEBUG&&k("QueryEngine","Query:",_e(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Yi*i?(ge()<=j.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",_e(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Pt(e))):S.resolve())}Xi(t,e){if(Co(e))return S.resolve(null);let n=Pt(e);return this.indexManager.getIndexType(t,n).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=nr(e,null,"F"),n=Pt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const a=U(...o);return this.Zi.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,n).next(h=>{const f=this.rs(e,l);return this.ss(e,f,a,h.readTime)?this.Xi(t,nr(e,null,"F")):this.os(t,f,e,h)}))})))}es(t,e,n,i){return Co(e)||i.isEqual(M.min())?S.resolve(null):this.Zi.getDocuments(t,n).next(o=>{const a=this.rs(e,o);return this.ss(e,a,n,i)?S.resolve(null):(ge()<=j.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),_e(e)),this.os(t,a,e,th(i,-1)).next(l=>l))})}rs(t,e){let n=new st(xa(t));return e.forEach((i,o)=>{pr(t,o)&&(n=n.add(o))}),n}ss(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ts(t,e,n){return ge()<=j.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",_e(e)),this.Zi.getDocumentsMatchingQuery(t,e,Qt.min(),n)}os(t,e,n,i){return this.Zi.getDocumentsMatchingQuery(t,n,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
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
 */class Dd{constructor(t,e,n,i){this.persistence=t,this._s=e,this.serializer=i,this.us=new J(q),this.cs=new ue(o=>Ci(o),Pi),this.ls=new Map,this.hs=t.getRemoteDocumentCache(),this.Gr=t.getTargetCache(),this.jr=t.getBundleCache(),this.Ps(n)}Ps(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Td(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.us))}}function Nd(r,t,e,n){return new Dd(r,t,e,n)}async function rc(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next(o=>(i=o,e.Ps(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const a=[],l=[];let h=U();for(const f of i){a.push(f.batchId);for(const p of f.mutations)h=h.add(p.key)}for(const f of o){l.push(f.batchId);for(const p of f.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(n,h).next(f=>({Ts:f,removedBatchIds:a,addedBatchIds:l}))})})}function kd(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=t.batch.keys(),o=e.hs.newChangeBuffer({trackRemovals:!0});return function(l,h,f,p){const I=f.batch,R=I.keys();let P=S.resolve();return R.forEach(b=>{P=P.next(()=>p.getEntry(h,b)).next(D=>{const N=f.docVersions.get(b);H(N!==null),D.version.compareTo(N)<0&&(I.applyToRemoteDocument(D,f),D.isValidDocument()&&(D.setReadTime(f.commitVersion),p.addEntry(D)))})}),P.next(()=>l.mutationQueue.removeMutationBatch(h,I))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(l){let h=U();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(n,i))})}function ic(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Gr.getLastRemoteSnapshotVersion(e))}function xd(r,t){const e=F(r),n=t.snapshotVersion;let i=e.us;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.hs.newChangeBuffer({trackRemovals:!0});i=e.us;const l=[];t.targetChanges.forEach((p,I)=>{const R=i.get(I);if(!R)return;l.push(e.Gr.removeMatchingKeys(o,p.removedDocuments,I).next(()=>e.Gr.addMatchingKeys(o,p.addedDocuments,I)));let P=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,n)),i=i.insert(I,P),function(D,N,$){return D.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(R,P,p)&&l.push(e.Gr.updateTargetData(o,P))});let h=Ft(),f=U();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),l.push(Od(o,a,t.documentUpdates).next(p=>{h=p.Is,f=p.Es})),!n.isEqual(M.min())){const p=e.Gr.getLastRemoteSnapshotVersion(o).next(I=>e.Gr.setTargetsMetadata(o,o.currentSequenceNumber,n));l.push(p)}return S.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.us=i,o))}function Od(r,t,e){let n=U(),i=U();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let a=Ft();return e.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(l)),h.isNoDocument()&&h.version.isEqual(M.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):k("LocalStore","Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Is:a,Es:i}})}function Ld(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Md(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return e.Gr.getTargetData(n,t).next(o=>o?(i=o,S.resolve(i)):e.Gr.allocateTargetId(n).next(a=>(i=new jt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Gr.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=e.us.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.us=e.us.insert(n.targetId,n),e.cs.set(t,n.targetId)),n})}async function yi(r,t,e){const n=F(r),i=n.us.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,a=>n.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ke(a))throw a;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}n.us=n.us.remove(t),n.cs.delete(i.target)}function Bo(r,t,e){const n=F(r);let i=M.min(),o=U();return n.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){const I=F(h),R=I.cs.get(p);return R!==void 0?S.resolve(I.us.get(R)):I.Gr.getTargetData(f,p)}(n,a,Pt(t)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,n.Gr.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>n._s.getDocumentsMatchingQuery(a,t,e?i:M.min(),e?o:U())).next(l=>(Fd(n,Rh(t),l),{documents:l,ds:o})))}function Fd(r,t,e){let n=r.ls.get(t)||M.min();e.forEach((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.ls.set(t,n)}class Uo{constructor(){this.activeTargetIds=Dh()}ps(t){this.activeTargetIds=this.activeTargetIds.add(t)}ys(t){this.activeTargetIds=this.activeTargetIds.delete(t)}gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Bd{constructor(){this._o=new Uo,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this._o.ps(t),this.ao[t]||"not-current"}updateQueryState(t,e,n){this.ao[t]=e}removeLocalQueryTarget(t){this._o.ys(t)}isLocalQueryTarget(t){return this._o.activeTargetIds.has(t)}clearQueryState(t){delete this.ao[t]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(t){return this._o.activeTargetIds.has(t)}start(){return this._o=new Uo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class Ud{uo(t){}shutdown(){}}/**
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
 */class qo{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(t){this.To.push(t)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.To)t(0)}Po(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.To)t(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let jn=null;function Zr(){return jn===null?jn=function(){return 268435456+Math.round(2147483648*Math.random())}():jn++,"0x"+jn.toString(16)}/**
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
 */const qd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Gd{constructor(t){this.Eo=t.Eo,this.Ao=t.Ao}Ro(t){this.Vo=t}mo(t){this.fo=t}po(t){this.yo=t}onMessage(t){this.wo=t}close(){this.Ao()}send(t){this.Eo(t)}So(){this.Vo()}bo(){this.fo()}Do(t){this.yo(t)}vo(t){this.wo(t)}}/**
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
 */const gt="WebChannelConnection";class jd extends class{get Co(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Fo=n+"://"+e.host,this.Mo=`projects/${i}/databases/${o}`,this.xo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}Oo(e,n,i,o,a){const l=Zr(),h=this.No(e,n.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${l}:`,h,i);const f={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(f,o,a),this.Bo(e,h,f,i).then(p=>(k("RestConnection",`Received RPC '${e}' ${l}: `,p),p),p=>{throw Ae("RestConnection",`RPC '${e}' ${l} failed with error: `,p,"url: ",h,"request:",i),p})}ko(e,n,i,o,a,l){return this.Oo(e,n,i,o,a)}Lo(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+De}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((o,a)=>e[a]=o),i&&i.headers.forEach((o,a)=>e[a]=o)}No(e,n){const i=qd[e];return`${this.Fo}/v1/${n}:${i}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Bo(t,e,n,i){const o=Zr();return new Promise((a,l)=>{const h=new pa;h.setWithCredentials(!0),h.listenOnce(ga.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case zn.NO_ERROR:const p=h.getResponseJson();k(gt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),a(p);break;case zn.TIMEOUT:k(gt,`RPC '${t}' ${o} timed out`),l(new x(C.DEADLINE_EXCEEDED,"Request time out"));break;case zn.HTTP_ERROR:const I=h.getStatus();if(k(gt,`RPC '${t}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const P=R?.error;if(P&&P.status&&P.message){const b=function(N){const $=N.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf($)>=0?$:C.UNKNOWN}(P.status);l(new x(b,P.message))}else l(new x(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new x(C.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(gt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(i);k(gt,`RPC '${t}' ${o} sending request:`,i),h.send(e,"POST",f,n,15)})}qo(t,e,n){const i=Zr(),o=[this.Fo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Ea(),l=ya(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Lo(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const p=o.join("");k(gt,`Creating RPC '${t}' stream ${i}: ${p}`,h);const I=a.createWebChannel(p,h);let R=!1,P=!1;const b=new Gd({Eo:N=>{P?k(gt,`Not sending because RPC '${t}' stream ${i} is closed:`,N):(R||(k(gt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),R=!0),k(gt,`RPC '${t}' stream ${i} sending:`,N),I.send(N))},Ao:()=>I.close()}),D=(N,$,K)=>{N.listen($,Q=>{try{K(Q)}catch(et){setTimeout(()=>{throw et},0)}})};return D(I,Ze.EventType.OPEN,()=>{P||(k(gt,`RPC '${t}' stream ${i} transport opened.`),b.So())}),D(I,Ze.EventType.CLOSE,()=>{P||(P=!0,k(gt,`RPC '${t}' stream ${i} transport closed`),b.Do())}),D(I,Ze.EventType.ERROR,N=>{P||(P=!0,Ae(gt,`RPC '${t}' stream ${i} transport errored:`,N),b.Do(new x(C.UNAVAILABLE,"The operation could not be completed")))}),D(I,Ze.EventType.MESSAGE,N=>{var $;if(!P){const K=N.data[0];H(!!K);const Q=K,et=Q?.error||(($=Q[0])===null||$===void 0?void 0:$.error);if(et){k(gt,`RPC '${t}' stream ${i} received error:`,et);const Dt=et.status;let at=function(_){const y=nt[_];if(y!==void 0)return Ka(y)}(Dt),T=et.message;at===void 0&&(at=C.INTERNAL,T="Unknown error status: "+Dt+" with message "+et.message),P=!0,b.Do(new x(at,T)),I.close()}else k(gt,`RPC '${t}' stream ${i} received:`,K),b.vo(K)}}),D(l,_a.STAT_EVENT,N=>{N.stat===ci.PROXY?k(gt,`RPC '${t}' stream ${i} detected buffering proxy`):N.stat===ci.NOPROXY&&k(gt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{b.bo()},0),b}}function ti(){return typeof document<"u"?document:null}/**
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
 */function Er(r){return new Xh(r,!0)}/**
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
 */class sc{constructor(t,e,n=1e3,i=1.5,o=6e4){this.li=t,this.timerId=e,this.Qo=n,this.Ko=i,this.$o=o,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(t){this.cancel();const e=Math.floor(this.Uo+this.Ho()),n=Math.max(0,Date.now()-this.Go),i=Math.max(0,e-n);i>0&&k("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Uo} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,i,()=>(this.Go=Date.now(),t())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
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
 */class oc{constructor(t,e,n,i,o,a,l,h){this.li=t,this.Yo=n,this.Zo=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new sc(t,e)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(t){this.l_(),this.stream.send(t)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(t,e){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,t!==4?this.r_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Mt(e.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.po(e)}P_(){}auth(){this.state=1;const t=this.T_(this.Xo),e=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Xo===e&&this.I_(n,i)},n=>{t(()=>{const i=new x(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.E_(i)})})}I_(t,e){const n=this.T_(this.Xo);this.stream=this.d_(t,e),this.stream.Ro(()=>{n(()=>this.listener.Ro())}),this.stream.mo(()=>{n(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(i=>{n(()=>this.E_(i))}),this.stream.onMessage(i=>{n(()=>++this.n_==1?this.A_(i):this.onNext(i))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}T_(t){return e=>{this.li.enqueueAndForget(()=>this.Xo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $d extends oc{constructor(t,e,n,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,a),this.serializer=o}d_(t,e){return this.connection.qo("Listen",t,e)}A_(t){return this.onNext(t)}onNext(t){this.r_.reset();const e=Zh(this.serializer,t),n=function(o){if(!("targetChange"in o))return M.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?M.min():a.readTime?bt(a.readTime):M.min()}(t);return this.listener.R_(e,n)}V_(t){const e={};e.database=_i(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=di(h)?{documents:nd(o,h)}:{query:rd(o,h).ct},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Wa(o,a.resumeToken);const f=mi(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(M.min())>0){l.readTime=sr(o,a.snapshotVersion.toTimestamp());const f=mi(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);const n=sd(this.serializer,t);n&&(e.labels=n),this.c_(e)}m_(t){const e={};e.database=_i(this.serializer),e.removeTarget=t,this.c_(e)}}class zd extends oc{constructor(t,e,n,i,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,a),this.serializer=o}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(t,e){return this.connection.qo("Write",t,e)}A_(t){return H(!!t.streamToken),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0),this.listener.p_()}onNext(t){H(!!t.streamToken),this.lastStreamToken=t.streamToken,this.r_.reset();const e=ed(t.writeResults,t.commitTime),n=bt(t.commitTime);return this.listener.y_(n,e)}w_(){const t={};t.database=_i(this.serializer),this.c_(t)}g_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>td(this.serializer,n))};this.c_(e)}}/**
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
 */class Kd extends class{}{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.S_=!1}b_(){if(this.S_)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(t,e,n,i){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Oo(t,pi(e,n),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(C.UNKNOWN,o.toString())})}ko(t,e,n,i,o){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.ko(t,pi(e,n),i,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(C.UNKNOWN,a.toString())})}terminate(){this.S_=!0,this.connection.terminate()}}class Hd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(t){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.M_("Offline")))}set(t){this.N_(),this.D_=0,t==="Online"&&(this.C_=!1),this.M_(t)}M_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}x_(t){const e=`Could not reach Cloud Firestore backend. ${t}
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
 */class Qd{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=o,this.Q_.uo(a=>{n.enqueueAndForget(async()=>{he(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=F(h);f.k_.add(4),await yn(f),f.K_.set("Unknown"),f.k_.delete(4),await Tr(f)}(this))})}),this.K_=new Hd(n,i)}}async function Tr(r){if(he(r))for(const t of r.q_)await t(!0)}async function yn(r){for(const t of r.q_)await t(!1)}function ac(r,t){const e=F(r);e.B_.has(t.targetId)||(e.B_.set(t.targetId,t),Bi(e)?Fi(e):Oe(e).s_()&&Mi(e,t))}function Li(r,t){const e=F(r),n=Oe(e);e.B_.delete(t),n.s_()&&cc(e,t),e.B_.size===0&&(n.s_()?n.a_():he(e)&&e.K_.set("Unknown"))}function Mi(r,t){if(r.U_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(M.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Oe(r).V_(t)}function cc(r,t){r.U_.xe(t),Oe(r).m_(t)}function Fi(r){r.U_=new Kh({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ut:t=>r.B_.get(t)||null,nt:()=>r.datastore.serializer.databaseId}),Oe(r).start(),r.K_.F_()}function Bi(r){return he(r)&&!Oe(r).i_()&&r.B_.size>0}function he(r){return F(r).k_.size===0}function uc(r){r.U_=void 0}async function Wd(r){r.K_.set("Online")}async function Xd(r){r.B_.forEach((t,e)=>{Mi(r,t)})}async function Yd(r,t){uc(r),Bi(r)?(r.K_.O_(t),Fi(r)):r.K_.set("Unknown")}async function Jd(r,t,e){if(r.K_.set("Online"),t instanceof Qa&&t.state===2&&t.cause)try{await async function(i,o){const a=o.cause;for(const l of o.targetIds)i.B_.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.B_.delete(l),i.U_.removeTarget(l))}(r,t)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ar(r,n)}else if(t instanceof Wn?r.U_.$e(t):t instanceof Ha?r.U_.Je(t):r.U_.Ge(t),!e.isEqual(M.min()))try{const n=await ic(r.localStore);e.compareTo(n)>=0&&await function(o,a){const l=o.U_.it(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.B_.get(f);p&&o.B_.set(f,p.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{const p=o.B_.get(h);if(!p)return;o.B_.set(h,p.withResumeToken(ht.EMPTY_BYTE_STRING,p.snapshotVersion)),cc(o,h);const I=new jt(p.target,h,f,p.sequenceNumber);Mi(o,I)}),o.remoteSyncer.applyRemoteEvent(l)}(r,e)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await ar(r,n)}}async function ar(r,t,e){if(!ke(t))throw t;r.k_.add(1),await yn(r),r.K_.set("Offline"),e||(e=()=>ic(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),r.k_.delete(1),await Tr(r)})}function lc(r,t){return t().catch(e=>ar(r,e,t))}async function vr(r){const t=F(r),e=Jt(t);let n=t.L_.length>0?t.L_[t.L_.length-1].batchId:-1;for(;Zd(t);)try{const i=await Ld(t.localStore,n);if(i===null){t.L_.length===0&&e.a_();break}n=i.batchId,tf(t,i)}catch(i){await ar(t,i)}hc(t)&&dc(t)}function Zd(r){return he(r)&&r.L_.length<10}function tf(r,t){r.L_.push(t);const e=Jt(r);e.s_()&&e.f_&&e.g_(t.mutations)}function hc(r){return he(r)&&!Jt(r).i_()&&r.L_.length>0}function dc(r){Jt(r).start()}async function ef(r){Jt(r).w_()}async function nf(r){const t=Jt(r);for(const e of r.L_)t.g_(e.mutations)}async function rf(r,t,e){const n=r.L_.shift(),i=Vi.from(n,t,e);await lc(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await vr(r)}async function sf(r,t){t&&Jt(r).f_&&await async function(n,i){if(function(a){return jh(a)&&a!==C.ABORTED}(i.code)){const o=n.L_.shift();Jt(n).__(),await lc(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i)),await vr(n)}}(r,t),hc(r)&&dc(r)}async function Go(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=he(e);e.k_.add(3),await yn(e),n&&e.K_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.k_.delete(3),await Tr(e)}async function of(r,t){const e=F(r);t?(e.k_.delete(2),await Tr(e)):t||(e.k_.add(2),await yn(e),e.K_.set("Unknown"))}function Oe(r){return r.W_||(r.W_=function(e,n,i){const o=F(e);return o.b_(),new $d(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Ro:Wd.bind(null,r),mo:Xd.bind(null,r),po:Yd.bind(null,r),R_:Jd.bind(null,r)}),r.q_.push(async t=>{t?(r.W_.__(),Bi(r)?Fi(r):r.K_.set("Unknown")):(await r.W_.stop(),uc(r))})),r.W_}function Jt(r){return r.G_||(r.G_=function(e,n,i){const o=F(e);return o.b_(),new zd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Ro:()=>Promise.resolve(),mo:ef.bind(null,r),po:sf.bind(null,r),p_:nf.bind(null,r),y_:rf.bind(null,r)}),r.q_.push(async t=>{t?(r.G_.__(),await vr(r)):(await r.G_.stop(),r.L_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.L_.length} pending writes`),r.L_=[]))})),r.G_}/**
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
 */class Ui{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const a=Date.now()+n,l=new Ui(t,e,a,i,o);return l.start(n),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qi(r,t){if(Mt("AsyncQueue",`${t}: ${r}`),ke(r))return new x(C.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class ve{static emptySet(t){return new ve(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||O.comparator(e.key,n.key):(e,n)=>O.comparator(e.key,n.key),this.keyedMap=tn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ve)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new ve;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class jo{constructor(){this.z_=new J(O.comparator)}track(t){const e=t.doc.key,n=this.z_.get(e);n?t.type!==0&&n.type===3?this.z_=this.z_.insert(e,t):t.type===3&&n.type!==1?this.z_=this.z_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.z_=this.z_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.z_=this.z_.remove(e):t.type===1&&n.type===2?this.z_=this.z_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):L():this.z_=this.z_.insert(e,t)}j_(){const t=[];return this.z_.inorderTraversal((e,n)=>{t.push(n)}),t}}class Pe{constructor(t,e,n,i,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,n,i,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Pe(t,e,ve.emptySet(e),a,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&mr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
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
 */class af{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(t=>t.Z_())}}class cf{constructor(){this.queries=$o(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=$o(),o.forEach((a,l)=>{for(const h of l.J_)h.onError(n)})})(this,new x(C.ABORTED,"Firestore shutting down"))}}function $o(){return new ue(r=>ka(r),mr)}async function uf(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.Y_()&&t.Z_()&&(n=2):(o=new af,n=t.Z_()?0:1);try{switch(n){case 0:o.H_=await e.onListen(i,!0);break;case 1:o.H_=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){const l=qi(a,`Initialization of query '${_e(t.query)}' failed`);return void t.onError(l)}e.queries.set(i,o),o.J_.push(t),t.ea(e.onlineState),o.H_&&t.ta(o.H_)&&Gi(e)}async function lf(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const a=o.J_.indexOf(t);a>=0&&(o.J_.splice(a,1),o.J_.length===0?i=t.Z_()?0:1:!o.Y_()&&t.Z_()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function hf(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,a=e.queries.get(o);if(a){for(const l of a.J_)l.ta(i)&&(n=!0);a.H_=i}}n&&Gi(e)}function df(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.J_)o.onError(e);n.queries.delete(t)}function Gi(r){r.X_.forEach(t=>{t.next()})}var Ei,zo;(zo=Ei||(Ei={})).na="default",zo.Cache="cache";class ff{constructor(t,e,n){this.query=t,this.ra=e,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=n||{}}ta(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new Pe(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ia?this.oa(t)&&(this.ra.next(t),e=!0):this._a(t,this.onlineState)&&(this.aa(t),e=!0),this.sa=t,e}onError(t){this.ra.error(t)}ea(t){this.onlineState=t;let e=!1;return this.sa&&!this.ia&&this._a(this.sa,t)&&(this.aa(this.sa),e=!0),e}_a(t,e){if(!t.fromCache||!this.Z_())return!0;const n=e!=="Offline";return(!this.options.ua||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}oa(t){if(t.docChanges.length>0)return!0;const e=this.sa&&this.sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}aa(t){t=Pe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ia=!0,this.ra.next(t)}Z_(){return this.options.source!==Ei.Cache}}/**
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
 */class fc{constructor(t){this.key=t}}class mc{constructor(t){this.key=t}}class mf{constructor(t,e){this.query=t,this.da=e,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=U(),this.mutatedKeys=U(),this.Va=xa(t),this.ma=new ve(this.Va)}get fa(){return this.da}ga(t,e){const n=e?e.pa:new jo,i=e?e.ma:this.ma;let o=e?e.mutatedKeys:this.mutatedKeys,a=i,l=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,I)=>{const R=i.get(p),P=pr(this.query,I)?I:null,b=!!R&&this.mutatedKeys.has(R.key),D=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let N=!1;R&&P?R.data.isEqual(P.data)?b!==D&&(n.track({type:3,doc:P}),N=!0):this.ya(R,P)||(n.track({type:2,doc:P}),N=!0,(h&&this.Va(P,h)>0||f&&this.Va(P,f)<0)&&(l=!0)):!R&&P?(n.track({type:0,doc:P}),N=!0):R&&!P&&(n.track({type:1,doc:R}),N=!0,(h||f)&&(l=!0)),N&&(P?(a=a.add(P),o=D?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),n.track({type:1,doc:p})}return{ma:a,pa:n,ss:l,mutatedKeys:o}}ya(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.ma;this.ma=t.ma,this.mutatedKeys=t.mutatedKeys;const a=t.pa.j_();a.sort((p,I)=>function(P,b){const D=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return D(P)-D(b)}(p.type,I.type)||this.Va(p.doc,I.doc)),this.wa(n),i=i!=null&&i;const l=e&&!i?this.Sa():[],h=this.Ra.size===0&&this.current&&!i?1:0,f=h!==this.Aa;return this.Aa=h,a.length!==0||f?{snapshot:new Pe(this.query,t.ma,o,a,t.mutatedKeys,h===0,f,!1,!!n&&n.resumeToken.approximateByteSize()>0),ba:l}:{ba:l}}ea(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new jo,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(t){return!this.da.has(t)&&!!this.ma.has(t)&&!this.ma.get(t).hasLocalMutations}wa(t){t&&(t.addedDocuments.forEach(e=>this.da=this.da.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.da=this.da.delete(e)),this.current=t.current)}Sa(){if(!this.current)return[];const t=this.Ra;this.Ra=U(),this.ma.forEach(n=>{this.Da(n.key)&&(this.Ra=this.Ra.add(n.key))});const e=[];return t.forEach(n=>{this.Ra.has(n)||e.push(new mc(n))}),this.Ra.forEach(n=>{t.has(n)||e.push(new fc(n))}),e}va(t){this.da=t.ds,this.Ra=U();const e=this.ga(t.documents);return this.applyChanges(e,!0)}Ca(){return Pe.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}}class pf{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class gf{constructor(t){this.key=t,this.Fa=!1}}class _f{constructor(t,e,n,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ma={},this.xa=new ue(l=>ka(l),mr),this.Oa=new Map,this.Na=new Set,this.La=new J(O.comparator),this.Ba=new Map,this.ka=new ki,this.qa={},this.Qa=new Map,this.Ka=Ce.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}}async function yf(r,t,e=!0){const n=Tc(r);let i;const o=n.xa.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Ca()):i=await pc(n,t,e,!0),i}async function Ef(r,t){const e=Tc(r);await pc(e,t,!0,!1)}async function pc(r,t,e,n){const i=await Md(r.localStore,Pt(t)),o=i.targetId,a=r.sharedClientState.addLocalQueryTarget(o,e);let l;return n&&(l=await Tf(r,t,o,a==="current",i.resumeToken)),r.isPrimaryClient&&e&&ac(r.remoteStore,i),l}async function Tf(r,t,e,n,i){r.Ua=(I,R,P)=>async function(D,N,$,K){let Q=N.view.ga($);Q.ss&&(Q=await Bo(D.localStore,N.query,!1).then(({documents:T})=>N.view.ga(T,Q)));const et=K&&K.targetChanges.get(N.targetId),Dt=K&&K.targetMismatches.get(N.targetId)!=null,at=N.view.applyChanges(Q,D.isPrimaryClient,et,Dt);return Ho(D,N.targetId,at.ba),at.snapshot}(r,I,R,P);const o=await Bo(r.localStore,t,!0),a=new mf(t,o.ds),l=a.ga(o.documents),h=_n.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),f=a.applyChanges(l,r.isPrimaryClient,h);Ho(r,e,f.ba);const p=new pf(t,e,a);return r.xa.set(t,p),r.Oa.has(e)?r.Oa.get(e).push(t):r.Oa.set(e,[t]),f.snapshot}async function vf(r,t,e){const n=F(r),i=n.xa.get(t),o=n.Oa.get(i.targetId);if(o.length>1)return n.Oa.set(i.targetId,o.filter(a=>!mr(a,t))),void n.xa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await yi(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Li(n.remoteStore,i.targetId),Ti(n,i.targetId)}).catch(Ne)):(Ti(n,i.targetId),await yi(n.localStore,i.targetId,!0))}async function If(r,t){const e=F(r),n=e.xa.get(t),i=e.Oa.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Li(e.remoteStore,n.targetId))}async function Af(r,t,e){const n=Vf(r);try{const i=await function(a,l){const h=F(a),f=it.now(),p=l.reduce((P,b)=>P.add(b.key),U());let I,R;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let b=Ft(),D=U();return h.hs.getEntries(P,p).next(N=>{b=N,b.forEach(($,K)=>{K.isValidDocument()||(D=D.add($))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,b)).next(N=>{I=N;const $=[];for(const K of l){const Q=Fh(K,I.get(K.key).overlayedDocument);Q!=null&&$.push(new le(K.key,Q,wa(Q.value.mapValue),Ot.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,$,l)}).next(N=>{R=N;const $=N.applyToLocalDocumentSet(I,D);return h.documentOverlayCache.saveOverlays(P,N.batchId,$)})}).then(()=>({batchId:R.batchId,changes:La(I)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),function(a,l,h){let f=a.qa[a.currentUser.toKey()];f||(f=new J(q)),f=f.insert(l,h),a.qa[a.currentUser.toKey()]=f}(n,i.batchId,e),await En(n,i.changes),await vr(n.remoteStore)}catch(i){const o=qi(i,"Failed to persist write");e.reject(o)}}async function gc(r,t){const e=F(r);try{const n=await xd(e.localStore,t);t.targetChanges.forEach((i,o)=>{const a=e.Ba.get(o);a&&(H(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.Fa=!0:i.modifiedDocuments.size>0?H(a.Fa):i.removedDocuments.size>0&&(H(a.Fa),a.Fa=!1))}),await En(e,n,t)}catch(n){await Ne(n)}}function Ko(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.xa.forEach((o,a)=>{const l=a.view.ea(t);l.snapshot&&i.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach((p,I)=>{for(const R of I.J_)R.ea(l)&&(f=!0)}),f&&Gi(h)}(n.eventManager,t),i.length&&n.Ma.R_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function wf(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Ba.get(t),o=i&&i.key;if(o){let a=new J(O.comparator);a=a.insert(o,yt.newNoDocument(o,M.min()));const l=U().add(o),h=new yr(M.min(),new Map,new J(q),a,l);await gc(n,h),n.La=n.La.remove(o),n.Ba.delete(t),ji(n)}else await yi(n.localStore,t,!1).then(()=>Ti(n,t,e)).catch(Ne)}async function Rf(r,t){const e=F(r),n=t.batch.batchId;try{const i=await kd(e.localStore,t);yc(e,n,null),_c(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await En(e,i)}catch(i){await Ne(i)}}async function Sf(r,t,e){const n=F(r);try{const i=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,l).next(I=>(H(I!==null),p=I.keys(),h.mutationQueue.removeMutationBatch(f,I))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(n.localStore,t);yc(n,t,e),_c(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await En(n,i)}catch(i){await Ne(i)}}function _c(r,t){(r.Qa.get(t)||[]).forEach(e=>{e.resolve()}),r.Qa.delete(t)}function yc(r,t,e){const n=F(r);let i=n.qa[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.qa[n.currentUser.toKey()]=i}}function Ti(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Oa.get(t))r.xa.delete(n),e&&r.Ma.Wa(n,e);r.Oa.delete(t),r.isPrimaryClient&&r.ka.yr(t).forEach(n=>{r.ka.containsKey(n)||Ec(r,n)})}function Ec(r,t){r.Na.delete(t.path.canonicalString());const e=r.La.get(t);e!==null&&(Li(r.remoteStore,e),r.La=r.La.remove(t),r.Ba.delete(e),ji(r))}function Ho(r,t,e){for(const n of e)n instanceof fc?(r.ka.addReference(n.key,t),Cf(r,n)):n instanceof mc?(k("SyncEngine","Document no longer in limbo: "+n.key),r.ka.removeReference(n.key,t),r.ka.containsKey(n.key)||Ec(r,n.key)):L()}function Cf(r,t){const e=t.key,n=e.path.canonicalString();r.La.get(e)||r.Na.has(n)||(k("SyncEngine","New document in limbo: "+e),r.Na.add(n),ji(r))}function ji(r){for(;r.Na.size>0&&r.La.size<r.maxConcurrentLimboResolutions;){const t=r.Na.values().next().value;r.Na.delete(t);const e=new O(Y.fromString(t)),n=r.Ka.next();r.Ba.set(n,new gf(e)),r.La=r.La.insert(e,n),ac(r.remoteStore,new jt(Pt(Da(e.path)),n,"TargetPurposeLimboResolution",hr.oe))}}async function En(r,t,e){const n=F(r),i=[],o=[],a=[];n.xa.isEmpty()||(n.xa.forEach((l,h)=>{a.push(n.Ua(h,t,e).then(f=>{var p;if((f||e)&&n.isPrimaryClient){const I=f?!f.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;n.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(f){i.push(f);const I=Oi.zi(h.targetId,f);o.push(I)}}))}),await Promise.all(a),n.Ma.R_(i),await async function(h,f){const p=F(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(f,R=>S.forEach(R.Wi,P=>p.persistence.referenceDelegate.addReference(I,R.targetId,P)).next(()=>S.forEach(R.Gi,P=>p.persistence.referenceDelegate.removeReference(I,R.targetId,P)))))}catch(I){if(!ke(I))throw I;k("LocalStore","Failed to update sequence numbers: "+I)}for(const I of f){const R=I.targetId;if(!I.fromCache){const P=p.us.get(R),b=P.snapshotVersion,D=P.withLastLimboFreeSnapshotVersion(b);p.us=p.us.insert(R,D)}}}(n.localStore,o))}async function Pf(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const n=await rc(e.localStore,t);e.currentUser=t,function(o,a){o.Qa.forEach(l=>{l.forEach(h=>{h.reject(new x(C.CANCELLED,a))})}),o.Qa.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await En(e,n.Ts)}}function bf(r,t){const e=F(r),n=e.Ba.get(t);if(n&&n.Fa)return U().add(n.key);{let i=U();const o=e.Oa.get(t);if(!o)return i;for(const a of o){const l=e.xa.get(a);i=i.unionWith(l.view.fa)}return i}}function Tc(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=gc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=bf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=wf.bind(null,t),t.Ma.R_=hf.bind(null,t.eventManager),t.Ma.Wa=df.bind(null,t.eventManager),t}function Vf(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Rf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Sf.bind(null,t),t}class cr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Er(t.databaseInfo.databaseId),this.sharedClientState=this.za(t),this.persistence=this.ja(t),await this.persistence.start(),this.localStore=this.Ha(t),this.gcScheduler=this.Ja(t,this.localStore),this.indexBackfillerScheduler=this.Ya(t,this.localStore)}Ja(t,e){return null}Ya(t,e){return null}Ha(t){return Nd(this.persistence,new Vd,t.initialUser,this.serializer)}ja(t){return new nc(xi.ei,this.serializer)}za(t){return new Bd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}cr.provider={build:()=>new cr};class Df extends cr{constructor(t){super(),this.cacheSizeBytes=t}Ja(t,e){H(this.persistence.referenceDelegate instanceof or);const n=this.persistence.referenceDelegate.garbageCollector;return new pd(n,t.asyncQueue,e)}ja(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new nc(n=>or.ei(n,e),this.serializer)}}class vi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Ko(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Pf.bind(null,this.syncEngine),await of(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new cf}()}createDatastore(t){const e=Er(t.databaseInfo.databaseId),n=function(o){return new jd(o)}(t.databaseInfo);return function(o,a,l,h){return new Kd(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,i,o,a,l){return new Qd(n,i,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>Ko(this.syncEngine,e,0),function(){return qo.p()?new qo:new Ud}())}createSyncEngine(t,e){return function(i,o,a,l,h,f,p){const I=new _f(i,o,a,l,h,f);return p&&(I.$a=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);k("RemoteStore","RemoteStore shutting down."),o.k_.add(5),await yn(o),o.Q_.shutdown(),o.K_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}vi.provider={build:()=>new vi};/**
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
 */class Nf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Xa(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Xa(this.observer.error,t):Mt("Uncaught Error in snapshot listener:",t.toString()))}eu(){this.muted=!0}Xa(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class kf{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=_t.UNAUTHENTICATED,this.clientId=va.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async a=>{k("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(k("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=qi(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function ei(r,t){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await rc(t.localStore,i),n=i)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Qo(r,t){r.asyncQueue.verifyOperationInProgress();const e=await xf(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Go(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Go(t.remoteStore,i)),r._onlineComponents=t}async function xf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await ei(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;Ae("Error using user provided cache. Falling back to memory cache: "+e),await ei(r,new cr)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await ei(r,new Df(void 0));return r._offlineComponents}async function vc(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await Qo(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await Qo(r,new vi))),r._onlineComponents}function Of(r){return vc(r).then(t=>t.syncEngine)}async function Lf(r){const t=await vc(r),e=t.eventManager;return e.onListen=yf.bind(null,t.syncEngine),e.onUnlisten=vf.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Ef.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=If.bind(null,t.syncEngine),e}function Mf(r,t,e={}){const n=new Kt;return r.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,f){const p=new Nf({next:R=>{p.eu(),a.enqueueAndForget(()=>lf(o,I)),R.fromCache&&h.source==="server"?f.reject(new x(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(R)},error:R=>f.reject(R)}),I=new ff(l,p,{includeMetadataChanges:!0,ua:!0});return uf(o,I)}(await Lf(r),r.asyncQueue,t,e,n)),n.promise}/**
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
 */function Ic(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const Wo=new Map;/**
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
 */function Ac(r,t,e){if(!e)throw new x(C.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Ff(r,t,e,n){if(t===!0&&n===!0)throw new x(C.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Xo(r){if(!O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Yo(r){if(O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Ir(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":L()}function ur(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new x(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ir(r);throw new x(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */class Jo{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new x(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Ff("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ic((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ar{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jo({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new x(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jo(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new zl;switch(n.type){case"firstParty":return new Wl(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Wo.get(e);n&&(k("ComponentProvider","Removing Datastore"),Wo.delete(e),n.terminate())}(this),Promise.resolve()}}function Bf(r,t,e,n={}){var i;const o=(r=ur(r,Ar))._getSettings(),a=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Ae("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),n.mockUserToken){let l,h;if(typeof n.mockUserToken=="string")l=n.mockUserToken,h=_t.MOCK_USER;else{l=Su(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const f=n.mockUserToken.sub||n.mockUserToken.user_id;if(!f)throw new x(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new _t(f)}r._authCredentials=new Kl(new Ta(l,h))}}/**
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
 */class Zt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Zt(this.firestore,t,this._query)}}class wt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new wt(this.firestore,t,this._key)}}class Ht extends Zt{constructor(t,e,n){super(t,e,Da(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new wt(this.firestore,null,new O(t))}withConverter(t){return new Ht(this.firestore,t,this._path)}}function Zo(r,t,...e){if(r=Ie(r),Ac("collection","path",t),r instanceof Ar){const n=Y.fromString(t,...e);return Yo(n),new Ht(r,null,n)}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return Yo(n),new Ht(r.firestore,null,n)}}function Uf(r,t,...e){if(r=Ie(r),arguments.length===1&&(t=va.newId()),Ac("doc","path",t),r instanceof Ar){const n=Y.fromString(t,...e);return Xo(n),new wt(r,null,new O(n))}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return Xo(n),new wt(r.firestore,r instanceof Ht?r.converter:null,new O(n))}}/**
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
 */class ta{constructor(t=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new sc(this,"async_queue_retry"),this.fu=()=>{const n=ti();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.r_.Jo()},this.gu=t;const e=ti();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.pu(),this.yu(t)}enterRestrictedMode(t){if(!this.Eu){this.Eu=!0,this.Vu=t||!1;const e=ti();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.fu)}}enqueue(t){if(this.pu(),this.Eu)return new Promise(()=>{});const e=new Kt;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Iu.push(t),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(t){if(!ke(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(t){const e=this.gu.then(()=>(this.Ru=!0,t().catch(n=>{this.Au=n,this.Ru=!1;const i=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(n);throw Mt("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.Ru=!1,n))));return this.gu=e,e}enqueueAfterDelay(t,e,n){this.pu(),this.mu.indexOf(t)>-1&&(e=0);const i=Ui.createAndSchedule(this,t,e,n,o=>this.Su(o));return this.du.push(i),i}pu(){this.Au&&L()}verifyOperationInProgress(){}async bu(){let t;do t=this.gu,await t;while(t!==this.gu)}Du(t){for(const e of this.du)if(e.timerId===t)return!0;return!1}vu(t){return this.bu().then(()=>{this.du.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.du)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.bu()})}Cu(t){this.mu.push(t)}Su(t){const e=this.du.indexOf(t);this.du.splice(e,1)}}class $i extends Ar{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new ta,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ta(t),this._firestoreClient=void 0,await t}}}function qf(r,t){const e=typeof r=="object"?r:Ol(),n=typeof r=="string"?r:"(default)",i=Dl(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=wu("firestore");o&&Bf(i,...o)}return i}function wc(r){if(r._terminated)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Gf(r),r._firestoreClient}function Gf(r){var t,e,n;const i=r._freezeSettings(),o=function(l,h,f,p){return new lh(l,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Ic(p.experimentalLongPollingOptions),p.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new kf(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(l){const h=l?._online.build();return{_offline:l?._offline.build(h),_online:h}}(r._componentsProvider))}/**
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
 */class be{constructor(t){this._byteString=t}static fromBase64String(t){try{return new be(ht.fromBase64String(t))}catch(e){throw new x(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new be(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class zi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new x(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Rc{constructor(t){this._methodName=t}}/**
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
 */class Ki{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new x(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new x(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return q(this._lat,t._lat)||q(this._long,t._long)}}/**
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
 */class Hi{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
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
 */const jf=/^__.*__$/;class $f{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new le(t,this.data,this.fieldMask,e,this.fieldTransforms):new gn(t,this.data,e,this.fieldTransforms)}}function Sc(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class Qi{constructor(t,e,n,i,o,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.Fu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(t){return new Qi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.xu({path:n,Nu:!1});return i.Lu(t),i}Bu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.xu({path:n,Nu:!1});return i.Fu(),i}ku(t){return this.xu({path:void 0,Nu:!0})}qu(t){return lr(t,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Fu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Lu(this.path.get(t))}Lu(t){if(t.length===0)throw this.qu("Document fields must not be empty");if(Sc(this.Mu)&&jf.test(t))throw this.qu('Document fields cannot begin and end with "__"')}}class zf{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Er(t)}$u(t,e,n,i=!1){return new Qi({Mu:t,methodName:e,Ku:n,path:lt.emptyPath(),Nu:!1,Qu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Cc(r){const t=r._freezeSettings(),e=Er(r._databaseId);return new zf(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Kf(r,t,e,n,i,o={}){const a=r.$u(o.merge||o.mergeFields?2:0,t,e,i);Vc("Data must be an object, but it was:",a,n);const l=Pc(n,a);let h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const I of o.mergeFields){const R=Qf(t,I,e);if(!a.contains(R))throw new x(C.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Xf(p,R)||p.push(R)}h=new St(p),f=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,f=a.fieldTransforms;return new $f(new At(l),h,f)}function Hf(r,t,e,n=!1){return Wi(e,r.$u(n?4:3,t))}function Wi(r,t){if(bc(r=Ie(r)))return Vc("Unsupported field value:",t,r),Pc(r,t);if(r instanceof Rc)return function(n,i){if(!Sc(i.Mu))throw i.qu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.qu(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.Nu&&t.Mu!==4)throw t.qu("Nested arrays are not supported");return function(n,i){const o=[];let a=0;for(const l of n){let h=Wi(l,i.ku(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(r,t)}return function(n,i){if((n=Ie(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Nh(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=it.fromDate(n);return{timestampValue:sr(i.serializer,o)}}if(n instanceof it){const o=new it(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:sr(i.serializer,o)}}if(n instanceof Ki)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof be)return{bytesValue:Wa(i.serializer,n._byteString)};if(n instanceof wt){const o=i.databaseId,a=n.firestore._databaseId;if(!a.isEqual(o))throw i.qu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ni(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Hi)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.qu("VectorValues must only contain numeric values.");return bi(l.serializer,h)})}}}}}}(n,i);throw i.qu(`Unsupported field value: ${Ir(n)}`)}(r,t)}function Pc(r,t){const e={};return Ia(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ce(r,(n,i)=>{const o=Wi(i,t.Ou(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function bc(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof it||r instanceof Ki||r instanceof be||r instanceof wt||r instanceof Rc||r instanceof Hi)}function Vc(r,t,e){if(!bc(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const n=Ir(e);throw n==="an object"?t.qu(r+" a custom object"):t.qu(r+" "+n)}}function Qf(r,t,e){if((t=Ie(t))instanceof zi)return t._internalPath;if(typeof t=="string")return Dc(r,t);throw lr("Field path arguments must be of type string or ",r,!1,void 0,e)}const Wf=new RegExp("[~\\*/\\[\\]]");function Dc(r,t,e){if(t.search(Wf)>=0)throw lr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new zi(...t.split("."))._internalPath}catch{throw lr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function lr(r,t,e,n,i){const o=n&&!n.isEmpty(),a=i!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${n}`),a&&(h+=` in document ${i}`),h+=")"),new x(C.INVALID_ARGUMENT,l+r+h)}function Xf(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class Nc{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Yf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Xi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Yf extends Nc{data(){return super.data()}}function Xi(r,t){return typeof t=="string"?Dc(r,t):t instanceof zi?t._internalPath:t._delegate._internalPath}/**
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
 */function Jf(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yi{}class Ji extends Yi{}function Zf(r,t,...e){let n=[];t instanceof Yi&&n.push(t),n=n.concat(e),function(o){const a=o.filter(h=>h instanceof ts).length,l=o.filter(h=>h instanceof Zi).length;if(a>1||a>0&&l>0)throw new x(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class Zi extends Ji{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Zi(t,e,n)}_apply(t){const e=this._parse(t);return kc(t._query,e),new Zt(t.firestore,t.converter,fi(t._query,e))}_parse(t){const e=Cc(t.firestore);return function(o,a,l,h,f,p,I){let R;if(f.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new x(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){na(I,p);const P=[];for(const b of I)P.push(ea(h,o,b));R={arrayValue:{values:P}}}else R=ea(h,o,I)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||na(I,p),R=Hf(l,a,I,p==="in"||p==="not-in");return rt.create(f,p,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class ts extends Yi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ts(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Ct.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,o){let a=i;const l=o.getFlattenedFilters();for(const h of l)kc(a,h),a=fi(a,h)}(t._query,e),new Zt(t.firestore,t.converter,fi(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class es extends Ji{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new es(t,e)}_apply(t){const e=function(i,o,a){if(i.startAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new fn(o,a)}(t._query,this._field,this._direction);return new Zt(t.firestore,t.converter,function(i,o){const a=i.explicitOrderBy.concat([o]);return new xe(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(t._query,e))}}function tm(r,t="asc"){const e=t,n=Xi("orderBy",r);return es._create(n,e)}class ns extends Ji{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ns(t,e,n)}_apply(t){return new Zt(t.firestore,t.converter,nr(t._query,this._limit,this._limitType))}}function em(r){return ns._create("limit",r,"F")}function ea(r,t,e){if(typeof(e=Ie(e))=="string"){if(e==="")throw new x(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Na(t)&&e.indexOf("/")!==-1)throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Y.fromString(e));if(!O.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return vo(r,new O(n))}if(e instanceof wt)return vo(r,e._key);throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ir(e)}.`)}function na(r,t){if(!Array.isArray(r)||r.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function kc(r,t){const e=function(i,o){for(const a of i)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class nm{convertValue(t,e="none"){switch(Yt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return ce(t,(i,o)=>{n[i]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,i;const o=(i=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(a=>tt(a.doubleValue));return new Hi(o)}convertGeoPoint(t){return new Ki(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=fr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ln(t));default:return null}}convertTimestamp(t){const e=Wt(t);return new it(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);H(ec(n));const i=new hn(n.get(1),n.get(3)),o=new O(n.popFirst(5));return i.isEqual(e)||Mt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
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
 */function rm(r,t,e){let n;return n=r?r.toFirestore(t):t,n}/**
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
 */class $n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class im extends Nc{constructor(t,e,n,i,o,a){super(t,e,n,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Xn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Xi("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Xn extends im{data(t={}){return super.data(t)}}class sm{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new $n(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Xn(this._firestore,this._userDataWriter,n.key,n,new $n(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new x(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const h=new Xn(i._firestore,i._userDataWriter,l.doc.key,l.doc,new $n(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new Xn(i._firestore,i._userDataWriter,l.doc.key,l.doc,new $n(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,p=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:om(l.type),doc:h,oldIndex:f,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function om(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}class am extends nm{constructor(t){super(),this.firestore=t}convertBytes(t){return new be(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new wt(this.firestore,null,e)}}function cm(r){r=ur(r,Zt);const t=ur(r.firestore,$i),e=wc(t),n=new am(t);return Jf(r._query),Mf(e,r._query).then(i=>new sm(t,n,r,i))}function um(r,t){const e=ur(r.firestore,$i),n=Uf(r),i=rm(r.converter,t);return lm(e,[Kf(Cc(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,Ot.exists(!1))]).then(()=>n)}function lm(r,t){return function(n,i){const o=new Kt;return n.asyncQueue.enqueueAndForget(async()=>Af(await Of(n),i,o)),o.promise}(wc(r),t)}(function(t,e=!0){(function(i){De=i})(xl),Zn(new an("firestore",(n,{instanceIdentifier:i,options:o})=>{const a=n.getProvider("app").getImmediate(),l=new $i(new Hl(n.getProvider("auth-internal")),new Yl(n.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new x(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hn(f.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Te(po,"4.7.5",t),Te(po,"4.7.5","esm2017")})();var hm="firebase",dm="11.1.0";/**
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
 */Te(hm,dm,"app");const fm={apiKey:"AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",authDomain:"snakeysnake-34426.firebaseapp.com",projectId:"snakeysnake-34426",storageBucket:"snakeysnake-34426.firebasestorage.app",messagingSenderId:"701773775110",appId:"1:701773775110:web:252b8dd41bcb28ea545e87",measurementId:"G-S95YBN43ME"},mm=ha(fm),ra=qf(mm);class pm{constructor(){this.canvas=document.getElementById("gameCanvas"),this.ctx=this.canvas.getContext("2d"),this.currentScoreElement=document.getElementById("currentScore"),this.highScoreElement=document.getElementById("highScore"),this.modal=document.getElementById("gameOverModal"),this.finalScoreElement=document.getElementById("finalScore"),this.finalHighScoreElement=document.getElementById("finalHighScore"),this.playAgainButton=document.getElementById("playAgainButton"),this.submitScoreButton=document.getElementById("submitScore"),this.playerNameInput=document.getElementById("playerName"),this.nameInputContainer=document.getElementById("nameInputContainer"),this.validateElements(),this.initializeGame(),this.setupEventListeners(),this.initializePointsGuide()}validateElements(){if(!this.canvas||!this.currentScoreElement||!this.highScoreElement||!this.modal||!this.finalScoreElement||!this.finalHighScoreElement||!this.playAgainButton||!this.submitScoreButton||!this.playerNameInput||!this.nameInputContainer)throw new Error("Required DOM elements not found")}initializeGame(){this.lastRenderTime=0,this.gameOver=!1,this.snake=[{x:10,y:10}],this.dx=0,this.dy=0,this.score=0,this.highScore=parseInt(localStorage.getItem("snakeHighScore"))||0,this.highScoreElement.textContent=this.highScore,this.food=this.getRandomFoodPosition(),this.goldenApple=null,this.goldenAppleTimer=null,this.lastDirectionChange=0,this.directionChangeThreshold=50,this.highScores=this.loadHighScores(),this.updateHighScoresList()}setupEventListeners(){this.boundHandleKeyPress=this.handleKeyPress.bind(this),this.boundStartNewGame=this.startNewGame.bind(this),this.boundGameLoop=this.gameLoop.bind(this),document.addEventListener("keydown",this.boundHandleKeyPress),this.playAgainButton.addEventListener("click",this.boundStartNewGame),document.getElementById("clearScoresButton").addEventListener("click",()=>{this.clearHighScores()})}cleanup(){this.goldenAppleTimer&&(clearTimeout(this.goldenAppleTimer),this.goldenAppleTimer=null),document.removeEventListener("keydown",this.boundHandleKeyPress),this.playAgainButton.removeEventListener("click",this.boundStartNewGame),document.getElementById("clearScoresButton").removeEventListener("click",this.clearHighScores)}handleKeyPress(t){if(this.gameOver){t.key==="Enter"&&(document.getElementById("nameInputContainer").style.display==="block"&&this.saveHighScore(this.score),this.startNewGame());return}const e=Date.now();if(e-this.lastDirectionChange<this.directionChangeThreshold)return;const n=this.snake[0];let i=n.x,o=n.y;switch(t.key){case"ArrowUp":this.dy===0&&(o=n.y-1,(this.snake.length<=1||o!==this.snake[1].y||i!==this.snake[1].x)&&(this.dx=0,this.dy=-1,this.lastDirectionChange=e));break;case"ArrowDown":this.dy===0&&(o=n.y+1,(this.snake.length<=1||o!==this.snake[1].y||i!==this.snake[1].x)&&(this.dx=0,this.dy=1,this.lastDirectionChange=e));break;case"ArrowLeft":this.dx===0&&(i=n.x-1,(this.snake.length<=1||o!==this.snake[1].y||i!==this.snake[1].x)&&(this.dx=-1,this.dy=0,this.lastDirectionChange=e));break;case"ArrowRight":this.dx===0&&(i=n.x+1,(this.snake.length<=1||o!==this.snake[1].y||i!==this.snake[1].x)&&(this.dx=1,this.dy=0,this.lastDirectionChange=e));break}}getRandomPosition(){let t,e=!1;for(;!e;){t={x:Math.floor(Math.random()*B.TILE_COUNT),y:Math.floor(Math.random()*B.TILE_COUNT)},e=!0;for(let n of this.snake)if(n.x===t.x&&n.y===t.y){e=!1;break}this.food&&t.x===this.food.x&&t.y===this.food.y&&(e=!1),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(e=!1)}return t}getRandomFoodPosition(){return{...this.getRandomPosition(),type:B.FRUITS[0]}}trySpawnGoldenApple(){if(!this.goldenApple&&Math.random()<B.GOLDEN_APPLE_CHANCE){const t=this.getRandomPosition();this.goldenApple={...t,type:B.FRUITS[1]},this.goldenAppleTimer=setTimeout(()=>{this.goldenApple=null},B.GOLDEN_APPLE_DURATION)}}update(){const t={x:this.snake[0].x+this.dx,y:this.snake[0].y+this.dy};this.snake.unshift(t);let e=!1;if(t.x===this.food.x&&t.y===this.food.y&&(this.score+=this.food.type.points,this.currentScoreElement.textContent=this.score,this.food=this.getRandomFoodPosition(),this.trySpawnGoldenApple(),e=!0),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(this.score+=this.goldenApple.type.points,this.currentScoreElement.textContent=this.score,clearTimeout(this.goldenAppleTimer),this.goldenApple=null,e=!0),e||this.snake.pop(),this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.highScore),this.highScoreElement.textContent=this.highScore),t.x<0||t.x>=B.TILE_COUNT||t.y<0||t.y>=B.TILE_COUNT){this.gameOver=!0,this.showGameOver();return}for(let n=1;n<this.snake.length;n++)if(t.x===this.snake[n].x&&t.y===this.snake[n].y){this.gameOver=!0,this.showGameOver();return}}render(){if(this.snake.length>0){this.ctx.fillStyle=B.COLORS.BACKGROUND,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.beginPath();const t={x:this.snake[0].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[0].y*B.GRID_SIZE+B.GRID_SIZE/2};this.ctx.moveTo(t.x,t.y);for(let N=0;N<this.snake.length-1;N++){const $={x:this.snake[N].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[N].y*B.GRID_SIZE+B.GRID_SIZE/2},K={x:this.snake[N+1].x*B.GRID_SIZE+B.GRID_SIZE/2,y:this.snake[N+1].y*B.GRID_SIZE+B.GRID_SIZE/2},Q=($.x+K.x)/2,et=($.y+K.y)/2;this.ctx.quadraticCurveTo($.x,$.y,Q,et)}this.ctx.shadowColor="rgba(0, 0, 0, 0.4)",this.ctx.shadowBlur=6,this.ctx.shadowOffsetX=2,this.ctx.shadowOffsetY=2;const e=this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height);e.addColorStop(0,B.COLORS.SNAKE_BASE),e.addColorStop(.3,B.COLORS.SNAKE_LIGHT),e.addColorStop(.6,B.COLORS.SNAKE_BASE),e.addColorStop(.9,B.COLORS.SNAKE_DARK),this.ctx.strokeStyle=e,this.ctx.lineWidth=B.GRID_SIZE-2,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.stroke(),this.ctx.shadowColor="transparent",this.ctx.shadowBlur=0,this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0;const n=this.snake[0],i=n.x*B.GRID_SIZE+B.GRID_SIZE/2,o=n.y*B.GRID_SIZE+B.GRID_SIZE/2,a=(B.GRID_SIZE-2)/2,l=this.ctx.createRadialGradient(i-a/2,o-a/2,a/4,i,o,a);l.addColorStop(0,B.COLORS.SNAKE_LIGHT),l.addColorStop(.7,B.COLORS.SNAKE_BASE),l.addColorStop(1,B.COLORS.SNAKE_DARK),this.ctx.beginPath(),this.ctx.fillStyle=l,this.ctx.arc(i,o,a,0,Math.PI*2),this.ctx.fill();const h=a*.5;let f=i-h,p=i+h,I=o,R=i,P=o,b=i,D=o;this.dx===1?(I=o-a*.3,R=i+a*.8,b=i+a+8):this.dx===-1?(I=o-a*.3,R=i-a*.8,b=i-a-8):this.dy===-1?(f=i-a*.3,p=i+a*.3,I=o-h,P=o-a*.8,D=o-a-8):this.dy===1&&(f=i-a*.3,p=i+a*.3,I=o+h,P=o+a*.8,D=o+a+8),this.ctx.fillStyle="#000",this.ctx.beginPath(),this.ctx.arc(f,I,2.5,0,Math.PI*2),this.ctx.arc(p,I,2.5,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.8)",this.ctx.beginPath(),this.ctx.arc(f-.5,I-.5,1,0,Math.PI*2),this.ctx.arc(p-.5,I-.5,1,0,Math.PI*2),this.ctx.fill(),(this.dx!==0||this.dy!==0)&&(this.ctx.strokeStyle=B.COLORS.TONGUE,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(R,P),this.ctx.lineTo(b,D),this.dx===1?(this.ctx.quadraticCurveTo(b+2,D,b+2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b+2,D,b+2,D+3)):this.dx===-1?(this.ctx.quadraticCurveTo(b-2,D,b-2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b-2,D,b-2,D+3)):this.dy===-1?(this.ctx.quadraticCurveTo(b,D-2,b-3,D-2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D-2,b+3,D-2)):this.dy===1&&(this.ctx.quadraticCurveTo(b,D+2,b-3,D+2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D+2,b+3,D+2)),this.ctx.stroke())}this.drawFruit(this.food),this.goldenApple&&this.drawFruit(this.goldenApple)}drawFruit(t){const e=t.x*B.GRID_SIZE,n=t.y*B.GRID_SIZE;this.ctx.fillStyle=t.type.color,this.ctx.beginPath(),this.ctx.arc(e+B.GRID_SIZE/2,n+B.GRID_SIZE/2,B.GRID_SIZE/2-2,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle=t.type.leafColor,this.ctx.beginPath(),this.ctx.ellipse(e+B.GRID_SIZE/2,n,4,8,Math.PI/4,0,Math.PI*2),this.ctx.fill()}gameLoop(t){try{if(this.gameOver||(window.requestAnimationFrame(this.boundGameLoop),(t-this.lastRenderTime)/1e3<1/B.GAME_SPEED))return;this.lastRenderTime=t,this.update(),this.render()}catch(e){console.error("Game loop error:",e),this.gameOver=!0,this.showGameOver()}}showGameOver(){this.cleanup(),this.finalScoreElement.textContent=this.score,this.finalHighScoreElement.textContent=this.highScore,this.nameInputContainer.style.display="block",this.modal.style.display="block",this.submitScoreButton.addEventListener("click",async()=>{const t=this.playerNameInput.value.trim();t&&(await this.saveScore(t,this.score),this.nameInputContainer.style.display="none")})}async startNewGame(){this.modal.style.display="none",this.nameInputContainer.style.display="none",this.playerNameInput.value="",this.initializeGame(),this.setupEventListeners(),await this.updateTopScores(),requestAnimationFrame(this.boundGameLoop)}initializePointsGuide(){document.querySelectorAll(".apple-icon").forEach((e,n)=>{const i=e.getContext("2d"),o=e.classList.contains("golden"),a={type:B.FRUITS[o?1:0]};i.fillStyle=a.type.color,i.beginPath(),i.arc(10,10,8,0,Math.PI*2),i.fill(),i.fillStyle=a.type.leafColor,i.beginPath(),i.ellipse(10,4,2,4,Math.PI/4,0,Math.PI*2),i.fill()})}loadHighScores(){try{const t=localStorage.getItem("snakeHighScores");return t?JSON.parse(t):[]}catch(t){return console.error("Error loading scores:",t),[]}}isTopScore(t){return this.highScores.length<3||t>this.highScores[this.highScores.length-1].score}saveHighScore(t){const e=document.getElementById("playerName"),n=e.value.trim();n.length>20&&(e.value=n.substring(0,20));const i={name:n||"Anonymous",score:t,date:new Date().toLocaleDateString()};this.highScores.push(i),this.highScores.sort((o,a)=>a.score-o.score),this.highScores=this.highScores.slice(0,3),localStorage.setItem("snakeHighScores",JSON.stringify(this.highScores)),this.updateHighScoresList()}updateHighScoresList(){const t=document.getElementById("topScores");t.innerHTML="",this.highScores.forEach((e,n)=>{const i=document.createElement("li");i.innerHTML=`
            <span class="player-name">${e.name}</span>
            <span class="score-value">${e.score} points</span>
            <span class="date">${e.date}</span>
        `,t.appendChild(i)})}clearHighScores(){localStorage.removeItem("snakeHighScores"),this.highScores=[],this.updateHighScoresList()}async saveScore(t,e){try{await um(Zo(ra,"highscores"),{name:t,score:e,timestamp:new Date}),await this.updateTopScores()}catch(n){console.error("Error saving score:",n)}}async updateTopScores(){try{const t=Zf(Zo(ra,"highscores"),tm("score","desc"),em(3)),n=(await cm(t)).docs.map(o=>({id:o.id,...o.data()})),i=document.getElementById("topScores");i.innerHTML=n.map(o=>`
        <li>${o.name}: ${o.score}</li>
      `).join("")}catch(t){console.error("Error fetching scores:",t)}}}window.onerror=function(r,t,e,n,i){console.error("Game error:",{message:r,source:t,lineno:e,colno:n,error:i});const o=window.gameInstance;return o&&(o.cleanup(),o.showGameOver()),!0};try{window.gameInstance=new pm,window.gameInstance.startNewGame()}catch(r){console.error("Failed to initialize game:",r)}
