import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
// import {HttpClient} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AppConstants} from '../app-constants/common-constants';
import {environment} from '../../environments/environment';
import {CountryModel} from '../app-modules/country.model';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) {
    }

    // getCountries() {
    //     return this.http.get<CountryModel>(environment.apiUrl + '/api/v1/rel/countries');
    // }

    getCountries(): Observable<CountryModel[]> {
        return this.http.get(environment.apiUrl + '/api/v1/rel/countries')
        // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
