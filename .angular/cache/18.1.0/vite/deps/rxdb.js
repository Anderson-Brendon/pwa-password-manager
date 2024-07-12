import {
  wrapRxStorageInstance,
  wrappedValidateStorageFactory
} from "./chunk-PLAEQP2H.js";
import {
  BROADCAST_CHANNEL_BY_TOKEN,
  ObliviousSet,
  addRxStorageMultiInstanceSupport,
  getBroadcastChannelReference,
  removeBroadcastChannelReference
} from "./chunk-5BBCYQTQ.js";
import {
  INTERNAL_STORAGE_NAME,
  RX_DATABASE_LOCAL_DOCS_STORAGE_NAME,
  attachmentWriteDataToNormalData,
  categorizeBulkWriteRows,
  ensureRxStorageInstanceParamsAreCorrect,
  flatCloneDocWithMeta,
  getAttachmentSize,
  getChangedDocumentsSince,
  getChangedDocumentsSinceQuery,
  getSingleDocument,
  getWrappedStorageInstance,
  hasEncryption,
  observeSingle,
  randomDelayStorage,
  stackCheckpoints,
  stripAttachmentsDataFromDocument,
  stripAttachmentsDataFromRow,
  throwIfIsStorageWriteError,
  writeSingle
} from "./chunk-EPTCBPGQ.js";
import {
  COLLECTIONS_WITH_RUNNING_CLEANUP,
  DEFAULT_CHECKPOINT_SCHEMA,
  DEFAULT_TRY_TO_KEEP_MAX,
  DEFAULT_UNEXECUTED_LIFETIME,
  DocumentCache,
  HOOKS,
  INDEX_MAX,
  INDEX_MIN,
  LOGICAL_OPERATORS,
  LOWER_BOUND_LOGICAL_OPERATORS,
  PREMIUM_FLAG_HASH,
  PROMISE_RESOLVE_FALSE,
  PROMISE_RESOLVE_NULL,
  PROMISE_RESOLVE_TRUE,
  PROMISE_RESOLVE_VOID,
  QueryCache,
  RANDOM_STRING,
  REGEX_ALL_DOTS,
  REGEX_ALL_PIPES,
  RXDB_UTILS_GLOBAL,
  RXDB_VERSION,
  RXJS_SHARE_REPLAY_DEFAULTS,
  RX_META_LWT_MINIMUM,
  RX_META_SCHEMA,
  RxError,
  RxQueryBase,
  RxQuerySingleResult,
  RxTypeError,
  UPPER_BOUND_LOGICAL_OPERATORS,
  _clearHook,
  _createClass,
  _getDefaultQuery,
  appendToArray,
  areRxDocumentArraysEqual,
  arrayBufferToBase64,
  arrayBufferToString,
  arrayFilterNotEmpty,
  asyncFilter,
  b64DecodeUnicode,
  b64EncodeUnicode,
  base64ToArrayBuffer,
  batchArray,
  blobToBase64String,
  blobToString,
  canUseCryptoSubtle,
  clone,
  countRxQuerySubscribers,
  countUntilNotMatching,
  createBlob,
  createBlobFromBase64,
  createQueryCache,
  createRevision,
  createRxQuery,
  deepEqual,
  deepFreeze,
  deepKeys,
  defaultCacheReplacementPolicy,
  defaultCacheReplacementPolicyMonad,
  defaultHashSha256,
  deleteProperty,
  ensureInteger,
  ensureNotFalsy,
  errorToPlainJson,
  errorUrlHint,
  fillObjectWithDefaults,
  fillPrimaryKey,
  fillWithDefaultSettings,
  firstPropertyNameOfObject,
  firstPropertyValueOfObject,
  flatClone,
  flattenEvents,
  flattenObject,
  getBlobSize,
  getComposedPrimaryKeyOfDocumentData,
  getDefaultIndex,
  getDefaultRevision,
  getDefaultRxDocumentMeta,
  getDocumentDataOfRxChangeEvent,
  getErrorUrl,
  getFinalFields,
  getFromMapOrCreate,
  getFromMapOrThrow,
  getFromObjectOrThrow,
  getHeightOfRevision,
  getLengthOfPrimaryKey,
  getMatcherQueryOpts,
  getPrimaryFieldOfPrimaryKey,
  getProperty,
  getPseudoSchemaForVersion,
  getQueryMatcher,
  getQueryPlan,
  getSchemaByObjectPath,
  getSortComparator,
  getSortDocumentsByLastWriteTimeComparator,
  hasDeepProperty,
  hasProperty,
  hashStringToNumber,
  isBulkWriteConflictError,
  isFindOneByIdQuery,
  isFolderPath,
  isMaybeReadonlyArray,
  isOneItemOfArrayInOtherArray,
  isPromise,
  isRxQuery,
  isSelectorSatisfiedByIndex,
  jsSha256,
  lastCharOfString,
  lastOfArray,
  mapDocumentsDataToCacheDocs,
  maxOfNumbers,
  nativeSha256,
  newRxError,
  newRxTypeError,
  nextTick,
  normalizeMangoQuery,
  normalizeRxJsonSchema,
  normalizeString,
  now,
  objectPathMonad,
  overwritable,
  overwriteGetterForCaching,
  parseRevision,
  pluginMissing,
  prepareQuery,
  promiseSeries,
  promiseWait,
  queryCollection,
  randomCouchString,
  randomOfArray,
  rateQueryPlan,
  removeOneFromArrayIfMatches,
  requestIdleCallbackIfAvailable,
  requestIdlePromise,
  requestIdlePromiseNoQueue,
  runAsyncPluginHooks,
  runPluginHooks,
  runQueryUpdateFunction,
  runXTimes,
  rxChangeEventToEventReduceChangeEvent,
  rxStorageWriteErrorToRxError,
  setProperty,
  shuffleArray,
  sortDocumentsByLastWriteTime,
  sortObject,
  stringToArrayBuffer,
  stripMetaDataFromDocument,
  sumNumberArray,
  toArray,
  toPromise,
  toWithDeleted,
  triggerCacheReplacement,
  trimDots,
  tunnelQueryCache,
  ucfirst,
  uncacheRxQuery,
  uniqueArray
} from "./chunk-WT66J2WX.js";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  shareReplay,
  startWith
} from "./chunk-H7XVPIDD.js";
import {
  __async
} from "./chunk-7RSYZEEK.js";

// node_modules/rxdb/dist/esm/rx-schema.js
var RxSchema = function() {
  function RxSchema2(jsonSchema, hashFunction) {
    this.jsonSchema = jsonSchema;
    this.hashFunction = hashFunction;
    this.indexes = getIndexes(this.jsonSchema);
    this.primaryPath = getPrimaryFieldOfPrimaryKey(this.jsonSchema.primaryKey);
    this.finalFields = getFinalFields(this.jsonSchema);
  }
  var _proto = RxSchema2.prototype;
  _proto.validateChange = function validateChange(dataBefore, dataAfter) {
    this.finalFields.forEach((fieldName) => {
      if (!deepEqual(dataBefore[fieldName], dataAfter[fieldName])) {
        throw newRxError("DOC9", {
          dataBefore,
          dataAfter,
          fieldName,
          schema: this.jsonSchema
        });
      }
    });
  };
  _proto.getDocumentPrototype = function getDocumentPrototype2() {
    var proto = {};
    var pathProperties = getSchemaByObjectPath(this.jsonSchema, "");
    Object.keys(pathProperties).forEach((key) => {
      var fullPath = key;
      proto.__defineGetter__(key, function() {
        if (!this.get || typeof this.get !== "function") {
          return void 0;
        }
        var ret = this.get(fullPath);
        return ret;
      });
      Object.defineProperty(proto, key + "$", {
        get: function() {
          return this.get$(fullPath);
        },
        enumerable: false,
        configurable: false
      });
      Object.defineProperty(proto, key + "$$", {
        get: function() {
          return this.get$$(fullPath);
        },
        enumerable: false,
        configurable: false
      });
      Object.defineProperty(proto, key + "_", {
        get: function() {
          return this.populate(fullPath);
        },
        enumerable: false,
        configurable: false
      });
    });
    overwriteGetterForCaching(this, "getDocumentPrototype", () => proto);
    return proto;
  };
  _proto.getPrimaryOfDocumentData = function getPrimaryOfDocumentData(documentData) {
    return getComposedPrimaryKeyOfDocumentData(this.jsonSchema, documentData);
  };
  return _createClass(RxSchema2, [{
    key: "version",
    get: function() {
      return this.jsonSchema.version;
    }
  }, {
    key: "defaultValues",
    get: function() {
      var values = {};
      Object.entries(this.jsonSchema.properties).filter(([, v]) => Object.prototype.hasOwnProperty.call(v, "default")).forEach(([k, v]) => values[k] = v.default);
      return overwriteGetterForCaching(this, "defaultValues", values);
    }
    /**
     * @overrides itself on the first call
     *
     * TODO this should be a pure function that
     * caches the hash in a WeakMap.
     */
  }, {
    key: "hash",
    get: function() {
      return overwriteGetterForCaching(this, "hash", this.hashFunction(JSON.stringify(this.jsonSchema)));
    }
  }]);
}();
function getIndexes(jsonSchema) {
  return (jsonSchema.indexes || []).map((index) => isMaybeReadonlyArray(index) ? index : [index]);
}
function getPreviousVersions(schema) {
  var version = schema.version ? schema.version : 0;
  var c = 0;
  return new Array(version).fill(0).map(() => c++);
}
function createRxSchema(jsonSchema, hashFunction, runPreCreateHooks = true) {
  if (runPreCreateHooks) {
    runPluginHooks("preCreateRxSchema", jsonSchema);
  }
  var useJsonSchema = fillWithDefaultSettings(jsonSchema);
  useJsonSchema = normalizeRxJsonSchema(useJsonSchema);
  overwritable.deepFreezeWhenDevMode(useJsonSchema);
  var schema = new RxSchema(useJsonSchema, hashFunction);
  runPluginHooks("createRxSchema", schema);
  return schema;
}
function isRxSchema(obj) {
  return obj instanceof RxSchema;
}
function toTypedRxJsonSchema(schema) {
  return schema;
}

// node_modules/rxdb/dist/esm/incremental-write.js
var IncrementalWriteQueue = function() {
  function IncrementalWriteQueue2(storageInstance, primaryPath, preWrite, postWrite) {
    this.queueByDocId = /* @__PURE__ */ new Map();
    this.isRunning = false;
    this.storageInstance = storageInstance;
    this.primaryPath = primaryPath;
    this.preWrite = preWrite;
    this.postWrite = postWrite;
  }
  var _proto = IncrementalWriteQueue2.prototype;
  _proto.addWrite = function addWrite(lastKnownDocumentState, modifier) {
    var docId = lastKnownDocumentState[this.primaryPath];
    var ar = getFromMapOrCreate(this.queueByDocId, docId, () => []);
    var ret = new Promise((resolve, reject) => {
      var item = {
        lastKnownDocumentState,
        modifier,
        resolve,
        reject
      };
      ensureNotFalsy(ar).push(item);
      this.triggerRun();
    });
    return ret;
  };
  _proto.triggerRun = function triggerRun() {
    return __async(this, null, function* () {
      if (this.isRunning === true || this.queueByDocId.size === 0) {
        return;
      }
      this.isRunning = true;
      var writeRows = [];
      var itemsById = this.queueByDocId;
      this.queueByDocId = /* @__PURE__ */ new Map();
      yield Promise.all(Array.from(itemsById.entries()).map((_0) => __async(this, [_0], function* ([_docId, items]) {
        var oldData = findNewestOfDocumentStates(items.map((i) => i.lastKnownDocumentState));
        var newData = oldData;
        for (var item of items) {
          try {
            newData = yield item.modifier(
              /**
               * We have to clone() each time because the modifier
               * might throw while it already changed some properties
               * of the document.
               */
              clone(newData)
            );
          } catch (err) {
            item.reject(err);
            item.reject = () => {
            };
            item.resolve = () => {
            };
          }
        }
        try {
          yield this.preWrite(newData, oldData);
        } catch (err) {
          items.forEach((item2) => item2.reject(err));
          return;
        }
        writeRows.push({
          previous: oldData,
          document: newData
        });
      })));
      var writeResult = writeRows.length > 0 ? yield this.storageInstance.bulkWrite(writeRows, "incremental-write") : {
        error: [],
        success: []
      };
      yield Promise.all(writeResult.success.map((result) => {
        var docId = result[this.primaryPath];
        this.postWrite(result);
        var items = getFromMapOrThrow(itemsById, docId);
        items.forEach((item) => item.resolve(result));
      }));
      writeResult.error.forEach((error) => {
        var docId = error.documentId;
        var items = getFromMapOrThrow(itemsById, docId);
        var isConflict = isBulkWriteConflictError(error);
        if (isConflict) {
          var ar = getFromMapOrCreate(this.queueByDocId, docId, () => []);
          items.reverse().forEach((item) => {
            item.lastKnownDocumentState = ensureNotFalsy(isConflict.documentInDb);
            ensureNotFalsy(ar).unshift(item);
          });
        } else {
          var rxError = rxStorageWriteErrorToRxError(error);
          items.forEach((item) => item.reject(rxError));
        }
      });
      this.isRunning = false;
      return this.triggerRun();
    });
  };
  return IncrementalWriteQueue2;
}();
function modifierFromPublicToInternal(publicModifier) {
  var ret = (docData) => __async(this, null, function* () {
    var withoutMeta = stripMetaDataFromDocument(docData);
    withoutMeta._deleted = docData._deleted;
    var modified = yield publicModifier(withoutMeta);
    var reattachedMeta = Object.assign({}, modified, {
      _meta: docData._meta,
      _attachments: docData._attachments,
      _rev: docData._rev,
      _deleted: typeof modified._deleted !== "undefined" ? modified._deleted : docData._deleted
    });
    if (typeof reattachedMeta._deleted === "undefined") {
      reattachedMeta._deleted = false;
    }
    return reattachedMeta;
  });
  return ret;
}
function findNewestOfDocumentStates(docs) {
  var newest = docs[0];
  var newestRevisionHeight = getHeightOfRevision(newest._rev);
  docs.forEach((doc) => {
    var height = getHeightOfRevision(doc._rev);
    if (height > newestRevisionHeight) {
      newest = doc;
      newestRevisionHeight = height;
    }
  });
  return newest;
}

