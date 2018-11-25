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

    addMainhub(data: FormData) {
        return this.http.post<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks', data);
    }

    deleteMainhub(deleteMainhubID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/food_parks/' + deleteMainhubID);
    }

    editMainhub(mainhub: MainhubModel) {
        this.http.put<MainhubModel>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainhub['id'], mainhub)
            .subscribe((response) => {
                this.mainhubs = this.mainhubs.filter((function (value) {
                    return value !== response;
                }));
                this.mainhubsUpdated.next([...this.mainhubs]);
            });
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

    getMainHubsIn(countryName: string, territoryId: number) {
        this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?type=MAIN&country=' + countryName + '&territory_id=' + territoryId)
        .subscribe((territoryData) => {
            this.mainhubs = territoryData;
            this.mainhubsUpdated.next([...this.mainhubs]);
        });
    }

    getMainhubOfLoggedInUser(id: string) {
        return  this.http.get<MainhubModel[]>(environment.apiUrl + '/api/v1/rel/food_parks?type=MAIN&foodpark_mgr=' + id);
    }
}
