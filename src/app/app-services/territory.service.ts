import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

    addTerritory(data: FormData) {
        return this.http.post<TerritoryModel>(environment.apiUrl + '/api/v1/rel/territories', data)
            .subscribe((response) => {
                this.territories.push(response);
                this.territoriesUpdated.next([...this.territories]);
            });
    }

    deleteTerritory(deleteTerritoryID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/territories/' + deleteTerritoryID);
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
      return this.http.post(environment.apiUrl + '/auth/register ', data);

    }

    getCompanydetails(Id: number) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/companies?user_id=' + Id);
    }

    updateCompanydetails(companyDetails) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/companies/' + companyDetails.id, companyDetails);
    }
}
