import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.prod';
import {FileUploadService} from '../../../../app-services/fileupload.service';

@Component({
    selector: 'app-hub-pickups',
    templateUrl: './hub-pickups.component.html',

})
export class HubPickupsComponent implements OnInit {
    pageTitle = 'Hub Pickups';
    hubPickupForm: FormGroup;
    mainHub: MainhubModel;

    constructor(private fb: FormBuilder,
                private mainhubService: MainhubService,
                private http: HttpClient,
                private fileService: FileUploadService) {
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

    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onImageUpload() {
    }

    onSaveClick() {
        // this.fileService.uploadFileAndGetActualResponse(this.hubPickupForm.get('event_image').value);
        // const start_date = document.getElementById('start_date');
        // const end_date = document.getElementById('end_date');
        // this.hubPickupForm.get('start_date').setValue(start_date.value);
        // this.hubPickupForm.get('end_date').setValue(end_date.value);
        // const obj = {
        //     latitude: this.mainHub['latitude'],
        //     longitude: this.mainHub['longitude']
        // };
        // this.hubPickupForm.patchValue(obj);
        // this.http.post(environment.apiUrl + 'api/v1/rel/events', this.hubPickupForm.value);

        const startDate = this.hubPickupForm.value.start_date;
        const endDate = this.hubPickupForm.value.end_date;
        const obj = {
            latitude: this.mainHub['latitude'],
            longitude: this.mainHub['longitude'],
        };
        // const startTime1 = document.getElementById('start_time').value.split(':')[0].length === 1 ?
        //     `0${document.getElementById('start_time').value.split(':')[0]}` :
        //     document.getElementById('start_time').value.split(':')[0];
        // const startTime2 = document.getElementById('start_time').value.split(':')[1].length === 1 ?
        //     `0${document.getElementById('start_time').value.split(':')[1]}` :
        //     document.getElementById('start_time').value.split(':')[1];
        // const endTime1 = document.getElementById('end_time').value.split(':')[0].length === 1 ?
        //     `0${document.getElementById('end_time').value.split(':')[0]}` :
        //     document.getElementById('end_time').value.split(':')[0];
        // const endTime2 = document.getElementById('end_time').value.split(':')[1].length === 1 ?
        //     `0${document.getElementById('end_time').value.split(':')[1]}` :
        //     document.getElementById('end_time').value.split(':')[1];
        // const dateTimeObj = {
        //     start_date: `${startDate.split('/')[2]}-${startDate.split('/')[0]}-${startDate.split('/')[1]}T${startTime1}:${startTime2}:00.000Z`,
        //     end_date: `${endDate.split('/')[2]}-${endDate.split('/')[0]}-${endDate.split('/')[1]}T${endTime1}:${endTime2}:00.000Z`,
        // };
        // console.log(dateTimeObj);
        this.hubPickupForm.patchValue(obj);
        this.http.post(environment.apiUrl + 'api/v1/rel/events', this.hubPickupForm.value);
    }
}
