import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CountryService} from 'src/app/app-services/country.service';
import {CountryModel, HubmanagerModel, TerritoryModel} from 'src/app/model';
import {HubmanagerService} from 'src/app/app-services/hubmanager.service';
import {TerritoryService} from 'src/app/app-services/territory.service';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from '../../../../error/error.component';

@Component({
    selector: 'app-mainhub-manager-listing',
    templateUrl: './mainhub-manager-listing.component.html'
})

export class MainhubManagerListingComponent implements OnInit, OnDestroy {
    countries = [];
    private countriesSubscription: Subscription;
    territories: TerritoryModel[] = [];
    private territoriesSubscription: Subscription;
    mainhubManagers: HubmanagerModel[] = [];
    private mainhubsSubscription: Subscription;
    private territorySelected: number;

    constructor(
        private mainhubmanagerService: HubmanagerService,
        private router: Router,
        private countryService: CountryService,
        private territoryService: TerritoryService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                if (countries.length > 0) {
                    const countryName = countries[0]['name'];
                    const button = document.getElementById('country_button');
                    button.innerText = countryName;
                    this.countries = countries;

                    this.territoryService.getTerritoriesInCountry(countries[0]['id']);
                } else {
                    this.dialog.open(ErrorComponent, {data: {message: 'No Countries found!!'}});
                }
            });

        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
        .subscribe((territories: TerritoryModel[]) => {
            if (territories.length > 0) {
                this.territorySelected = 0;
                const territoryName = territories[0]['territory'];
                const territoryButton = document.getElementById('territory_button');
                territoryButton.innerText = territoryName;
                this.territories = territories;

                this.mainhubmanagerService.getMainHubManagersInTerritory(territories[0]['id']);
            } else {
                this.dialog.open(ErrorComponent, {data: {message: 'No Territories found for the selected country'}});
            }
        });

        this.mainhubsSubscription = this.mainhubmanagerService.getMainHubManagersUpdateListener()
        .subscribe((mainHubMgrs: HubmanagerModel[]) => {
            this.mainhubManagers = mainHubMgrs;
            if (this.mainhubManagers.length) {
            } else {
                this.dialog.open(ErrorComponent, {data: {message: 'No Main Hub Managers available for this territory'}});
            }
        });
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.territoryService.getTerritoriesInCountry(this.countries[index]['id']);
    }

    onAddMainHubManagerClick() {
        this.router.navigate(['/admin/editmainhubmanager']);
    }

    onEditClick(index: number) {
        localStorage.setItem('editterritory', JSON.stringify(this.territories[index]));
        this.router.navigate(['/admin/editmainhubmanager']);
    }

    onDeleteClick(id: number) {
        this.mainhubmanagerService.delete(id).subscribe(() => {
            this.mainhubmanagerService.getMainHubManagersInTerritory(this.territorySelected);
        });
    }

    onTerritoryClick(index: number) {
        this.territorySelected = index;
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.mainhubmanagerService.getMainHubManagersInTerritory(this.territories[index]['id']);
    }

    onAddMainhubManagerClick() {
        this.router.navigate(['/admin/addmainhubmanager']);
    }

    onEditMainHubManagerClick(index: number) {
        this.router.navigate(['/admin/editmainhubmanager']);
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
        this.mainhubsSubscription.unsubscribe();
    }
}

