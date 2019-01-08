import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {CategoryModel, LoadItemModel, PodModel} from '../model';

@Injectable({
    providedIn: 'root'
})

export class PodsManagerService {

    constructor(private http: HttpClient) {
    }

    getCategories() {
        return this.http.get<CategoryModel[]>(environment.apiUrl + '/api/v1/rel/categories');
    }

    getLoadRequests() {
        return this.http.get(environment.apiUrl + '/api/v1/rel/loads');
    }

    getLoadRequestsFromPodId(podId: number) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/churches/' + podId + '/loads');
    }

    getLoadRequestsFromId(id: number) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/loads/' + id);
    }

    createLoadRequest(data) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/loads', data);
    }

    deleteLoadRequest(deleteid) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/loads/' + deleteid);
    }

    getLoadItems(id) {
        return this.http.get<LoadItemModel[]>(environment.apiUrl + '/api/v1/rel/load_items?load_id=' + id);
    }

    createLoadItem(data) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/load_items', data);
    }

    updateLoadItem(loadid, data) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/load_items/' + loadid, data);
    }

    deleteLoadItem(loaditemsid) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/load_items/' + loaditemsid);
    }

    getPodOfLoggedInUser(userId: number) {
        return this.http.get<PodModel>(environment.apiUrl + '/api/v1/rel/churches?user_id=' + userId);
    }

}
