import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';
import {HubmanagerService} from '../../../../app-services/hubmanager.service';
import { Subscription } from 'rxjs';
import {CountryModel, HubmanagerModel, TerritoryModel} from '../../../../model';

@Component({
    selector: 'app-new-hub-manager-dashboard',
    templateUrl: './new-hub-manager.component.html'
})

export class NewHubManagerComponent implements OnInit, OnDestroy {
    hubmanagerForm: FormGroup;

    countries: CountryModel[] = [];
    territories: TerritoryModel[] = [];
    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;

    mainHubs = [];
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private hubManagerService: HubmanagerService) {
    }

    ngOnInit() {
        this.hubmanagerForm = this.buildForm();
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
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            country_id: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            mainhubId: ['', Validators.required],
            role: ['HUBMGR']
        });
        return group;
    }

    get f() {
        return this.hubmanagerForm.controls;
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.getTerritory(id);
        this.hubmanagerForm.get('country').setValue(this.countries[index]['name']);
        this.hubmanagerForm.get('country_id').setValue(this.countries[index]['id']);
    }

    getTerritory(id: number) {
        this.territoryService.getTerritoriesInCountry(id);
    }

    onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.hubmanagerForm.get('territory_id').setValue(this.territories[index]['id']);
        this.getMainhub(this.territories[index]['id']);
    }

    onMainhubClick(index: number) {
        const button = document.getElementById('mainhub_button');
        button.innerText = this.mainHubs[index]['name'];
        this.hubmanagerForm.get('mainhubId').setValue(this.mainHubs[index]['id']);
        console.log(this.hubmanagerForm);
    }

    getMainhub(id: number) {
        this.hubManagerService.getMainHubInTerritory(id, 'MAIN').subscribe(res => {
            this.mainHubs = [];
            Object.values(res).forEach(item => {
                this.mainHubs.push({'name': item['name'], 'id': item['id']});
            });
        });
    }


    onCreateMainHubManagerClick() {
        const obj: HubmanagerModel = {
            'role': this.hubmanagerForm.get('role').value,
            'food_park_id': this.hubmanagerForm.get('mainhubId').value,
            'email': this.hubmanagerForm.get('email').value,
            'first_name': this.hubmanagerForm.get('firstname').value,
            'last_name': this.hubmanagerForm.get('lastname').value,
            'password': this.hubmanagerForm.get('password').value,
            'country_id': this.hubmanagerForm.get('country_id').value,
            'territory_id': this.hubmanagerForm.get('territory_id').value,
        };
        this.hubManagerService.create(obj).subscribe();
        this.hubmanagerForm.reset();
        const country_button = document.getElementById('country_button');
        country_button.innerText = 'Select country';
        const territory_button = document.getElementById('territory_button');
        territory_button.innerText = 'Select territory';
        const mainhub_button = document.getElementById('mainhub_button');
        mainhub_button.innerText = 'Select mainhub';
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
    }
}
