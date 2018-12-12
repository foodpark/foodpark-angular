import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CountryService} from '../../../../app-services/country.service';
import {CountryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {PodsService} from 'src/app/app-services/pods.service';
import {FileUploadService} from 'src/app/app-services/fileupload.service';
import {DataService} from '../../../../app-services/data.service';

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
    private wordFileToUpload: File;
    hideFileContainer = false;

    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedWith = ['Personal Referral', 'Google Search', 'Social Media', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: Router,
                private countryService: CountryService,
                private podService: PodsService,
                private dataService: DataService,
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
            type: ['', Validators.required],
            connected_with: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            wordFile: [null, Validators.required]
        });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                console.log('File Uploaded: ' + fileURL);
                this.wordfileURL = fileURL;
                this.createPodManager();
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
        const button = document.getElementById('connected_with');
        button.innerText = type;
        this.registerpodform.get('connected_with').setValue(type);
    }

    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.hideFileContainer = this.dataService.nullCheck(this.wordFileToUpload);
        this.registerpodform.get('wordFile').setValue(this.wordFileToUpload);
        document.getElementById('wordfile_name').innerText = this.wordFileToUpload.name;
    }

    createPod() {
        this.fileUploadService.uploadFile(this.wordFileToUpload);
    }

    private createPodManager() {
        const obj = {
            'role': 'PODMGR',
            'email': this.registerpodform.get('email').value,
            'first_name': this.registerpodform.get('firstname').value,
            'last_name': this.registerpodform.get('lastname').value,
            'password': this.registerpodform.get('password').value,
            'country_id': this.registerpodform.get('country_id').value,
            'church_name': this.registerpodform.get('church_name').value,
            'connected_with': this.registerpodform.get('connected_with').value
        };

        this.podService.registerPodManager(obj)
            .subscribe((response) => {
                console.log('Created pod manager');
                this.church_id = response['user']['church_id'];
                this.sendPodData();
            });
    }

    private sendPodData() {
        const title = this.registerpodform.get('title').value;
        const updatePodData = {
            'name': this.registerpodform.value.church_name,
            'title': title,
            'connected_with': this.registerpodform.value.connected_with,
            'sponsor': this.registerpodform.value.sponsor,
            'latitude': this.registerpodform.value.latitude,
            'longitude': this.registerpodform.value.longitude,
            'type': this.registerpodform.value.type,
            'approved': 'true',
            'wordfile': this.wordfileURL
        };

        this.podService.updatePod(this.church_id, updatePodData)
            .subscribe(() => {
                console.log('received response from churches update');
                this.route.navigate(['/hubmanager/podapplications']);
            });
    }


    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.fileUploadSubscription.unsubscribe();
    }
}
