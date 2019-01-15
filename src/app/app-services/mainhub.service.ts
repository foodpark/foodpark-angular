import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MainhubModel} from '../model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainhubService {
    mainhubs: MainhubModel[] = [];
    private mainhubsUpdated = new Subject<MainhubModel[]>();

    constructor(private http: HttpClient) {
    }

    getMainhubsUpdateListener() {
        return this.mainhubsUpdated.asObservable();
    }

    getMainhubs() {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks')
            .subscribe((res) => {
                this.mainhubs = res;
                this.mainhubsUpdated.next([...this.mainhubs]);
            });
    }

    getMainhubFromId(mainhubID) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/food_parks/' + mainhubID);
    }

    addMainhub(data: FormData) {
        return this.http.post<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks', data);
    }

    deleteMainhub(deleteMainhubID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/food_parks/' + deleteMainhubID);
    }

    editMainhub(mainhub: MainhubModel, mainHubId: number) {
        return this.http.put<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId, mainhub);
    }

    getTerritoriesInCountry(countryId: number) {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks/' + countryId + '/food_parks')
            .subscribe((territoryData) => {
                this.mainhubs = territoryData;
                this.mainhubsUpdated.next([...this.mainhubs]);
            });
    }

    getMainhubsInCountry(countryName: string) {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?type=MAIN&country=' + countryName)
            .subscribe((territoryData) => {
                this.mainhubs = territoryData;
                this.mainhubsUpdated.next([...this.mainhubs]);
            });
    }

    getMainHubsInTerritory(countryName: string, territoryId: number) {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?type=MAIN&country=' + countryName + '&territory_id=' + territoryId)
            .subscribe((territoryData) => {
                this.mainhubs = territoryData;
                this.mainhubsUpdated.next([...this.mainhubs]);
            });
    }

    getMainhubOfLoggedInUser(id: string) {
        return this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?type=MAIN&foodpark_mgr=' + id);
    }
}
