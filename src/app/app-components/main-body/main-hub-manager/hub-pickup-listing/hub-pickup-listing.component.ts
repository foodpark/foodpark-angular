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
    sponsors = [];
    sponsorName = {};
    sposorImages = [];

    constructor(private hubPickupService: HubPickupService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.hubPickupService.getHubPickups();
        this.hubPickupsSubscription = this.hubPickupService.getHubPickupUpdateListener()
            .subscribe((hubPickups: HubPickupModel[]) => {
                this.hubPickups = hubPickups;
            });
        this.hubPickups.forEach(hubpickup => {
            this.sponsors.push(hubpickup['sponsors']);
        });
        console.log(this.sponsors);
        // this.sponsors.forEach(res => {
        // });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });
    }

    onAddPickupClick() {
        this.router.navigate(['/hubmanager/addhubpickup']);
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/edithubpickup', {hubPickups: JSON.stringify(this.hubPickups[index]['id'])}]);
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
