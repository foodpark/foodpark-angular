import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import { PodModel } from '../model';

@Injectable({
    providedIn: 'root'
})

export class PodsService {
    private pods: PodModel[] = [];
    private podsUpdated = new Subject<PodModel[]>();

    constructor(private http: HttpClient) {}

    getTerritoriesUpdateListener() {
        return this.podsUpdated.asObservable();
    }

    getAllPods() {
        this.http.get<PodModel[]>(environment.apiUrl + '/api/v1/rel/churches')
            .subscribe((territoryData) => {
                this.pods = territoryData;
                this.podsUpdated.next([...this.pods]);
            });
    }

    updatePod(podId: number, obj: any) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/churches/' + podId, obj);
    }

    approvePod(podId: number) {
        const obj = { 'approved': true };
        return this.updatePod(podId, obj);
    }

    rejectPod(podId: number) {
        const obj = { 'approved': false };
        return this.updatePod(podId, obj);
    }

    registerPodManager(data) {
        return this.http.post(environment.apiUrl + '/auth/register', data);
    }

    updateRegionalHubID(podId: number, regionalHubId: number) {
        const obj = { 'regional_hub_id': regionalHubId };
        return this.updatePod(podId, obj);
    }
}
