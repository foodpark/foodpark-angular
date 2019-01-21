import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParamMap, Router, ActivatedRoute} from '@angular/router';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../app-services/data.service';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {Subscription} from 'rxjs';
import {MainhubModel} from '../../../../model';

@Component({
    selector: 'app-edit-hubpickup',
    templateUrl: './edit-hubpickup.component.html',
})
export class EditHubpickupComponent implements OnInit {
    hubPickupForm: FormGroup;
    hubPickupId: number;
    mainHub: MainhubModel;
    s1image;
    s2image;
    hubPickup;
    sponsors = [];
    sponsor1Name;
    sponsor2Name;
    sponsor1Image: File;
    sponsor2Image: File;
    eventImage: File;
    imageURL;
    isSponsor1Available = false;
    showDateError = false;
    eventImageChanged = false;
    sponsor1ImageChanged = false;
    private fileUploadSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private mainhubService: MainhubService,
                private http: HttpClient,
                private dataService: DataService,
                private hubPickupService: HubPickupService,
                private fileUploadService: FileUploadService,
                private route: ActivatedRoute,
                private router: Router) {
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

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('hubPickups')) {
                this.hubPickupId = JSON.parse(paramMap['params']['hubPickups']);
                this.hubPickupService.getHubPickupsFromId(this.hubPickupId).subscribe(res => {
                    this.hubPickup = res;
                    this.s1image = this.hubPickup['sponsors'][0] ? this.hubPickup['sponsors'][0]['image'] : null;
                    this.s2image = this.hubPickup['sponsors'][1] ? this.hubPickup['sponsors'][1]['image'] : null;
                    this.sponsor1Name = this.hubPickup['sponsors'][0] ? this.hubPickup['sponsors'][0]['name'] : '';
                    this.sponsor2Name = this.hubPickup['sponsors'][1] ? this.hubPickup['sponsors'][1]['name'] : '';
                    this.eventImage = this.hubPickup['image'] ? this.hubPickup['image'] : null;
                    this.hubPickup['startDateTime'] = (this.hubPickup['start_date']).toString().split('T')[0].concat(',' + this.hubPickup['schedule'][0]['start']);
                    this.hubPickup['endDateTime'] = (this.hubPickup['end_date']).toString().split('T')[0].concat(',' + this.hubPickup['schedule'][0]['end']);
                    this.hubPickupForm = this.fb.group({
                        name: [this.hubPickup['name'], Validators.required],
                        description: [this.hubPickup['description'], Validators.required],
                        image: [null, Validators.required],
                        sponsors: [this.hubPickup['sponsors']],
                        start_date: [this.hubPickup['start_date']],
                        end_date: [this.hubPickup['end_date']],
                        latitude: [this.hubPickup['latitude'], Validators.required],
                        longitude: [this.hubPickup['longitude'], Validators.required],
                    });
                });
            }
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

    onImageUpload(name: string, files: FileList) {
        document.getElementById(name + '_image').innerText = files[0].name;
        if (name === 'sponsor1') {
            this.sponsor1Image = files[0];
            this.sponsor1ImageChanged = true;
            if (this.sponsor1Image !== undefined && this.sponsor1Name !== undefined && this.sponsor1Name.length > 0) {
                this.isSponsor1Available = true;
            }
        } else if (name === 'sponsor2') {
            this.sponsor2Image = files[0];
            this.sponsor1ImageChanged = true;
        } else if (name === 'event') {
            this.eventImage = files[0];
            this.eventImageChanged = true;
        }
    }

    onSaveClick() {
        if (this.sponsor1Image !== null && this.sponsor1Image !== undefined) {
            this.dataService.imageSource = 'sponsor1';
            this.fileUploadService.uploadFile(this.sponsor1Image);
        } else {
            this.dataService.imageSource = 'event';
            if (this.eventImageChanged) {
                this.fileUploadService.uploadFile(this.eventImage);
            } else {
                this.imageURL = this.eventImage;
                this.uploadFinalObj();
            }
        }
    }

    uploadFinalObj() {
        this.sponsors = [];
        if (this.sponsor1ImageChanged) {
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
        } else {
            this.sponsors = this.hubPickup['sponsors'];
        }
        const startDate = new Date(document.getElementById('fromDate')['value']);
        const endDate = new Date(document.getElementById('toDate')['value']);
        this.showDateError = startDate > endDate;
        const startMinutes = startDate.getMinutes().toString().length === 1 ? `0${startDate.getMinutes()}` : startDate.getMinutes();
        const endMinutes = endDate.getMinutes().toString().length === 1 ? `0${endDate.getMinutes()}` : endDate.getMinutes();
        const startTime = startDate.getHours() + ':' + startMinutes;
        const endTime = endDate.getHours() + ':' + endMinutes;
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
            this.hubPickupService.editHubPickup(this.hubPickup['id'], obj).subscribe();
            this.router.navigate(['hubmanager/hubpickups']);
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
