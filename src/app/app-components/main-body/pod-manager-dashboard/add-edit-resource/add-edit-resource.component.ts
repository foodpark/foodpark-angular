import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PodsManagerService } from '../../../../app-services/pod-manager.service';
import { CategoryModel, LoadItemModel } from 'src/app/model';

@Component({
    selector: 'app-add-edit-resource',
    templateUrl: './add-edit-resource.component.html'
})

export class AddEditResourceComponent implements OnInit {
    activatedroute: any;
    popup1: any;
    loadID: number;
    loaditems: LoadItemModel[];
    adddeatilsform: FormGroup;
    reqobj: any;
    categories: CategoryModel[];
    loadtypes: any;
    displayCategories: CategoryModel[];

    formErrors = {
        quantity: '',
        description: '',
        category_name: '',
        load_type: ''
    };
    // Form Error Object
    validationMessages = {
        quantity: {
            required: 'quantity  required',
            pattern: 'Enter a valid quantity'
        },
        description: {
            required: 'description required'
        },
        category_name: {
            required: 'category_name required'
        },
        load_type: {
            required: 'load_type required'
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

        this.adddeatilsform.valueChanges.subscribe(data =>
            this.onValueChanged(data)
        );
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
            this.reqobj = {
                category_id: this.adddeatilsform.value.category_id,
                category_name: this.adddeatilsform.value.category_name,
                quantity: this.adddeatilsform.value.quantity,
                description: this.adddeatilsform.value.description,
                load_type: this.adddeatilsform.value.load_type,
                load_id: this.loadID
            };
            this.createLoad();
        }
    }

    constructor(
        private podsManagerService: PodsManagerService,
        private activateroute: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.activatedroute = activateroute;
        this.loadID = this.activatedroute.snapshot.params['id']
            ? this.activatedroute.snapshot.params['id']
            : '';

        this.getLoadItems();
        this.getcategories();
        this.loadtypes = [
            {
                loadtype: 'PALLET',
                id: '1'
            },
            {
                loadtype: 'BOX',
                id: '2'
            },
            {
                loadtype: 'ITEM',
                id: '3'
            }
        ];
        // this.newvolunterpopup = false;
    }

    getcategories() {
        this.podsManagerService.apigetcategories().subscribe(response => {
            this.categories = response;
            this.displayCategories = response;
        });
    }

    onCategoryClick(index: number, id: number) {
        const button = document.getElementById('category');
        const selectedCategory = this.displayCategories[index]['category'];
        button.innerText = selectedCategory;
        this.adddeatilsform.get('category_name').setValue(selectedCategory);
        this.adddeatilsform
            .get('category_id')
            .setValue(this.categories[index]['id']);
    }

    onloadtypeClick(index: number, id: number) {
        const categoryButton = document.getElementById('category');
        categoryButton.innerText = 'Category Name';
        this.adddeatilsform.get('category_name').setValue('');
        this.adddeatilsform.get('category_id').setValue('');

        const button = document.getElementById('loadtype');
        const selectedLoadType = this.loadtypes[index]['loadtype'];
        button.innerText = selectedLoadType;
        this.adddeatilsform.get('load_type').setValue(selectedLoadType);

        const loadItemsCategories = this.loaditems
            .filter(loaditem => loaditem.load_type === selectedLoadType)
            .map(loaditem => {
                return loaditem.category_name;
            });

        this.displayCategories = this.categories.filter(category => {
            return loadItemsCategories.indexOf(category.category) === -1;
        });
    }

    getLoadItems() {
        this.podsManagerService
            .apigetLoadItems(this.loadID)
            .subscribe(response => {
                this.loaditems = response;
            });
    }

    createLoad() {
        this.podsManagerService.apicreateLoadItems(this.reqobj).subscribe(
            response => {
                this.popup1 = true;
                this.getLoadItems();
            },
            error => {
                this.popup1 = false;
            }
        );
    }

    ngOnInit() {
        this.addloaddeatilsform();
    }
}
