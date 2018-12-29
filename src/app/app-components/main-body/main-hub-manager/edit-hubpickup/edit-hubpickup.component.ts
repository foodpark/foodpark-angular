import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HubPickupModel, MainhubModel} from '../../../../model';
import {ParamMap, Router, ActivatedRoute} from '@angular/router';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../app-services/data.service';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-hubpickup',
    templateUrl: './edit-hubpickup.component.html',
})
export class EditHubpickupComponent implements OnInit {
    hubPickupForm: FormGroup;
    hubPickupId: number;
    hubPickups: HubPickupModel[] = [];
    mainHub: MainhubModel;
    sponsors = [];
    sponsor1Name;
    sponsor2Name;
    sponsor1Image;
    sponsor2Image;
    imageURL;
    hideFileContainer = false;
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
        this.hubPickupForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            image: ['', Validators.required],
            sponsors: [''],
            schedule: [''],
            manager: [localStorage['user_id']]
        });
        
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('hubPickups')) {
                this.hubPickupId = JSON.parse(paramMap['params']['hubPickups']);
                this.hubPickupService.getHubPickupsFromId(this.hubPickupId).subscribe(res => {
                    this.hubPickupForm = this.fb.group({
                        name: [res['name'], Validators.required],
                        description: [res['description'], Validators.required],
                        image: [res['image'], Validators.required],
                        sponsors: [res['sponsors'], Validators.required],
                        start_date: [res['start_date'], Validators.required],
                        end_date: [res['end_date'], Validators.required],
                        start_time: [res['schedule']['start'], Validators.required],
                        end_time: [res['schedule']['end'], Validators.required],
                        latitude: [res['latitude'], Validators.required],
                        longitude: [res['longitude'], Validators.required],
                    });
                    this.sponsors = this.hubPickupForm.get('sponsors').value;
                    this.imageURL = this.hubPickupForm.get('image').value;
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
                } else if (this.dataService.stringComparator(this.dataService.imageSource, 'sponsor2')) {
                    this.dataService.sponsor2Image = fileURL;
                } else {
                    this.imageURL = fileURL;
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
        this.sponsors = [];
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
        const startDate = new Date(document.getElementById('fromDate')['value']);
        const endDate = new Date(document.getElementById('toDate')['value']);
        const startTime = startDate.getHours() + ':' + startDate.getMinutes();
        const endTime = endDate.getHours() + ':' + endDate.getMinutes();
        const obj = {
            image: this.imageURL,
            start_date: startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate(),
            end_date: endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate(),
            latitude: this.mainHub['latitude'],
            longitude: this.mainHub['longitude'],
            sponsors: this.sponsors,
            schedule: [
                {
                    start: startTime,
                    end: endTime
                }
            ]
        };

        this.hubPickupForm.patchValue(obj);
        this.hubPickupService.editHubPickup(this.hubPickupForm.value);
        this.router.navigate(['hubmanager/hubpickups']);
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
