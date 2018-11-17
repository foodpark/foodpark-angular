import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CountryService} from '../../../app-services/country.service';
import {TerritoryService} from '../../../app-services/territory.service';
import {MainhubService} from '../../../app-services/mainhub.service';

@Component({
    selector: 'app-main-hubs',
    templateUrl: './main-hubs.component.html'
})
export class MainHubsComponent implements OnInit {

    mainhubForm: FormGroup;
    countries = [];
    territories = [];

    constructor(private formBuilder: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private mainhubService: MainhubService) {
    }

    ngOnInit() {
        this.mainhubForm = this.formBuilder.group({
            name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            type: ['MAIN', Validators.required]
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
        return this.mainhubForm.controls;
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.getTerritory(id);
        this.mainhubForm.get('country').setValue(this.countries[index]['name']);
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
        this.mainhubForm.get('territory_id').setValue(this.territories[index]['id']);
    }


    onCreateMainHubClick() {
        this.mainhubService.create(this.mainhubForm.value).subscribe();
    }
}
