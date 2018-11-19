import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CountryService} from '../../../app-services/country.service';
import {TerritoryService} from '../../../app-services/territory.service';
import {MainhubService} from '../../../app-services/mainhub.service';
import { CountryModel } from 'src/app/app-modules/country.model';
import { Subscription } from 'rxjs';
import { TerritoryModel } from 'src/app/app-modules/territory.model';

@Component({
    selector: 'app-main-hubs',
    templateUrl: './main-hubs.component.html'
})

export class MainHubsComponent implements OnInit, OnDestroy {

    mainhubForm: FormGroup;
    countries: CountryModel[] = [];
    territories: TerritoryModel[] = [];
    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private mainhubService: MainhubService) {
    }

    ngOnInit() {
        this.mainhubForm = this.buildForm();

        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
            });
        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                this.territories = territories;
            });
    }


    buildForm() {
        const group = this.formBuilder.group({
            name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            type: ['MAIN', Validators.required]
        });
        return group;
    }

    get f() {
        return this.mainhubForm.controls;
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.getTerritory(id);
        this.mainhubForm.get('country').setValue(this.countries[index]['name']);
    }

    getTerritory(id: number) {
        this.territoryService.getTerritoriesInCountry(id);
    }

    onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.mainhubForm.get('territory_id').setValue(this.territories[index]['id']);
        console.log(this.mainhubForm);
    }

    onCreateMainHubClick() {
        this.mainhubService.create(this.mainhubForm.value).subscribe();
        this.mainhubForm.reset();
        const country_button = document.getElementById('country_button');
        country_button.innerText = 'Select country';
        const territory_button = document.getElementById('territory_button');
        territory_button.innerText = 'Select territory';
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
    }
}
