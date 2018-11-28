import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HubPickupModel, MainhubModel} from '../../../../model';
import {Router} from '@angular/router';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';

@Component({
    selector: 'app-edit-hubpickup',
    templateUrl: './edit-hubpickup.component.html',
})
export class EditHubpickupComponent implements OnInit {
    hubPickupForm: FormGroup;
    hubPickupId: number;
    hubPickups: HubPickupModel[] = [];
    mainHub: MainhubModel;

    constructor(private fb: FormBuilder,
                private route: Router,
                private hubPickupService: HubPickupService) {
    }

    ngOnInit() {
        this.hubPickups = JSON.parse('hubPickup');
        this.hubPickupForm = this.fb.group({
            event_name: [this.hubPickups['event_name'], Validators.required],
            event_description: [this.hubPickups['event_description'], Validators.required],
            event_image: [this.hubPickups['event_image'], Validators.required],
            sponsor_name: [this.hubPickups['sponsor_name'], Validators.required],
            sponsor1_image: [this.hubPickups['sponsor1_image'], Validators.required],
            sponsor2_image: [this.hubPickups['sponsor2_image'], Validators.required],
            start_date: [this.hubPickups['start_date'], Validators.required],
            end_date: [this.hubPickups['end_date'], Validators.required],
            start_time: [this.hubPickups['start_time'], Validators.required],
            end_time: [this.hubPickups['end_time'], Validators.required],
            latitude: [this.hubPickups['latitude'], Validators.required],
            longitude: [this.hubPickups['longitude'], Validators.required],
        });
    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onSaveClick() {
    }
}
