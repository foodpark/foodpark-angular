import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HubmanagerModel, TerritoryModel} from '../model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class HubmanagerService {
    private mainhubManagers: HubmanagerModel[] = [];
    private mainhubManagersUpdated = new Subject<HubmanagerModel[]>();

    constructor(private http: HttpClient) {}

    getMainHubManagersUpdateListener() {
        return this.mainhubManagersUpdated.asObservable();
    }

    create(data: HubmanagerModel) {
        return this.http.post<HubmanagerModel>(environment.apiUrl + '/auth/register', data);
    }

    getMainHubManagersInTerritory(id: number) {
        this.http.get<HubmanagerModel[]>(environment.apiUrl + '/api/v1/rel/users?territory_id=' + id)
        .subscribe((mainHubmanagerData) => {
            this.mainhubManagers = mainHubmanagerData;
            this.mainhubManagersUpdated.next([...this.mainhubManagers]);
        });
    }

    getMainHubInTerritory(territoryId: number, type: string) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/food_parks?type=' + type);
    }
}

