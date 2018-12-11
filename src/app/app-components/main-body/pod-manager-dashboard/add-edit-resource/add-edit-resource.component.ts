import {Component, OnInit} from '@angular/core';
import {RouterModule, Routes, Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialModule} from '../../../../app-modules/material.module';


import {PodsService} from '../../../../app-services/pods.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';


@Component({
    selector: 'app-add-edit-resource',
    templateUrl: './add-edit-resource.component.html',

})
export class AddEditResourceComponent implements OnInit {
    allvolunters: any;
    mainHub: any;
    mainhubId: any;
    territoryid: any;
    activatedroute: any;
    popup1: any;
    loadID: any;
    loadrequests: any;
    adddeatilsform: FormGroup;
    reqobj: any;
    categories: any;
    loadtypes: any;

    formErrors = {
        'quantity': '',
        'description': '',
        'category_name': '',
        'load_type': ''
    };
    // Form Error Object
    validationMessages = {
        'quantity': {
            'required': 'quantity  required',
            'pattern': 'Enter a valid quantity'
        },
        'description': {
            'required': 'description required',
        },
        'category_name': {
            'required': 'category_name required',
        },
        'load_type': {
            'required': 'load_type required',
        }
    };

    addloaddeatilsform() {
        this.adddeatilsform = this.formBuilder.group({
            quantity: ['', Validators.required],
            description: ['', Validators.required],
            category_id: ['', Validators.required],
            category_name: ['', Validators.required],
            load_type: ['', Validators.required]
        });

        this.adddeatilsform.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.adddeatilsform) {
            return;
        }
        const form = this.adddeatilsform;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }

    }

    onSubmitform() {
        if (!this.adddeatilsform.valid) {
            console.log('Form Is not Valid-------->');
            if (!this.adddeatilsform) {
                return;
            }
            const form = this.adddeatilsform;
            for (const field in this.formErrors) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
        if (this.adddeatilsform.valid) {
            console.log('Form Is Valid-------->');
            this.reqobj = {
                'category_id': this.adddeatilsform.value.category_id,
                'category_name': this.adddeatilsform.value.category_name,
                'quantity': this.adddeatilsform.value.quantity,
                'description': this.adddeatilsform.value.description,
                'load_type': this.adddeatilsform.value.load_type,
                'load_id': this.loadID
            };
            console.log(this.formErrors);
            this.createLoad();
        }

    }

    constructor(private podsService: PodsService, private podsManagerService: PodsManagerService,
                private mainhubService: MainhubService, private activateroute: ActivatedRoute, private formBuilder: FormBuilder) {
        this.activatedroute = activateroute;
        this.loadID = this.activatedroute.snapshot.params['id'] ? this.activatedroute.snapshot.params['id'] : '';
        console.log(this.activateroute);
        this.getmainhubid();
        this.getLoadItems();
        this.getcategories();
        this.loadtypes = [
            {
                'loadtype': 'PALLET',
                'id': '1'
            },
            {
                'loadtype': 'BOX',
                'id': '2'
            },
            {
                'loadtype': 'ITEM',
                'id': '3'
            }
        ];
        // this.newvolunterpopup = false;
    }

    getmainhubid() {
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                // this.mainhubId = this.mainHub.id;
                // this.territoryid = this.mainHub.territory_id;
                // console.log(this.mainHub);
            });
    }

    getcategories() {
        this.podsManagerService.apigetcategories()
            .subscribe((response) => {
                this.categories = response;
                console.log('this is categories requests', this.categories);
            }, (error) => {

            });
    }

    onCategoryClick(index: number, id: number) {
        const button = document.getElementById('category');
        button.innerText = this.categories[index]['category'];
        this.adddeatilsform.get('category_name').setValue(this.categories[index]['category']);
        this.adddeatilsform.get('category_id').setValue(this.categories[index]['id']);
    }

    onloadtypeClick(index: number, id: number) {
        const button = document.getElementById('loadtype');
        button.innerText = this.loadtypes[index]['loadtype'];
        this.adddeatilsform.get('load_type').setValue(this.loadtypes[index]['loadtype']);
    }

    getLoadItems() {
        this.podsManagerService.apigetLoadItems(this.loadID)
            .subscribe((response) => {
                this.loadrequests = response;
                console.log('this is load requests', this.loadrequests);
            }, (error) => {

            });
    }

    createLoad() {
        this.podsManagerService.apicreateLoadItems(this.reqobj)
            .subscribe((response) => {
                this.popup1 = true;
                this.getLoadItems();
            }, (error) => {
                this.popup1 = false;

            });
    }

    ngOnInit() {
        this.addloaddeatilsform();
    }

}