// node_modules/rxdb/dist/esm/rx-document.js
var basePrototype = {
  get primaryPath() {
    var _this = this;
    if (!_this.isInstanceOfRxDocument) {
      return void 0;
    }
    return _this.collection.schema.primaryPath;
  },
  get primary() {
    var _this = this;
    if (!_this.isInstanceOfRxDocument) {
      return void 0;
    }
    return _this._data[_this.primaryPath];
  },
  get revision() {
    var _this = this;
    if (!_this.isInstanceOfRxDocument) {
      return void 0;
    }
    return _this._data._rev;
  },
  get deleted$() {
    var _this = this;
    if (!_this.isInstanceOfRxDocument) {
      return void 0;
    }
    return _this.$.pipe(map((d) => d._data._deleted));
  },
  get deleted$$() {
    var _this = this;
    var reactivity = _this.collection.database.getReactivityFactory();
    return reactivity.fromObservable(_this.deleted$, _this.getLatest().deleted, _this.collection.database);
  },
  get deleted() {
    var _this = this;
    if (!_this.isInstanceOfRxDocument) {
      return void 0;
    }
    return _this._data._deleted;
  },
  getLatest() {
    var latestDocData = this.collection._docCache.getLatestDocumentData(this.primary);
    return this.collection._docCache.getCachedRxDocument(latestDocData);
  },
  /**
   * returns the observable which emits the plain-data of this document
   */
  get $() {
    var _this = this;
    return _this.collection.$.pipe(filter((changeEvent) => !changeEvent.isLocal), filter((changeEvent) => changeEvent.documentId === this.primary), map((changeEvent) => getDocumentDataOfRxChangeEvent(changeEvent)), startWith(_this.collection._docCache.getLatestDocumentData(this.primary)), distinctUntilChanged((prev, curr) => prev._rev === curr._rev), map((docData) => this.collection._docCache.getCachedRxDocument(docData)), shareReplay(RXJS_SHARE_REPLAY_DEFAULTS));
  },
  get $$() {
    var _this = this;
    var reactivity = _this.collection.database.getReactivityFactory();
    return reactivity.fromObservable(_this.$, _this.getLatest()._data, _this.collection.database);
  },
  /**
   * returns observable of the value of the given path
   */
  get$(path) {
    if (overwritable.isDevMode()) {
      if (path.includes(".item.")) {
        throw newRxError("DOC1", {
          path
        });
      }
      if (path === this.primaryPath) {
        throw newRxError("DOC2");
      }
      if (this.collection.schema.finalFields.includes(path)) {
        throw newRxError("DOC3", {
          path
        });
      }
      var schemaObj = getSchemaByObjectPath(this.collection.schema.jsonSchema, path);
      if (!schemaObj) {
        throw newRxError("DOC4", {
          path
        });
      }
    }
    return this.$.pipe(map((data) => getProperty(data, path)), distinctUntilChanged());
  },
  get$$(path) {
    var obs = this.get$(path);
    var reactivity = this.collection.database.getReactivityFactory();
    return reactivity.fromObservable(obs, this.getLatest().get(path), this.collection.database);
  },
  /**
   * populate the given path
   */
  populate(path) {
    var schemaObj = getSchemaByObjectPath(this.collection.schema.jsonSchema, path);
    var value = this.get(path);
    if (!value) {
      return PROMISE_RESOLVE_NULL;
    }
    if (!schemaObj) {
      throw newRxError("DOC5", {
        path
      });
    }
    if (!schemaObj.ref) {
      throw newRxError("DOC6", {
        path,
        schemaObj
      });
    }
    var refCollection = this.collection.database.collections[schemaObj.ref];
    if (!refCollection) {
      throw newRxError("DOC7", {
        ref: schemaObj.ref,
        path,
        schemaObj
      });
    }
    if (schemaObj.type === "array") {
      return refCollection.findByIds(value).exec().then((res) => {
        var valuesIterator = res.values();
        return Array.from(valuesIterator);
      });
    } else {
      return refCollection.findOne(value).exec();
    }
  },
  /**
   * get data by objectPath
   * @hotPath Performance here is really important,
   * run some tests before changing anything.
   */
  get(objPath) {
    return getFromMapOrCreate(this._propertyCache, objPath, () => {
      var valueObj = getProperty(this._data, objPath);
      if (typeof valueObj !== "object" || valueObj === null || Array.isArray(valueObj)) {
        return overwritable.deepFreezeWhenDevMode(valueObj);
      }
      var _this = this;
      var proxy = new Proxy(
        /**
         * In dev-mode, the _data is deep-frozen
         * so we have to flat clone here so that
         * the proxy can work.
         */
        flatClone(valueObj),
        {
          get(target, property) {
            if (typeof property !== "string") {
              return target[property];
            }
            var lastChar = property.charAt(property.length - 1);
            if (property.endsWith("$$")) {
              var key = property.slice(0, -2);
              return _this.get$$(trimDots(objPath + "." + key));
            } else if (lastChar === "$") {
              var _key = property.slice(0, -1);
              return _this.get$(trimDots(objPath + "." + _key));
            } else if (lastChar === "_") {
              var _key2 = property.slice(0, -1);
              return _this.populate(trimDots(objPath + "." + _key2));
            } else {
              return _this.get(trimDots(objPath + "." + property));
            }
          }
        }
      );
      return proxy;
    });
  },
  toJSON(withMetaFields = false) {
    if (!withMetaFields) {
      var data = flatClone(this._data);
      delete data._rev;
      delete data._attachments;
      delete data._deleted;
      delete data._meta;
      return overwritable.deepFreezeWhenDevMode(data);
    } else {
      return overwritable.deepFreezeWhenDevMode(this._data);
    }
  },
  toMutableJSON(withMetaFields = false) {
    return clone(this.toJSON(withMetaFields));
  },
  /**
   * updates document
   * @overwritten by plugin (optional)
   * @param updateObj mongodb-like syntax
   */
  update(_updateObj) {
    throw pluginMissing("update");
  },
  incrementalUpdate(_updateObj) {
    throw pluginMissing("update");
  },
  updateCRDT(_updateObj) {
    throw pluginMissing("crdt");
  },
  putAttachment() {
    throw pluginMissing("attachments");
  },
  getAttachment() {
    throw pluginMissing("attachments");
  },
  allAttachments() {
    throw pluginMissing("attachments");
  },
  get allAttachments$() {
    throw pluginMissing("attachments");
  },
  modify(mutationFunction, _context) {
    return __async(this, null, function* () {
      var oldData = this._data;
      var newData = yield modifierFromPublicToInternal(mutationFunction)(oldData);
      return this._saveData(newData, oldData);
    });
  },
  /**
   * runs an incremental update over the document
   * @param function that takes the document-data and returns a new data-object
   */
  incrementalModify(mutationFunction, _context) {
    return this.collection.incrementalWriteQueue.addWrite(this._data, modifierFromPublicToInternal(mutationFunction)).then((result) => this.collection._docCache.getCachedRxDocument(result));
  },
  patch(patch) {
    var oldData = this._data;
    var newData = clone(oldData);
    Object.entries(patch).forEach(([k, v]) => {
      newData[k] = v;
    });
    return this._saveData(newData, oldData);
  },
  /**
   * patches the given properties
   */
  incrementalPatch(patch) {
    return this.incrementalModify((docData) => {
      Object.entries(patch).forEach(([k, v]) => {
        docData[k] = v;
      });
      return docData;
    });
  },
  /**
   * saves the new document-data
   * and handles the events
   */
  _saveData(newData, oldData) {
    return __async(this, null, function* () {
      newData = flatClone(newData);
      if (this._data._deleted) {
        throw newRxError("DOC11", {
          id: this.primary,
          document: this
        });
      }
      yield beforeDocumentUpdateWrite(this.collection, newData, oldData);
      var writeResult = yield this.collection.storageInstance.bulkWrite([{
        previous: oldData,
        document: newData
      }], "rx-document-save-data");
      var isError = writeResult.error[0];
      throwIfIsStorageWriteError(this.collection, this.primary, newData, isError);
      yield this.collection._runHooks("post", "save", newData, this);
      return this.collection._docCache.getCachedRxDocument(writeResult.success[0]);
    });
  },
  /**
   * Remove the document.
   * Notice that there is no hard delete,
   * instead deleted documents get flagged with _deleted=true.
   */
  remove() {
    var collection = this.collection;
    if (this.deleted) {
      return Promise.reject(newRxError("DOC13", {
        document: this,
        id: this.primary
      }));
    }
    var deletedData = flatClone(this._data);
    var removedDocData;
    return collection._runHooks("pre", "remove", deletedData, this).then(() => __async(this, null, function* () {
      deletedData._deleted = true;
      var writeResult = yield collection.storageInstance.bulkWrite([{
        previous: this._data,
        document: deletedData
      }], "rx-document-remove");
      var isError = writeResult.error[0];
      throwIfIsStorageWriteError(collection, this.primary, deletedData, isError);
      return writeResult.success[0];
    })).then((removed) => {
      removedDocData = removed;
      return this.collection._runHooks("post", "remove", deletedData, this);
    }).then(() => {
      return this.collection._docCache.getCachedRxDocument(removedDocData);
    });
  },
  incrementalRemove() {
    return this.incrementalModify((docData) => __async(this, null, function* () {
      yield this.collection._runHooks("pre", "remove", docData, this);
      docData._deleted = true;
      return docData;
    })).then((newDoc) => __async(this, null, function* () {
      yield this.collection._runHooks("post", "remove", newDoc._data, newDoc);
      return newDoc;
    }));
  },
  destroy() {
    throw newRxError("DOC14");
  }
};
function createRxDocumentConstructor(proto = basePrototype) {
  var constructor = function RxDocumentConstructor(collection, docData) {
    this.collection = collection;
    this._data = docData;
    this._propertyCache = /* @__PURE__ */ new Map();
    this.isInstanceOfRxDocument = true;
  };
  constructor.prototype = proto;
  return constructor;
}
function createWithConstructor(constructor, collection, jsonData) {
  var doc = new constructor(collection, jsonData);
  runPluginHooks("createRxDocument", doc);
  return doc;
}
function isRxDocument(obj) {
  return typeof obj === "object" && obj !== null && "isInstanceOfRxDocument" in obj;
}
function beforeDocumentUpdateWrite(collection, newData, oldData) {
  newData._meta = Object.assign({}, oldData._meta, newData._meta);
  if (overwritable.isDevMode()) {
    collection.schema.validateChange(oldData, newData);
  }
  return collection._runHooks("pre", "save", newData, oldData);
}

// node_modules/rxdb/dist/esm/rx-database-internal-store.js
var INTERNAL_CONTEXT_COLLECTION = "collection";
var INTERNAL_CONTEXT_STORAGE_TOKEN = "storage-token";
var INTERNAL_CONTEXT_MIGRATION_STATUS = "rx-migration-status";
var INTERNAL_STORE_SCHEMA_TITLE = "RxInternalDocument";
var INTERNAL_STORE_SCHEMA = fillWithDefaultSettings({
  version: 0,
  title: INTERNAL_STORE_SCHEMA_TITLE,
  primaryKey: {
    key: "id",
    fields: ["context", "key"],
    separator: "|"
  },
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 200
    },
    key: {
      type: "string"
    },
    context: {
      type: "string",
      enum: [INTERNAL_CONTEXT_COLLECTION, INTERNAL_CONTEXT_STORAGE_TOKEN, INTERNAL_CONTEXT_MIGRATION_STATUS, "OTHER"]
    },
    data: {
      type: "object",
      additionalProperties: true
    }
  },
  indexes: [],
  required: ["key", "context", "data"],
  additionalProperties: false,
  /**
   * If the sharding plugin is used,
   * it must not shard on the internal RxStorageInstance
   * because that one anyway has only a small amount of documents
   * and also its creation is in the hot path of the initial page load,
   * so we should spend less time creating multiple RxStorageInstances.
   */
  sharding: {
    shards: 1,
    mode: "collection"
  }
});
function getPrimaryKeyOfInternalDocument(key, context) {
  return getComposedPrimaryKeyOfDocumentData(INTERNAL_STORE_SCHEMA, {
    key,
    context
  });
}
function getAllCollectionDocuments(storageInstance) {
  return __async(this, null, function* () {
    var getAllQueryPrepared = prepareQuery(storageInstance.schema, {
      selector: {
        context: INTERNAL_CONTEXT_COLLECTION,
        _deleted: {
          $eq: false
        }
      },
      sort: [{
        id: "asc"
      }],
      skip: 0
    });
    var queryResult = yield storageInstance.query(getAllQueryPrepared);
    var allDocs = queryResult.documents;
    return allDocs;
  });
}
var STORAGE_TOKEN_DOCUMENT_KEY = "storageToken";
var STORAGE_TOKEN_DOCUMENT_ID = getPrimaryKeyOfInternalDocument(STORAGE_TOKEN_DOCUMENT_KEY, INTERNAL_CONTEXT_STORAGE_TOKEN);
function ensureStorageTokenDocumentExists(rxDatabase) {
  return __async(this, null, function* () {
    var storageToken = randomCouchString(10);
    var passwordHash = rxDatabase.password ? yield rxDatabase.hashFunction(JSON.stringify(rxDatabase.password)) : void 0;
    var docData = {
      id: STORAGE_TOKEN_DOCUMENT_ID,
      context: INTERNAL_CONTEXT_STORAGE_TOKEN,
      key: STORAGE_TOKEN_DOCUMENT_KEY,
      data: {
        rxdbVersion: rxDatabase.rxdbVersion,
        token: storageToken,
        /**
         * We add the instance token here
         * to be able to detect if a given RxDatabase instance
         * is the first instance that was ever created
         * or if databases have existed earlier on that storage
         * with the same database name.
         */
        instanceToken: rxDatabase.token,
        passwordHash
      },
      _deleted: false,
      _meta: getDefaultRxDocumentMeta(),
      _rev: getDefaultRevision(),
      _attachments: {}
    };
    var writeResult = yield rxDatabase.internalStore.bulkWrite([{
      document: docData
    }], "internal-add-storage-token");
    if (writeResult.success[0]) {
      return writeResult.success[0];
    }
    var error = ensureNotFalsy(writeResult.error[0]);
    if (error.isError && isBulkWriteConflictError(error)) {
      var conflictError = error;
      if (!isDatabaseStateVersionCompatibleWithDatabaseCode(conflictError.documentInDb.data.rxdbVersion, rxDatabase.rxdbVersion)) {
        throw newRxError("DM5", {
          args: {
            database: rxDatabase.name,
            databaseStateVersion: conflictError.documentInDb.data.rxdbVersion,
            codeVersion: rxDatabase.rxdbVersion
          }
        });
      }
      if (passwordHash && passwordHash !== conflictError.documentInDb.data.passwordHash) {
        throw newRxError("DB1", {
          passwordHash,
          existingPasswordHash: conflictError.documentInDb.data.passwordHash
        });
      }
      var storageTokenDocInDb = conflictError.documentInDb;
      return ensureNotFalsy(storageTokenDocInDb);
    }
    throw error;
  });
}
function isDatabaseStateVersionCompatibleWithDatabaseCode(databaseStateVersion, codeVersion) {
  if (!databaseStateVersion) {
    return false;
  }
  if (codeVersion.includes("beta") && codeVersion !== databaseStateVersion) {
    return false;
  }
  var stateMajor = databaseStateVersion.split(".")[0];
  var codeMajor = codeVersion.split(".")[0];
  if (stateMajor !== codeMajor) {
    return false;
  }
  return true;
}
function addConnectedStorageToCollection(collection, storageCollectionName, schema) {
  return __async(this, null, function* () {
    if (collection.schema.version !== schema.version) {
      throw newRxError("SNH", {
        schema,
        version: collection.schema.version,
        name: collection.name,
        collection,
        args: {
          storageCollectionName
        }
      });
    }
    var collectionNameWithVersion = _collectionNamePrimary(collection.name, collection.schema.jsonSchema);
    var collectionDocId = getPrimaryKeyOfInternalDocument(collectionNameWithVersion, INTERNAL_CONTEXT_COLLECTION);
    while (true) {
      var collectionDoc = yield getSingleDocument(collection.database.internalStore, collectionDocId);
      var saveData = clone(ensureNotFalsy(collectionDoc));
      var alreadyThere = saveData.data.connectedStorages.find((row) => row.collectionName === storageCollectionName && row.schema.version === schema.version);
      if (alreadyThere) {
        return;
      }
      saveData.data.connectedStorages.push({
        collectionName: storageCollectionName,
        schema
      });
      try {
        yield writeSingle(collection.database.internalStore, {
          previous: ensureNotFalsy(collectionDoc),
          document: saveData
        }, "add-connected-storage-to-collection");
      } catch (err) {
        if (!isBulkWriteConflictError(err)) {
          throw err;
        }
      }
    }
  });
}
function removeConnectedStorageFromCollection(collection, storageCollectionName, schema) {
  return __async(this, null, function* () {
    if (collection.schema.version !== schema.version) {
      throw newRxError("SNH", {
        schema,
        version: collection.schema.version,
        name: collection.name,
        collection,
        args: {
          storageCollectionName
        }
      });
    }
    var collectionNameWithVersion = _collectionNamePrimary(collection.name, collection.schema.jsonSchema);
    var collectionDocId = getPrimaryKeyOfInternalDocument(collectionNameWithVersion, INTERNAL_CONTEXT_COLLECTION);
    while (true) {
      var collectionDoc = yield getSingleDocument(collection.database.internalStore, collectionDocId);
      var saveData = clone(ensureNotFalsy(collectionDoc));
      var isThere = saveData.data.connectedStorages.find((row) => row.collectionName === storageCollectionName && row.schema.version === schema.version);
      if (!isThere) {
        return;
      }
      saveData.data.connectedStorages = saveData.data.connectedStorages.filter((item) => item.collectionName !== storageCollectionName);
      try {
        yield writeSingle(collection.database.internalStore, {
          previous: ensureNotFalsy(collectionDoc),
          document: saveData
        }, "remove-connected-storage-from-collection");
      } catch (err) {
        if (!isBulkWriteConflictError(err)) {
          throw err;
        }
      }
    }
  });
}
function _collectionNamePrimary(name, schema) {
  return name + "-" + schema.version;
}

