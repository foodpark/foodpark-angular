import {Injectable} from '@angular/core';
import {HubPickupModel} from '../model';
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

    addHubPickup(data: any) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/events', data);
    }

    getHubPickups() {
        this.http.get<HubPickupModel[]>(environment.apiUrl + '/api/v1/rel/events?manager=' + localStorage.getItem('user_id'))
            .subscribe((hubPickups) => {
                this.hubPickups = hubPickups;
                this.hubPickupsUpdated.next([...this.hubPickups]);
            });
    }

    getHubPickupsFromId(hubPickupId: number) {
        return this.http.get<HubPickupModel[]>(environment.apiUrl + '/api/v1/rel/events/' + hubPickupId);
    }

    editHubPickup(hubPickup: any) {
        return this.http.put<HubPickupModel>(environment.apiUrl + '/api/v1/rel/events/' + hubPickup['id'], hubPickup)
            .subscribe((response) => {
                this.hubPickups.push(response);
                this.hubPickupsUpdated.next([...this.hubPickups]);
            });
    }


    deleteHubPickup(hubPickupId: number) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/events/' + hubPickupId);
    }
}
