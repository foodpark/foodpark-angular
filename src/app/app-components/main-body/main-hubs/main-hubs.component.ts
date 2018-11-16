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

    mainhubForm: FormGroup;
    submitted = false;
    territoryData;
    countryData;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private router: Router) {
    }

    ngOnInit() {
        this.mainhubForm = this.formBuilder.group({
            name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            type: ['MAIN', Validators.required]
        });
    }

    get f() {
        return this.mainhubForm.controls;
    }

    onDropdownChange(event) {
        if (event.hasOwnProperty('country')) {
            this.mainhubForm.get('country').setValue(event['country']);
        } else {
            this.mainhubForm.get('territory_id').setValue(event);
            // Object.values(event).forEach(item => {
            //     if (this.mainhubForm.get('country').value.toLowerCase() === item['country'].toLowerCase()) {
            //         this.mainhubForm.get('territory_id').setValue(item['id']);
            //     }
            // });
        }
    }

    onCreateMainHubClick() {
        this.http.post('http://35.196.225.9:1337 ', this.mainhubForm.value).subscribe(res => {
            console.log(res);
        });
    }
}
