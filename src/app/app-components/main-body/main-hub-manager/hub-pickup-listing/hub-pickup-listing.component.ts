import {Component, OnDestroy, OnInit} from '@angular/core';
import {HubPickupModel, MainhubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HubPickupService} from '../../../../app-services/hub-pickup.service';
import {MainhubService} from '../../../../app-services/mainhub.service';

@Component({
    selector: 'app-hub-pickup-listing',
    templateUrl: './hub-pickup-listing.component.html',
})
export class HubPickupListingComponent implements OnInit, OnDestroy {
    hubPickups: HubPickupModel[] = [];
    private hubPickupsSubscription: Subscription;
    mainHub: MainhubModel;
    hubPickupStartTime = [];
    hubPickupEndTime = [];

    constructor(private hubPickupService: HubPickupService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.hubPickupService.getHubPickups();
        this.hubPickupsSubscription = this.hubPickupService.getHubPickupUpdateListener()
            .subscribe((hubPickups: HubPickupModel[]) => {
                    this.hubPickups = hubPickups;
                    this.hubPickups.forEach(hub => {
                        // const startDate = new Date(hub['start_date']);
                        // const endDate = new Date(hub['end_date']);
                        // console.log(startDate, endDate);
                        const startDate = `${(hub['start_date'].split('T')[0]).split('-')[1]}-${(hub['start_date'].split('T')[0]).split('-')[2]}-${(hub['start_date'].split('T')[0]).split('-')[0]}`;
                        const endDate = `${(hub['end_date'].split('T')[0]).split('-')[1]}-${(hub['end_date'].split('T')[0]).split('-')[2]}-${(hub['end_date'].split('T')[0]).split('-')[0]}`;
                        this.hubPickupStartTime.push(startDate);
                        this.hubPickupEndTime.push(endDate);
                    });
                }
            );
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });
    }

    onAddPickupClick() {
        this.router.navigate(['/hubmanager/addhubpickup']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/edithubpickup', {hubPickups: this.hubPickups[index]['id']}]);
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
