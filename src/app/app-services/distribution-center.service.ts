import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VolunteerModel } from '../model';

@Injectable({
    providedIn: 'root'
})

export class DistributionService {
    constructor(private http: HttpClient) {}

    getVolunteers(mainHubId) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/drivers');
    }

    getRegisteredVolunteers(territoryid) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/territories/' + territoryid + '/users?role=DRIVER');
    }

    addVolunteers(volunterId, data) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/food_parks/' + volunterId + '/drivers', data);
    }

    createVolunteer(data) {
        return this.http.post(environment.apiUrl + '/auth/register ', data);
    }

    deleteVolunteer(foodid, userid) {
        return this.http.delete(environment.apiUrl + '/api/v1/rel/food_parks/' + foodid + '/drivers/' + userid);
    }

    updateAvilablity(mainid, id, data) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/food_parks/' + mainid + '/drivers/' + id, data);
    }

    // ordermanagement service

    getOrderDetails(mainHubId) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/ordermanagement');
    }

    getAvailableVolunteers(mainHubId) {
        return this.http.get<VolunteerModel[]>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/drivers');
    }

    updateVolunteer(data, id) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/loads/' + id, data);
    }

    updateStatus(data, id) {
        return this.http.put(environment.apiUrl + '/api/v1/rel/loads/' + id, data);
    }
}
