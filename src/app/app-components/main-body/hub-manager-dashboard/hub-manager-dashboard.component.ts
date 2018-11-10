import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-hub-manager-dashboard',
    templateUrl: './hub-manager-dashboard.component.html',
    styleUrls: ['./hub-manager-dashboard.component.scss']
})
export class HubManagerDashboardComponent implements OnInit {
    hubmanagerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private router: Router) {
    }

    ngOnInit() {
        this.hubmanagerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            country: ['', Validators.required],
            territory: ['', Validators.required],
            mainhub: ['', Validators.required]
        });
    }

    get f() {
        return this.hubmanagerForm.controls;
    }


    onCreateMainHubManagerClick() {
    }
}
