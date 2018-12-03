import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CountryService} from '../../../../app-services/country.service';
import {CountryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {PodsService} from 'src/app/app-services/pods.service';
import { FileUploadService } from 'src/app/app-services/fileupload.service';

@Component({
    selector: 'app-create-pods',
    templateUrl: './create-pods.component.html',
})

export class CreatePodsComponent implements OnInit, OnDestroy {
    registerpodform: FormGroup;
    countries: CountryModel[] = [];
    private countriesSubscription: Subscription;
    private fileUploadSubscription: Subscription;
    private church_id: number;
    private wordfileURL: string;

    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedBy = ['Personal Referral', 'Google Search', 'Social Media', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: Router,
                private countryService: CountryService,
                private podService: PodsService,
                private fileUploadService: FileUploadService) {
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
            sponsor: ['', Validators.required],
            title: ['', Validators.required],
            type : ['', Validators.required],
            connectedBy: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            wordFile: [null, Validators.required]
        });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                console.log('File Uploaded: ' + fileURL);
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

    onFilePicked(files: FileList) {
        const fileToUpload = files.item(0);
        this.registerpodform.get('wordFile').setValue(fileToUpload);
        this.registerpodform.get('wordFile').updateValueAndValidity();
    }

    createPod() {
        const obj = {
            'role': 'PODMGR',
            'email': this.registerpodform.get('email').value,
            'first_name': this.registerpodform.get('firstname').value,
            'last_name': this.registerpodform.get('lastname').value,
            'password': this.registerpodform.get('password').value,
            'country_id': this.registerpodform.get('country_id').value,
            'church_name': this.registerpodform.get('church_name').value
        };

        this.podService.registerPodManager(obj)
            .subscribe((response) => {
                this.church_id = response['user']['church_id'];
                this.wordfileURL = this.fileUploadService.parseResponseAndGetURL(response);
                this.sendPodData();
            });
    }

    sendPodData() {
        const updatePodData = new FormData();
            const title = this.registerpodform.get('title').value;
            updatePodData.append('name', this.registerpodform.value.church_name);
            updatePodData.append('id', this.church_id.toString());
            updatePodData.append('title', title);
            updatePodData.append('connected_with', this.registerpodform.value.connectedBy);
            updatePodData.append('sponsor', this.registerpodform.value.sponsor);
            updatePodData.append('latitude', this.registerpodform.value.latitude);
            updatePodData.append('longitude', this.registerpodform.value.longitude);
            updatePodData.append('type', this.registerpodform.value.type);
            updatePodData.append('approved', 'true');

            this.podService.updatePod(this.church_id, updatePodData)
            .subscribe(() => {
                this.route.navigate(['/hubmanager/podapplications']);
            });
    }


    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.fileUploadSubscription.unsubscribe();
    }
}
