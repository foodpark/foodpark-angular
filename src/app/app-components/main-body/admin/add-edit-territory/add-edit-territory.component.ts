import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';
import {CountryModel, TerritoryModel} from '../../../../model';

@Component({
    selector: 'app-edit-territory',
    templateUrl: './add-edit-territory.component.html',
})

export class AddEditTerritoryComponent implements OnInit, OnDestroy {
    form: FormGroup;
    countries = [];
    territory: TerritoryModel;
    isEditTerritory = false;
    pageTitle = '';
    selectedCountryId: number;
    private countriesSubscription: Subscription;

    constructor(private territoryService: TerritoryService,
                private countryService: CountryService,
                private dataRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
        .subscribe((countries: CountryModel[]) => {
            if (countries.length > 0) {
                this.countries = countries;
            }
        });
        this.countryService.getCountries();

        if (localStorage.getItem('editterritory')) {
            this.isEditTerritory = true;
            this.pageTitle = 'Edit Territory';
            this.territory = JSON.parse(localStorage.getItem('editterritory'));
            this.formBuilder(this.territory);
        } else {
            this.formBuilder();
            this.pageTitle = 'Add Territory';
        }
    }

    formBuilder(formObj?: any) {
        if (formObj) {
            this.form = this.fb.group({
                territory: [formObj['territory'], Validators.required],
                latitude: [formObj['latitude'], Validators.required],
                longitude: [formObj['longitude'], Validators.required],
                country: [formObj['country'], Validators.required]
            });
        } else {
            this.form = this.fb.group({
                territory: ['', Validators.required],
                latitude: ['', Validators.required],
                longitude: ['', Validators.required],
                country: ['', Validators.required]
            });
        }

    }

    get f() {
        return this.form.controls;
    }

    onSaveClick(formData) {
        if (!this.isEditTerritory) {
            formData['country_id'] = this.selectedCountryId;
            this.territoryService.addTerritory(formData);
        } else {
            this.territory['latitude'] = parseFloat(formData['latitude']);
            this.territory['longitude'] = parseFloat(formData['longitude']);
            this.territory['territory'] = formData['territory'];
            this.territory['country'] = formData['country'];
            this.territoryService.editTerritory(this.territory);
        }
        this.router.navigate(['/admin/territories']);
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.selectedCountryId = this.countries[index]['id'];
        this.form.get('country').setValue(this.countries[index]['name']);
    }

    ngOnDestroy() {
        localStorage.removeItem('editterritory');
        this.countriesSubscription.unsubscribe();
    }
}
