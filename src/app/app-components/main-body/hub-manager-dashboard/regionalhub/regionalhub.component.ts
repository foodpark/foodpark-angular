import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regional-hub',
  templateUrl: './regionalhub.component.html',

})
export class RegionalHubComponent implements OnInit {
    createRegionalhubsForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.createRegionalhubsForm = this.formBuilder.group({
            regionalhubname: ['', Validators.required]
        });
    }

    get f() {
        return this.createRegionalhubsForm.controls;
    }

    onCreateRegionalHubClick() {
    }
}
