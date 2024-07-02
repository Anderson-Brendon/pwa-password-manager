import { Injectable } from '@angular/core';
import { createRxDatabase, RxDatabase, RxCollection, RxJsonSchema, RxDocument, toTypedRxJsonSchema, ExtractDocumentTypeFromTypedRxJsonSchema, RXDB_VERSION, RxQuery, isRxDatabase, } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { v4 as uuidv4 } from 'uuid';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';

@Injectable({
  providedIn: 'root'
})

export class DatabaseRxDbService {

  constructor() {}

  databaseInstance!: any

  document!: RxDocument

  userCollection!: RxCollection

  accountCollection!: RxCollection

  accountSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100
      },
      email: {
        type: 'string',
        maxlength: 100
      },
      password: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      favIcon: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    },
    required: ['id','email', 'password', 'title']
  }//accounts

  userSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100
      },
      defaultEmail: {
        type: 'string'
      }
    },
    required: ['id','masterPassword']
  }

  async startDatabaseInstance(psw: string) {
    const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
      storage: getRxStorageDexie()
  });
    this.databaseInstance = await createRxDatabase({
      name: 'pwa-password-manager',
      storage: encryptedDexieStorage,
      password: psw
    });
    await this.createCollections();
  }

  async createCollections() {
    await this.databaseInstance.addCollections({
      accounts: {
        schema: this.accountSchema
      },
      user:{
        schema: this.userSchema
      }
    })
  }

  async getAccountInfo(id: number) {
    this.document = await this.databaseInstance.accounts.findOne({
      selector: {
        id: id
      }
    })
    return this.document;
  }

  searchAccountsByTitle(accountName: string) {
     this.databaseInstance.accounts.find({
      selector: {
        title: accountName
      }
    }).$
  }

  getAccountById(idParam: number) {
    return this.databaseInstance.accounts.find({
      selector: {
        id: idParam
      }
    }).$;
  }

  async insertAccountInfo(email: string, password: string, title: string, favIcon: string, description: string) {
    return this.databaseInstance.accounts.insert({
      id: uuidv4(),
      email: email,
      password: password,
      title: title,
      favIcon: favIcon,
      description: description
    });
  }

  async insertUserInfo( EmailArg: string) {
    return this.databaseInstance.user.insert({
      id: uuidv4(),
      defaultEmail: EmailArg,
    });
  }

  editAccountInfo(document: RxDocument, email: string, password: string, title: string, favIcon: string, description: string) {
    this.document = document;
    return this.document.patch({
      email: email,
      password: password,
      title: title,
      favIcon:favIcon,
      description: description
    })
  }

  deleteAccountInfo(document: RxDocument) {
    this.document.remove();
  }

 isConnectedToDb(): boolean{
  return isRxDatabase(this.databaseInstance);
 }

}
