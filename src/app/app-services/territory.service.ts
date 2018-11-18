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
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories');
    }

    getTerritoriesInCountry(countryId: number) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/countries/' + countryId + '/territories');
    }
}
