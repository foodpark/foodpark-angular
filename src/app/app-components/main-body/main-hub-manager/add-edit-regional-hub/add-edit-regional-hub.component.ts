import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegionalHubModel, MainhubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {DataService} from '../../../../app-services/data.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-add-edit-regional-hub',
    templateUrl: './add-edit-regional-hub.component.html',
})
export class AddEditRegionalHubComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    regionalHubForm: FormGroup;
    regionalHubs: RegionalHubModel[];
    pageTitle = '';
    isCreate = false;
    private regionalHubsSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private regionalService: RegionalhubsService,
                private router: Router,
                private dataService: DataService,
                private mainhubService: MainhubService) {
    }

    ngOnInit() {
        this.buildForm();

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
        });

        this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
        .subscribe((regionalHubs: RegionalHubModel[]) => {
            this.regionalHubs = regionalHubs;
        });

        this.regionalService.getRegionalHubs();
        if (localStorage.getItem('regionalhub')) {
            this.isCreate = false;
            this.pageTitle = 'Edit Regional Hub';
            this.regionalHubs = JSON.parse(localStorage.getItem('regionalhub'));
            this.buildForm(this.regionalHubs);
        } else {
            this.isCreate = true;
            this.buildForm();
            this.pageTitle = 'Add Regional Hub';
        }
    }

    buildForm(formData?) {
        if (formData) {
            this.regionalHubForm = this.formBuilder.group({
                name: [formData['name'], Validators.required]
            });
        } else {
            this.regionalHubForm = this.formBuilder.group({
                name: ['', Validators.required],
                role: ['HUBMGR']
            });
        }

    }

    get f() {
        return this.regionalHubForm.controls;
    }

    onCreateRegionalHubClick() {
        if (this.isCreate) {
            const obj = {
                'name': this.regionalHubForm.get('name').value,
            };
            this.regionalService.addRegionalHub(obj);
            this.router.navigate(['/hubmanager/regionalhubs']);
        } else {
            const obj = {
                'name': this.regionalHubForm.get('name').value,
                'id': JSON.parse(localStorage.getItem('regionalhub'))['id']
            };
            this.regionalService.editRegionalHub(obj);
            this.router.navigate(['/hubmanager/regionalhubs']);
        }
    }

    ngOnDestroy() {
        if (this.dataService.nullCheck(this.regionalHubsSubscription)) {
            this.regionalHubsSubscription.unsubscribe();
        }
        localStorage.removeItem('regionalhub');
    }
}
