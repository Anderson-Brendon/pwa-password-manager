import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  merge,
  mergeMap,
  shareReplay,
  startWith
} from "./chunk-H7XVPIDD.js";
import {
  __async,
  __yieldStar
} from "./chunk-7RSYZEEK.js";

// node_modules/rxdb/dist/esm/plugins/utils/utils-array.js
function lastOfArray(ar) {
  return ar[ar.length - 1];
}
function shuffleArray(arr) {
  return arr.slice(0).sort(() => Math.random() - 0.5);
}
function randomOfArray(arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
}
function toArray(input) {
  return Array.isArray(input) ? input.slice(0) : [input];
}
function batchArray(array, batchSize) {
  array = array.slice(0);
  var ret = [];
  while (array.length) {
    var batch = array.splice(0, batchSize);
    ret.push(batch);
  }
  return ret;
}
function removeOneFromArrayIfMatches(ar, condition) {
  ar = ar.slice();
  var i = ar.length;
  var done = false;
  while (i-- && !done) {
    if (condition(ar[i])) {
      done = true;
      ar.splice(i, 1);
    }
  }
  return ar;
}
function isMaybeReadonlyArray(x) {
  return Array.isArray(x);
}
function isOneItemOfArrayInOtherArray(ar1, ar2) {
  for (var i = 0; i < ar1.length; i++) {
    var el = ar1[i];
    var has2 = ar2.includes(el);
    if (has2) {
      return true;
    }
  }
  return false;
}
function arrayFilterNotEmpty(value) {
  if (value === null || value === void 0) {
    return false;
  }
  return true;
}
function countUntilNotMatching(ar, matchingFn) {
  var count = 0;
  var idx = -1;
  for (var item of ar) {
    idx = idx + 1;
    var matching = matchingFn(item, idx);
    if (matching) {
      count = count + 1;
    } else {
      break;
    }
  }
  return count;
}
function asyncFilter(array, predicate) {
  return __async(this, null, function* () {
    var filters = yield Promise.all(array.map(predicate));
    return array.filter((...[, index]) => filters[index]);
  });
}
function sumNumberArray(array) {
  var count = 0;
  for (var i = array.length; i--; ) {
    count += array[i];
  }
  return count;
}
function maxOfNumbers(arr) {
  return Math.max(...arr);
}
function appendToArray(ar, add) {
  var amount = add.length;
  for (var i = 0; i < amount; ++i) {
    var element = add[i];
    ar.push(element);
  }
}
function uniqueArray(arrArg) {
  return arrArg.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) === pos;
  });
}

// node_modules/js-base64/base64.mjs
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc)) throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));

// node_modules/rxdb/dist/esm/plugins/utils/utils-base64.js
function b64EncodeUnicode(str) {
  return encode(str);
}
function b64DecodeUnicode(str) {
  return decode(str);
}
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-blob.js
function createBlob(data, type) {
  var blob = new Blob([data], {
    type
  });
  return blob;
}
function createBlobFromBase64(base64String, type) {
  return __async(this, null, function* () {
    var base64Response = yield fetch("data:" + type + ";base64," + base64String);
    var blob = yield base64Response.blob();
    return blob;
  });
}
function blobToString(blob) {
  var blobType = Object.prototype.toString.call(blob);
  if (blobType === "[object Uint8Array]") {
    blob = new Blob([blob]);
  }
  if (typeof blob === "string") {
    return Promise.resolve(blob);
  }
  return blob.text();
}
function blobToBase64String(blob) {
  return __async(this, null, function* () {
    if (typeof blob === "string") {
      return blob;
    }
    var blobType = Object.prototype.toString.call(blob);
    if (blobType === "[object Uint8Array]") {
      blob = new Blob([blob]);
    }
    var arrayBuffer = yield blob.arrayBuffer();
    return arrayBufferToBase64(arrayBuffer);
  });
}
function getBlobSize(blob) {
  return blob.size;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-revision.js
function parseRevision(revision) {
  var split = revision.split("-");
  if (split.length !== 2) {
    throw new Error("malformatted revision: " + revision);
  }
  return {
    height: parseInt(split[0], 10),
    hash: split[1]
  };
}
function getHeightOfRevision(revision) {
  var useChars = "";
  for (var index = 0; index < revision.length; index++) {
    var char = revision[index];
    if (char === "-") {
      return parseInt(useChars, 10);
    }
    useChars += char;
  }
  throw new Error("malformatted revision: " + revision);
}
function createRevision(databaseInstanceToken, previousDocData) {
  var newRevisionHeight = !previousDocData ? 1 : getHeightOfRevision(previousDocData._rev) + 1;
  return newRevisionHeight + "-" + databaseInstanceToken;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-object.js
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (Object.prototype.hasOwnProperty.call(o, prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}
function objectPathMonad(objectPath) {
  var split = objectPath.split(".");
  var splitLength = split.length;
  if (splitLength === 1) {
    return (obj) => obj[objectPath];
  }
  return (obj) => {
    var currentVal = obj;
    for (var i = 0; i < splitLength; ++i) {
      var subPath = split[i];
      currentVal = currentVal[subPath];
      if (typeof currentVal === "undefined") {
        return currentVal;
      }
    }
    return currentVal;
  };
}
function getFromObjectOrThrow(obj, key) {
  var val = obj[key];
  if (!val) {
    throw new Error("missing value from object " + key);
  }
  return val;
}
function flattenObject(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!Object.prototype.hasOwnProperty.call(ob, i)) continue;
    if (typeof ob[i] === "object") {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue;
        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
function flatClone(obj) {
  return Object.assign({}, obj);
}
function firstPropertyNameOfObject(obj) {
  return Object.keys(obj)[0];
}
function firstPropertyValueOfObject(obj) {
  var key = Object.keys(obj)[0];
  return obj[key];
}
function sortObject(obj, noArraySort = false) {
  if (!obj) return obj;
  if (!noArraySort && Array.isArray(obj)) {
    return obj.sort((a, b) => {
      if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
      if (typeof a === "object") return 1;
      else return -1;
    }).map((i) => sortObject(i, noArraySort));
  }
  if (typeof obj === "object" && !Array.isArray(obj)) {
    var out = {};
    Object.keys(obj).sort((a, b) => a.localeCompare(b)).forEach((key) => {
      out[key] = sortObject(obj[key], noArraySort);
    });
    return out;
  }
  return obj;
}
function deepClone(src) {
  if (!src) {
    return src;
  }
  if (src === null || typeof src !== "object") {
    return src;
  }
  if (Array.isArray(src)) {
    var ret = new Array(src.length);
    var i = ret.length;
    while (i--) {
      ret[i] = deepClone(src[i]);
    }
    return ret;
  }
  var dest = {};
  for (var key in src) {
    dest[key] = deepClone(src[key]);
  }
  return dest;
}
var clone = deepClone;
function overwriteGetterForCaching(obj, getterName, value) {
  Object.defineProperty(obj, getterName, {
    get: function() {
      return value;
    }
  });
  return value;
}
function hasDeepProperty(obj, property) {
  if (obj.hasOwnProperty(property)) {
    return true;
  }
  if (Array.isArray(obj)) {
    var has2 = !!obj.find((item) => hasDeepProperty(item, property));
    return has2;
  }
  for (var key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (hasDeepProperty(obj[key], property)) {
        return true;
      }
    }
  }
  return false;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-document.js
var RX_META_LWT_MINIMUM = 1;
function getDefaultRxDocumentMeta() {
  return {
    /**
     * Set this to 1 to not waste performance
     * while calling new Date()..
     * The storage wrappers will anyway update
     * the lastWrite time while calling transformDocumentDataFromRxDBToRxStorage()
     */
    lwt: RX_META_LWT_MINIMUM
  };
}
function getDefaultRevision() {
  return "";
}
function stripMetaDataFromDocument(docData) {
  return Object.assign({}, docData, {
    _meta: void 0,
    _deleted: void 0,
    _rev: void 0
  });
}
function areRxDocumentArraysEqual(primaryPath, ar1, ar2) {
  if (ar1.length !== ar2.length) {
    return false;
  }
  var i = 0;
  var len = ar1.length;
  while (i < len) {
    var row1 = ar1[i];
    var row2 = ar2[i];
    i++;
    if (row1._rev !== row2._rev || row1[primaryPath] !== row2[primaryPath]) {
      return false;
    }
  }
  return true;
}
function getSortDocumentsByLastWriteTimeComparator(primaryPath) {
  return (a, b) => {
    if (a._meta.lwt === b._meta.lwt) {
      if (b[primaryPath] < a[primaryPath]) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return a._meta.lwt - b._meta.lwt;
    }
  };
}
function sortDocumentsByLastWriteTime(primaryPath, docs) {
  return docs.sort(getSortDocumentsByLastWriteTimeComparator(primaryPath));
}
function toWithDeleted(docData) {
  docData = flatClone(docData);
  docData._deleted = !!docData._deleted;
  return Object.assign(docData, {
    _attachments: void 0,
    _meta: void 0,
    _rev: void 0
  });
}

// node_modules/ohash/dist/index.mjs
var defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
var defaultPrototypesKeys = Object.freeze(["prototype", "__proto__", "constructor"]);
var nativeFunc = "[native code] }";
var nativeFuncLength = nativeFunc.length;
var WordArray = class _WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new _WordArray([...this.words]);
  }
};
var Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
var Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
var Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
var BufferedBlockAlgorithm = class {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
};
var Hasher = class extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
};
var H = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
var K = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
var W = [];
var SHA256 = class extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
};
function sha256(message) {
  return new SHA256().finalize(message).toString();
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-hash.js
function jsSha256(input) {
  return Promise.resolve(sha256(input));
}
function nativeSha256(input) {
  return __async(this, null, function* () {
    var data = new TextEncoder().encode(input);
    var hashBuffer = yield crypto.subtle.digest("SHA-256", data);
    var hash = Array.prototype.map.call(new Uint8Array(hashBuffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
    return hash;
  });
}
var canUseCryptoSubtle = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof crypto.subtle.digest === "function";
var defaultHashSha256 = canUseCryptoSubtle ? nativeSha256 : jsSha256;
function hashStringToNumber(str) {
  var nr = 0;
  var len = str.length;
  for (var i = 0; i < len; i++) {
    nr = nr + str.charCodeAt(i);
    nr |= 0;
  }
  return nr;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-promise.js
function nextTick() {
  return new Promise((res) => setTimeout(res, 0));
}
function promiseWait(ms = 0) {
  return new Promise((res) => setTimeout(res, ms));
}
function toPromise(maybePromise) {
  if (maybePromise && typeof maybePromise.then === "function") {
    return maybePromise;
  } else {
    return Promise.resolve(maybePromise);
  }
}
function isPromise(value) {
  if (typeof value !== "undefined" && typeof value.then === "function") {
    return true;
  }
  return false;
}
var PROMISE_RESOLVE_TRUE = Promise.resolve(true);
var PROMISE_RESOLVE_FALSE = Promise.resolve(false);
var PROMISE_RESOLVE_NULL = Promise.resolve(null);
var PROMISE_RESOLVE_VOID = Promise.resolve();
function requestIdlePromiseNoQueue(timeout = 1e4) {
  if (typeof requestIdleCallback === "function") {
    return new Promise((res) => {
      requestIdleCallback(() => res(), {
        timeout
      });
    });
  } else {
    return promiseWait(0);
  }
}
var idlePromiseQueue = PROMISE_RESOLVE_VOID;
function requestIdlePromise(timeout = void 0) {
  idlePromiseQueue = idlePromiseQueue.then(() => {
    return requestIdlePromiseNoQueue(timeout);
  });
  return idlePromiseQueue;
}
function requestIdleCallbackIfAvailable(fun) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => {
      fun();
    });
  }
}
function promiseSeries(tasks, initial) {
  return tasks.reduce((current, next) => current.then(next), Promise.resolve(initial));
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-regex.js
var REGEX_ALL_DOTS = /\./g;
var REGEX_ALL_PIPES = /\|/g;

// node_modules/rxdb/dist/esm/plugins/utils/utils-string.js
var COUCH_NAME_CHARS = "abcdefghijklmnopqrstuvwxyz";
function randomCouchString(length = 10) {
  var text = "";
  for (var i = 0; i < length; i++) {
    text += COUCH_NAME_CHARS.charAt(Math.floor(Math.random() * COUCH_NAME_CHARS.length));
  }
  return text;
}
var RANDOM_STRING = "Fz7SZXPmYJujkzjY1rpXWvlWBqoGAfAX";
function ucfirst(str) {
  str += "";
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
}
function trimDots(str) {
  while (str.charAt(0) === ".") {
    str = str.substr(1);
  }
  while (str.slice(-1) === ".") {
    str = str.slice(0, -1);
  }
  return str;
}
function lastCharOfString(str) {
  return str.charAt(str.length - 1);
}
function isFolderPath(name) {
  if (name.includes("/") || // unix
  name.includes("\\")) {
    return true;
  } else {
    return false;
  }
}
function arrayBufferToString(arrayBuffer) {
  var chunkSize = 8192;
  var str = "";
  var len = arrayBuffer.byteLength;
  for (var i = 0; i < len; i += chunkSize) {
    var chunk = new Uint8Array(arrayBuffer, i, Math.min(chunkSize, len - i));
    str += String.fromCharCode.apply(null, chunk);
  }
  return str;
}
function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function normalizeString(str) {
  return str.trim().replace(/[\n\s]+/g, "");
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-object-deep-equal.js
function deepEqual(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;
    var length;
    var i;
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    var keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-object-dot-prop.js
var isObject = (value) => {
  var type = typeof value;
  return value !== null && (type === "object" || type === "function");
};
var disallowedKeys = /* @__PURE__ */ new Set(["__proto__", "prototype", "constructor"]);
var digits = new Set("0123456789");
function getPathSegments(path) {
  var parts = [];
  var currentSegment = "";
  var currentPart = "start";
  var isIgnoring = false;
  for (var character of path) {
    switch (character) {
      case "\\": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
        if (isIgnoring) {
          currentSegment += character;
        }
        currentPart = "property";
        isIgnoring = !isIgnoring;
        break;
      }
      case ".": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          currentPart = "property";
          break;
        }
        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += character;
          break;
        }
        if (disallowedKeys.has(currentSegment)) {
          return [];
        }
        parts.push(currentSegment);
        currentSegment = "";
        currentPart = "property";
        break;
      }
      case "[": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          currentPart = "index";
          break;
        }
        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += character;
          break;
        }
        if (currentPart === "property") {
          if (disallowedKeys.has(currentSegment)) {
            return [];
          }
          parts.push(currentSegment);
          currentSegment = "";
        }
        currentPart = "index";
        break;
      }
      case "]": {
        if (currentPart === "index") {
          parts.push(Number.parseInt(currentSegment, 10));
          currentSegment = "";
          currentPart = "indexEnd";
          break;
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
      }
      default: {
        if (currentPart === "index" && !digits.has(character)) {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
        if (currentPart === "start") {
          currentPart = "property";
        }
        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += "\\";
        }
        currentSegment += character;
      }
    }
  }
  if (isIgnoring) {
    currentSegment += "\\";
  }
  switch (currentPart) {
    case "property": {
      if (disallowedKeys.has(currentSegment)) {
        return [];
      }
      parts.push(currentSegment);
      break;
    }
    case "index": {
      throw new Error("Index was not closed");
    }
    case "start": {
      parts.push("");
      break;
    }
  }
  return parts;
}
function isStringIndex(object, key) {
  if (typeof key !== "number" && Array.isArray(object)) {
    var index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }
  return false;
}
function assertNotStringIndex(object, key) {
  if (isStringIndex(object, key)) {
    throw new Error("Cannot use string index");
  }
}
function getProperty(object, path, value) {
  if (Array.isArray(path)) {
    path = path.join(".");
  }
  if (!path.includes(".") && !path.includes("[")) {
    return object[path];
  }
  if (!isObject(object) || typeof path !== "string") {
    return value === void 0 ? object : value;
  }
  var pathArray = getPathSegments(path);
  if (pathArray.length === 0) {
    return value;
  }
  for (var index = 0; index < pathArray.length; index++) {
    var key = pathArray[index];
    if (isStringIndex(object, key)) {
      object = index === pathArray.length - 1 ? void 0 : null;
    } else {
      object = object[key];
    }
    if (object === void 0 || object === null) {
      if (index !== pathArray.length - 1) {
        return value;
      }
      break;
    }
  }
  return object === void 0 ? value : object;
}
function setProperty(object, path, value) {
  if (Array.isArray(path)) {
    path = path.join(".");
  }
  if (!isObject(object) || typeof path !== "string") {
    return object;
  }
  var root = object;
  var pathArray = getPathSegments(path);
  for (var index = 0; index < pathArray.length; index++) {
    var key = pathArray[index];
    assertNotStringIndex(object, key);
    if (index === pathArray.length - 1) {
      object[key] = value;
    } else if (!isObject(object[key])) {
      object[key] = typeof pathArray[index + 1] === "number" ? [] : {};
    }
    object = object[key];
  }
  return root;
}
function deleteProperty(object, path) {
  if (!isObject(object) || typeof path !== "string") {
    return false;
  }
  var pathArray = getPathSegments(path);
  for (var index = 0; index < pathArray.length; index++) {
    var key = pathArray[index];
    assertNotStringIndex(object, key);
    if (index === pathArray.length - 1) {
      delete object[key];
      return true;
    }
    object = object[key];
    if (!isObject(object)) {
      return false;
    }
  }
}
function hasProperty(object, path) {
  if (!isObject(object) || typeof path !== "string") {
    return false;
  }
  var pathArray = getPathSegments(path);
  if (pathArray.length === 0) {
    return false;
  }
  for (var key of pathArray) {
    if (!isObject(object) || !(key in object) || isStringIndex(object, key)) {
      return false;
    }
    object = object[key];
  }
  return true;
}
function escapePath(path) {
  if (typeof path !== "string") {
    throw new TypeError("Expected a string");
  }
  return path.replace(/[\\.[]/g, "\\$&");
}
function entries(value) {
  if (Array.isArray(value)) {
    return value.map((v, index) => [index, v]);
  }
  return Object.entries(value);
}
function stringifyPath(pathSegments) {
  var result = "";
  for (var [index, segment] of entries(pathSegments)) {
    if (typeof segment === "number") {
      result += "[" + segment + "]";
    } else {
      segment = escapePath(segment);
      result += index === 0 ? segment : "." + segment;
    }
  }
  return result;
}
function* deepKeysIterator(object, currentPath = []) {
  if (!isObject(object)) {
    if (currentPath.length > 0) {
      yield stringifyPath(currentPath);
    }
    return;
  }
  for (var [key, value] of entries(object)) {
    yield* __yieldStar(deepKeysIterator(value, [...currentPath, key]));
  }
}
function deepKeys(object) {
  return [...deepKeysIterator(object)];
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-map.js
function getFromMapOrThrow(map2, key) {
  var val = map2.get(key);
  if (typeof val === "undefined") {
    throw new Error("missing value from map " + key);
  }
  return val;
}
function getFromMapOrCreate(map2, index, creator, ifWasThere) {
  var value = map2.get(index);
  if (typeof value === "undefined") {
    value = creator();
    map2.set(index, value);
  } else if (ifWasThere) {
    ifWasThere(value);
  }
  return value;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-error.js
function pluginMissing(pluginKey) {
  var keyParts = pluginKey.split("-");
  var pluginName = "RxDB";
  keyParts.forEach((part) => {
    pluginName += ucfirst(part);
  });
  pluginName += "Plugin";
  return new Error("You are using a function which must be overwritten by a plugin.\n        You should either prevent the usage of this function or add the plugin via:\n            import { " + pluginName + " } from 'rxdb/plugins/" + pluginKey + "';\n            addRxPlugin(" + pluginName + ");\n        ");
}
function errorToPlainJson(err) {
  var ret = {
    name: err.name,
    message: err.message,
    rxdb: err.rxdb,
    parameters: err.parameters,
    extensions: err.extensions,
    code: err.code,
    url: err.url,
    /**
     * stack must be last to make it easier to read the json in a console.
     * Also we ensure that each linebreak is spaced so that the chrome devtools
     * shows urls to the source code that can be clicked to inspect
     * the correct place in the code.
     */
    stack: !err.stack ? void 0 : err.stack.replace(/\n/g, " \n ")
  };
  return ret;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-time.js
var _lastNow = 0;
function now() {
  var ret = Date.now();
  ret = ret + 0.01;
  if (ret <= _lastNow) {
    ret = _lastNow + 0.01;
  }
  var twoDecimals = parseFloat(ret.toFixed(2));
  _lastNow = twoDecimals;
  return twoDecimals;
}

// node_modules/rxdb/dist/esm/plugins/utils/utils-other.js
function runXTimes(xTimes, fn) {
  new Array(xTimes).fill(0).forEach((_v, idx) => fn(idx));
}
function ensureNotFalsy(obj, message) {
  if (!obj) {
    if (!message) {
      message = "";
    }
    throw new Error("ensureNotFalsy() is falsy: " + message);
  }
  return obj;
}
function ensureInteger(obj) {
  if (!Number.isInteger(obj)) {
    throw new Error("ensureInteger() is falsy");
  }
  return obj;
}
var RXJS_SHARE_REPLAY_DEFAULTS = {
  bufferSize: 1,
  refCount: true
};

// node_modules/rxdb/dist/esm/plugins/utils/utils-rxdb-version.js
var RXDB_VERSION = "15.24.0";

// node_modules/rxdb/dist/esm/plugins/utils/utils-global.js
var RXDB_UTILS_GLOBAL = {};
var PREMIUM_FLAG_HASH = "6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93";

// node_modules/rxdb/dist/esm/overwritable.js
var overwritable = {
  /**
   * if this method is overwritten with one
   * that returns true, we do additional checks
   * which help the developer but have bad performance
   */
  isDevMode() {
    return false;
  },
  /**
   * Deep freezes and object when in dev-mode.
   * Deep-Freezing has the same performance as deep-cloning, so we only do that in dev-mode.
   * Also, we can ensure the readonly state via typescript
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
   */
  deepFreezeWhenDevMode(obj) {
    return obj;
  },
  /**
   * overwritten to map error-codes to text-messages
   */
  tunnelErrorMessage(message) {
    return "RxDB Error-Code " + message + ".\n        Error messages are not included in RxDB core to reduce build size.\n        ";
  }
};

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}

// node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}

// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}

// node_modules/@babel/runtime/helpers/esm/construct.js
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}

// node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
    if (null === t2 || !_isNativeFunction(t2)) return t2;
    if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct(t2, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), _setPrototypeOf(Wrapper, t2);
  }, _wrapNativeSuper(t);
}

