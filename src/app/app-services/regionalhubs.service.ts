import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegionalHubModel} from '../model';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class RegionalhubsService {
    private regionalHubs: RegionalHubModel[] = [];
    private regionalUpdated = new Subject<RegionalHubModel[]>();

    constructor(private http: HttpClient) {
    }

    getRegionalHubsUpdateListener() {
        return this.regionalUpdated.asObservable();
    }

    getRegionalHubs() {
        this.http.get<RegionalHubModel[]>(environment.apiUrl + '/api/v1/rel/regionalhubs')
            .subscribe((regionalHubData) => {
                this.regionalHubs = regionalHubData;
                this.regionalUpdated.next([...this.regionalHubs]);
            });
    }

    addRegionalHub(data) {
        return this.http.post<RegionalHubModel>(environment.apiUrl + '/api/v1/rel/regionalhubs', data)
            .subscribe((response) => {
                this.regionalHubs.push(response);
                this.regionalUpdated.next([...this.regionalHubs]);
            });
    }

    deleteRegionalHub(deleteRegionalHubID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/regionalhubs/' + deleteRegionalHubID);
    }

    editRegionalHub(regionalhubs: RegionalHubModel) {
        this.http.put<RegionalHubModel>(environment.apiUrl + '/api/v1/rel/regionalhubs/' + regionalhubs['id'], regionalhubs)
            .subscribe((response) => {
                this.getRegionalHubs();
            });
    }
}