// node_modules/rxdb/dist/esm/rx-collection-helper.js
function fillObjectDataBeforeInsert(schema, data) {
  data = flatClone(data);
  data = fillObjectWithDefaults(schema, data);
  data = fillPrimaryKey(schema.primaryPath, schema.jsonSchema, data);
  data._meta = getDefaultRxDocumentMeta();
  if (!Object.prototype.hasOwnProperty.call(data, "_deleted")) {
    data._deleted = false;
  }
  if (!Object.prototype.hasOwnProperty.call(data, "_attachments")) {
    data._attachments = {};
  }
  if (!Object.prototype.hasOwnProperty.call(data, "_rev")) {
    data._rev = getDefaultRevision();
  }
  return data;
}
function createRxCollectionStorageInstance(rxDatabase, storageInstanceCreationParams) {
  return __async(this, null, function* () {
    storageInstanceCreationParams.multiInstance = rxDatabase.multiInstance;
    var storageInstance = yield rxDatabase.storage.createStorageInstance(storageInstanceCreationParams);
    return storageInstance;
  });
}
function removeCollectionStorages(storage, databaseInternalStorage, databaseInstanceToken, databaseName, collectionName, password, hashFunction) {
  return __async(this, null, function* () {
    var allCollectionMetaDocs = yield getAllCollectionDocuments(databaseInternalStorage);
    var relevantCollectionMetaDocs = allCollectionMetaDocs.filter((metaDoc) => metaDoc.data.name === collectionName);
    var removeStorages = [];
    relevantCollectionMetaDocs.forEach((metaDoc) => {
      removeStorages.push({
        collectionName: metaDoc.data.name,
        schema: metaDoc.data.schema,
        isCollection: true
      });
      metaDoc.data.connectedStorages.forEach((row) => removeStorages.push({
        collectionName: row.collectionName,
        isCollection: false,
        schema: row.schema
      }));
    });
    var alreadyAdded = /* @__PURE__ */ new Set();
    removeStorages = removeStorages.filter((row) => {
      var key = row.collectionName + "||" + row.schema.version;
      if (alreadyAdded.has(key)) {
        return false;
      } else {
        alreadyAdded.add(key);
        return true;
      }
    });
    yield Promise.all(removeStorages.map((row) => __async(this, null, function* () {
      var storageInstance = yield storage.createStorageInstance({
        collectionName: row.collectionName,
        databaseInstanceToken,
        databaseName,
        multiInstance: false,
        options: {},
        schema: row.schema,
        password,
        devMode: overwritable.isDevMode()
      });
      yield storageInstance.remove();
      if (row.isCollection) {
        yield runAsyncPluginHooks("postRemoveRxCollection", {
          storage,
          databaseName,
          collectionName
        });
      }
    })));
    if (hashFunction) {
      var writeRows = relevantCollectionMetaDocs.map((doc) => {
        var writeDoc = flatCloneDocWithMeta(doc);
        writeDoc._deleted = true;
        writeDoc._meta.lwt = now();
        writeDoc._rev = createRevision(databaseInstanceToken, doc);
        return {
          previous: doc,
          document: writeDoc
        };
      });
      yield databaseInternalStorage.bulkWrite(writeRows, "rx-database-remove-collection-all");
    }
  });
}
function ensureRxCollectionIsNotDestroyed(collection) {
  if (collection.destroyed) {
    throw newRxError("COL21", {
      collection: collection.name,
      version: collection.schema.version
    });
  }
}

// node_modules/rxdb/dist/esm/change-event-buffer.js
var ChangeEventBuffer = function() {
  function ChangeEventBuffer2(collection) {
    this.subs = [];
    this.limit = 100;
    this.counter = 0;
    this.eventCounterMap = /* @__PURE__ */ new WeakMap();
    this.buffer = [];
    this.collection = collection;
    this.subs.push(this.collection.$.pipe(filter((cE) => !cE.isLocal)).subscribe((cE) => this._handleChangeEvent(cE)));
  }
  var _proto = ChangeEventBuffer2.prototype;
  _proto._handleChangeEvent = function _handleChangeEvent(changeEvent) {
    this.counter++;
    this.buffer.push(changeEvent);
    this.eventCounterMap.set(changeEvent, this.counter);
    while (this.buffer.length > this.limit) {
      this.buffer.shift();
    }
  };
  _proto.getArrayIndexByPointer = function getArrayIndexByPointer(pointer) {
    var oldestEvent = this.buffer[0];
    var oldestCounter = this.eventCounterMap.get(oldestEvent);
    if (pointer < oldestCounter) return null;
    var rest = pointer - oldestCounter;
    return rest;
  };
  _proto.getFrom = function getFrom(pointer) {
    var ret = [];
    var currentIndex = this.getArrayIndexByPointer(pointer);
    if (currentIndex === null)
      return null;
    while (true) {
      var nextEvent = this.buffer[currentIndex];
      currentIndex++;
      if (!nextEvent) {
        return ret;
      } else {
        ret.push(nextEvent);
      }
    }
  };
  _proto.runFrom = function runFrom(pointer, fn) {
    var ret = this.getFrom(pointer);
    if (ret === null) {
      throw new Error("out of bounds");
    } else {
      ret.forEach((cE) => fn(cE));
    }
  };
  _proto.reduceByLastOfDoc = function reduceByLastOfDoc(changeEvents) {
    return changeEvents.slice(0);
    var docEventMap = {};
    changeEvents.forEach((changeEvent) => {
      docEventMap[changeEvent.documentId] = changeEvent;
    });
    return Object.values(docEventMap);
  };
  _proto.destroy = function destroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  };
  return ChangeEventBuffer2;
}();
function createChangeEventBuffer(collection) {
  return new ChangeEventBuffer(collection);
}

// node_modules/rxdb/dist/esm/rx-document-prototype-merge.js
var constructorForCollection = /* @__PURE__ */ new WeakMap();
function getDocumentPrototype(rxCollection) {
  var schemaProto = rxCollection.schema.getDocumentPrototype();
  var ormProto = getDocumentOrmPrototype(rxCollection);
  var baseProto = basePrototype;
  var proto = {};
  [schemaProto, ormProto, baseProto].forEach((obj) => {
    var props = Object.getOwnPropertyNames(obj);
    props.forEach((key) => {
      var desc = Object.getOwnPropertyDescriptor(obj, key);
      var enumerable = true;
      if (key.startsWith("_") || key.endsWith("_") || key.startsWith("$") || key.endsWith("$")) enumerable = false;
      if (typeof desc.value === "function") {
        Object.defineProperty(proto, key, {
          get() {
            return desc.value.bind(this);
          },
          enumerable,
          configurable: false
        });
      } else {
        desc.enumerable = enumerable;
        desc.configurable = false;
        if (desc.writable) desc.writable = false;
        Object.defineProperty(proto, key, desc);
      }
    });
  });
  return proto;
}
function getRxDocumentConstructor(rxCollection) {
  return getFromMapOrCreate(constructorForCollection, rxCollection, () => createRxDocumentConstructor(getDocumentPrototype(rxCollection)));
}
function createNewRxDocument(rxCollection, documentConstructor, docData) {
  var doc = createWithConstructor(documentConstructor, rxCollection, overwritable.deepFreezeWhenDevMode(docData));
  rxCollection._runHooksSync("post", "create", docData, doc);
  runPluginHooks("postCreateRxDocument", doc);
  return doc;
}
function getDocumentOrmPrototype(rxCollection) {
  var proto = {};
  Object.entries(rxCollection.methods).forEach(([k, v]) => {
    proto[k] = v;
  });
  return proto;
}

// node_modules/rxdb/dist/esm/replication-protocol/checkpoint.js
function getLastCheckpointDoc(state, direction) {
  return __async(this, null, function* () {
    var checkpointDocId = getComposedPrimaryKeyOfDocumentData(state.input.metaInstance.schema, {
      isCheckpoint: "1",
      itemId: direction
    });
    var checkpointResult = yield state.input.metaInstance.findDocumentsById([checkpointDocId], false);
    var checkpointDoc = checkpointResult[0];
    state.lastCheckpointDoc[direction] = checkpointDoc;
    if (checkpointDoc) {
      return checkpointDoc.checkpointData;
    } else {
      return void 0;
    }
  });
}
function setCheckpoint(state, direction, checkpoint) {
  return __async(this, null, function* () {
    state.checkpointQueue = state.checkpointQueue.then(() => __async(this, null, function* () {
      var previousCheckpointDoc = state.lastCheckpointDoc[direction];
      if (checkpoint && /**
       * If the replication is already canceled,
       * we do not write a checkpoint
       * because that could mean we write a checkpoint
       * for data that has been fetched from the master
       * but not been written to the child.
       */
      !state.events.canceled.getValue() && /**
       * Only write checkpoint if it is different from before
       * to have less writes to the storage.
       */
      (!previousCheckpointDoc || JSON.stringify(previousCheckpointDoc.checkpointData) !== JSON.stringify(checkpoint))) {
        var newDoc = {
          id: "",
          isCheckpoint: "1",
          itemId: direction,
          _deleted: false,
          _attachments: {},
          checkpointData: checkpoint,
          _meta: getDefaultRxDocumentMeta(),
          _rev: getDefaultRevision()
        };
        newDoc.id = getComposedPrimaryKeyOfDocumentData(state.input.metaInstance.schema, newDoc);
        while (!state.events.canceled.getValue()) {
          if (previousCheckpointDoc) {
            newDoc.checkpointData = stackCheckpoints([previousCheckpointDoc.checkpointData, newDoc.checkpointData]);
          }
          newDoc._meta.lwt = now();
          newDoc._rev = createRevision(yield state.checkpointKey, previousCheckpointDoc);
          if (state.events.canceled.getValue()) {
            return;
          }
          var result = yield state.input.metaInstance.bulkWrite([{
            previous: previousCheckpointDoc,
            document: newDoc
          }], "replication-set-checkpoint");
          var sucessDoc = result.success[0];
          if (sucessDoc) {
            state.lastCheckpointDoc[direction] = sucessDoc;
            return;
          } else {
            var error = result.error[0];
            if (error.status !== 409) {
              throw error;
            } else {
              previousCheckpointDoc = ensureNotFalsy(error.documentInDb);
              newDoc._rev = createRevision(yield state.checkpointKey, previousCheckpointDoc);
            }
          }
        }
      }
    }));
    yield state.checkpointQueue;
  });
}
function getCheckpointKey(input) {
  return __async(this, null, function* () {
    var hash = yield input.hashFunction([input.identifier, input.forkInstance.databaseName, input.forkInstance.collectionName].join("||"));
    return "rx_storage_replication_" + hash;
  });
}

// node_modules/rxdb/dist/esm/replication-protocol/helper.js
function docStateToWriteDoc(databaseInstanceToken, hasAttachments, keepMeta, docState, previous) {
  var docData = Object.assign({}, docState, {
    _attachments: hasAttachments && docState._attachments ? docState._attachments : {},
    _meta: keepMeta ? docState._meta : Object.assign({}, previous ? previous._meta : {}, {
      lwt: now()
    }),
    _rev: keepMeta ? docState._rev : getDefaultRevision()
  });
  if (!docData._rev) {
    docData._rev = createRevision(databaseInstanceToken, previous);
  }
  return docData;
}
function writeDocToDocState(writeDoc, keepAttachments, keepMeta) {
  var ret = flatClone(writeDoc);
  if (!keepAttachments) {
    delete ret._attachments;
  }
  if (!keepMeta) {
    delete ret._meta;
    delete ret._rev;
  }
  return ret;
}
function stripAttachmentsDataFromMetaWriteRows(state, rows) {
  if (!state.hasAttachments) {
    return rows;
  }
  return rows.map((row) => {
    var document = clone(row.document);
    document.docData = stripAttachmentsDataFromDocument(document.docData);
    return {
      document,
      previous: row.previous
    };
  });
}
function getUnderlyingPersistentStorage(instance) {
  while (true) {
    if (instance.underlyingPersistentStorage) {
      instance = instance.underlyingPersistentStorage;
    } else {
      return instance;
    }
  }
}

// node_modules/rxdb/dist/esm/replication-protocol/meta-instance.js
var META_INSTANCE_SCHEMA_TITLE = "RxReplicationProtocolMetaData";
function getRxReplicationMetaInstanceSchema(replicatedDocumentsSchema, encrypted) {
  var parentPrimaryKeyLength = getLengthOfPrimaryKey(replicatedDocumentsSchema);
  var baseSchema = {
    title: META_INSTANCE_SCHEMA_TITLE,
    primaryKey: {
      key: "id",
      fields: ["itemId", "isCheckpoint"],
      separator: "|"
    },
    type: "object",
    version: replicatedDocumentsSchema.version,
    additionalProperties: false,
    properties: {
      id: {
        type: "string",
        minLength: 1,
        // add +1 for the '|' and +1 for the 'isCheckpoint' flag
        maxLength: parentPrimaryKeyLength + 2
      },
      isCheckpoint: {
        type: "string",
        enum: ["0", "1"],
        minLength: 1,
        maxLength: 1
      },
      itemId: {
        type: "string",
        /**
         * ensure that all values of RxStorageReplicationDirection ('DOWN' has 4 chars) fit into it
         * because checkpoints use the itemId field for that.
         */
        maxLength: parentPrimaryKeyLength > 4 ? parentPrimaryKeyLength : 4
      },
      checkpointData: {
        type: "object",
        additionalProperties: true
      },
      docData: {
        type: "object",
        properties: replicatedDocumentsSchema.properties
      },
      isResolvedConflict: {
        type: "string"
      }
    },
    keyCompression: replicatedDocumentsSchema.keyCompression,
    required: ["id", "isCheckpoint", "itemId"]
  };
  if (encrypted) {
    baseSchema.encrypted = ["docData"];
  }
  var metaInstanceSchema = fillWithDefaultSettings(baseSchema);
  return metaInstanceSchema;
}
function getAssumedMasterState(state, docIds) {
  return state.input.metaInstance.findDocumentsById(docIds.map((docId) => {
    var useId = getComposedPrimaryKeyOfDocumentData(state.input.metaInstance.schema, {
      itemId: docId,
      isCheckpoint: "0"
    });
    return useId;
  }), true).then((metaDocs) => {
    var ret = {};
    Object.values(metaDocs).forEach((metaDoc) => {
      ret[metaDoc.itemId] = {
        docData: metaDoc.docData,
        metaDocument: metaDoc
      };
    });
    return ret;
  });
}
function getMetaWriteRow(state, newMasterDocState, previous, isResolvedConflict) {
  return __async(this, null, function* () {
    var docId = newMasterDocState[state.primaryPath];
    var newMeta = previous ? flatCloneDocWithMeta(previous) : {
      id: "",
      isCheckpoint: "0",
      itemId: docId,
      docData: newMasterDocState,
      _attachments: {},
      _deleted: false,
      _rev: getDefaultRevision(),
      _meta: {
        lwt: 0
      }
    };
    newMeta.docData = newMasterDocState;
    if (isResolvedConflict) {
      newMeta.isResolvedConflict = isResolvedConflict;
    }
    newMeta._meta.lwt = now();
    newMeta.id = getComposedPrimaryKeyOfDocumentData(state.input.metaInstance.schema, newMeta);
    newMeta._rev = createRevision(yield state.checkpointKey, previous);
    var ret = {
      previous,
      document: newMeta
    };
    return ret;
  });
}

