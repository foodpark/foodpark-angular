import {Injectable} from '@angular/core';
import {PodPickupModel} from '../model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PodPickupService {

    private podPickups: PodPickupModel[] = [];
    private podPickupsUpdated = new Subject<PodPickupModel[]>();

    constructor(private http: HttpClient) {
    }

    getPodPickupUpdateListener() {
        return this.podPickupsUpdated.asObservable();
    }

    addPodPickup(data: any) {
        return this.http.post<PodPickupModel>(environment.apiUrl + '/api/v1/rel/podevents', data);

    }

    getPodPickups(mainHubId: number) {
        this.http.get<PodPickupModel[]>(environment.apiUrl + '/api/v1/rel/podevents?main_hub_id=' + mainHubId)
            .subscribe((podPickups) => {
                this.podPickups = podPickups;
                this.podPickupsUpdated.next([...this.podPickups]);
            });
    }

    getPodPickupsFromId(podPickupId: number) {
        return this.http.get<PodPickupModel[]>(environment.apiUrl + '/api/v1/rel/podevents/' + podPickupId);
    }

    editPodPickup(podPickupId: number, podPickup: any) {
        return this.http.put<PodPickupModel>(environment.apiUrl + '/api/v1/rel/podevents' + podPickupId, podPickup);
    }


    deletePodPickup(podPickupId: number) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/podevents' + podPickupId);
    }
}