// node_modules/rxdb/dist/esm/rx-error.js
function parametersToString(parameters) {
  var ret = "";
  if (Object.keys(parameters).length === 0) return ret;
  ret += "Given parameters: {\n";
  ret += Object.keys(parameters).map((k) => {
    var paramStr = "[object Object]";
    try {
      if (k === "errors") {
        paramStr = parameters[k].map((err) => JSON.stringify(err, Object.getOwnPropertyNames(err)));
      } else {
        paramStr = JSON.stringify(parameters[k], function(_k, v) {
          return v === void 0 ? null : v;
        }, 2);
      }
    } catch (e) {
    }
    return k + ":" + paramStr;
  }).join("\n");
  ret += "}";
  return ret;
}
function messageForError(message, code, parameters) {
  return "RxError (" + code + "):\n" + message + "\n" + parametersToString(parameters);
}
var RxError = function(_Error) {
  function RxError2(code, message, parameters = {}) {
    var _this;
    var mes = messageForError(message, code, parameters);
    _this = _Error.call(this, mes) || this;
    _this.code = code;
    _this.message = mes;
    _this.url = getErrorUrl(code);
    _this.parameters = parameters;
    _this.rxdb = true;
    return _this;
  }
  _inheritsLoose(RxError2, _Error);
  var _proto = RxError2.prototype;
  _proto.toString = function toString2() {
    return this.message;
  };
  return _createClass(RxError2, [{
    key: "name",
    get: function() {
      return "RxError (" + this.code + ")";
    }
  }, {
    key: "typeError",
    get: function() {
      return false;
    }
  }]);
}(_wrapNativeSuper(Error));
var RxTypeError = function(_TypeError) {
  function RxTypeError2(code, message, parameters = {}) {
    var _this2;
    var mes = messageForError(message, code, parameters);
    _this2 = _TypeError.call(this, mes) || this;
    _this2.code = code;
    _this2.message = mes;
    _this2.url = getErrorUrl(code);
    _this2.parameters = parameters;
    _this2.rxdb = true;
    return _this2;
  }
  _inheritsLoose(RxTypeError2, _TypeError);
  var _proto2 = RxTypeError2.prototype;
  _proto2.toString = function toString2() {
    return this.message;
  };
  return _createClass(RxTypeError2, [{
    key: "name",
    get: function() {
      return "RxTypeError (" + this.code + ")";
    }
  }, {
    key: "typeError",
    get: function() {
      return true;
    }
  }]);
}(_wrapNativeSuper(TypeError));
function getErrorUrl(code) {
  return "https://rxdb.info/errors.html?console=errors#" + code;
}
function errorUrlHint(code) {
  return "\n You can find out more about this error here: " + getErrorUrl(code) + " ";
}
function newRxError(code, parameters) {
  return new RxError(code, overwritable.tunnelErrorMessage(code) + errorUrlHint(code), parameters);
}
function newRxTypeError(code, parameters) {
  return new RxTypeError(code, overwritable.tunnelErrorMessage(code) + errorUrlHint(code), parameters);
}
function isBulkWriteConflictError(err) {
  if (err && err.status === 409) {
    return err;
  } else {
    return false;
  }
}
var STORAGE_WRITE_ERROR_CODE_TO_MESSAGE = {
  409: "document write conflict",
  422: "schema validation error",
  510: "attachment data missing"
};
function rxStorageWriteErrorToRxError(err) {
  return newRxError("COL20", {
    name: STORAGE_WRITE_ERROR_CODE_TO_MESSAGE[err.status],
    document: err.documentId,
    writeError: err
  });
}

// node_modules/rxdb/dist/esm/hooks.js
var HOOKS = {
  /**
   * Runs before a plugin is added.
   * Use this to block the usage of non-compatible plugins.
   */
  preAddRxPlugin: [],
  /**
   * functions that run before the database is created
   */
  preCreateRxDatabase: [],
  /**
   * runs after the database is created and prepared
   * but before the instance is returned to the user
   * @async
   */
  createRxDatabase: [],
  preCreateRxCollection: [],
  createRxCollection: [],
  createRxState: [],
  /**
  * runs at the end of the destroy-process of a collection
  * @async
  */
  postDestroyRxCollection: [],
  /**
   * Runs after a collection is removed.
   * @async
   */
  postRemoveRxCollection: [],
  /**
    * functions that get the json-schema as input
    * to do additionally checks/manipulation
    */
  preCreateRxSchema: [],
  /**
   * functions that run after the RxSchema is created
   * gets RxSchema as attribute
   */
  createRxSchema: [],
  preCreateRxQuery: [],
  /**
   * Runs before a query is send to the
   * prepareQuery function of the storage engine.
   */
  prePrepareQuery: [],
  createRxDocument: [],
  /**
   * runs after a RxDocument is created,
   * cannot be async
   */
  postCreateRxDocument: [],
  /**
   * Runs before a RxStorageInstance is created
   * gets the params of createStorageInstance()
   * as attribute so you can manipulate them.
   * Notice that you have to clone stuff before mutating the inputs.
   */
  preCreateRxStorageInstance: [],
  preStorageWrite: [],
  /**
   * runs on the document-data before the document is migrated
   * {
   *   doc: Object, // original doc-data
   *   migrated: // migrated doc-data after run through migration-strategies
   * }
   */
  preMigrateDocument: [],
  /**
   * runs after the migration of a document has been done
   */
  postMigrateDocument: [],
  /**
   * runs at the beginning of the destroy-process of a database
   */
  preDestroyRxDatabase: [],
  /**
   * runs after a database has been removed
   * @async
   */
  postRemoveRxDatabase: [],
  /**
   * runs before the replication writes the rows to master
   * but before the rows have been modified
   * @async
   */
  preReplicationMasterWrite: [],
  /**
   * runs after the replication has been sent to the server
   * but before the new documents have been handled
   * @async
   */
  preReplicationMasterWriteDocumentsHandle: []
};
function runPluginHooks(hookKey, obj) {
  if (HOOKS[hookKey].length > 0) {
    HOOKS[hookKey].forEach((fun) => fun(obj));
  }
}
function runAsyncPluginHooks(hookKey, obj) {
  return Promise.all(HOOKS[hookKey].map((fun) => fun(obj)));
}
function _clearHook(type, fun) {
  HOOKS[type] = HOOKS[type].filter((h) => h !== fun);
}

// node_modules/rxdb/dist/esm/rx-schema-helper.js
function getPseudoSchemaForVersion(version, primaryKey) {
  var pseudoSchema = fillWithDefaultSettings({
    version,
    type: "object",
    primaryKey,
    properties: {
      [primaryKey]: {
        type: "string",
        maxLength: 100
      }
    },
    indexes: [[primaryKey]],
    required: [primaryKey]
  });
  return pseudoSchema;
}
function getSchemaByObjectPath(rxJsonSchema, path) {
  var usePath = path;
  usePath = usePath.replace(REGEX_ALL_DOTS, ".properties.");
  usePath = "properties." + usePath;
  usePath = trimDots(usePath);
  var ret = getProperty(rxJsonSchema, usePath);
  return ret;
}
function fillPrimaryKey(primaryPath, jsonSchema, documentData) {
  if (typeof jsonSchema.primaryKey === "string") {
    return documentData;
  }
  var newPrimary = getComposedPrimaryKeyOfDocumentData(jsonSchema, documentData);
  var existingPrimary = documentData[primaryPath];
  if (existingPrimary && existingPrimary !== newPrimary) {
    throw newRxError("DOC19", {
      args: {
        documentData,
        existingPrimary,
        newPrimary
      },
      schema: jsonSchema
    });
  }
  documentData[primaryPath] = newPrimary;
  return documentData;
}
function getPrimaryFieldOfPrimaryKey(primaryKey) {
  if (typeof primaryKey === "string") {
    return primaryKey;
  } else {
    return primaryKey.key;
  }
}
function getLengthOfPrimaryKey(schema) {
  var primaryPath = getPrimaryFieldOfPrimaryKey(schema.primaryKey);
  var schemaPart = getSchemaByObjectPath(schema, primaryPath);
  return ensureNotFalsy(schemaPart.maxLength);
}
function getComposedPrimaryKeyOfDocumentData(jsonSchema, documentData) {
  if (typeof jsonSchema.primaryKey === "string") {
    return documentData[jsonSchema.primaryKey];
  }
  var compositePrimary = jsonSchema.primaryKey;
  return compositePrimary.fields.map((field) => {
    var value = getProperty(documentData, field);
    if (typeof value === "undefined") {
      throw newRxError("DOC18", {
        args: {
          field,
          documentData
        }
      });
    }
    return value;
  }).join(compositePrimary.separator);
}
function normalizeRxJsonSchema(jsonSchema) {
  var normalizedSchema = sortObject(jsonSchema, true);
  return normalizedSchema;
}
function getDefaultIndex(primaryPath) {
  return ["_deleted", primaryPath];
}
function fillWithDefaultSettings(schemaObj) {
  schemaObj = flatClone(schemaObj);
  var primaryPath = getPrimaryFieldOfPrimaryKey(schemaObj.primaryKey);
  schemaObj.properties = flatClone(schemaObj.properties);
  schemaObj.additionalProperties = false;
  if (!Object.prototype.hasOwnProperty.call(schemaObj, "keyCompression")) {
    schemaObj.keyCompression = false;
  }
  schemaObj.indexes = schemaObj.indexes ? schemaObj.indexes.slice(0) : [];
  schemaObj.required = schemaObj.required ? schemaObj.required.slice(0) : [];
  schemaObj.encrypted = schemaObj.encrypted ? schemaObj.encrypted.slice(0) : [];
  schemaObj.properties._rev = {
    type: "string",
    minLength: 1
  };
  schemaObj.properties._attachments = {
    type: "object"
  };
  schemaObj.properties._deleted = {
    type: "boolean"
  };
  schemaObj.properties._meta = RX_META_SCHEMA;
  schemaObj.required = schemaObj.required ? schemaObj.required.slice(0) : [];
  schemaObj.required.push("_deleted");
  schemaObj.required.push("_rev");
  schemaObj.required.push("_meta");
  schemaObj.required.push("_attachments");
  var finalFields = getFinalFields(schemaObj);
  appendToArray(schemaObj.required, finalFields);
  schemaObj.required = schemaObj.required.filter((field) => !field.includes(".")).filter((elem, pos, arr) => arr.indexOf(elem) === pos);
  schemaObj.version = schemaObj.version || 0;
  var useIndexes = schemaObj.indexes.map((index) => {
    var arIndex = isMaybeReadonlyArray(index) ? index.slice(0) : [index];
    if (!arIndex.includes(primaryPath)) {
      arIndex.push(primaryPath);
    }
    if (arIndex[0] !== "_deleted") {
      arIndex.unshift("_deleted");
    }
    return arIndex;
  });
  if (useIndexes.length === 0) {
    useIndexes.push(getDefaultIndex(primaryPath));
  }
  useIndexes.push(["_meta.lwt", primaryPath]);
  if (schemaObj.internalIndexes) {
    schemaObj.internalIndexes.map((idx) => {
      useIndexes.push(idx);
    });
  }
  var hasIndex = /* @__PURE__ */ new Set();
  useIndexes.filter((index) => {
    var indexStr = index.join(",");
    if (hasIndex.has(indexStr)) {
      return false;
    } else {
      hasIndex.add(indexStr);
      return true;
    }
  });
  schemaObj.indexes = useIndexes;
  return schemaObj;
}
var RX_META_SCHEMA = {
  type: "object",
  properties: {
    /**
     * The last-write time.
     * Unix time in milliseconds.
     */
    lwt: {
      type: "number",
      /**
       * We use 1 as minimum so that the value is never falsy.
       */
      minimum: RX_META_LWT_MINIMUM,
      maximum: 1e15,
      multipleOf: 0.01
    }
  },
  /**
   * Additional properties are allowed
   * and can be used by plugins to set various flags.
   */
  additionalProperties: true,
  required: ["lwt"]
};
function getFinalFields(jsonSchema) {
  var ret = Object.keys(jsonSchema.properties).filter((key) => jsonSchema.properties[key].final);
  var primaryPath = getPrimaryFieldOfPrimaryKey(jsonSchema.primaryKey);
  ret.push(primaryPath);
  if (typeof jsonSchema.primaryKey !== "string") {
    jsonSchema.primaryKey.fields.forEach((field) => ret.push(field));
  }
  return ret;
}
function fillObjectWithDefaults(rxSchema, obj) {
  var defaultKeys = Object.keys(rxSchema.defaultValues);
  for (var i = 0; i < defaultKeys.length; ++i) {
    var key = defaultKeys[i];
    if (!Object.prototype.hasOwnProperty.call(obj, key) || typeof obj[key] === "undefined") {
      obj[key] = rxSchema.defaultValues[key];
    }
  }
  return obj;
}
var DEFAULT_CHECKPOINT_SCHEMA = {
  type: "object",
  properties: {
    id: {
      type: "string"
    },
    lwt: {
      type: "number"
    }
  },
  required: ["id", "lwt"],
  additionalProperties: false
};

// node_modules/rxdb/dist/esm/rx-change-event.js
function getDocumentDataOfRxChangeEvent(rxChangeEvent) {
  if (rxChangeEvent.documentData) {
    return rxChangeEvent.documentData;
  } else {
    return rxChangeEvent.previousDocumentData;
  }
}
function rxChangeEventToEventReduceChangeEvent(rxChangeEvent) {
  switch (rxChangeEvent.operation) {
    case "INSERT":
      return {
        operation: rxChangeEvent.operation,
        id: rxChangeEvent.documentId,
        doc: rxChangeEvent.documentData,
        previous: null
      };
    case "UPDATE":
      return {
        operation: rxChangeEvent.operation,
        id: rxChangeEvent.documentId,
        doc: overwritable.deepFreezeWhenDevMode(rxChangeEvent.documentData),
        previous: rxChangeEvent.previousDocumentData ? rxChangeEvent.previousDocumentData : "UNKNOWN"
      };
    case "DELETE":
      return {
        operation: rxChangeEvent.operation,
        id: rxChangeEvent.documentId,
        doc: null,
        previous: rxChangeEvent.previousDocumentData
      };
  }
}
function flattenEvents(input) {
  var output = [];
  if (Array.isArray(input)) {
    input.forEach((inputItem) => {
      var add = flattenEvents(inputItem);
      appendToArray(output, add);
    });
  } else {
    if (input.id && input.events) {
      input.events.forEach((ev) => output.push(ev));
    } else {
      output.push(input);
    }
  }
  var usedIds = /* @__PURE__ */ new Set();
  var nonDuplicate = [];
  function getEventId(ev) {
    return [ev.documentId, ev.documentData ? ev.documentData._rev : "", ev.previousDocumentData ? ev.previousDocumentData._rev : ""].join("|");
  }
  output.forEach((ev) => {
    var eventId = getEventId(ev);
    if (!usedIds.has(eventId)) {
      usedIds.add(eventId);
      nonDuplicate.push(ev);
    }
  });
  return nonDuplicate;
}

