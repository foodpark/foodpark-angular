import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MainhubService} from 'src/app/app-services/mainhub.service';
import { MainhubModel, RegionalHubModel } from 'src/app/model';
import { DataService } from 'src/app/app-services/data.service';
import { RegionalhubsService } from 'src/app/app-services/regionalhubs.service';


@Component({
    selector: 'app-regional-hub',
    templateUrl: './regionalhub.component.html',
})
export class RegionalHubComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    public regionalHubs: RegionalHubModel[];
    private regionalHubSubscription: Subscription;

    constructor(private dataService: DataService,
                private regionalHubService: RegionalhubsService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.regionalHubSubscription = this.regionalHubService.getRegionalHubsUpdateListener()
            .subscribe((regionalHubs: RegionalHubModel[]) => {
                this.regionalHubs = regionalHubs;
            });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.regionalHubService.getRegionalHubsInMainHub(this.mainHub.id);
            });
    }

    onAddRegionalHubClick() {
        this.router.navigate(['/hubmanager/addregionalhub']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editregionalhub', {regionalHubId: this.regionalHubs[index]['id']}]);
    }

    onDeleteClick(id: number) {
        this.regionalHubService.deleteRegionalHub(id).subscribe(() => {
            this.regionalHubService.getRegionalHubsInMainHub(this.mainHub.id);
        });
    }

    ngOnDestroy() {
        this.regionalHubSubscription.unsubscribe();
    }
}
