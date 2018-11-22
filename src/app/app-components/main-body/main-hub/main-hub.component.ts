import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AppConstants} from '../../../app-constants/common-constants';
import {CountryModel, MainhubModel, TerritoryModel} from '../../../model';
import {MainhubService} from '../../../app-services/mainhub.service';
import {CountryService} from '../../../app-services/country.service';

@Component({
    selector: 'app-main-hub',
    templateUrl: './main-hub.component.html',
    styleUrls: ['./main-hub.component.scss']
})
export class MainHubComponent implements OnInit, OnDestroy {
    mainhubs: MainhubModel[] = [];
    private mainhubsSubscription: Subscription;
    countries = [];
    private countriesSubscription: Subscription;

    constructor(private mainhubService: MainhubService,
                private router: Router,
                private countryService: CountryService) {
    }

    ngOnInit() {
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
                this.mainhubService.getMainhubsInCountry(countries[0]['name']).subscribe();
            });
        this.mainhubService.getMainHubInTerritory(AppConstants.defaultCountryId, AppConstants.defaultCountryName);
        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((res: MainhubModel[]) => {
                this.mainhubs = res;
            });
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        // this..get('country').setValue(this.countries[index]['name']);
    }

    onAddMainhubClick() {
        this.router.navigate(['/admin/edit_mainhub']);
    }

    onEditClick(index: number) {
        localStorage.setItem('edit_mainhub', JSON.stringify(this.mainhubs[index]));
        this.router.navigate(['/admin/edit_mainhub']);
    }

    onDeleteClick(id: number) {
        this.mainhubService.deleteMainhub(id).subscribe(() => {
            this.mainhubService.getMainhubs();
        });
    }

    ngOnDestroy() {
        this.mainhubsSubscription.unsubscribe();
    }
}

