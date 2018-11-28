import {Injectable} from '@angular/core';
import {HubPickupModel, TerritoryModel} from '../model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HubPickupService {
    private hubPickups: HubPickupModel[] = [];
    private hubPickupsUpdated = new Subject<HubPickupModel[]>();

    constructor(private http: HttpClient) {
    }

    getHubPickupUpdateListener() {
        return this.hubPickupsUpdated.asObservable();
    }

    addHubPickup(data: FormData) {
        return this.http.post<HubPickupModel>(environment.apiUrl + '/api/v1/rel/events', data)
            .subscribe((response) => {
                this.hubPickups.push(response);
                this.hubPickupsUpdated.next([...this.hubPickups]);
            });
    }

    getHubPickups() {
        this.http.get<HubPickupModel[]>(environment.apiUrl + '/api/v1/rel/events')
            .subscribe((hubPickups) => {
                this.hubPickups = hubPickups;
                this.hubPickupsUpdated.next([...this.hubPickups]);
            });
    }

    editHubPickup(hubPickup: TerritoryModel) {
        this.http.put<TerritoryModel>(environment.apiUrl + '/api/v1/rel/events/' + hubPickup['id'], hubPickup)
            .subscribe((response) => {
                this.getHubPickups();
            });
    }


    deleteHubPickup(hubPickupId: number) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/events/' + hubPickupId);
    }
}
