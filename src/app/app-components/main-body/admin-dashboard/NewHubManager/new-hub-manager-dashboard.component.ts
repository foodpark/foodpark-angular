import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-hub-manager-dashboard',
    templateUrl: './new-hub-manager-dashboard.component.html'
})

export class NewHubManagerComponent implements OnInit {
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
            mainhubId: ['', Validators.required],
            role: ['HUBMGR', Validators.required]
        });
    }

    // "role"="HUBMGR",	//Hardcoded
    // "country"="Brazil",
    // "food_park_id"=<main hub id>,
    // "email"="aasdf@gmail.com",
    // first_name="adadf",
    // last_name="adfas",
    // "password"="asfasf",
    // country_id=1234,
    // territory_id=14,

    get f() {
        return this.hubmanagerForm.controls;
    }

    onDropdownChange(event) {
        if (event.hasOwnProperty('country')) {
            this.hubmanagerForm.get('country').setValue(event['country']);
        } else {
            this.hubmanagerForm.get('territory_id').setValue(event);
            // Object.values(event).forEach(item => {
            //     if (this.mainhubForm.get('country').value.toLowerCase() === item['country'].toLowerCase()) {
            //         this.mainhubForm.get('territory_id').setValue(item['id']);
            //     }
            // });
        }
    }

    onCreateMainHubManagerClick() {
        this.http.post('http://35.196.225.9:1337 ', this.hubmanagerForm.value).subscribe(res => {
            console.log(res);
        });
    }
}