// node_modules/rxdb/dist/esm/replication-protocol/downstream.js
function startReplicationDownstream(state) {
  return __async(this, null, function* () {
    if (state.input.initialCheckpoint && state.input.initialCheckpoint.downstream) {
      var checkpointDoc = yield getLastCheckpointDoc(state, "down");
      if (!checkpointDoc) {
        yield setCheckpoint(state, "down", state.input.initialCheckpoint.downstream);
      }
    }
    var identifierHash = yield state.input.hashFunction(state.input.identifier);
    var replicationHandler = state.input.replicationHandler;
    var timer = 0;
    var openTasks = [];
    function addNewTask(task) {
      state.stats.down.addNewTask = state.stats.down.addNewTask + 1;
      var taskWithTime = {
        time: timer++,
        task
      };
      openTasks.push(taskWithTime);
      state.streamQueue.down = state.streamQueue.down.then(() => {
        var useTasks = [];
        while (openTasks.length > 0) {
          state.events.active.down.next(true);
          var innerTaskWithTime = ensureNotFalsy(openTasks.shift());
          if (innerTaskWithTime.time < lastTimeMasterChangesRequested) {
            continue;
          }
          if (innerTaskWithTime.task === "RESYNC") {
            if (useTasks.length === 0) {
              useTasks.push(innerTaskWithTime.task);
              break;
            } else {
              break;
            }
          }
          useTasks.push(innerTaskWithTime.task);
        }
        if (useTasks.length === 0) {
          return;
        }
        if (useTasks[0] === "RESYNC") {
          return downstreamResyncOnce();
        } else {
          return downstreamProcessChanges(useTasks);
        }
      }).then(() => {
        state.events.active.down.next(false);
        if (!state.firstSyncDone.down.getValue() && !state.events.canceled.getValue()) {
          state.firstSyncDone.down.next(true);
        }
      });
    }
    addNewTask("RESYNC");
    if (!state.events.canceled.getValue()) {
      var sub = replicationHandler.masterChangeStream$.pipe(mergeMap((ev) => __async(this, null, function* () {
        yield firstValueFrom(state.events.active.up.pipe(filter((s) => !s)));
        return ev;
      }))).subscribe((task) => {
        state.stats.down.masterChangeStreamEmit = state.stats.down.masterChangeStreamEmit + 1;
        addNewTask(task);
      });
      firstValueFrom(state.events.canceled.pipe(filter((canceled) => !!canceled))).then(() => sub.unsubscribe());
    }
    var lastTimeMasterChangesRequested = -1;
    function downstreamResyncOnce() {
      return __async(this, null, function* () {
        state.stats.down.downstreamResyncOnce = state.stats.down.downstreamResyncOnce + 1;
        if (state.events.canceled.getValue()) {
          return;
        }
        state.checkpointQueue = state.checkpointQueue.then(() => getLastCheckpointDoc(state, "down"));
        var lastCheckpoint = yield state.checkpointQueue;
        var promises = [];
        while (!state.events.canceled.getValue()) {
          lastTimeMasterChangesRequested = timer++;
          var downResult = yield replicationHandler.masterChangesSince(lastCheckpoint, state.input.pullBatchSize);
          if (downResult.documents.length === 0) {
            break;
          }
          lastCheckpoint = stackCheckpoints([lastCheckpoint, downResult.checkpoint]);
          promises.push(persistFromMaster(downResult.documents, lastCheckpoint));
          if (downResult.documents.length < state.input.pullBatchSize) {
            break;
          }
        }
        yield Promise.all(promises);
      });
    }
    function downstreamProcessChanges(tasks) {
      state.stats.down.downstreamProcessChanges = state.stats.down.downstreamProcessChanges + 1;
      var docsOfAllTasks = [];
      var lastCheckpoint = null;
      tasks.forEach((task) => {
        if (task === "RESYNC") {
          throw new Error("SNH");
        }
        appendToArray(docsOfAllTasks, task.documents);
        lastCheckpoint = stackCheckpoints([lastCheckpoint, task.checkpoint]);
      });
      return persistFromMaster(docsOfAllTasks, ensureNotFalsy(lastCheckpoint));
    }
    var persistenceQueue = PROMISE_RESOLVE_VOID;
    var nonPersistedFromMaster = {
      docs: {}
    };
    function persistFromMaster(docs, checkpoint) {
      var primaryPath = state.primaryPath;
      state.stats.down.persistFromMaster = state.stats.down.persistFromMaster + 1;
      docs.forEach((docData) => {
        var docId = docData[primaryPath];
        nonPersistedFromMaster.docs[docId] = docData;
      });
      nonPersistedFromMaster.checkpoint = checkpoint;
      persistenceQueue = persistenceQueue.then(() => {
        var downDocsById = nonPersistedFromMaster.docs;
        nonPersistedFromMaster.docs = {};
        var useCheckpoint = nonPersistedFromMaster.checkpoint;
        var docIds = Object.keys(downDocsById);
        if (state.events.canceled.getValue() || docIds.length === 0) {
          return PROMISE_RESOLVE_VOID;
        }
        var writeRowsToFork = [];
        var writeRowsToForkById = {};
        var writeRowsToMeta = {};
        var useMetaWriteRows = [];
        return Promise.all([state.input.forkInstance.findDocumentsById(docIds, true), getAssumedMasterState(state, docIds)]).then(([currentForkStateList, assumedMasterState]) => {
          var currentForkState = /* @__PURE__ */ new Map();
          currentForkStateList.forEach((doc) => currentForkState.set(doc[primaryPath], doc));
          return Promise.all(docIds.map((docId) => __async(this, null, function* () {
            var forkStateFullDoc = currentForkState.get(docId);
            var forkStateDocData = forkStateFullDoc ? writeDocToDocState(forkStateFullDoc, state.hasAttachments, false) : void 0;
            var masterState = downDocsById[docId];
            var assumedMaster = assumedMasterState[docId];
            if (assumedMaster && forkStateFullDoc && assumedMaster.metaDocument.isResolvedConflict === forkStateFullDoc._rev) {
              yield state.streamQueue.up;
            }
            var isAssumedMasterEqualToForkState = !assumedMaster || !forkStateDocData ? false : yield state.input.conflictHandler({
              realMasterState: assumedMaster.docData,
              newDocumentState: forkStateDocData
            }, "downstream-check-if-equal-0").then((r) => r.isEqual);
            if (!isAssumedMasterEqualToForkState && assumedMaster && assumedMaster.docData._rev && forkStateFullDoc && forkStateFullDoc._meta[state.input.identifier] && getHeightOfRevision(forkStateFullDoc._rev) === forkStateFullDoc._meta[state.input.identifier]) {
              isAssumedMasterEqualToForkState = true;
            }
            if (forkStateFullDoc && assumedMaster && isAssumedMasterEqualToForkState === false || forkStateFullDoc && !assumedMaster) {
              return PROMISE_RESOLVE_VOID;
            }
            var areStatesExactlyEqual = !forkStateDocData ? false : yield state.input.conflictHandler({
              realMasterState: masterState,
              newDocumentState: forkStateDocData
            }, "downstream-check-if-equal-1").then((r) => r.isEqual);
            if (forkStateDocData && areStatesExactlyEqual) {
              if (!assumedMaster || isAssumedMasterEqualToForkState === false) {
                useMetaWriteRows.push(yield getMetaWriteRow(state, forkStateDocData, assumedMaster ? assumedMaster.metaDocument : void 0));
              }
              return PROMISE_RESOLVE_VOID;
            }
            var newForkState = Object.assign({}, masterState, forkStateFullDoc ? {
              _meta: flatClone(forkStateFullDoc._meta),
              _attachments: state.hasAttachments && masterState._attachments ? masterState._attachments : {},
              _rev: getDefaultRevision()
            } : {
              _meta: {
                lwt: now()
              },
              _rev: getDefaultRevision(),
              _attachments: state.hasAttachments && masterState._attachments ? masterState._attachments : {}
            });
            if (masterState._rev) {
              var nextRevisionHeight = !forkStateFullDoc ? 1 : getHeightOfRevision(forkStateFullDoc._rev) + 1;
              newForkState._meta[state.input.identifier] = nextRevisionHeight;
              if (state.input.keepMeta) {
                newForkState._rev = masterState._rev;
              }
            }
            if (state.input.keepMeta && masterState._meta) {
              newForkState._meta = masterState._meta;
            }
            var forkWriteRow = {
              previous: forkStateFullDoc,
              document: newForkState
            };
            forkWriteRow.document._rev = forkWriteRow.document._rev ? forkWriteRow.document._rev : createRevision(identifierHash, forkWriteRow.previous);
            writeRowsToFork.push(forkWriteRow);
            writeRowsToForkById[docId] = forkWriteRow;
            writeRowsToMeta[docId] = yield getMetaWriteRow(state, masterState, assumedMaster ? assumedMaster.metaDocument : void 0);
          })));
        }).then(() => __async(this, null, function* () {
          if (writeRowsToFork.length > 0) {
            return state.input.forkInstance.bulkWrite(writeRowsToFork, yield state.downstreamBulkWriteFlag).then((forkWriteResult) => {
              forkWriteResult.success.forEach((doc) => {
                var docId = doc[primaryPath];
                state.events.processed.down.next(writeRowsToForkById[docId]);
                useMetaWriteRows.push(writeRowsToMeta[docId]);
              });
              forkWriteResult.error.forEach((error) => {
                if (error.status === 409) {
                  return;
                }
                state.events.error.next(newRxError("RC_PULL", {
                  writeError: error
                }));
              });
            });
          }
        })).then(() => {
          if (useMetaWriteRows.length > 0) {
            return state.input.metaInstance.bulkWrite(stripAttachmentsDataFromMetaWriteRows(state, useMetaWriteRows), "replication-down-write-meta").then((metaWriteResult) => {
              metaWriteResult.error.forEach((writeError) => {
                state.events.error.next(newRxError("RC_PULL", {
                  id: writeError.documentId,
                  writeError
                }));
              });
            });
          }
        }).then(() => {
          setCheckpoint(state, "down", useCheckpoint);
        });
      }).catch((unhandledError) => state.events.error.next(unhandledError));
      return persistenceQueue;
    }
  });
}

// node_modules/rxdb/dist/esm/replication-protocol/conflicts.js
var defaultConflictHandler = function(i, _context) {
  var newDocumentState = stripAttachmentsDataFromDocument(i.newDocumentState);
  var realMasterState = stripAttachmentsDataFromDocument(i.realMasterState);
  if (deepEqual(newDocumentState, realMasterState)) {
    return Promise.resolve({
      isEqual: true
    });
  }
  return Promise.resolve({
    isEqual: false,
    documentData: i.realMasterState
  });
};
function resolveConflictError(state, input, forkState) {
  return __async(this, null, function* () {
    var conflictHandler = state.input.conflictHandler;
    var conflictHandlerOutput = yield conflictHandler(input, "replication-resolve-conflict");
    if (conflictHandlerOutput.isEqual) {
      return void 0;
    } else {
      var resolvedDoc = Object.assign({}, conflictHandlerOutput.documentData, {
        /**
         * Because the resolved conflict is written to the fork,
         * we have to keep/update the forks _meta data, not the masters.
         */
        _meta: flatClone(forkState._meta),
        _rev: getDefaultRevision(),
        _attachments: flatClone(forkState._attachments)
      });
      resolvedDoc._meta.lwt = now();
      resolvedDoc._rev = createRevision(yield state.checkpointKey, forkState);
      return {
        resolvedDoc,
        output: conflictHandlerOutput
      };
    }
  });
}

// node_modules/rxdb/dist/esm/plugins/attachments/attachments-utils.js
function assignMethodsToAttachment(attachment) {
  Object.entries(attachment.doc.collection.attachments).forEach(([funName, fun]) => {
    Object.defineProperty(attachment, funName, {
      get: () => fun.bind(attachment)
    });
  });
}
function fillWriteDataForAttachmentsChange(primaryPath, storageInstance, newDocument, originalDocument) {
  return __async(this, null, function* () {
    if (!newDocument._attachments || originalDocument && !originalDocument._attachments) {
      throw new Error("_attachments missing");
    }
    var docId = newDocument[primaryPath];
    var originalAttachmentsIds = new Set(originalDocument && originalDocument._attachments ? Object.keys(originalDocument._attachments) : []);
    yield Promise.all(Object.entries(newDocument._attachments).map((_0) => __async(this, [_0], function* ([key, value]) {
      if ((!originalAttachmentsIds.has(key) || originalDocument && ensureNotFalsy(originalDocument._attachments)[key].digest !== value.digest) && !value.data) {
        var attachmentDataString = yield storageInstance.getAttachmentData(docId, key, value.digest);
        value.data = attachmentDataString;
      }
    })));
    return newDocument;
  });
}

// node_modules/rxdb/dist/esm/plugins/attachments/index.js
var RxAttachment = function() {
  function RxAttachment2({
    doc,
    id,
    type,
    length,
    digest
  }) {
    this.doc = doc;
    this.id = id;
    this.type = type;
    this.length = length;
    this.digest = digest;
    assignMethodsToAttachment(this);
  }
  var _proto = RxAttachment2.prototype;
  _proto.remove = function remove() {
    return this.doc.collection.incrementalWriteQueue.addWrite(this.doc._data, (docWriteData) => {
      delete docWriteData._attachments[this.id];
      return docWriteData;
    }).then(() => {
    });
  };
  _proto.getData = function getData() {
    return __async(this, null, function* () {
      var plainDataBase64 = yield this.doc.collection.storageInstance.getAttachmentData(this.doc.primary, this.id, this.digest);
      var ret = yield createBlobFromBase64(plainDataBase64, this.type);
      return ret;
    });
  };
  _proto.getStringData = function getStringData() {
    return __async(this, null, function* () {
      var data = yield this.getData();
      var asString = yield blobToString(data);
      return asString;
    });
  };
  return RxAttachment2;
}();

// node_modules/rxdb/dist/esm/replication-protocol/upstream.js
function startReplicationUpstream(state) {
  return __async(this, null, function* () {
    if (state.input.initialCheckpoint && state.input.initialCheckpoint.upstream) {
      var checkpointDoc = yield getLastCheckpointDoc(state, "up");
      if (!checkpointDoc) {
        yield setCheckpoint(state, "up", state.input.initialCheckpoint.upstream);
      }
    }
    var replicationHandler = state.input.replicationHandler;
    state.streamQueue.up = state.streamQueue.up.then(() => {
      return upstreamInitialSync().then(() => {
        processTasks();
      });
    });
    var timer = 0;
    var initialSyncStartTime = -1;
    var openTasks = [];
    var persistenceQueue = PROMISE_RESOLVE_FALSE;
    var nonPersistedFromMaster = {
      docs: {}
    };
    var sub = state.input.forkInstance.changeStream().subscribe((eventBulk) => __async(this, null, function* () {
      if (eventBulk.context === (yield state.downstreamBulkWriteFlag)) {
        return;
      }
      state.stats.up.forkChangeStreamEmit = state.stats.up.forkChangeStreamEmit + 1;
      openTasks.push({
        task: eventBulk,
        time: timer++
      });
      if (!state.events.active.up.getValue()) {
        state.events.active.up.next(true);
      }
      if (state.input.waitBeforePersist) {
        return state.input.waitBeforePersist().then(() => processTasks());
      } else {
        return processTasks();
      }
    }));
    firstValueFrom(state.events.canceled.pipe(filter((canceled) => !!canceled))).then(() => sub.unsubscribe());
    function upstreamInitialSync() {
      return __async(this, null, function* () {
        state.stats.up.upstreamInitialSync = state.stats.up.upstreamInitialSync + 1;
        if (state.events.canceled.getValue()) {
          return;
        }
        state.checkpointQueue = state.checkpointQueue.then(() => getLastCheckpointDoc(state, "up"));
        var lastCheckpoint = yield state.checkpointQueue;
        var promises = /* @__PURE__ */ new Set();
        var _loop = function() {
          return __async(this, null, function* () {
            initialSyncStartTime = timer++;
            if (promises.size > 3) {
              yield Promise.race(Array.from(promises));
            }
            var upResult = yield getChangedDocumentsSince(state.input.forkInstance, state.input.pushBatchSize, lastCheckpoint);
            if (upResult.documents.length === 0) {
              return 1;
            }
            lastCheckpoint = stackCheckpoints([lastCheckpoint, upResult.checkpoint]);
            var promise = persistToMaster(upResult.documents, ensureNotFalsy(lastCheckpoint));
            promises.add(promise);
            promise.catch().then(() => promises.delete(promise));
          });
        };
        while (!state.events.canceled.getValue()) {
          if (yield _loop()) break;
        }
        var resolvedPromises = yield Promise.all(promises);
        var hadConflicts = resolvedPromises.find((r) => !!r);
        if (hadConflicts) {
          yield upstreamInitialSync();
        } else if (!state.firstSyncDone.up.getValue() && !state.events.canceled.getValue()) {
          state.firstSyncDone.up.next(true);
        }
      });
    }
    function processTasks() {
      if (state.events.canceled.getValue() || openTasks.length === 0) {
        state.events.active.up.next(false);
        return;
      }
      state.stats.up.processTasks = state.stats.up.processTasks + 1;
      state.events.active.up.next(true);
      state.streamQueue.up = state.streamQueue.up.then(() => {
        var docs = [];
        var checkpoint = {};
        while (openTasks.length > 0) {
          var taskWithTime = ensureNotFalsy(openTasks.shift());
          if (taskWithTime.time < initialSyncStartTime) {
            continue;
          }
          appendToArray(docs, taskWithTime.task.events.map((r) => {
            return r.documentData;
          }));
          checkpoint = stackCheckpoints([checkpoint, taskWithTime.task.checkpoint]);
        }
        var promise = docs.length === 0 ? PROMISE_RESOLVE_FALSE : persistToMaster(docs, checkpoint);
        return promise.then(() => {
          if (openTasks.length === 0) {
            state.events.active.up.next(false);
          } else {
            processTasks();
          }
        });
      });
    }
    function persistToMaster(docs, checkpoint) {
      state.stats.up.persistToMaster = state.stats.up.persistToMaster + 1;
      docs.forEach((docData) => {
        var docId = docData[state.primaryPath];
        nonPersistedFromMaster.docs[docId] = docData;
      });
      nonPersistedFromMaster.checkpoint = checkpoint;
      persistenceQueue = persistenceQueue.then(() => __async(this, null, function* () {
        if (state.events.canceled.getValue()) {
          return false;
        }
        var upDocsById = nonPersistedFromMaster.docs;
        nonPersistedFromMaster.docs = {};
        var useCheckpoint = nonPersistedFromMaster.checkpoint;
        var docIds = Object.keys(upDocsById);
        if (docIds.length === 0) {
          return false;
        }
        var assumedMasterState = yield getAssumedMasterState(state, docIds);
        var writeRowsToMaster = {};
        var writeRowsToMasterIds = [];
        var writeRowsToMeta = {};
        var forkStateById = {};
        yield Promise.all(docIds.map((docId) => __async(this, null, function* () {
          var fullDocData = upDocsById[docId];
          forkStateById[docId] = fullDocData;
          var docData = writeDocToDocState(fullDocData, state.hasAttachments, !!state.input.keepMeta);
          var assumedMasterDoc = assumedMasterState[docId];
          if (assumedMasterDoc && // if the isResolvedConflict is correct, we do not have to compare the documents.
          assumedMasterDoc.metaDocument.isResolvedConflict !== fullDocData._rev && (yield state.input.conflictHandler({
            realMasterState: assumedMasterDoc.docData,
            newDocumentState: docData
          }, "upstream-check-if-equal")).isEqual || /**
           * If the master works with _rev fields,
           * we use that to check if our current doc state
           * is different from the assumedMasterDoc.
           */
          assumedMasterDoc && assumedMasterDoc.docData._rev && getHeightOfRevision(fullDocData._rev) === fullDocData._meta[state.input.identifier]) {
            return;
          }
          writeRowsToMasterIds.push(docId);
          writeRowsToMaster[docId] = {
            assumedMasterState: assumedMasterDoc ? assumedMasterDoc.docData : void 0,
            newDocumentState: docData
          };
          writeRowsToMeta[docId] = yield getMetaWriteRow(state, docData, assumedMasterDoc ? assumedMasterDoc.metaDocument : void 0);
        })));
        if (writeRowsToMasterIds.length === 0) {
          return false;
        }
        var writeRowsArray = Object.values(writeRowsToMaster);
        var conflictIds = /* @__PURE__ */ new Set();
        var conflictsById = {};
        var writeBatches = batchArray(writeRowsArray, state.input.pushBatchSize);
        yield Promise.all(writeBatches.map((writeBatch) => __async(this, null, function* () {
          if (state.hasAttachments) {
            yield Promise.all(writeBatch.map((row) => __async(this, null, function* () {
              row.newDocumentState = yield fillWriteDataForAttachmentsChange(state.primaryPath, state.input.forkInstance, clone(row.newDocumentState), row.assumedMasterState);
            })));
          }
          var masterWriteResult = yield replicationHandler.masterWrite(writeBatch);
          masterWriteResult.forEach((conflictDoc) => {
            var id = conflictDoc[state.primaryPath];
            conflictIds.add(id);
            conflictsById[id] = conflictDoc;
          });
        })));
        var useWriteRowsToMeta = [];
        writeRowsToMasterIds.forEach((docId) => {
          if (!conflictIds.has(docId)) {
            state.events.processed.up.next(writeRowsToMaster[docId]);
            useWriteRowsToMeta.push(writeRowsToMeta[docId]);
          }
        });
        if (state.events.canceled.getValue()) {
          return false;
        }
        if (useWriteRowsToMeta.length > 0) {
          yield state.input.metaInstance.bulkWrite(stripAttachmentsDataFromMetaWriteRows(state, useWriteRowsToMeta), "replication-up-write-meta");
        }
        var hadConflictWrites = false;
        if (conflictIds.size > 0) {
          state.stats.up.persistToMasterHadConflicts = state.stats.up.persistToMasterHadConflicts + 1;
          var conflictWriteFork = [];
          var conflictWriteMeta = {};
          yield Promise.all(Object.entries(conflictsById).map(([docId, realMasterState]) => {
            var writeToMasterRow = writeRowsToMaster[docId];
            var input = {
              newDocumentState: writeToMasterRow.newDocumentState,
              assumedMasterState: writeToMasterRow.assumedMasterState,
              realMasterState
            };
            return resolveConflictError(state, input, forkStateById[docId]).then((resolved) => __async(this, null, function* () {
              if (resolved) {
                state.events.resolvedConflicts.next({
                  input,
                  output: resolved.output
                });
                conflictWriteFork.push({
                  previous: forkStateById[docId],
                  document: resolved.resolvedDoc
                });
                var assumedMasterDoc = assumedMasterState[docId];
                conflictWriteMeta[docId] = yield getMetaWriteRow(state, ensureNotFalsy(realMasterState), assumedMasterDoc ? assumedMasterDoc.metaDocument : void 0, resolved.resolvedDoc._rev);
              }
            }));
          }));
          if (conflictWriteFork.length > 0) {
            hadConflictWrites = true;
            state.stats.up.persistToMasterConflictWrites = state.stats.up.persistToMasterConflictWrites + 1;
            var forkWriteResult = yield state.input.forkInstance.bulkWrite(conflictWriteFork, "replication-up-write-conflict");
            var useMetaWrites = [];
            forkWriteResult.success.forEach((docData) => {
              var docId = docData[state.primaryPath];
              useMetaWrites.push(conflictWriteMeta[docId]);
            });
            if (useMetaWrites.length > 0) {
              yield state.input.metaInstance.bulkWrite(stripAttachmentsDataFromMetaWriteRows(state, useMetaWrites), "replication-up-write-conflict-meta");
            }
          }
        }
        setCheckpoint(state, "up", useCheckpoint);
        return hadConflictWrites;
      })).catch((unhandledError) => {
        state.events.error.next(unhandledError);
        return false;
      });
      return persistenceQueue;
    }
  });
}

