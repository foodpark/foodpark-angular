import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { PodPickupModel, MainhubModel } from 'src/app/model';
import { PodPickupService } from 'src/app/app-services/pod-pickup.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-pod-pickups-listing',
    templateUrl: './pod-pickups-listing.component.html',
})
export class PodPickupsListingComponent implements OnInit, OnDestroy {

    podPickups: PodPickupModel[] = [];
    private podPickupsSubscription: Subscription;
    mainHub: MainhubModel;
    podPickupStartDate = [];
    podPickupEndDate = [];

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
                            this.podPickups.forEach(hub => {
                                const startDate = `${(hub['start_date'].split('T')[0]).split('-')[1]}-${(hub['start_date'].split('T')[0]).split('-')[2]}-${(hub['start_date'].split('T')[0]).split('-')[0]}`;
                                const endDate = `${(hub['end_date'].split('T')[0]).split('-')[1]}-${(hub['end_date'].split('T')[0]).split('-')[2]}-${(hub['end_date'].split('T')[0]).split('-')[0]}`;
                                this.podPickupStartDate.push(startDate);
                                this.podPickupEndDate.push(endDate);
                            });
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
