import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CountryModel, MainhubModel, TerritoryModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {CountryService} from '../../../../app-services/country.service';

@Component({
    selector: 'app-main-hub',
    templateUrl: './main-hubs-listing.component.html',
    styleUrls: ['./main-hubs-listing.component.scss']
})
export class MainHubsListingComponent implements OnInit, OnDestroy {
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
                const countryName = countries[0]['name'];
                const button = document.getElementById('country_button');
                button.innerText = countryName;
                this.countries = countries;
                this.mainhubService.getMainhubsInCountry(countryName);
            });
        // this.mainhubService.getMainHubInTerritory(AppConstants.defaultCountryId, AppConstants.defaultCountryName);
        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((res: MainhubModel[]) => {
                this.mainhubs = res;
            });
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.mainhubService.getMainhubsInCountry(this.countries[index]['name']);
    }

    onAddMainhubClick() {
        this.router.navigate(['/admin/editmainhub']);
    }

    onEditClick(index: number) {
        localStorage.setItem('editmainhub', JSON.stringify(this.mainhubs[index]));
        this.router.navigate(['/admin/editmainhub']);
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

