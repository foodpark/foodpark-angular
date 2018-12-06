import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HubPickupModel, MainhubModel} from '../../../../model';
import {ParamMap, Router, ActivatedRoute} from '@angular/router';
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
                private router: Router,
                private route: ActivatedRoute,
                private hubPickupService: HubPickupService) {
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
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('hubPickups')) {
                this.hubPickupId = JSON.parse(paramMap['params']['hubPickups']);
                this.hubPickupService.getHubPickupsFromId(this.hubPickupId).subscribe(res => {
                    this.hubPickupForm = this.fb.group({
                        event_name: [res['name'], Validators.required],
                        event_description: [res['description'], Validators.required],
                        event_image: [res['image'], Validators.required],
                        sponsor_name: [res['sponsors'], Validators.required],
                        sponsor1_image: [res['sponsor1_image'], Validators.required],
                        sponsor2_image: [res['sponsor2_image'], Validators.required],
                        start_date: [res['start_date'], Validators.required],
                        end_date: [res['end_date'], Validators.required],
                        start_time: [res['schedule']['start'], Validators.required],
                        end_time: [res['schedule']['end'], Validators.required],
                        latitude: [res['latitude'], Validators.required],
                        longitude: [res['longitude'], Validators.required],
                    });
                });
            }
        });
    }

    onHubClick() {
        const button = document.getElementById('hub_button');
        button.innerText = this.mainHub['name'];
    }

    onSaveClick() {
    }
}
