import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {MainhubModel, MasterLoadModel, RegionalHubModel} from '../../../../model';
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
    private regionalHubsSubscription: Subscription;
    private masterLoadSubscription: Subscription;
    private mainHubsSubscription: Subscription;

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

        this.mainHubsSubscription = this.mainHubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.masterLoadService.getMasterLoadsInMainHub(this.mainHub.id);
                this.regionalService.getRegionalHubsInMainHub(this.mainHub.id);
            });
        if (this.dataService.loadIdFlag) {
            const mainHubButton = document.getElementById('master_load');
            mainHubButton.innerText = this.dataService.nullCheck(this.dataService.loadObj['mainHub']) ? this.dataService.loadObj['mainHub'] : 'Select';

            const regionalHubButton = document.getElementById('regional_hub');
            regionalHubButton.innerText = this.dataService.nullCheck(this.dataService.loadObj['regionalHub']) ? this.dataService.loadObj['regionalHub'] : 'Select';

            const loadButton = document.getElementById('pod_load');
            loadButton.innerText = this.dataService.nullCheck(this.dataService.loadObj['loadName']) ? this.dataService.loadObj['loadName'] : 'Select';
        }

    }

    onMasterLoadClick(index: number) {
        const button = document.getElementById('master_load');
        button.innerText = this.masterLoads[index]['name'];
        this.dataService.loadObj['mainHub'] = this.masterLoads[index]['name'];
        this.requestBody = {
            ...this.requestBody,
            master_load_id: this.masterLoads[index]['id']
        };
    }

    onRegionalHubClick(index: number) {
        const button = document.getElementById('regional_hub');
        button.innerText = this.regionalHubs[index]['name'];
        this.dataService.loadObj['regionalHub'] = this.regionalHubs[index]['name'];
        this.requestBody = {
            ...this.requestBody,
            regional_hub_id: this.regionalHubs[index]['id']
        };
        this.loads = [];
        this.podsManagerService.getLoadRequestsForRegionalHub(this.regionalHubs[index]['id'])
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

    clickCustomize(load) {
        this.requestBody = {
            ...this.requestBody,
            load_id: load['id'],
            load_name: load['name']
        };
        this.dataService.loadRequestBody = this.requestBody;
        localStorage.setItem('loadId', load['id']);
        const loadId = load['id'];
        this.podsManagerService.getLoadRequestsFromId(loadId).subscribe(res => {
            this.dataService.loadObj['loadName'] = res['name'];
        });
        this.router.navigate(['/hubmanager/addeditloadresource', loadId, 'hubmanager']);
    }

    saveDonationOrder() {
        this.dataService.loadIdFlag = false;
        const requestObj = Object.keys(this.requestBody).length === 0 && this.requestBody.constructor === Object ? this.dataService.loadRequestBody : this.requestBody;
        this.masterLoadService.addDonationOrder(requestObj)
            .subscribe(response => {
                this.router.navigate(['/hubmanager/loadmanagement']);
            });
    }


    ngOnDestroy() {
        this.mainHubsSubscription && this.mainHubsSubscription.unsubscribe();
        this.masterLoadSubscription && this.masterLoadSubscription.unsubscribe();
        this.regionalHubsSubscription && this.regionalHubsSubscription.unsubscribe();
    }
}
