import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {MasterLoadModel, RegionalHubModel} from '../../../../model';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';

@Component({
    selector: 'app-create-donation-order',
    templateUrl: './create-donation-order.component.html',
})
export class CreateDonationOrderComponent implements OnInit {
    createDonationOrderForm: FormGroup;
    masterLoadSubscription: Subscription;
    masterLoads: MasterLoadModel[] = [];
    regionalHubs;
    private regionalHubsSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private masterLoadService: MasterLoadService,
                private regionalService: RegionalhubsService) {
    }

    ngOnInit() {
        this.createDonationOrderForm = this.fb.group({
            master_load: ['', Validators.required],
            regional_hub: ['', Validators.required],
            select_pod_load: ['', Validators.required],
        });

        this.masterLoadService.getAllMasterLoads();
        this.masterLoadService.getAllMasterLoads();
        this.masterLoadSubscription = this.masterLoadService.getMasterUpdateListener()
            .subscribe(res => {
                this.masterLoads = res;
            });

        this.regionalService.getRegionalHubs();
        this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
            .subscribe((regionalHubs: RegionalHubModel[]) => {
                this.regionalHubs = regionalHubs;
            });

    }

    onMainLoadClick(masterLoadName) {
        const button = document.getElementById('master_load');
        button.innerText = masterLoadName;
    }

    onRegionalHubClick(regionalHubName) {
        const button = document.getElementById('regional_hub');
        button.innerText = regionalHubName;
    }

    saveDonationOrder() {
        this.router.navigate(['/hubmanager/loadmanagement']);
    }
}
