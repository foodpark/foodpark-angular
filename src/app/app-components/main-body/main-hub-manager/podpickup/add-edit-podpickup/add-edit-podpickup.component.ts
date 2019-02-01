import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MainhubModel, PodModel, RegionalHubModel} from 'src/app/model';
import {MainhubService} from 'src/app/app-services/mainhub.service';
import {DataService} from 'src/app/app-services/data.service';
import {PodPickupService} from 'src/app/app-services/pod-pickup.service';
import {RegionalhubsService} from 'src/app/app-services/regionalhubs.service';
import {FileUploadService} from 'src/app/app-services/fileupload.service';
import {PodsService} from 'src/app/app-services/pods.service';

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
    regionalHubs;
    pods: PodModel[] = [];
    pageTitle = '';
    isCreate = false;
    reqObj = {};
    eventImageChanged = false;
    sponsor1ImageChanged = false;
    eventImageFile: any;
    sponsor1ImageFile: any;
    sponsor2ImageFile: any;
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
                    this.sponsor1ImageFile = this.podPickup['sponsors'][0] ? this.podPickup['sponsors'][0]['image'] : '';
                    this.sponsor2ImageFile = this.podPickup['sponsors'][1] ? this.podPickup['sponsors'][1]['image'] : '';
                    this.sponsor1Name = this.podPickup['sponsors'][0] ? this.podPickup['sponsors'][0]['name'] : '';
                    this.sponsor2Name = this.podPickup['sponsors'][1] ? this.podPickup['sponsors'][1]['name'] : '';
                    this.eventImageFile = this.podPickup['image'] ? this.podPickup['image'] : null;
                    this.podPickupForm = this.fb.group({
                        name: [this.podPickup['name'], Validators.required],
                        description: [this.podPickup['description'], Validators.required],
                        image: [null, Validators.required],
                        sponsors: [this.podPickup['sponsors']],
                        start_date: [this.podPickup['schedule'][0]['start']],
                        end_date: [this.podPickup['schedule'][0]['end']],
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
                        this.reqObj = {
                            ...this.reqObj,
                            regional_hub_id: this.regionalHubs[0]['id'],
                            regional_hub_name: this.regionalHubs[0]['name']
                        };
                    });
                this.podsService.getPodsInMainHub(this.mainHub['id']);
                this.podsSubscription = this.podsService.getPodsUpdateListener()
                    .subscribe((pods: PodModel[]) => {
                        this.pods = pods;
                        this.reqObj = {
                            ...this.reqObj,
                            pod_id: this.pods[0]['id'],
                            pod_name: this.pods[0]['name'],
                            latitude: this.pods[0]['latitude'],
                            longitude: this.pods[0]['longitude'],
                        };
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
            this.sponsor1ImageChanged = true;
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

    onImageUpload(name: string, files: FileList) {
        document.getElementById(name + '_image').innerText = files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
            if (name === 'event') {
                this.eventImageFile = reader.result;
            } else if (name === 'sponsor1') {
                this.sponsor1ImageFile = reader.result;
            } else if (name === 'sponsor2') {
                this.sponsor2ImageFile = reader.result;
            }
        };
        reader.readAsDataURL(files[0]);
        if (name === 'sponsor1') {
            this.sponsor1Image = files[0];
            this.sponsor1ImageChanged = true;
            if (this.sponsor1Image !== undefined && this.sponsor1Name !== undefined && this.sponsor1Name.length > 0) {
                this.isSponsor1Available = true;
            }
        } else if (name === 'sponsor2') {
            this.sponsor2Image = files[0];
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
            this.sponsors = this.podPickup['sponsors'];
        }
        const startDate = new Date(document.getElementById('fromDate')['value']);
        const endDate = new Date(document.getElementById('toDate')['value']);
        this.showDateError = startDate > endDate;
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
                    start: startDate,
                    end: endDate
                }
            ],
            manager: parseInt(localStorage['user_id'], 10)
        };

        if (!this.showDateError) {
            if (this.isCreate) {
                this.podPickupService.addPodPickup(this.reqObj).subscribe();
                this.router.navigate(['hubmanager/podpickups']);
            } else {
                this.podPickupService.editPodPickup(this.podPickup['id'], this.reqObj).subscribe();
                this.router.navigate(['hubmanager/podpickups']);
            }
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
