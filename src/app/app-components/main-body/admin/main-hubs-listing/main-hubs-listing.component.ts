import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CountryModel, MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from 'src/app/app-services/territory.service';

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
    private selectedCountryName: string;

    constructor(private mainhubService: MainhubService,
                private territoriesService: TerritoryService,
                private router: Router,
                private countryService: CountryService) {
    }

    ngOnInit() {
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.selectedCountryName = countries[0]['name'];
                const button = document.getElementById('country_button');
                button.innerText = this.selectedCountryName;
                this.countries = countries;

                this.mainhubService.getMainhubsInCountry(this.selectedCountryName);
            });

        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((res: MainhubModel[]) => {
                this.mainhubs = res;
            });
    }

    onCountryClick(index: number) {
        this.selectedCountryName = this.countries[index]['name'];
        const button = document.getElementById('country_button');
        button.innerText = this.selectedCountryName;
        this.mainhubService.getMainhubsInCountry(this.selectedCountryName);
    }

    onAddMainhubClick() {
        this.router.navigate(['/admin/editmainhub']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/admin/editmainhub', {mainhubId: this.mainhubs[index]['id']}]);
    }

    onDeleteClick(id: number) {
        this.mainhubService.deleteMainhub(id).subscribe(() => {
            this.mainhubService.getMainhubsInCountry(this.selectedCountryName);
        });
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.mainhubsSubscription.unsubscribe();
    }
}

