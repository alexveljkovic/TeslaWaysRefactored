import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }
    async setValue(key, value) {
        await this.storage.set(key, JSON.stringify(value));
    }

    async getValue(key) {
        const res = await this.storage.get(JSON.parse(key));
        return res;
    }
}
