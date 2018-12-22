import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import { CategoryModel, LoadItemModel } from '../model';

@Injectable({
    providedIn: 'root'
})

export class PodsManagerService {

    constructor(private http: HttpClient) {}

    apigetcategories() {
      return this.http.get<CategoryModel[]>(environment.apiUrl + '/api/v1/rel/categories');
    }

    apigetLoadRequests() {
      return this.http.get(environment.apiUrl + '/api/v1/rel/loads');
    }

    apicreateLoadRequests(data) {
      return this.http.post(environment.apiUrl + '/api/v1/rel/loads', data);
    }

    apideleteLoadRequests(deleteid) {
      return this.http.delete(environment.apiUrl + '/api/v1/rel/loads/' + deleteid);
    }

    apigetLoadItems(id) {
      return this.http.get<LoadItemModel[]>(environment.apiUrl + '/api/v1/rel/load_items?load_id=' + id);
    }

    apicreateLoadItems(data) {
      return this.http.post(environment.apiUrl + '/api/v1/rel/load_items', data);
    }

    apiDeleteLoadItems(loaditemsid) {
      return this.http.delete(environment.apiUrl + '/api/v1/rel/load_items/' + loaditemsid);
    }

}
