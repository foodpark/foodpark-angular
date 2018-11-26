import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CountryService} from '../../../../app-services/country.service';
import {CountryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {PodsService} from 'src/app/app-services/pods.service';

@Component({
    selector: 'app-create-pods',
    templateUrl: './create-pods.component.html',
})

export class CreatePodsComponent implements OnInit, OnDestroy {
    registerpodform: FormGroup;
    countries: CountryModel[] = [];
    private countriesSubscription: Subscription;
    private messages: any;
    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedBy = ['Church', 'Non-Profit', 'Non-Religious', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: Router,
                private countryService: CountryService,
                private podService: PodsService) {
    }

    ngOnInit() {
        this.registerpodform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            church_name: ['', Validators.required],
            country_id: ['', Validators.required],
            country: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            sponsor: ['', Validators.required],
            title: ['', Validators.required],
            connectedBy: ['', Validators.required],
            uploadAttachments: [null, Validators.required],
            type : ['', Validators.required],
            wordFile: [null, Validators.required]
        });

        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
            });
        this.countryService.getCountries();
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.registerpodform.get('country').setValue(this.countries[index]['name']);
        this.registerpodform.get('country_id').setValue(this.countries[index]['id']);
    }

    onChurchTypeClick(type: string) {
        const button = document.getElementById('church_type');
        button.innerText = type;
        this.registerpodform.get('type').setValue(type);
    }

    onConnectedByClick(type: string) {
        const button = document.getElementById('connected_by');
        button.innerText = type;
        this.registerpodform.get('connectedBy').setValue(type);
    }

    createPod() {
        const obj = {
            'role': 'OWNER',
            'email': this.registerpodform.get('email').value,
            'first_name': this.registerpodform.get('firstname').value,
            'last_name': this.registerpodform.get('lastname').value,
            'password': this.registerpodform.get('password').value,
            'country_id': this.registerpodform.get('country_id').value,
            'church_name': this.registerpodform.get('church_name').value
        };

        this.podService.registerPodManager(obj)
            .subscribe((response) => {
                const updatePodObj = {
                    'title': this.registerpodform.get('title').value,
                    'connected_with': this.registerpodform.get('connectedBy').value,
                    'sponsor': this.registerpodform.get('sponsor').value,
                    'latitude': this.registerpodform.get('latitude').value,
                    'longitude': this.registerpodform.get('longitude').value,
                    'type': this.registerpodform.get('type').value,
                    'approved': true
                };

                this.podService.updatePod(response['user']['church_id'], updatePodObj)
                    .subscribe(() => {
                        this.route.navigate(['/hubmanager/podapplications']);
                    });
            });
    }

    onFilePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.registerpodform.get('wordFile').setValue(file);
        this.registerpodform.get('wordFile').updateValueAndValidity();
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
    }
}
