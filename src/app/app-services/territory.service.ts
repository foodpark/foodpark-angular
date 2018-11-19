import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TerritoryModel} from '../app-modules/territory.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TerritoryService {
    private territories: TerritoryModel[] = [];
    private territoriesUpdated = new Subject<TerritoryModel[]>();
    constructor(private http: HttpClient) {}

    getTerritoriesUpdateListener() {
        return this.territoriesUpdated.asObservable();
    }

    getTerritories() {
        this.http.get<TerritoryModel[]>(environment.apiUrl + '/api/v1/rel/territories')
            .subscribe((territoryData) => {
                this.territories = territoryData;
                this.territoriesUpdated.next([...this.territories]);
            });
    }

    addTerritories(data) {
        this.http.post(environment.apiUrl + '/api/v1/rel/territories', data);
    }

    deleteTerritories(id) {
        this.http.delete(environment.apiUrl + '/api/v1/rel/territories' + id);
    }

    getTerritoriesInCountry(countryId: number) {
        this.http.get<TerritoryModel[]>(environment.apiUrl + '/api/v1/rel/countries/' + countryId + '/territories')
            .subscribe((territoryData) => {
                this.territories = territoryData;
                this.territoriesUpdated.next([...this.territories]);
            });
    }
}