// node_modules/rxdb/dist/esm/replication-protocol/index.js
function replicateRxStorageInstance(input) {
  input = flatClone(input);
  input.forkInstance = getUnderlyingPersistentStorage(input.forkInstance);
  input.metaInstance = getUnderlyingPersistentStorage(input.metaInstance);
  var checkpointKeyPromise = getCheckpointKey(input);
  var state = {
    primaryPath: getPrimaryFieldOfPrimaryKey(input.forkInstance.schema.primaryKey),
    hasAttachments: !!input.forkInstance.schema.attachments,
    input,
    checkpointKey: checkpointKeyPromise,
    downstreamBulkWriteFlag: checkpointKeyPromise.then((checkpointKey) => "replication-downstream-" + checkpointKey),
    events: {
      canceled: new BehaviorSubject(false),
      active: {
        down: new BehaviorSubject(true),
        up: new BehaviorSubject(true)
      },
      processed: {
        down: new Subject(),
        up: new Subject()
      },
      resolvedConflicts: new Subject(),
      error: new Subject()
    },
    stats: {
      down: {
        addNewTask: 0,
        downstreamProcessChanges: 0,
        downstreamResyncOnce: 0,
        masterChangeStreamEmit: 0,
        persistFromMaster: 0
      },
      up: {
        forkChangeStreamEmit: 0,
        persistToMaster: 0,
        persistToMasterConflictWrites: 0,
        persistToMasterHadConflicts: 0,
        processTasks: 0,
        upstreamInitialSync: 0
      }
    },
    firstSyncDone: {
      down: new BehaviorSubject(false),
      up: new BehaviorSubject(false)
    },
    streamQueue: {
      down: PROMISE_RESOLVE_VOID,
      up: PROMISE_RESOLVE_VOID
    },
    checkpointQueue: PROMISE_RESOLVE_VOID,
    lastCheckpointDoc: {}
  };
  startReplicationDownstream(state);
  startReplicationUpstream(state);
  return state;
}
function awaitRxStorageReplicationFirstInSync(state) {
  return firstValueFrom(combineLatest([state.firstSyncDone.down.pipe(filter((v) => !!v)), state.firstSyncDone.up.pipe(filter((v) => !!v))])).then(() => {
  });
}
function awaitRxStorageReplicationInSync(replicationState) {
  return Promise.all([replicationState.streamQueue.up, replicationState.streamQueue.down, replicationState.checkpointQueue]);
}
function awaitRxStorageReplicationIdle(state) {
  return __async(this, null, function* () {
    yield awaitRxStorageReplicationFirstInSync(state);
    while (true) {
      var {
        down,
        up
      } = state.streamQueue;
      yield Promise.all([up, down]);
      if (down === state.streamQueue.down && up === state.streamQueue.up) {
        return;
      }
    }
  });
}
function rxStorageInstanceToReplicationHandler(instance, conflictHandler, databaseInstanceToken, keepMeta = false) {
  instance = getUnderlyingPersistentStorage(instance);
  var hasAttachments = !!instance.schema.attachments;
  var primaryPath = getPrimaryFieldOfPrimaryKey(instance.schema.primaryKey);
  var replicationHandler = {
    masterChangeStream$: instance.changeStream().pipe(mergeMap((eventBulk) => __async(this, null, function* () {
      var ret = {
        checkpoint: eventBulk.checkpoint,
        documents: yield Promise.all(eventBulk.events.map((event) => __async(this, null, function* () {
          var docData = writeDocToDocState(event.documentData, hasAttachments, keepMeta);
          if (hasAttachments) {
            docData = yield fillWriteDataForAttachmentsChange(
              primaryPath,
              instance,
              clone(docData),
              /**
               * Notice that the master never knows
               * the client state of the document.
               * Therefore we always send all attachments data.
               */
              void 0
            );
          }
          return docData;
        })))
      };
      return ret;
    }))),
    masterChangesSince(checkpoint, batchSize) {
      return getChangedDocumentsSince(instance, batchSize, checkpoint).then((result) => __async(this, null, function* () {
        return {
          checkpoint: result.documents.length > 0 ? result.checkpoint : checkpoint,
          documents: yield Promise.all(result.documents.map((plainDocumentData) => __async(this, null, function* () {
            var docData = writeDocToDocState(plainDocumentData, hasAttachments, keepMeta);
            if (hasAttachments) {
              docData = yield fillWriteDataForAttachmentsChange(
                primaryPath,
                instance,
                clone(docData),
                /**
                 * Notice the the master never knows
                 * the client state of the document.
                 * Therefore we always send all attachments data.
                 */
                void 0
              );
            }
            return docData;
          })))
        };
      }));
    },
    masterWrite(rows) {
      return __async(this, null, function* () {
        var rowById = {};
        rows.forEach((row) => {
          var docId = row.newDocumentState[primaryPath];
          rowById[docId] = row;
        });
        var ids = Object.keys(rowById);
        var masterDocsStateList = yield instance.findDocumentsById(ids, true);
        var masterDocsState = /* @__PURE__ */ new Map();
        masterDocsStateList.forEach((doc) => masterDocsState.set(doc[primaryPath], doc));
        var conflicts = [];
        var writeRows = [];
        yield Promise.all(Object.entries(rowById).map((_0) => __async(this, [_0], function* ([id, row]) {
          var masterState = masterDocsState.get(id);
          if (!masterState) {
            writeRows.push({
              document: docStateToWriteDoc(databaseInstanceToken, hasAttachments, keepMeta, row.newDocumentState)
            });
          } else if (masterState && !row.assumedMasterState) {
            conflicts.push(writeDocToDocState(masterState, hasAttachments, keepMeta));
          } else if ((yield conflictHandler({
            realMasterState: writeDocToDocState(masterState, hasAttachments, keepMeta),
            newDocumentState: ensureNotFalsy(row.assumedMasterState)
          }, "rxStorageInstanceToReplicationHandler-masterWrite")).isEqual === true) {
            writeRows.push({
              previous: masterState,
              document: docStateToWriteDoc(databaseInstanceToken, hasAttachments, keepMeta, row.newDocumentState, masterState)
            });
          } else {
            conflicts.push(writeDocToDocState(masterState, hasAttachments, keepMeta));
          }
        })));
        if (writeRows.length > 0) {
          var result = yield instance.bulkWrite(writeRows, "replication-master-write");
          result.error.forEach((err) => {
            if (err.status !== 409) {
              throw new Error("non conflict error");
            } else {
              conflicts.push(writeDocToDocState(ensureNotFalsy(err.documentInDb), hasAttachments, keepMeta));
            }
          });
        }
        return conflicts;
      });
    }
  };
  return replicationHandler;
}
function cancelRxStorageReplication(replicationState) {
  return __async(this, null, function* () {
    replicationState.events.canceled.next(true);
    replicationState.events.active.up.complete();
    replicationState.events.active.down.complete();
    replicationState.events.processed.up.complete();
    replicationState.events.processed.down.complete();
    replicationState.events.resolvedConflicts.complete();
    replicationState.events.canceled.complete();
    yield replicationState.checkpointQueue;
  });
}

