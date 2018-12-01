import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PodmanagerModel, CountryModel } from 'src/app/model';
import { PodsService } from 'src/app/app-services/pods.service';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/app-services/country.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-add-edit-pod-managers',
    templateUrl: './edit-pod-manager.component.html',
})

export class EditPodManagerComponent implements OnInit, OnDestroy {
    editpodmanagerform: FormGroup;
    podManager: PodmanagerModel;
    podManagerID: string;
    countries = [];
    private countriesSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private countryService: CountryService,
                private podService: PodsService) {}

    ngOnInit() {
        this.editpodmanagerform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            country_id: ['', Validators.required],
            country: ['', Validators.required]
        });

        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
        .subscribe((countries: CountryModel[]) => {
            if (countries.length > 0) {
                this.countries = countries;
            }
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('podmanagerid')) {
                this.podManagerID = paramMap.get('podmanagerid');
                this.podService.getPodManager(this.podManagerID)
                .subscribe((podmanager) => {
                    this.podManager = podmanager;

                    // this.editpodmanagerform.get('firstname').setValue(this.podManager.first_name);
                    // this.editpodmanagerform.setValue({
                    //     firstname: this.podManager.first_name,
                    //     lastname: this.podManager.last_name,
                    //     email: this.podManager.email,
                    //     country_id: this.podManager.country_id
                    // });
                    this.countryService.getCountries();
                });
            }
        });
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.editpodmanagerform.get('country').setValue(this.countries[index]['name']);
        this.editpodmanagerform.get('country_id').setValue(this.countries[index]['id']);
    }

    updatePodManager() {
        const obj = {
            'email': this.editpodmanagerform.get('email').value,
            'first_name': this.editpodmanagerform.get('firstname').value,
            'last_name': this.editpodmanagerform.get('lastname').value,
            'password': this.editpodmanagerform.get('password').value,
            'country_id': this.editpodmanagerform.get('country_id').value,
        };

        this.podService.updatePodManager(this.podManagerID, obj);
    }

    ngOnDestroy() {
    }
}
