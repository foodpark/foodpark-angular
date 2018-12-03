import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HubPickupModel, MainhubModel} from '../../../../model';
import {ParamMap, Router, ParamMap, ActivatedRoute} from '@angular/router';
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
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('hubPickups')) {
                this.hubPickupId = JSON.parse(paramMap['params']['hubPickups'])['id'];
                this.hubPickupService.getHubPickupsFromId(this.hubPickupId).subscribe(res => {
                    this.hubPickupForm = this.fb.group({
                        event_name: [res['event_name'], Validators.required],
                        event_description: [res['event_description'], Validators.required],
                        event_image: [res['event_image'], Validators.required],
                        sponsor_name: [res['sponsor_name'], Validators.required],
                        sponsor1_image: [res['sponsor1_image'], Validators.required],
                        sponsor2_image: [res['sponsor2_image'], Validators.required],
                        start_date: [res['start_date'], Validators.required],
                        end_date: [res['end_date'], Validators.required],
                        start_time: [res['start_time'], Validators.required],
                        end_time: [res['end_time'], Validators.required],
                        latitude: [res['latitude'], Validators.required],
                        longitude: [res['longitude'], Validators.required],
                    });
                    document.getElementById('connected_with').innerText = this.hubPickupForm.get('connected_with').value;
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