// node_modules/rxdb/dist/esm/query-planner.js
var INDEX_MAX = String.fromCharCode(65535);
var INDEX_MIN = Number.MIN_SAFE_INTEGER;
function getQueryPlan(schema, query) {
  var selector = query.selector;
  var indexes = schema.indexes ? schema.indexes.slice(0) : [];
  if (query.index) {
    indexes = [query.index];
  }
  var hasDescSorting = !!query.sort.find((sortField) => Object.values(sortField)[0] === "desc");
  var sortIrrelevevantFields = /* @__PURE__ */ new Set();
  Object.keys(selector).forEach((fieldName) => {
    var schemaPart = getSchemaByObjectPath(schema, fieldName);
    if (schemaPart && schemaPart.type === "boolean" && Object.prototype.hasOwnProperty.call(selector[fieldName], "$eq")) {
      sortIrrelevevantFields.add(fieldName);
    }
  });
  var optimalSortIndex = query.sort.map((sortField) => Object.keys(sortField)[0]);
  var optimalSortIndexCompareString = optimalSortIndex.filter((f) => !sortIrrelevevantFields.has(f)).join(",");
  var currentBestQuality = -1;
  var currentBestQueryPlan;
  indexes.forEach((index) => {
    var inclusiveEnd = true;
    var inclusiveStart = true;
    var opts = index.map((indexField) => {
      var matcher = selector[indexField];
      var operators = matcher ? Object.keys(matcher) : [];
      var matcherOpts = {};
      if (!matcher || !operators.length) {
        var startKey = inclusiveStart ? INDEX_MIN : INDEX_MAX;
        matcherOpts = {
          startKey,
          endKey: inclusiveEnd ? INDEX_MAX : INDEX_MIN,
          inclusiveStart: true,
          inclusiveEnd: true
        };
      } else {
        operators.forEach((operator) => {
          if (LOGICAL_OPERATORS.has(operator)) {
            var operatorValue = matcher[operator];
            var partialOpts = getMatcherQueryOpts(operator, operatorValue);
            matcherOpts = Object.assign(matcherOpts, partialOpts);
          }
        });
      }
      if (typeof matcherOpts.startKey === "undefined") {
        matcherOpts.startKey = INDEX_MIN;
      }
      if (typeof matcherOpts.endKey === "undefined") {
        matcherOpts.endKey = INDEX_MAX;
      }
      if (typeof matcherOpts.inclusiveStart === "undefined") {
        matcherOpts.inclusiveStart = true;
      }
      if (typeof matcherOpts.inclusiveEnd === "undefined") {
        matcherOpts.inclusiveEnd = true;
      }
      if (inclusiveStart && !matcherOpts.inclusiveStart) {
        inclusiveStart = false;
      }
      if (inclusiveEnd && !matcherOpts.inclusiveEnd) {
        inclusiveEnd = false;
      }
      return matcherOpts;
    });
    var startKeys = opts.map((opt) => opt.startKey);
    var endKeys = opts.map((opt) => opt.endKey);
    var queryPlan = {
      index,
      startKeys,
      endKeys,
      inclusiveEnd,
      inclusiveStart,
      sortSatisfiedByIndex: !hasDescSorting && optimalSortIndexCompareString === index.filter((f) => !sortIrrelevevantFields.has(f)).join(","),
      selectorSatisfiedByIndex: isSelectorSatisfiedByIndex(index, query.selector, startKeys, endKeys)
    };
    var quality = rateQueryPlan(schema, query, queryPlan);
    if (quality >= currentBestQuality || query.index) {
      currentBestQuality = quality;
      currentBestQueryPlan = queryPlan;
    }
  });
  if (!currentBestQueryPlan) {
    throw newRxError("SNH", {
      query
    });
  }
  return currentBestQueryPlan;
}
var LOGICAL_OPERATORS = /* @__PURE__ */ new Set(["$eq", "$gt", "$gte", "$lt", "$lte"]);
var LOWER_BOUND_LOGICAL_OPERATORS = /* @__PURE__ */ new Set(["$eq", "$gt", "$gte"]);
var UPPER_BOUND_LOGICAL_OPERATORS = /* @__PURE__ */ new Set(["$eq", "$lt", "$lte"]);
function isSelectorSatisfiedByIndex(index, selector, startKeys, endKeys) {
  var selectorEntries = Object.entries(selector);
  var hasNonMatchingOperator = selectorEntries.find(([fieldName2, operation2]) => {
    if (!index.includes(fieldName2)) {
      return true;
    }
    var hasNonLogicOperator = Object.entries(operation2).find(([op, _value]) => !LOGICAL_OPERATORS.has(op));
    return hasNonLogicOperator;
  });
  if (hasNonMatchingOperator) {
    return false;
  }
  if (selector.$and || selector.$or) {
    return false;
  }
  var satisfieldLowerBound = [];
  var lowerOperatorFieldNames = /* @__PURE__ */ new Set();
  for (var [fieldName, operation] of Object.entries(selector)) {
    if (!index.includes(fieldName)) {
      return false;
    }
    var lowerLogicOps = Object.keys(operation).filter((key) => LOWER_BOUND_LOGICAL_OPERATORS.has(key));
    if (lowerLogicOps.length > 1) {
      return false;
    }
    var hasLowerLogicOp = lowerLogicOps[0];
    if (hasLowerLogicOp) {
      lowerOperatorFieldNames.add(fieldName);
    }
    if (hasLowerLogicOp !== "$eq") {
      if (satisfieldLowerBound.length > 0) {
        return false;
      } else {
        satisfieldLowerBound.push(hasLowerLogicOp);
      }
    }
  }
  var satisfieldUpperBound = [];
  var upperOperatorFieldNames = /* @__PURE__ */ new Set();
  for (var [_fieldName, _operation] of Object.entries(selector)) {
    if (!index.includes(_fieldName)) {
      return false;
    }
    var upperLogicOps = Object.keys(_operation).filter((key) => UPPER_BOUND_LOGICAL_OPERATORS.has(key));
    if (upperLogicOps.length > 1) {
      return false;
    }
    var hasUperLogicOp = upperLogicOps[0];
    if (hasUperLogicOp) {
      upperOperatorFieldNames.add(_fieldName);
    }
    if (hasUperLogicOp !== "$eq") {
      if (satisfieldUpperBound.length > 0) {
        return false;
      } else {
        satisfieldUpperBound.push(hasUperLogicOp);
      }
    }
  }
  var i = 0;
  for (var _fieldName2 of index) {
    for (var set of [lowerOperatorFieldNames, upperOperatorFieldNames]) {
      if (!set.has(_fieldName2) && set.size > 0) {
        return false;
      }
      set.delete(_fieldName2);
    }
    var startKey = startKeys[i];
    var endKey = endKeys[i];
    if (startKey !== endKey && lowerOperatorFieldNames.size > 0 && upperOperatorFieldNames.size > 0) {
      return false;
    }
    i++;
  }
  return true;
}
function getMatcherQueryOpts(operator, operatorValue) {
  switch (operator) {
    case "$eq":
      return {
        startKey: operatorValue,
        endKey: operatorValue,
        inclusiveEnd: true,
        inclusiveStart: true
      };
    case "$lte":
      return {
        endKey: operatorValue,
        inclusiveEnd: true
      };
    case "$gte":
      return {
        startKey: operatorValue,
        inclusiveStart: true
      };
    case "$lt":
      return {
        endKey: operatorValue,
        inclusiveEnd: false
      };
    case "$gt":
      return {
        startKey: operatorValue,
        inclusiveStart: false
      };
    default:
      throw new Error("SNH");
  }
}
function rateQueryPlan(schema, query, queryPlan) {
  var quality = 0;
  var addQuality = (value) => {
    if (value > 0) {
      quality = quality + value;
    }
  };
  var pointsPerMatchingKey = 10;
  var nonMinKeyCount = countUntilNotMatching(queryPlan.startKeys, (keyValue) => keyValue !== INDEX_MIN && keyValue !== INDEX_MAX);
  addQuality(nonMinKeyCount * pointsPerMatchingKey);
  var nonMaxKeyCount = countUntilNotMatching(queryPlan.startKeys, (keyValue) => keyValue !== INDEX_MAX && keyValue !== INDEX_MIN);
  addQuality(nonMaxKeyCount * pointsPerMatchingKey);
  var equalKeyCount = countUntilNotMatching(queryPlan.startKeys, (keyValue, idx) => {
    if (keyValue === queryPlan.endKeys[idx]) {
      return true;
    } else {
      return false;
    }
  });
  addQuality(equalKeyCount * pointsPerMatchingKey * 1.5);
  var pointsIfNoReSortMustBeDone = queryPlan.sortSatisfiedByIndex ? 5 : 0;
  addQuality(pointsIfNoReSortMustBeDone);
  return quality;
}

// node_modules/mingo/dist/esm/types.js
var MingoError = class extends Error {
};

