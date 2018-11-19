import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {CountryModel} from '../app-modules/country.model';

@Injectable({
    providedIn: 'root'
})

export class CountryService {
    private countries: CountryModel[] = [];
    private countriesUpdated = new Subject<CountryModel[]>();
    constructor(private http: HttpClient) {}


    getCountries() {
        this.http.get<CountryModel[]>(environment.apiUrl + '/api/v1/rel/countries')
            .subscribe((countryData) => {
                this.countries = countryData;
                this.countriesUpdated.next([...this.countries]);
            });
    }

    getCountriesUpdateListener() {
        return this.countriesUpdated.asObservable();
    }
}
