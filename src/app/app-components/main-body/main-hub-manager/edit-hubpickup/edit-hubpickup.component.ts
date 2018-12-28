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
                    console.log(res);
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
