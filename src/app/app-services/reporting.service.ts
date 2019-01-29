import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReportingModel} from '../model';

@Injectable({
    providedIn: 'root'
})

export class ReportingService {
    constructor(private http: HttpClient) {
    }

    getReportsFromTime(mainHubId: number, time: number) {
        return this.http.get<ReportingModel>(environment.apiUrl + '/api/v1/rel/food_parks/' + mainHubId + '/reports');
    }

    getReportsFromTerritoryIdInGraphs(territoryId: number) {
        return this.http.get<ReportingModel>(environment.apiUrl + '/api/v1/rel/territories/' + territoryId + '/graphreports');
    }
}