// node_modules/rxdb/dist/esm/rx-collection.js
var HOOKS_WHEN = ["pre", "post"];
var HOOKS_KEYS = ["insert", "save", "remove", "create"];
var hooksApplied = false;
var RxCollectionBase = function() {
  function RxCollectionBase2(database, name, schema, internalStorageInstance, instanceCreationOptions = {}, migrationStrategies = {}, methods = {}, attachments = {}, options = {}, cacheReplacementPolicy = defaultCacheReplacementPolicy, statics = {}, conflictHandler = defaultConflictHandler) {
    this.storageInstance = {};
    this.timeouts = /* @__PURE__ */ new Set();
    this.incrementalWriteQueue = {};
    this._incrementalUpsertQueues = /* @__PURE__ */ new Map();
    this.synced = false;
    this.hooks = {};
    this._subs = [];
    this._docCache = {};
    this._queryCache = createQueryCache();
    this.$ = {};
    this.checkpoint$ = {};
    this._changeEventBuffer = {};
    this.onDestroy = [];
    this.destroyed = false;
    this.onRemove = [];
    this.database = database;
    this.name = name;
    this.schema = schema;
    this.internalStorageInstance = internalStorageInstance;
    this.instanceCreationOptions = instanceCreationOptions;
    this.migrationStrategies = migrationStrategies;
    this.methods = methods;
    this.attachments = attachments;
    this.options = options;
    this.cacheReplacementPolicy = cacheReplacementPolicy;
    this.statics = statics;
    this.conflictHandler = conflictHandler;
    _applyHookFunctions(this.asRxCollection);
  }
  var _proto = RxCollectionBase2.prototype;
  _proto.prepare = function prepare() {
    return __async(this, null, function* () {
      this.storageInstance = getWrappedStorageInstance(this.database, this.internalStorageInstance, this.schema.jsonSchema);
      this.incrementalWriteQueue = new IncrementalWriteQueue(this.storageInstance, this.schema.primaryPath, (newData, oldData) => beforeDocumentUpdateWrite(this, newData, oldData), (result) => this._runHooks("post", "save", result));
      var collectionEventBulks$ = this.database.eventBulks$.pipe(filter((changeEventBulk) => changeEventBulk.collectionName === this.name));
      this.$ = collectionEventBulks$.pipe(mergeMap((changeEventBulk) => changeEventBulk.events));
      this.checkpoint$ = collectionEventBulks$.pipe(map((changeEventBulk) => changeEventBulk.checkpoint));
      this._changeEventBuffer = createChangeEventBuffer(this.asRxCollection);
      var documentConstructor;
      this._docCache = new DocumentCache(this.schema.primaryPath, this.$.pipe(filter((cE) => !cE.isLocal)), (docData) => {
        if (!documentConstructor) {
          documentConstructor = getRxDocumentConstructor(this.asRxCollection);
        }
        return createNewRxDocument(this.asRxCollection, documentConstructor, docData);
      });
      var listenToRemoveSub = this.database.internalStore.changeStream().pipe(filter((bulk) => {
        var key = this.name + "-" + this.schema.version;
        var found = bulk.events.find((event) => {
          return event.documentData.context === "collection" && event.documentData.key === key && event.operation === "DELETE";
        });
        return !!found;
      })).subscribe(() => __async(this, null, function* () {
        yield this.destroy();
        yield Promise.all(this.onRemove.map((fn) => fn()));
      }));
      this._subs.push(listenToRemoveSub);
      var databaseStorageToken = yield this.database.storageToken;
      var subDocs = this.storageInstance.changeStream().subscribe((eventBulk) => {
        var events = new Array(eventBulk.events.length);
        var rawEvents = eventBulk.events;
        var collectionName = this.name;
        var deepFreezeWhenDevMode = overwritable.deepFreezeWhenDevMode;
        for (var index = 0; index < rawEvents.length; index++) {
          var event = rawEvents[index];
          events[index] = {
            documentId: event.documentId,
            collectionName,
            isLocal: false,
            operation: event.operation,
            documentData: deepFreezeWhenDevMode(event.documentData),
            previousDocumentData: deepFreezeWhenDevMode(event.previousDocumentData)
          };
        }
        var changeEventBulk = {
          id: eventBulk.id,
          internal: false,
          collectionName: this.name,
          storageToken: databaseStorageToken,
          events,
          databaseToken: this.database.token,
          checkpoint: eventBulk.checkpoint,
          context: eventBulk.context,
          endTime: eventBulk.endTime,
          startTime: eventBulk.startTime
        };
        this.database.$emit(changeEventBulk);
      });
      this._subs.push(subDocs);
      this._subs.push(this.storageInstance.conflictResultionTasks().subscribe((task) => {
        this.conflictHandler(task.input, task.context).then((output) => {
          this.storageInstance.resolveConflictResultionTask({
            id: task.id,
            output
          });
        });
      }));
      return PROMISE_RESOLVE_VOID;
    });
  };
  _proto.cleanup = function cleanup(_minimumDeletedTime) {
    ensureRxCollectionIsNotDestroyed(this);
    throw pluginMissing("cleanup");
  };
  _proto.migrationNeeded = function migrationNeeded() {
    throw pluginMissing("migration-schema");
  };
  _proto.getMigrationState = function getMigrationState() {
    throw pluginMissing("migration-schema");
  };
  _proto.startMigration = function startMigration(batchSize = 10) {
    ensureRxCollectionIsNotDestroyed(this);
    return this.getMigrationState().startMigration(batchSize);
  };
  _proto.migratePromise = function migratePromise(batchSize = 10) {
    return this.getMigrationState().migratePromise(batchSize);
  };
  _proto.insert = function insert(json) {
    return __async(this, null, function* () {
      ensureRxCollectionIsNotDestroyed(this);
      var writeResult = yield this.bulkInsert([json]);
      var isError = writeResult.error[0];
      throwIfIsStorageWriteError(this, json[this.schema.primaryPath], json, isError);
      var insertResult = ensureNotFalsy(writeResult.success[0]);
      return insertResult;
    });
  };
  _proto.bulkInsert = function bulkInsert(docsData) {
    return __async(this, null, function* () {
      ensureRxCollectionIsNotDestroyed(this);
      if (docsData.length === 0) {
        return {
          success: [],
          error: []
        };
      }
      var primaryPath = this.schema.primaryPath;
      var insertRows;
      if (this.hasHooks("pre", "insert")) {
        insertRows = yield Promise.all(docsData.map((docData2) => {
          var useDocData2 = fillObjectDataBeforeInsert(this.schema, docData2);
          return this._runHooks("pre", "insert", useDocData2).then(() => {
            return {
              document: useDocData2
            };
          });
        }));
      } else {
        insertRows = [];
        for (var index = 0; index < docsData.length; index++) {
          var docData = docsData[index];
          var useDocData = fillObjectDataBeforeInsert(this.schema, docData);
          insertRows[index] = {
            document: useDocData
          };
        }
      }
      var results = yield this.storageInstance.bulkWrite(insertRows, "rx-collection-bulk-insert");
      var rxDocuments = mapDocumentsDataToCacheDocs(this._docCache, results.success);
      if (this.hasHooks("post", "insert")) {
        var docsMap = /* @__PURE__ */ new Map();
        insertRows.forEach((row) => {
          var doc = row.document;
          docsMap.set(doc[primaryPath], doc);
        });
        yield Promise.all(rxDocuments.map((doc) => {
          return this._runHooks("post", "insert", docsMap.get(doc.primary), doc);
        }));
      }
      return {
        success: rxDocuments,
        error: results.error
      };
    });
  };
  _proto.bulkRemove = function bulkRemove(ids) {
    return __async(this, null, function* () {
      ensureRxCollectionIsNotDestroyed(this);
      var primaryPath = this.schema.primaryPath;
      if (ids.length === 0) {
        return {
          success: [],
          error: []
        };
      }
      var rxDocumentMap = yield this.findByIds(ids).exec();
      var docsData = [];
      var docsMap = /* @__PURE__ */ new Map();
      Array.from(rxDocumentMap.values()).forEach((rxDocument) => {
        var data = rxDocument.toMutableJSON(true);
        docsData.push(data);
        docsMap.set(rxDocument.primary, data);
      });
      yield Promise.all(docsData.map((doc) => {
        var primary = doc[this.schema.primaryPath];
        return this._runHooks("pre", "remove", doc, rxDocumentMap.get(primary));
      }));
      var removeDocs = docsData.map((doc) => {
        var writeDoc = flatClone(doc);
        writeDoc._deleted = true;
        return {
          previous: doc,
          document: writeDoc
        };
      });
      var results = yield this.storageInstance.bulkWrite(removeDocs, "rx-collection-bulk-remove");
      var successIds = results.success.map((d) => d[primaryPath]);
      yield Promise.all(successIds.map((id) => {
        return this._runHooks("post", "remove", docsMap.get(id), rxDocumentMap.get(id));
      }));
      var rxDocuments = successIds.map((id) => getFromMapOrThrow(rxDocumentMap, id));
      return {
        success: rxDocuments,
        error: results.error
      };
    });
  };
  _proto.bulkUpsert = function bulkUpsert(docsData) {
    return __async(this, null, function* () {
      ensureRxCollectionIsNotDestroyed(this);
      var insertData = [];
      var useJsonByDocId = /* @__PURE__ */ new Map();
      docsData.forEach((docData) => {
        var useJson = fillObjectDataBeforeInsert(this.schema, docData);
        var primary = useJson[this.schema.primaryPath];
        if (!primary) {
          throw newRxError("COL3", {
            primaryPath: this.schema.primaryPath,
            data: useJson,
            schema: this.schema.jsonSchema
          });
        }
        useJsonByDocId.set(primary, useJson);
        insertData.push(useJson);
      });
      var insertResult = yield this.bulkInsert(insertData);
      var success = insertResult.success.slice(0);
      var error = [];
      yield Promise.all(insertResult.error.map((err) => __async(this, null, function* () {
        if (err.status !== 409) {
          error.push(err);
        } else {
          var id = err.documentId;
          var writeData = getFromMapOrThrow(useJsonByDocId, id);
          var docDataInDb = ensureNotFalsy(err.documentInDb);
          var doc = this._docCache.getCachedRxDocuments([docDataInDb])[0];
          var newDoc = yield doc.incrementalModify(() => writeData);
          success.push(newDoc);
        }
      })));
      return {
        error,
        success
      };
    });
  };
  _proto.upsert = function upsert(json) {
    return __async(this, null, function* () {
      ensureRxCollectionIsNotDestroyed(this);
      var bulkResult = yield this.bulkUpsert([json]);
      throwIfIsStorageWriteError(this.asRxCollection, json[this.schema.primaryPath], json, bulkResult.error[0]);
      return bulkResult.success[0];
    });
  };
  _proto.incrementalUpsert = function incrementalUpsert(json) {
    ensureRxCollectionIsNotDestroyed(this);
    var useJson = fillObjectDataBeforeInsert(this.schema, json);
    var primary = useJson[this.schema.primaryPath];
    if (!primary) {
      throw newRxError("COL4", {
        data: json
      });
    }
    var queue = this._incrementalUpsertQueues.get(primary);
    if (!queue) {
      queue = PROMISE_RESOLVE_VOID;
    }
    queue = queue.then(() => _incrementalUpsertEnsureRxDocumentExists(this, primary, useJson)).then((wasInserted) => {
      if (!wasInserted.inserted) {
        return _incrementalUpsertUpdate(wasInserted.doc, useJson);
      } else {
        return wasInserted.doc;
      }
    });
    this._incrementalUpsertQueues.set(primary, queue);
    return queue;
  };
  _proto.find = function find(queryObj) {
    ensureRxCollectionIsNotDestroyed(this);
    if (typeof queryObj === "string") {
      throw newRxError("COL5", {
        queryObj
      });
    }
    if (!queryObj) {
      queryObj = _getDefaultQuery();
    }
    var query = createRxQuery("find", queryObj, this);
    return query;
  };
  _proto.findOne = function findOne(queryObj) {
    ensureRxCollectionIsNotDestroyed(this);
    if (typeof queryObj === "number" || Array.isArray(queryObj)) {
      throw newRxTypeError("COL6", {
        queryObj
      });
    }
    var query;
    if (typeof queryObj === "string") {
      query = createRxQuery("findOne", {
        selector: {
          [this.schema.primaryPath]: queryObj
        },
        limit: 1
      }, this);
    } else {
      if (!queryObj) {
        queryObj = _getDefaultQuery();
      }
      if (queryObj.limit) {
        throw newRxError("QU6");
      }
      queryObj = flatClone(queryObj);
      queryObj.limit = 1;
      query = createRxQuery("findOne", queryObj, this);
    }
    return query;
  };
  _proto.count = function count(queryObj) {
    ensureRxCollectionIsNotDestroyed(this);
    if (!queryObj) {
      queryObj = _getDefaultQuery();
    }
    var query = createRxQuery("count", queryObj, this);
    return query;
  };
  _proto.findByIds = function findByIds(ids) {
    ensureRxCollectionIsNotDestroyed(this);
    var mangoQuery = {
      selector: {
        [this.schema.primaryPath]: {
          $in: ids.slice(0)
        }
      }
    };
    var query = createRxQuery("findByIds", mangoQuery, this);
    return query;
  };
  _proto.exportJSON = function exportJSON() {
    throw pluginMissing("json-dump");
  };
  _proto.importJSON = function importJSON(_exportedJSON) {
    throw pluginMissing("json-dump");
  };
  _proto.insertCRDT = function insertCRDT(_updateObj) {
    throw pluginMissing("crdt");
  };
  _proto.addHook = function addHook(when, key, fun, parallel = false) {
    if (typeof fun !== "function") {
      throw newRxTypeError("COL7", {
        key,
        when
      });
    }
    if (!HOOKS_WHEN.includes(when)) {
      throw newRxTypeError("COL8", {
        key,
        when
      });
    }
    if (!HOOKS_KEYS.includes(key)) {
      throw newRxError("COL9", {
        key
      });
    }
    if (when === "post" && key === "create" && parallel === true) {
      throw newRxError("COL10", {
        when,
        key,
        parallel
      });
    }
    var boundFun = fun.bind(this);
    var runName = parallel ? "parallel" : "series";
    this.hooks[key] = this.hooks[key] || {};
    this.hooks[key][when] = this.hooks[key][when] || {
      series: [],
      parallel: []
    };
    this.hooks[key][when][runName].push(boundFun);
  };
  _proto.getHooks = function getHooks(when, key) {
    if (!this.hooks[key] || !this.hooks[key][when]) {
      return {
        series: [],
        parallel: []
      };
    }
    return this.hooks[key][when];
  };
  _proto.hasHooks = function hasHooks(when, key) {
    if (!this.hooks[key] || !this.hooks[key][when]) {
      return false;
    }
    var hooks = this.getHooks(when, key);
    if (!hooks) {
      return false;
    }
    return hooks.series.length > 0 || hooks.parallel.length > 0;
  };
  _proto._runHooks = function _runHooks(when, key, data, instance) {
    var hooks = this.getHooks(when, key);
    if (!hooks) {
      return PROMISE_RESOLVE_VOID;
    }
    var tasks = hooks.series.map((hook) => () => hook(data, instance));
    return promiseSeries(tasks).then(() => Promise.all(hooks.parallel.map((hook) => hook(data, instance))));
  };
  _proto._runHooksSync = function _runHooksSync(when, key, data, instance) {
    if (!this.hasHooks(when, key)) {
      return;
    }
    var hooks = this.getHooks(when, key);
    if (!hooks) return;
    hooks.series.forEach((hook) => hook(data, instance));
  };
  _proto.promiseWait = function promiseWait2(time) {
    var ret = new Promise((res) => {
      var timeout = setTimeout(() => {
        this.timeouts.delete(timeout);
        res();
      }, time);
      this.timeouts.add(timeout);
    });
    return ret;
  };
  _proto.destroy = function destroy() {
    return __async(this, null, function* () {
      if (this.destroyed) {
        return PROMISE_RESOLVE_FALSE;
      }
      yield Promise.all(this.onDestroy.map((fn) => fn()));
      this.destroyed = true;
      Array.from(this.timeouts).forEach((timeout) => clearTimeout(timeout));
      if (this._changeEventBuffer) {
        this._changeEventBuffer.destroy();
      }
      return this.database.requestIdlePromise().then(() => this.storageInstance.close()).then(() => {
        this._subs.forEach((sub) => sub.unsubscribe());
        delete this.database.collections[this.name];
        return runAsyncPluginHooks("postDestroyRxCollection", this).then(() => true);
      });
    });
  };
  _proto.remove = function remove() {
    return __async(this, null, function* () {
      yield this.destroy();
      yield Promise.all(this.onRemove.map((fn) => fn()));
      yield removeCollectionStorages(this.database.storage, this.database.internalStore, this.database.token, this.database.name, this.name, this.database.password, this.database.hashFunction);
    });
  };
  return _createClass(RxCollectionBase2, [{
    key: "insert$",
    get: function() {
      return this.$.pipe(filter((cE) => cE.operation === "INSERT"));
    }
  }, {
    key: "update$",
    get: function() {
      return this.$.pipe(filter((cE) => cE.operation === "UPDATE"));
    }
  }, {
    key: "remove$",
    get: function() {
      return this.$.pipe(filter((cE) => cE.operation === "DELETE"));
    }
    // defaults
    /**
     * When the collection is destroyed,
     * these functions will be called an awaited.
     * Used to automatically clean up stuff that
     * belongs to this collection.
    */
  }, {
    key: "asRxCollection",
    get: function() {
      return this;
    }
  }]);
}();
function _applyHookFunctions(collection) {
  if (hooksApplied) return;
  hooksApplied = true;
  var colProto = Object.getPrototypeOf(collection);
  HOOKS_KEYS.forEach((key) => {
    HOOKS_WHEN.map((when) => {
      var fnName = when + ucfirst(key);
      colProto[fnName] = function(fun, parallel) {
        return this.addHook(when, key, fun, parallel);
      };
    });
  });
}
function _incrementalUpsertUpdate(doc, json) {
  return doc.incrementalModify((_innerDoc) => {
    return json;
  });
}
function _incrementalUpsertEnsureRxDocumentExists(rxCollection, primary, json) {
  var docDataFromCache = rxCollection._docCache.getLatestDocumentDataIfExists(primary);
  if (docDataFromCache) {
    return Promise.resolve({
      doc: rxCollection._docCache.getCachedRxDocuments([docDataFromCache])[0],
      inserted: false
    });
  }
  return rxCollection.findOne(primary).exec().then((doc) => {
    if (!doc) {
      return rxCollection.insert(json).then((newDoc) => ({
        doc: newDoc,
        inserted: true
      }));
    } else {
      return {
        doc,
        inserted: false
      };
    }
  });
}
function createRxCollection({
  database,
  name,
  schema,
  instanceCreationOptions = {},
  migrationStrategies = {},
  autoMigrate = true,
  statics = {},
  methods = {},
  attachments = {},
  options = {},
  localDocuments = false,
  cacheReplacementPolicy = defaultCacheReplacementPolicy,
  conflictHandler = defaultConflictHandler
}) {
  var storageInstanceCreationParams = {
    databaseInstanceToken: database.token,
    databaseName: database.name,
    collectionName: name,
    schema: schema.jsonSchema,
    options: instanceCreationOptions,
    multiInstance: database.multiInstance,
    password: database.password,
    devMode: overwritable.isDevMode()
  };
  runPluginHooks("preCreateRxStorageInstance", storageInstanceCreationParams);
  return createRxCollectionStorageInstance(database, storageInstanceCreationParams).then((storageInstance) => {
    var collection = new RxCollectionBase(database, name, schema, storageInstance, instanceCreationOptions, migrationStrategies, methods, attachments, options, cacheReplacementPolicy, statics, conflictHandler);
    return collection.prepare().then(() => {
      Object.entries(statics).forEach(([funName, fun]) => {
        Object.defineProperty(collection, funName, {
          get: () => fun.bind(collection)
        });
      });
      var ret = PROMISE_RESOLVE_VOID;
      if (autoMigrate && collection.schema.version !== 0) {
        ret = collection.migratePromise();
      }
      return ret;
    }).then(() => {
      runPluginHooks("createRxCollection", {
        collection,
        creator: {
          name,
          schema,
          storageInstance,
          instanceCreationOptions,
          migrationStrategies,
          methods,
          attachments,
          options,
          cacheReplacementPolicy,
          localDocuments,
          statics
        }
      });
      return collection;
    }).catch((err) => {
      return storageInstance.close().then(() => Promise.reject(err));
    });
  });
}
function isRxCollection(obj) {
  return obj instanceof RxCollectionBase;
}