// node_modules/mingo/dist/esm/util.js
var MAX_INT = 2147483647;
var MIN_INT = -2147483648;
var MAX_LONG = Number.MAX_SAFE_INTEGER;
var MIN_LONG = Number.MIN_SAFE_INTEGER;
var MISSING = Symbol("missing");
var CYCLE_FOUND_ERROR = Object.freeze(new Error("mingo: cycle detected while processing object/array"));
var ARRAY_PROTO = Object.getPrototypeOf([]);
var OBJECT_PROTO = Object.getPrototypeOf({});
var OBJECT_TAG = "[object Object]";
var OBJECT_TYPE_RE = /^\[object ([a-zA-Z0-9]+)\]$/;
var Null = class {
};
var Undefined = class {
};
var getConstructor = (v) => {
  if (v === null) return Null;
  if (v === void 0) return Undefined;
  return v.constructor;
};
var DEFAULT_HASH_FUNCTION = (value) => {
  const s = stringify(value);
  let hash = 0;
  let i = s.length;
  while (i) hash = (hash << 5) - hash ^ s.charCodeAt(--i);
  return hash >>> 0;
};
var JS_SIMPLE_TYPES = /* @__PURE__ */ new Set(["null", "undefined", "boolean", "number", "string", "date", "regexp"]);
var IMMUTABLE_TYPES_SET = /* @__PURE__ */ new Set([Undefined, Null, Boolean, String, Number]);
var toString = (v) => v.toString();
var typedArrayToString = (v) => `${getConstructor(v).name}[${v.toString()}]`;
var STRING_CONVERTERS = /* @__PURE__ */ new Map([[Number, toString], [Boolean, toString], [RegExp, toString], [Function, toString], [Symbol, toString], [Date, (d) => d.toISOString()], [String, JSON.stringify], [Null, (_) => "null"], [Undefined, (_) => "undefined"], [Int8Array, typedArrayToString], [Uint8Array, typedArrayToString], [Uint8ClampedArray, typedArrayToString], [Int16Array, typedArrayToString], [Uint16Array, typedArrayToString], [Int32Array, typedArrayToString], [Uint32Array, typedArrayToString], [Float32Array, typedArrayToString], [Float64Array, typedArrayToString]]);
if (typeof BigInt !== "undefined") {
  STRING_CONVERTERS.set(BigInt, (n) => "0x" + n.toString(16));
}
if (typeof BigInt64Array !== "undefined") {
  STRING_CONVERTERS.set(BigInt64Array, typedArrayToString);
}
if (typeof BigUint64Array !== "undefined") {
  STRING_CONVERTERS.set(BigUint64Array, typedArrayToString);
}
var SORT_ORDER_BY_TYPE = {
  null: 0,
  undefined: 0,
  number: 1,
  string: 2,
  object: 3,
  array: 4,
  boolean: 5,
  date: 6,
  regexp: 7,
  function: 8
};
var compare = (a, b) => {
  if (a === MISSING) a = void 0;
  if (b === MISSING) b = void 0;
  const [u, v] = [a, b].map((n) => SORT_ORDER_BY_TYPE[getType(n).toLowerCase()]);
  if (u !== v) return u - v;
  if (u === 1 || u === 2 || u === 6) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
  if (isEqual(a, b)) return 0;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
function assert(condition, message) {
  if (!condition) throw new MingoError(message);
}
var isTypedArray = (v) => {
  const proto = Object.getPrototypeOf(getConstructor(v));
  return proto && proto.name === "TypedArray";
};
var cloneDeep = (obj) => {
  if (IMMUTABLE_TYPES_SET.has(getConstructor(obj))) return obj;
  const cycle = /* @__PURE__ */ new Set();
  const clone2 = (val) => {
    if (cycle.has(val)) throw CYCLE_FOUND_ERROR;
    const ctor = getConstructor(val);
    if (IMMUTABLE_TYPES_SET.has(ctor)) return val;
    try {
      if (isArray(val)) {
        cycle.add(val);
        return val.map(clone2);
      }
      if (isObject2(val)) {
        cycle.add(val);
        const res = {};
        for (const k in val) res[k] = clone2(val[k]);
        return res;
      }
    } finally {
      cycle.delete(val);
    }
    if (ctor === Date || ctor === RegExp || isTypedArray(val)) {
      return new ctor(val);
    }
    return val;
  };
  return clone2(obj);
};
var getType = (v) => OBJECT_TYPE_RE.exec(Object.prototype.toString.call(v))[1];
var isBoolean = (v) => typeof v === "boolean";
var isString = (v) => typeof v === "string";
var isNumber = (v) => !isNaN(v) && typeof v === "number";
var isArray = Array.isArray;
var isObject2 = (v) => {
  if (!v) return false;
  const proto = Object.getPrototypeOf(v);
  return (proto === OBJECT_PROTO || proto === null) && OBJECT_TAG === Object.prototype.toString.call(v);
};
var isObjectLike = (v) => v === Object(v);
var isDate = (v) => v instanceof Date;
var isRegExp = (v) => v instanceof RegExp;
var isFunction = (v) => typeof v === "function";
var isNil = (v) => v === null || v === void 0;
var inArray = (arr, item) => arr.includes(item);
var notInArray = (arr, item) => !inArray(arr, item);
var truthy = (arg, strict = true) => !!arg || strict && arg === "";
var isEmpty = (x) => isNil(x) || isString(x) && !x || x instanceof Array && x.length === 0 || isObject2(x) && Object.keys(x).length === 0;
var isMissing = (v) => v === MISSING;
var ensureArray = (x) => x instanceof Array ? x : [x];
var has = (obj, prop) => !!obj && Object.prototype.hasOwnProperty.call(obj, prop);
var mergeable = (left, right) => isObject2(left) && isObject2(right) || isArray(left) && isArray(right);
function merge2(target, obj, options) {
  options = options || {
    flatten: false
  };
  if (isMissing(target) || isNil(target)) return obj;
  if (isMissing(obj) || isNil(obj)) return target;
  if (!mergeable(target, obj)) {
    if (options.skipValidation) return obj || target;
    throw Error("mismatched types. must both be array or object");
  }
  options.skipValidation = true;
  if (isArray(target)) {
    const result = target;
    const input = obj;
    if (options.flatten) {
      let i = 0;
      let j = 0;
      while (i < result.length && j < input.length) {
        result[i] = merge2(result[i++], input[j++], options);
      }
      while (j < input.length) {
        result.push(obj[j++]);
      }
    } else {
      into(result, input);
    }
  } else {
    for (const k in obj) {
      target[k] = merge2(target[k], obj[k], options);
    }
  }
  return target;
}
function buildHashIndex(arr, hashFunction = DEFAULT_HASH_FUNCTION) {
  const map2 = /* @__PURE__ */ new Map();
  arr.forEach((o, i) => {
    const h = hashCode(o, hashFunction);
    if (map2.has(h)) {
      if (!map2.get(h).some((j) => isEqual(arr[j], o))) {
        map2.get(h).push(i);
      }
    } else {
      map2.set(h, [i]);
    }
  });
  return map2;
}
function intersection(input, hashFunction = DEFAULT_HASH_FUNCTION) {
  if (input.some((arr) => arr.length == 0)) return [];
  if (input.length === 1) return Array.from(input);
  const sortedIndex = sortBy(input.map((a, i) => [i, a.length]), (a) => a[1]);
  const smallest = input[sortedIndex[0][0]];
  const map2 = buildHashIndex(smallest, hashFunction);
  const rmap = /* @__PURE__ */ new Map();
  const results = new Array();
  map2.forEach((v, k) => {
    const lhs = v.map((j) => smallest[j]);
    const res = lhs.map((_) => 0);
    const stable = lhs.map((_) => [sortedIndex[0][0], 0]);
    let found = false;
    for (let i = 1; i < input.length; i++) {
      const [currIndex, _] = sortedIndex[i];
      const arr = input[currIndex];
      if (!rmap.has(i)) rmap.set(i, buildHashIndex(arr));
      if (rmap.get(i).has(k)) {
        const rhs = rmap.get(i).get(k).map((j) => arr[j]);
        found = lhs.map((s, n) => rhs.some((t, m) => {
          const p = res[n];
          if (isEqual(s, t)) {
            res[n]++;
            if (currIndex < stable[n][0]) {
              stable[n] = [currIndex, rmap.get(i).get(k)[m]];
            }
          }
          return p < res[n];
        })).some(Boolean);
      }
      if (!found) return;
    }
    if (found) {
      into(results, res.map((n, i) => {
        return n === input.length - 1 ? [lhs[i], stable[i]] : MISSING;
      }).filter((n) => n !== MISSING));
    }
  });
  return results.sort((a, b) => {
    const [_i, [u, m]] = a;
    const [_j, [v, n]] = b;
    const r = compare(u, v);
    if (r !== 0) return r;
    return compare(m, n);
  }).map((v) => v[0]);
}
function flatten(xs, depth = 0) {
  const arr = new Array();
  function flatten2(ys, n) {
    for (let i = 0, len = ys.length; i < len; i++) {
      if (isArray(ys[i]) && (n > 0 || n < 0)) {
        flatten2(ys[i], Math.max(-1, n - 1));
      } else {
        arr.push(ys[i]);
      }
    }
  }
  flatten2(xs, depth);
  return arr;
}
var getMembersOf = (value) => {
  let [proto, names] = [Object.getPrototypeOf(value), Object.getOwnPropertyNames(value)];
  let activeProto = proto;
  while (!names.length && proto !== OBJECT_PROTO && proto !== ARRAY_PROTO) {
    activeProto = proto;
    names = Object.getOwnPropertyNames(proto);
    proto = Object.getPrototypeOf(proto);
  }
  const o = {};
  names.forEach((k) => o[k] = value[k]);
  return [o, activeProto];
};
function isEqual(a, b) {
  const args = [[a, b]];
  while (args.length > 0) {
    [a, b] = args.pop();
    if (a === b) continue;
    const ctor = getConstructor(a);
    if (ctor !== getConstructor(b) || isFunction(a)) return false;
    if (STRING_CONVERTERS.has(ctor)) {
      const str = STRING_CONVERTERS.get(ctor);
      if (str(a) !== str(b)) return false;
      continue;
    }
    if (ctor === Array || ctor === Object) {
      const ka = Object.keys(a);
      const kb = Object.keys(b);
      if (ka.length !== kb.length) return false;
      if (new Set(ka.concat(kb)).size != ka.length) return false;
      for (const k of ka) args.push([a[k], b[k]]);
      continue;
    }
    return false;
  }
  return !args.length;
}
function stringify(value) {
  const cycle = /* @__PURE__ */ new Set();
  const str = (v) => {
    const ctor = getConstructor(v);
    if (STRING_CONVERTERS.has(ctor)) {
      return STRING_CONVERTERS.get(ctor)(v);
    }
    const tag = ctor === Object ? "" : ctor.name;
    if (isFunction(v["toJSON"])) {
      return `${tag}(${JSON.stringify(v)})`;
    }
    if (cycle.has(v)) throw CYCLE_FOUND_ERROR;
    cycle.add(v);
    try {
      if (ctor === Array) {
        return "[" + v.map(str).join(",") + "]";
      }
      if (ctor !== Object) {
        const [members, _] = getMembersOf(v);
        if (isArray(v)) {
          return `${tag}${str([...v, members])}`;
        }
        v = members;
      }
      const objKeys = Object.keys(v);
      objKeys.sort();
      return `${tag}{` + objKeys.map((k) => `${k}:${str(v[k])}`).join(",") + "}";
    } finally {
      cycle.delete(v);
    }
  };
  return str(value);
}
function hashCode(value, hashFunction) {
  hashFunction = hashFunction || DEFAULT_HASH_FUNCTION;
  if (isNil(value)) return null;
  return hashFunction(value).toString();
}
function sortBy(collection, keyFn, comparator = compare) {
  if (isEmpty(collection)) return collection;
  const sorted = new Array();
  const result = new Array();
  for (let i = 0; i < collection.length; i++) {
    const obj = collection[i];
    const key = keyFn(obj, i);
    if (isNil(key)) {
      result.push(obj);
    } else {
      sorted.push([key, obj]);
    }
  }
  sorted.sort((a, b) => comparator(a[0], b[0]));
  return into(result, sorted.map((o) => o[1]));
}
function groupBy(collection, keyFn, hashFunction = DEFAULT_HASH_FUNCTION) {
  if (collection.length < 1) return /* @__PURE__ */ new Map();
  const lookup = /* @__PURE__ */ new Map();
  const result = /* @__PURE__ */ new Map();
  for (let i = 0; i < collection.length; i++) {
    const obj = collection[i];
    const key = keyFn(obj, i);
    const hash = hashCode(key, hashFunction);
    if (hash === null) {
      if (result.has(null)) {
        result.get(null).push(obj);
      } else {
        result.set(null, [obj]);
      }
    } else {
      const existingKey = lookup.has(hash) ? lookup.get(hash).find((k) => isEqual(k, key)) : null;
      if (isNil(existingKey)) {
        result.set(key, [obj]);
        if (lookup.has(hash)) {
          lookup.get(hash).push(key);
        } else {
          lookup.set(hash, [key]);
        }
      } else {
        result.get(existingKey).push(obj);
      }
    }
  }
  return result;
}
var MAX_ARRAY_PUSH = 5e4;
function into(target, ...rest) {
  if (target instanceof Array) {
    return rest.reduce((acc, arr) => {
      let i = Math.ceil(arr.length / MAX_ARRAY_PUSH);
      let begin = 0;
      while (i-- > 0) {
        Array.prototype.push.apply(acc, arr.slice(begin, begin + MAX_ARRAY_PUSH));
        begin += MAX_ARRAY_PUSH;
      }
      return acc;
    }, target);
  } else {
    return rest.filter(isObjectLike).reduce((acc, item) => {
      Object.assign(acc, item);
      return acc;
    }, target);
  }
}
function getValue(obj, key) {
  return isObjectLike(obj) ? obj[key] : void 0;
}
function unwrap(arr, depth) {
  if (depth < 1) return arr;
  while (depth-- && arr.length === 1) arr = arr[0];
  return arr;
}
function resolve(obj, selector, options) {
  let depth = 0;
  function resolve2(o, path) {
    let value = o;
    for (let i = 0; i < path.length; i++) {
      const field = path[i];
      const isText = /^\d+$/.exec(field) === null;
      if (isText && value instanceof Array) {
        if (i === 0 && depth > 0) break;
        depth += 1;
        const subpath = path.slice(i);
        value = value.reduce((acc, item) => {
          const v = resolve2(item, subpath);
          if (v !== void 0) acc.push(v);
          return acc;
        }, []);
        break;
      } else {
        value = getValue(value, field);
      }
      if (value === void 0) break;
    }
    return value;
  }
  const result = JS_SIMPLE_TYPES.has(getType(obj).toLowerCase()) ? obj : resolve2(obj, selector.split("."));
  return result instanceof Array && (options === null || options === void 0 ? void 0 : options.unwrapArray) ? unwrap(result, depth) : result;
}
function resolveGraph(obj, selector, options) {
  const names = selector.split(".");
  const key = names[0];
  const next = names.slice(1).join(".");
  const isIndex = /^\d+$/.exec(key) !== null;
  const hasNext = names.length > 1;
  let result;
  let value;
  if (obj instanceof Array) {
    if (isIndex) {
      result = getValue(obj, Number(key));
      if (hasNext) {
        result = resolveGraph(result, next, options);
      }
      result = [result];
    } else {
      result = [];
      for (const item of obj) {
        value = resolveGraph(item, selector, options);
        if (options === null || options === void 0 ? void 0 : options.preserveMissing) {
          if (value === void 0) {
            value = MISSING;
          }
          result.push(value);
        } else if (value !== void 0) {
          result.push(value);
        }
      }
    }
  } else {
    value = getValue(obj, key);
    if (hasNext) {
      value = resolveGraph(value, next, options);
    }
    if (value === void 0) return void 0;
    result = (options === null || options === void 0 ? void 0 : options.preserveKeys) ? Object.assign({}, obj) : {};
    result[key] = value;
  }
  return result;
}
function filterMissing(obj) {
  if (obj instanceof Array) {
    for (let i = obj.length - 1; i >= 0; i--) {
      if (obj[i] === MISSING) {
        obj.splice(i, 1);
      } else {
        filterMissing(obj[i]);
      }
    }
  } else if (isObject2(obj)) {
    for (const k in obj) {
      if (has(obj, k)) {
        filterMissing(obj[k]);
      }
    }
  }
}
var NUMBER_RE = /^\d+$/;
function walk(obj, selector, fn, options) {
  const names = selector.split(".");
  const key = names[0];
  const next = names.slice(1).join(".");
  if (names.length === 1) {
    if (isObject2(obj) || isArray(obj) && NUMBER_RE.test(key)) {
      fn(obj, key);
    }
  } else {
    if ((options === null || options === void 0 ? void 0 : options.buildGraph) && isNil(obj[key])) {
      obj[key] = {};
    }
    const item = obj[key];
    if (!item) return;
    const isNextArrayIndex = !!(names.length > 1 && NUMBER_RE.test(names[1]));
    if (item instanceof Array && (options === null || options === void 0 ? void 0 : options.descendArray) && !isNextArrayIndex) {
      item.forEach((e) => walk(e, next, fn, options));
    } else {
      walk(item, next, fn, options);
    }
  }
}
function setValue(obj, selector, value) {
  walk(obj, selector, (item, key) => {
    item[key] = isFunction(value) ? value(item[key]) : value;
  }, {
    buildGraph: true
  });
}
function removeValue(obj, selector, options) {
  walk(obj, selector, (item, key) => {
    if (item instanceof Array) {
      if (/^\d+$/.test(key)) {
        item.splice(parseInt(key), 1);
      } else if (options && options.descendArray) {
        for (const elem of item) {
          if (isObject2(elem)) {
            delete elem[key];
          }
        }
      }
    } else if (isObject2(item)) {
      delete item[key];
    }
  }, options);
}
var OPERATOR_NAME_PATTERN = /^\$[a-zA-Z0-9_]+$/;
function isOperator(name) {
  return OPERATOR_NAME_PATTERN.test(name);
}
function normalize(expr) {
  if (JS_SIMPLE_TYPES.has(getType(expr).toLowerCase())) {
    return isRegExp(expr) ? {
      $regex: expr
    } : {
      $eq: expr
    };
  }
  if (isObjectLike(expr)) {
    const exprObj = expr;
    if (!Object.keys(exprObj).some(isOperator)) {
      return {
        $eq: expr
      };
    }
    if (has(expr, "$regex")) {
      const newExpr = Object.assign({}, expr);
      newExpr["$regex"] = new RegExp(expr["$regex"], expr["$options"]);
      delete newExpr["$options"];
      return newExpr;
    }
  }
  return expr;
}

// node_modules/mingo/dist/esm/core.js
var ProcessingMode;
(function(ProcessingMode2) {
  ProcessingMode2["CLONE_ALL"] = "CLONE_ALL";
  ProcessingMode2["CLONE_INPUT"] = "CLONE_INPUT";
  ProcessingMode2["CLONE_OUTPUT"] = "CLONE_OUTPUT";
  ProcessingMode2["CLONE_OFF"] = "CLONE_OFF";
})(ProcessingMode || (ProcessingMode = {}));
var ComputeOptions = class _ComputeOptions {
  constructor(_opts, _root, _local, timestamp = Date.now()) {
    this._opts = _opts;
    this._root = _root;
    this._local = _local;
    this.timestamp = timestamp;
    this.update(_root, _local);
  }
  /**
   * Initialize new ComputeOptions.
   *
   * @param options
   * @param root
   * @param local
   * @returns {ComputeOptions}
   */
  static init(options, root, local) {
    return options instanceof _ComputeOptions ? new _ComputeOptions(options._opts, isNil(options.root) ? root : options.root, Object.assign({}, options.local, local)) : new _ComputeOptions(options, root, local);
  }
  /** Updates the internal mutable state. */
  update(root, local) {
    var _a;
    this._root = root;
    this._local = local ? Object.assign({}, local, {
      variables: Object.assign({}, (_a = this._local) === null || _a === void 0 ? void 0 : _a.variables, local === null || local === void 0 ? void 0 : local.variables)
    }) : local;
    return this;
  }
  getOptions() {
    return Object.freeze(Object.assign(Object.assign({}, this._opts), {
      context: Context.from(this._opts.context)
    }));
  }
  get root() {
    return this._root;
  }
  get local() {
    return this._local;
  }
  get idKey() {
    return this._opts.idKey;
  }
  get collation() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.collation;
  }
  get processingMode() {
    var _a;
    return ((_a = this._opts) === null || _a === void 0 ? void 0 : _a.processingMode) || ProcessingMode.CLONE_OFF;
  }
  get useStrictMode() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.useStrictMode;
  }
  get scriptEnabled() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.scriptEnabled;
  }
  get useGlobalContext() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.useGlobalContext;
  }
  get hashFunction() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.hashFunction;
  }
  get collectionResolver() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.collectionResolver;
  }
  get jsonSchemaValidator() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.jsonSchemaValidator;
  }
  get variables() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.variables;
  }
  get context() {
    var _a;
    return (_a = this._opts) === null || _a === void 0 ? void 0 : _a.context;
  }
};
function initOptions(options) {
  return options instanceof ComputeOptions ? options.getOptions() : Object.freeze(Object.assign(Object.assign({
    idKey: "_id",
    scriptEnabled: true,
    useStrictMode: true,
    useGlobalContext: true,
    processingMode: ProcessingMode.CLONE_OFF
  }, options), {
    context: (options === null || options === void 0 ? void 0 : options.context) ? Context.from(options === null || options === void 0 ? void 0 : options.context) : Context.init({})
  }));
}
var OperatorType;
(function(OperatorType2) {
  OperatorType2["ACCUMULATOR"] = "accumulator";
  OperatorType2["EXPRESSION"] = "expression";
  OperatorType2["PIPELINE"] = "pipeline";
  OperatorType2["PROJECTION"] = "projection";
  OperatorType2["QUERY"] = "query";
  OperatorType2["WINDOW"] = "window";
})(OperatorType || (OperatorType = {}));
var Context = class _Context {
  constructor(ops) {
    this.operators = {
      [OperatorType.ACCUMULATOR]: {},
      [OperatorType.EXPRESSION]: {},
      [OperatorType.PIPELINE]: {},
      [OperatorType.PROJECTION]: {},
      [OperatorType.QUERY]: {},
      [OperatorType.WINDOW]: {}
    };
    for (const [type, operators] of Object.entries(ops)) {
      this.addOperators(type, operators);
    }
  }
  static init(ops = {}) {
    return new _Context(ops);
  }
  static from(ctx) {
    return new _Context(ctx.operators);
  }
  addOperators(type, ops) {
    for (const [name, fn] of Object.entries(ops)) {
      if (!this.getOperator(type, name)) {
        this.operators[type][name] = fn;
      }
    }
    return this;
  }
  // register
  addAccumulatorOps(ops) {
    return this.addOperators(OperatorType.ACCUMULATOR, ops);
  }
  addExpressionOps(ops) {
    return this.addOperators(OperatorType.EXPRESSION, ops);
  }
  addQueryOps(ops) {
    return this.addOperators(OperatorType.QUERY, ops);
  }
  addPipelineOps(ops) {
    return this.addOperators(OperatorType.PIPELINE, ops);
  }
  addProjectionOps(ops) {
    return this.addOperators(OperatorType.PROJECTION, ops);
  }
  addWindowOps(ops) {
    return this.addOperators(OperatorType.WINDOW, ops);
  }
  // getters
  getOperator(type, name) {
    return type in this.operators ? this.operators[type][name] || null : null;
  }
};
var GLOBAL_CONTEXT = Context.init();
function useOperators(type, operators) {
  for (const [name, fn] of Object.entries(operators)) {
    assert(isFunction(fn) && isOperator(name), `'${name}' is not a valid operator`);
    const currentFn = getOperator(type, name, null);
    assert(!currentFn || fn === currentFn, `${name} already exists for '${type}' operators. Cannot change operator function once registered.`);
  }
  switch (type) {
    case OperatorType.ACCUMULATOR:
      GLOBAL_CONTEXT.addAccumulatorOps(operators);
      break;
    case OperatorType.EXPRESSION:
      GLOBAL_CONTEXT.addExpressionOps(operators);
      break;
    case OperatorType.PIPELINE:
      GLOBAL_CONTEXT.addPipelineOps(operators);
      break;
    case OperatorType.PROJECTION:
      GLOBAL_CONTEXT.addProjectionOps(operators);
      break;
    case OperatorType.QUERY:
      GLOBAL_CONTEXT.addQueryOps(operators);
      break;
    case OperatorType.WINDOW:
      GLOBAL_CONTEXT.addWindowOps(operators);
      break;
  }
}
function getOperator(type, operator, options) {
  const {
    context: ctx,
    useGlobalContext: fallback
  } = options || {};
  const fn = ctx ? ctx.getOperator(type, operator) : null;
  return !fn && fallback ? GLOBAL_CONTEXT.getOperator(type, operator) : fn;
}
var systemVariables = {
  $$ROOT(_obj, _expr, options) {
    return options.root;
  },
  $$CURRENT(obj, _expr, _options) {
    return obj;
  },
  $$REMOVE(_obj, _expr, _options) {
    return void 0;
  },
  $$NOW(_obj, _expr, options) {
    return new Date(options.timestamp);
  }
};
var redactVariables = {
  $$KEEP(obj, _expr, _options) {
    return obj;
  },
  $$PRUNE(_obj, _expr, _options) {
    return void 0;
  },
  $$DESCEND(obj, expr, options) {
    if (!has(expr, "$cond")) return obj;
    let result;
    for (const [key, current] of Object.entries(obj)) {
      if (isObjectLike(current)) {
        if (current instanceof Array) {
          const array = [];
          for (let elem of current) {
            if (isObject2(elem)) {
              elem = redact(elem, expr, options.update(elem));
            }
            if (!isNil(elem)) {
              array.push(elem);
            }
          }
          result = array;
        } else {
          result = redact(current, expr, options.update(current));
        }
        if (isNil(result)) {
          delete obj[key];
        } else {
          obj[key] = result;
        }
      }
    }
    return obj;
  }
};
function computeValue(obj, expr, operator, options) {
  var _a;
  const copts = ComputeOptions.init(options, obj);
  operator = operator || "";
  if (isOperator(operator)) {
    const callExpression = getOperator(OperatorType.EXPRESSION, operator, options);
    if (callExpression) return callExpression(obj, expr, copts);
    const callAccumulator = getOperator(OperatorType.ACCUMULATOR, operator, options);
    if (callAccumulator) {
      if (!(obj instanceof Array)) {
        obj = computeValue(obj, expr, null, copts);
        expr = null;
      }
      assert(obj instanceof Array, `'${operator}' target must be an array.`);
      return callAccumulator(
        obj,
        expr,
        // reset the root object for accumulators.
        copts.update(null, copts.local)
      );
    }
    throw new MingoError(`operator '${operator}' is not registered`);
  }
  if (isString(expr) && expr.length > 0 && expr[0] === "$") {
    if (has(redactVariables, expr)) {
      return expr;
    }
    let context = copts.root;
    const arr = expr.split(".");
    if (has(systemVariables, arr[0])) {
      context = systemVariables[arr[0]](obj, null, copts);
      expr = expr.slice(arr[0].length + 1);
    } else if (arr[0].slice(0, 2) === "$$") {
      context = Object.assign(
        {},
        copts.variables,
        // global vars
        // current item is added before local variables because the binding may be changed.
        {
          this: obj
        },
        (_a = copts.local) === null || _a === void 0 ? void 0 : _a.variables
        // local vars
      );
      const prefix = arr[0].slice(2);
      assert(has(context, prefix), `Use of undefined variable: ${prefix}`);
      expr = expr.slice(2);
    } else {
      expr = expr.slice(1);
    }
    if (expr === "") return context;
    return resolve(context, expr);
  }
  if (isArray(expr)) {
    return expr.map((item) => computeValue(obj, item, null, copts));
  } else if (isObject2(expr)) {
    const result = {};
    for (const [key, val] of Object.entries(expr)) {
      result[key] = computeValue(obj, val, key, copts);
      if ([OperatorType.EXPRESSION, OperatorType.ACCUMULATOR].some((t) => !!getOperator(t, key, options))) {
        assert(Object.keys(expr).length === 1, "Invalid aggregation expression '" + JSON.stringify(expr) + "'");
        return result[key];
      }
    }
    return result;
  }
  return expr;
}
function redact(obj, expr, options) {
  const result = computeValue(obj, expr, null, options);
  return has(redactVariables, result) ? redactVariables[result](obj, expr, options) : result;
}

// node_modules/mingo/dist/esm/lazy.js
function Lazy(source) {
  return source instanceof Iterator ? source : new Iterator(source);
}
function compose(...iterators) {
  let index = 0;
  return Lazy(() => {
    while (index < iterators.length) {
      const o = iterators[index].next();
      if (!o.done) return o;
      index++;
    }
    return {
      done: true
    };
  });
}
function isGenerator(o) {
  return !!o && typeof o === "object" && (o === null || o === void 0 ? void 0 : o.next) instanceof Function;
}
function dropItem(array, i) {
  const rest = array.slice(i + 1);
  array.splice(i);
  Array.prototype.push.apply(array, rest);
}
var DONE = new Error();
var Action;
(function(Action2) {
  Action2[Action2["MAP"] = 0] = "MAP";
  Action2[Action2["FILTER"] = 1] = "FILTER";
  Action2[Action2["TAKE"] = 2] = "TAKE";
  Action2[Action2["DROP"] = 3] = "DROP";
})(Action || (Action = {}));
function createCallback(nextFn, iteratees, buffer) {
  let done = false;
  let index = -1;
  let bufferIndex = 0;
  return function(storeResult) {
    try {
      outer: while (!done) {
        let o = nextFn();
        index++;
        let i = -1;
        const size = iteratees.length;
        let innerDone = false;
        while (++i < size) {
          const r = iteratees[i];
          switch (r.action) {
            case Action.MAP:
              o = r.func(o, index);
              break;
            case Action.FILTER:
              if (!r.func(o, index)) continue outer;
              break;
            case Action.TAKE:
              --r.count;
              if (!r.count) innerDone = true;
              break;
            case Action.DROP:
              --r.count;
              if (!r.count) dropItem(iteratees, i);
              continue outer;
            default:
              break outer;
          }
        }
        done = innerDone;
        if (storeResult) {
          buffer[bufferIndex++] = o;
        } else {
          return {
            value: o,
            done: false
          };
        }
      }
    } catch (e) {
      if (e !== DONE) throw e;
    }
    done = true;
    return {
      done
    };
  };
}
var Iterator = class {
  /**
   * @param {*} source An iterable object or function.
   *    Array - return one element per cycle
   *    Object{next:Function} - call next() for the next value (this also handles generator functions)
   *    Function - call to return the next value
   * @param {Function} fn An optional transformation function
   */
  constructor(source) {
    this.iteratees = [];
    this.yieldedValues = [];
    this.isDone = false;
    let nextVal;
    if (source instanceof Function) {
      source = {
        next: source
      };
    }
    if (isGenerator(source)) {
      const src = source;
      nextVal = () => {
        const o = src.next();
        if (o.done) throw DONE;
        return o.value;
      };
    } else if (source instanceof Array) {
      const data = source;
      const size = data.length;
      let index = 0;
      nextVal = () => {
        if (index < size) return data[index++];
        throw DONE;
      };
    } else if (!(source instanceof Function)) {
      throw new MingoError(`Lazy must be initialized with an array, generator, or function.`);
    }
    this.getNext = createCallback(nextVal, this.iteratees, this.yieldedValues);
  }
  /**
   * Add an iteratee to this lazy sequence
   */
  push(action, value) {
    if (typeof value === "function") {
      this.iteratees.push({
        action,
        func: value
      });
    } else if (typeof value === "number") {
      this.iteratees.push({
        action,
        count: value
      });
    }
    return this;
  }
  next() {
    return this.getNext();
  }
  // Iteratees methods
  /**
   * Transform each item in the sequence to a new value
   * @param {Function} f
   */
  map(f) {
    return this.push(Action.MAP, f);
  }
  /**
   * Select only items matching the given predicate
   * @param {Function} pred
   */
  filter(predicate) {
    return this.push(Action.FILTER, predicate);
  }
  /**
   * Take given numbe for values from sequence
   * @param {Number} n A number greater than 0
   */
  take(n) {
    return n > 0 ? this.push(Action.TAKE, n) : this;
  }
  /**
   * Drop a number of values from the sequence
   * @param {Number} n Number of items to drop greater than 0
   */
  drop(n) {
    return n > 0 ? this.push(Action.DROP, n) : this;
  }
  // Transformations
  /**
   * Returns a new lazy object with results of the transformation
   * The entire sequence is realized.
   *
   * @param {Callback<Source, RawArray>} fn Tranform function of type (Array) => (Any)
   */
  transform(fn) {
    const self = this;
    let iter;
    return Lazy(() => {
      if (!iter) {
        iter = Lazy(fn(self.value()));
      }
      return iter.next();
    });
  }
  // Terminal methods
  /**
   * Returns the fully realized values of the iterators.
   * The return value will be an array unless `lazy.first()` was used.
   * The realized values are cached for subsequent calls.
   */
  value() {
    if (!this.isDone) {
      this.isDone = this.getNext(true).done;
    }
    return this.yieldedValues;
  }
  /**
   * Execute the funcion for each value. Will stop when an execution returns false.
   * @param {Function} f
   * @returns {Boolean} false iff `f` return false for AnyVal execution, otherwise true
   */
  each(f) {
    for (; ; ) {
      const o = this.next();
      if (o.done) break;
      if (f(o.value) === false) return false;
    }
    return true;
  }
  /**
   * Returns the reduction of sequence according the reducing function
   *
   * @param {*} f a reducing function
   * @param {*} initialValue
   */
  reduce(f, initialValue) {
    let o = this.next();
    if (initialValue === void 0 && !o.done) {
      initialValue = o.value;
      o = this.next();
    }
    while (!o.done) {
      initialValue = f(initialValue, o.value);
      o = this.next();
    }
    return initialValue;
  }
  /**
   * Returns the number of matched items in the sequence
   */
  size() {
    return this.reduce((acc, _) => ++acc, 0);
  }
  [Symbol.iterator]() {
    return this;
  }
};

