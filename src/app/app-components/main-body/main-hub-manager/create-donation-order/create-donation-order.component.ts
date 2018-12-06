import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-donation-order',
    templateUrl: './create-donation-order.component.html',
})
export class CreateDonationOrderComponent implements OnInit {
    createDonationOrderForm: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.createDonationOrderForm = this.fb.group({
            master_load: ['', Validators.required],
            regional_hub: ['', Validators.required],
            select_pod_load: ['', Validators.required],
        });
    }

    saveDonationOrder() {
    }
}
