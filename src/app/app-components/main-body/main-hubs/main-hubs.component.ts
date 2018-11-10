import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-main-hubs',
    templateUrl: './main-hubs.component.html',
    styleUrls: ['./main-hubs.component.scss']
})
export class MainHubsComponent implements OnInit {

    createMainhubrForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private router: Router) {
    }

    ngOnInit() {
        this.createMainhubrForm = this.formBuilder.group({
            mainhubname: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required],
            territory: ['', Validators.required],
            mainhub: ['', Validators.required]
        });
    }

    get f() {
        return this.createMainhubrForm.controls;
    }

    onCreateMainHubClick() {
    }
}
