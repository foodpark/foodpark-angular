import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {MasterLoadModel, RegionalHubModel, MainhubModel} from '../../../../model';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {DataService} from '../../../../app-services/data.service';

@Component({
    selector: 'app-create-donation-order',
    templateUrl: './create-donation-order.component.html',
})
export class CreateDonationOrderComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    createDonationOrderForm: FormGroup;
    masterLoads: MasterLoadModel[] = [];
    regionalHubs;
    requestBody = {};
    loads: any;
    loadId;
    loadName: string;
    private regionalHubsSubscription: Subscription;
    private masterLoadSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private dataService: DataService,
                private masterLoadService: MasterLoadService,
                private regionalService: RegionalhubsService,
                private mainHubService: MainhubService,
                private activateroute: ActivatedRoute,
                private podsManagerService: PodsManagerService) {
    }

    ngOnInit() {
        this.createDonationOrderForm = this.fb.group({
            master_load: ['', Validators.required],
            regional_hub: ['', Validators.required],
            select_pod_load: ['', Validators.required],
        });

        this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
        .subscribe((regionalHubs: RegionalHubModel[]) => {
            this.regionalHubs = regionalHubs;
        });

        this.masterLoadSubscription = this.masterLoadService.getMasterUpdateListener()
        .subscribe(res => {
            this.masterLoads = res;
        });

        this.mainHubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
            this.masterLoadService.getMasterLoadsInMainHub(this.mainHub.id);
            this.regionalService.getRegionalHubsInMainHub(this.mainHub.id);
        });

        // this.podsManagerService.getLoadRequests()
        // .subscribe(res => {
        //     this.loads = res;
        // });

        this.loadName = this.dataService.nullCheck(this.dataService.loadName) ? this.dataService.loadName : '';
        if (this.loadName !== '') {
            const button = document.getElementById('pod_load');
            button.innerText = this.loadName;
        }
    }

    clickCustomize(loadId: number) {
        localStorage.setItem('loadId', loadId['id']);
        this.podsManagerService.getLoadRequestsFromId(loadId).subscribe(res => {
            this.dataService.loadName = res['name'];
        });
        this.router.navigate(['/hubmanager/addeditloadresource', loadId, 'hubmanager']);
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
        const regHub = this.regionalHubs[index];
        const button = document.getElementById('regional_hub');
        button.innerText = regHub.name;
        this.requestBody = {
            ...this.requestBody,
            regional_hub_id: regHub.id // this.regionalHubs[index]['id']
        };
        this.loads = [];
        this.podsManagerService.getLoadRequestsForRegionalHub(regHub.id)
        .subscribe(res => {
            this.loads = res;
        });

    }

    onLoadRequestSelected(loadRequest) {
        const button = document.getElementById('pod_load');
        button.innerText = loadRequest['name'];
        this.requestBody = {
            ...this.requestBody,
            load_id: loadRequest['id'],
            load_name: loadRequest['name']
        };
    }

    saveDonationOrder() {
        this.masterLoadService.addDonationOrder(this.requestBody)
        .subscribe( response => {
            this.router.navigate(['/hubmanager/loadmanagement']);
        });
    }


    ngOnDestroy() {
        // this.mainHubsSubscription.unsubscribe();
        this.masterLoadSubscription.unsubscribe();
        this.regionalHubsSubscription.unsubscribe();
    }
}
