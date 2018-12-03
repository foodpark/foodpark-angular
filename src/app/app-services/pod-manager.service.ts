import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PodsManagerService {

    constructor(private http: HttpClient) {}


    apigetLoadRequests() {
        return this.http.get(environment.apiUrl + '/api/v1/rel/loads');
    }
    apicreateLoadRequests(data) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/loads',data);
    }
}
