import {
  PROMISE_RESOLVE_TRUE,
  RXDB_VERSION,
  RX_META_LWT_MINIMUM,
  appendToArray,
  createRevision,
  ensureNotFalsy,
  flatClone,
  getDefaultRevision,
  getDefaultRxDocumentMeta,
  getPrimaryFieldOfPrimaryKey,
  lastOfArray,
  newRxError,
  normalizeMangoQuery,
  now,
  overwritable,
  prepareQuery,
  promiseWait,
  randomCouchString,
  runPluginHooks
} from "./chunk-WT66J2WX.js";
import {
  filter,
  map,
  startWith,
  switchMap
} from "./chunk-H7XVPIDD.js";
import {
  __async
} from "./chunk-7RSYZEEK.js";

// node_modules/rxdb/dist/esm/rx-storage-helper.js
var INTERNAL_STORAGE_NAME = "_rxdb_internal";
var RX_DATABASE_LOCAL_DOCS_STORAGE_NAME = "rxdatabase_storage_local";
function getSingleDocument(storageInstance, documentId) {
  return __async(this, null, function* () {
    var results = yield storageInstance.findDocumentsById([documentId], false);
    var doc = results[0];
    if (doc) {
      return doc;
    } else {
      return void 0;
    }
  });
}
function writeSingle(instance, writeRow, context) {
  return __async(this, null, function* () {
    var writeResult = yield instance.bulkWrite([writeRow], context);
    if (writeResult.error.length > 0) {
      var error = writeResult.error[0];
      throw error;
    } else {
      var ret = writeResult.success[0];
      return ret;
    }
  });
}
function observeSingle(storageInstance, documentId) {
  var firstFindPromise = getSingleDocument(storageInstance, documentId);
  var ret = storageInstance.changeStream().pipe(map((evBulk) => evBulk.events.find((ev) => ev.documentId === documentId)), filter((ev) => !!ev), map((ev) => Promise.resolve(ensureNotFalsy(ev).documentData)), startWith(firstFindPromise), switchMap((v) => v), filter((v) => !!v));
  return ret;
}
function stackCheckpoints(checkpoints) {
  return Object.assign({}, ...checkpoints);
}
function throwIfIsStorageWriteError(collection, documentId, writeData, error) {
  if (error) {
    if (error.status === 409) {
      throw newRxError("CONFLICT", {
        collection: collection.name,
        id: documentId,
        writeError: error,
        data: writeData
      });
    } else if (error.status === 422) {
      throw newRxError("VD2", {
        collection: collection.name,
        id: documentId,
        writeError: error,
        data: writeData
      });
    } else {
      throw error;
    }
  }
}
function categorizeBulkWriteRows(storageInstance, primaryPath, docsInDb, bulkWriteRows, context, onInsert, onUpdate) {
  var hasAttachments = !!storageInstance.schema.attachments;
  var bulkInsertDocs = [];
  var bulkUpdateDocs = [];
  var errors = [];
  var eventBulkId = randomCouchString(10);
  var eventBulk = {
    id: eventBulkId,
    events: [],
    checkpoint: null,
    context,
    startTime: now(),
    endTime: 0
  };
  var eventBulkEvents = eventBulk.events;
  var attachmentsAdd = [];
  var attachmentsRemove = [];
  var attachmentsUpdate = [];
  var hasDocsInDb = docsInDb.size > 0;
  var newestRow;
  var rowAmount = bulkWriteRows.length;
  var _loop = function() {
    var writeRow = bulkWriteRows[rowId];
    var document = writeRow.document;
    var previous = writeRow.previous;
    var docId = document[primaryPath];
    var documentDeleted = document._deleted;
    var previousDeleted = previous && previous._deleted;
    var documentInDb = void 0;
    if (hasDocsInDb) {
      documentInDb = docsInDb.get(docId);
    }
    var attachmentError;
    if (!documentInDb) {
      var insertedIsDeleted = documentDeleted ? true : false;
      if (hasAttachments) {
        Object.entries(document._attachments).forEach(([attachmentId, attachmentData]) => {
          if (!attachmentData.data) {
            attachmentError = {
              documentId: docId,
              isError: true,
              status: 510,
              writeRow,
              attachmentId
            };
            errors.push(attachmentError);
          } else {
            attachmentsAdd.push({
              documentId: docId,
              attachmentId,
              attachmentData,
              digest: attachmentData.digest
            });
          }
        });
      }
      if (!attachmentError) {
        if (hasAttachments) {
          bulkInsertDocs.push(stripAttachmentsDataFromRow(writeRow));
          if (onInsert) {
            onInsert(document);
          }
        } else {
          bulkInsertDocs.push(writeRow);
          if (onInsert) {
            onInsert(document);
          }
        }
        newestRow = writeRow;
      }
      if (!insertedIsDeleted) {
        var event = {
          documentId: docId,
          operation: "INSERT",
          documentData: hasAttachments ? stripAttachmentsDataFromDocument(document) : document,
          previousDocumentData: hasAttachments && previous ? stripAttachmentsDataFromDocument(previous) : previous
        };
        eventBulkEvents.push(event);
      }
    } else {
      var revInDb = documentInDb._rev;
      if (!previous || !!previous && revInDb !== previous._rev) {
        var err = {
          isError: true,
          status: 409,
          documentId: docId,
          writeRow,
          documentInDb
        };
        errors.push(err);
        return 1;
      }
      var updatedRow = hasAttachments ? stripAttachmentsDataFromRow(writeRow) : writeRow;
      if (hasAttachments) {
        if (documentDeleted) {
          if (previous) {
            Object.keys(previous._attachments).forEach((attachmentId) => {
              attachmentsRemove.push({
                documentId: docId,
                attachmentId,
                digest: ensureNotFalsy(previous)._attachments[attachmentId].digest
              });
            });
          }
        } else {
          Object.entries(document._attachments).find(([attachmentId, attachmentData]) => {
            var previousAttachmentData = previous ? previous._attachments[attachmentId] : void 0;
            if (!previousAttachmentData && !attachmentData.data) {
              attachmentError = {
                documentId: docId,
                documentInDb,
                isError: true,
                status: 510,
                writeRow,
                attachmentId
              };
            }
            return true;
          });
          if (!attachmentError) {
            Object.entries(document._attachments).forEach(([attachmentId, attachmentData]) => {
              var previousAttachmentData = previous ? previous._attachments[attachmentId] : void 0;
              if (!previousAttachmentData) {
                attachmentsAdd.push({
                  documentId: docId,
                  attachmentId,
                  attachmentData,
                  digest: attachmentData.digest
                });
              } else {
                var newDigest = updatedRow.document._attachments[attachmentId].digest;
                if (attachmentData.data && /**
                 * Performance shortcut,
                 * do not update the attachment data if it did not change.
                 */
                previousAttachmentData.digest !== newDigest) {
                  attachmentsUpdate.push({
                    documentId: docId,
                    attachmentId,
                    attachmentData,
                    digest: attachmentData.digest
                  });
                }
              }
            });
          }
        }
      }
      if (attachmentError) {
        errors.push(attachmentError);
      } else {
        if (hasAttachments) {
          bulkUpdateDocs.push(stripAttachmentsDataFromRow(updatedRow));
          if (onUpdate) {
            onUpdate(document);
          }
        } else {
          bulkUpdateDocs.push(updatedRow);
          if (onUpdate) {
            onUpdate(document);
          }
        }
        newestRow = updatedRow;
      }
      var eventDocumentData = null;
      var previousEventDocumentData = null;
      var operation = null;
      if (previousDeleted && !documentDeleted) {
        operation = "INSERT";
        eventDocumentData = hasAttachments ? stripAttachmentsDataFromDocument(document) : document;
      } else if (previous && !previousDeleted && !documentDeleted) {
        operation = "UPDATE";
        eventDocumentData = hasAttachments ? stripAttachmentsDataFromDocument(document) : document;
        previousEventDocumentData = previous;
      } else if (documentDeleted) {
        operation = "DELETE";
        eventDocumentData = ensureNotFalsy(document);
        previousEventDocumentData = previous;
      } else {
        throw newRxError("SNH", {
          args: {
            writeRow
          }
        });
      }
      var _event = {
        documentId: docId,
        documentData: eventDocumentData,
        previousDocumentData: previousEventDocumentData,
        operation
      };
      eventBulkEvents.push(_event);
    }
  };
  for (var rowId = 0; rowId < rowAmount; rowId++) {
    if (_loop()) continue;
  }
  return {
    bulkInsertDocs,
    bulkUpdateDocs,
    newestRow,
    errors,
    eventBulk,
    attachmentsAdd,
    attachmentsRemove,
    attachmentsUpdate
  };
}
function stripAttachmentsDataFromRow(writeRow) {
  return {
    previous: writeRow.previous,
    document: stripAttachmentsDataFromDocument(writeRow.document)
  };
}
function getAttachmentSize(attachmentBase64String) {
  return atob(attachmentBase64String).length;
}
function attachmentWriteDataToNormalData(writeData) {
  var data = writeData.data;
  if (!data) {
    return writeData;
  }
  var ret = {
    length: getAttachmentSize(data),
    digest: writeData.digest,
    type: writeData.type
  };
  return ret;
}
function stripAttachmentsDataFromDocument(doc) {
  if (!doc._attachments || Object.keys(doc._attachments).length === 0) {
    return doc;
  }
  var useDoc = flatClone(doc);
  useDoc._attachments = {};
  Object.entries(doc._attachments).forEach(([attachmentId, attachmentData]) => {
    useDoc._attachments[attachmentId] = attachmentWriteDataToNormalData(attachmentData);
  });
  return useDoc;
}
function flatCloneDocWithMeta(doc) {
  return Object.assign({}, doc, {
    _meta: flatClone(doc._meta)
  });
}
function getWrappedStorageInstance(database, storageInstance, rxJsonSchema) {
  overwritable.deepFreezeWhenDevMode(rxJsonSchema);
  var ret = {
    originalStorageInstance: storageInstance,
    schema: storageInstance.schema,
    internals: storageInstance.internals,
    collectionName: storageInstance.collectionName,
    databaseName: storageInstance.databaseName,
    options: storageInstance.options,
    bulkWrite(rows, context) {
      var databaseToken = database.token;
      var toStorageWriteRows = new Array(rows.length);
      var time = now();
      for (var index = 0; index < rows.length; index++) {
        var writeRow = rows[index];
        var document = flatCloneDocWithMeta(writeRow.document);
        document._meta.lwt = time;
        var previous = writeRow.previous;
        document._rev = createRevision(databaseToken, previous);
        toStorageWriteRows[index] = {
          document,
          previous
        };
      }
      runPluginHooks("preStorageWrite", {
        storageInstance: this.originalStorageInstance,
        rows: toStorageWriteRows
      });
      return database.lockedRun(() => storageInstance.bulkWrite(toStorageWriteRows, context)).then((writeResult) => {
        var useWriteResult = {
          error: [],
          success: writeResult.success.slice(0)
        };
        var reInsertErrors = writeResult.error.length === 0 ? [] : writeResult.error.filter((error) => {
          if (error.status === 409 && !error.writeRow.previous && !error.writeRow.document._deleted && ensureNotFalsy(error.documentInDb)._deleted) {
            return true;
          }
          useWriteResult.error.push(error);
          return false;
        });
        if (reInsertErrors.length > 0) {
          var reInserts = reInsertErrors.map((error) => {
            return {
              previous: error.documentInDb,
              document: Object.assign({}, error.writeRow.document, {
                _rev: createRevision(database.token, error.documentInDb)
              })
            };
          });
          return database.lockedRun(() => storageInstance.bulkWrite(reInserts, context)).then((subResult) => {
            appendToArray(useWriteResult.error, subResult.error);
            appendToArray(useWriteResult.success, subResult.success);
            return useWriteResult;
          });
        }
        return writeResult;
      });
    },
    query(preparedQuery) {
      return database.lockedRun(() => storageInstance.query(preparedQuery));
    },
    count(preparedQuery) {
      return database.lockedRun(() => storageInstance.count(preparedQuery));
    },
    findDocumentsById(ids, deleted) {
      return database.lockedRun(() => storageInstance.findDocumentsById(ids, deleted));
    },
    getAttachmentData(documentId, attachmentId, digest) {
      return database.lockedRun(() => storageInstance.getAttachmentData(documentId, attachmentId, digest));
    },
    getChangedDocumentsSince: !storageInstance.getChangedDocumentsSince ? void 0 : (limit, checkpoint) => {
      return database.lockedRun(() => storageInstance.getChangedDocumentsSince(ensureNotFalsy(limit), checkpoint));
    },
    cleanup(minDeletedTime) {
      return database.lockedRun(() => storageInstance.cleanup(minDeletedTime));
    },
    remove() {
      database.storageInstances.delete(ret);
      return database.lockedRun(() => storageInstance.remove());
    },
    close() {
      database.storageInstances.delete(ret);
      return database.lockedRun(() => storageInstance.close());
    },
    changeStream() {
      return storageInstance.changeStream();
    },
    conflictResultionTasks() {
      return storageInstance.conflictResultionTasks();
    },
    resolveConflictResultionTask(taskSolution) {
      if (taskSolution.output.isEqual) {
        return storageInstance.resolveConflictResultionTask(taskSolution);
      }
      var doc = Object.assign({}, taskSolution.output.documentData, {
        _meta: getDefaultRxDocumentMeta(),
        _rev: getDefaultRevision(),
        _attachments: {}
      });
      var documentData = flatClone(doc);
      delete documentData._meta;
      delete documentData._rev;
      delete documentData._attachments;
      return storageInstance.resolveConflictResultionTask({
        id: taskSolution.id,
        output: {
          isEqual: false,
          documentData
        }
      });
    }
  };
  database.storageInstances.add(ret);
  return ret;
}
function ensureRxStorageInstanceParamsAreCorrect(params) {
  if (params.schema.keyCompression) {
    throw newRxError("UT5", {
      args: {
        params
      }
    });
  }
  if (hasEncryption(params.schema)) {
    throw newRxError("UT6", {
      args: {
        params
      }
    });
  }
  if (params.schema.attachments && params.schema.attachments.compression) {
    throw newRxError("UT7", {
      args: {
        params
      }
    });
  }
}
function hasEncryption(jsonSchema) {
  if (!!jsonSchema.encrypted && jsonSchema.encrypted.length > 0 || jsonSchema.attachments && jsonSchema.attachments.encrypted) {
    return true;
  } else {
    return false;
  }
}
function getChangedDocumentsSinceQuery(storageInstance, limit, checkpoint) {
  var primaryPath = getPrimaryFieldOfPrimaryKey(storageInstance.schema.primaryKey);
  var sinceLwt = checkpoint ? checkpoint.lwt : RX_META_LWT_MINIMUM;
  var sinceId = checkpoint ? checkpoint.id : "";
  return normalizeMangoQuery(storageInstance.schema, {
    selector: {
      $or: [{
        "_meta.lwt": {
          $gt: sinceLwt
        }
      }, {
        "_meta.lwt": {
          $eq: sinceLwt
        },
        [primaryPath]: {
          $gt: checkpoint ? sinceId : ""
        }
      }],
      // add this hint for better index usage
      "_meta.lwt": {
        $gte: sinceLwt
      }
    },
    sort: [{
      "_meta.lwt": "asc"
    }, {
      [primaryPath]: "asc"
    }],
    skip: 0,
    limit
    /**
     * DO NOT SET A SPECIFIC INDEX HERE!
     * The query might be modified by some plugin
     * before sending it to the storage.
     * We can be sure that in the end the query planner
     * will find the best index.
     */
    // index: ['_meta.lwt', primaryPath]
  });
}
function getChangedDocumentsSince(storageInstance, limit, checkpoint) {
  return __async(this, null, function* () {
    if (storageInstance.getChangedDocumentsSince) {
      return storageInstance.getChangedDocumentsSince(limit, checkpoint);
    }
    var primaryPath = getPrimaryFieldOfPrimaryKey(storageInstance.schema.primaryKey);
    var query = prepareQuery(storageInstance.schema, getChangedDocumentsSinceQuery(storageInstance, limit, checkpoint));
    var result = yield storageInstance.query(query);
    var documents = result.documents;
    var lastDoc = lastOfArray(documents);
    return {
      documents,
      checkpoint: lastDoc ? {
        id: lastDoc[primaryPath],
        lwt: lastDoc._meta.lwt
      } : checkpoint ? checkpoint : {
        id: "",
        lwt: 0
      }
    };
  });
}
function randomDelayStorage(input) {
  var randomDelayStorageWriteQueue = PROMISE_RESOLVE_TRUE;
  var retStorage = {
    name: "random-delay-" + input.storage.name,
    rxdbVersion: RXDB_VERSION,
    createStorageInstance(params) {
      return __async(this, null, function* () {
        yield promiseWait(input.delayTimeBefore());
        var storageInstance = yield input.storage.createStorageInstance(params);
        yield promiseWait(input.delayTimeAfter());
        return {
          databaseName: storageInstance.databaseName,
          internals: storageInstance.internals,
          options: storageInstance.options,
          schema: storageInstance.schema,
          collectionName: storageInstance.collectionName,
          bulkWrite(a, b) {
            randomDelayStorageWriteQueue = randomDelayStorageWriteQueue.then(() => __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var response = yield storageInstance.bulkWrite(a, b);
              yield promiseWait(input.delayTimeAfter());
              return response;
            }));
            var ret = randomDelayStorageWriteQueue;
            return ret;
          },
          findDocumentsById(a, b) {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.findDocumentsById(a, b);
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          },
          query(a) {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.query(a);
              return ret;
            });
          },
          count(a) {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.count(a);
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          },
          getAttachmentData(a, b, c) {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.getAttachmentData(a, b, c);
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          },
          getChangedDocumentsSince: !storageInstance.getChangedDocumentsSince ? void 0 : (a, b) => __async(this, null, function* () {
            yield promiseWait(input.delayTimeBefore());
            var ret = yield ensureNotFalsy(storageInstance.getChangedDocumentsSince)(a, b);
            yield promiseWait(input.delayTimeAfter());
            return ret;
          }),
          changeStream() {
            return storageInstance.changeStream();
          },
          conflictResultionTasks() {
            return storageInstance.conflictResultionTasks();
          },
          resolveConflictResultionTask(a) {
            return storageInstance.resolveConflictResultionTask(a);
          },
          cleanup(a) {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.cleanup(a);
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          },
          close() {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.close();
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          },
          remove() {
            return __async(this, null, function* () {
              yield promiseWait(input.delayTimeBefore());
              var ret = yield storageInstance.remove();
              yield promiseWait(input.delayTimeAfter());
              return ret;
            });
          }
        };
      });
    }
  };
  return retStorage;
}

export {
  INTERNAL_STORAGE_NAME,
  RX_DATABASE_LOCAL_DOCS_STORAGE_NAME,
  getSingleDocument,
  writeSingle,
  observeSingle,
  stackCheckpoints,
  throwIfIsStorageWriteError,
  categorizeBulkWriteRows,
  stripAttachmentsDataFromRow,
  getAttachmentSize,
  attachmentWriteDataToNormalData,
  stripAttachmentsDataFromDocument,
  flatCloneDocWithMeta,
  getWrappedStorageInstance,
  ensureRxStorageInstanceParamsAreCorrect,
  hasEncryption,
  getChangedDocumentsSinceQuery,
  getChangedDocumentsSince,
  randomDelayStorage
};
//# sourceMappingURL=chunk-EPTCBPGQ.js.map
