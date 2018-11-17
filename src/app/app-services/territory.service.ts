import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TerritoryModule} from '../app-modules/territory.module';

@Injectable({
    providedIn: 'root'
})
export class TerritoryService {

    constructor(private http: HttpClient) {
    }

    getTerritories() {
        return this.http.get<TerritoryModule>(environment.apiUrl + '/api/v1/rel/territories');
    }

    getTerritoriesInCountry(countryId: number) {
        return this.http.get<TerritoryModule>(environment.apiUrl + '/api/v1/rel/countries/' + countryId + '/territories');
    }
}
