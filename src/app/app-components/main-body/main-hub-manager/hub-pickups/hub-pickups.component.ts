import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HubmanagerModel, MainhubModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';

@Component({
    selector: 'app-hub-pickups',
    templateUrl: './hub-pickups.component.html',

})
export class HubPickupsComponent implements OnInit {
    pageTitle = 'Hub Pickups';
    hubPickupForm: FormGroup;
    mainHub: MainhubModel;

    constructor(private fb: FormBuilder, private mainhubService: MainhubService) {
    }

    ngOnInit() {
        this.hubPickupForm = this.fb.group({
            event_name: ['', Validators.required],
            event_description: ['', Validators.required],
            event_image: ['', Validators.required],
            sponsor_name: ['', Validators.required],
            sponsor_image: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            start_time: ['', Validators.required],
            end_time: ['', Validators.required],
        });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });

    }


}
