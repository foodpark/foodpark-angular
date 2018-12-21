import {Injectable} from '@angular/core';
import {MasterLoadModel} from '../model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterLoadService {
    private masterLoad: MasterLoadModel[] = [];
    private materLoadUpdated = new Subject<MasterLoadModel[]>();

    constructor(private http: HttpClient) {
    }

    getMasterUpdateListener() {
        return this.materLoadUpdated.asObservable();
    }

    getAllMasterLoads() {
        this.http.get<MasterLoadModel[]>(environment.apiUrl + '/api/v1/rel/master_loads')
            .subscribe((response) => {
                this.masterLoad = response;
                this.materLoadUpdated.next([...this.masterLoad]);
            });
    }


    getMasterLoadFromId(masterLoadId: number) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/master_loads/' + masterLoadId);
    }

    addMasterLoad(obj: any) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/master_loads', obj);
    }

    updateMasterLoad(masterLoadId: number, obj: any) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/master_loads/' + masterLoadId, obj);
    }

    deleteMasterLoad(deleteMasterLoadId) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/master_loads/' + deleteMasterLoadId);
    }
}