// node_modules/custom-idle-queue/dist/es/index.js
var IdleQueue = function IdleQueue2() {
  var parallels = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  this._parallels = parallels || 1;
  this._qC = 0;
  this._iC = /* @__PURE__ */ new Set();
  this._lHN = 0;
  this._hPM = /* @__PURE__ */ new Map();
  this._pHM = /* @__PURE__ */ new Map();
};
IdleQueue.prototype = {
  isIdle: function isIdle() {
    return this._qC < this._parallels;
  },
  /**
   * creates a lock in the queue
   * and returns an unlock-function to remove the lock from the queue
   * @return {function} unlock function than must be called afterwards
   */
  lock: function lock() {
    this._qC++;
  },
  unlock: function unlock() {
    this._qC--;
    _tryIdleCall(this);
  },
  /**
   * wraps a function with lock/unlock and runs it
   * @param  {function}  fun
   * @return {Promise<any>}
   */
  wrapCall: function wrapCall(fun) {
    var _this = this;
    this.lock();
    var maybePromise;
    try {
      maybePromise = fun();
    } catch (err) {
      this.unlock();
      throw err;
    }
    if (!maybePromise.then || typeof maybePromise.then !== "function") {
      this.unlock();
      return maybePromise;
    } else {
      return maybePromise.then(function(ret) {
        _this.unlock();
        return ret;
      })["catch"](function(err) {
        _this.unlock();
        throw err;
      });
    }
  },
  /**
   * does the same as requestIdleCallback() but uses promises instead of the callback
   * @param {{timeout?: number}} options like timeout
   * @return {Promise<void>} promise that resolves when the database is in idle-mode
   */
  requestIdlePromise: function requestIdlePromise2(options) {
    var _this2 = this;
    options = options || {};
    var resolve;
    var prom = new Promise(function(res) {
      return resolve = res;
    });
    var resolveFromOutside = function resolveFromOutside2() {
      _removeIdlePromise(_this2, prom);
      resolve();
    };
    prom._manRes = resolveFromOutside;
    if (options.timeout) {
      var timeoutObj = setTimeout(function() {
        prom._manRes();
      }, options.timeout);
      prom._timeoutObj = timeoutObj;
    }
    this._iC.add(prom);
    _tryIdleCall(this);
    return prom;
  },
  /**
   * remove the promise so it will never be resolved
   * @param  {Promise} promise from requestIdlePromise()
   * @return {void}
   */
  cancelIdlePromise: function cancelIdlePromise(promise) {
    _removeIdlePromise(this, promise);
  },
  /**
   * api equal to
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
   * @param  {Function} callback
   * @param  {options}   options  [description]
   * @return {number} handle which can be used with cancelIdleCallback()
   */
  requestIdleCallback: function requestIdleCallback(callback, options) {
    var handle = this._lHN++;
    var promise = this.requestIdlePromise(options);
    this._hPM.set(handle, promise);
    this._pHM.set(promise, handle);
    promise.then(function() {
      return callback();
    });
    return handle;
  },
  /**
   * API equal to
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback
   * @param  {number} handle returned from requestIdleCallback()
   * @return {void}
   */
  cancelIdleCallback: function cancelIdleCallback(handle) {
    var promise = this._hPM.get(handle);
    this.cancelIdlePromise(promise);
  },
  /**
   * clears and resets everything
   * @return {void}
   */
  clear: function clear() {
    var _this3 = this;
    this._iC.forEach(function(promise) {
      return _removeIdlePromise(_this3, promise);
    });
    this._qC = 0;
    this._iC.clear();
    this._hPM = /* @__PURE__ */ new Map();
    this._pHM = /* @__PURE__ */ new Map();
  }
};
function _resolveOneIdleCall(idleQueue) {
  if (idleQueue._iC.size === 0) return;
  var iterator = idleQueue._iC.values();
  var oldestPromise = iterator.next().value;
  oldestPromise._manRes();
  setTimeout(function() {
    return _tryIdleCall(idleQueue);
  }, 0);
}
function _removeIdlePromise(idleQueue, promise) {
  if (!promise) return;
  if (promise._timeoutObj) clearTimeout(promise._timeoutObj);
  if (idleQueue._pHM.has(promise)) {
    var handle = idleQueue._pHM.get(promise);
    idleQueue._hPM["delete"](handle);
    idleQueue._pHM["delete"](promise);
  }
  idleQueue._iC["delete"](promise);
}
function _tryIdleCall(idleQueue) {
  if (idleQueue._tryIR || idleQueue._iC.size === 0) return;
  idleQueue._tryIR = true;
  setTimeout(function() {
    if (!idleQueue.isIdle()) {
      idleQueue._tryIR = false;
      return;
    }
    setTimeout(function() {
      if (!idleQueue.isIdle()) {
        idleQueue._tryIR = false;
        return;
      }
      _resolveOneIdleCall(idleQueue);
      idleQueue._tryIR = false;
    }, 0);
  }, 0);
}

// node_modules/rxdb/dist/esm/rx-database.js
var USED_DATABASE_NAMES = /* @__PURE__ */ new Set();
var DB_COUNT = 0;
var RxDatabaseBase = function() {
  function RxDatabaseBase2(name, token, storage, instanceCreationOptions, password, multiInstance, eventReduce = false, options = {}, internalStore, hashFunction, cleanupPolicy, allowSlowCount, reactivity) {
    this.idleQueue = new IdleQueue();
    this.rxdbVersion = RXDB_VERSION;
    this.storageInstances = /* @__PURE__ */ new Set();
    this._subs = [];
    this.startupErrors = [];
    this.onDestroy = [];
    this.destroyed = false;
    this.collections = {};
    this.states = {};
    this.eventBulks$ = new Subject();
    this.observable$ = this.eventBulks$.pipe(mergeMap((changeEventBulk) => changeEventBulk.events));
    this.storageToken = PROMISE_RESOLVE_FALSE;
    this.storageTokenDocument = PROMISE_RESOLVE_FALSE;
    this.emittedEventBulkIds = new ObliviousSet(60 * 1e3);
    this.name = name;
    this.token = token;
    this.storage = storage;
    this.instanceCreationOptions = instanceCreationOptions;
    this.password = password;
    this.multiInstance = multiInstance;
    this.eventReduce = eventReduce;
    this.options = options;
    this.internalStore = internalStore;
    this.hashFunction = hashFunction;
    this.cleanupPolicy = cleanupPolicy;
    this.allowSlowCount = allowSlowCount;
    this.reactivity = reactivity;
    DB_COUNT++;
    if (this.name !== "pseudoInstance") {
      this.internalStore = getWrappedStorageInstance(this.asRxDatabase, internalStore, INTERNAL_STORE_SCHEMA);
      this.storageTokenDocument = ensureStorageTokenDocumentExists(this.asRxDatabase).catch((err) => this.startupErrors.push(err));
      this.storageToken = this.storageTokenDocument.then((doc) => doc.data.token).catch((err) => this.startupErrors.push(err));
    }
  }
  var _proto = RxDatabaseBase2.prototype;
  _proto.getReactivityFactory = function getReactivityFactory() {
    if (!this.reactivity) {
      throw newRxError("DB14", {
        database: this.name
      });
    }
    return this.reactivity;
  };
  _proto.$emit = function $emit(changeEventBulk) {
    if (this.emittedEventBulkIds.has(changeEventBulk.id)) {
      return;
    }
    this.emittedEventBulkIds.add(changeEventBulk.id);
    this.eventBulks$.next(changeEventBulk);
  };
  _proto.removeCollectionDoc = function removeCollectionDoc(name, schema) {
    return __async(this, null, function* () {
      var doc = yield getSingleDocument(this.internalStore, getPrimaryKeyOfInternalDocument(_collectionNamePrimary(name, schema), INTERNAL_CONTEXT_COLLECTION));
      if (!doc) {
        throw newRxError("SNH", {
          name,
          schema
        });
      }
      var writeDoc = flatCloneDocWithMeta(doc);
      writeDoc._deleted = true;
      yield this.internalStore.bulkWrite([{
        document: writeDoc,
        previous: doc
      }], "rx-database-remove-collection");
    });
  };
  _proto.addCollections = function addCollections(collectionCreators) {
    return __async(this, null, function* () {
      var jsonSchemas = {};
      var schemas = {};
      var bulkPutDocs = [];
      var useArgsByCollectionName = {};
      yield Promise.all(Object.entries(collectionCreators).map((_0) => __async(this, [_0], function* ([name, args]) {
        var collectionName = name;
        var rxJsonSchema = args.schema;
        jsonSchemas[collectionName] = rxJsonSchema;
        var schema = createRxSchema(rxJsonSchema, this.hashFunction);
        schemas[collectionName] = schema;
        if (this.collections[name]) {
          throw newRxError("DB3", {
            name
          });
        }
        var collectionNameWithVersion = _collectionNamePrimary(name, rxJsonSchema);
        var collectionDocData = {
          id: getPrimaryKeyOfInternalDocument(collectionNameWithVersion, INTERNAL_CONTEXT_COLLECTION),
          key: collectionNameWithVersion,
          context: INTERNAL_CONTEXT_COLLECTION,
          data: {
            name: collectionName,
            schemaHash: yield schema.hash,
            schema: schema.jsonSchema,
            version: schema.version,
            connectedStorages: []
          },
          _deleted: false,
          _meta: getDefaultRxDocumentMeta(),
          _rev: getDefaultRevision(),
          _attachments: {}
        };
        bulkPutDocs.push({
          document: collectionDocData
        });
        var useArgs = Object.assign({}, args, {
          name: collectionName,
          schema,
          database: this
        });
        var hookData = flatClone(args);
        hookData.database = this;
        hookData.name = name;
        runPluginHooks("preCreateRxCollection", hookData);
        useArgs.conflictHandler = hookData.conflictHandler;
        useArgsByCollectionName[collectionName] = useArgs;
      })));
      var putDocsResult = yield this.internalStore.bulkWrite(bulkPutDocs, "rx-database-add-collection");
      yield ensureNoStartupErrors(this);
      yield Promise.all(putDocsResult.error.map((error) => __async(this, null, function* () {
        if (error.status !== 409) {
          throw newRxError("DB12", {
            database: this.name,
            writeError: error
          });
        }
        var docInDb = ensureNotFalsy(error.documentInDb);
        var collectionName = docInDb.data.name;
        var schema = schemas[collectionName];
        if (docInDb.data.schemaHash !== (yield schema.hash)) {
          throw newRxError("DB6", {
            database: this.name,
            collection: collectionName,
            previousSchemaHash: docInDb.data.schemaHash,
            schemaHash: yield schema.hash,
            previousSchema: docInDb.data.schema,
            schema: ensureNotFalsy(jsonSchemas[collectionName])
          });
        }
      })));
      var ret = {};
      yield Promise.all(Object.keys(collectionCreators).map((collectionName) => __async(this, null, function* () {
        var useArgs = useArgsByCollectionName[collectionName];
        var collection = yield createRxCollection(useArgs);
        ret[collectionName] = collection;
        this.collections[collectionName] = collection;
        if (!this[collectionName]) {
          Object.defineProperty(this, collectionName, {
            get: () => this.collections[collectionName]
          });
        }
      })));
      return ret;
    });
  };
  _proto.lockedRun = function lockedRun(fn) {
    return this.idleQueue.wrapCall(fn);
  };
  _proto.requestIdlePromise = function requestIdlePromise3() {
    return this.idleQueue.requestIdlePromise();
  };
  _proto.exportJSON = function exportJSON(_collections) {
    throw pluginMissing("json-dump");
  };
  _proto.addState = function addState(_name) {
    throw pluginMissing("state");
  };
  _proto.importJSON = function importJSON(_exportedJSON) {
    throw pluginMissing("json-dump");
  };
  _proto.backup = function backup(_options) {
    throw pluginMissing("backup");
  };
  _proto.leaderElector = function leaderElector() {
    throw pluginMissing("leader-election");
  };
  _proto.isLeader = function isLeader() {
    throw pluginMissing("leader-election");
  };
  _proto.waitForLeadership = function waitForLeadership() {
    throw pluginMissing("leader-election");
  };
  _proto.migrationStates = function migrationStates() {
    throw pluginMissing("migration-schema");
  };
  _proto.destroy = function destroy() {
    return __async(this, null, function* () {
      if (this.destroyed) {
        return PROMISE_RESOLVE_FALSE;
      }
      this.destroyed = true;
      yield runAsyncPluginHooks("preDestroyRxDatabase", this);
      this.eventBulks$.complete();
      DB_COUNT--;
      this._subs.map((sub) => sub.unsubscribe());
      if (this.name === "pseudoInstance") {
        return PROMISE_RESOLVE_FALSE;
      }
      return this.requestIdlePromise().then(() => Promise.all(this.onDestroy.map((fn) => fn()))).then(() => Promise.all(Object.keys(this.collections).map((key) => this.collections[key]).map((col) => col.destroy()))).then(() => this.internalStore.close()).then(() => USED_DATABASE_NAMES.delete(this.storage.name + "|" + this.name)).then(() => true);
    });
  };
  _proto.remove = function remove() {
    return this.destroy().then(() => removeRxDatabase(this.name, this.storage, this.password));
  };
  return _createClass(RxDatabaseBase2, [{
    key: "$",
    get: function() {
      return this.observable$;
    }
  }, {
    key: "asRxDatabase",
    get: function() {
      return this;
    }
  }]);
}();
function throwIfDatabaseNameUsed(name, storage) {
  var key = storage.name + "|" + name;
  if (!USED_DATABASE_NAMES.has(key)) {
    return;
  } else {
    throw newRxError("DB8", {
      name,
      storage: storage.name,
      link: "https://rxdb.info/rx-database.html#ignoreduplicate"
    });
  }
}
function createRxDatabaseStorageInstance(databaseInstanceToken, storage, databaseName, options, multiInstance, password) {
  return __async(this, null, function* () {
    var internalStore = yield storage.createStorageInstance({
      databaseInstanceToken,
      databaseName,
      collectionName: INTERNAL_STORAGE_NAME,
      schema: INTERNAL_STORE_SCHEMA,
      options,
      multiInstance,
      password,
      devMode: overwritable.isDevMode()
    });
    return internalStore;
  });
}
function createRxDatabase({
  storage,
  instanceCreationOptions,
  name,
  password,
  multiInstance = true,
  eventReduce = true,
  ignoreDuplicate = false,
  options = {},
  cleanupPolicy,
  allowSlowCount = false,
  localDocuments = false,
  hashFunction = defaultHashSha256,
  reactivity
}) {
  runPluginHooks("preCreateRxDatabase", {
    storage,
    instanceCreationOptions,
    name,
    password,
    multiInstance,
    eventReduce,
    ignoreDuplicate,
    options,
    localDocuments
  });
  if (!ignoreDuplicate) {
    throwIfDatabaseNameUsed(name, storage);
  }
  USED_DATABASE_NAMES.add(storage.name + "|" + name);
  var databaseInstanceToken = randomCouchString(10);
  return createRxDatabaseStorageInstance(databaseInstanceToken, storage, name, instanceCreationOptions, multiInstance, password).catch((err) => {
    USED_DATABASE_NAMES.delete(storage.name + "|" + name);
    throw err;
  }).then((storageInstance) => {
    var rxDatabase = new RxDatabaseBase(name, databaseInstanceToken, storage, instanceCreationOptions, password, multiInstance, eventReduce, options, storageInstance, hashFunction, cleanupPolicy, allowSlowCount, reactivity);
    return runAsyncPluginHooks("createRxDatabase", {
      database: rxDatabase,
      creator: {
        storage,
        instanceCreationOptions,
        name,
        password,
        multiInstance,
        eventReduce,
        ignoreDuplicate,
        options,
        localDocuments
      }
    }).then(() => rxDatabase);
  });
}
function removeRxDatabase(databaseName, storage, password) {
  return __async(this, null, function* () {
    var databaseInstanceToken = randomCouchString(10);
    var dbInternalsStorageInstance = yield createRxDatabaseStorageInstance(databaseInstanceToken, storage, databaseName, {}, false, password);
    var collectionDocs = yield getAllCollectionDocuments(dbInternalsStorageInstance);
    var collectionNames = /* @__PURE__ */ new Set();
    collectionDocs.forEach((doc) => collectionNames.add(doc.data.name));
    var removedCollectionNames = Array.from(collectionNames);
    yield Promise.all(removedCollectionNames.map((collectionName) => removeCollectionStorages(storage, dbInternalsStorageInstance, databaseInstanceToken, databaseName, collectionName, password)));
    yield runAsyncPluginHooks("postRemoveRxDatabase", {
      databaseName,
      storage
    });
    yield dbInternalsStorageInstance.remove();
    return removedCollectionNames;
  });
}
function isRxDatabase(obj) {
  return obj instanceof RxDatabaseBase;
}
function dbCount() {
  return DB_COUNT;
}
function isRxDatabaseFirstTimeInstantiated(database) {
  return __async(this, null, function* () {
    var tokenDoc = yield database.storageTokenDocument;
    return tokenDoc.data.instanceToken === database.token;
  });
}
function ensureNoStartupErrors(rxDatabase) {
  return __async(this, null, function* () {
    yield rxDatabase.storageToken;
    if (rxDatabase.startupErrors[0]) {
      throw rxDatabase.startupErrors[0];
    }
  });
}

