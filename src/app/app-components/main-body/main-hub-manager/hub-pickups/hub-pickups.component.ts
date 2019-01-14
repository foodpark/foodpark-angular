import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {DataService} from '../../../../app-services/data.service';
import {Subscription} from 'rxjs';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';
import {Router} from '@angular/router';

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
    sponsor1Image: File;
    sponsor2Image: File;
    eventImage: File;
    imageURL;
    isSponsor1Available = false;
    private fileUploadSubscription: Subscription;
    showDateError = false;
    fileURL: any;
    filetype: any;
    eventimage: File;
    sponsor1image: File;
    sponsor2image: File;

    constructor(private fb: FormBuilder,
                private mainhubService: MainhubService,
                private http: HttpClient,
                private dataService: DataService,
                private hubPickupService: HubPickupService,
                private fileUploadService: FileUploadService,
                private router: Router) {
        this.fileURL = {};
        this.filetype = '';
    }

    ngOnInit() {
        this.sponsor1Image = null;
        this.sponsor2Image = null;
        this.eventImage = null;
        this.hubPickupForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
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
                if (this.dataService.stringComparator(this.dataService.imageSource, 'sponsor1')) {
                    this.dataService.sponsor1Image = fileURL;
                    if (this.sponsor2Image !== null && this.sponsor2Image !== undefined) {
                        this.dataService.imageSource = 'sponsor2';
                        this.fileUploadService.uploadFile(this.sponsor2Image);
                    } else {
                        this.dataService.imageSource = 'event';
                        this.fileUploadService.uploadFile(this.eventImage);
                    }
                } else if (this.dataService.stringComparator(this.dataService.imageSource, 'sponsor2')) {
                    this.dataService.sponsor2Image = fileURL;
                    this.dataService.imageSource = 'event';
                    this.fileUploadService.uploadFile(this.eventImage);
                } else {
                    this.imageURL = fileURL;
                    this.uploadFinalObj();
                }
            });
    }

    onSponsor1Entered(event) {
        this.sponsor1Name = event['srcElement']['value'];
        if (this.sponsor1Image !== undefined && this.sponsor1Name.length > 0) {
            this.isSponsor1Available = true;
        }
    }

    onSponsor2Entered(event) {
        this.sponsor2Name = event['srcElement']['value'];
    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onImageUpload(name: string, event) {
        console.log('this is the image', event);
        console.log('this is the filetype', this.filetype);
        const files = event.target.files, data = files[0], reader = new FileReader();
        reader.onload = event => {
            this.fileURL = event;
            switch (this.filetype) {
                case 'EVENT':
                    this.eventimage = this.fileURL.target.result;
                    break;
                case 'SPONSOR1':
                    this.sponsor1image = this.fileURL.target.result;
                    break;
                case 'SPONSOR2':
                    this.sponsor2image = this.fileURL.target.result;
                    break;
            }
        };
        reader.readAsDataURL(data);
        console.log('this is image data', data);

        document.getElementById(name + '_image').innerText = files[0].name;
        if (name === 'sponsor1') {
            this.sponsor1Image = files[0];
            if (this.sponsor1Image !== undefined && this.sponsor1Name !== undefined && this.sponsor1Name.length > 0) {
                this.isSponsor1Available = true;
            }
        } else if (name === 'sponsor2') {
            this.sponsor2Image = files[0];
        } else if (name === 'event') {
            this.eventImage = files[0];
        }
    }

    onSaveClick() {
        if (this.sponsor1Image !== null && this.sponsor1Image !== undefined) {
            this.dataService.imageSource = 'sponsor1';
            this.fileUploadService.uploadFile(this.sponsor1Image);
        } else {
            this.dataService.imageSource = 'event';
            this.fileUploadService.uploadFile(this.eventImage);
        }
    }

    uploadFinalObj() {
        this.sponsors = [];
        const sponsor1 = {
            name: this.sponsor1Name,
            image: this.dataService.sponsor1Image
        };
        const sponsor2 = {
            name: this.sponsor2Name,
            image: this.dataService.sponsor2Image
        };

        if (this.checkProperties(sponsor1)) {
            this.sponsors.push(sponsor1);
        }
        if (this.checkProperties(sponsor2)) {
            this.sponsors.push(sponsor2);
        }
        const startDate = new Date(document.getElementById('fromDate')['value']);
        const endDate = new Date(document.getElementById('toDate')['value']);
        this.showDateError = startDate > endDate;
        const startTime = startDate.getHours() + ':' + startDate.getMinutes();
        const endTime = endDate.getHours() + ':' + endDate.getMinutes();
        const obj = {
            name: this.hubPickupForm.value['name'],
            image: this.imageURL,
            description: this.hubPickupForm.value['description'],
            start_date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
            end_date: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
            latitude: this.mainHub['latitude'],
            longitude: this.mainHub['longitude'],
            sponsors: this.sponsors,
            schedule: [
                {
                    start: startTime,
                    end: endTime
                }
            ],
            manager: parseInt(localStorage['user_id'], 10)
        };

        if (!this.showDateError) {
            this.hubPickupService.addHubPickup(obj)
            .subscribe((response) => {
                this.router.navigate(['hubmanager/hubpickups']);
            });
        }
    }

    checkProperties(sponsor) {
        let isValid = true;
        for (const key in sponsor) {
            if (sponsor.hasOwnProperty(key) && (sponsor[key] === null || sponsor[key] === '' || sponsor[key] === undefined)) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }
}
