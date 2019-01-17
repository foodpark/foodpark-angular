import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainhubModel, PodModel, RegionalHubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../app-services/data.service';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PodPickupService} from '../../../../app-services/pod-pickup.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {PodsService} from '../../../../app-services/pods.service';

@Component({
    selector: 'app-add-edit-podpickup',
    templateUrl: './add-edit-podpickup.component.html',
})
export class AddEditPodPickupComponent implements OnInit {

    podPickupForm: FormGroup;
    podPickupId: number;
    podPickup;
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
    regionalHubs;
    sponsor2image: File;
    pods: PodModel[] = [];
    pageTitle = '';
    isCreate = false;
    reqObj = {};
    private regionalHubsSubscription: Subscription;
    private podsSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private mainhubService: MainhubService,
                private http: HttpClient,
                private dataService: DataService,
                private route: ActivatedRoute,
                private podPickupService: PodPickupService,
                private regionalService: RegionalhubsService,
                private fileUploadService: FileUploadService,
                private podsService: PodsService,
                private router: Router) {
        this.fileURL = {};
        this.filetype = '';
    }

    ngOnInit() {
        this.sponsor1Image = null;
        this.sponsor2Image = null;
        this.eventImage = null;
        this.podPickupForm = this.fb.group({
            name: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            schedule: [''],
            latitude: [''],
            longitude: [''],
            image: ['', Validators.required],
            sponsors: [''],
            description: [''],
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('podPickup')) {
                this.podPickupId = JSON.parse(paramMap['params']['podPickup']);
                this.podPickupService.getPodPickupsFromId(this.podPickupId).subscribe(res => {
                    this.podPickup = res;
                    this.sponsor1Image = this.podPickup['sponsors'][0] ? this.podPickup['sponsors'][0]['image'] : '';
                    this.sponsor2Image = this.podPickup['sponsors'][1] ? this.podPickup['sponsors'][1]['image'] : '';
                    this.sponsor1Name = this.podPickup['sponsors'][0] ? this.podPickup['sponsors'][0]['name'] : '';
                    this.sponsor2Name = this.podPickup['sponsors'][1] ? this.podPickup['sponsors'][1]['name'] : '';
                    this.podPickupForm = this.fb.group({
                        name: [res['name'], Validators.required],
                        description: [res['description'], Validators.required],
                        image: [null, Validators.required],
                        sponsors: [res['sponsors']],
                        start_date: [new Date(res['start_date'])],
                        end_date: [new Date(res['end_date'])],
                        start_time: [res['schedule'][0]['start']],
                        end_time: [res['schedule'][0]['end']],
                    });
                });
                this.isCreate = false;
                this.pageTitle = 'Edit Pod Pickup';
            } else {
                this.isCreate = true;
                this.pageTitle = 'Add Pod Pickup';
            }
        });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.reqObj = {
                    ...this.reqObj,
                    main_hub_id: this.mainHub['id']
                };
                this.regionalService.getRegionalHubsInMainHub(this.mainHub['id']);
                this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
                    .subscribe((regionalHubs: RegionalHubModel[]) => {
                        this.regionalHubs = regionalHubs;
                    });
                this.podsService.getPodsInMainHub(this.mainHub['id']);
                this.podsSubscription = this.podsService.getPodsUpdateListener()
                    .subscribe((pods: PodModel[]) => {
                        this.pods = pods;
                    });
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

    onPodClick(index) {
        const button = document.getElementById('pod_button');
        button.innerText = this.pods[index]['name'];
        this.reqObj = {
            ...this.reqObj,
            pod_id: this.pods[index]['id'],
            pod_name: this.pods[index]['name'],
            latitude: this.pods[index]['latitude'],
            longitude: this.pods[index]['longitude'],
        };
    }

    onRegionalHubClick(index) {
        const button = document.getElementById('regional_hub');
        button.innerText = this.regionalHubs[index]['name'];
        this.reqObj = {
            ...this.reqObj,
            regional_hub_id: this.regionalHubs[index]['id'],
            regional_hub_name: this.regionalHubs[index]['name']
        };
    }

    onImageUpload(name: string, event) {
        console.log('this is the image', event);
        console.log('this is the filetype', this.filetype);
        this.filetype = name;
        const files = event.target.files, data = files[0], reader = new FileReader();
        reader.onload = event => {
            this.fileURL = event;
            switch (this.filetype.toLowerCase()) {
                case 'event':
                    this.eventimage = this.fileURL.target.result;
                    break;
                case 'sponsor1':
                    this.sponsor1image = this.fileURL.target.result;
                    break;
                case 'sponsor2':
                    this.sponsor2image = this.fileURL.target.result;
                    break;
            }
        };
        reader.readAsDataURL(data);
        console.log('this is image data', this.eventImage);
        console.log('this is image data', this.sponsor1image);
        console.log('this is image data', this.sponsor2Image);

        document.getElementById(name + '_image').innerText = files[0].name;
        if (name === 'sponsor1') {
            this.sponsor1Image = files[0];
            console.log(this.sponsor2Image);
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
        this.reqObj = {
            ...this.reqObj,
            name: this.podPickupForm.value['name'],
            image: this.imageURL,
            description: this.podPickupForm.value['description'],
            start_date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
            end_date: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
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
            this.podPickupService.addPodPickup(this.reqObj);
            this.router.navigate(['hubmanager/podpickups']);
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
