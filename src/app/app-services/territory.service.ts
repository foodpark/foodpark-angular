import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TerritoryModel} from '../app-modules/territory.model';

@Injectable({
    providedIn: 'root'
})
export class TerritoryService {

    constructor(private http: HttpClient) {
    }

    getTerritories() {
        return this.http.get<TerritoryModel[]>(environment.apiUrl + '/api/v1/rel/territories');
    }

    addTerritories(data) {
        this.http.post(environment.apiUrl + '/api/v1/rel/territories', data);
    }

    deleteTerritories(id) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/territories/' + id);
    }

    getTerritoriesInCountry(countryId: number) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/countries/' + countryId + '/territories');
    }
}
