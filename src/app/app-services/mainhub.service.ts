import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainhubModel} from '../app-modules/mainhub.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MainhubService {

    constructor(private http: HttpClient) {
    }

    create(data) {
        return this.http.post<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks', data);
    }
}
