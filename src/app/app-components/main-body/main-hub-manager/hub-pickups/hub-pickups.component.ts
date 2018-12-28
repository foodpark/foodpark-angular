import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {DataService} from '../../../../app-services/data.service';
import {Subscription} from 'rxjs';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';

@Component({
    selector: 'app-hub-pickups',
    templateUrl: './hub-pickups.component.html',

})
export class HubPickupsComponent implements OnInit {
    hubPickupForm: FormGroup;
    mainHub: MainhubModel;
    sponsors = [];
    sponsor1Name;
    sponsor2Name;
    sponsor1Image;
    sponsor2Image;

    private fileUploadSubscription: Subscription;
    hideFileContainer = false;

    constructor(private fb: FormBuilder,
                private mainhubService: MainhubService,
                private http: HttpClient,
                private dataService: DataService,
                private hubPickupService: HubPickupService,
                private fileUploadService: FileUploadService) {
    }

    ngOnInit() {

        //     "schedule": [
        //     {
        //         "start": "08:00-03:00",
        //         "end": "10:00-03:00"
        //     }
        // ]

        this.hubPickupForm = this.fb.group({
            name: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            image: ['', Validators.required],
            sponsors: [''],
            schedule: ['']
        });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                if (this.dataService.stringComparator(this.dataService.imageSource, 'event')) {
                    this.hubPickupForm.get('image').setValue(fileURL);
                } else if (this.dataService.stringComparator(this.dataService.imageSource, 'sponsor1')) {
                    this.dataService.sponsor1Image = fileURL;
                } else {
                    this.dataService.sponsor2Image = fileURL;
                }
            });
    }

    onSponsor1Entered(event) {
        this.sponsor1Name = event['srcElement']['value'];
    }

    onSponsor2Entered(event) {
        this.sponsor2Name = event['srcElement']['value'];
    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onImageUpload(name: string, files: FileList) {
        this.dataService.imageSource = name;
        document.getElementById(name + '_image').innerText = files[0].name;
        this.fileUploadService.uploadFile(files[0]);
        this.hideFileContainer = this.dataService.nullCheck(files[0]);
    }

    onSaveClick() {
        const sponsor1 = {
            name: this.sponsor1Name,
            image: this.dataService.sponsor1Image
        };
        const sponsor2 = {
            name: this.sponsor2Name,
            image: this.dataService.sponsor2Image
        };

        if (!this.checkProperties(sponsor1)) {
            this.sponsors.push(sponsor1);
        }
        if (!this.checkProperties(sponsor1)) {
            this.sponsors.push(sponsor2);
        }
        const obj = {
            latitude: this.mainHub['latitude'],
            longitude: this.mainHub['longitude'],
            sponsors: this.sponsors,
            schedule: [
                {
                    start: '08:00-03:00',
                    end: '10:00-03:00'
                }
            ]
        };
        this.hubPickupForm.get('start_date').setValue(document.getElementById('fromDate')['value']);
        this.hubPickupForm.get('end_date').setValue(document.getElementById('toDate')['value']);
        this.hubPickupForm.patchValue(obj);
        this.hubPickupService.addHubPickup(this.hubPickupForm.value);
    }

    checkProperties(sponsor) {
        for (const key in sponsor) {
            if (sponsor.hasOwnProperty(key) && sponsor[key] !== null && sponsor[key] !== '' && sponsor[key] !== undefined) {
                return false;
            }
        }
        return true;
    }
}
