import { inject, Injectable } from '@angular/core';
import { createRxDatabase, RxDatabase, RxCollection, RxJsonSchema, RxDocument, toTypedRxJsonSchema, ExtractDocumentTypeFromTypedRxJsonSchema, RXDB_VERSION, RxQuery, isRxDatabase, } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { v4 as uuidv4 } from 'uuid';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { addRxPlugin } from 'rxdb';
import FileSaver from 'file-saver';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class DatabaseRxDbService {

  constructor() {
    addRxPlugin(RxDBJsonDumpPlugin);
  }

  databaseInstance!: any

  account!: RxDocument

  userData!: any

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
    await this.checkIfUserExists();
    this.subscribeToEmailChanges(this.userData)
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
    this.account = await this.databaseInstance.accounts.findOne({
      selector: {
        id: id
      }
    })
    return this.account;
  }

  searchAccountsByTitle(accountName: string) {
    return this.databaseInstance.accounts.find({
      selector: {
        title: {$regex:`/^${accountName}/i`}
      }
    })
  }

  getAccountById(idParam:any) {
    return this.databaseInstance.accounts.findOne({
      selector: {
        id: idParam
      }
    })
  }

  async insertAccount(title: string, email: string, password: string, favIcon: string | null = null, description: string = '') {
    return this.databaseInstance.accounts.insert({
      id: uuidv4(),
      title: title,
      email: email,
      password: password,
      favIcon: favIcon,
      description: description,
      creationDate: this.getCurrentDate()
    });
  }

  async insertUserEmail(email: string) {
      return this.databaseInstance.user.insert({
        id: '1',
        defaultEmail: email,
      })
  }

  async patchUserEmail( email: string){
    this.userData.patch({
      id: '1',
      defaultEmail: email,
    })
  }
  
  async getUserData(){
    return this.databaseInstance.user.findOne('1').exec();
  }

  async checkIfUserExists(){
    let user = await this.getUserData()
    if(user){
      this.userData = user
    }else{
      this.userData = await this.insertUserEmail('');
    }
  }

  async subscribeToEmailChanges(userData:any){
    userData.$.subscribe((user:any) => {
        this.userData = user
      })
  }

  editAccount(account: RxDocument<any>,title: string, email: string, password: string,  favIcon: string, description: string) {
    this.account = account;
    return this.account.patch({
      id: account.id,
      title: title  ? title : account.title,
      email: email ? email : account.email,
      password: password ? password : account.password,
      favIcon: favIcon == '' ? null : favIcon,
      description: description == '' ? null : description,
      creationDate: account.creationDate
    }
    )
  }

  deleteAccount(account: RxDocument) {
    this.account.remove();
  }

  isConnectedToDb(): boolean {
    return isRxDatabase(this.databaseInstance);
  }

  getCurrentDate(): string {
    let date = new Date();
    let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return currentDate;
  }

  exportDatabase(){ 
    this.databaseInstance.accounts.exportJSON().then((jsonData:any) => {
      const file = new File([JSON.stringify(jsonData)], `${'password-backup'}.json`, {type:'application/json'});
      FileSaver.saveAs(file);
    })
  }

  deleteDatabase(){
    this.databaseInstance.remove();
  }
  
}
