import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MainhubModel, PodPickupModel} from 'src/app/model';
import {PodPickupService} from 'src/app/app-services/pod-pickup.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-pod-pickups-listing',
    templateUrl: './pod-pickups-listing.component.html',
})
export class PodPickupsListingComponent implements OnInit, OnDestroy {

    podPickups: PodPickupModel[] = [];
    private podPickupsSubscription: Subscription;
    mainHub: MainhubModel;

    constructor(private podPickupService: PodPickupService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.podPickupService.getPodPickups(this.mainHub['id']);
                this.podPickupsSubscription = this.podPickupService.getPodPickupUpdateListener()
                    .subscribe((podPickup: PodPickupModel[]) => {
                            this.podPickups = podPickup;
                        }
                    );
            });
    }

    onAddPickupClick() {
        this.router.navigate(['/hubmanager/addeditpodpickup']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/addeditpodpickup', {podPickup: this.podPickups[index]['id']}]);
    }

    onDeleteClick(index: number) {
        this.podPickupService.deletePodPickup(this.podPickups[index]['id'])
            .subscribe(() => {
                this.podPickupService.getPodPickups(this.mainHub['id']);
            });
    }

    ngOnDestroy() {
        this.podPickupsSubscription && this.podPickupsSubscription.unsubscribe();
    }

}
