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
    pageTitle = 'Hub Pickups';
    hubPickupForm: FormGroup;
    mainHub: MainhubModel;
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
        this.hubPickupForm = this.fb.group({
            event_name: ['', Validators.required],
            event_description: ['', Validators.required],
            event_image: ['', Validators.required],
            sponsor_name: ['', Validators.required],
            sponsor1_image: ['', Validators.required],
            sponsor2_image: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            start_time: ['', Validators.required],
            end_time: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                console.log(fileURL);
            });
    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onImageUpload(name: string, files: FileList) {
        this.hideFileContainer = this.dataService.nullCheck(files[0]);
        this.imageUpload(files[0]);
        document.getElementById(name).innerText = files[0].name;
        this.hubPickupForm.get(name).setValue(files[0]);
    }

    imageUpload(fileToUpload: File) {
        this.fileUploadService.uploadFile(fileToUpload);
    }

    onSaveClick() {
        const obj = {
            latitude: this.mainHub['latitude'],
            longitude: this.mainHub['longitude'],
        };
        // this.hubPickupForm.patchValue({...this.hubPickupForm.value, obj});
        this.hubPickupService.addHubPickup(this.hubPickupForm.value);
    }
}
