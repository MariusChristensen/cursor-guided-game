(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const U={GRID_SIZE:20,TILE_COUNT:20,GAME_SPEED:13,FRAME_TIME:1e3/60,GOLDEN_APPLE_CHANCE:.15,GOLDEN_APPLE_DURATION:5e3,COLORS:{BACKGROUND:"#222831",SNAKE_BASE:"#3eb892",SNAKE_LIGHT:"#45c09c",SNAKE_DARK:"#39a885",TONGUE:"#ff1744"},FRUITS:[{name:"Apple",color:"#e63946",points:10,leafColor:"#2a9d8f"},{name:"Golden Apple",color:"#ffd700",points:50,leafColor:"#ff9f1c"}],MAX_NAME_LENGTH:20,MIN_NAME_LENGTH:1,ERRORS:{LOAD_SCORES:"Failed to load high scores",SAVE_SCORES:"Failed to save high scores"}};var lo={};/**
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
 */const ua=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Tu=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const o=r[e++];t[n++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=r[e++],a=r[e++],l=r[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[n++]=String.fromCharCode(55296+(h>>10)),t[n++]=String.fromCharCode(56320+(h&1023))}else{const o=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},la={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const o=r[s],a=s+1<r.length,l=a?r[s+1]:0,h=s+2<r.length,f=h?r[s+2]:0,p=o>>2,I=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,P=f&63;h||(P=64,a||(R=64)),n.push(e[p],e[I],e[R],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(ua(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Tu(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const o=e[r.charAt(s++)],l=s<r.length?e[r.charAt(s)]:0;++s;const f=s<r.length?e[r.charAt(s)]:64;++s;const I=s<r.length?e[r.charAt(s)]:64;if(++s,o==null||l==null||f==null||I==null)throw new vu;const R=o<<2|l>>4;if(n.push(R),f!==64){const P=l<<4&240|f>>2;if(n.push(P),I!==64){const b=f<<6&192|I;n.push(b)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class vu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Iu=function(r){const t=ua(r);return la.encodeByteArray(t,!0)},tr=function(r){return Iu(r).replace(/\./g,"")},Au=function(r){try{return la.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function wu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ru=()=>wu().__FIREBASE_DEFAULTS__,Su=()=>{if(typeof process>"u"||typeof lo>"u")return;const r=lo.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Cu=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&Au(r[1]);return t&&JSON.parse(t)},bs=()=>{try{return Ru()||Su()||Cu()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Pu=r=>{var t,e;return(e=(t=bs())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[r]},bu=r=>{const t=Pu(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},ha=()=>{var r;return(r=bs())===null||r===void 0?void 0:r.config};/**
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
 */class Vu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Du(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",s=r.iat||0,o=r.sub||r.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},r);return[tr(JSON.stringify(e)),tr(JSON.stringify(a)),""].join(".")}/**
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
 */function Nu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ku(){var r;const t=(r=bs())===null||r===void 0?void 0:r.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function xu(){return!ku()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ou(){try{return typeof indexedDB=="object"}catch{return!1}}function Lu(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
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
 */const Mu="FirebaseError";class Ve extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Mu,Object.setPrototypeOf(this,Ve.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,da.prototype.create)}}class da{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?Fu(o,n):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Ve(s,l,n)}}function Fu(r,t){return r.replace(Uu,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Uu=/\{\$([^}]+)}/g;function us(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const o=r[s],a=t[s];if(ho(o)&&ho(a)){if(!us(o,a))return!1}else if(o!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function ho(r){return r!==null&&typeof r=="object"}/**
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
 */class Bu{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new Vu;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t?.identifier),s=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Gu(t))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});n.resolve(o)}catch{}}}}clearInstance(t=se){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=se){return this.instances.has(t)}getOptions(t=se){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);n===l&&a.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),o=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:qu(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=se){return this.component?this.component.multipleInstances?t:se:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qu(r){return r===se?void 0:r}function Gu(r){return r.instantiationMode==="EAGER"}/**
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
 */class ju{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Bu(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var j;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(j||(j={}));const zu={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},$u=j.INFO,Ku={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Hu=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=Ku[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class fa{constructor(t){this.name=t,this._logLevel=$u,this._logHandler=Hu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?zu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}}const Qu=(r,t)=>t.some(e=>r instanceof e);let fo,mo;function Wu(){return fo||(fo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xu(){return mo||(mo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ma=new WeakMap,ls=new WeakMap,pa=new WeakMap,Yr=new WeakMap,Vs=new WeakMap;function Yu(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",o),r.removeEventListener("error",a)},o=()=>{e(zt(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",o),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ma.set(e,r)}).catch(()=>{}),Vs.set(t,r),t}function Ju(r){if(ls.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",o),r.removeEventListener("error",a),r.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",o),r.addEventListener("error",a),r.addEventListener("abort",a)});ls.set(r,t)}let hs={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return ls.get(r);if(t==="objectStoreNames")return r.objectStoreNames||pa.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return zt(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function Zu(r){hs=r(hs)}function tl(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(Jr(this),t,...e);return pa.set(n,t.sort?t.sort():[t]),zt(n)}:Xu().includes(r)?function(...t){return r.apply(Jr(this),t),zt(ma.get(this))}:function(...t){return zt(r.apply(Jr(this),t))}}function el(r){return typeof r=="function"?tl(r):(r instanceof IDBTransaction&&Ju(r),Qu(r,Wu())?new Proxy(r,hs):r)}function zt(r){if(r instanceof IDBRequest)return Yu(r);if(Yr.has(r))return Yr.get(r);const t=el(r);return t!==r&&(Yr.set(r,t),Vs.set(t,r)),t}const Jr=r=>Vs.get(r);function nl(r,t,{blocked:e,upgrade:n,blocking:s,terminated:o}={}){const a=indexedDB.open(r,t),l=zt(a);return n&&a.addEventListener("upgradeneeded",h=>{n(zt(a.result),h.oldVersion,h.newVersion,zt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const rl=["get","getKey","getAll","getAllKeys","count"],sl=["put","add","delete","clear"],Zr=new Map;function po(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(Zr.get(t))return Zr.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=sl.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||rl.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return n&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),s&&h.done]))[0]};return Zr.set(t,o),o}Zu(r=>({...r,get:(t,e,n)=>po(t,e)||r.get(t,e,n),has:(t,e)=>!!po(t,e)||r.has(t,e)}));/**
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
 */class il{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(ol(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function ol(r){const t=r.getComponent();return t?.type==="VERSION"}const ds="@firebase/app",go="0.10.17";/**
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
 */const Lt=new fa("@firebase/app"),al="@firebase/app-compat",cl="@firebase/analytics-compat",ul="@firebase/analytics",ll="@firebase/app-check-compat",hl="@firebase/app-check",dl="@firebase/auth",fl="@firebase/auth-compat",ml="@firebase/database",pl="@firebase/data-connect",gl="@firebase/database-compat",_l="@firebase/functions",yl="@firebase/functions-compat",El="@firebase/installations",Tl="@firebase/installations-compat",vl="@firebase/messaging",Il="@firebase/messaging-compat",Al="@firebase/performance",wl="@firebase/performance-compat",Rl="@firebase/remote-config",Sl="@firebase/remote-config-compat",Cl="@firebase/storage",Pl="@firebase/storage-compat",bl="@firebase/firestore",Vl="@firebase/vertexai",Dl="@firebase/firestore-compat",Nl="firebase",kl="11.1.0";/**
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
 */const fs="[DEFAULT]",xl={[ds]:"fire-core",[al]:"fire-core-compat",[ul]:"fire-analytics",[cl]:"fire-analytics-compat",[hl]:"fire-app-check",[ll]:"fire-app-check-compat",[dl]:"fire-auth",[fl]:"fire-auth-compat",[ml]:"fire-rtdb",[pl]:"fire-data-connect",[gl]:"fire-rtdb-compat",[_l]:"fire-fn",[yl]:"fire-fn-compat",[El]:"fire-iid",[Tl]:"fire-iid-compat",[vl]:"fire-fcm",[Il]:"fire-fcm-compat",[Al]:"fire-perf",[wl]:"fire-perf-compat",[Rl]:"fire-rc",[Sl]:"fire-rc-compat",[Cl]:"fire-gcs",[Pl]:"fire-gcs-compat",[bl]:"fire-fst",[Dl]:"fire-fst-compat",[Vl]:"fire-vertex","fire-js":"fire-js",[Nl]:"fire-js-all"};/**
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
 */const er=new Map,Ol=new Map,ms=new Map;function _o(r,t){try{r.container.addComponent(t)}catch(e){Lt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function nr(r){const t=r.name;if(ms.has(t))return Lt.debug(`There were multiple attempts to register component ${t}.`),!1;ms.set(t,r);for(const e of er.values())_o(e,r);for(const e of Ol.values())_o(e,r);return!0}function Ll(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}/**
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
 */const Ml={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new da("app","Firebase",Ml);/**
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
 */class Fl{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
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
 */const Ul=kl;function ga(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n=Object.assign({name:fs,automaticDataCollectionEnabled:!1},t),s=n.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(e||(e=ha()),!e)throw $t.create("no-options");const o=er.get(s);if(o){if(us(e,o.options)&&us(n,o.config))return o;throw $t.create("duplicate-app",{appName:s})}const a=new ju(s);for(const h of ms.values())a.addComponent(h);const l=new Fl(e,n,a);return er.set(s,l),l}function Bl(r=fs){const t=er.get(r);if(!t&&r===fs&&ha())return ga();if(!t)throw $t.create("no-app",{appName:r});return t}function Te(r,t,e){var n;let s=(n=xl[r])!==null&&n!==void 0?n:r;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const l=[`Unable to register library "${s}" with version "${t}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Lt.warn(l.join(" "));return}nr(new an(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const ql="firebase-heartbeat-database",Gl=1,cn="firebase-heartbeat-store";let ts=null;function _a(){return ts||(ts=nl(ql,Gl,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(cn)}catch(e){console.warn(e)}}}}).catch(r=>{throw $t.create("idb-open",{originalErrorMessage:r.message})})),ts}async function jl(r){try{const e=(await _a()).transaction(cn),n=await e.objectStore(cn).get(ya(r));return await e.done,n}catch(t){if(t instanceof Ve)Lt.warn(t.message);else{const e=$t.create("idb-get",{originalErrorMessage:t?.message});Lt.warn(e.message)}}}async function yo(r,t){try{const n=(await _a()).transaction(cn,"readwrite");await n.objectStore(cn).put(t,ya(r)),await n.done}catch(e){if(e instanceof Ve)Lt.warn(e.message);else{const n=$t.create("idb-set",{originalErrorMessage:e?.message});Lt.warn(n.message)}}}function ya(r){return`${r.name}!${r.options.appId}`}/**
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
 */const zl=1024,$l=30*24*60*60*1e3;class Kl{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ql(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Eo();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=$l}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Lt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Eo(),{heartbeatsToSend:n,unsentEntries:s}=Hl(this._heartbeatsCache.heartbeats),o=tr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Lt.warn(e),""}}}function Eo(){return new Date().toISOString().substring(0,10)}function Hl(r,t=zl){const e=[];let n=r.slice();for(const s of r){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),To(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),To(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class Ql{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ou()?Lu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await jl(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function To(r){return tr(JSON.stringify({version:2,heartbeats:r})).length}/**
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
 */function Wl(r){nr(new an("platform-logger",t=>new il(t),"PRIVATE")),nr(new an("heartbeat",t=>new Kl(t),"PRIVATE")),Te(ds,go,r),Te(ds,go,"esm2017"),Te("fire-js","")}Wl("");var vo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var oe,Ea;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,m){function _(){}_.prototype=m.prototype,T.D=m.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(y,E,A){for(var g=Array(arguments.length-2),kt=2;kt<arguments.length;kt++)g[kt-2]=arguments[kt];return m.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,m,_){_||(_=0);var y=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)y[E]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=T.g[0],_=T.g[1],E=T.g[2];var A=T.g[3],g=m+(A^_&(E^A))+y[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[2]+606105819&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[6]+2821735955&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[10]+4294925233&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(A^_&(E^A))+y[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(E^m&(_^E))+y[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(_^A&(m^_))+y[14]+2792965006&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(m^E&(A^m))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(E^A&(_^E))+y[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[11]+643717713&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[15]+3634488961&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[3]+4107603335&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(_^E))+y[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(m^_))+y[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(A^m))+y[7]+1735328473&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(E^A))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(_^E^A)+y[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[11]+1839030562&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[7]+4139469664&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[3]+3572445317&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^A)+y[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^E)+y[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^_)+y[15]+530742520&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^m)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(E^(_|~A))+y[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[14]+2878612391&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[10]+4293915773&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[6]+2734768916&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~A))+y[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~E))+y[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~_))+y[2]+718787259&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~m))+y[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}n.prototype.u=function(T,m){m===void 0&&(m=T.length);for(var _=m-this.blockSize,y=this.B,E=this.h,A=0;A<m;){if(E==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(y[E++]=T.charCodeAt(A++),E==this.blockSize){s(this,y),E=0;break}}else for(;A<m;)if(y[E++]=T[A++],E==this.blockSize){s(this,y),E=0;break}}this.h=E,this.o+=m},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;var _=8*this.o;for(m=T.length-8;m<T.length;++m)T[m]=_&255,_/=256;for(this.u(T),T=Array(16),m=_=0;4>m;++m)for(var y=0;32>y;y+=8)T[_++]=this.g[m]>>>y&255;return T};function o(T,m){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=m(T)}function a(T,m){this.h=m;for(var _=[],y=!0,E=T.length-1;0<=E;E--){var A=T[E]|0;y&&A==m||(_[E]=A,y=!1)}this.g=_}var l={};function h(T){return-128<=T&&128>T?o(T,function(m){return new a([m|0],0>m?-1:0)}):new a([T|0],0>T?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return I;if(0>T)return N(f(-T));for(var m=[],_=1,y=0;T>=_;y++)m[y]=T/_|0,_*=4294967296;return new a(m,0)}function p(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return N(p(T.substring(1),m));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(m,8)),y=I,E=0;E<T.length;E+=8){var A=Math.min(8,T.length-E),g=parseInt(T.substring(E,E+A),m);8>A?(A=f(Math.pow(m,A)),y=y.j(A).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var I=h(0),R=h(1),P=h(16777216);r=a.prototype,r.m=function(){if(D(this))return-N(this).m();for(var T=0,m=1,_=0;_<this.g.length;_++){var y=this.i(_);T+=(0<=y?y:4294967296+y)*m,m*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(D(this))return"-"+N(this).toString(T);for(var m=f(Math.pow(T,6)),_=this,y="";;){var E=et(_,m).g;_=z(_,E.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=E,b(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(var m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function D(T){return T.h==-1}r.l=function(T){return T=z(this,T),D(T)?-1:b(T)?0:1};function N(T){for(var m=T.g.length,_=[],y=0;y<m;y++)_[y]=~T.g[y];return new a(_,~T.h).add(R)}r.abs=function(){return D(this)?N(this):this},r.add=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0,E=0;E<=m;E++){var A=y+(this.i(E)&65535)+(T.i(E)&65535),g=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);y=g>>>16,A&=65535,g&=65535,_[E]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function z(T,m){return T.add(N(m))}r.j=function(T){if(b(this)||b(T))return I;if(D(this))return D(T)?N(this).j(N(T)):N(N(this).j(T));if(D(T))return N(this.j(N(T)));if(0>this.l(P)&&0>T.l(P))return f(this.m()*T.m());for(var m=this.g.length+T.g.length,_=[],y=0;y<2*m;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<T.g.length;E++){var A=this.i(y)>>>16,g=this.i(y)&65535,kt=T.i(E)>>>16,Le=T.i(E)&65535;_[2*y+2*E]+=g*Le,K(_,2*y+2*E),_[2*y+2*E+1]+=A*Le,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*kt,K(_,2*y+2*E+1),_[2*y+2*E+2]+=A*kt,K(_,2*y+2*E+2)}for(y=0;y<m;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=m;y<2*m;y++)_[y]=0;return new a(_,0)};function K(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function Q(T,m){this.g=T,this.h=m}function et(T,m){if(b(m))throw Error("division by zero");if(b(T))return new Q(I,I);if(D(T))return m=et(N(T),m),new Q(N(m.g),N(m.h));if(D(m))return m=et(T,N(m)),new Q(N(m.g),m.h);if(30<T.g.length){if(D(T)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=m;0>=y.l(T);)_=Nt(_),y=Nt(y);var E=at(_,1),A=at(y,1);for(y=at(y,2),_=at(_,2);!b(y);){var g=A.add(y);0>=g.l(T)&&(E=E.add(_),A=g),y=at(y,1),_=at(_,1)}return m=z(T,E.j(m)),new Q(E,m)}for(E=I;0<=T.l(m);){for(_=Math.max(1,Math.floor(T.m()/m.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=f(_),g=A.j(m);D(g)||0<g.l(T);)_-=y,A=f(_),g=A.j(m);b(A)&&(A=R),E=E.add(A),T=z(T,g)}return new Q(E,T)}r.A=function(T){return et(this,T).h},r.and=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)&T.i(y);return new a(_,this.h&T.h)},r.or=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)|T.i(y);return new a(_,this.h|T.h)},r.xor=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)^T.i(y);return new a(_,this.h^T.h)};function Nt(T){for(var m=T.g.length+1,_=[],y=0;y<m;y++)_[y]=T.i(y)<<1|T.i(y-1)>>>31;return new a(_,T.h)}function at(T,m){var _=m>>5;m%=32;for(var y=T.g.length-_,E=[],A=0;A<y;A++)E[A]=0<m?T.i(A+_)>>>m|T.i(A+_+1)<<32-m:T.i(A+_);return new a(E,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Ea=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,oe=a}).apply(typeof vo<"u"?vo:typeof self<"u"?self:typeof window<"u"?window:{});var Bn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ta,Ze,va,Qn,ps,Ia,Aa,wa;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,u){return i==Array.prototype||i==Object.prototype||(i[c]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bn=="object"&&Bn];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var n=e(this);function s(i,c){if(c)t:{var u=n;i=i.split(".");for(var d=0;d<i.length-1;d++){var v=i[d];if(!(v in u))break t;u=u[v]}i=i[i.length-1],d=u[i],c=c(d),c!=d&&c!=null&&t(u,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var u=0,d=!1,v={next:function(){if(!d&&u<i.length){var w=u++;return{value:c(w,i[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}s("Array.prototype.values",function(i){return i||function(){return o(this,function(c,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function h(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function f(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function p(i,c,u){return i.call.apply(i.bind,arguments)}function I(i,c,u){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,d),i.apply(c,v)}}return function(){return i.apply(c,arguments)}}function R(i,c,u){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:I,R.apply(null,arguments)}function P(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function b(i,c){function u(){}u.prototype=c.prototype,i.aa=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(d,v,w){for(var V=Array(arguments.length-2),W=2;W<arguments.length;W++)V[W-2]=arguments[W];return c.prototype[v].apply(d,V)}}function D(i){const c=i.length;if(0<c){const u=Array(c);for(let d=0;d<c;d++)u[d]=i[d];return u}return[]}function N(i,c){for(let u=1;u<arguments.length;u++){const d=arguments[u];if(h(d)){const v=i.length||0,w=d.length||0;i.length=v+w;for(let V=0;V<w;V++)i[v+V]=d[V]}else i.push(d)}}class z{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(i){return/^[\s\xa0]*$/.test(i)}function Q(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function et(i){return et[" "](i),i}et[" "]=function(){};var Nt=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function at(i,c,u){for(const d in i)c.call(u,i[d],d,i)}function T(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function m(i){const c={};for(const u in i)c[u]=i[u];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,c){let u,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(u in d)i[u]=d[u];for(let w=0;w<_.length;w++)u=_[w],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function E(i){var c=1;i=i.split(":");const u=[];for(;0<c&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function A(i){l.setTimeout(()=>{throw i},0)}function g(){var i=Cr;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class kt{constructor(){this.h=this.g=null}add(c,u){const d=Le.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var Le=new z(()=>new Uc,i=>i.reset());class Uc{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Me,Fe=!1,Cr=new kt,li=()=>{const i=l.Promise.resolve(void 0);Me=()=>{i.then(Bc)}};var Bc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(u){A(u)}var c=Le;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}Fe=!1};function Ut(){this.s=this.s,this.C=this.C}Ut.prototype.s=!1,Ut.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ut.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var qc=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};l.addEventListener("test",u,c),l.removeEventListener("test",u,c)}catch{}return i}();function Ue(i,c){if(dt.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(Nt){t:{try{et(c.nodeName);var v=!0;break t}catch{}v=!1}v||(c=null)}}else u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Gc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Ue.aa.h.call(this)}}b(Ue,dt);var Gc={2:"touch",3:"pen",4:"mouse"};Ue.prototype.h=function(){Ue.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var vn="closure_listenable_"+(1e6*Math.random()|0),jc=0;function zc(i,c,u,d,v){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=v,this.key=++jc,this.da=this.fa=!1}function In(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function An(i){this.src=i,this.g={},this.h=0}An.prototype.add=function(i,c,u,d,v){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var V=br(i,c,d,v);return-1<V?(c=i[V],u||(c.fa=!1)):(c=new zc(c,this.src,w,!!d,v),c.fa=u,i.push(c)),c};function Pr(i,c){var u=c.type;if(u in i.g){var d=i.g[u],v=Array.prototype.indexOf.call(d,c,void 0),w;(w=0<=v)&&Array.prototype.splice.call(d,v,1),w&&(In(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function br(i,c,u,d){for(var v=0;v<i.length;++v){var w=i[v];if(!w.da&&w.listener==c&&w.capture==!!u&&w.ha==d)return v}return-1}var Vr="closure_lm_"+(1e6*Math.random()|0),Dr={};function hi(i,c,u,d,v){if(Array.isArray(c)){for(var w=0;w<c.length;w++)hi(i,c[w],u,d,v);return null}return u=mi(u),i&&i[vn]?i.K(c,u,f(d)?!!d.capture:!!d,v):$c(i,c,u,!1,d,v)}function $c(i,c,u,d,v,w){if(!c)throw Error("Invalid event type");var V=f(v)?!!v.capture:!!v,W=kr(i);if(W||(i[Vr]=W=new An(i)),u=W.add(c,u,d,V,w),u.proxy)return u;if(d=Kc(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)qc||(v=V),v===void 0&&(v=!1),i.addEventListener(c.toString(),d,v);else if(i.attachEvent)i.attachEvent(fi(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Kc(){function i(u){return c.call(i.src,i.listener,u)}const c=Hc;return i}function di(i,c,u,d,v){if(Array.isArray(c))for(var w=0;w<c.length;w++)di(i,c[w],u,d,v);else d=f(d)?!!d.capture:!!d,u=mi(u),i&&i[vn]?(i=i.i,c=String(c).toString(),c in i.g&&(w=i.g[c],u=br(w,u,d,v),-1<u&&(In(w[u]),Array.prototype.splice.call(w,u,1),w.length==0&&(delete i.g[c],i.h--)))):i&&(i=kr(i))&&(c=i.g[c.toString()],i=-1,c&&(i=br(c,u,d,v)),(u=-1<i?c[i]:null)&&Nr(u))}function Nr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[vn])Pr(c.i,i);else{var u=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(u,d,i.capture):c.detachEvent?c.detachEvent(fi(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=kr(c))?(Pr(u,i),u.h==0&&(u.src=null,c[Vr]=null)):In(i)}}}function fi(i){return i in Dr?Dr[i]:Dr[i]="on"+i}function Hc(i,c){if(i.da)i=!0;else{c=new Ue(c,this);var u=i.listener,d=i.ha||i.src;i.fa&&Nr(i),i=u.call(d,c)}return i}function kr(i){return i=i[Vr],i instanceof An?i:null}var xr="__closure_events_fn_"+(1e9*Math.random()>>>0);function mi(i){return typeof i=="function"?i:(i[xr]||(i[xr]=function(c){return i.handleEvent(c)}),i[xr])}function ft(){Ut.call(this),this.i=new An(this),this.M=this,this.F=null}b(ft,Ut),ft.prototype[vn]=!0,ft.prototype.removeEventListener=function(i,c,u,d){di(this,i,c,u,d)};function Et(i,c){var u,d=i.F;if(d)for(u=[];d;d=d.F)u.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new dt(c,i);else if(c instanceof dt)c.target=c.target||i;else{var v=c;c=new dt(d,i),y(c,v)}if(v=!0,u)for(var w=u.length-1;0<=w;w--){var V=c.g=u[w];v=wn(V,d,!0,c)&&v}if(V=c.g=i,v=wn(V,d,!0,c)&&v,v=wn(V,d,!1,c)&&v,u)for(w=0;w<u.length;w++)V=c.g=u[w],v=wn(V,d,!1,c)&&v}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var u=i.g[c],d=0;d<u.length;d++)In(u[d]);delete i.g[c],i.h--}}this.F=null},ft.prototype.K=function(i,c,u,d){return this.i.add(String(i),c,!1,u,d)},ft.prototype.L=function(i,c,u,d){return this.i.add(String(i),c,!0,u,d)};function wn(i,c,u,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var v=!0,w=0;w<c.length;++w){var V=c[w];if(V&&!V.da&&V.capture==u){var W=V.listener,ct=V.ha||V.src;V.fa&&Pr(i.i,V),v=W.call(ct,d)!==!1&&v}}return v&&!d.defaultPrevented}function pi(i,c,u){if(typeof i=="function")u&&(i=R(i,u));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(i,c||0)}function gi(i){i.g=pi(()=>{i.g=null,i.i&&(i.i=!1,gi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Qc extends Ut{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:gi(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Be(i){Ut.call(this),this.h=i,this.g={}}b(Be,Ut);var _i=[];function yi(i){at(i.g,function(c,u){this.g.hasOwnProperty(u)&&Nr(c)},i),i.g={}}Be.prototype.N=function(){Be.aa.N.call(this),yi(this)},Be.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Or=l.JSON.stringify,Wc=l.JSON.parse,Xc=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function Lr(){}Lr.prototype.h=null;function Ei(i){return i.h||(i.h=i.i())}function Ti(){}var qe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Mr(){dt.call(this,"d")}b(Mr,dt);function Fr(){dt.call(this,"c")}b(Fr,dt);var te={},vi=null;function Rn(){return vi=vi||new ft}te.La="serverreachability";function Ii(i){dt.call(this,te.La,i)}b(Ii,dt);function Ge(i){const c=Rn();Et(c,new Ii(c))}te.STAT_EVENT="statevent";function Ai(i,c){dt.call(this,te.STAT_EVENT,i),this.stat=c}b(Ai,dt);function Tt(i){const c=Rn();Et(c,new Ai(c,i))}te.Ma="timingevent";function wi(i,c){dt.call(this,te.Ma,i),this.size=c}b(wi,dt);function je(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},c)}function ze(){this.g=!0}ze.prototype.xa=function(){this.g=!1};function Yc(i,c,u,d,v,w){i.info(function(){if(i.g)if(w)for(var V="",W=w.split("&"),ct=0;ct<W.length;ct++){var $=W[ct].split("=");if(1<$.length){var mt=$[0];$=$[1];var pt=mt.split("_");V=2<=pt.length&&pt[1]=="type"?V+(mt+"="+$+"&"):V+(mt+"=redacted&")}}else V=null;else V=w;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+c+`
`+u+`
`+V})}function Jc(i,c,u,d,v,w,V){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+c+`
`+u+`
`+w+" "+V})}function de(i,c,u,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+tu(i,u)+(d?" "+d:"")})}function Zc(i,c){i.info(function(){return"TIMEOUT: "+c})}ze.prototype.info=function(){};function tu(i,c){if(!i.g)return c;if(!c)return null;try{var u=JSON.parse(c);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var d=u[i];if(!(2>d.length)){var v=d[1];if(Array.isArray(v)&&!(1>v.length)){var w=v[0];if(w!="noop"&&w!="stop"&&w!="close")for(var V=1;V<v.length;V++)v[V]=""}}}}return Or(u)}catch{return c}}var Sn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ri={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ur;function Cn(){}b(Cn,Lr),Cn.prototype.g=function(){return new XMLHttpRequest},Cn.prototype.i=function(){return{}},Ur=new Cn;function Bt(i,c,u,d){this.j=i,this.i=c,this.l=u,this.R=d||1,this.U=new Be(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Si}function Si(){this.i=null,this.g="",this.h=!1}var Ci={},Br={};function qr(i,c,u){i.L=1,i.v=Dn(xt(c)),i.m=u,i.P=!0,Pi(i,null)}function Pi(i,c){i.F=Date.now(),Pn(i),i.A=xt(i.v);var u=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),Gi(u.i,"t",d),i.C=0,u=i.j.J,i.h=new Si,i.g=oo(i.j,u?c:null,!i.m),0<i.O&&(i.M=new Qc(R(i.Y,i,i.g),i.O)),c=i.U,u=i.g,d=i.ca;var v="readystatechange";Array.isArray(v)||(v&&(_i[0]=v.toString()),v=_i);for(var w=0;w<v.length;w++){var V=hi(u,v[w],d||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=i.H?m(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),Ge(),Yc(i.i,i.u,i.A,i.l,i.R,i.m)}Bt.prototype.ca=function(i){i=i.target;const c=this.M;c&&Ot(i)==3?c.j():this.Y(i)},Bt.prototype.Y=function(i){try{if(i==this.g)t:{const pt=Ot(this.g);var c=this.g.Ba();const pe=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Wi(this.g)))){this.J||pt!=4||c==7||(c==8||0>=pe?Ge(3):Ge(2)),Gr(this);var u=this.g.Z();this.X=u;e:if(bi(this)){var d=Wi(this.g);i="";var v=d.length,w=Ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ee(this),$e(this);var V="";break e}this.h.i=new l.TextDecoder}for(c=0;c<v;c++)this.h.h=!0,i+=this.h.i.decode(d[c],{stream:!(w&&c==v-1)});d.length=0,this.h.g+=i,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=u==200,Jc(this.i,this.u,this.A,this.l,this.R,pt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ct=this.g;if((W=ct.g?ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var $=W;break e}}$=null}if(u=$)de(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,jr(this,u);else{this.o=!1,this.s=3,Tt(12),ee(this),$e(this);break t}}if(this.P){u=!0;let Rt;for(;!this.J&&this.C<V.length;)if(Rt=eu(this,V),Rt==Br){pt==4&&(this.s=4,Tt(14),u=!1),de(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==Ci){this.s=4,Tt(15),de(this.i,this.l,V,"[Invalid Chunk]"),u=!1;break}else de(this.i,this.l,Rt,null),jr(this,Rt);if(bi(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||V.length!=0||this.h.h||(this.s=1,Tt(16),u=!1),this.o=this.o&&u,!u)de(this.i,this.l,V,"[Invalid Chunked Response]"),ee(this),$e(this);else if(0<V.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Wr(mt),mt.M=!0,Tt(11))}}else de(this.i,this.l,V,null),jr(this,V);pt==4&&ee(this),this.o&&!this.J&&(pt==4?no(this.j,this):(this.o=!1,Pn(this)))}else yu(this.g),u==400&&0<V.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),ee(this),$e(this)}}}catch{}finally{}};function bi(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function eu(i,c){var u=i.C,d=c.indexOf(`
`,u);return d==-1?Br:(u=Number(c.substring(u,d)),isNaN(u)?Ci:(d+=1,d+u>c.length?Br:(c=c.slice(d,d+u),i.C=d+u,c)))}Bt.prototype.cancel=function(){this.J=!0,ee(this)};function Pn(i){i.S=Date.now()+i.I,Vi(i,i.I)}function Vi(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=je(R(i.ba,i),c)}function Gr(i){i.B&&(l.clearTimeout(i.B),i.B=null)}Bt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Zc(this.i,this.A),this.L!=2&&(Ge(),Tt(17)),ee(this),this.s=2,$e(this)):Vi(this,this.S-i)};function $e(i){i.j.G==0||i.J||no(i.j,i)}function ee(i){Gr(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,yi(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function jr(i,c){try{var u=i.j;if(u.G!=0&&(u.g==i||zr(u.h,i))){if(!i.K&&zr(u.h,i)&&u.G==3){try{var d=u.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)Mn(u),On(u);else break t;Qr(u),Tt(18)}}else u.za=v[1],0<u.za-u.T&&37500>v[2]&&u.F&&u.v==0&&!u.C&&(u.C=je(R(u.Za,u),6e3));if(1>=ki(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else re(u,11)}else if((i.K||u.g==i)&&Mn(u),!K(c))for(v=u.Da.g.parse(c),c=0;c<v.length;c++){let $=v[c];if(u.T=$[0],$=$[1],u.G==2)if($[0]=="c"){u.K=$[1],u.ia=$[2];const mt=$[3];mt!=null&&(u.la=mt,u.j.info("VER="+u.la));const pt=$[4];pt!=null&&(u.Aa=pt,u.j.info("SVER="+u.Aa));const pe=$[5];pe!=null&&typeof pe=="number"&&0<pe&&(d=1.5*pe,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Rt=i.g;if(Rt){const Un=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Un){var w=d.h;w.g||Un.indexOf("spdy")==-1&&Un.indexOf("quic")==-1&&Un.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&($r(w,w.h),w.h=null))}if(d.D){const Xr=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Xr&&(d.ya=Xr,X(d.I,d.D,Xr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var V=i;if(d.qa=io(d,d.J?d.ia:null,d.W),V.K){xi(d.h,V);var W=V,ct=d.L;ct&&(W.I=ct),W.B&&(Gr(W),Pn(W)),d.g=V}else to(d);0<u.i.length&&Ln(u)}else $[0]!="stop"&&$[0]!="close"||re(u,7);else u.G==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?re(u,7):Hr(u):$[0]!="noop"&&u.l&&u.l.ta($),u.v=0)}}Ge(4)}catch{}}var nu=class{constructor(i,c){this.g=i,this.map=c}};function Di(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ni(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ki(i){return i.h?1:i.g?i.g.size:0}function zr(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function $r(i,c){i.g?i.g.add(c):i.h=c}function xi(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}Di.prototype.cancel=function(){if(this.i=Oi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Oi(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.D);return c}return D(i.i)}function ru(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var c=[],u=i.length,d=0;d<u;d++)c.push(i[d]);return c}c=[],u=0;for(d in i)c[u++]=i[d];return c}function su(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var c=[];i=i.length;for(var u=0;u<i;u++)c.push(u);return c}c=[],u=0;for(const d in i)c[u++]=d;return c}}}function Li(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var u=su(i),d=ru(i),v=d.length,w=0;w<v;w++)c.call(void 0,d[w],u&&u[w],i)}var Mi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function iu(i,c){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var d=i[u].indexOf("="),v=null;if(0<=d){var w=i[u].substring(0,d);v=i[u].substring(d+1)}else w=i[u];c(w,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function ne(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof ne){this.h=i.h,bn(this,i.j),this.o=i.o,this.g=i.g,Vn(this,i.s),this.l=i.l;var c=i.i,u=new Qe;u.i=c.i,c.g&&(u.g=new Map(c.g),u.h=c.h),Fi(this,u),this.m=i.m}else i&&(c=String(i).match(Mi))?(this.h=!1,bn(this,c[1]||"",!0),this.o=Ke(c[2]||""),this.g=Ke(c[3]||"",!0),Vn(this,c[4]),this.l=Ke(c[5]||"",!0),Fi(this,c[6]||"",!0),this.m=Ke(c[7]||"")):(this.h=!1,this.i=new Qe(null,this.h))}ne.prototype.toString=function(){var i=[],c=this.j;c&&i.push(He(c,Ui,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(He(c,Ui,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(He(u,u.charAt(0)=="/"?cu:au,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",He(u,lu)),i.join("")};function xt(i){return new ne(i)}function bn(i,c,u){i.j=u?Ke(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function Vn(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function Fi(i,c,u){c instanceof Qe?(i.i=c,hu(i.i,i.h)):(u||(c=He(c,uu)),i.i=new Qe(c,i.h))}function X(i,c,u){i.i.set(c,u)}function Dn(i){return X(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Ke(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function He(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,ou),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ou(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ui=/[#\/\?@]/g,au=/[#\?:]/g,cu=/[#\?]/g,uu=/[#\?@]/g,lu=/#/g;function Qe(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function qt(i){i.g||(i.g=new Map,i.h=0,i.i&&iu(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}r=Qe.prototype,r.add=function(i,c){qt(this),this.i=null,i=fe(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function Bi(i,c){qt(i),c=fe(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function qi(i,c){return qt(i),c=fe(i,c),i.g.has(c)}r.forEach=function(i,c){qt(this),this.g.forEach(function(u,d){u.forEach(function(v){i.call(c,v,d,this)},this)},this)},r.na=function(){qt(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),u=[];for(let d=0;d<c.length;d++){const v=i[d];for(let w=0;w<v.length;w++)u.push(c[d])}return u},r.V=function(i){qt(this);let c=[];if(typeof i=="string")qi(this,i)&&(c=c.concat(this.g.get(fe(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)c=c.concat(i[u])}return c},r.set=function(i,c){return qt(this),this.i=null,i=fe(this,i),qi(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},r.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function Gi(i,c,u){Bi(i,c),0<u.length&&(i.i=null,i.g.set(fe(i,c),D(u)),i.h+=u.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var u=0;u<c.length;u++){var d=c[u];const w=encodeURIComponent(String(d)),V=this.V(d);for(d=0;d<V.length;d++){var v=w;V[d]!==""&&(v+="="+encodeURIComponent(String(V[d]))),i.push(v)}}return this.i=i.join("&")};function fe(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function hu(i,c){c&&!i.j&&(qt(i),i.i=null,i.g.forEach(function(u,d){var v=d.toLowerCase();d!=v&&(Bi(this,d),Gi(this,v,u))},i)),i.j=c}function du(i,c){const u=new ze;if(l.Image){const d=new Image;d.onload=P(Gt,u,"TestLoadImage: loaded",!0,c,d),d.onerror=P(Gt,u,"TestLoadImage: error",!1,c,d),d.onabort=P(Gt,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=P(Gt,u,"TestLoadImage: timeout",!1,c,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function fu(i,c){const u=new ze,d=new AbortController,v=setTimeout(()=>{d.abort(),Gt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(w=>{clearTimeout(v),w.ok?Gt(u,"TestPingServer: ok",!0,c):Gt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),Gt(u,"TestPingServer: error",!1,c)})}function Gt(i,c,u,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(u)}catch{}}function mu(){this.g=new Xc}function pu(i,c,u){const d=u||"";try{Li(i,function(v,w){let V=v;f(v)&&(V=Or(v)),c.push(d+w+"="+encodeURIComponent(V))})}catch(v){throw c.push(d+"type="+encodeURIComponent("_badmap")),v}}function Nn(i){this.l=i.Ub||null,this.j=i.eb||!1}b(Nn,Lr),Nn.prototype.g=function(){return new kn(this.l,this.j)},Nn.prototype.i=function(i){return function(){return i}}({});function kn(i,c){ft.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(kn,ft),r=kn.prototype,r.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,Xe(this)},r.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,We(this)),this.readyState=0},r.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Xe(this)),this.g&&(this.readyState=3,Xe(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ji(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function ji(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}r.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?We(this):Xe(this),this.readyState==3&&ji(this)}},r.Ra=function(i){this.g&&(this.response=this.responseText=i,We(this))},r.Qa=function(i){this.g&&(this.response=i,We(this))},r.ga=function(){this.g&&We(this)};function We(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Xe(i)}r.setRequestHeader=function(i,c){this.u.append(i,c)},r.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function Xe(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(kn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function zi(i){let c="";return at(i,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function Kr(i,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=zi(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):X(i,c,u))}function Z(i){ft.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(Z,ft);var gu=/^https?$/i,_u=["POST","PUT"];r=Z.prototype,r.Ha=function(i){this.J=i},r.ea=function(i,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ur.g(),this.v=this.o?Ei(this.o):Ei(Ur),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(w){$i(this,w);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)u.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())u.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(w=>w.toLowerCase()=="content-type"),v=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(_u,c,void 0))||d||v||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,V]of u)this.g.setRequestHeader(w,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Qi(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){$i(this,w)}};function $i(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,Ki(i),xn(i)}function Ki(i){i.A||(i.A=!0,Et(i,"complete"),Et(i,"error"))}r.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Et(this,"complete"),Et(this,"abort"),xn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xn(this,!0)),Z.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Hi(this):this.bb())},r.bb=function(){Hi(this)};function Hi(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Ot(i)!=4||i.Z()!=2)){if(i.u&&Ot(i)==4)pi(i.Ea,0,i);else if(Et(i,"readystatechange"),Ot(i)==4){i.h=!1;try{const V=i.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=V===0){var v=String(i.D).match(Mi)[1]||null;!v&&l.self&&l.self.location&&(v=l.self.location.protocol.slice(0,-1)),d=!gu.test(v?v.toLowerCase():"")}u=d}if(u)Et(i,"complete"),Et(i,"success");else{i.m=6;try{var w=2<Ot(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",Ki(i)}}finally{xn(i)}}}}function xn(i,c){if(i.g){Qi(i);const u=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||Et(i,"ready");try{u.onreadystatechange=d}catch{}}}function Qi(i){i.I&&(l.clearTimeout(i.I),i.I=null)}r.isActive=function(){return!!this.g};function Ot(i){return i.g?i.g.readyState:0}r.Z=function(){try{return 2<Ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),Wc(c)}};function Wi(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function yu(i){const c={};i=(i.g&&2<=Ot(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(K(i[d]))continue;var u=E(i[d]);const v=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const w=c[v]||[];c[v]=w,w.push(u)}T(c,function(d){return d.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ye(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function Xi(i){this.Aa=0,this.i=[],this.j=new ze,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ye("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ye("baseRetryDelayMs",5e3,i),this.cb=Ye("retryDelaySeedMs",1e4,i),this.Wa=Ye("forwardChannelMaxRetries",2,i),this.wa=Ye("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Di(i&&i.concurrentRequestLimit),this.Da=new mu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Xi.prototype,r.la=8,r.G=1,r.connect=function(i,c,u,d){Tt(0),this.W=i,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=io(this,null,this.W),Ln(this)};function Hr(i){if(Yi(i),i.G==3){var c=i.U++,u=xt(i.I);if(X(u,"SID",i.K),X(u,"RID",c),X(u,"TYPE","terminate"),Je(i,u),c=new Bt(i,i.j,c),c.L=2,c.v=Dn(xt(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=c.v,u=!0),u||(c.g=oo(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Pn(c)}so(i)}function On(i){i.g&&(Wr(i),i.g.cancel(),i.g=null)}function Yi(i){On(i),i.u&&(l.clearTimeout(i.u),i.u=null),Mn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function Ln(i){if(!Ni(i.h)&&!i.s){i.s=!0;var c=i.Ga;Me||li(),Fe||(Me(),Fe=!0),Cr.add(c,i),i.B=0}}function Eu(i,c){return ki(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=je(R(i.Ga,i,c),ro(i,i.B)),i.B++,!0)}r.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const v=new Bt(this,this.j,i);let w=this.o;if(this.S&&(w?(w=m(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(v.H=w,w=null),this.P)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=Zi(this,v,c),u=xt(this.I),X(u,"RID",i),X(u,"CVER",22),this.D&&X(u,"X-HTTP-Session-Id",this.D),Je(this,u),w&&(this.O?c="headers="+encodeURIComponent(String(zi(w)))+"&"+c:this.m&&Kr(u,this.m,w)),$r(this.h,v),this.Ua&&X(u,"TYPE","init"),this.P?(X(u,"$req",c),X(u,"SID","null"),v.T=!0,qr(v,u,null)):qr(v,u,c),this.G=2}}else this.G==3&&(i?Ji(this,i):this.i.length==0||Ni(this.h)||Ji(this))};function Ji(i,c){var u;c?u=c.l:u=i.U++;const d=xt(i.I);X(d,"SID",i.K),X(d,"RID",u),X(d,"AID",i.T),Je(i,d),i.m&&i.o&&Kr(d,i.m,i.o),u=new Bt(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),c&&(i.i=c.D.concat(i.i)),c=Zi(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),$r(i.h,u),qr(u,d,c)}function Je(i,c){i.H&&at(i.H,function(u,d){X(c,d,u)}),i.l&&Li({},function(u,d){X(c,d,u)})}function Zi(i,c,u){u=Math.min(i.i.length,u);var d=i.l?R(i.l.Na,i.l,i):null;t:{var v=i.i;let w=-1;for(;;){const V=["count="+u];w==-1?0<u?(w=v[0].g,V.push("ofs="+w)):w=0:V.push("ofs="+w);let W=!0;for(let ct=0;ct<u;ct++){let $=v[ct].g;const mt=v[ct].map;if($-=w,0>$)w=Math.max(0,v[ct].g-100),W=!1;else try{pu(mt,V,"req"+$+"_")}catch{d&&d(mt)}}if(W){d=V.join("&");break t}}}return i=i.i.splice(0,u),c.D=i,d}function to(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;Me||li(),Fe||(Me(),Fe=!0),Cr.add(c,i),i.v=0}}function Qr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=je(R(i.Fa,i),ro(i,i.v)),i.v++,!0)}r.Fa=function(){if(this.u=null,eo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=je(R(this.ab,this),i)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),On(this),eo(this))};function Wr(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function eo(i){i.g=new Bt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=xt(i.qa);X(c,"RID","rpc"),X(c,"SID",i.K),X(c,"AID",i.T),X(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&X(c,"TO",i.ja),X(c,"TYPE","xmlhttp"),Je(i,c),i.m&&i.o&&Kr(c,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=Dn(xt(c)),u.m=null,u.P=!0,Pi(u,i)}r.Za=function(){this.C!=null&&(this.C=null,On(this),Qr(this),Tt(19))};function Mn(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function no(i,c){var u=null;if(i.g==c){Mn(i),Wr(i),i.g=null;var d=2}else if(zr(i.h,c))u=c.D,xi(i.h,c),d=1;else return;if(i.G!=0){if(c.o)if(d==1){u=c.m?c.m.length:0,c=Date.now()-c.F;var v=i.B;d=Rn(),Et(d,new wi(d,u)),Ln(i)}else to(i);else if(v=c.s,v==3||v==0&&0<c.X||!(d==1&&Eu(i,c)||d==2&&Qr(i)))switch(u&&0<u.length&&(c=i.h,c.i=c.i.concat(u)),v){case 1:re(i,5);break;case 4:re(i,10);break;case 3:re(i,6);break;default:re(i,2)}}}function ro(i,c){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*c}function re(i,c){if(i.j.info("Error code "+c),c==2){var u=R(i.fb,i),d=i.Xa;const v=!d;d=new ne(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||bn(d,"https"),Dn(d),v?du(d.toString(),u):fu(d.toString(),u)}else Tt(2);i.G=0,i.l&&i.l.sa(c),so(i),Yi(i)}r.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function so(i){if(i.G=0,i.ka=[],i.l){const c=Oi(i.h);(c.length!=0||i.i.length!=0)&&(N(i.ka,c),N(i.ka,i.i),i.h.i.length=0,D(i.i),i.i.length=0),i.l.ra()}}function io(i,c,u){var d=u instanceof ne?xt(u):new ne(u);if(d.g!="")c&&(d.g=c+"."+d.g),Vn(d,d.s);else{var v=l.location;d=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;var w=new ne(null);d&&bn(w,d),c&&(w.g=c),v&&Vn(w,v),u&&(w.l=u),d=w}return u=i.D,c=i.ya,u&&c&&X(d,u,c),X(d,"VER",i.la),Je(i,d),d}function oo(i,c,u){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new Z(new Nn({eb:u})):new Z(i.pa),c.Ha(i.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function ao(){}r=ao.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Fn(){}Fn.prototype.g=function(i,c){return new It(i,c)};function It(i,c){ft.call(this),this.g=new Xi(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!K(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new me(this)}b(It,ft),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){Hr(this.g)},It.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Or(i),i=u);c.i.push(new nu(c.Ya++,i)),c.G==3&&Ln(c)},It.prototype.N=function(){this.g.l=null,delete this.j,Hr(this.g),delete this.g,It.aa.N.call(this)};function co(i){Mr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const u in c){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}b(co,Mr);function uo(){Fr.call(this),this.status=1}b(uo,Fr);function me(i){this.g=i}b(me,ao),me.prototype.ua=function(){Et(this.g,"a")},me.prototype.ta=function(i){Et(this.g,new co(i))},me.prototype.sa=function(i){Et(this.g,new uo)},me.prototype.ra=function(){Et(this.g,"b")},Fn.prototype.createWebChannel=Fn.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,wa=function(){return new Fn},Aa=function(){return Rn()},Ia=te,ps={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Sn.NO_ERROR=0,Sn.TIMEOUT=8,Sn.HTTP_ERROR=6,Qn=Sn,Ri.COMPLETE="complete",va=Ri,Ti.EventType=qe,qe.OPEN="a",qe.CLOSE="b",qe.ERROR="c",qe.MESSAGE="d",ft.prototype.listen=ft.prototype.K,Ze=Ti,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,Ta=Z}).apply(typeof Bn<"u"?Bn:typeof self<"u"?self:typeof window<"u"?window:{});const Io="@firebase/firestore";/**
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
 */const ae=new fa("@firebase/firestore");function ge(){return ae.logLevel}function k(r,...t){if(ae.logLevel<=j.DEBUG){const e=t.map(Ds);ae.debug(`Firestore (${De}): ${r}`,...e)}}function Mt(r,...t){if(ae.logLevel<=j.ERROR){const e=t.map(Ds);ae.error(`Firestore (${De}): ${r}`,...e)}}function Ae(r,...t){if(ae.logLevel<=j.WARN){const e=t.map(Ds);ae.warn(`Firestore (${De}): ${r}`,...e)}}function Ds(r){if(typeof r=="string")return r;try{/**
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
 */class Ra{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Xl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class Yl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Jl{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0);let n=this.i;const s=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(H(typeof n.accessToken=="string"),new Ra(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string"),new _t(t)}}class Zl{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const t=this.I();return t&&this.T.set("Authorization",t),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class th{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Zl(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class eh{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class nh{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){H(this.o===void 0);const n=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string"),this.R=e.token,new eh(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function rh(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class Sa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=rh(40);for(let o=0;o<s.length;++o)n.length<20&&s[o]<e&&(n+=t.charAt(s[o]%t.length))}return n}}function q(r,t){return r<t?-1:r>t?1:0}function we(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}/**
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
 */class st{static now(){return st.fromMillis(Date.now())}static fromDate(t){return st.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new st(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?q(this.nanoseconds,t.nanoseconds):q(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class un{constructor(t,e,n){e===void 0?e=0:e>t.length&&L(),n===void 0?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return un.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof un?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const o=t.get(s),a=e.get(s);if(o<a)return-1;if(o>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends un{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new x(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const sh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends un{construct(t,e,n){return new lt(t,e,n)}static isValidIdentifier(t){return sh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new lt(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const o=()=>{if(n.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new x(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(n+=l,s++):(o(),s++)}if(o(),a)throw new x(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(Y.fromString(t))}static fromName(t){return new O(Y.fromString(t).popFirst(5))}static empty(){return new O(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new Y(t.slice()))}}function ih(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=M.fromTimestamp(n===1e9?new st(e+1,0):new st(e,n));return new Qt(s,O.empty(),t)}function oh(r){return new Qt(r.readTime,r.key,-1)}class Qt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Qt(M.min(),O.empty(),-1)}static max(){return new Qt(M.max(),O.empty(),-1)}}function ah(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(r.documentKey,t.documentKey),e!==0?e:q(r.largestBatchId,t.largestBatchId))}/**
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
 */const ch="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class uh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ne(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==ch)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((n,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,n)=>{e(t)})}static reject(t){return new S((e,n)=>{n(t)})}static waitFor(t){return new S((e,n)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>n(h))}),a=!0,o===s&&e()})}static or(t){let e=S.resolve(!1);for(const n of t)e=e.next(s=>s?S.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,o)=>{n.push(e.call(this,s,o))}),this.waitFor(n)}static mapArray(t,e){return new S((n,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(p=>{a[f]=p,++l,l===o&&n(a)},p=>s(p))}})}static doWhile(t,e){return new S((n,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):n()};o()})}}function lh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ke(r){return r.name==="IndexedDbTransactionError"}/**
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
 */class fr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}fr.oe=-1;function mr(r){return r==null}function rr(r){return r===0&&1/r==-1/0}function hh(r){return typeof r=="number"&&Number.isInteger(r)&&!rr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */function dh(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Ao(t)),t=fh(r.get(e),t);return Ao(t)}function fh(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const o=r.charAt(s);switch(o){case"\0":e+="";break;case"":e+="";break;default:e+=o}}return e}function Ao(r){return r+""}/**
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
 */function wo(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function ce(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Ca(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class J{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new qn(this.root,t,this.comparator,!0)}}class qn{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,n,s,o){this.key=t,this.value=e,this.color=n??ut.RED,this.left=s??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,o){return new ut(t??this.key,e??this.value,n??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const o=n(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,n),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,s,o){return this}insert(t,e,n){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class it{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ro(this.data.getIterator())}getIteratorFrom(t){return new Ro(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof it)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=n.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new it(this.comparator);return e.data=t,e}}class Ro{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class St{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new St([])}unionWith(t){let e=new it(lt.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return we(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Pa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Pa("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return q(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const mh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(r){if(H(!!r),typeof r=="string"){let t=0;const e=mh.exec(r);if(H(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:tt(r.seconds),nanos:tt(r.nanos)}}function tt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
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
 */function Ns(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function pr(r){const t=r.mapValue.fields.__previous_value__;return Ns(t)?pr(t):t}function ln(r){const t=Wt(r.mapValue.fields.__local_write_time__.timestampValue);return new st(t.seconds,t.nanos)}/**
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
 */class ph{constructor(t,e,n,s,o,a,l,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f}}class hn{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new hn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof hn&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const Gn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Yt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ns(r)?4:_h(r)?9007199254740991:gh(r)?10:11:L()}function Dt(r,t){if(r===t)return!0;const e=Yt(r);if(e!==Yt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return ln(r).isEqual(ln(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Wt(s.timestampValue),l=Wt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,o){return Xt(s.bytesValue).isEqual(Xt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(r,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),l=tt(o.doubleValue);return a===l?rr(a)===rr(l):isNaN(a)&&isNaN(l)}return!1}(r,t);case 9:return we(r.arrayValue.values||[],t.arrayValue.values||[],Dt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(wo(a)!==wo(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Dt(a[h],l[h])))return!1;return!0}(r,t);default:return L()}}function dn(r,t){return(r.values||[]).find(e=>Dt(e,t))!==void 0}function Re(r,t){if(r===t)return 0;const e=Yt(r),n=Yt(t);if(e!==n)return q(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,t.booleanValue);case 2:return function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(r,t);case 3:return So(r.timestampValue,t.timestampValue);case 4:return So(ln(r),ln(t));case 5:return q(r.stringValue,t.stringValue);case 6:return function(o,a){const l=Xt(o),h=Xt(a);return l.compareTo(h)}(r.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const p=q(l[f],h[f]);if(p!==0)return p}return q(l.length,h.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,a){const l=q(tt(o.latitude),tt(a.latitude));return l!==0?l:q(tt(o.longitude),tt(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Co(r.arrayValue,t.arrayValue);case 10:return function(o,a){var l,h,f,p;const I=o.fields||{},R=a.fields||{},P=(l=I.value)===null||l===void 0?void 0:l.arrayValue,b=(h=R.value)===null||h===void 0?void 0:h.arrayValue,D=q(((f=P?.values)===null||f===void 0?void 0:f.length)||0,((p=b?.values)===null||p===void 0?void 0:p.length)||0);return D!==0?D:Co(P,b)}(r.mapValue,t.mapValue);case 11:return function(o,a){if(o===Gn.mapValue&&a===Gn.mapValue)return 0;if(o===Gn.mapValue)return 1;if(a===Gn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let I=0;I<h.length&&I<p.length;++I){const R=q(h[I],p[I]);if(R!==0)return R;const P=Re(l[h[I]],f[p[I]]);if(P!==0)return P}return q(h.length,p.length)}(r.mapValue,t.mapValue);default:throw L()}}function So(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return q(r,t);const e=Wt(r),n=Wt(t),s=q(e.seconds,n.seconds);return s!==0?s:q(e.nanos,n.nanos)}function Co(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const o=Re(e[s],n[s]);if(o)return o}return q(e.length,n.length)}function Se(r){return gs(r)}function gs(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Wt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return O.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const o of e.values||[])s?s=!1:n+=",",n+=gs(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of n)o?o=!1:s+=",",s+=`${a}:${gs(e.fields[a])}`;return s+"}"}(r.mapValue):L()}function Wn(r){switch(Yt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=pr(r);return t?16+Wn(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,o)=>s+Wn(o),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return ce(n.fields,(o,a)=>{s+=o.length+Wn(a)}),s}(r.mapValue);default:throw L()}}function Po(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function _s(r){return!!r&&"integerValue"in r}function ks(r){return!!r&&"arrayValue"in r}function bo(r){return!!r&&"nullValue"in r}function Vo(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Xn(r){return!!r&&"mapValue"in r}function gh(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function nn(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return ce(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=nn(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=nn(r.arrayValue.values[e]);return t}return Object.assign({},r)}function _h(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Xn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=nn(e)}setAll(t){let e=lt.emptyPath(),n={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,n,s),n={},s=[],e=l.popLast()}a?n[l.lastSegment()]=nn(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,s)}delete(t){const e=this.field(t.popLast());Xn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Dt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Xn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){ce(e,(s,o)=>t[s]=o);for(const s of n)delete t[s]}clone(){return new At(nn(this.value))}}function ba(r){const t=[];return ce(r.fields,(e,n)=>{const s=new lt([e]);if(Xn(n)){const o=ba(n.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
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
 */class yt{constructor(t,e,n,s,o,a,l){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new yt(t,0,M.min(),M.min(),M.min(),At.empty(),0)}static newFoundDocument(t,e,n,s){return new yt(t,1,e,M.min(),n,s,0)}static newNoDocument(t,e){return new yt(t,2,e,M.min(),M.min(),At.empty(),0)}static newUnknownDocument(t,e){return new yt(t,3,e,M.min(),M.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(M.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof yt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class sr{constructor(t,e){this.position=t,this.inclusive=e}}function Do(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const o=t[s],a=r.position[s];if(o.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),e.key):n=Re(a,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function No(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Dt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class fn{constructor(t,e="asc"){this.field=t,this.dir=e}}function yh(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Va{}class rt extends Va{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Th(t,e,n):e==="array-contains"?new Ah(t,n):e==="in"?new wh(t,n):e==="not-in"?new Rh(t,n):e==="array-contains-any"?new Sh(t,n):new rt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new vh(t,n):new Ih(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Re(e,this.value)):e!==null&&Yt(this.value)===Yt(e)&&this.matchesComparison(Re(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends Va{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Ct(t,e)}matches(t){return Da(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Da(r){return r.op==="and"}function Na(r){return Eh(r)&&Da(r)}function Eh(r){for(const t of r.filters)if(t instanceof Ct)return!1;return!0}function ys(r){if(r instanceof rt)return r.field.canonicalString()+r.op.toString()+Se(r.value);if(Na(r))return r.filters.map(t=>ys(t)).join(",");{const t=r.filters.map(e=>ys(e)).join(",");return`${r.op}(${t})`}}function ka(r,t){return r instanceof rt?function(n,s){return s instanceof rt&&n.op===s.op&&n.field.isEqual(s.field)&&Dt(n.value,s.value)}(r,t):r instanceof Ct?function(n,s){return s instanceof Ct&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((o,a,l)=>o&&ka(a,s.filters[l]),!0):!1}(r,t):void L()}function xa(r){return r instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${Se(e.value)}`}(r):r instanceof Ct?function(e){return e.op.toString()+" {"+e.getFilters().map(xa).join(" ,")+"}"}(r):"Filter"}class Th extends rt{constructor(t,e,n){super(t,e,n),this.key=O.fromName(n.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class vh extends rt{constructor(t,e){super(t,"in",e),this.keys=Oa("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Ih extends rt{constructor(t,e){super(t,"not-in",e),this.keys=Oa("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Oa(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>O.fromName(n.referenceValue))}class Ah extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ks(e)&&dn(e.arrayValue,this.value)}}class wh extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&dn(this.value.arrayValue,e)}}class Rh extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(dn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!dn(this.value.arrayValue,e)}}class Sh extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ks(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>dn(this.value.arrayValue,n))}}/**
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
 */class Ch{constructor(t,e=null,n=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.ue=null}}function ko(r,t=null,e=[],n=[],s=null,o=null,a=null){return new Ch(r,t,e,n,s,o,a)}function xs(r){const t=F(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>ys(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),mr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Se(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Se(n)).join(",")),t.ue=e}return t.ue}function Os(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!yh(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!ka(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!No(r.startAt,t.startAt)&&No(r.endAt,t.endAt)}function Es(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
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
 */class xe{constructor(t,e=null,n=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ph(r,t,e,n,s,o,a,l){return new xe(r,t,e,n,s,o,a,l)}function La(r){return new xe(r)}function xo(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Ma(r){return r.collectionGroup!==null}function rn(r){const t=F(r);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new it(lt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new fn(o,n))}),e.has(lt.keyField().canonicalString())||t.ce.push(new fn(lt.keyField(),n))}return t.ce}function Pt(r){const t=F(r);return t.le||(t.le=bh(t,rn(r))),t.le}function bh(r,t){if(r.limitType==="F")return ko(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new fn(s.field,o)});const e=r.endAt?new sr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new sr(r.startAt.position,r.startAt.inclusive):null;return ko(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Ts(r,t){const e=r.filters.concat([t]);return new xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function ir(r,t,e){return new xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function gr(r,t){return Os(Pt(r),Pt(t))&&r.limitType===t.limitType}function Fa(r){return`${xs(Pt(r))}|lt:${r.limitType}`}function _e(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>xa(s)).join(", ")}]`),mr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Se(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Se(s)).join(",")),`Target(${n})`}(Pt(r))}; limitType=${r.limitType})`}function _r(r,t){return t.isFoundDocument()&&function(n,s){const o=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):O.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,s){for(const o of rn(n))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const o of n.filters)if(!o.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,l,h){const f=Do(a,l,h);return a.inclusive?f<=0:f<0}(n.startAt,rn(n),s)||n.endAt&&!function(a,l,h){const f=Do(a,l,h);return a.inclusive?f>=0:f>0}(n.endAt,rn(n),s))}(r,t)}function Vh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ua(r){return(t,e)=>{let n=!1;for(const s of rn(r)){const o=Dh(s,t,e);if(o!==0)return o;n=n||s.field.isKeyField()}return 0}}function Dh(r,t,e){const n=r.field.isKeyField()?O.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Re(h,f):L()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
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
 */class ue{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,o]of n)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ce(this.inner,(e,n)=>{for(const[s,o]of n)t(s,o)})}isEmpty(){return Ca(this.inner)}size(){return this.innerSize}}/**
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
 */const Nh=new J(O.comparator);function Ft(){return Nh}const Ba=new J(O.comparator);function tn(...r){let t=Ba;for(const e of r)t=t.insert(e.key,e);return t}function qa(r){let t=Ba;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ie(){return sn()}function Ga(){return sn()}function sn(){return new ue(r=>r.toString(),(r,t)=>r.isEqual(t))}const kh=new J(O.comparator),xh=new it(O.comparator);function B(...r){let t=xh;for(const e of r)t=t.add(e);return t}const Oh=new it(q);function Lh(){return Oh}/**
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
 */function Ls(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rr(t)?"-0":t}}function ja(r){return{integerValue:""+r}}function Mh(r,t){return hh(t)?ja(t):Ls(r,t)}/**
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
 */class yr{constructor(){this._=void 0}}function Fh(r,t,e){return r instanceof or?function(s,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Ns(o)&&(o=pr(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(e,t):r instanceof mn?$a(r,t):r instanceof pn?Ka(r,t):function(s,o){const a=za(s,o),l=Oo(a)+Oo(s.Pe);return _s(a)&&_s(s.Pe)?ja(l):Ls(s.serializer,l)}(r,t)}function Uh(r,t,e){return r instanceof mn?$a(r,t):r instanceof pn?Ka(r,t):e}function za(r,t){return r instanceof ar?function(n){return _s(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class or extends yr{}class mn extends yr{constructor(t){super(),this.elements=t}}function $a(r,t){const e=Ha(t);for(const n of r.elements)e.some(s=>Dt(s,n))||e.push(n);return{arrayValue:{values:e}}}class pn extends yr{constructor(t){super(),this.elements=t}}function Ka(r,t){let e=Ha(t);for(const n of r.elements)e=e.filter(s=>!Dt(s,n));return{arrayValue:{values:e}}}class ar extends yr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function Oo(r){return tt(r.integerValue||r.doubleValue)}function Ha(r){return ks(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function Bh(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof mn&&s instanceof mn||n instanceof pn&&s instanceof pn?we(n.elements,s.elements,Dt):n instanceof ar&&s instanceof ar?Dt(n.Pe,s.Pe):n instanceof or&&s instanceof or}(r.transform,t.transform)}class qh{constructor(t,e){this.version=t,this.transformResults=e}}class bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new bt}static exists(t){return new bt(void 0,t)}static updateTime(t){return new bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Yn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Er{}function Qa(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Ms(r.key,bt.none()):new _n(r.key,r.data,bt.none());{const e=r.data,n=At.empty();let s=new it(lt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?n.delete(o):n.set(o,a),s=s.add(o)}return new le(r.key,n,new St(s.toArray()),bt.none())}}function Gh(r,t,e){r instanceof _n?function(s,o,a){const l=s.value.clone(),h=Mo(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):r instanceof le?function(s,o,a){if(!Yn(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Mo(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Wa(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(r,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function on(r,t,e,n){return r instanceof _n?function(o,a,l,h){if(!Yn(o.precondition,a))return l;const f=o.value.clone(),p=Fo(o.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(r,t,e,n):r instanceof le?function(o,a,l,h){if(!Yn(o.precondition,a))return l;const f=Fo(o.fieldTransforms,h,a),p=a.data;return p.setAll(Wa(o)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(r,t,e,n):function(o,a,l){return Yn(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(r,t,e)}function jh(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),o=za(n.transform,s||null);o!=null&&(e===null&&(e=At.empty()),e.set(n.field,o))}return e||null}function Lo(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&we(n,s,(o,a)=>Bh(o,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class _n extends Er{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class le extends Er{constructor(t,e,n,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Wa(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Mo(r,t,e){const n=new Map;H(r.length===e.length);for(let s=0;s<e.length;s++){const o=r[s],a=o.transform,l=t.data.field(o.field);n.set(o.field,Uh(a,l,e[s]))}return n}function Fo(r,t,e){const n=new Map;for(const s of r){const o=s.transform,a=e.data.field(s.field);n.set(s.field,Fh(o,a,t))}return n}class Ms extends Er{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class zh extends Er{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class $h{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Gh(o,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=on(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=on(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Ga();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Qa(a,l);h!==null&&n.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(M.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),B())}isEqual(t){return this.batchId===t.batchId&&we(this.mutations,t.mutations,(e,n)=>Lo(e,n))&&we(this.baseMutations,t.baseMutations,(e,n)=>Lo(e,n))}}class Fs{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){H(t.mutations.length===n.length);let s=function(){return kh}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,n[a].version);return new Fs(t,e,n,s)}}/**
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
 */class Kh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Hh{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var nt,G;function Qh(r){switch(r){default:return L();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Xa(r){if(r===void 0)return Mt("GRPC error has no .code"),C.UNKNOWN;switch(r){case nt.OK:return C.OK;case nt.CANCELLED:return C.CANCELLED;case nt.UNKNOWN:return C.UNKNOWN;case nt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case nt.INTERNAL:return C.INTERNAL;case nt.UNAVAILABLE:return C.UNAVAILABLE;case nt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case nt.NOT_FOUND:return C.NOT_FOUND;case nt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case nt.ABORTED:return C.ABORTED;case nt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case nt.DATA_LOSS:return C.DATA_LOSS;default:return L()}}(G=nt||(nt={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Wh(){return new TextEncoder}/**
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
 */const Xh=new oe([4294967295,4294967295],0);function Uo(r){const t=Wh().encode(r),e=new Ea;return e.update(t),new Uint8Array(e.digest())}function Bo(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new oe([e,n],0),new oe([s,o],0)]}class Us{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new en(`Invalid padding: ${e}`);if(n<0)throw new en(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new en(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new en(`Invalid padding when bitmap length is 0: ${e}`);this.Te=8*t.length-e,this.Ie=oe.fromNumber(this.Te)}Ee(t,e,n){let s=t.add(e.multiply(oe.fromNumber(n)));return s.compare(Xh)===1&&(s=new oe([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Ie).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Te===0)return!1;const e=Uo(t),[n,s]=Bo(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,s,o);if(!this.de(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Us(o,s,e);return n.forEach(l=>a.insert(l)),a}insert(t){if(this.Te===0)return;const e=Uo(t),[n,s]=Bo(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(n,s,o);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class en extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Tr{constructor(t,e,n,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,yn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Tr(M.min(),s,new J(q),Ft(),B())}}class yn{constructor(t,e,n,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new yn(n,e,B(),B(),B())}}/**
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
 */class Jn{constructor(t,e,n,s){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=s}}class Ya{constructor(t,e){this.targetId=t,this.me=e}}class Ja{constructor(t,e,n=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class qo{constructor(){this.fe=0,this.ge=Go(),this.pe=ht.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=B(),e=B(),n=B();return this.ge.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:L()}}),new yn(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=Go()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,H(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Yh{constructor(t){this.Le=t,this.Be=new Map,this.ke=Ft(),this.qe=jn(),this.Qe=jn(),this.Ke=new J(q)}$e(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.Ue(e,t.Ve):this.We(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.We(e,t.key,t.Ve)}Ge(t){this.forEachTarget(t,e=>{const n=this.ze(e);switch(t.state){case 0:this.je(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.je(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.je(e)&&(this.He(e),n.De(t.resumeToken));break;default:L()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,s)=>{this.je(s)&&e(s)})}Je(t){const e=t.targetId,n=t.me.count,s=this.Ye(e);if(s){const o=s.target;if(Es(o))if(n===0){const a=new O(o.path);this.We(e,a,yt.newNoDocument(a,M.min()))}else H(n===1);else{const a=this.Ze(e);if(a!==n){const l=this.Xe(t),h=l?this.et(l,t,a):1;if(h!==0){this.He(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(e,f)}}}}}Xe(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=Xt(n).toUint8Array()}catch(h){if(h instanceof Pa)return Ae("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Us(a,s,o)}catch(h){return Ae(h instanceof en?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.Te===0?null:l}et(t,e,n){return e.me.count===n-this.rt(t,e.targetId)?0:2}rt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let s=0;return n.forEach(o=>{const a=this.Le.nt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.We(e,o,null),s++)}),s}it(t){const e=new Map;this.Be.forEach((o,a)=>{const l=this.Ye(a);if(l){if(o.current&&Es(l.target)){const h=new O(l.target.path);this.st(h).has(a)||this.ot(a,h)||this.We(a,h,yt.newNoDocument(h,t))}o.be&&(e.set(a,o.ve()),o.Ce())}});let n=B();this.Qe.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const f=this.Ye(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(n=n.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(t));const s=new Tr(t,e,this.Ke,this.ke,n);return this.ke=Ft(),this.qe=jn(),this.Qe=jn(),this.Ke=new J(q),s}Ue(t,e){if(!this.je(t))return;const n=this.ot(t,e.key)?2:0;this.ze(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t)),this.Qe=this.Qe.insert(e.key,this._t(e.key).add(t))}We(t,e,n){if(!this.je(t))return;const s=this.ze(t);this.ot(t,e)?s.Fe(e,1):s.Me(e),this.Qe=this.Qe.insert(e,this._t(e).delete(t)),this.Qe=this.Qe.insert(e,this._t(e).add(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ze(t){const e=this.ze(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.ze(t).xe()}ze(t){let e=this.Be.get(t);return e||(e=new qo,this.Be.set(t,e)),e}_t(t){let e=this.Qe.get(t);return e||(e=new it(q),this.Qe=this.Qe.insert(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new it(q),this.qe=this.qe.insert(t,e)),e}je(t){const e=this.Ye(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Ye(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ut(t)}He(t){this.Be.set(t,new qo),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.We(t,e,null)})}ot(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function jn(){return new J(O.comparator)}function Go(){return new J(O.comparator)}const Jh={asc:"ASCENDING",desc:"DESCENDING"},Zh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},td={and:"AND",or:"OR"};class ed{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function vs(r,t){return r.useProto3Json||mr(t)?t:{value:t}}function cr(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Za(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function nd(r,t){return cr(r,t.toTimestamp())}function Vt(r){return H(!!r),M.fromTimestamp(function(e){const n=Wt(e);return new st(n.seconds,n.nanos)}(r))}function Bs(r,t){return Is(r,t).canonicalString()}function Is(r,t){const e=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function tc(r){const t=Y.fromString(r);return H(ic(t)),t}function As(r,t){return Bs(r.databaseId,t.path)}function es(r,t){const e=tc(t);if(e.get(1)!==r.databaseId.projectId)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new O(nc(e))}function ec(r,t){return Bs(r.databaseId,t)}function rd(r){const t=tc(r);return t.length===4?Y.emptyPath():nc(t)}function ws(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function nc(r){return H(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function jo(r,t,e){return{name:As(r,t),fields:e.value.mapValue.fields}}function sd(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,p){return f.useProto3Json?(H(p===void 0||typeof p=="string"),ht.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array),ht.fromUint8Array(p||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){const p=f.code===void 0?C.UNKNOWN:Xa(f.code);return new x(p,f.message||"")}(a);e=new Ja(n,s,o,l||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=es(r,n.document.name),o=Vt(n.document.updateTime),a=n.document.createTime?Vt(n.document.createTime):M.min(),l=new At({mapValue:{fields:n.document.fields}}),h=yt.newFoundDocument(s,o,a,l),f=n.targetIds||[],p=n.removedTargetIds||[];e=new Jn(f,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=es(r,n.document),o=n.readTime?Vt(n.readTime):M.min(),a=yt.newNoDocument(s,o),l=n.removedTargetIds||[];e=new Jn([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=es(r,n.document),o=n.removedTargetIds||[];e=new Jn([],o,s,null)}else{if(!("filter"in t))return L();{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:o}=n,a=new Hh(s,o),l=n.targetId;e=new Ya(l,a)}}return e}function id(r,t){let e;if(t instanceof _n)e={update:jo(r,t.key,t.value)};else if(t instanceof Ms)e={delete:As(r,t.key)};else if(t instanceof le)e={update:jo(r,t.key,t.data),updateMask:md(t.fieldMask)};else{if(!(t instanceof zh))return L();e={verify:As(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,a){const l=a.transform;if(l instanceof or)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof mn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof pn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ar)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw L()}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:nd(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L()}(r,t.precondition)),e}function od(r,t){return r&&r.length>0?(H(t!==void 0),r.map(e=>function(s,o){let a=s.updateTime?Vt(s.updateTime):Vt(o);return a.isEqual(M.min())&&(a=Vt(o)),new qh(a,s.transformResults||[])}(e,t))):[]}function ad(r,t){return{documents:[ec(r,t.path)]}}function cd(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=ec(r,s);const o=function(f){if(f.length!==0)return sc(Ct.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(p=>function(R){return{field:ye(R.field),direction:hd(R.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=vs(r,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{ct:e,parent:s}}function ud(r){let t=rd(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){H(n===1);const p=e.from[0];p.allDescendants?s=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(I){const R=rc(I);return R instanceof Ct&&Na(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(R=>function(b){return new fn(Ee(b.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(R))}(e.orderBy));let l=null;e.limit&&(l=function(I){let R;return R=typeof I=="object"?I.value:I,mr(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(I){const R=!!I.before,P=I.values||[];return new sr(P,R)}(e.startAt));let f=null;return e.endAt&&(f=function(I){const R=!I.before,P=I.values||[];return new sr(P,R)}(e.endAt)),Ph(t,s,a,o,l,"F",h,f)}function ld(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function rc(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Ee(e.unaryFilter.field);return rt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Ee(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ee(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ee(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(e){return rt.create(Ee(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Ct.create(e.compositeFilter.filters.map(n=>rc(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(r):L()}function hd(r){return Jh[r]}function dd(r){return Zh[r]}function fd(r){return td[r]}function ye(r){return{fieldPath:r.canonicalString()}}function Ee(r){return lt.fromServerFormat(r.fieldPath)}function sc(r){return r instanceof rt?function(e){if(e.op==="=="){if(Vo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NAN"}};if(bo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Vo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NAN"}};if(bo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ye(e.field),op:dd(e.op),value:e.value}}}(r):r instanceof Ct?function(e){const n=e.getFilters().map(s=>sc(s));return n.length===1?n[0]:{compositeFilter:{op:fd(e.op),filters:n}}}(r):L()}function md(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function ic(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class jt{constructor(t,e,n,s,o=M.min(),a=M.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class pd{constructor(t){this.ht=t}}function gd(r){const t=ud({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ir(t,t.limit,"L"):t}/**
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
 */class _d{constructor(){this.ln=new yd}addToCollectionParentIndex(t,e){return this.ln.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.ln.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Qt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Qt.min())}updateCollectionGroup(t,e,n){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class yd{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new it(Y.comparator),o=!s.has(n);return this.index[e]=s.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new it(Y.comparator)).toArray()}}/**
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
 */const zo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function $o([r,t],[e,n]){const s=q(r,e);return s===0?q(t,n):s}class Ed{constructor(t){this.Gn=t,this.buffer=new it($o),this.zn=0}jn(){return++this.zn}Hn(t){const e=[t,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();$o(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Td{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(t){k("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ke(e)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await Ne(e)}await this.Yn(3e5)})}}class vd{constructor(t,e){this.Zn=t,this.params=e}calculateTargetCount(t,e){return this.Zn.Xn(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return S.resolve(fr.oe);const n=new Ed(e);return this.Zn.forEachTarget(t,s=>n.Hn(s.sequenceNumber)).next(()=>this.Zn.er(t,s=>n.Hn(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Zn.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Zn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(zo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),zo):this.tr(t,e))}getCacheSize(t){return this.Zn.getCacheSize(t)}tr(t,e){let n,s,o,a,l,h,f;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),s=this.params.maximumSequenceNumbersToCollect):s=I,a=Date.now(),this.nthSequenceNumber(t,s))).next(I=>(n=I,l=Date.now(),this.removeTargets(t,n,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,n))).next(I=>(f=Date.now(),ge()<=j.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${I} documents in `+(f-h)+`ms
Total Duration: ${f-p}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:I})))}}function Id(r,t){return new vd(r,t)}/**
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
 */class Ad{constructor(){this.changes=new ue(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,yt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?S.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class wd{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Rd{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&on(n.mutation,s,St.empty(),st.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,B()).next(()=>n))}getLocalViewOfDocuments(t,e,n=B()){const s=ie();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(o=>{let a=tn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=ie();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,B()))}populateOverlays(t,e,n){const s=[];return n.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,n,s){let o=Ft();const a=sn(),l=function(){return sn()}();return e.forEach((h,f)=>{const p=n.get(f.key);s.has(f.key)&&(p===void 0||p.mutation instanceof le)?o=o.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),on(p.mutation,f,p.mutation.getFieldMask(),st.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,p)=>a.set(f,p)),e.forEach((f,p)=>{var I;return l.set(f,new wd(p,(I=a.get(f))!==null&&I!==void 0?I:null))}),l))}recalculateAndSaveOverlays(t,e){const n=sn();let s=new J((a,l)=>a-l),o=B();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let p=n.get(h)||St.empty();p=l.applyToLocalView(f,p),n.set(h,p);const I=(s.get(l.batchId)||B()).add(h);s=s.insert(l.batchId,I)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,p=h.value,I=Ga();p.forEach(R=>{if(!o.has(R)){const P=Qa(e.get(R),n.get(R));P!==null&&I.set(R,P),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,I))}return S.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ma(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-o.size):S.resolve(ie());let l=-1,h=o;return a.next(f=>S.forEach(f,(p,I)=>(l<I.largestBatchId&&(l=I.largestBatchId),o.get(p)?S.resolve():this.remoteDocumentCache.getEntry(t,p).next(R=>{h=h.insert(p,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,B())).next(p=>({batchId:l,changes:qa(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(n=>{let s=tn();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const o=e.collectionGroup;let a=tn();return this.indexManager.getCollectionParents(t,o).next(l=>S.forEach(l,h=>{const f=function(I,R){return new xe(R,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,n,s).next(p=>{p.forEach((I,R)=>{a=a.insert(I,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,s))).next(a=>{o.forEach((h,f)=>{const p=f.getKey();a.get(p)===null&&(a=a.insert(p,yt.newInvalidDocument(p)))});let l=tn();return a.forEach((h,f)=>{const p=o.get(h);p!==void 0&&on(p.mutation,f,St.empty(),st.now()),_r(e,f)&&(l=l.insert(h,f))}),l})}}/**
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
 */class Sd{constructor(t){this.serializer=t,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(t,e){return S.resolve(this.Tr.get(e))}saveBundleMetadata(t,e){return this.Tr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Vt(s.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Ir.get(e))}saveNamedQuery(t,e){return this.Ir.set(e.name,function(s){return{name:s.name,query:gd(s.bundledQuery),readTime:Vt(s.readTime)}}(e)),S.resolve()}}/**
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
 */class Cd{constructor(){this.overlays=new J(O.comparator),this.Er=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ie();return S.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&n.set(s,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,o)=>{this.Tt(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Er.get(n);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Er.delete(n)),S.resolve()}getOverlaysForCollection(t,e,n){const s=ie(),o=e.length+1,a=new O(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>n&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let o=new J((f,p)=>f-p);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>n){let p=o.get(f.largestBatchId);p===null&&(p=ie(),o=o.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}const l=ie(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>l.set(f,p)),!(l.size()>=s)););return S.resolve(l)}Tt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Er.get(s.largestBatchId).delete(n.key);this.Er.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Kh(e,n));let o=this.Er.get(e);o===void 0&&(o=B(),this.Er.set(e,o)),this.Er.set(e,o.add(n.key))}}/**
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
 */class Pd{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
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
 */class qs{constructor(){this.dr=new it(ot.Ar),this.Rr=new it(ot.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(t,e){const n=new ot(t,e);this.dr=this.dr.add(n),this.Rr=this.Rr.add(n)}mr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.gr(new ot(t,e))}pr(t,e){t.forEach(n=>this.removeReference(n,e))}yr(t){const e=new O(new Y([])),n=new ot(e,t),s=new ot(e,t+1),o=[];return this.Rr.forEachInRange([n,s],a=>{this.gr(a),o.push(a.key)}),o}wr(){this.dr.forEach(t=>this.gr(t))}gr(t){this.dr=this.dr.delete(t),this.Rr=this.Rr.delete(t)}Sr(t){const e=new O(new Y([])),n=new ot(e,t),s=new ot(e,t+1);let o=B();return this.Rr.forEachInRange([n,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ot(t,0),n=this.dr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class ot{constructor(t,e){this.key=t,this.br=e}static Ar(t,e){return O.comparator(t.key,e.key)||q(t.br,e.br)}static Vr(t,e){return q(t.br,e.br)||O.comparator(t.key,e.key)}}/**
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
 */class bd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Dr=1,this.vr=new it(ot.Ar)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const o=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new $h(o,e,n,s);this.mutationQueue.push(a);for(const l of s)this.vr=this.vr.add(new ot(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.Cr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Fr(n),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ot(e,0),s=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.vr.forEachInRange([n,s],a=>{const l=this.Cr(a.br);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new it(q);return e.forEach(s=>{const o=new ot(s,0),a=new ot(s,Number.POSITIVE_INFINITY);this.vr.forEachInRange([o,a],l=>{n=n.add(l.br)})}),S.resolve(this.Mr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let o=n;O.isDocumentKey(o)||(o=o.child(""));const a=new ot(new O(o),0);let l=new it(q);return this.vr.forEachWhile(h=>{const f=h.key.path;return!!n.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.br)),!0)},a),S.resolve(this.Mr(l))}Mr(t){const e=[];return t.forEach(n=>{const s=this.Cr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){H(this.Or(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.vr;return S.forEach(e.mutations,s=>{const o=new ot(s.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.vr=n})}Ln(t){}containsKey(t,e){const n=new ot(e,0),s=this.vr.firstAfterOrEqual(n);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}Or(t,e){return this.Fr(t)}Fr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Cr(t){const e=this.Fr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Vd{constructor(t){this.Nr=t,this.docs=function(){return new J(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),o=s?s.size:0,a=this.Nr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return S.resolve(n?n.document.mutableCopy():yt.newInvalidDocument(e))}getEntries(t,e){let n=Ft();return e.forEach(s=>{const o=this.docs.get(s);n=n.insert(s,o?o.document.mutableCopy():yt.newInvalidDocument(s))}),S.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let o=Ft();const a=e.path,l=new O(a.child("")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||ah(oh(p),n)<=0||(s.has(p.key)||_r(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,n,s){L()}Lr(t,e){return S.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Dd(this)}getSize(t){return S.resolve(this.size)}}class Dd extends Ad{constructor(t){super(),this.hr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.hr.addEntry(t,s)):this.hr.removeEntry(n)}),S.waitFor(e)}getFromCache(t,e){return this.hr.getEntry(t,e)}getAllFromCache(t,e){return this.hr.getEntries(t,e)}}/**
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
 */class Nd{constructor(t){this.persistence=t,this.Br=new ue(e=>xs(e),Os),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.kr=0,this.qr=new qs,this.targetCount=0,this.Qr=Ce.qn()}forEachTarget(t,e){return this.Br.forEach((n,s)=>e(s)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.kr)}allocateTargetId(t){return this.highestTargetId=this.Qr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.kr&&(this.kr=e),S.resolve()}Un(t){this.Br.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Qr=new Ce(e),this.highestTargetId=e),t.sequenceNumber>this.kr&&(this.kr=t.sequenceNumber)}addTargetData(t,e){return this.Un(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Un(e),S.resolve()}removeTargetData(t,e){return this.Br.delete(e.target),this.qr.yr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,n){let s=0;const o=[];return this.Br.forEach((a,l)=>{l.sequenceNumber<=e&&n.get(l.targetId)===null&&(this.Br.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const n=this.Br.get(e)||null;return S.resolve(n)}addMatchingKeys(t,e,n){return this.qr.mr(e,n),S.resolve()}removeMatchingKeys(t,e,n){this.qr.pr(e,n);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.qr.yr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const n=this.qr.Sr(e);return S.resolve(n)}containsKey(t,e){return S.resolve(this.qr.containsKey(e))}}/**
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
 */class oc{constructor(t,e){this.Kr={},this.overlays={},this.$r=new fr(0),this.Ur=!1,this.Ur=!0,this.Wr=new Pd,this.referenceDelegate=t(this),this.Gr=new Nd(this),this.indexManager=new _d,this.remoteDocumentCache=function(s){return new Vd(s)}(n=>this.referenceDelegate.zr(n)),this.serializer=new pd(e),this.jr=new Sd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Cd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.Kr[t.toKey()];return n||(n=new bd(e,this.referenceDelegate),this.Kr[t.toKey()]=n),n}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(t,e,n){k("MemoryPersistence","Starting transaction:",t);const s=new kd(this.$r.next());return this.referenceDelegate.Hr(),n(s).next(o=>this.referenceDelegate.Jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Yr(t,e){return S.or(Object.values(this.Kr).map(n=>()=>n.containsKey(t,e)))}}class kd extends uh{constructor(t){super(),this.currentSequenceNumber=t}}class Gs{constructor(t){this.persistence=t,this.Zr=new qs,this.Xr=null}static ei(t){return new Gs(t)}get ti(){if(this.Xr)return this.Xr;throw L()}addReference(t,e,n){return this.Zr.addReference(n,e),this.ti.delete(n.toString()),S.resolve()}removeReference(t,e,n){return this.Zr.removeReference(n,e),this.ti.add(n.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.ti.add(e.toString()),S.resolve()}removeTarget(t,e){this.Zr.yr(e.targetId).forEach(s=>this.ti.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.ti.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}Hr(){this.Xr=new Set}Jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.ti,n=>{const s=O.fromPath(n);return this.ni(t,s).next(o=>{o||e.removeEntry(s,M.min())})}).next(()=>(this.Xr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ni(t,e).next(n=>{n?this.ti.delete(e.toString()):this.ti.add(e.toString())})}zr(t){return 0}ni(t,e){return S.or([()=>S.resolve(this.Zr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Yr(t,e)])}}class ur{constructor(t,e){this.persistence=t,this.ri=new ue(n=>dh(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Id(this,e)}static ei(t,e){return new ur(t,e)}Hr(){}Jr(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Xn(t){const e=this.nr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}nr(t){let e=0;return this.er(t,n=>{e++}).next(()=>e)}er(t,e){return S.forEach(this.ri,(n,s)=>this.ir(t,n,s).next(o=>o?S.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.Lr(t,a=>this.ir(t,a,e).next(l=>{l||(n++,o.removeEntry(a,M.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}removeReference(t,e,n){return this.ri.set(n,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.ri.set(e,t.currentSequenceNumber),S.resolve()}zr(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Wn(t.data.value)),e}ir(t,e,n){return S.or([()=>this.persistence.Yr(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.ri.get(e);return S.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class js{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Wi=n,this.Gi=s}static zi(t,e){let n=B(),s=B();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new js(t,e.fromCache,n,s)}}/**
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
 */class xd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Od{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return xu()?8:lh(Nu())>0?6:4}()}initialize(t,e){this.Zi=t,this.indexManager=e,this.ji=!0}getDocumentsMatchingQuery(t,e,n,s){const o={result:null};return this.Xi(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.es(t,e,s,n).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new xd;return this.ts(t,e,a).next(l=>{if(o.result=l,this.Hi)return this.ns(t,e,a,l.size)})}).next(()=>o.result)}ns(t,e,n,s){return n.documentReadCount<this.Ji?(ge()<=j.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",_e(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),S.resolve()):(ge()<=j.DEBUG&&k("QueryEngine","Query:",_e(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Yi*s?(ge()<=j.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",_e(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Pt(e))):S.resolve())}Xi(t,e){if(xo(e))return S.resolve(null);let n=Pt(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=ir(e,null,"F"),n=Pt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const a=B(...o);return this.Zi.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,n).next(h=>{const f=this.rs(e,l);return this.ss(e,f,a,h.readTime)?this.Xi(t,ir(e,null,"F")):this.os(t,f,e,h)}))})))}es(t,e,n,s){return xo(e)||s.isEqual(M.min())?S.resolve(null):this.Zi.getDocuments(t,n).next(o=>{const a=this.rs(e,o);return this.ss(e,a,n,s)?S.resolve(null):(ge()<=j.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),_e(e)),this.os(t,a,e,ih(s,-1)).next(l=>l))})}rs(t,e){let n=new it(Ua(t));return e.forEach((s,o)=>{_r(t,o)&&(n=n.add(o))}),n}ss(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ts(t,e,n){return ge()<=j.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",_e(e)),this.Zi.getDocumentsMatchingQuery(t,e,Qt.min(),n)}os(t,e,n,s){return this.Zi.getDocumentsMatchingQuery(t,n,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
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
 */class Ld{constructor(t,e,n,s){this.persistence=t,this._s=e,this.serializer=s,this.us=new J(q),this.cs=new ue(o=>xs(o),Os),this.ls=new Map,this.hs=t.getRemoteDocumentCache(),this.Gr=t.getTargetCache(),this.jr=t.getBundleCache(),this.Ps(n)}Ps(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Rd(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.us))}}function Md(r,t,e,n){return new Ld(r,t,e,n)}async function ac(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(o=>(s=o,e.Ps(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const a=[],l=[];let h=B();for(const f of s){a.push(f.batchId);for(const p of f.mutations)h=h.add(p.key)}for(const f of o){l.push(f.batchId);for(const p of f.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(n,h).next(f=>({Ts:f,removedBatchIds:a,addedBatchIds:l}))})})}function Fd(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),o=e.hs.newChangeBuffer({trackRemovals:!0});return function(l,h,f,p){const I=f.batch,R=I.keys();let P=S.resolve();return R.forEach(b=>{P=P.next(()=>p.getEntry(h,b)).next(D=>{const N=f.docVersions.get(b);H(N!==null),D.version.compareTo(N)<0&&(I.applyToRemoteDocument(D,f),D.isValidDocument()&&(D.setReadTime(f.commitVersion),p.addEntry(D)))})}),P.next(()=>l.mutationQueue.removeMutationBatch(h,I))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(l){let h=B();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function cc(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Gr.getLastRemoteSnapshotVersion(e))}function Ud(r,t){const e=F(r),n=t.snapshotVersion;let s=e.us;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.hs.newChangeBuffer({trackRemovals:!0});s=e.us;const l=[];t.targetChanges.forEach((p,I)=>{const R=s.get(I);if(!R)return;l.push(e.Gr.removeMatchingKeys(o,p.removedDocuments,I).next(()=>e.Gr.addMatchingKeys(o,p.addedDocuments,I)));let P=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,n)),s=s.insert(I,P),function(D,N,z){return D.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(R,P,p)&&l.push(e.Gr.updateTargetData(o,P))});let h=Ft(),f=B();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),l.push(Bd(o,a,t.documentUpdates).next(p=>{h=p.Is,f=p.Es})),!n.isEqual(M.min())){const p=e.Gr.getLastRemoteSnapshotVersion(o).next(I=>e.Gr.setTargetsMetadata(o,o.currentSequenceNumber,n));l.push(p)}return S.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.us=s,o))}function Bd(r,t,e){let n=B(),s=B();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let a=Ft();return e.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(M.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):k("LocalStore","Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Is:a,Es:s}})}function qd(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Gd(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.Gr.getTargetData(n,t).next(o=>o?(s=o,S.resolve(s)):e.Gr.allocateTargetId(n).next(a=>(s=new jt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Gr.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.us.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.us=e.us.insert(n.targetId,n),e.cs.set(t,n.targetId)),n})}async function Rs(r,t,e){const n=F(r),s=n.us.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ke(a))throw a;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}n.us=n.us.remove(t),n.cs.delete(s.target)}function Ko(r,t,e){const n=F(r);let s=M.min(),o=B();return n.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){const I=F(h),R=I.cs.get(p);return R!==void 0?S.resolve(I.us.get(R)):I.Gr.getTargetData(f,p)}(n,a,Pt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,n.Gr.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>n._s.getDocumentsMatchingQuery(a,t,e?s:M.min(),e?o:B())).next(l=>(jd(n,Vh(t),l),{documents:l,ds:o})))}function jd(r,t,e){let n=r.ls.get(t)||M.min();e.forEach((s,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.ls.set(t,n)}class Ho{constructor(){this.activeTargetIds=Lh()}ps(t){this.activeTargetIds=this.activeTargetIds.add(t)}ys(t){this.activeTargetIds=this.activeTargetIds.delete(t)}gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class zd{constructor(){this._o=new Ho,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this._o.ps(t),this.ao[t]||"not-current"}updateQueryState(t,e,n){this.ao[t]=e}removeLocalQueryTarget(t){this._o.ys(t)}isLocalQueryTarget(t){return this._o.activeTargetIds.has(t)}clearQueryState(t){delete this.ao[t]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(t){return this._o.activeTargetIds.has(t)}start(){return this._o=new Ho,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class $d{uo(t){}shutdown(){}}/**
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
 */class Qo{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(t){this.To.push(t)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.To)t(0)}Po(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.To)t(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let zn=null;function ns(){return zn===null?zn=function(){return 268435456+Math.round(2147483648*Math.random())}():zn++,"0x"+zn.toString(16)}/**
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
 */const Kd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Hd{constructor(t){this.Eo=t.Eo,this.Ao=t.Ao}Ro(t){this.Vo=t}mo(t){this.fo=t}po(t){this.yo=t}onMessage(t){this.wo=t}close(){this.Ao()}send(t){this.Eo(t)}So(){this.Vo()}bo(){this.fo()}Do(t){this.yo(t)}vo(t){this.wo(t)}}/**
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
 */const gt="WebChannelConnection";class Qd extends class{get Co(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Fo=n+"://"+e.host,this.Mo=`projects/${s}/databases/${o}`,this.xo=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}Oo(e,n,s,o,a){const l=ns(),h=this.No(e,n.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${l}:`,h,s);const f={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(f,o,a),this.Bo(e,h,f,s).then(p=>(k("RestConnection",`Received RPC '${e}' ${l}: `,p),p),p=>{throw Ae("RestConnection",`RPC '${e}' ${l} failed with error: `,p,"url: ",h,"request:",s),p})}ko(e,n,s,o,a,l){return this.Oo(e,n,s,o,a)}Lo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+De}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((o,a)=>e[a]=o),s&&s.headers.forEach((o,a)=>e[a]=o)}No(e,n){const s=Kd[e];return`${this.Fo}/v1/${n}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Bo(t,e,n,s){const o=ns();return new Promise((a,l)=>{const h=new Ta;h.setWithCredentials(!0),h.listenOnce(va.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Qn.NO_ERROR:const p=h.getResponseJson();k(gt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),a(p);break;case Qn.TIMEOUT:k(gt,`RPC '${t}' ${o} timed out`),l(new x(C.DEADLINE_EXCEEDED,"Request time out"));break;case Qn.HTTP_ERROR:const I=h.getStatus();if(k(gt,`RPC '${t}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const P=R?.error;if(P&&P.status&&P.message){const b=function(N){const z=N.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(z)>=0?z:C.UNKNOWN}(P.status);l(new x(b,P.message))}else l(new x(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new x(C.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(gt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(s);k(gt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,n,15)})}qo(t,e,n){const s=ns(),o=[this.Fo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=wa(),l=Aa(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Lo(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const p=o.join("");k(gt,`Creating RPC '${t}' stream ${s}: ${p}`,h);const I=a.createWebChannel(p,h);let R=!1,P=!1;const b=new Hd({Eo:N=>{P?k(gt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(R||(k(gt,`Opening RPC '${t}' stream ${s} transport.`),I.open(),R=!0),k(gt,`RPC '${t}' stream ${s} sending:`,N),I.send(N))},Ao:()=>I.close()}),D=(N,z,K)=>{N.listen(z,Q=>{try{K(Q)}catch(et){setTimeout(()=>{throw et},0)}})};return D(I,Ze.EventType.OPEN,()=>{P||(k(gt,`RPC '${t}' stream ${s} transport opened.`),b.So())}),D(I,Ze.EventType.CLOSE,()=>{P||(P=!0,k(gt,`RPC '${t}' stream ${s} transport closed`),b.Do())}),D(I,Ze.EventType.ERROR,N=>{P||(P=!0,Ae(gt,`RPC '${t}' stream ${s} transport errored:`,N),b.Do(new x(C.UNAVAILABLE,"The operation could not be completed")))}),D(I,Ze.EventType.MESSAGE,N=>{var z;if(!P){const K=N.data[0];H(!!K);const Q=K,et=Q?.error||((z=Q[0])===null||z===void 0?void 0:z.error);if(et){k(gt,`RPC '${t}' stream ${s} received error:`,et);const Nt=et.status;let at=function(_){const y=nt[_];if(y!==void 0)return Xa(y)}(Nt),T=et.message;at===void 0&&(at=C.INTERNAL,T="Unknown error status: "+Nt+" with message "+et.message),P=!0,b.Do(new x(at,T)),I.close()}else k(gt,`RPC '${t}' stream ${s} received:`,K),b.vo(K)}}),D(l,Ia.STAT_EVENT,N=>{N.stat===ps.PROXY?k(gt,`RPC '${t}' stream ${s} detected buffering proxy`):N.stat===ps.NOPROXY&&k(gt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{b.bo()},0),b}}function rs(){return typeof document<"u"?document:null}/**
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
 */function vr(r){return new ed(r,!0)}/**
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
 */class uc{constructor(t,e,n=1e3,s=1.5,o=6e4){this.li=t,this.timerId=e,this.Qo=n,this.Ko=s,this.$o=o,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(t){this.cancel();const e=Math.floor(this.Uo+this.Ho()),n=Math.max(0,Date.now()-this.Go),s=Math.max(0,e-n);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Uo} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,s,()=>(this.Go=Date.now(),t())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
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
 */class lc{constructor(t,e,n,s,o,a,l,h){this.li=t,this.Yo=n,this.Zo=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new uc(t,e)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(t){this.l_(),this.stream.send(t)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(t,e){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,t!==4?this.r_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Mt(e.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.po(e)}P_(){}auth(){this.state=1;const t=this.T_(this.Xo),e=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Xo===e&&this.I_(n,s)},n=>{t(()=>{const s=new x(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.E_(s)})})}I_(t,e){const n=this.T_(this.Xo);this.stream=this.d_(t,e),this.stream.Ro(()=>{n(()=>this.listener.Ro())}),this.stream.mo(()=>{n(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(s=>{n(()=>this.E_(s))}),this.stream.onMessage(s=>{n(()=>++this.n_==1?this.A_(s):this.onNext(s))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}T_(t){return e=>{this.li.enqueueAndForget(()=>this.Xo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wd extends lc{constructor(t,e,n,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=o}d_(t,e){return this.connection.qo("Listen",t,e)}A_(t){return this.onNext(t)}onNext(t){this.r_.reset();const e=sd(this.serializer,t),n=function(o){if(!("targetChange"in o))return M.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?M.min():a.readTime?Vt(a.readTime):M.min()}(t);return this.listener.R_(e,n)}V_(t){const e={};e.database=ws(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=Es(h)?{documents:ad(o,h)}:{query:cd(o,h).ct},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Za(o,a.resumeToken);const f=vs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(M.min())>0){l.readTime=cr(o,a.snapshotVersion.toTimestamp());const f=vs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);const n=ld(this.serializer,t);n&&(e.labels=n),this.c_(e)}m_(t){const e={};e.database=ws(this.serializer),e.removeTarget=t,this.c_(e)}}class Xd extends lc{constructor(t,e,n,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=o}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(t,e){return this.connection.qo("Write",t,e)}A_(t){return H(!!t.streamToken),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0),this.listener.p_()}onNext(t){H(!!t.streamToken),this.lastStreamToken=t.streamToken,this.r_.reset();const e=od(t.writeResults,t.commitTime),n=Vt(t.commitTime);return this.listener.y_(n,e)}w_(){const t={};t.database=ws(this.serializer),this.c_(t)}g_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>id(this.serializer,n))};this.c_(e)}}/**
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
 */class Yd extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.S_=!1}b_(){if(this.S_)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(t,e,n,s){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Oo(t,Is(e,n),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(C.UNKNOWN,o.toString())})}ko(t,e,n,s,o){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.ko(t,Is(e,n),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(C.UNKNOWN,a.toString())})}terminate(){this.S_=!0,this.connection.terminate()}}class Jd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(t){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.M_("Offline")))}set(t){this.N_(),this.D_=0,t==="Online"&&(this.C_=!1),this.M_(t)}M_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}x_(t){const e=`Could not reach Cloud Firestore backend. ${t}
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
 */class Zd{constructor(t,e,n,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=o,this.Q_.uo(a=>{n.enqueueAndForget(async()=>{he(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=F(h);f.k_.add(4),await En(f),f.K_.set("Unknown"),f.k_.delete(4),await Ir(f)}(this))})}),this.K_=new Jd(n,s)}}async function Ir(r){if(he(r))for(const t of r.q_)await t(!0)}async function En(r){for(const t of r.q_)await t(!1)}function hc(r,t){const e=F(r);e.B_.has(t.targetId)||(e.B_.set(t.targetId,t),Hs(e)?Ks(e):Oe(e).s_()&&$s(e,t))}function zs(r,t){const e=F(r),n=Oe(e);e.B_.delete(t),n.s_()&&dc(e,t),e.B_.size===0&&(n.s_()?n.a_():he(e)&&e.K_.set("Unknown"))}function $s(r,t){if(r.U_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(M.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Oe(r).V_(t)}function dc(r,t){r.U_.xe(t),Oe(r).m_(t)}function Ks(r){r.U_=new Yh({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ut:t=>r.B_.get(t)||null,nt:()=>r.datastore.serializer.databaseId}),Oe(r).start(),r.K_.F_()}function Hs(r){return he(r)&&!Oe(r).i_()&&r.B_.size>0}function he(r){return F(r).k_.size===0}function fc(r){r.U_=void 0}async function tf(r){r.K_.set("Online")}async function ef(r){r.B_.forEach((t,e)=>{$s(r,t)})}async function nf(r,t){fc(r),Hs(r)?(r.K_.O_(t),Ks(r)):r.K_.set("Unknown")}async function rf(r,t,e){if(r.K_.set("Online"),t instanceof Ja&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.B_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.B_.delete(l),s.U_.removeTarget(l))}(r,t)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await lr(r,n)}else if(t instanceof Jn?r.U_.$e(t):t instanceof Ya?r.U_.Je(t):r.U_.Ge(t),!e.isEqual(M.min()))try{const n=await cc(r.localStore);e.compareTo(n)>=0&&await function(o,a){const l=o.U_.it(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.B_.get(f);p&&o.B_.set(f,p.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{const p=o.B_.get(h);if(!p)return;o.B_.set(h,p.withResumeToken(ht.EMPTY_BYTE_STRING,p.snapshotVersion)),dc(o,h);const I=new jt(p.target,h,f,p.sequenceNumber);$s(o,I)}),o.remoteSyncer.applyRemoteEvent(l)}(r,e)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await lr(r,n)}}async function lr(r,t,e){if(!ke(t))throw t;r.k_.add(1),await En(r),r.K_.set("Offline"),e||(e=()=>cc(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),r.k_.delete(1),await Ir(r)})}function mc(r,t){return t().catch(e=>lr(r,e,t))}async function Ar(r){const t=F(r),e=Jt(t);let n=t.L_.length>0?t.L_[t.L_.length-1].batchId:-1;for(;sf(t);)try{const s=await qd(t.localStore,n);if(s===null){t.L_.length===0&&e.a_();break}n=s.batchId,of(t,s)}catch(s){await lr(t,s)}pc(t)&&gc(t)}function sf(r){return he(r)&&r.L_.length<10}function of(r,t){r.L_.push(t);const e=Jt(r);e.s_()&&e.f_&&e.g_(t.mutations)}function pc(r){return he(r)&&!Jt(r).i_()&&r.L_.length>0}function gc(r){Jt(r).start()}async function af(r){Jt(r).w_()}async function cf(r){const t=Jt(r);for(const e of r.L_)t.g_(e.mutations)}async function uf(r,t,e){const n=r.L_.shift(),s=Fs.from(n,t,e);await mc(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Ar(r)}async function lf(r,t){t&&Jt(r).f_&&await async function(n,s){if(function(a){return Qh(a)&&a!==C.ABORTED}(s.code)){const o=n.L_.shift();Jt(n).__(),await mc(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Ar(n)}}(r,t),pc(r)&&gc(r)}async function Wo(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=he(e);e.k_.add(3),await En(e),n&&e.K_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.k_.delete(3),await Ir(e)}async function hf(r,t){const e=F(r);t?(e.k_.delete(2),await Ir(e)):t||(e.k_.add(2),await En(e),e.K_.set("Unknown"))}function Oe(r){return r.W_||(r.W_=function(e,n,s){const o=F(e);return o.b_(),new Wd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(r.datastore,r.asyncQueue,{Ro:tf.bind(null,r),mo:ef.bind(null,r),po:nf.bind(null,r),R_:rf.bind(null,r)}),r.q_.push(async t=>{t?(r.W_.__(),Hs(r)?Ks(r):r.K_.set("Unknown")):(await r.W_.stop(),fc(r))})),r.W_}function Jt(r){return r.G_||(r.G_=function(e,n,s){const o=F(e);return o.b_(),new Xd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(r.datastore,r.asyncQueue,{Ro:()=>Promise.resolve(),mo:af.bind(null,r),po:lf.bind(null,r),p_:cf.bind(null,r),y_:uf.bind(null,r)}),r.q_.push(async t=>{t?(r.G_.__(),await Ar(r)):(await r.G_.stop(),r.L_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.L_.length} pending writes`),r.L_=[]))})),r.G_}/**
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
 */class Qs{constructor(t,e,n,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=o,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,o){const a=Date.now()+n,l=new Qs(t,e,a,s,o);return l.start(n),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ws(r,t){if(Mt("AsyncQueue",`${t}: ${r}`),ke(r))return new x(C.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class ve{static emptySet(t){return new ve(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||O.comparator(e.key,n.key):(e,n)=>O.comparator(e.key,n.key),this.keyedMap=tn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ve)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=n.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
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
 */class Xo{constructor(){this.z_=new J(O.comparator)}track(t){const e=t.doc.key,n=this.z_.get(e);n?t.type!==0&&n.type===3?this.z_=this.z_.insert(e,t):t.type===3&&n.type!==1?this.z_=this.z_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.z_=this.z_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.z_=this.z_.remove(e):t.type===1&&n.type===2?this.z_=this.z_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.z_=this.z_.insert(e,{type:2,doc:t.doc}):L():this.z_=this.z_.insert(e,t)}j_(){const t=[];return this.z_.inorderTraversal((e,n)=>{t.push(n)}),t}}class Pe{constructor(t,e,n,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,n,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Pe(t,e,ve.emptySet(e),a,n,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&gr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class df{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(t=>t.Z_())}}class ff{constructor(){this.queries=Yo(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(e,n){const s=F(e),o=s.queries;s.queries=Yo(),o.forEach((a,l)=>{for(const h of l.J_)h.onError(n)})})(this,new x(C.ABORTED,"Firestore shutting down"))}}function Yo(){return new ue(r=>Fa(r),gr)}async function mf(r,t){const e=F(r);let n=3;const s=t.query;let o=e.queries.get(s);o?!o.Y_()&&t.Z_()&&(n=2):(o=new df,n=t.Z_()?0:1);try{switch(n){case 0:o.H_=await e.onListen(s,!0);break;case 1:o.H_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=Ws(a,`Initialization of query '${_e(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.J_.push(t),t.ea(e.onlineState),o.H_&&t.ta(o.H_)&&Xs(e)}async function pf(r,t){const e=F(r),n=t.query;let s=3;const o=e.queries.get(n);if(o){const a=o.J_.indexOf(t);a>=0&&(o.J_.splice(a,1),o.J_.length===0?s=t.Z_()?0:1:!o.Y_()&&t.Z_()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function gf(r,t){const e=F(r);let n=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.J_)l.ta(s)&&(n=!0);a.H_=s}}n&&Xs(e)}function _f(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const o of s.J_)o.onError(e);n.queries.delete(t)}function Xs(r){r.X_.forEach(t=>{t.next()})}var Ss,Jo;(Jo=Ss||(Ss={})).na="default",Jo.Cache="cache";class yf{constructor(t,e,n){this.query=t,this.ra=e,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=n||{}}ta(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Pe(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ia?this.oa(t)&&(this.ra.next(t),e=!0):this._a(t,this.onlineState)&&(this.aa(t),e=!0),this.sa=t,e}onError(t){this.ra.error(t)}ea(t){this.onlineState=t;let e=!1;return this.sa&&!this.ia&&this._a(this.sa,t)&&(this.aa(this.sa),e=!0),e}_a(t,e){if(!t.fromCache||!this.Z_())return!0;const n=e!=="Offline";return(!this.options.ua||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}oa(t){if(t.docChanges.length>0)return!0;const e=this.sa&&this.sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}aa(t){t=Pe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ia=!0,this.ra.next(t)}Z_(){return this.options.source!==Ss.Cache}}/**
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
 */class _c{constructor(t){this.key=t}}class yc{constructor(t){this.key=t}}class Ef{constructor(t,e){this.query=t,this.da=e,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=B(),this.mutatedKeys=B(),this.Va=Ua(t),this.ma=new ve(this.Va)}get fa(){return this.da}ga(t,e){const n=e?e.pa:new Xo,s=e?e.ma:this.ma;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((p,I)=>{const R=s.get(p),P=_r(this.query,I)?I:null,b=!!R&&this.mutatedKeys.has(R.key),D=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let N=!1;R&&P?R.data.isEqual(P.data)?b!==D&&(n.track({type:3,doc:P}),N=!0):this.ya(R,P)||(n.track({type:2,doc:P}),N=!0,(h&&this.Va(P,h)>0||f&&this.Va(P,f)<0)&&(l=!0)):!R&&P?(n.track({type:0,doc:P}),N=!0):R&&!P&&(n.track({type:1,doc:R}),N=!0,(h||f)&&(l=!0)),N&&(P?(a=a.add(P),o=D?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),n.track({type:1,doc:p})}return{ma:a,pa:n,ss:l,mutatedKeys:o}}ya(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const o=this.ma;this.ma=t.ma,this.mutatedKeys=t.mutatedKeys;const a=t.pa.j_();a.sort((p,I)=>function(P,b){const D=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return D(P)-D(b)}(p.type,I.type)||this.Va(p.doc,I.doc)),this.wa(n),s=s!=null&&s;const l=e&&!s?this.Sa():[],h=this.Ra.size===0&&this.current&&!s?1:0,f=h!==this.Aa;return this.Aa=h,a.length!==0||f?{snapshot:new Pe(this.query,t.ma,o,a,t.mutatedKeys,h===0,f,!1,!!n&&n.resumeToken.approximateByteSize()>0),ba:l}:{ba:l}}ea(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new Xo,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(t){return!this.da.has(t)&&!!this.ma.has(t)&&!this.ma.get(t).hasLocalMutations}wa(t){t&&(t.addedDocuments.forEach(e=>this.da=this.da.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.da=this.da.delete(e)),this.current=t.current)}Sa(){if(!this.current)return[];const t=this.Ra;this.Ra=B(),this.ma.forEach(n=>{this.Da(n.key)&&(this.Ra=this.Ra.add(n.key))});const e=[];return t.forEach(n=>{this.Ra.has(n)||e.push(new yc(n))}),this.Ra.forEach(n=>{t.has(n)||e.push(new _c(n))}),e}va(t){this.da=t.ds,this.Ra=B();const e=this.ga(t.documents);return this.applyChanges(e,!0)}Ca(){return Pe.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}}class Tf{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class vf{constructor(t){this.key=t,this.Fa=!1}}class If{constructor(t,e,n,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ma={},this.xa=new ue(l=>Fa(l),gr),this.Oa=new Map,this.Na=new Set,this.La=new J(O.comparator),this.Ba=new Map,this.ka=new qs,this.qa={},this.Qa=new Map,this.Ka=Ce.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}}async function Af(r,t,e=!0){const n=wc(r);let s;const o=n.xa.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Ca()):s=await Ec(n,t,e,!0),s}async function wf(r,t){const e=wc(r);await Ec(e,t,!0,!1)}async function Ec(r,t,e,n){const s=await Gd(r.localStore,Pt(t)),o=s.targetId,a=r.sharedClientState.addLocalQueryTarget(o,e);let l;return n&&(l=await Rf(r,t,o,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&hc(r.remoteStore,s),l}async function Rf(r,t,e,n,s){r.Ua=(I,R,P)=>async function(D,N,z,K){let Q=N.view.ga(z);Q.ss&&(Q=await Ko(D.localStore,N.query,!1).then(({documents:T})=>N.view.ga(T,Q)));const et=K&&K.targetChanges.get(N.targetId),Nt=K&&K.targetMismatches.get(N.targetId)!=null,at=N.view.applyChanges(Q,D.isPrimaryClient,et,Nt);return ta(D,N.targetId,at.ba),at.snapshot}(r,I,R,P);const o=await Ko(r.localStore,t,!0),a=new Ef(t,o.ds),l=a.ga(o.documents),h=yn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),f=a.applyChanges(l,r.isPrimaryClient,h);ta(r,e,f.ba);const p=new Tf(t,e,a);return r.xa.set(t,p),r.Oa.has(e)?r.Oa.get(e).push(t):r.Oa.set(e,[t]),f.snapshot}async function Sf(r,t,e){const n=F(r),s=n.xa.get(t),o=n.Oa.get(s.targetId);if(o.length>1)return n.Oa.set(s.targetId,o.filter(a=>!gr(a,t))),void n.xa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Rs(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&zs(n.remoteStore,s.targetId),Cs(n,s.targetId)}).catch(Ne)):(Cs(n,s.targetId),await Rs(n.localStore,s.targetId,!0))}async function Cf(r,t){const e=F(r),n=e.xa.get(t),s=e.Oa.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),zs(e.remoteStore,n.targetId))}async function Pf(r,t,e){const n=Of(r);try{const s=await function(a,l){const h=F(a),f=st.now(),p=l.reduce((P,b)=>P.add(b.key),B());let I,R;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let b=Ft(),D=B();return h.hs.getEntries(P,p).next(N=>{b=N,b.forEach((z,K)=>{K.isValidDocument()||(D=D.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,b)).next(N=>{I=N;const z=[];for(const K of l){const Q=jh(K,I.get(K.key).overlayedDocument);Q!=null&&z.push(new le(K.key,Q,ba(Q.value.mapValue),bt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,z,l)}).next(N=>{R=N;const z=N.applyToLocalDocumentSet(I,D);return h.documentOverlayCache.saveOverlays(P,N.batchId,z)})}).then(()=>({batchId:R.batchId,changes:qa(I)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let f=a.qa[a.currentUser.toKey()];f||(f=new J(q)),f=f.insert(l,h),a.qa[a.currentUser.toKey()]=f}(n,s.batchId,e),await Tn(n,s.changes),await Ar(n.remoteStore)}catch(s){const o=Ws(s,"Failed to persist write");e.reject(o)}}async function Tc(r,t){const e=F(r);try{const n=await Ud(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Ba.get(o);a&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Fa=!0:s.modifiedDocuments.size>0?H(a.Fa):s.removedDocuments.size>0&&(H(a.Fa),a.Fa=!1))}),await Tn(e,n,t)}catch(n){await Ne(n)}}function Zo(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.xa.forEach((o,a)=>{const l=a.view.ea(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach((p,I)=>{for(const R of I.J_)R.ea(l)&&(f=!0)}),f&&Xs(h)}(n.eventManager,t),s.length&&n.Ma.R_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function bf(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Ba.get(t),o=s&&s.key;if(o){let a=new J(O.comparator);a=a.insert(o,yt.newNoDocument(o,M.min()));const l=B().add(o),h=new Tr(M.min(),new Map,new J(q),a,l);await Tc(n,h),n.La=n.La.remove(o),n.Ba.delete(t),Ys(n)}else await Rs(n.localStore,t,!1).then(()=>Cs(n,t,e)).catch(Ne)}async function Vf(r,t){const e=F(r),n=t.batch.batchId;try{const s=await Fd(e.localStore,t);Ic(e,n,null),vc(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Tn(e,s)}catch(s){await Ne(s)}}async function Df(r,t,e){const n=F(r);try{const s=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,l).next(I=>(H(I!==null),p=I.keys(),h.mutationQueue.removeMutationBatch(f,I))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(n.localStore,t);Ic(n,t,e),vc(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Tn(n,s)}catch(s){await Ne(s)}}function vc(r,t){(r.Qa.get(t)||[]).forEach(e=>{e.resolve()}),r.Qa.delete(t)}function Ic(r,t,e){const n=F(r);let s=n.qa[n.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),n.qa[n.currentUser.toKey()]=s}}function Cs(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Oa.get(t))r.xa.delete(n),e&&r.Ma.Wa(n,e);r.Oa.delete(t),r.isPrimaryClient&&r.ka.yr(t).forEach(n=>{r.ka.containsKey(n)||Ac(r,n)})}function Ac(r,t){r.Na.delete(t.path.canonicalString());const e=r.La.get(t);e!==null&&(zs(r.remoteStore,e),r.La=r.La.remove(t),r.Ba.delete(e),Ys(r))}function ta(r,t,e){for(const n of e)n instanceof _c?(r.ka.addReference(n.key,t),Nf(r,n)):n instanceof yc?(k("SyncEngine","Document no longer in limbo: "+n.key),r.ka.removeReference(n.key,t),r.ka.containsKey(n.key)||Ac(r,n.key)):L()}function Nf(r,t){const e=t.key,n=e.path.canonicalString();r.La.get(e)||r.Na.has(n)||(k("SyncEngine","New document in limbo: "+e),r.Na.add(n),Ys(r))}function Ys(r){for(;r.Na.size>0&&r.La.size<r.maxConcurrentLimboResolutions;){const t=r.Na.values().next().value;r.Na.delete(t);const e=new O(Y.fromString(t)),n=r.Ka.next();r.Ba.set(n,new vf(e)),r.La=r.La.insert(e,n),hc(r.remoteStore,new jt(Pt(La(e.path)),n,"TargetPurposeLimboResolution",fr.oe))}}async function Tn(r,t,e){const n=F(r),s=[],o=[],a=[];n.xa.isEmpty()||(n.xa.forEach((l,h)=>{a.push(n.Ua(h,t,e).then(f=>{var p;if((f||e)&&n.isPrimaryClient){const I=f?!f.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;n.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(f){s.push(f);const I=js.zi(h.targetId,f);o.push(I)}}))}),await Promise.all(a),n.Ma.R_(s),await async function(h,f){const p=F(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(f,R=>S.forEach(R.Wi,P=>p.persistence.referenceDelegate.addReference(I,R.targetId,P)).next(()=>S.forEach(R.Gi,P=>p.persistence.referenceDelegate.removeReference(I,R.targetId,P)))))}catch(I){if(!ke(I))throw I;k("LocalStore","Failed to update sequence numbers: "+I)}for(const I of f){const R=I.targetId;if(!I.fromCache){const P=p.us.get(R),b=P.snapshotVersion,D=P.withLastLimboFreeSnapshotVersion(b);p.us=p.us.insert(R,D)}}}(n.localStore,o))}async function kf(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const n=await ac(e.localStore,t);e.currentUser=t,function(o,a){o.Qa.forEach(l=>{l.forEach(h=>{h.reject(new x(C.CANCELLED,a))})}),o.Qa.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Tn(e,n.Ts)}}function xf(r,t){const e=F(r),n=e.Ba.get(t);if(n&&n.Fa)return B().add(n.key);{let s=B();const o=e.Oa.get(t);if(!o)return s;for(const a of o){const l=e.xa.get(a);s=s.unionWith(l.view.fa)}return s}}function wc(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Tc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=xf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=bf.bind(null,t),t.Ma.R_=gf.bind(null,t.eventManager),t.Ma.Wa=_f.bind(null,t.eventManager),t}function Of(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Vf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Df.bind(null,t),t}class hr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=vr(t.databaseInfo.databaseId),this.sharedClientState=this.za(t),this.persistence=this.ja(t),await this.persistence.start(),this.localStore=this.Ha(t),this.gcScheduler=this.Ja(t,this.localStore),this.indexBackfillerScheduler=this.Ya(t,this.localStore)}Ja(t,e){return null}Ya(t,e){return null}Ha(t){return Md(this.persistence,new Od,t.initialUser,this.serializer)}ja(t){return new oc(Gs.ei,this.serializer)}za(t){return new zd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}hr.provider={build:()=>new hr};class Lf extends hr{constructor(t){super(),this.cacheSizeBytes=t}Ja(t,e){H(this.persistence.referenceDelegate instanceof ur);const n=this.persistence.referenceDelegate.garbageCollector;return new Td(n,t.asyncQueue,e)}ja(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new oc(n=>ur.ei(n,e),this.serializer)}}class Ps{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Zo(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=kf.bind(null,this.syncEngine),await hf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new ff}()}createDatastore(t){const e=vr(t.databaseInfo.databaseId),n=function(o){return new Qd(o)}(t.databaseInfo);return function(o,a,l,h){return new Yd(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,o,a,l){return new Zd(n,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>Zo(this.syncEngine,e,0),function(){return Qo.p()?new Qo:new $d}())}createSyncEngine(t,e){return function(s,o,a,l,h,f,p){const I=new If(s,o,a,l,h,f);return p&&(I.$a=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);k("RemoteStore","RemoteStore shutting down."),o.k_.add(5),await En(o),o.Q_.shutdown(),o.K_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Ps.provider={build:()=>new Ps};/**
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
 */class Mf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Xa(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Xa(this.observer.error,t):Mt("Uncaught Error in snapshot listener:",t.toString()))}eu(){this.muted=!0}Xa(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class Ff{constructor(t,e,n,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=_t.UNAUTHENTICATED,this.clientId=Sa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async a=>{k("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(k("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ws(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function ss(r,t){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await ac(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function ea(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Uf(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Wo(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Wo(t.remoteStore,s)),r._onlineComponents=t}async function Uf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await ss(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Ae("Error using user provided cache. Falling back to memory cache: "+e),await ss(r,new hr)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await ss(r,new Lf(void 0));return r._offlineComponents}async function Rc(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await ea(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await ea(r,new Ps))),r._onlineComponents}function Bf(r){return Rc(r).then(t=>t.syncEngine)}async function qf(r){const t=await Rc(r),e=t.eventManager;return e.onListen=Af.bind(null,t.syncEngine),e.onUnlisten=Sf.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=wf.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Cf.bind(null,t.syncEngine),e}function Gf(r,t,e={}){const n=new Kt;return r.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,f){const p=new Mf({next:R=>{p.eu(),a.enqueueAndForget(()=>pf(o,I)),R.fromCache&&h.source==="server"?f.reject(new x(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(R)},error:R=>f.reject(R)}),I=new yf(l,p,{includeMetadataChanges:!0,ua:!0});return mf(o,I)}(await qf(r),r.asyncQueue,t,e,n)),n.promise}/**
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
 */function Sc(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const na=new Map;/**
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
 */function Cc(r,t,e){if(!e)throw new x(C.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function jf(r,t,e,n){if(t===!0&&n===!0)throw new x(C.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function ra(r){if(!O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function sa(r){if(O.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function wr(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":L()}function gn(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new x(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=wr(r);throw new x(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */class ia{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new x(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}jf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Sc((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Rr{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ia({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new x(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ia(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Xl;switch(n.type){case"firstParty":return new th(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=na.get(e);n&&(k("ComponentProvider","Removing Datastore"),na.delete(e),n.terminate())}(this),Promise.resolve()}}function zf(r,t,e,n={}){var s;const o=(r=gn(r,Rr))._getSettings(),a=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Ae("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),n.mockUserToken){let l,h;if(typeof n.mockUserToken=="string")l=n.mockUserToken,h=_t.MOCK_USER;else{l=Du(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const f=n.mockUserToken.sub||n.mockUserToken.user_id;if(!f)throw new x(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new _t(f)}r._authCredentials=new Yl(new Ra(l,h))}}/**
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
 */class Zt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Zt(this.firestore,t,this._query)}}class wt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new wt(this.firestore,t,this._key)}}class Ht extends Zt{constructor(t,e,n){super(t,e,La(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new wt(this.firestore,null,new O(t))}withConverter(t){return new Ht(this.firestore,t,this._path)}}function $n(r,t,...e){if(r=Ie(r),Cc("collection","path",t),r instanceof Rr){const n=Y.fromString(t,...e);return sa(n),new Ht(r,null,n)}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return sa(n),new Ht(r.firestore,null,n)}}function $f(r,t,...e){if(r=Ie(r),arguments.length===1&&(t=Sa.newId()),Cc("doc","path",t),r instanceof Rr){const n=Y.fromString(t,...e);return ra(n),new wt(r,null,new O(n))}{if(!(r instanceof wt||r instanceof Ht))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return ra(n),new wt(r.firestore,r instanceof Ht?r.converter:null,new O(n))}}/**
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
 */class oa{constructor(t=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new uc(this,"async_queue_retry"),this.fu=()=>{const n=rs();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.r_.Jo()},this.gu=t;const e=rs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.pu(),this.yu(t)}enterRestrictedMode(t){if(!this.Eu){this.Eu=!0,this.Vu=t||!1;const e=rs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.fu)}}enqueue(t){if(this.pu(),this.Eu)return new Promise(()=>{});const e=new Kt;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Iu.push(t),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(t){if(!ke(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(t){const e=this.gu.then(()=>(this.Ru=!0,t().catch(n=>{this.Au=n,this.Ru=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(n);throw Mt("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.Ru=!1,n))));return this.gu=e,e}enqueueAfterDelay(t,e,n){this.pu(),this.mu.indexOf(t)>-1&&(e=0);const s=Qs.createAndSchedule(this,t,e,n,o=>this.Su(o));return this.du.push(s),s}pu(){this.Au&&L()}verifyOperationInProgress(){}async bu(){let t;do t=this.gu,await t;while(t!==this.gu)}Du(t){for(const e of this.du)if(e.timerId===t)return!0;return!1}vu(t){return this.bu().then(()=>{this.du.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.du)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.bu()})}Cu(t){this.mu.push(t)}Su(t){const e=this.du.indexOf(t);this.du.splice(e,1)}}class Sr extends Rr{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new oa,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new oa(t),this._firestoreClient=void 0,await t}}}function Kf(r,t){const e=typeof r=="object"?r:Bl(),n=typeof r=="string"?r:"(default)",s=Ll(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const o=bu("firestore");o&&zf(s,...o)}return s}function Pc(r){if(r._terminated)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Hf(r),r._firestoreClient}function Hf(r){var t,e,n;const s=r._freezeSettings(),o=function(l,h,f,p){return new ph(l,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Sc(p.experimentalLongPollingOptions),p.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new Ff(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(l){const h=l?._online.build();return{_offline:l?._offline.build(h),_online:h}}(r._componentsProvider))}/**
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
 */class Js{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new x(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class bc{constructor(t){this._methodName=t}}/**
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
 */class Zs{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new x(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new x(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return q(this._lat,t._lat)||q(this._long,t._long)}}/**
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
 */class ti{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
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
 */const Qf=/^__.*__$/;class Wf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new le(t,this.data,this.fieldMask,e,this.fieldTransforms):new _n(t,this.data,e,this.fieldTransforms)}}function Vc(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class ei{constructor(t,e,n,s,o,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,o===void 0&&this.Fu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(t){return new ei(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.xu({path:n,Nu:!1});return s.Lu(t),s}Bu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.xu({path:n,Nu:!1});return s.Fu(),s}ku(t){return this.xu({path:void 0,Nu:!0})}qu(t){return dr(t,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Fu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Lu(this.path.get(t))}Lu(t){if(t.length===0)throw this.qu("Document fields must not be empty");if(Vc(this.Mu)&&Qf.test(t))throw this.qu('Document fields cannot begin and end with "__"')}}class Xf{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||vr(t)}$u(t,e,n,s=!1){return new ei({Mu:t,methodName:e,Ku:n,path:lt.emptyPath(),Nu:!1,Qu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Dc(r){const t=r._freezeSettings(),e=vr(r._databaseId);return new Xf(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Yf(r,t,e,n,s,o={}){const a=r.$u(o.merge||o.mergeFields?2:0,t,e,s);xc("Data must be an object, but it was:",a,n);const l=Nc(n,a);let h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const I of o.mergeFields){const R=Zf(t,I,e);if(!a.contains(R))throw new x(C.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);em(p,R)||p.push(R)}h=new St(p),f=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,f=a.fieldTransforms;return new Wf(new At(l),h,f)}function Jf(r,t,e,n=!1){return ni(e,r.$u(n?4:3,t))}function ni(r,t){if(kc(r=Ie(r)))return xc("Unsupported field value:",t,r),Nc(r,t);if(r instanceof bc)return function(n,s){if(!Vc(s.Mu))throw s.qu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.qu(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.Nu&&t.Mu!==4)throw t.qu("Nested arrays are not supported");return function(n,s){const o=[];let a=0;for(const l of n){let h=ni(l,s.ku(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(r,t)}return function(n,s){if((n=Ie(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Mh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=st.fromDate(n);return{timestampValue:cr(s.serializer,o)}}if(n instanceof st){const o=new st(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:cr(s.serializer,o)}}if(n instanceof Zs)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof be)return{bytesValue:Za(s.serializer,n._byteString)};if(n instanceof wt){const o=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(o))throw s.qu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Bs(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof ti)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.qu("VectorValues must only contain numeric values.");return Ls(l.serializer,h)})}}}}}}(n,s);throw s.qu(`Unsupported field value: ${wr(n)}`)}(r,t)}function Nc(r,t){const e={};return Ca(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ce(r,(n,s)=>{const o=ni(s,t.Ou(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function kc(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof st||r instanceof Zs||r instanceof be||r instanceof wt||r instanceof bc||r instanceof ti)}function xc(r,t,e){if(!kc(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const n=wr(e);throw n==="an object"?t.qu(r+" a custom object"):t.qu(r+" "+n)}}function Zf(r,t,e){if((t=Ie(t))instanceof Js)return t._internalPath;if(typeof t=="string")return Oc(r,t);throw dr("Field path arguments must be of type string or ",r,!1,void 0,e)}const tm=new RegExp("[~\\*/\\[\\]]");function Oc(r,t,e){if(t.search(tm)>=0)throw dr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Js(...t.split("."))._internalPath}catch{throw dr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function dr(r,t,e,n,s){const o=n&&!n.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${n}`),a&&(h+=` in document ${s}`),h+=")"),new x(C.INVALID_ARGUMENT,l+r+h)}function em(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class Lc{constructor(t,e,n,s,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new nm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(ri("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class nm extends Lc{data(){return super.data()}}function ri(r,t){return typeof t=="string"?Oc(r,t):t instanceof Js?t._internalPath:t._delegate._internalPath}/**
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
 */function rm(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class si{}class ii extends si{}function is(r,t,...e){let n=[];t instanceof si&&n.push(t),n=n.concat(e),function(o){const a=o.filter(h=>h instanceof ai).length,l=o.filter(h=>h instanceof oi).length;if(a>1||a>0&&l>0)throw new x(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class oi extends ii{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new oi(t,e,n)}_apply(t){const e=this._parse(t);return Mc(t._query,e),new Zt(t.firestore,t.converter,Ts(t._query,e))}_parse(t){const e=Dc(t.firestore);return function(o,a,l,h,f,p,I){let R;if(f.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new x(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ca(I,p);const P=[];for(const b of I)P.push(aa(h,o,b));R={arrayValue:{values:P}}}else R=aa(h,o,I)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ca(I,p),R=Jf(l,a,I,p==="in"||p==="not-in");return rt.create(f,p,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class ai extends si{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ai(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Ct.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)Mc(a,h),a=Ts(a,h)}(t._query,e),new Zt(t.firestore,t.converter,Ts(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ci extends ii{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ci(t,e)}_apply(t){const e=function(s,o,a){if(s.startAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new x(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new fn(o,a)}(t._query,this._field,this._direction);return new Zt(t.firestore,t.converter,function(s,o){const a=s.explicitOrderBy.concat([o]);return new xe(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function os(r,t="asc"){const e=t,n=ri("orderBy",r);return ci._create(n,e)}class ui extends ii{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ui(t,e,n)}_apply(t){return new Zt(t.firestore,t.converter,ir(t._query,this._limit,this._limitType))}}function as(r){return ui._create("limit",r,"F")}function aa(r,t,e){if(typeof(e=Ie(e))=="string"){if(e==="")throw new x(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ma(t)&&e.indexOf("/")!==-1)throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Y.fromString(e));if(!O.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Po(r,new O(n))}if(e instanceof wt)return Po(r,e._key);throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wr(e)}.`)}function ca(r,t){if(!Array.isArray(r)||r.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Mc(r,t){const e=function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class sm{convertValue(t,e="none"){switch(Yt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return ce(t,(s,o)=>{n[s]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,s;const o=(s=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>tt(a.doubleValue));return new ti(o)}convertGeoPoint(t){return new Zs(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=pr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ln(t));default:return null}}convertTimestamp(t){const e=Wt(t);return new st(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);H(ic(n));const s=new hn(n.get(1),n.get(3)),o=new O(n.popFirst(5));return s.isEqual(e)||Mt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
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
 */function im(r,t,e){let n;return n=r?r.toFirestore(t):t,n}/**
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
 */class Kn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class om extends Lc{constructor(t,e,n,s,o,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(ri("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Zn extends om{data(t={}){return super.data(t)}}class am{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Kn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Zn(this._firestore,this._userDataWriter,n.key,n,new Kn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new x(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new Zn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Kn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new Zn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Kn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,p=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:cm(l.type),doc:h,oldIndex:f,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function cm(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}class um extends sm{constructor(t){super(),this.firestore=t}convertBytes(t){return new be(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new wt(this.firestore,null,e)}}function cs(r){r=gn(r,Zt);const t=gn(r.firestore,Sr),e=Pc(t),n=new um(t);return rm(r._query),Gf(e,r._query).then(s=>new am(t,n,r,s))}function lm(r){return Fc(gn(r.firestore,Sr),[new Ms(r._key,bt.none())])}function hm(r,t){const e=gn(r.firestore,Sr),n=$f(r),s=im(r.converter,t);return Fc(e,[Yf(Dc(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,bt.exists(!1))]).then(()=>n)}function Fc(r,t){return function(n,s){const o=new Kt;return n.asyncQueue.enqueueAndForget(async()=>Pf(await Bf(n),s,o)),o.promise}(Pc(r),t)}(function(t,e=!0){(function(s){De=s})(Ul),nr(new an("firestore",(n,{instanceIdentifier:s,options:o})=>{const a=n.getProvider("app").getImmediate(),l=new Sr(new Jl(n.getProvider("auth-internal")),new nh(n.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new x(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hn(f.options.projectId,p)}(a,s),a);return o=Object.assign({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Te(Io,"4.7.5",t),Te(Io,"4.7.5","esm2017")})();var dm="firebase",fm="11.1.0";/**
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
 */Te(dm,fm,"app");const mm={apiKey:"AIzaSyDi-8StlfNmKlZVPPhS8CKCjDCIqrJfNFc",authDomain:"snakeysnake-34426.firebaseapp.com",projectId:"snakeysnake-34426",storageBucket:"snakeysnake-34426.firebasestorage.app",messagingSenderId:"701773775110",appId:"1:701773775110:web:252b8dd41bcb28ea545e87",measurementId:"G-S95YBN43ME"},pm=ga(mm),Hn=Kf(pm);class gm{constructor(){this.canvas=document.getElementById("gameCanvas"),this.ctx=this.canvas.getContext("2d"),this.currentScoreElement=document.getElementById("currentScore"),this.highScoreElement=document.getElementById("highScore"),this.modal=document.getElementById("gameOverModal"),this.finalScoreElement=document.getElementById("finalScore"),this.finalHighScoreElement=document.getElementById("finalHighScore"),this.submitScoreButton=document.getElementById("submitScore"),this.playerNameInput=document.getElementById("playerName"),this.nameInputContainer=document.getElementById("nameInputContainer"),this.validateElements(),this.initializeGame(),this.setupEventListeners(),this.initializePointsGuide()}validateElements(){if(!this.canvas||!this.ctx||!this.currentScoreElement||!this.highScoreElement||!this.modal||!this.finalScoreElement||!this.finalHighScoreElement||!this.submitScoreButton||!this.playerNameInput||!this.nameInputContainer)throw new Error("Required DOM elements not found")}initializeGame(){this.lastRenderTime=0,this.gameOver=!1,this.snake=[{x:10,y:10}],this.dx=0,this.dy=0,this.score=0,this.highScore=parseInt(localStorage.getItem("snakeHighScore"))||0,this.highScoreElement.textContent=this.highScore,this.food=this.getRandomFoodPosition(),this.goldenApple=null,this.goldenAppleTimer=null,this.lastDirectionChange=0,this.directionChangeThreshold=50}setupEventListeners(){this.boundHandleKeyPress=this.handleKeyPress.bind(this),this.boundGameLoop=this.gameLoop.bind(this),document.addEventListener("keydown",this.boundHandleKeyPress)}cleanup(){this.goldenAppleTimer&&(clearTimeout(this.goldenAppleTimer),this.goldenAppleTimer=null),document.removeEventListener("keydown",this.boundHandleKeyPress)}handleKeyPress(t){if(t.key.startsWith("Arrow")&&t.preventDefault(),this.gameOver){if(t.key===" "){document.activeElement!==this.playerNameInput&&(t.preventDefault(),this.startNewGame());return}if(t.key==="Enter"&&this.nameInputContainer.style.display==="block"){t.preventDefault(),this.playerNameInput.value.trim()&&this.boundSubmitScore();return}return}const e=Date.now();if(e-this.lastDirectionChange<this.directionChangeThreshold)return;const n=this.snake[0];let s=n.x,o=n.y;switch(t.key){case"ArrowUp":this.dy===0&&(o=n.y-1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=0,this.dy=-1,this.lastDirectionChange=e));break;case"ArrowDown":this.dy===0&&(o=n.y+1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=0,this.dy=1,this.lastDirectionChange=e));break;case"ArrowLeft":this.dx===0&&(s=n.x-1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=-1,this.dy=0,this.lastDirectionChange=e));break;case"ArrowRight":this.dx===0&&(s=n.x+1,(this.snake.length<=1||o!==this.snake[1].y||s!==this.snake[1].x)&&(this.dx=1,this.dy=0,this.lastDirectionChange=e));break}}getRandomPosition(){let t,e=!1;for(;!e;){t={x:Math.floor(Math.random()*U.TILE_COUNT),y:Math.floor(Math.random()*U.TILE_COUNT)},e=!0;for(let n of this.snake)if(n.x===t.x&&n.y===t.y){e=!1;break}this.food&&t.x===this.food.x&&t.y===this.food.y&&(e=!1),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(e=!1)}return t}getRandomFoodPosition(){return{...this.getRandomPosition(),type:U.FRUITS[0]}}trySpawnGoldenApple(){if(!this.goldenApple&&Math.random()<U.GOLDEN_APPLE_CHANCE){const t=this.getRandomPosition();this.goldenApple={...t,type:U.FRUITS[1]},this.goldenAppleTimer=setTimeout(()=>{this.goldenApple=null},U.GOLDEN_APPLE_DURATION)}}update(){const t={x:this.snake[0].x+this.dx,y:this.snake[0].y+this.dy};this.snake.unshift(t);let e=!1;if(t.x===this.food.x&&t.y===this.food.y&&(this.score+=this.food.type.points,this.currentScoreElement.textContent=this.score,this.food=this.getRandomFoodPosition(),this.trySpawnGoldenApple(),e=!0),this.goldenApple&&t.x===this.goldenApple.x&&t.y===this.goldenApple.y&&(this.score+=this.goldenApple.type.points,this.currentScoreElement.textContent=this.score,clearTimeout(this.goldenAppleTimer),this.goldenApple=null,e=!0),e||this.snake.pop(),this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.highScore),this.highScoreElement.textContent=this.highScore),t.x<0||t.x>=U.TILE_COUNT||t.y<0||t.y>=U.TILE_COUNT){this.gameOver=!0,this.showGameOver();return}for(let n=1;n<this.snake.length;n++)if(t.x===this.snake[n].x&&t.y===this.snake[n].y){this.gameOver=!0,this.showGameOver();return}}render(){if(this.snake.length>0){this.ctx.fillStyle=U.COLORS.BACKGROUND,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.beginPath();const t={x:this.snake[0].x*U.GRID_SIZE+U.GRID_SIZE/2,y:this.snake[0].y*U.GRID_SIZE+U.GRID_SIZE/2};this.ctx.moveTo(t.x,t.y);for(let N=0;N<this.snake.length-1;N++){const z={x:this.snake[N].x*U.GRID_SIZE+U.GRID_SIZE/2,y:this.snake[N].y*U.GRID_SIZE+U.GRID_SIZE/2},K={x:this.snake[N+1].x*U.GRID_SIZE+U.GRID_SIZE/2,y:this.snake[N+1].y*U.GRID_SIZE+U.GRID_SIZE/2},Q=(z.x+K.x)/2,et=(z.y+K.y)/2;this.ctx.quadraticCurveTo(z.x,z.y,Q,et)}this.ctx.shadowColor="rgba(0, 0, 0, 0.4)",this.ctx.shadowBlur=6,this.ctx.shadowOffsetX=2,this.ctx.shadowOffsetY=2;const e=this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height);e.addColorStop(0,U.COLORS.SNAKE_BASE),e.addColorStop(.3,U.COLORS.SNAKE_LIGHT),e.addColorStop(.6,U.COLORS.SNAKE_BASE),e.addColorStop(.9,U.COLORS.SNAKE_DARK),this.ctx.strokeStyle=e,this.ctx.lineWidth=U.GRID_SIZE-2,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.stroke(),this.ctx.shadowColor="transparent",this.ctx.shadowBlur=0,this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0;const n=this.snake[0],s=n.x*U.GRID_SIZE+U.GRID_SIZE/2,o=n.y*U.GRID_SIZE+U.GRID_SIZE/2,a=(U.GRID_SIZE-2)/2,l=this.ctx.createRadialGradient(s-a/2,o-a/2,a/4,s,o,a);l.addColorStop(0,U.COLORS.SNAKE_LIGHT),l.addColorStop(.7,U.COLORS.SNAKE_BASE),l.addColorStop(1,U.COLORS.SNAKE_DARK),this.ctx.beginPath(),this.ctx.fillStyle=l,this.ctx.arc(s,o,a,0,Math.PI*2),this.ctx.fill();const h=a*.5;let f=s-h,p=s+h,I=o,R=s,P=o,b=s,D=o;this.dx===1?(I=o-a*.3,R=s+a*.8,b=s+a+8):this.dx===-1?(I=o-a*.3,R=s-a*.8,b=s-a-8):this.dy===-1?(f=s-a*.3,p=s+a*.3,I=o-h,P=o-a*.8,D=o-a-8):this.dy===1&&(f=s-a*.3,p=s+a*.3,I=o+h,P=o+a*.8,D=o+a+8),this.ctx.fillStyle="#000",this.ctx.beginPath(),this.ctx.arc(f,I,2.5,0,Math.PI*2),this.ctx.arc(p,I,2.5,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.8)",this.ctx.beginPath(),this.ctx.arc(f-.5,I-.5,1,0,Math.PI*2),this.ctx.arc(p-.5,I-.5,1,0,Math.PI*2),this.ctx.fill(),(this.dx!==0||this.dy!==0)&&(this.ctx.strokeStyle=U.COLORS.TONGUE,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(R,P),this.ctx.lineTo(b,D),this.dx===1?(this.ctx.quadraticCurveTo(b+2,D,b+2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b+2,D,b+2,D+3)):this.dx===-1?(this.ctx.quadraticCurveTo(b-2,D,b-2,D-3),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b-2,D,b-2,D+3)):this.dy===-1?(this.ctx.quadraticCurveTo(b,D-2,b-3,D-2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D-2,b+3,D-2)):this.dy===1&&(this.ctx.quadraticCurveTo(b,D+2,b-3,D+2),this.ctx.moveTo(b,D),this.ctx.quadraticCurveTo(b,D+2,b+3,D+2)),this.ctx.stroke())}this.drawFruit(this.food),this.goldenApple&&this.drawFruit(this.goldenApple)}drawFruit(t){const e=t.x*U.GRID_SIZE,n=t.y*U.GRID_SIZE;this.ctx.fillStyle=t.type.color,this.ctx.beginPath(),this.ctx.arc(e+U.GRID_SIZE/2,n+U.GRID_SIZE/2,U.GRID_SIZE/2-2,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle=t.type.leafColor,this.ctx.beginPath(),this.ctx.ellipse(e+U.GRID_SIZE/2,n,4,8,Math.PI/4,0,Math.PI*2),this.ctx.fill()}gameLoop(t){try{if(this.gameOver||(window.requestAnimationFrame(this.boundGameLoop),(t-this.lastRenderTime)/1e3<1/U.GAME_SPEED))return;this.lastRenderTime=t,this.update(),this.render()}catch(e){console.error("Game loop error:",e),this.gameOver=!0,this.showGameOver()}}async showGameOver(){this.cleanup(),this.finalScoreElement.textContent=this.score,this.finalHighScoreElement.textContent=this.highScore,this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.highScore),this.highScoreElement.textContent=this.highScore);const t=document.querySelector(".celebration-message");t&&t.remove(),await this.checkAndShowNameInput(),this.modal.style.display="block",this.boundSubmitScore&&this.submitScoreButton.removeEventListener("click",this.boundSubmitScore),this.boundSubmitScore=async()=>{const e=this.playerNameInput.value.trim();e&&await this.saveGlobalScore(e,this.score)},this.submitScoreButton.addEventListener("click",this.boundSubmitScore)}async checkAndShowNameInput(){try{const t=localStorage.getItem("lastScoreSubmission"),e=Date.now();if(t&&e-parseInt(t)<6e4){this.nameInputContainer.style.display="none",this.modal.querySelector(".modal-content").insertAdjacentHTML("beforeend",`
              <p class="restart-hint">
                  Please wait before submitting another score.<br>
                  Press <span class="key">Space</span> to restart
              </p>
          `);return}const s=await this.getGlobalTopScores(),o=s.length<5||this.score>s[s.length-1].score;this.nameInputContainer.style.display=o?"block":"none",o||document.querySelector(".restart-hint")||this.modal.querySelector(".modal-content").insertAdjacentHTML("beforeend",`
                  <p class="restart-hint">
                      Press <span class="key">Space</span> to restart
                  </p>
              `)}catch(t){console.error("Error checking top scores:",t),this.nameInputContainer.style.display="none"}}async getGlobalTopScores(){try{const t=is($n(Hn,"highscores"),os("score","desc"),as(5));return(await cs(t)).docs.map(s=>({id:s.id,...s.data()}))}catch(t){return console.error("Error fetching global scores:",t),[]}}async saveGlobalScore(t,e){try{if(t=this.sanitizePlayerName(t),!t||!Number.isInteger(e)||e<0)throw new Error("Invalid score or name");const n=is($n(Hn,"highscores"),os("score","desc"),as(5)),o=(await cs(n)).docs;if(o.length>=5){const p=o[o.length-1].data().score;if(e<=p){console.log("Score not high enough for top 5");return}await lm(o[o.length-1].ref)}const a={name:t,score:e,timestamp:new Date};await hm($n(Hn,"highscores"),a),await this.updateGlobalTopScores();const l=`
          <div class="celebration-message">
              <h3>🏆 Incredible Score! 🏆</h3>
              <p>You've made it into the Hall of Fame!</p>
          </div>
      `,h=document.getElementById("nameInputContainer");h.style.display="none";const f=document.querySelector(".celebration-message");f&&f.remove(),h.insertAdjacentHTML("afterend",l)}catch(n){console.error("Error saving global score:",n),alert("Failed to save score. Please try again.")}}async startNewGame(){this.modal.style.display="none",this.nameInputContainer.style.display="none",this.playerNameInput.value="",this.initializeGame(),this.setupEventListeners(),await this.updateGlobalTopScores(),requestAnimationFrame(this.boundGameLoop)}initializePointsGuide(){document.querySelectorAll(".apple-icon").forEach(e=>{const n=e.getContext("2d"),s=e.classList.contains("golden"),o={type:U.FRUITS[s?1:0]};n.fillStyle=o.type.color,n.beginPath(),n.arc(10,10,8,0,Math.PI*2),n.fill(),n.fillStyle=o.type.leafColor,n.beginPath(),n.ellipse(10,4,2,4,Math.PI/4,0,Math.PI*2),n.fill()})}async updateGlobalTopScores(){try{const t=is($n(Hn,"highscores"),os("score","desc"),as(5)),n=(await cs(t)).docs.map(l=>({id:l.id,...l.data()})),s=document.getElementById("topScores"),a=Array.from({length:5},(l,h)=>{const f=n[h]||null;return`
              <li>
                  <div class="score-row">
                      <div class="score-left">
                          <span class="position">${h+1}.</span>
                          <span class="player-name">${f?f.name:"---"}</span>
                      </div>
                      <span class="score-value">${f?f.score:"---"}</span>
                  </div>
              </li>
          `}).join("");s.innerHTML=a}catch(t){console.error("Error in updateGlobalTopScores:",t)}}sanitizePlayerName(t){return t?t.replace(/[<>]/g,"").replace(/[^\w\s-]/g,"").trim():""}}window.onerror=function(r,t,e,n,s){console.error("Game error:",{message:r,source:t,lineno:e,colno:n,error:s});const o=window.gameInstance;return o&&(o.cleanup(),o.showGameOver()),!0};try{window.gameInstance=new gm,window.gameInstance.startNewGame()}catch(r){console.error("Failed to initialize game:",r)}
