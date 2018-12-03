import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

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
    territoryId: number;
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

        this.dataRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('territories')) {
                this.territoryId = JSON.parse(paramMap['params']['pods'])['id'];
                this.territoryService.getTerritoriesFromId(this.territoryId).subscribe(res => {
                    this.form = this.fb.group({
                        territory: [res['territory'], Validators.required],
                        latitude: [res['latitude'], Validators.required],
                        longitude: [res['longitude'], Validators.required],
                        country: [res['country'], Validators.required]
                    });
                });
                this.isEditTerritory = true;
                this.pageTitle = 'Edit Territory';
            } else {
                this.pageTitle = 'Add Territory';
                this.form = this.fb.group({
                    territory: ['', Validators.required],
                    latitude: ['', Validators.required],
                    longitude: ['', Validators.required],
                    country: ['', Validators.required]
                });
            }
        });
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
        this.countriesSubscription.unsubscribe();
    }
}
