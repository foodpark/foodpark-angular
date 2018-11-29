import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.prod';

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
                private http: HttpClient) {
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
    }
}
