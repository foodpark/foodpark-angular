import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HubmanagerModule} from '../app-modules/hubmanager.module';
import {TerritoryModule} from '../app-modules/territory.module';

@Injectable({
    providedIn: 'root'
})
export class HubmanagerService {

    constructor(private http: HttpClient) {
    }

    create(data: HubmanagerModule) {
        return this.http.post<HubmanagerModule>(environment.apiUrl + '/auth/register', data);
    }

    getMainHubInTerritory(territoryId: number, type: string) {
        return this.http.get<TerritoryModule>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/food_parks?type=' + type);
    }

}
