import { Injectable } from '@angular/core';
import { createRxDatabase, RxDatabase, RxCollection, RxJsonSchema, RxDocument, toTypedRxJsonSchema, ExtractDocumentTypeFromTypedRxJsonSchema, RXDB_VERSION, RxQuery, isRxDatabase, } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { v4 as uuidv4 } from 'uuid';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { addRxPlugin } from 'rxdb';

@Injectable({
  providedIn: 'root'
})

export class DatabaseRxDbService {

  constructor() {
    addRxPlugin(RxDBJsonDumpPlugin);
  }

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
      title: {
        type: 'string'
      },
      email: {
        type: 'string',
        maxlength: 100
      },
      password: {
        type: 'string',
      },
      favIcon: {
        type: 'string',
      },
      description: {
        type: 'string'
      },
      creationDate: {
        type: 'string'
      }
    },
    required: ['id', 'email', 'password', 'title'],
    encrypted: ['password']
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
        type: 'string',
        default: ''
      }
    },
    required: ['id']
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
      user: {
        schema: this.userSchema
      }
    })
  }

  async getAccount(id: number) {
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

  async insertAccount(title: string, email: string, password: string, favIcon: string | null = null, description: string = '') {
    return this.databaseInstance.accounts.insert({
      id: uuidv4(),
      title: title,
      email: email,
      password: password,
      favIcon: favIcon == null || '' ? '/icons/default-icon.svg'  : `https://${favIcon}/favicon.ico`,
      description: description,
      creationDate: this.getCurrentDate()
    });
  }

  async insertUserEmail(email: string) {
    let userCollection = this.databaseInstance.user;
    let userData: any = await userCollection.findOne('1').exec();
    if (userData) {
      return userData.patch({
        defaultEmail: email,
      });
    } else {
      return this.databaseInstance.user.insert({
        id: '1',
        defaultEmail: email,
      })
    }
  }

  editAccount(document: RxDocument, email: string, password: string, title: string, favIcon: string, description: string) {
    this.document = document;
    return this.document.patch({
      email: email,
      password: password,
      title: title,
      favIcon: favIcon,
      description: description,
      creationDate: this.getCurrentDate()
    }
    )
  }

  deleteAccount(document: RxDocument) {
    this.document.remove();
  }

  isConnectedToDb(): boolean {
    return isRxDatabase(this.databaseInstance);
  }

  getCurrentDate(): string {
    let date = new Date();
    let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return currentDate;
  }
}
