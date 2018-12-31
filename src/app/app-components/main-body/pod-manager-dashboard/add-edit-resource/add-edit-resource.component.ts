import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {CategoryModel, LoadItemModel} from 'src/app/model';
import {TitleCasePipe} from '@angular/common';

@Component({
    selector: 'app-add-edit-resource',
    templateUrl: './add-edit-resource.component.html'
})
export class AddEditResourceComponent implements OnInit {
    activatedroute: any;
    loadID: number;
    loadName: string;
    loaditems: LoadItemModel[];
    adddeatilsform: FormGroup;
    editdeatilsform: FormGroup;
    reqobj: any;
    categories: CategoryModel[];
    loadtypes: any;
    displayCategories: CategoryModel[];
    addpopup : any;
    editreqobj: any;
    editpopup: any;
    editdata: any;
    loadid: any;
    selectedCategoryname: any;
    loadbuttonvalue : any;
    categorybuttonvalue: any;

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

    editloaddeatilsform() {
        this.editdeatilsform = this.formBuilder.group({
            quantity: ['', Validators.required],
            description: ['', Validators.required],
            category_id: ['', Validators.required],
            category_name: ['', Validators.required],
            load_type: ['', Validators.required]
        });

        this.editdeatilsform.valueChanges.subscribe(data =>
            this.oneditValueChanged(data)
        );
        this.oneditValueChanged(); // (re)set validation messages now
    }

    oneditValueChanged(data?: any) {
        if (!this.editdeatilsform) {
            return;
        }
        const form = this.editdeatilsform;
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

    onSubmiteditform() {
        if (!this.editdeatilsform.valid) {
            console.log('Form Is not Valid-------->', this.editdeatilsform);
            if (!this.editdeatilsform) {
                return;
            }
            const form = this.editdeatilsform;

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

        if (this.editdeatilsform.valid) {
            this.editreqobj = {
                category_id: this.editdeatilsform.value.category_id,
                category_name: this.editdeatilsform.value.category_name,
                quantity: this.editdeatilsform.value.quantity,
                description: this.editdeatilsform.value.description,
                load_type: this.editdeatilsform.value.load_type
            };
            this.updateloaddetails();
        }
    }

    constructor(
        private podsManagerService: PodsManagerService,
        private activateroute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private titleCasePipe: TitleCasePipe) {
        this.activatedroute = activateroute;
        this.loadID = this.activatedroute.snapshot.params['id'] ? this.activatedroute.snapshot.params['id'] : '';
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
        this.addpopup = false;
        this.editpopup = false;
    }

    getcategories() {
        this.podsManagerService.apigetcategories().subscribe(response => {
            this.categories = response;
            this.displayCategories = response;
        });
    }

    // fix_key(key){
    //   return key.replace('category', 'category_name');
    // }

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

        const button = document.getElementById('loadtype');
        const selectedLoadType = this.loadtypes[index]['loadtype'];
        button.innerText = this.titleCasePipe.transform(selectedLoadType);
        this.adddeatilsform.get('load_type').setValue(selectedLoadType);

        // to make category field empty
        const categoryButton = document.getElementById('category');
        categoryButton.innerText = 'Category Name';
        this.adddeatilsform.get('category_name').setValue('');
        this.adddeatilsform.get('category_id').setValue('');

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
        this.podsManagerService.apigetLoadRequestsFromId(this.loadID).subscribe(res => {
            this.loadName = res['name'];
        });
        this.podsManagerService
            .apigetLoadItems(this.loadID)
            .subscribe(response => {
                this.loaditems = response;
            });
    }

    createLoad() {
        this.podsManagerService.apicreateLoadItems(this.reqobj).subscribe(
            response => {
                this.addpopup = false;
                this.getLoadItems();
                this.addloaddeatilsform();
            },
            error => {
                this.addpopup = true;
            }
        );
    }

    onclickDelete(deleteid) {
        this.podsManagerService.apiDeleteLoadItems(deleteid).subscribe(
            response => {
                this.getLoadItems();
            },
            error => {
            }
        );
    }

    // onEditloadtypeClick() {
    //   this.editdeatilsform.get('load_type').setValue(this.editdata['load_type'], {emitEvent: false});
    //   console.log('this inner text',this.editdeatilsform.get('load_type').value);
    //   document.getElementById('loadtypebutton').innerText = this.editdeatilsform.get('load_type').value;
    // }

    onclickAddEdit(listdata) {
      console.log(listdata);
      this.editpopup = true;
      this.editdata = listdata;
      this.loadid = this.editdata.id;
      this.editdeatilsform.get('quantity').setValue(this.editdata['quantity'], { emitEvent: false });
      this.editdeatilsform.get('description').setValue(this.editdata['description'], { emitEvent: false });
      this.editdeatilsform.get('load_type').setValue(this.editdata['load_type'], {emitEvent: false});
      this.editdeatilsform.get('category_name').setValue(this.editdata['category_name'], {emitEvent: false});
      this.editdeatilsform.get('category_id').setValue(this.editdata['category_id'], {emitEvent: false});
      this.loadbuttonvalue = this.editdeatilsform.get('load_type').value;
      this.categorybuttonvalue = this.editdeatilsform.get('category_name').value;
    }

    onEditCategoryClick(index: number, id: number) {
      const button = document.getElementById('editcategory');
      const selectedCategory = this.displayCategories[index]['category'];
      button.innerText = selectedCategory;
      this.editdeatilsform.get('category_name').setValue(selectedCategory);
      this.editdeatilsform.get('category_id').setValue(this.categories[index]['id']);
      console.log('this edit category',this.editdeatilsform.get('category_id').value)

    }

    onEditloadtypeClick(index: number, id: number) {
      const button = document.getElementById('editloadtype');
      const selectedloadvalue = this.loadtypes[index]['loadtype'];
      button.innerText = selectedloadvalue;
      this.editdeatilsform.get('load_type').setValue(selectedloadvalue);
      console.log('this edit category',this.editdeatilsform.get('load_type').value)

    }

    updateloaddetails() {
      this.podsManagerService.apiupdateLoadItems(this.loadid, this.editreqobj).subscribe(
          response => {
              console.log('successfully update');
              this.editpopup = false;
              this.getLoadItems();
              this.editloaddeatilsform();
          },
          error => {
              this.editpopup = true;
          }
      );
    }

    ngOnInit() {
        this.addloaddeatilsform();
        this.editloaddeatilsform();
    }
}
