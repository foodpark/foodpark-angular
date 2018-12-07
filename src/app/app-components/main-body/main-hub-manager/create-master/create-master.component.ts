import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-master',
    templateUrl: './create-master.component.html',
})
export class CreateMasterComponent implements OnInit {
    createMasterForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createMasterForm = this.fb.group({
            load_name: ['', Validators.required]
        });
    }

}
