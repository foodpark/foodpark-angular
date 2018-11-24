import {Component, OnDestroy, OnInit} from '@angular/core';

import {DataService} from '../../../../app-services/data.service';
import {RegionalHubModel} from '../../../../model';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
    selector: 'app-regional-hub',
    templateUrl: './regionalhub.component.html',
})
export class RegionalHubComponent implements OnInit, OnDestroy {
    private regionalHubs: RegionalHubModel[];
    private regionalHubSubscription: Subscription;

    constructor(private dataService: DataService,
                private regionalHubService: RegionalhubsService,
                private router: Router) {
    }

    ngOnInit() {
        this.regionalHubService.getRegionalHubs();
        this.regionalHubSubscription = this.regionalHubService.getRegionalHubsUpdateListener()
            .subscribe((regionalHubs: RegionalHubModel[]) => {
                this.regionalHubs = regionalHubs;
            });
    }

    onAddRegionalHubClick() {
        this.router.navigate(['/hubmanager/addregionalhub']);
    }

    onEditClick(index: number) {
        localStorage.setItem('regionalhub', JSON.stringify(this.regionalHubs[index]));
        this.router.navigate(['/hubmanager/editregionalhub']);
    }

    onDeleteClick(id: number) {
        this.regionalHubService.deleteRegionalHub(id).subscribe(() => {
            this.regionalHubService.getRegionalHubs();
        });
    }

    ngOnDestroy() {
        this.regionalHubSubscription.unsubscribe();
    }
}
