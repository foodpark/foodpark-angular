import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MainhubModel} from '../model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainhubService {
    mainhub: MainhubModel[] = [];
    private mainhubsUpdated = new Subject<MainhubModel[]>();

    constructor(private http: HttpClient) {
    }

    getMainhubsUpdateListener() {
        return this.mainhubsUpdated.asObservable();
    }

    getMainhubs() {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks')
            .subscribe((res) => {
                this.mainhub = res;
                this.mainhubsUpdated.next([...this.mainhub]);
            });
    }

    addMainhub(data: FormData) {
        return this.http.post<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks', data)
            .subscribe((response) => {
                this.mainhub.push(response);
                this.mainhubsUpdated.next([...this.mainhub]);
            });
    }

    deleteMainhub(deleteMainhubID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/food_parks/' + deleteMainhubID);
    }

    editMainhub(mainhub: MainhubModel) {
        this.http.put<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainhub['id'], mainhub)
            .subscribe((response) => {
                this.mainhub = this.mainhub.filter((function (value) {
                    return value !== response;
                }));
                this.mainhubsUpdated.next([...this.mainhub]);
            });
    }

    getTerritoriesInCountry(countryId: number) {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks/' + countryId + '/food_parks')
            .subscribe((territoryData) => {
                this.mainhub = territoryData;
                this.mainhubsUpdated.next([...this.mainhub]);
            });
    }

    getMainhubsInCountry(countryName: string) {
        return this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?country=' + countryName);
    }

    getMainHubInTerritory(territoryId: number, type: string) {
        return this.http.get<MainhubModel>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/food_parks?type=' + type);
    }
}
