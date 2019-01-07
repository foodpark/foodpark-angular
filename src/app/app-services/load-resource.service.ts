import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoadResourceService {

    constructor(private http: HttpClient) {
    }

    getPodOfLoggedInUser(userId: number) {
    }
}
