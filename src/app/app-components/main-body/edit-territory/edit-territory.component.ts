import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-territory',
    templateUrl: './edit-territory.component.html',
})
export class EditTerritoryComponent implements OnInit {
    addEditTerritoryForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.addEditTerritoryForm = this.formBuilder.group({
            territory: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required]
        });
    }

    get f() {
        return this.addEditTerritoryForm.controls;
    }

    onSaveClick() {

    }
}
