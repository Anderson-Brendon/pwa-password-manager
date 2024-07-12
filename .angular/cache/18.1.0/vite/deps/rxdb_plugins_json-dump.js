import {
  _getDefaultQuery,
  createRxQuery,
  flatClone,
  getDefaultRevision,
  newRxError,
  now,
  queryCollection
} from "./chunk-WT66J2WX.js";
import "./chunk-H7XVPIDD.js";
import {
  __async
} from "./chunk-7RSYZEEK.js";

// node_modules/rxdb/dist/esm/plugins/json-dump/index.js
function dumpRxDatabase(collections) {
  var json = {
    name: this.name,
    instanceToken: this.token,
    collections: []
  };
  var useCollections = Object.keys(this.collections).filter((colName) => !collections || collections.includes(colName)).filter((colName) => colName.charAt(0) !== "_").map((colName) => this.collections[colName]);
  return Promise.all(useCollections.map((col) => col.exportJSON())).then((cols) => {
    json.collections = cols;
    return json;
  });
}
var importDumpRxDatabase = function(dump) {
  var missingCollections = dump.collections.filter((col) => !this.collections[col.name]).map((col) => col.name);
  if (missingCollections.length > 0) {
    throw newRxError("JD1", {
      missingCollections
    });
  }
  return Promise.all(dump.collections.map((colDump) => this.collections[colDump.name].importJSON(colDump)));
};
var dumpRxCollection = function() {
  return __async(this, null, function* () {
    var json = {
      name: this.name,
      schemaHash: yield this.schema.hash,
      docs: []
    };
    var query = createRxQuery("find", _getDefaultQuery(), this);
    return queryCollection(query).then((docs) => {
      json.docs = docs.map((docData) => {
        docData = flatClone(docData);
        delete docData._rev;
        delete docData._attachments;
        return docData;
      });
      return json;
    });
  });
};
function importDumpRxCollection(exportedJSON) {
  return __async(this, null, function* () {
    if (exportedJSON.schemaHash !== (yield this.schema.hash)) {
      throw newRxError("JD2", {
        schemaHash: exportedJSON.schemaHash,
        own: this.schema.hash
      });
    }
    var docs = exportedJSON.docs;
    return this.storageInstance.bulkWrite(docs.map((docData) => {
      var document = Object.assign({}, docData, {
        _meta: {
          lwt: now()
        },
        _rev: getDefaultRevision(),
        _attachments: {},
        _deleted: false
      });
      return {
        document
      };
    }), "json-dump-import");
  });
}
var RxDBJsonDumpPlugin = {
  name: "json-dump",
  rxdb: true,
  prototypes: {
    RxDatabase: (proto) => {
      proto.exportJSON = dumpRxDatabase;
      proto.importJSON = importDumpRxDatabase;
    },
    RxCollection: (proto) => {
      proto.exportJSON = dumpRxCollection;
      proto.importJSON = importDumpRxCollection;
    }
  },
  overwritable: {}
};
export {
  RxDBJsonDumpPlugin
};
//# sourceMappingURL=rxdb_plugins_json-dump.js.map
