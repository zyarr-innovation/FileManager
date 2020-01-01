import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FolderService {
    constructor (private httpClient: HttpClient) {
    }

    getDataList(currentUrl: string) {
        return this.httpClient.get(currentUrl);
    }
}