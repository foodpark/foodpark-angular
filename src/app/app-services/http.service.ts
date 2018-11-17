import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app-constants/common-constants';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    territoryData$;
    countryData$: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    loadTerritoryData() {
        return this.http.get(AppConstants.BASE_URL + 'api/v1/rel/territories');
    }

    loadCountryData() {
        return this.http.get(AppConstants.BASE_URL + 'api/v1/rel/countries');
    }

}
