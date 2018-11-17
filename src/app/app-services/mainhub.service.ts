import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainhubModule} from '../app-modules/mainhub.module';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MainhubService {

    constructor(private http: HttpClient) {
    }

    create(data) {
        return this.http.post<MainhubModule>(environment.apiUrl + '/api/v1/rel/food_parks', data);
    }
}
