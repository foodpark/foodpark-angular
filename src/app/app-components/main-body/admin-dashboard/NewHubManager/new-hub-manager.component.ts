import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';
import {HubmanagerService} from '../../../../app-services/hubmanager.service';
import {HubmanagerModule} from '../../../../app-modules/hubmanager.module';

@Component({
    selector: 'app-new-hub-manager-dashboard',
    templateUrl: './new-hub-manager.component.html'
})

export class NewHubManagerComponent implements OnInit {
    hubmanagerForm: FormGroup;
    countries = [];
    territories = [];
    mainHubs = [];
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private hubManagerService: HubmanagerService) {
    }

    ngOnInit() {
        this.hubmanagerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            country_id: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            mainhubId: ['', Validators.required],
            role: ['HUBMGR', Validators.required]
        });

        this.countryService.getCountries().subscribe(
            res => {
                this.countries = [];
                Object.values(res).forEach(item => {
                    this.countries.push({'name': item['name'], 'id': item['id']});
                });
            });
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
        this.territoryService.getTerritoriesInCountry(id).subscribe(res => {
            this.territories = [];
            Object.values(res).forEach(item => {
                this.territories.push({'name': item['territory'], 'id': item['id']});
            });
        });
    }

    onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['name'];
        this.hubmanagerForm.get('territory_id').setValue(this.territories[index]['id']);
        this.getMainhub(this.territories[index]['id']);
    }

    onMainhubClick(index: number) {
        const button = document.getElementById('mainhub_button');
        button.innerText = this.mainHubs[index]['name'];
        this.hubmanagerForm.get('mainhubId').setValue(this.mainHubs[index]['id']);
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
        const obj: HubmanagerModule = {
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
    }
}