// node_modules/mingo/dist/esm/aggregator.js
var Aggregator = class {
  constructor(pipeline, options) {
    this.pipeline = pipeline;
    this.options = initOptions(options);
  }
  /**
   * Returns an `Lazy` iterator for processing results of pipeline
   *
   * @param {*} collection An array or iterator object
   * @returns {Iterator} an iterator object
   */
  stream(collection) {
    let iterator = Lazy(collection);
    const mode = this.options.processingMode;
    if (mode == ProcessingMode.CLONE_ALL || mode == ProcessingMode.CLONE_INPUT) {
      iterator.map(cloneDeep);
    }
    const pipelineOperators = new Array();
    if (!isEmpty(this.pipeline)) {
      for (const operator of this.pipeline) {
        const operatorKeys = Object.keys(operator);
        const opName = operatorKeys[0];
        const call = getOperator(OperatorType.PIPELINE, opName, this.options);
        assert(operatorKeys.length === 1 && !!call, `invalid pipeline operator ${opName}`);
        pipelineOperators.push(opName);
        iterator = call(iterator, operator[opName], this.options);
      }
    }
    if (mode == ProcessingMode.CLONE_OUTPUT || mode == ProcessingMode.CLONE_ALL && !!intersection([["$group", "$unwind"], pipelineOperators]).length) {
      iterator.map(cloneDeep);
    }
    return iterator;
  }
  /**
   * Return the results of the aggregation as an array.
   *
   * @param {*} collection
   * @param {*} query
   */
  run(collection) {
    return this.stream(collection).value();
  }
};

// node_modules/mingo/dist/esm/cursor.js
var Cursor = class {
  constructor(source, predicate, projection, options) {
    this.source = source;
    this.predicate = predicate;
    this.projection = projection;
    this.options = options;
    this.operators = [];
    this.result = null;
    this.buffer = [];
  }
  /** Returns the iterator from running the query */
  fetch() {
    if (this.result) return this.result;
    if (isObject2(this.projection)) {
      this.operators.push({
        $project: this.projection
      });
    }
    this.result = Lazy(this.source).filter(this.predicate);
    if (this.operators.length > 0) {
      this.result = new Aggregator(this.operators, this.options).stream(this.result);
    }
    return this.result;
  }
  /** Returns an iterator with the buffered data included */
  fetchAll() {
    const buffered = Lazy([...this.buffer]);
    this.buffer = [];
    return compose(buffered, this.fetch());
  }
  /**
   * Return remaining objects in the cursor as an array. This method exhausts the cursor
   * @returns {Array}
   */
  all() {
    return this.fetchAll().value();
  }
  /**
   * Returns the number of objects return in the cursor. This method exhausts the cursor
   * @returns {Number}
   */
  count() {
    return this.all().length;
  }
  /**
   * Returns a cursor that begins returning results only after passing or skipping a number of documents.
   * @param {Number} n the number of results to skip.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  skip(n) {
    this.operators.push({
      $skip: n
    });
    return this;
  }
  /**
   * Constrains the size of a cursor's result set.
   * @param {Number} n the number of results to limit to.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  limit(n) {
    this.operators.push({
      $limit: n
    });
    return this;
  }
  /**
   * Returns results ordered according to a sort specification.
   * @param {Object} modifier an object of key and values specifying the sort order. 1 for ascending and -1 for descending
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  sort(modifier) {
    this.operators.push({
      $sort: modifier
    });
    return this;
  }
  /**
   * Specifies the collation for the cursor returned by the `mingo.Query.find`
   * @param {*} spec
   */
  collation(spec) {
    this.options = Object.assign(Object.assign({}, this.options), {
      collation: spec
    });
    return this;
  }
  /**
   * Returns the next document in a cursor.
   * @returns {Object | Boolean}
   */
  next() {
    if (this.buffer.length > 0) {
      return this.buffer.pop();
    }
    const o = this.fetch().next();
    if (o.done) return;
    return o.value;
  }
  /**
   * Returns true if the cursor has documents and can be iterated.
   * @returns {boolean}
   */
  hasNext() {
    if (this.buffer.length > 0) return true;
    const o = this.fetch().next();
    if (o.done) return false;
    this.buffer.push(o.value);
    return true;
  }
  /**
   * Applies a function to each document in a cursor and collects the return values in an array.
   * @param fn
   * @returns {Array}
   */
  map(fn) {
    return this.all().map(fn);
  }
  /**
   * Applies a JavaScript function for every document in a cursor.
   * @param fn
   */
  forEach(fn) {
    this.all().forEach(fn);
  }
  [Symbol.iterator]() {
    return this.fetchAll();
  }
};