// node_modules/rxdb/dist/esm/plugin.js
var PROTOTYPES = {
  RxSchema: RxSchema.prototype,
  RxDocument: basePrototype,
  RxQuery: RxQueryBase.prototype,
  RxCollection: RxCollectionBase.prototype,
  RxDatabase: RxDatabaseBase.prototype
};
var ADDED_PLUGINS = /* @__PURE__ */ new Set();
var ADDED_PLUGIN_NAMES = /* @__PURE__ */ new Set();
function addRxPlugin(plugin) {
  runPluginHooks("preAddRxPlugin", {
    plugin,
    plugins: ADDED_PLUGINS
  });
  if (ADDED_PLUGINS.has(plugin)) {
    return;
  } else {
    if (ADDED_PLUGIN_NAMES.has(plugin.name)) {
      throw newRxError("PL3", {
        name: plugin.name,
        plugin
      });
    }
    ADDED_PLUGINS.add(plugin);
    ADDED_PLUGIN_NAMES.add(plugin.name);
  }
  if (!plugin.rxdb) {
    throw newRxTypeError("PL1", {
      plugin
    });
  }
  if (plugin.init) {
    plugin.init();
  }
  if (plugin.prototypes) {
    Object.entries(plugin.prototypes).forEach(([name, fun]) => {
      return fun(PROTOTYPES[name]);
    });
  }
  if (plugin.overwritable) {
    Object.assign(overwritable, plugin.overwritable);
  }
  if (plugin.hooks) {
    Object.entries(plugin.hooks).forEach(([name, hooksObj]) => {
      if (hooksObj.after) {
        HOOKS[name].push(hooksObj.after);
      }
      if (hooksObj.before) {
        HOOKS[name].unshift(hooksObj.before);
      }
    });
  }
}

// node_modules/rxdb/dist/esm/custom-index.js
function getIndexMeta(schema, index) {
  var fieldNameProperties = index.map((fieldName) => {
    var schemaPart = getSchemaByObjectPath(schema, fieldName);
    if (!schemaPart) {
      throw new Error("not in schema: " + fieldName);
    }
    var type = schemaPart.type;
    var parsedLengths;
    if (type === "number" || type === "integer") {
      parsedLengths = getStringLengthOfIndexNumber(schemaPart);
    }
    var getValue = objectPathMonad(fieldName);
    var maxLength = schemaPart.maxLength ? schemaPart.maxLength : 0;
    var getIndexStringPart;
    if (type === "string") {
      getIndexStringPart = (docData) => {
        var fieldValue = getValue(docData);
        if (!fieldValue) {
          fieldValue = "";
        }
        return fieldValue.padEnd(maxLength, " ");
      };
    } else if (type === "boolean") {
      getIndexStringPart = (docData) => {
        var fieldValue = getValue(docData);
        return fieldValue ? "1" : "0";
      };
    } else {
      getIndexStringPart = (docData) => {
        var fieldValue = getValue(docData);
        return getNumberIndexString(parsedLengths, fieldValue);
      };
    }
    var ret = {
      fieldName,
      schemaPart,
      parsedLengths,
      getValue,
      getIndexStringPart
    };
    return ret;
  });
  return fieldNameProperties;
}
function getIndexableStringMonad(schema, index) {
  var fieldNameProperties = getIndexMeta(schema, index);
  var fieldNamePropertiesAmount = fieldNameProperties.length;
  var indexPartsFunctions = fieldNameProperties.map((r) => r.getIndexStringPart);
  var ret = function(docData) {
    var str = "";
    for (var i = 0; i < fieldNamePropertiesAmount; ++i) {
      str += indexPartsFunctions[i](docData);
    }
    return str;
  };
  return ret;
}
function getStringLengthOfIndexNumber(schemaPart) {
  var minimum = Math.floor(schemaPart.minimum);
  var maximum = Math.ceil(schemaPart.maximum);
  var multipleOf = schemaPart.multipleOf;
  var valueSpan = maximum - minimum;
  var nonDecimals = valueSpan.toString().length;
  var multipleOfParts = multipleOf.toString().split(".");
  var decimals = 0;
  if (multipleOfParts.length > 1) {
    decimals = multipleOfParts[1].length;
  }
  return {
    minimum,
    maximum,
    nonDecimals,
    decimals,
    roundedMinimum: minimum
  };
}
function getIndexStringLength(schema, index) {
  var fieldNameProperties = getIndexMeta(schema, index);
  var length = 0;
  fieldNameProperties.forEach((props) => {
    var schemaPart = props.schemaPart;
    var type = schemaPart.type;
    if (type === "string") {
      length += schemaPart.maxLength;
    } else if (type === "boolean") {
      length += 1;
    } else {
      var parsedLengths = props.parsedLengths;
      length = length + parsedLengths.nonDecimals + parsedLengths.decimals;
    }
  });
  return length;
}
function getPrimaryKeyFromIndexableString(indexableString, primaryKeyLength) {
  var paddedPrimaryKey = indexableString.slice(primaryKeyLength * -1);
  var primaryKey = paddedPrimaryKey.trim();
  return primaryKey;
}
function getNumberIndexString(parsedLengths, fieldValue) {
  if (typeof fieldValue === "undefined") {
    fieldValue = 0;
  }
  if (fieldValue < parsedLengths.minimum) {
    fieldValue = parsedLengths.minimum;
  }
  if (fieldValue > parsedLengths.maximum) {
    fieldValue = parsedLengths.maximum;
  }
  var nonDecimalsValueAsString = (Math.floor(fieldValue) - parsedLengths.roundedMinimum).toString();
  var str = nonDecimalsValueAsString.padStart(parsedLengths.nonDecimals, "0");
  if (parsedLengths.decimals > 0) {
    var splitByDecimalPoint = fieldValue.toString().split(".");
    var decimalValueAsString = splitByDecimalPoint.length > 1 ? splitByDecimalPoint[1] : "0";
    str += decimalValueAsString.padEnd(parsedLengths.decimals, "0");
  }
  return str;
}
function getStartIndexStringFromLowerBound(schema, index, lowerBound) {
  var str = "";
  index.forEach((fieldName, idx) => {
    var schemaPart = getSchemaByObjectPath(schema, fieldName);
    var bound = lowerBound[idx];
    var type = schemaPart.type;
    switch (type) {
      case "string":
        var maxLength = ensureNotFalsy(schemaPart.maxLength, "maxLength not set");
        if (typeof bound === "string") {
          str += bound.padEnd(maxLength, " ");
        } else {
          str += "".padEnd(maxLength, " ");
        }
        break;
      case "boolean":
        if (bound === null) {
          str += "0";
        } else if (bound === INDEX_MIN) {
          str += "0";
        } else if (bound === INDEX_MAX) {
          str += "1";
        } else {
          var boolToStr = bound ? "1" : "0";
          str += boolToStr;
        }
        break;
      case "number":
      case "integer":
        var parsedLengths = getStringLengthOfIndexNumber(schemaPart);
        if (bound === null || bound === INDEX_MIN) {
          var fillChar = "0";
          str += fillChar.repeat(parsedLengths.nonDecimals + parsedLengths.decimals);
        } else if (bound === INDEX_MAX) {
          str += getNumberIndexString(parsedLengths, parsedLengths.maximum);
        } else {
          var add = getNumberIndexString(parsedLengths, bound);
          str += add;
        }
        break;
      default:
        throw new Error("unknown index type " + type);
    }
  });
  return str;
}
function getStartIndexStringFromUpperBound(schema, index, upperBound) {
  var str = "";
  index.forEach((fieldName, idx) => {
    var schemaPart = getSchemaByObjectPath(schema, fieldName);
    var bound = upperBound[idx];
    var type = schemaPart.type;
    switch (type) {
      case "string":
        var maxLength = ensureNotFalsy(schemaPart.maxLength, "maxLength not set");
        if (typeof bound === "string" && bound !== INDEX_MAX) {
          str += bound.padEnd(maxLength, " ");
        } else if (bound === INDEX_MIN) {
          str += "".padEnd(maxLength, " ");
        } else {
          str += "".padEnd(maxLength, INDEX_MAX);
        }
        break;
      case "boolean":
        if (bound === null) {
          str += "1";
        } else {
          var boolToStr = bound ? "1" : "0";
          str += boolToStr;
        }
        break;
      case "number":
      case "integer":
        var parsedLengths = getStringLengthOfIndexNumber(schemaPart);
        if (bound === null || bound === INDEX_MAX) {
          var fillChar = "9";
          str += fillChar.repeat(parsedLengths.nonDecimals + parsedLengths.decimals);
        } else if (bound === INDEX_MIN) {
          var _fillChar = "0";
          str += _fillChar.repeat(parsedLengths.nonDecimals + parsedLengths.decimals);
        } else {
          str += getNumberIndexString(parsedLengths, bound);
        }
        break;
      default:
        throw new Error("unknown index type " + type);
    }
  });
  return str;
}
function changeIndexableStringByOneQuantum(str, direction) {
  var lastChar = str.slice(-1);
  var charCode = lastChar.charCodeAt(0);
  charCode = charCode + direction;
  var withoutLastChar = str.slice(0, -1);
  return withoutLastChar + String.fromCharCode(charCode);
}
export {
  BROADCAST_CHANNEL_BY_TOKEN,
  COLLECTIONS_WITH_RUNNING_CLEANUP,
  DEFAULT_CHECKPOINT_SCHEMA,
  DEFAULT_TRY_TO_KEEP_MAX,
  DEFAULT_UNEXECUTED_LIFETIME,
  HOOKS,
  INDEX_MAX,
  INDEX_MIN,
  INTERNAL_CONTEXT_COLLECTION,
  INTERNAL_CONTEXT_MIGRATION_STATUS,
  INTERNAL_CONTEXT_STORAGE_TOKEN,
  INTERNAL_STORAGE_NAME,
  INTERNAL_STORE_SCHEMA,
  INTERNAL_STORE_SCHEMA_TITLE,
  LOGICAL_OPERATORS,
  LOWER_BOUND_LOGICAL_OPERATORS,
  META_INSTANCE_SCHEMA_TITLE,
  PREMIUM_FLAG_HASH,
  PROMISE_RESOLVE_FALSE,
  PROMISE_RESOLVE_NULL,
  PROMISE_RESOLVE_TRUE,
  PROMISE_RESOLVE_VOID,
  QueryCache,
  RANDOM_STRING,
  REGEX_ALL_DOTS,
  REGEX_ALL_PIPES,
  RXDB_UTILS_GLOBAL,
  RXDB_VERSION,
  RXJS_SHARE_REPLAY_DEFAULTS,
  RX_DATABASE_LOCAL_DOCS_STORAGE_NAME,
  RX_META_LWT_MINIMUM,
  RX_META_SCHEMA,
  RxCollectionBase,
  RxDatabaseBase,
  RxError,
  RxQueryBase,
  RxQuerySingleResult,
  RxSchema,
  RxTypeError,
  STORAGE_TOKEN_DOCUMENT_ID,
  STORAGE_TOKEN_DOCUMENT_KEY,
  UPPER_BOUND_LOGICAL_OPERATORS,
  _clearHook,
  _collectionNamePrimary,
  _getDefaultQuery,
  addConnectedStorageToCollection,
  addRxPlugin,
  addRxStorageMultiInstanceSupport,
  appendToArray,
  areRxDocumentArraysEqual,
  arrayBufferToBase64,
  arrayBufferToString,
  arrayFilterNotEmpty,
  asyncFilter,
  attachmentWriteDataToNormalData,
  awaitRxStorageReplicationFirstInSync,
  awaitRxStorageReplicationIdle,
  awaitRxStorageReplicationInSync,
  b64DecodeUnicode,
  b64EncodeUnicode,
  base64ToArrayBuffer,
  basePrototype,
  batchArray,
  beforeDocumentUpdateWrite,
  blobToBase64String,
  blobToString,
  canUseCryptoSubtle,
  cancelRxStorageReplication,
  categorizeBulkWriteRows,
  changeIndexableStringByOneQuantum,
  clone,
  countRxQuerySubscribers,
  countUntilNotMatching,
  createBlob,
  createBlobFromBase64,
  createNewRxDocument,
  createQueryCache,
  createRevision,
  createRxCollection,
  createRxCollectionStorageInstance,
  createRxDatabase,
  createRxDatabaseStorageInstance,
  createRxDocumentConstructor,
  createRxQuery,
  createRxSchema,
  createWithConstructor,
  dbCount,
  deepEqual,
  deepFreeze,
  deepKeys,
  defaultCacheReplacementPolicy,
  defaultCacheReplacementPolicyMonad,
  defaultConflictHandler,
  defaultHashSha256,
  deleteProperty,
  docStateToWriteDoc,
  ensureInteger,
  ensureNoStartupErrors,
  ensureNotFalsy,
  ensureRxCollectionIsNotDestroyed,
  ensureRxStorageInstanceParamsAreCorrect,
  ensureStorageTokenDocumentExists,
  errorToPlainJson,
  errorUrlHint,
  fillObjectDataBeforeInsert,
  fillObjectWithDefaults,
  fillPrimaryKey,
  fillWithDefaultSettings,
  firstPropertyNameOfObject,
  firstPropertyValueOfObject,
  flatClone,
  flatCloneDocWithMeta,
  flattenEvents,
  flattenObject,
  getAllCollectionDocuments,
  getAssumedMasterState,
  getAttachmentSize,
  getBlobSize,
  getBroadcastChannelReference,
  getChangedDocumentsSince,
  getChangedDocumentsSinceQuery,
  getCheckpointKey,
  getComposedPrimaryKeyOfDocumentData,
  getDefaultIndex,
  getDefaultRevision,
  getDefaultRxDocumentMeta,
  getDocumentDataOfRxChangeEvent,
  getDocumentOrmPrototype,
  getDocumentPrototype,
  getErrorUrl,
  getFinalFields,
  getFromMapOrCreate,
  getFromMapOrThrow,
  getFromObjectOrThrow,
  getHeightOfRevision,
  getIndexMeta,
  getIndexStringLength,
  getIndexableStringMonad,
  getIndexes,
  getLastCheckpointDoc,
  getLengthOfPrimaryKey,
  getMatcherQueryOpts,
  getMetaWriteRow,
  getNumberIndexString,
  getPreviousVersions,
  getPrimaryFieldOfPrimaryKey,
  getPrimaryKeyFromIndexableString,
  getPrimaryKeyOfInternalDocument,
  getProperty,
  getPseudoSchemaForVersion,
  getQueryMatcher,
  getQueryPlan,
  getRxDocumentConstructor,
  getRxReplicationMetaInstanceSchema,
  getSchemaByObjectPath,
  getSingleDocument,
  getSortComparator,
  getSortDocumentsByLastWriteTimeComparator,
  getStartIndexStringFromLowerBound,
  getStartIndexStringFromUpperBound,
  getStringLengthOfIndexNumber,
  getUnderlyingPersistentStorage,
  getWrappedStorageInstance,
  hasDeepProperty,
  hasEncryption,
  hasProperty,
  hashStringToNumber,
  isBulkWriteConflictError,
  isDatabaseStateVersionCompatibleWithDatabaseCode,
  isFindOneByIdQuery,
  isFolderPath,
  isMaybeReadonlyArray,
  isOneItemOfArrayInOtherArray,
  isPromise,
  isRxCollection,
  isRxDatabase,
  isRxDatabaseFirstTimeInstantiated,
  isRxDocument,
  isRxQuery,
  isRxSchema,
  isSelectorSatisfiedByIndex,
  jsSha256,
  lastCharOfString,
  lastOfArray,
  maxOfNumbers,
  nativeSha256,
  newRxError,
  newRxTypeError,
  nextTick,
  normalizeMangoQuery,
  normalizeRxJsonSchema,
  normalizeString,
  now,
  objectPathMonad,
  observeSingle,
  overwritable,
  overwriteGetterForCaching,
  parseRevision,
  pluginMissing,
  prepareQuery,
  promiseSeries,
  promiseWait,
  queryCollection,
  randomCouchString,
  randomDelayStorage,
  randomOfArray,
  rateQueryPlan,
  removeBroadcastChannelReference,
  removeCollectionStorages,
  removeConnectedStorageFromCollection,
  removeOneFromArrayIfMatches,
  removeRxDatabase,
  replicateRxStorageInstance,
  requestIdleCallbackIfAvailable,
  requestIdlePromise,
  requestIdlePromiseNoQueue,
  resolveConflictError,
  runAsyncPluginHooks,
  runPluginHooks,
  runQueryUpdateFunction,
  runXTimes,
  rxChangeEventToEventReduceChangeEvent,
  rxStorageInstanceToReplicationHandler,
  rxStorageWriteErrorToRxError,
  setCheckpoint,
  setProperty,
  shuffleArray,
  sortDocumentsByLastWriteTime,
  sortObject,
  stackCheckpoints,
  startReplicationDownstream,
  startReplicationUpstream,
  stringToArrayBuffer,
  stripAttachmentsDataFromDocument,
  stripAttachmentsDataFromMetaWriteRows,
  stripAttachmentsDataFromRow,
  stripMetaDataFromDocument,
  sumNumberArray,
  throwIfIsStorageWriteError,
  toArray,
  toPromise,
  toTypedRxJsonSchema,
  toWithDeleted,
  triggerCacheReplacement,
  trimDots,
  tunnelQueryCache,
  ucfirst,
  uncacheRxQuery,
  uniqueArray,
  wrapRxStorageInstance,
  wrappedValidateStorageFactory,
  writeDocToDocState,
  writeSingle
};
//# sourceMappingURL=rxdb.js.map
