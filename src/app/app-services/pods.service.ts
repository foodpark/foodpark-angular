import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {PodModel, PodmanagerModel} from '../model';

@Injectable({
    providedIn: 'root'
})

export class PodsService {
    private pods: PodModel[] = [];
    private podsUpdated = new Subject<PodModel[]>();
    private podManagers: PodmanagerModel[] = [];
    private podmanagersUpdated = new Subject<PodmanagerModel[]>();

    constructor(private http: HttpClient) {
    }

    getPodsUpdateListener() {
        return this.podsUpdated.asObservable();
    }

    getPodmanagersUpdateListener() {
        return this.podmanagersUpdated.asObservable();
    }

    getAllPods() {
        this.http.get<PodModel[]>(environment.apiUrl + '/api/v1/rel/churches')
            .subscribe((response) => {
                this.pods = response;
                this.podsUpdated.next([...this.pods]);
            });
    }

    getPodsInMainHub(mainHubId: number) {
        this.http.get<PodModel[]>(environment.apiUrl + '/api/v1/rel/churches?main_hub_id=' + mainHubId)
            .subscribe((response) => {
                this.pods = response;
                this.podsUpdated.next([...this.pods]);
            });
    }

    getPodFromPodId(podId: number) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/churches/' + podId);
    }

    updatePod(podId: number, obj: any) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/churches/' + podId, obj);
    }

    approvePod(podId: number) {
        const obj = {'approved': true};
        return this.updatePod(podId, obj);
    }

    rejectPod(podId: number) {
        const obj = {'approved': false};
        return this.updatePod(podId, obj);
    }

    registerPodManager(data) {
        return this.http.post(environment.apiUrl + '/auth/register', data);
    }

    updateRegionalHubID(podId: number, regionalHubId: number) {
        const obj = {'regional_hub_id': regionalHubId};
        return this.updatePod(podId, obj);
    }

    deletePod(deletePodID) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/churches/' + deletePodID);
    }

    getPodManagersInMainHub(mainHubId: number) {
        return this.http.get<PodmanagerModel[]>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/podmanagers')
            .subscribe((podmanagersData) => {
                this.podManagers = podmanagersData;
                this.podmanagersUpdated.next([...this.podManagers]);
            });
    }

    getPodManagers() {
        return this.http.get<PodmanagerModel[]>(environment.apiUrl + '/api/v1/rel/users?role=PODMGR')
            .subscribe((podmanagersData) => {
                this.podManagers = podmanagersData;
                this.podmanagersUpdated.next([...this.podManagers]);
            });
    }

    getPodManager(id: string) {
        return this.http.get<PodmanagerModel>(environment.apiUrl + '/api/v1/rel/users/' + id);
    }

    updatePodManager(id: string, data: any) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/users/' + id, data);
    }

    deletePodManager(id: number) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/users/' + id);
    }
}
