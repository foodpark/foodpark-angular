import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TerritoryModel} from '../app-modules/territory.model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TerritoryService {
    private territories: TerritoryModel[] = [];
    private territoriesUpdated = new Subject<TerritoryModel[]>();

    constructor(private http: HttpClient) {
    }

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

    addTerritory(data) {
        this.http.post(environment.apiUrl + '/api/v1/rel/territories', data)
            .subscribe((response) => {
                this.territoriesUpdated.next([...this.territories]);
            });
    }

    deleteTerritory(deleteTerritoryID) {
        this.http.delete(environment.apiUrl + '/api/v1/rel/territories/' + deleteTerritoryID)
            .subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Request sent!');
                        break;
                    case HttpEventType.Response:
                        console.log('😺 Done!', event.body);
                }
                // this.territoriesUpdated.next([...this.territories]);
            });
    }

    editTerritory(territory: TerritoryModel) {
        this.http.put<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories/' + territory['id'], territory)
            .subscribe((response) => {
                this.territories = this.territories.filter((function (value) {
                    return value !== response;
                }));
                this.territoriesUpdated.next([...this.territories]);
            });
    }

    getTerritoriesInCountry(countryId: number) {
        this.http.get<TerritoryModel[]>(environment.apiUrl + '/api/v1/rel/countries/' + countryId + '/territories')
            .subscribe((territoryData) => {
                this.territories = territoryData;
                this.territoriesUpdated.next([...this.territories]);
            });
    }

    getMainHubInTerritory(territoryId: number, type: string) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/food_parks?type=' + type);
    }

    getRegionalHubInMainhib(mainhubId: number) {
        return this.http.get<TerritoryModel>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainhubId + '/regionalhubs');
    }

    Apicreatepods(data){
      return this.http.post(environment.apiUrl + ' /auth/register ', data);

    }
}
