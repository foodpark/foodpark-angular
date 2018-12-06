import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {PodModel, PodmanagerModel} from '../model';

@Injectable({
    providedIn: 'root'
})

export class DistributionService {
  
    constructor(private http: HttpClient) {
    }

    apiGetVolunteers(mainHubId) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/drivers');
    }
    apiGetRegisteredVolunteers(mainHubId) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/territories/'+ mainHubId +'/users?role=DRIVER');
    }

    apiAddVolunteers(volunterId, data) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/food_parks/' + volunterId + '/drivers', data);
    }
    Apicreatevolunteers(data) {
        return this.http.post(environment.apiUrl + '/auth/register ', data);
    }

}