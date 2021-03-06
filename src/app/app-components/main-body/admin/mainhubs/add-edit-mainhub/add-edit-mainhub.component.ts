import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { CountryModel, TerritoryModel } from 'src/app/model';
import { CountryService } from 'src/app/app-services/country.service';
import { TerritoryService } from 'src/app/app-services/territory.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-add-edit-mainhub',
    templateUrl: './add-edit-mainhub.component.html',
})
export class AddEditMainhubComponent implements OnInit, OnDestroy {

    mainhubForm: FormGroup;
    countries: CountryModel[] = [];
    territories: TerritoryModel[] = [];
    mainhubs;
    mainHubId;
    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;
    isEdit = false;

    constructor(private formBuilder: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private mainhubService: MainhubService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.mainhubForm = this.formBuilder.group({
            name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            type: ['MAIN']
        });
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
            });

        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                this.territories = territories;
            });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('mainhubId')) {
                this.isEdit = true;
                this.mainHubId = paramMap.get('mainhubId');
                this.mainhubService.getMainhubFromId(this.mainHubId).subscribe(res => {
                    this.mainhubs = res;
                    this.mainhubForm.get('name').setValue(this.mainhubs['name'], {emitEvent: false});
                    this.mainhubForm.get('latitude').setValue(this.mainhubs['latitude'], {emitEvent: false});
                    this.mainhubForm.get('longitude').setValue(this.mainhubs['longitude'], {emitEvent: false});
                    this.mainhubForm.get('country').setValue(this.mainhubs['country'], {emitEvent: false});
                    this.mainhubForm.get('territory_id').setValue(this.mainhubs['territory_id'], {emitEvent: false});
                    document.getElementById('country_button').innerText = this.mainhubForm.get('country').value;
                    this.territoryService.getTerritoriesFromId(this.mainhubs['territory_id']).subscribe(territory => {
                        document.getElementById('territory_button').innerText = territory['territory'];
                    });
                });
            }
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
        this.territoryService.getTerritoriesInCountry(id);
    }

    onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.mainhubForm.get('territory_id').setValue(this.territories[index]['id']);
    }

    onCreateMainHubClick() {
        if (this.isEdit) {
            this.mainhubService.editMainhub(this.mainhubForm.value, this.mainhubs['id']).subscribe(
                res => {
                    this.mainhubService.getMainhubs();
                    this.router.navigate(['/admin/mainhubs']);
                }
            );
        } else {
            this.mainhubService.addMainhub(this.mainhubForm.value).subscribe(
                res => {
                    this.mainhubService.getMainhubs();
                    this.router.navigate(['/admin/mainhubs']);
                }
            );
        }
        this.mainhubForm.reset();
        const country_button = document.getElementById('country_button');
        country_button.innerText = 'Select';
        const territory_button = document.getElementById('territory_button');
        territory_button.innerText = 'Select';
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
    }
}
