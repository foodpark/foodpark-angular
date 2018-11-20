import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../../app-services/country.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TerritoryService} from '../../../app-services/territory.service';
import {TerritoryModel} from '../../../app-modules/territory.model';
import {CountryModel} from '../../../app-modules/country.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-territory',
    templateUrl: './add-and-edit-territory.component.html',
})
export class AddAndEditTerritoryComponent implements OnInit, OnDestroy {
    form: FormGroup;
    countries = [];
    territory: TerritoryModel;
    isEditTerritory = false;
    pageTitle = '';
    private countriesSubscription: Subscription;

    constructor(private territoryService: TerritoryService,
                private countryService: CountryService,
                private dataRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
            });
        if (localStorage.getItem('edit_territory')) {
            this.isEditTerritory = true;
            this.pageTitle = 'Edit Territory';
            this.territory = JSON.parse(localStorage.getItem('edit_territory'));
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

    onSaveClick() {
        this.territory['territory'] = this.form.value['territory'];
        this.territory['longitude'] = parseFloat(this.form.value['longitude']);
        this.territory['latitude'] = parseFloat(this.form.value['latitude']);
        if (!this.isEditTerritory) {
            this.territoryService.addTerritory(this.territory);
        } else {
            this.territoryService.editTerritory(this.territory);
        }
        this.router.navigate(['/admin/territories']);
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.territory['country'] = this.countries[index]['name'];
    }

    ngOnDestroy() {
        localStorage.removeItem('edit_territory');
        this.countriesSubscription.unsubscribe();
    }
}
