import {Component, OnDestroy, OnInit} from '@angular/core';
import {HubPickupModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';

@Component({
    selector: 'app-hub-pickup-listing',
    templateUrl: './hub-pickup-listing.component.html',
})
export class HubPickupListingComponent implements OnInit, OnDestroy {
    hubPickups: HubPickupModel[] = [];
    private hubPickupsSubscription: Subscription;

    constructor(private hubPickupService: HubPickupService,
                private router: Router) {
    }

    ngOnInit() {
        this.hubPickupService.getHubPickups();
        this.hubPickupsSubscription = this.hubPickupService.getHubPickupUpdateListener()
            .subscribe((hubPickups: HubPickupModel[]) => {
                this.hubPickups = hubPickups;
            });
    }

    onAddPickupClick() {
        this.router.navigate(['/admin/addHubPickup']);
    }

    onEditClick(index: number) {
        localStorage.setItem('hubPickup', JSON.stringify(this.hubPickups[index]));
        this.router.navigate(['/admin/editHubPickup']);
    }

    onDeleteClick(index: number) {
        this.hubPickupService.deleteHubPickup(index).subscribe(() => {
            this.hubPickupService.getHubPickups();
        });
    }

    ngOnDestroy() {
        this.hubPickupsSubscription.unsubscribe();
    }
}
