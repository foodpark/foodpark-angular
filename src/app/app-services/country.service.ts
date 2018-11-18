import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app-constants/common-constants';
import {environment} from '../../environments/environment';
import {CountryModel} from '../app-modules/country.model';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) {
    }

    getCountries() {
        return this.http.get<CountryModel>(environment.apiUrl + '/api/v1/rel/countries');
    }
}