// node_modules/mingo/dist/esm/query.js
var Query = class {
  constructor(condition, options) {
    this.condition = condition;
    this.options = initOptions(options);
    this.compiled = [];
    this.compile();
  }
  compile() {
    assert(isObject2(this.condition), `query criteria must be an object: ${JSON.stringify(this.condition)}`);
    const whereOperator = {};
    for (const [field, expr] of Object.entries(this.condition)) {
      if ("$where" === field) {
        Object.assign(whereOperator, {
          field,
          expr
        });
      } else if (inArray(["$and", "$or", "$nor", "$expr", "$jsonSchema"], field)) {
        this.processOperator(field, field, expr);
      } else {
        assert(!isOperator(field), `unknown top level operator: ${field}`);
        for (const [operator, val] of Object.entries(normalize(expr))) {
          this.processOperator(field, operator, val);
        }
      }
      if (whereOperator.field) {
        this.processOperator(whereOperator.field, whereOperator.field, whereOperator.expr);
      }
    }
  }
  processOperator(field, operator, value) {
    const call = getOperator(OperatorType.QUERY, operator, this.options);
    if (!call) {
      throw new MingoError(`unknown query operator ${operator}`);
    }
    const fn = call(field, value, this.options);
    this.compiled.push(fn);
  }
  /**
   * Checks if the object passes the query criteria. Returns true if so, false otherwise.
   *
   * @param obj The object to test
   * @returns {boolean} True or false
   */
  test(obj) {
    for (let i = 0, len = this.compiled.length; i < len; i++) {
      if (!this.compiled[i](obj)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Returns a cursor to select matching documents from the input source.
   *
   * @param source A source providing a sequence of documents
   * @param projection An optional projection criteria
   * @returns {Cursor} A Cursor for iterating over the results
   */
  find(collection, projection) {
    return new Cursor(collection, (x) => this.test(x), projection || {}, this.options);
  }
  /**
   * Remove matched documents from the collection returning the remainder
   *
   * @param collection An array of documents
   * @returns {Array} A new array with matching elements removed
   */
  remove(collection) {
    return collection.reduce((acc, obj) => {
      if (!this.test(obj)) acc.push(obj);
      return acc;
    }, []);
  }
};

// node_modules/mingo/dist/esm/operators/expression/date/_internal.js
var MILLIS_PER_DAY = 1e3 * 60 * 60 * 24;
var DURATION_IN_MILLIS = {
  week: MILLIS_PER_DAY * 7,
  day: MILLIS_PER_DAY,
  hour: 1e3 * 60 * 60,
  minute: 1e3 * 60,
  second: 1e3,
  millisecond: 1
};

// node_modules/mingo/dist/esm/operators/window/_internal.js
var MILLIS_PER_UNIT = {
  week: MILLIS_PER_DAY * 7,
  day: MILLIS_PER_DAY,
  hour: MILLIS_PER_DAY / 24,
  minute: 6e4,
  second: 1e3,
  millisecond: 1
};

// node_modules/mingo/dist/esm/operators/pipeline/sort.js
var $sort = (collection, sortKeys, options) => {
  if (isEmpty(sortKeys) || !isObject2(sortKeys)) return collection;
  let cmp = compare;
  const collationSpec = options.collation;
  if (isObject2(collationSpec) && isString(collationSpec.locale)) {
    cmp = collationComparator(collationSpec);
  }
  return collection.transform((coll) => {
    const modifiers = Object.keys(sortKeys);
    for (const key of modifiers.reverse()) {
      const groups = groupBy(coll, (obj) => resolve(obj, key), options.hashFunction);
      const sortedKeys = Array.from(groups.keys()).sort(cmp);
      if (sortKeys[key] === -1) sortedKeys.reverse();
      coll = [];
      sortedKeys.reduce((acc, key2) => into(acc, groups.get(key2)), coll);
    }
    return coll;
  });
};
var COLLATION_STRENGTH = {
  // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
  1: "base",
  //  Only strings that differ in base letters or accents and other diacritic marks compare as unequal.
  // Examples: a ≠ b, a ≠ á, a = A.
  2: "accent",
  // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal.
  // Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A
  3: "variant"
  // case - Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
};
function collationComparator(spec) {
  const localeOpt = {
    sensitivity: COLLATION_STRENGTH[spec.strength || 3],
    caseFirst: spec.caseFirst === "off" ? "false" : spec.caseFirst || "false",
    numeric: spec.numericOrdering || false,
    ignorePunctuation: spec.alternate === "shifted"
  };
  if ((spec.caseLevel || false) === true) {
    if (localeOpt.sensitivity === "base") localeOpt.sensitivity = "case";
    if (localeOpt.sensitivity === "accent") localeOpt.sensitivity = "variant";
  }
  const collator = new Intl.Collator(spec.locale, localeOpt);
  return (a, b) => {
    if (!isString(a) || !isString(b)) return compare(a, b);
    const i = collator.compare(a, b);
    if (i < 0) return -1;
    if (i > 0) return 1;
    return 0;
  };
}

// node_modules/mingo/dist/esm/operators/_predicates.js
function createQueryOperator(predicate) {
  const f = (selector, value, options) => {
    const opts = {
      unwrapArray: true
    };
    const depth = Math.max(1, selector.split(".").length - 1);
    return (obj) => {
      const lhs = resolve(obj, selector, opts);
      return predicate(lhs, value, Object.assign(Object.assign({}, options), {
        depth
      }));
    };
  };
  f.op = "query";
  return f;
}
function createExpressionOperator(predicate) {
  return (obj, expr, options) => {
    const args = computeValue(obj, expr, null, options);
    return predicate(...args);
  };
}
function $eq(a, b, options) {
  if (isEqual(a, b)) return true;
  if (isNil(a) && isNil(b)) return true;
  if (a instanceof Array) {
    const eq = isEqual.bind(null, b);
    return a.some(eq) || flatten(a, options === null || options === void 0 ? void 0 : options.depth).some(eq);
  }
  return false;
}
function $ne(a, b, options) {
  return !$eq(a, b, options);
}
function $in(a, b, options) {
  if (isNil(a)) return b.some((v) => v === null);
  return intersection([ensureArray(a), b], options === null || options === void 0 ? void 0 : options.hashFunction).length > 0;
}
function $nin(a, b, options) {
  return !$in(a, b, options);
}
function $lt(a, b, _options) {
  return compare2(a, b, (x, y) => compare(x, y) < 0);
}
function $lte(a, b, _options) {
  return compare2(a, b, (x, y) => compare(x, y) <= 0);
}
function $gt(a, b, _options) {
  return compare2(a, b, (x, y) => compare(x, y) > 0);
}
function $gte(a, b, _options) {
  return compare2(a, b, (x, y) => compare(x, y) >= 0);
}
function $mod(a, b, _options) {
  return ensureArray(a).some((x) => b.length === 2 && x % b[0] === b[1]);
}
function $regex(a, b, options) {
  const lhs = ensureArray(a);
  const match = (x) => isString(x) && truthy(b.exec(x), options === null || options === void 0 ? void 0 : options.useStrictMode);
  return lhs.some(match) || flatten(lhs, 1).some(match);
}
function $exists(a, b, _options) {
  return (b === false || b === 0) && a === void 0 || (b === true || b === 1) && a !== void 0;
}
function $all(values, queries, options) {
  if (!isArray(values) || !isArray(queries) || !values.length || !queries.length) {
    return false;
  }
  let matched = true;
  for (const query of queries) {
    if (!matched) break;
    if (isObject2(query) && inArray(Object.keys(query), "$elemMatch")) {
      matched = $elemMatch(values, query["$elemMatch"], options);
    } else if (query instanceof RegExp) {
      matched = values.some((s) => typeof s === "string" && query.test(s));
    } else {
      matched = values.some((v) => isEqual(query, v));
    }
  }
  return matched;
}
function $size(a, b, _options) {
  return Array.isArray(a) && a.length === b;
}
function isNonBooleanOperator(name) {
  return isOperator(name) && ["$and", "$or", "$nor"].indexOf(name) === -1;
}
function $elemMatch(a, b, options) {
  if (isArray(a) && !isEmpty(a)) {
    let format = (x) => x;
    let criteria = b;
    if (Object.keys(b).every(isNonBooleanOperator)) {
      criteria = {
        temp: b
      };
      format = (x) => ({
        temp: x
      });
    }
    const query = new Query(criteria, options);
    for (let i = 0, len = a.length; i < len; i++) {
      if (query.test(format(a[i]))) {
        return true;
      }
    }
  }
  return false;
}
var isNull = (a) => a === null;
var isInt = (a) => isNumber(a) && a >= MIN_INT && a <= MAX_INT && a.toString().indexOf(".") === -1;
var isLong = (a) => isNumber(a) && a >= MIN_LONG && a <= MAX_LONG && a.toString().indexOf(".") === -1;
var compareFuncs = {
  array: isArray,
  bool: isBoolean,
  boolean: isBoolean,
  date: isDate,
  decimal: isNumber,
  double: isNumber,
  int: isInt,
  long: isLong,
  number: isNumber,
  null: isNull,
  object: isObject2,
  regex: isRegExp,
  regexp: isRegExp,
  string: isString,
  // added for completeness
  undefined: isNil,
  // deprecated
  function: (_) => {
    throw new MingoError("unsupported type key `function`.");
  },
  // Mongo identifiers
  1: isNumber,
  //double
  2: isString,
  3: isObject2,
  4: isArray,
  6: isNil,
  // deprecated
  8: isBoolean,
  9: isDate,
  10: isNull,
  11: isRegExp,
  16: isInt,
  18: isLong,
  19: isNumber
  //decimal
};
function compareType(a, b, _) {
  const f = compareFuncs[b];
  return f ? f(a) : false;
}
function $type(a, b, options) {
  return Array.isArray(b) ? b.findIndex((t) => compareType(a, t, options)) >= 0 : compareType(a, b, options);
}
function compare2(a, b, f) {
  return ensureArray(a).some((x) => getType(x) === getType(b) && f(x, b));
}

// node_modules/mingo/dist/esm/operators/expression/array/nin.js
var $nin2 = createExpressionOperator($nin);

// node_modules/mingo/dist/esm/operators/expression/bitwise/_internal.js
var bitwise = (op, compute) => (obj, expr, options) => {
  assert(isArray(expr), `${op}: expression must be an array.`);
  const nums = computeValue(obj, expr, null, options);
  if (nums.some(isNil)) return null;
  assert(nums.every(isNumber), `${op}: expression must evalue to array of numbers.`);
  return compute(nums);
};

// node_modules/mingo/dist/esm/operators/expression/bitwise/bitAnd.js
var $bitAnd = bitwise("$bitAnd", (nums) => nums.reduce((a, b) => a & b, -1));

// node_modules/mingo/dist/esm/operators/expression/bitwise/bitOr.js
var $bitOr = bitwise("$bitOr", (nums) => nums.reduce((a, b) => a | b, 0));

// node_modules/mingo/dist/esm/operators/expression/bitwise/bitXor.js
var $bitXor = bitwise("$bitXor", (nums) => nums.reduce((a, b) => a ^ b, 0));

// node_modules/mingo/dist/esm/operators/expression/comparison/eq.js
var $eq2 = createExpressionOperator($eq);

// node_modules/mingo/dist/esm/operators/expression/comparison/gt.js
var $gt2 = createExpressionOperator($gt);

// node_modules/mingo/dist/esm/operators/expression/comparison/gte.js
var $gte2 = createExpressionOperator($gte);

// node_modules/mingo/dist/esm/operators/expression/comparison/lt.js
var $lt2 = createExpressionOperator($lt);

// node_modules/mingo/dist/esm/operators/expression/comparison/lte.js
var $lte2 = createExpressionOperator($lte);

// node_modules/mingo/dist/esm/operators/expression/comparison/ne.js
var $ne2 = createExpressionOperator($ne);

// node_modules/mingo/dist/esm/operators/expression/date/dateFromString.js
var buildMap = (letters, sign) => {
  const h = {};
  letters.split("").forEach((v, i) => h[v] = sign * (i + 1));
  return h;
};
var TZ_LETTER_OFFSETS = Object.assign(Object.assign(Object.assign({}, buildMap("ABCDEFGHIKLM", 1)), buildMap("NOPQRSTUVWXY", -1)), {
  Z: 0
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/_internal.js
var FIXED_POINTS = {
  undefined: null,
  null: null,
  NaN: NaN,
  Infinity: new Error(),
  "-Infinity": new Error()
};
function createTrignometryOperator(f, fixedPoints = FIXED_POINTS) {
  const fp = Object.assign({}, FIXED_POINTS, fixedPoints);
  const keySet = new Set(Object.keys(fp));
  return (obj, expr, options) => {
    const n = computeValue(obj, expr, null, options);
    if (keySet.has(`${n}`)) {
      const res = fp[`${n}`];
      if (res instanceof Error) {
        throw new MingoError(`cannot apply $${f.name} to -inf, value must in (-inf,inf)`);
      }
      return res;
    }
    return f(n);
  };
}

// node_modules/mingo/dist/esm/operators/expression/trignometry/acos.js
var $acos = createTrignometryOperator(Math.acos, {
  Infinity: Infinity,
  0: new Error()
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/acosh.js
var $acosh = createTrignometryOperator(Math.acosh, {
  Infinity: Infinity,
  0: new Error()
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/asin.js
var $asin = createTrignometryOperator(Math.asin);

// node_modules/mingo/dist/esm/operators/expression/trignometry/asinh.js
var $asinh = createTrignometryOperator(Math.asinh, {
  Infinity: Infinity,
  "-Infinity": -Infinity
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/atan.js
var $atan = createTrignometryOperator(Math.atan);

// node_modules/mingo/dist/esm/operators/expression/trignometry/atanh.js
var $atanh = createTrignometryOperator(Math.atanh, {
  1: Infinity,
  "-1": -Infinity
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/cos.js
var $cos = createTrignometryOperator(Math.cos);

// node_modules/mingo/dist/esm/operators/expression/trignometry/cosh.js
var $cosh = createTrignometryOperator(Math.cosh, {
  "-Infinity": Infinity,
  Infinity: Infinity
  // [Math.PI]: -1,
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/degreesToRadians.js
var RADIANS_FACTOR = Math.PI / 180;
var $degreesToRadians = createTrignometryOperator((n) => n * RADIANS_FACTOR, {
  Infinity: Infinity,
  "-Infinity": Infinity
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/radiansToDegrees.js
var DEGREES_FACTOR = 180 / Math.PI;
var $radiansToDegrees = createTrignometryOperator((n) => n * DEGREES_FACTOR, {
  Infinity: Infinity,
  "-Infinity": -Infinity
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/sin.js
var $sin = createTrignometryOperator(Math.sin);

// node_modules/mingo/dist/esm/operators/expression/trignometry/sinh.js
var $sinh = createTrignometryOperator(Math.sinh, {
  "-Infinity": -Infinity,
  Infinity: Infinity
});

// node_modules/mingo/dist/esm/operators/expression/trignometry/tan.js
var $tan = createTrignometryOperator(Math.tan);

// node_modules/mingo/dist/esm/operators/pipeline/project.js
var $project = (collection, expr, options) => {
  if (isEmpty(expr)) return collection;
  let expressionKeys = Object.keys(expr);
  let idOnlyExcluded = false;
  validateExpression(expr, options);
  const ID_KEY = options.idKey;
  if (inArray(expressionKeys, ID_KEY)) {
    const id = expr[ID_KEY];
    if (id === 0 || id === false) {
      expressionKeys = expressionKeys.filter(notInArray.bind(null, [ID_KEY]));
      idOnlyExcluded = expressionKeys.length == 0;
    }
  } else {
    expressionKeys.push(ID_KEY);
  }
  const copts = ComputeOptions.init(options);
  return collection.map((obj) => processObject(obj, expr, copts.update(obj), expressionKeys, idOnlyExcluded));
};
function processObject(obj, expr, options, expressionKeys, idOnlyExcluded) {
  let newObj = {};
  let foundSlice = false;
  let foundExclusion = false;
  const dropKeys = [];
  if (idOnlyExcluded) {
    dropKeys.push(options.idKey);
  }
  for (const key of expressionKeys) {
    let value = void 0;
    const subExpr = expr[key];
    if (key !== options.idKey && inArray([0, false], subExpr)) {
      foundExclusion = true;
    }
    if (key === options.idKey && isEmpty(subExpr)) {
      value = obj[key];
    } else if (isString(subExpr)) {
      value = computeValue(obj, subExpr, key, options);
    } else if (inArray([1, true], subExpr)) {
    } else if (subExpr instanceof Array) {
      value = subExpr.map((v) => {
        const r = computeValue(obj, v, null, options);
        if (isNil(r)) return null;
        return r;
      });
    } else if (isObject2(subExpr)) {
      const subExprObj = subExpr;
      const subExprKeys = Object.keys(subExpr);
      const operator = subExprKeys.length == 1 ? subExprKeys[0] : "";
      const call = getOperator(OperatorType.PROJECTION, operator, options);
      if (call) {
        if (operator === "$slice") {
          if (ensureArray(subExprObj[operator]).every(isNumber)) {
            value = call(obj, subExprObj[operator], key, options);
            foundSlice = true;
          } else {
            value = computeValue(obj, subExprObj, key, options);
          }
        } else {
          value = call(obj, subExprObj[operator], key, options);
        }
      } else if (isOperator(operator)) {
        value = computeValue(obj, subExprObj[operator], operator, options);
      } else if (has(obj, key)) {
        validateExpression(subExprObj, options);
        let target = obj[key];
        if (target instanceof Array) {
          value = target.map((o) => processObject(o, subExprObj, options, subExprKeys, false));
        } else {
          target = isObject2(target) ? target : obj;
          value = processObject(target, subExprObj, options, subExprKeys, false);
        }
      } else {
        value = computeValue(obj, subExpr, null, options);
      }
    } else {
      dropKeys.push(key);
      continue;
    }
    const objPathGraph = resolveGraph(obj, key, {
      preserveMissing: true
    });
    if (objPathGraph !== void 0) {
      merge2(newObj, objPathGraph, {
        flatten: true
      });
    }
    if (notInArray([0, 1, false, true], subExpr)) {
      if (value === void 0) {
        removeValue(newObj, key, {
          descendArray: true
        });
      } else {
        setValue(newObj, key, value);
      }
    }
  }
  filterMissing(newObj);
  if (foundSlice || foundExclusion || idOnlyExcluded) {
    newObj = into({}, obj, newObj);
    if (dropKeys.length > 0) {
      for (const k of dropKeys) {
        removeValue(newObj, k, {
          descendArray: true
        });
      }
    }
  }
  return newObj;
}
function validateExpression(expr, options) {
  const check = [false, false];
  for (const [k, v] of Object.entries(expr)) {
    if (k === (options === null || options === void 0 ? void 0 : options.idKey)) return;
    if (v === 0 || v === false) {
      check[0] = true;
    } else if (v === 1 || v === true) {
      check[1] = true;
    }
    assert(!(check[0] && check[1]), "Projection cannot have a mix of inclusion and exclusion.");
  }
}

// node_modules/mingo/dist/esm/operators/query/logical/and.js
var $and = (_, rhs, options) => {
  assert(isArray(rhs), "Invalid expression: $and expects value to be an Array.");
  const queries = rhs.map((expr) => new Query(expr, options));
  return (obj) => queries.every((q) => q.test(obj));
};

// node_modules/mingo/dist/esm/operators/query/logical/or.js
var $or = (_, rhs, options) => {
  assert(isArray(rhs), "Invalid expression. $or expects value to be an Array");
  const queries = rhs.map((expr) => new Query(expr, options));
  return (obj) => queries.some((q) => q.test(obj));
};

// node_modules/mingo/dist/esm/operators/query/logical/nor.js
var $nor = (_, rhs, options) => {
  assert(isArray(rhs), "Invalid expression. $nor expects value to be an array.");
  const f = $or("$or", rhs, options);
  return (obj) => !f(obj);
};

// node_modules/mingo/dist/esm/operators/query/logical/not.js
var $not = (selector, rhs, options) => {
  const criteria = {};
  criteria[selector] = normalize(rhs);
  const query = new Query(criteria, options);
  return (obj) => !query.test(obj);
};

// node_modules/mingo/dist/esm/operators/query/comparison/eq.js
var $eq3 = createQueryOperator($eq);

// node_modules/mingo/dist/esm/operators/query/comparison/gt.js
var $gt3 = createQueryOperator($gt);

// node_modules/mingo/dist/esm/operators/query/comparison/gte.js
var $gte3 = createQueryOperator($gte);

// node_modules/mingo/dist/esm/operators/query/comparison/in.js
var $in2 = createQueryOperator($in);

// node_modules/mingo/dist/esm/operators/query/comparison/lt.js
var $lt3 = createQueryOperator($lt);

// node_modules/mingo/dist/esm/operators/query/comparison/lte.js
var $lte3 = createQueryOperator($lte);

// node_modules/mingo/dist/esm/operators/query/comparison/ne.js
var $ne3 = createQueryOperator($ne);

// node_modules/mingo/dist/esm/operators/query/comparison/nin.js
var $nin3 = createQueryOperator($nin);

// node_modules/mingo/dist/esm/operators/query/evaluation/mod.js
var $mod2 = createQueryOperator($mod);

// node_modules/mingo/dist/esm/operators/query/evaluation/regex.js
var $regex2 = createQueryOperator($regex);

// node_modules/mingo/dist/esm/operators/query/array/all.js
var $all2 = createQueryOperator($all);

// node_modules/mingo/dist/esm/operators/query/array/elemMatch.js
var $elemMatch2 = createQueryOperator($elemMatch);

// node_modules/mingo/dist/esm/operators/query/array/size.js
var $size2 = createQueryOperator($size);

// node_modules/mingo/dist/esm/operators/query/element/exists.js
var $exists2 = createQueryOperator($exists);

// node_modules/mingo/dist/esm/operators/query/element/type.js
var $type2 = createQueryOperator($type);

// node_modules/rxdb/dist/esm/rx-query-mingo.js
var mingoInitDone = false;
function getMingoQuery(selector) {
  if (!mingoInitDone) {
    useOperators(OperatorType.PIPELINE, {
      $sort,
      $project
    });
    useOperators(OperatorType.QUERY, {
      $and,
      $eq: $eq3,
      $elemMatch: $elemMatch2,
      $exists: $exists2,
      $gt: $gt3,
      $gte: $gte3,
      $in: $in2,
      $lt: $lt3,
      $lte: $lte3,
      $ne: $ne3,
      $nin: $nin3,
      $mod: $mod2,
      $nor,
      $not,
      $or,
      $regex: $regex2,
      $size: $size2,
      $type: $type2
    });
    mingoInitDone = true;
  }
  return new Query(selector);
}

// node_modules/rxdb/dist/esm/rx-query-helper.js
function normalizeMangoQuery(schema, mangoQuery) {
  var primaryKey = getPrimaryFieldOfPrimaryKey(schema.primaryKey);
  mangoQuery = flatClone(mangoQuery);
  var normalizedMangoQuery = clone(mangoQuery);
  if (typeof normalizedMangoQuery.skip !== "number") {
    normalizedMangoQuery.skip = 0;
  }
  if (!normalizedMangoQuery.selector) {
    normalizedMangoQuery.selector = {};
  } else {
    normalizedMangoQuery.selector = normalizedMangoQuery.selector;
    Object.entries(normalizedMangoQuery.selector).forEach(([field, matcher]) => {
      if (typeof matcher !== "object" || matcher === null) {
        normalizedMangoQuery.selector[field] = {
          $eq: matcher
        };
      }
    });
  }
  if (normalizedMangoQuery.index) {
    var indexAr = toArray(normalizedMangoQuery.index);
    if (!indexAr.includes(primaryKey)) {
      indexAr.push(primaryKey);
    }
    normalizedMangoQuery.index = indexAr;
  }
  if (!normalizedMangoQuery.sort) {
    if (normalizedMangoQuery.index) {
      normalizedMangoQuery.sort = normalizedMangoQuery.index.map((field) => {
        return {
          [field]: "asc"
        };
      });
    } else {
      if (schema.indexes) {
        var fieldsWithLogicalOperator = /* @__PURE__ */ new Set();
        Object.entries(normalizedMangoQuery.selector).forEach(([field, matcher]) => {
          var hasLogical = false;
          if (typeof matcher === "object" && matcher !== null) {
            hasLogical = !!Object.keys(matcher).find((operator) => LOGICAL_OPERATORS.has(operator));
          } else {
            hasLogical = true;
          }
          if (hasLogical) {
            fieldsWithLogicalOperator.add(field);
          }
        });
        var currentFieldsAmount = -1;
        var currentBestIndexForSort;
        schema.indexes.forEach((index) => {
          var useIndex = isMaybeReadonlyArray(index) ? index : [index];
          var firstWrongIndex = useIndex.findIndex((indexField) => !fieldsWithLogicalOperator.has(indexField));
          if (firstWrongIndex > 0 && firstWrongIndex > currentFieldsAmount) {
            currentFieldsAmount = firstWrongIndex;
            currentBestIndexForSort = useIndex;
          }
        });
        if (currentBestIndexForSort) {
          normalizedMangoQuery.sort = currentBestIndexForSort.map((field) => {
            return {
              [field]: "asc"
            };
          });
        }
      }
      if (!normalizedMangoQuery.sort) {
        normalizedMangoQuery.sort = [{
          [primaryKey]: "asc"
        }];
      }
    }
  } else {
    var isPrimaryInSort = normalizedMangoQuery.sort.find((p) => firstPropertyNameOfObject(p) === primaryKey);
    if (!isPrimaryInSort) {
      normalizedMangoQuery.sort = normalizedMangoQuery.sort.slice(0);
      normalizedMangoQuery.sort.push({
        [primaryKey]: "asc"
      });
    }
  }
  return normalizedMangoQuery;
}
function getSortComparator(schema, query) {
  if (!query.sort) {
    throw newRxError("SNH", {
      query
    });
  }
  var sortParts = [];
  query.sort.forEach((sortBlock) => {
    var key = Object.keys(sortBlock)[0];
    var direction = Object.values(sortBlock)[0];
    sortParts.push({
      key,
      direction,
      getValueFn: objectPathMonad(key)
    });
  });
  var fun = (a, b) => {
    for (var i = 0; i < sortParts.length; ++i) {
      var sortPart = sortParts[i];
      var valueA = sortPart.getValueFn(a);
      var valueB = sortPart.getValueFn(b);
      if (valueA !== valueB) {
        var ret = sortPart.direction === "asc" ? compare(valueA, valueB) : compare(valueB, valueA);
        return ret;
      }
    }
  };
  return fun;
}
function getQueryMatcher(_schema, query) {
  if (!query.sort) {
    throw newRxError("SNH", {
      query
    });
  }
  var mingoQuery = getMingoQuery(query.selector);
  var fun = (doc) => {
    return mingoQuery.test(doc);
  };
  return fun;
}
function runQueryUpdateFunction(rxQuery, fn) {
  return __async(this, null, function* () {
    var docs = yield rxQuery.exec();
    if (!docs) {
      return null;
    }
    if (Array.isArray(docs)) {
      return Promise.all(docs.map((doc) => fn(doc)));
    } else {
      var result = yield fn(docs);
      return result;
    }
  });
}

// node_modules/rxdb/dist/esm/query-cache.js
var QueryCache = function() {
  function QueryCache2() {
    this._map = /* @__PURE__ */ new Map();
  }
  var _proto = QueryCache2.prototype;
  _proto.getByQuery = function getByQuery(rxQuery) {
    var stringRep = rxQuery.toString();
    return getFromMapOrCreate(this._map, stringRep, () => rxQuery);
  };
  return QueryCache2;
}();
function createQueryCache() {
  return new QueryCache();
}
function uncacheRxQuery(queryCache, rxQuery) {
  rxQuery.uncached = true;
  var stringRep = rxQuery.toString();
  queryCache._map.delete(stringRep);
}
function countRxQuerySubscribers(rxQuery) {
  return rxQuery.refCount$.observers.length;
}
var DEFAULT_TRY_TO_KEEP_MAX = 100;
var DEFAULT_UNEXECUTED_LIFETIME = 30 * 1e3;
var defaultCacheReplacementPolicyMonad = (tryToKeepMax, unExecutedLifetime) => (_collection, queryCache) => {
  if (queryCache._map.size < tryToKeepMax) {
    return;
  }
  var minUnExecutedLifetime = now() - unExecutedLifetime;
  var maybeUncache = [];
  var queriesInCache = Array.from(queryCache._map.values());
  for (var rxQuery of queriesInCache) {
    if (countRxQuerySubscribers(rxQuery) > 0) {
      continue;
    }
    if (rxQuery._lastEnsureEqual === 0 && rxQuery._creationTime < minUnExecutedLifetime) {
      uncacheRxQuery(queryCache, rxQuery);
      continue;
    }
    maybeUncache.push(rxQuery);
  }
  var mustUncache = maybeUncache.length - tryToKeepMax;
  if (mustUncache <= 0) {
    return;
  }
  var sortedByLastUsage = maybeUncache.sort((a, b) => a._lastEnsureEqual - b._lastEnsureEqual);
  var toRemove = sortedByLastUsage.slice(0, mustUncache);
  toRemove.forEach((rxQuery2) => uncacheRxQuery(queryCache, rxQuery2));
};
var defaultCacheReplacementPolicy = defaultCacheReplacementPolicyMonad(DEFAULT_TRY_TO_KEEP_MAX, DEFAULT_UNEXECUTED_LIFETIME);
var COLLECTIONS_WITH_RUNNING_CLEANUP = /* @__PURE__ */ new WeakSet();
function triggerCacheReplacement(rxCollection) {
  if (COLLECTIONS_WITH_RUNNING_CLEANUP.has(rxCollection)) {
    return;
  }
  COLLECTIONS_WITH_RUNNING_CLEANUP.add(rxCollection);
  nextTick().then(() => requestIdlePromise(200)).then(() => {
    if (!rxCollection.destroyed) {
      rxCollection.cacheReplacementPolicy(rxCollection, rxCollection._queryCache);
    }
    COLLECTIONS_WITH_RUNNING_CLEANUP.delete(rxCollection);
  });
}

// node_modules/rxdb/dist/esm/doc-cache.js
var DocumentCache = function() {
  function DocumentCache2(primaryPath, changes$, documentCreator) {
    this.cacheItemByDocId = /* @__PURE__ */ new Map();
    this.registry = typeof FinalizationRegistry === "function" ? new FinalizationRegistry((docMeta) => {
      var docId = docMeta.docId;
      var cacheItem = this.cacheItemByDocId.get(docId);
      if (cacheItem) {
        cacheItem[0].delete(docMeta.revisionHeight);
        if (cacheItem[0].size === 0) {
          this.cacheItemByDocId.delete(docId);
        }
      }
    }) : void 0;
    this.primaryPath = primaryPath;
    this.changes$ = changes$;
    this.documentCreator = documentCreator;
    changes$.subscribe((changeEvent) => {
      var docId = changeEvent.documentId;
      var cacheItem = this.cacheItemByDocId.get(docId);
      if (cacheItem) {
        var documentData = getDocumentDataOfRxChangeEvent(changeEvent);
        cacheItem[1] = documentData;
      }
    });
  }
  var _proto = DocumentCache2.prototype;
  _proto.getLatestDocumentData = function getLatestDocumentData(docId) {
    var cacheItem = getFromMapOrThrow(this.cacheItemByDocId, docId);
    return cacheItem[1];
  };
  _proto.getLatestDocumentDataIfExists = function getLatestDocumentDataIfExists(docId) {
    var cacheItem = this.cacheItemByDocId.get(docId);
    if (cacheItem) {
      return cacheItem[1];
    }
  };
  return _createClass(DocumentCache2, [{
    key: "getCachedRxDocuments",
    get: function() {
      var fn = getCachedRxDocumentMonad(this);
      return overwriteGetterForCaching(this, "getCachedRxDocuments", fn);
    }
  }, {
    key: "getCachedRxDocument",
    get: function() {
      var fn = getCachedRxDocumentMonad(this);
      return overwriteGetterForCaching(this, "getCachedRxDocument", (doc) => fn([doc])[0]);
    }
  }]);
}();
function getCachedRxDocumentMonad(docCache) {
  var primaryPath = docCache.primaryPath;
  var cacheItemByDocId = docCache.cacheItemByDocId;
  var registry = docCache.registry;
  var deepFreezeWhenDevMode = overwritable.deepFreezeWhenDevMode;
  var documentCreator = docCache.documentCreator;
  var fn = (docsData) => {
    var ret = new Array(docsData.length);
    var registryTasks = [];
    for (var index = 0; index < docsData.length; index++) {
      var docData = docsData[index];
      var docId = docData[primaryPath];
      var revisionHeight = getHeightOfRevision(docData._rev);
      var byRev = void 0;
      var cachedRxDocumentWeakRef = void 0;
      var cacheItem = cacheItemByDocId.get(docId);
      if (!cacheItem) {
        byRev = /* @__PURE__ */ new Map();
        cacheItem = [byRev, docData];
        cacheItemByDocId.set(docId, cacheItem);
      } else {
        byRev = cacheItem[0];
        cachedRxDocumentWeakRef = byRev.get(revisionHeight);
      }
      var cachedRxDocument = cachedRxDocumentWeakRef ? cachedRxDocumentWeakRef.deref() : void 0;
      if (!cachedRxDocument) {
        docData = deepFreezeWhenDevMode(docData);
        cachedRxDocument = documentCreator(docData);
        byRev.set(revisionHeight, createWeakRefWithFallback(cachedRxDocument));
        if (registry) {
          registryTasks.push(cachedRxDocument);
        }
      }
      ret[index] = cachedRxDocument;
    }
    if (registryTasks.length > 0 && registry) {
      requestIdlePromiseNoQueue().then(() => {
        for (var _index = 0; _index < registryTasks.length; _index++) {
          var doc = registryTasks[_index];
          registry.register(doc, {
            docId: doc.primary,
            revisionHeight: getHeightOfRevision(doc.revision)
          });
        }
      });
    }
    return ret;
  };
  return fn;
}
function mapDocumentsDataToCacheDocs(docCache, docsData) {
  var getCachedRxDocuments = docCache.getCachedRxDocuments;
  return getCachedRxDocuments(docsData);
}
var HAS_WEAK_REF = typeof WeakRef === "function";
var createWeakRefWithFallback = HAS_WEAK_REF ? createWeakRef : createWeakRefFallback;
function createWeakRef(obj) {
  return new WeakRef(obj);
}
function createWeakRefFallback(obj) {
  return {
    deref() {
      return obj;
    }
  };
}

// node_modules/rxdb/dist/esm/rx-query-single-result.js
var RxQuerySingleResult = function() {
  function RxQuerySingleResult2(collection, docsDataFromStorageInstance, count) {
    this.time = now();
    this.collection = collection;
    this.count = count;
    this.documents = mapDocumentsDataToCacheDocs(this.collection._docCache, docsDataFromStorageInstance);
  }
  return _createClass(RxQuerySingleResult2, [{
    key: "docsData",
    get: function() {
      return overwriteGetterForCaching(this, "docsData", this.documents.map((d) => d._data));
    }
    // A key->document map, used in the event reduce optimization.
  }, {
    key: "docsDataMap",
    get: function() {
      var map2 = /* @__PURE__ */ new Map();
      this.documents.forEach((d) => {
        map2.set(d.primary, d._data);
      });
      return overwriteGetterForCaching(this, "docsDataMap", map2);
    }
  }, {
    key: "docsMap",
    get: function() {
      var map2 = /* @__PURE__ */ new Map();
      var documents = this.documents;
      for (var i = 0; i < documents.length; i++) {
        var doc = documents[i];
        map2.set(doc.primary, doc);
      }
      return overwriteGetterForCaching(this, "docsMap", map2);
    }
  }]);
}();

// node_modules/event-reduce-js/dist/esm/src/util.js
function lastOfArray2(ar) {
  return ar[ar.length - 1];
}
function isObject3(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}
function getProperty2(object, path, value) {
  if (Array.isArray(path)) {
    path = path.join(".");
  }
  if (!isObject3(object) || typeof path !== "string") {
    return value === void 0 ? object : value;
  }
  const pathArray = path.split(".");
  if (pathArray.length === 0) {
    return value;
  }
  for (let index = 0; index < pathArray.length; index++) {
    const key = pathArray[index];
    if (isStringIndex2(object, key)) {
      object = index === pathArray.length - 1 ? void 0 : null;
    } else {
      object = object[key];
    }
    if (object === void 0 || object === null) {
      if (index !== pathArray.length - 1) {
        return value;
      }
      break;
    }
  }
  return object === void 0 ? value : object;
}
function isStringIndex2(object, key) {
  if (typeof key !== "number" && Array.isArray(object)) {
    const index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }
  return false;
}

// node_modules/event-reduce-js/dist/esm/src/states/state-resolver.js
var hasLimit = (input) => {
  return !!input.queryParams.limit;
};
var isFindOne = (input) => {
  return input.queryParams.limit === 1;
};
var hasSkip = (input) => {
  if (input.queryParams.skip && input.queryParams.skip > 0) {
    return true;
  } else {
    return false;
  }
};
var isDelete = (input) => {
  return input.changeEvent.operation === "DELETE";
};
var isInsert = (input) => {
  return input.changeEvent.operation === "INSERT";
};
var isUpdate = (input) => {
  return input.changeEvent.operation === "UPDATE";
};
var wasLimitReached = (input) => {
  return hasLimit(input) && input.previousResults.length >= input.queryParams.limit;
};
var sortParamsChanged = (input) => {
  const sortFields = input.queryParams.sortFields;
  const prev = input.changeEvent.previous;
  const doc = input.changeEvent.doc;
  if (!doc) {
    return false;
  }
  if (!prev) {
    return true;
  }
  for (let i = 0; i < sortFields.length; i++) {
    const field = sortFields[i];
    const beforeData = getProperty2(prev, field);
    const afterData = getProperty2(doc, field);
    if (beforeData !== afterData) {
      return true;
    }
  }
  return false;
};
var wasInResult = (input) => {
  const id = input.changeEvent.id;
  if (input.keyDocumentMap) {
    const has2 = input.keyDocumentMap.has(id);
    return has2;
  } else {
    const primary = input.queryParams.primaryKey;
    const results = input.previousResults;
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      if (item[primary] === id) {
        return true;
      }
    }
    return false;
  }
};
var wasFirst = (input) => {
  const first = input.previousResults[0];
  if (first && first[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  } else {
    return false;
  }
};
var wasLast = (input) => {
  const last = lastOfArray2(input.previousResults);
  if (last && last[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  } else {
    return false;
  }
};
var wasSortedBeforeFirst = (input) => {
  const prev = input.changeEvent.previous;
  if (!prev) {
    return false;
  }
  const first = input.previousResults[0];
  if (!first) {
    return false;
  }
  if (first[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  }
  const comp = input.queryParams.sortComparator(prev, first);
  return comp < 0;
};
var wasSortedAfterLast = (input) => {
  const prev = input.changeEvent.previous;
  if (!prev) {
    return false;
  }
  const last = lastOfArray2(input.previousResults);
  if (!last) {
    return false;
  }
  if (last[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  }
  const comp = input.queryParams.sortComparator(prev, last);
  return comp > 0;
};
var isSortedBeforeFirst = (input) => {
  const doc = input.changeEvent.doc;
  if (!doc) {
    return false;
  }
  const first = input.previousResults[0];
  if (!first) {
    return false;
  }
  if (first[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  }
  const comp = input.queryParams.sortComparator(doc, first);
  return comp < 0;
};
var isSortedAfterLast = (input) => {
  const doc = input.changeEvent.doc;
  if (!doc) {
    return false;
  }
  const last = lastOfArray2(input.previousResults);
  if (!last) {
    return false;
  }
  if (last[input.queryParams.primaryKey] === input.changeEvent.id) {
    return true;
  }
  const comp = input.queryParams.sortComparator(doc, last);
  return comp > 0;
};
var wasMatching = (input) => {
  const prev = input.changeEvent.previous;
  if (!prev) {
    return false;
  }
  return input.queryParams.queryMatcher(prev);
};
var doesMatchNow = (input) => {
  const doc = input.changeEvent.doc;
  if (!doc) {
    return false;
  }
  const ret = input.queryParams.queryMatcher(doc);
  return ret;
};
var wasResultsEmpty = (input) => {
  return input.previousResults.length === 0;
};

// node_modules/event-reduce-js/dist/esm/src/states/index.js
var stateResolveFunctionByIndex = {
  0: isInsert,
  1: isUpdate,
  2: isDelete,
  3: hasLimit,
  4: isFindOne,
  5: hasSkip,
  6: wasResultsEmpty,
  7: wasLimitReached,
  8: wasFirst,
  9: wasLast,
  10: sortParamsChanged,
  11: wasInResult,
  12: wasSortedBeforeFirst,
  13: wasSortedAfterLast,
  14: isSortedBeforeFirst,
  15: isSortedAfterLast,
  16: wasMatching,
  17: doesMatchNow
};

// node_modules/array-push-at-sort-position/dist/esm/index.js
function pushAtSortPosition(array, item, compareFunction, low) {
  var length = array.length;
  var high = length - 1;
  var mid = 0;
  if (length === 0) {
    array.push(item);
    return 0;
  }
  var lastMidDoc;
  while (low <= high) {
    mid = low + (high - low >> 1);
    lastMidDoc = array[mid];
    if (compareFunction(lastMidDoc, item) <= 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  if (compareFunction(lastMidDoc, item) <= 0) {
    mid++;
  }
  array.splice(mid, 0, item);
  return mid;
}

// node_modules/event-reduce-js/dist/esm/src/actions/action-functions.js
var doNothing = (_input) => {
};
var insertFirst = (input) => {
  input.previousResults.unshift(input.changeEvent.doc);
  if (input.keyDocumentMap) {
    input.keyDocumentMap.set(input.changeEvent.id, input.changeEvent.doc);
  }
};
var insertLast = (input) => {
  input.previousResults.push(input.changeEvent.doc);
  if (input.keyDocumentMap) {
    input.keyDocumentMap.set(input.changeEvent.id, input.changeEvent.doc);
  }
};
var removeFirstItem = (input) => {
  const first = input.previousResults.shift();
  if (input.keyDocumentMap && first) {
    input.keyDocumentMap.delete(first[input.queryParams.primaryKey]);
  }
};
var removeLastItem = (input) => {
  const last = input.previousResults.pop();
  if (input.keyDocumentMap && last) {
    input.keyDocumentMap.delete(last[input.queryParams.primaryKey]);
  }
};
var removeFirstInsertLast = (input) => {
  removeFirstItem(input);
  insertLast(input);
};
var removeLastInsertFirst = (input) => {
  removeLastItem(input);
  insertFirst(input);
};
var removeFirstInsertFirst = (input) => {
  removeFirstItem(input);
  insertFirst(input);
};
var removeLastInsertLast = (input) => {
  removeLastItem(input);
  insertLast(input);
};
var removeExisting = (input) => {
  if (input.keyDocumentMap) {
    input.keyDocumentMap.delete(input.changeEvent.id);
  }
  const primary = input.queryParams.primaryKey;
  const results = input.previousResults;
  for (let i = 0; i < results.length; i++) {
    const item = results[i];
    if (item[primary] === input.changeEvent.id) {
      results.splice(i, 1);
      break;
    }
  }
};
var replaceExisting = (input) => {
  const doc = input.changeEvent.doc;
  const primary = input.queryParams.primaryKey;
  const results = input.previousResults;
  for (let i = 0; i < results.length; i++) {
    const item = results[i];
    if (item[primary] === input.changeEvent.id) {
      results[i] = doc;
      if (input.keyDocumentMap) {
        input.keyDocumentMap.set(input.changeEvent.id, doc);
      }
      break;
    }
  }
};
var alwaysWrong = (input) => {
  const wrongHuman = {
    _id: "wrongHuman" + (/* @__PURE__ */ new Date()).getTime()
  };
  input.previousResults.length = 0;
  input.previousResults.push(wrongHuman);
  if (input.keyDocumentMap) {
    input.keyDocumentMap.clear();
    input.keyDocumentMap.set(wrongHuman._id, wrongHuman);
  }
};
var insertAtSortPosition = (input) => {
  const docId = input.changeEvent.id;
  const doc = input.changeEvent.doc;
  if (input.keyDocumentMap) {
    if (input.keyDocumentMap.has(docId)) {
      return;
    }
    input.keyDocumentMap.set(docId, doc);
  } else {
    const isDocInResults = input.previousResults.find((d) => d[input.queryParams.primaryKey] === docId);
    if (isDocInResults) {
      return;
    }
  }
  pushAtSortPosition(input.previousResults, doc, input.queryParams.sortComparator, 0);
};
var removeExistingAndInsertAtSortPosition = (input) => {
  removeExisting(input);
  insertAtSortPosition(input);
};
var runFullQueryAgain = (_input) => {
  throw new Error("Action runFullQueryAgain must be implemented by yourself");
};
var unknownAction = (_input) => {
  throw new Error("Action unknownAction should never be called");
};

// node_modules/event-reduce-js/dist/esm/src/actions/index.js
var orderedActionList = ["doNothing", "insertFirst", "insertLast", "removeFirstItem", "removeLastItem", "removeFirstInsertLast", "removeLastInsertFirst", "removeFirstInsertFirst", "removeLastInsertLast", "removeExisting", "replaceExisting", "alwaysWrong", "insertAtSortPosition", "removeExistingAndInsertAtSortPosition", "runFullQueryAgain", "unknownAction"];
var actionFunctions = {
  doNothing,
  insertFirst,
  insertLast,
  removeFirstItem,
  removeLastItem,
  removeFirstInsertLast,
  removeLastInsertFirst,
  removeFirstInsertFirst,
  removeLastInsertLast,
  removeExisting,
  replaceExisting,
  alwaysWrong,
  insertAtSortPosition,
  removeExistingAndInsertAtSortPosition,
  runFullQueryAgain,
  unknownAction
};

// node_modules/binary-decision-diagram/dist/esm/src/minimal-string/string-format.js
var CHAR_CODE_OFFSET = 40;
function getNumberOfChar(char) {
  const charCode = char.charCodeAt(0);
  return charCode - CHAR_CODE_OFFSET;
}

// node_modules/binary-decision-diagram/dist/esm/src/util.js
function booleanToBooleanString(b) {
  if (b) {
    return "1";
  } else {
    return "0";
  }
}
function makeid(length = 6) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var nodeIdPrefix = makeid(4);
function splitStringToChunks(str, chunkSize) {
  const chunks = [];
  for (let i = 0, charsLength = str.length; i < charsLength; i += chunkSize) {
    chunks.push(str.substring(i, i + chunkSize));
  }
  return chunks;
}

// node_modules/binary-decision-diagram/dist/esm/src/minimal-string/minimal-string-to-simple-bdd.js
function minimalStringToSimpleBdd(str) {
  const nodesById = /* @__PURE__ */ new Map();
  const leafNodeAmount = parseInt(str.charAt(0) + str.charAt(1), 10);
  const lastLeafNodeChar = 2 + leafNodeAmount * 2;
  const leafNodeChars = str.substring(2, lastLeafNodeChar);
  const leafNodeChunks = splitStringToChunks(leafNodeChars, 2);
  for (let i = 0; i < leafNodeChunks.length; i++) {
    const chunk = leafNodeChunks[i];
    const id = chunk.charAt(0);
    const value = getNumberOfChar(chunk.charAt(1));
    nodesById.set(id, value);
  }
  const internalNodeChars = str.substring(lastLeafNodeChar, str.length - 3);
  const internalNodeChunks = splitStringToChunks(internalNodeChars, 4);
  for (let i = 0; i < internalNodeChunks.length; i++) {
    const chunk = internalNodeChunks[i];
    const id = chunk.charAt(0);
    const idOf0Branch = chunk.charAt(1);
    const idOf1Branch = chunk.charAt(2);
    const level = getNumberOfChar(chunk.charAt(3));
    if (!nodesById.has(idOf0Branch)) {
      throw new Error("missing node with id " + idOf0Branch);
    }
    if (!nodesById.has(idOf1Branch)) {
      throw new Error("missing node with id " + idOf1Branch);
    }
    const node0 = nodesById.get(idOf0Branch);
    const node1 = nodesById.get(idOf1Branch);
    const node = {
      l: level,
      // level is first for prettier json output
      0: node0,
      1: node1
    };
    nodesById.set(id, node);
  }
  const last3 = str.slice(-3);
  const idOf0 = last3.charAt(0);
  const idOf1 = last3.charAt(1);
  const levelOfRoot = getNumberOfChar(last3.charAt(2));
  const nodeOf0 = nodesById.get(idOf0);
  const nodeOf1 = nodesById.get(idOf1);
  const rootNode = {
    l: levelOfRoot,
    0: nodeOf0,
    1: nodeOf1
  };
  return rootNode;
}

// node_modules/binary-decision-diagram/dist/esm/src/minimal-string/resolve-with-simple-bdd.js
function resolveWithSimpleBdd(simpleBdd2, fns, input) {
  let currentNode = simpleBdd2;
  let currentLevel = simpleBdd2.l;
  while (true) {
    const booleanResult = fns[currentLevel](input);
    const branchKey = booleanToBooleanString(booleanResult);
    currentNode = currentNode[branchKey];
    if (typeof currentNode === "number" || typeof currentNode === "string") {
      return currentNode;
    } else {
      currentLevel = currentNode.l;
    }
  }
}

// node_modules/event-reduce-js/dist/esm/src/bdd/bdd.generated.js
var minimalBddString = "14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";
var simpleBdd;
function getSimpleBdd() {
  if (!simpleBdd) {
    simpleBdd = minimalStringToSimpleBdd(minimalBddString);
  }
  return simpleBdd;
}
var resolveInput = (input) => {
  return resolveWithSimpleBdd(getSimpleBdd(), stateResolveFunctionByIndex, input);
};

// node_modules/event-reduce-js/dist/esm/src/index.js
function calculateActionName(input) {
  const resolvedActionId = resolveInput(input);
  return orderedActionList[resolvedActionId];
}
function runAction(action, queryParams, changeEvent, previousResults, keyDocumentMap) {
  const fn = actionFunctions[action];
  fn({
    queryParams,
    changeEvent,
    previousResults,
    keyDocumentMap
  });
  return previousResults;
}

// node_modules/rxdb/dist/esm/event-reduce.js
function getSortFieldsOfQuery(primaryKey, query) {
  if (!query.sort || query.sort.length === 0) {
    return [primaryKey];
  } else {
    return query.sort.map((part) => Object.keys(part)[0]);
  }
}
var RXQUERY_QUERY_PARAMS_CACHE = /* @__PURE__ */ new WeakMap();
function getQueryParams(rxQuery) {
  return getFromMapOrCreate(RXQUERY_QUERY_PARAMS_CACHE, rxQuery, () => {
    var collection = rxQuery.collection;
    var normalizedMangoQuery = normalizeMangoQuery(collection.storageInstance.schema, clone(rxQuery.mangoQuery));
    var primaryKey = collection.schema.primaryPath;
    var sortComparator = getSortComparator(collection.schema.jsonSchema, normalizedMangoQuery);
    var useSortComparator = (docA, docB) => {
      var sortComparatorData = {
        docA,
        docB,
        rxQuery
      };
      return sortComparator(sortComparatorData.docA, sortComparatorData.docB);
    };
    var queryMatcher = getQueryMatcher(collection.schema.jsonSchema, normalizedMangoQuery);
    var useQueryMatcher = (doc) => {
      var queryMatcherData = {
        doc,
        rxQuery
      };
      return queryMatcher(queryMatcherData.doc);
    };
    var ret = {
      primaryKey: rxQuery.collection.schema.primaryPath,
      skip: normalizedMangoQuery.skip,
      limit: normalizedMangoQuery.limit,
      sortFields: getSortFieldsOfQuery(primaryKey, normalizedMangoQuery),
      sortComparator: useSortComparator,
      queryMatcher: useQueryMatcher
    };
    return ret;
  });
}
function calculateNewResults(rxQuery, rxChangeEvents) {
  if (!rxQuery.collection.database.eventReduce) {
    return {
      runFullQueryAgain: true
    };
  }
  var queryParams = getQueryParams(rxQuery);
  var previousResults = ensureNotFalsy(rxQuery._result).docsData.slice(0);
  var previousResultsMap = ensureNotFalsy(rxQuery._result).docsDataMap;
  var changed = false;
  var eventReduceEvents = rxChangeEvents.map((cE) => rxChangeEventToEventReduceChangeEvent(cE)).filter(arrayFilterNotEmpty);
  var foundNonOptimizeable = eventReduceEvents.find((eventReduceEvent) => {
    var stateResolveFunctionInput = {
      queryParams,
      changeEvent: eventReduceEvent,
      previousResults,
      keyDocumentMap: previousResultsMap
    };
    var actionName = calculateActionName(stateResolveFunctionInput);
    if (actionName === "runFullQueryAgain") {
      return true;
    } else if (actionName !== "doNothing") {
      changed = true;
      runAction(actionName, queryParams, eventReduceEvent, previousResults, previousResultsMap);
      return false;
    }
  });
  if (foundNonOptimizeable) {
    return {
      runFullQueryAgain: true
    };
  } else {
    return {
      runFullQueryAgain: false,
      changed,
      newResults: previousResults
    };
  }
}

// node_modules/rxdb/dist/esm/rx-query.js
var _queryCount = 0;
var newQueryID = function() {
  return ++_queryCount;
};
var RxQueryBase = function() {
  function RxQueryBase2(op, mangoQuery, collection, other = {}) {
    this.id = newQueryID();
    this._execOverDatabaseCount = 0;
    this._creationTime = now();
    this._lastEnsureEqual = 0;
    this.uncached = false;
    this.refCount$ = new BehaviorSubject(null);
    this._result = null;
    this._latestChangeEvent = -1;
    this._lastExecStart = 0;
    this._lastExecEnd = 0;
    this._ensureEqualQueue = PROMISE_RESOLVE_FALSE;
    this.op = op;
    this.mangoQuery = mangoQuery;
    this.collection = collection;
    this.other = other;
    if (!mangoQuery) {
      this.mangoQuery = _getDefaultQuery();
    }
    this.isFindOneByIdQuery = isFindOneByIdQuery(this.collection.schema.primaryPath, mangoQuery);
  }
  var _proto = RxQueryBase2.prototype;
  _proto._setResultData = function _setResultData(newResultData) {
    if (typeof newResultData === "number") {
      this._result = new RxQuerySingleResult(this.collection, [], newResultData);
      return;
    } else if (newResultData instanceof Map) {
      newResultData = Array.from(newResultData.values());
    }
    var newQueryResult = new RxQuerySingleResult(this.collection, newResultData, newResultData.length);
    this._result = newQueryResult;
  };
  _proto._execOverDatabase = function _execOverDatabase() {
    return __async(this, null, function* () {
      this._execOverDatabaseCount = this._execOverDatabaseCount + 1;
      this._lastExecStart = now();
      if (this.op === "count") {
        var preparedQuery = this.getPreparedQuery();
        var result = yield this.collection.storageInstance.count(preparedQuery);
        if (result.mode === "slow" && !this.collection.database.allowSlowCount) {
          throw newRxError("QU14", {
            collection: this.collection,
            queryObj: this.mangoQuery
          });
        } else {
          return result.count;
        }
      }
      if (this.op === "findByIds") {
        var ids = ensureNotFalsy(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in;
        var ret = /* @__PURE__ */ new Map();
        var mustBeQueried = [];
        ids.forEach((id) => {
          var docData = this.collection._docCache.getLatestDocumentDataIfExists(id);
          if (docData) {
            if (!docData._deleted) {
              var doc = this.collection._docCache.getCachedRxDocument(docData);
              ret.set(id, doc);
            }
          } else {
            mustBeQueried.push(id);
          }
        });
        if (mustBeQueried.length > 0) {
          var docs = yield this.collection.storageInstance.findDocumentsById(mustBeQueried, false);
          docs.forEach((docData) => {
            var doc = this.collection._docCache.getCachedRxDocument(docData);
            ret.set(doc.primary, doc);
          });
        }
        return ret;
      }
      var docsPromise = queryCollection(this);
      return docsPromise.then((docs2) => {
        this._lastExecEnd = now();
        return docs2;
      });
    });
  };
  _proto.exec = function exec(throwIfMissing) {
    if (throwIfMissing && this.op !== "findOne") {
      throw newRxError("QU9", {
        collection: this.collection.name,
        query: this.mangoQuery,
        op: this.op
      });
    }
    return _ensureEqual(this).then(() => firstValueFrom(this.$)).then((result) => {
      if (!result && throwIfMissing) {
        throw newRxError("QU10", {
          collection: this.collection.name,
          query: this.mangoQuery,
          op: this.op
        });
      } else {
        return result;
      }
    });
  };
  _proto.toString = function toString2() {
    var stringObj = sortObject({
      op: this.op,
      query: this.mangoQuery,
      other: this.other
    }, true);
    var value = JSON.stringify(stringObj);
    this.toString = () => value;
    return value;
  };
  _proto.getPreparedQuery = function getPreparedQuery() {
    var hookInput = {
      rxQuery: this,
      // can be mutated by the hooks so we have to deep clone first.
      mangoQuery: normalizeMangoQuery(this.collection.schema.jsonSchema, this.mangoQuery)
    };
    hookInput.mangoQuery.selector._deleted = {
      $eq: false
    };
    if (hookInput.mangoQuery.index) {
      hookInput.mangoQuery.index.unshift("_deleted");
    }
    runPluginHooks("prePrepareQuery", hookInput);
    var value = prepareQuery(this.collection.schema.jsonSchema, hookInput.mangoQuery);
    this.getPreparedQuery = () => value;
    return value;
  };
  _proto.doesDocumentDataMatch = function doesDocumentDataMatch(docData) {
    if (docData._deleted) {
      return false;
    }
    return this.queryMatcher(docData);
  };
  _proto.remove = function remove() {
    return this.exec().then((docs) => {
      if (Array.isArray(docs)) {
        return Promise.all(docs.map((doc) => doc.remove()));
      } else {
        return docs.remove();
      }
    });
  };
  _proto.incrementalRemove = function incrementalRemove() {
    return runQueryUpdateFunction(this.asRxQuery, (doc) => doc.incrementalRemove());
  };
  _proto.update = function update(_updateObj) {
    throw pluginMissing("update");
  };
  _proto.patch = function patch(_patch) {
    return runQueryUpdateFunction(this.asRxQuery, (doc) => doc.patch(_patch));
  };
  _proto.incrementalPatch = function incrementalPatch(patch) {
    return runQueryUpdateFunction(this.asRxQuery, (doc) => doc.incrementalPatch(patch));
  };
  _proto.modify = function modify(mutationFunction) {
    return runQueryUpdateFunction(this.asRxQuery, (doc) => doc.modify(mutationFunction));
  };
  _proto.incrementalModify = function incrementalModify(mutationFunction) {
    return runQueryUpdateFunction(this.asRxQuery, (doc) => doc.incrementalModify(mutationFunction));
  };
  _proto.where = function where(_queryObj) {
    throw pluginMissing("query-builder");
  };
  _proto.sort = function sort(_params) {
    throw pluginMissing("query-builder");
  };
  _proto.skip = function skip(_amount) {
    throw pluginMissing("query-builder");
  };
  _proto.limit = function limit(_amount) {
    throw pluginMissing("query-builder");
  };
  return _createClass(RxQueryBase2, [{
    key: "$",
    get: function() {
      if (!this._$) {
        var results$ = this.collection.$.pipe(
          /**
           * Performance shortcut.
           * Changes to local documents are not relevant for the query.
           */
          filter((changeEvent) => !changeEvent.isLocal),
          /**
           * Start once to ensure the querying also starts
           * when there where no changes.
           */
          startWith(null),
          // ensure query results are up to date.
          mergeMap(() => _ensureEqual(this)),
          // use the current result set, written by _ensureEqual().
          map(() => this._result),
          // do not run stuff above for each new subscriber, only once.
          shareReplay(RXJS_SHARE_REPLAY_DEFAULTS),
          // do not proceed if result set has not changed.
          distinctUntilChanged((prev, curr) => {
            if (prev && prev.time === ensureNotFalsy(curr).time) {
              return true;
            } else {
              return false;
            }
          }),
          filter((result) => !!result),
          /**
           * Map the result set to a single RxDocument or an array,
           * depending on query type
           */
          map((result) => {
            var useResult = ensureNotFalsy(result);
            if (this.op === "count") {
              return useResult.count;
            } else if (this.op === "findOne") {
              return useResult.documents.length === 0 ? null : useResult.documents[0];
            } else if (this.op === "findByIds") {
              return useResult.docsMap;
            } else {
              return useResult.documents.slice(0);
            }
          })
        );
        this._$ = merge(
          results$,
          /**
           * Also add the refCount$ to the query observable
           * to allow us to count the amount of subscribers.
           */
          this.refCount$.pipe(filter(() => false))
        );
      }
      return this._$;
    }
  }, {
    key: "$$",
    get: function() {
      var reactivity = this.collection.database.getReactivityFactory();
      return reactivity.fromObservable(this.$, void 0, this.collection.database);
    }
    // stores the changeEvent-number of the last handled change-event
    // time stamps on when the last full exec over the database has run
    // used to properly handle events that happen while the find-query is running
    /**
     * ensures that the exec-runs
     * are not run in parallel
     */
  }, {
    key: "queryMatcher",
    get: function() {
      var schema = this.collection.schema.jsonSchema;
      var normalizedQuery = normalizeMangoQuery(this.collection.schema.jsonSchema, this.mangoQuery);
      return overwriteGetterForCaching(this, "queryMatcher", getQueryMatcher(schema, normalizedQuery));
    }
  }, {
    key: "asRxQuery",
    get: function() {
      return this;
    }
  }]);
}();
function _getDefaultQuery() {
  return {
    selector: {}
  };
}
function tunnelQueryCache(rxQuery) {
  return rxQuery.collection._queryCache.getByQuery(rxQuery);
}
function createRxQuery(op, queryObj, collection, other) {
  runPluginHooks("preCreateRxQuery", {
    op,
    queryObj,
    collection,
    other
  });
  var ret = new RxQueryBase(op, queryObj, collection, other);
  ret = tunnelQueryCache(ret);
  triggerCacheReplacement(collection);
  return ret;
}
function _isResultsInSync(rxQuery) {
  var currentLatestEventNumber = rxQuery.asRxQuery.collection._changeEventBuffer.counter;
  if (rxQuery._latestChangeEvent >= currentLatestEventNumber) {
    return true;
  } else {
    return false;
  }
}
function _ensureEqual(rxQuery) {
  if (rxQuery.collection.database.destroyed || _isResultsInSync(rxQuery)) {
    return PROMISE_RESOLVE_FALSE;
  }
  rxQuery._ensureEqualQueue = rxQuery._ensureEqualQueue.then(() => __ensureEqual(rxQuery));
  return rxQuery._ensureEqualQueue;
}
function __ensureEqual(rxQuery) {
  rxQuery._lastEnsureEqual = now();
  if (
    // db is closed
    rxQuery.collection.database.destroyed || // nothing happened since last run
    _isResultsInSync(rxQuery)
  ) {
    return PROMISE_RESOLVE_FALSE;
  }
  var ret = false;
  var mustReExec = false;
  if (rxQuery._latestChangeEvent === -1) {
    mustReExec = true;
  }
  if (!mustReExec) {
    var missedChangeEvents = rxQuery.asRxQuery.collection._changeEventBuffer.getFrom(rxQuery._latestChangeEvent + 1);
    if (missedChangeEvents === null) {
      mustReExec = true;
    } else {
      rxQuery._latestChangeEvent = rxQuery.asRxQuery.collection._changeEventBuffer.counter;
      var runChangeEvents = rxQuery.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(missedChangeEvents);
      if (rxQuery.op === "count") {
        var previousCount = ensureNotFalsy(rxQuery._result).count;
        var newCount = previousCount;
        runChangeEvents.forEach((cE) => {
          var didMatchBefore = cE.previousDocumentData && rxQuery.doesDocumentDataMatch(cE.previousDocumentData);
          var doesMatchNow2 = rxQuery.doesDocumentDataMatch(cE.documentData);
          if (!didMatchBefore && doesMatchNow2) {
            newCount++;
          }
          if (didMatchBefore && !doesMatchNow2) {
            newCount--;
          }
        });
        if (newCount !== previousCount) {
          ret = true;
          rxQuery._setResultData(newCount);
        }
      } else {
        var eventReduceResult = calculateNewResults(rxQuery, runChangeEvents);
        if (eventReduceResult.runFullQueryAgain) {
          mustReExec = true;
        } else if (eventReduceResult.changed) {
          ret = true;
          rxQuery._setResultData(eventReduceResult.newResults);
        }
      }
    }
  }
  if (mustReExec) {
    return rxQuery._execOverDatabase().then((newResultData) => {
      rxQuery._latestChangeEvent = rxQuery.collection._changeEventBuffer.counter;
      if (typeof newResultData === "number") {
        if (!rxQuery._result || newResultData !== rxQuery._result.count) {
          ret = true;
          rxQuery._setResultData(newResultData);
        }
        return ret;
      }
      if (!rxQuery._result || !areRxDocumentArraysEqual(rxQuery.collection.schema.primaryPath, newResultData, rxQuery._result.docsData)) {
        ret = true;
        rxQuery._setResultData(newResultData);
      }
      return ret;
    });
  }
  return Promise.resolve(ret);
}
function prepareQuery(schema, mutateableQuery) {
  if (!mutateableQuery.sort) {
    throw newRxError("SNH", {
      query: mutateableQuery
    });
  }
  var queryPlan = getQueryPlan(schema, mutateableQuery);
  return {
    query: mutateableQuery,
    queryPlan
  };
}
function queryCollection(rxQuery) {
  return __async(this, null, function* () {
    var docs = [];
    var collection = rxQuery.collection;
    if (rxQuery.isFindOneByIdQuery) {
      if (Array.isArray(rxQuery.isFindOneByIdQuery)) {
        var docIds = rxQuery.isFindOneByIdQuery;
        docIds = docIds.filter((docId2) => {
          var docData2 = rxQuery.collection._docCache.getLatestDocumentDataIfExists(docId2);
          if (docData2) {
            if (!docData2._deleted) {
              docs.push(docData2);
            }
            return false;
          } else {
            return true;
          }
        });
        if (docIds.length > 0) {
          var docsFromStorage = yield collection.storageInstance.findDocumentsById(docIds, false);
          appendToArray(docs, docsFromStorage);
        }
      } else {
        var docId = rxQuery.isFindOneByIdQuery;
        var docData = rxQuery.collection._docCache.getLatestDocumentDataIfExists(docId);
        if (!docData) {
          var fromStorageList = yield collection.storageInstance.findDocumentsById([docId], false);
          if (fromStorageList[0]) {
            docData = fromStorageList[0];
          }
        }
        if (docData && !docData._deleted) {
          docs.push(docData);
        }
      }
    } else {
      var preparedQuery = rxQuery.getPreparedQuery();
      var queryResult = yield collection.storageInstance.query(preparedQuery);
      docs = queryResult.documents;
    }
    return docs;
  });
}
function isFindOneByIdQuery(primaryPath, query) {
  if (!query.skip && query.selector && Object.keys(query.selector).length === 1 && query.selector[primaryPath]) {
    var value = query.selector[primaryPath];
    if (typeof value === "string") {
      return value;
    } else if (Object.keys(value).length === 1 && typeof value.$eq === "string") {
      return value.$eq;
    }
    if (Object.keys(value).length === 1 && Array.isArray(value.$eq) && // must only contain strings
    !value.$eq.find((r) => typeof r !== "string")) {
      return value.$eq;
    }
  }
  return false;
}
function isRxQuery(obj) {
  return obj instanceof RxQueryBase;
}

export {
  _createClass,
  lastOfArray,
  shuffleArray,
  randomOfArray,
  toArray,
  batchArray,
  removeOneFromArrayIfMatches,
  isMaybeReadonlyArray,
  isOneItemOfArrayInOtherArray,
  arrayFilterNotEmpty,
  countUntilNotMatching,
  asyncFilter,
  sumNumberArray,
  maxOfNumbers,
  appendToArray,
  uniqueArray,
  b64EncodeUnicode,
  b64DecodeUnicode,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createBlob,
  createBlobFromBase64,
  blobToString,
  blobToBase64String,
  getBlobSize,
  parseRevision,
  getHeightOfRevision,
  createRevision,
  deepFreeze,
  objectPathMonad,
  getFromObjectOrThrow,
  flattenObject,
  flatClone,
  firstPropertyNameOfObject,
  firstPropertyValueOfObject,
  sortObject,
  clone,
  overwriteGetterForCaching,
  hasDeepProperty,
  RX_META_LWT_MINIMUM,
  getDefaultRxDocumentMeta,
  getDefaultRevision,
  stripMetaDataFromDocument,
  areRxDocumentArraysEqual,
  getSortDocumentsByLastWriteTimeComparator,
  sortDocumentsByLastWriteTime,
  toWithDeleted,
  jsSha256,
  nativeSha256,
  canUseCryptoSubtle,
  defaultHashSha256,
  hashStringToNumber,
  nextTick,
  promiseWait,
  toPromise,
  isPromise,
  PROMISE_RESOLVE_TRUE,
  PROMISE_RESOLVE_FALSE,
  PROMISE_RESOLVE_NULL,
  PROMISE_RESOLVE_VOID,
  requestIdlePromiseNoQueue,
  requestIdlePromise,
  requestIdleCallbackIfAvailable,
  promiseSeries,
  REGEX_ALL_DOTS,
  REGEX_ALL_PIPES,
  randomCouchString,
  RANDOM_STRING,
  ucfirst,
  trimDots,
  lastCharOfString,
  isFolderPath,
  arrayBufferToString,
  stringToArrayBuffer,
  normalizeString,
  deepEqual,
  getProperty,
  setProperty,
  deleteProperty,
  hasProperty,
  deepKeys,
  getFromMapOrThrow,
  getFromMapOrCreate,
  pluginMissing,
  errorToPlainJson,
  now,
  runXTimes,
  ensureNotFalsy,
  ensureInteger,
  RXJS_SHARE_REPLAY_DEFAULTS,
  RXDB_VERSION,
  RXDB_UTILS_GLOBAL,
  PREMIUM_FLAG_HASH,
  overwritable,
  RxError,
  RxTypeError,
  getErrorUrl,
  errorUrlHint,
  newRxError,
  newRxTypeError,
  isBulkWriteConflictError,
  rxStorageWriteErrorToRxError,
  HOOKS,
  runPluginHooks,
  runAsyncPluginHooks,
  _clearHook,
  getPseudoSchemaForVersion,
  getSchemaByObjectPath,
  fillPrimaryKey,
  getPrimaryFieldOfPrimaryKey,
  getLengthOfPrimaryKey,
  getComposedPrimaryKeyOfDocumentData,
  normalizeRxJsonSchema,
  getDefaultIndex,
  fillWithDefaultSettings,
  RX_META_SCHEMA,
  getFinalFields,
  fillObjectWithDefaults,
  DEFAULT_CHECKPOINT_SCHEMA,
  getDocumentDataOfRxChangeEvent,
  rxChangeEventToEventReduceChangeEvent,
  flattenEvents,
  INDEX_MAX,
  INDEX_MIN,
  getQueryPlan,
  LOGICAL_OPERATORS,
  LOWER_BOUND_LOGICAL_OPERATORS,
  UPPER_BOUND_LOGICAL_OPERATORS,
  isSelectorSatisfiedByIndex,
  getMatcherQueryOpts,
  rateQueryPlan,
  normalizeMangoQuery,
  getSortComparator,
  getQueryMatcher,
  runQueryUpdateFunction,
  QueryCache,
  createQueryCache,
  uncacheRxQuery,
  countRxQuerySubscribers,
  DEFAULT_TRY_TO_KEEP_MAX,
  DEFAULT_UNEXECUTED_LIFETIME,
  defaultCacheReplacementPolicyMonad,
  defaultCacheReplacementPolicy,
  COLLECTIONS_WITH_RUNNING_CLEANUP,
  triggerCacheReplacement,
  DocumentCache,
  mapDocumentsDataToCacheDocs,
  RxQuerySingleResult,
  RxQueryBase,
  _getDefaultQuery,
  tunnelQueryCache,
  createRxQuery,
  prepareQuery,
  queryCollection,
  isFindOneByIdQuery,
  isRxQuery
};
//# sourceMappingURL=chunk-WT66J2WX.js.map
