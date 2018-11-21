import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HubmanagerModel, TerritoryModel} from '../model';

@Injectable({
    providedIn: 'root'
})
export class HubmanagerService {

    constructor(private http: HttpClient) {
    }

    create(data: HubmanagerModel) {
        return this.http.post<HubmanagerModel>(environment.apiUrl + '/auth/register', data);
    }

    getMainHubInTerritory(territoryId: number, type: string) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/food_parks?type=' + type);
    }

}
