import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {LoadItemModel, MasterLoadModel, RegionalHubModel} from '../../../../model';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';

@Component({
    selector: 'app-create-donation-order',
    templateUrl: './create-donation-order.component.html',
})
export class CreateDonationOrderComponent implements OnInit, OnDestroy {
    createDonationOrderForm: FormGroup;
    masterLoads: MasterLoadModel[] = [];
    regionalHubs;
    mainHubs;
    requestBody = {};
    loads: any;
    loaditems: LoadItemModel[];
    showAddEditTable = false;
    private regionalHubsSubscription: Subscription;
    private masterLoadSubscription: Subscription;
    private mainHubsSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private masterLoadService: MasterLoadService,
                private regionalService: RegionalhubsService,
                private mainHubService: MainhubService,
                private podsManagerService: PodsManagerService) {
    }

    ngOnInit() {
        this.createDonationOrderForm = this.fb.group({
            master_load: ['', Validators.required],
            regional_hub: ['', Validators.required],
            select_pod_load: ['', Validators.required],
        });

        this.masterLoadService.getAllMasterLoads();
        this.masterLoadSubscription = this.masterLoadService.getMasterUpdateListener()
            .subscribe(res => {
                this.masterLoads = res;
                this.regionalService.getRegionalHubsInMainHub(this.masterLoads[0]['main_hub_id']);
                this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
                    .subscribe((regionalHubs: RegionalHubModel[]) => {
                        this.regionalHubs = regionalHubs;
                    });
            });
        // this.mainHubService.getMainhubOfLoggedInUser((localStorage.getItem('user_id')));
        // this.mainHubsSubscription = this.mainHubService.getMainhubsUpdateListener().subscribe(res => {
        //     this.mainHubs = res;
        // });
        this.podsManagerService.apigetLoadRequests().subscribe(res => {
            this.loads = res;
        });
    }

    // "master_load_id":2,
    // "regional_hub_id":4,
    // "load_id":1,
    // "load_name":"Load 1"

    clickCustomize(loadId: number) {
        this.showAddEditTable = true;
        this.podsManagerService
            .apigetLoadItems(loadId)
            .subscribe(response => {
                this.loaditems = response;
            });
    }

    onDeleteLoadClick(loadId: number) {
    }

    onEditLoadClick(loadId: number) {
    }

    onMasterLoadClick(index: number) {
        const button = document.getElementById('master_load');
        button.innerText = this.masterLoads[index]['name'];
        this.requestBody = {
            ...this.requestBody,
            master_load_id: this.masterLoads[index]['id']
        };
    }

    onRegionalHubClick(index: number) {
        const button = document.getElementById('regional_hub');
        button.innerText = this.regionalHubs[index]['name'];
        this.requestBody = {
            ...this.requestBody,
            regional_hub_id: this.regionalHubs[index]['id']
        };
    }

    saveDonationOrder() {
        this.router.navigate(['/hubmanager/loadmanagement']);
    }

    ngOnDestroy() {
        // this.mainHubsSubscription.unsubscribe();
        this.masterLoadSubscription.unsubscribe();
        this.regionalHubsSubscription.unsubscribe();
    }
}
