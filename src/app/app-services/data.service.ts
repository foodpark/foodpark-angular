import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
    }

    getJsonData(role: string): Observable<any> {
        return this.http.get('assets/json/' + role + '-leftnav.json').pipe(map(res => {
            return res || {};
        }));
    }
}
