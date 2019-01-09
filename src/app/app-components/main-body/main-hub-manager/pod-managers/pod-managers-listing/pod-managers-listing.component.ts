import {Component, OnInit, OnDestroy} from '@angular/core';
import {PodmanagerModel, MainhubModel} from 'src/app/model';
import {PodsService} from 'src/app/app-services/pods.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-pod-managers-listing',
    templateUrl: './pod-managers-listing.component.html',
})

export class PodManagersListingComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    podManagers: PodmanagerModel[] = [];
    private podmanagerSubscription: Subscription;

    constructor(private podService: PodsService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.podmanagerSubscription = this.podService.getPodmanagersUpdateListener()
            .subscribe((podManagers) => {
                this.podManagers = podManagers;
            });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
            this.podService.getPodManagersInMainHub(this.mainHub['id']);
        });
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editpodmanager/' + this.podManagers[index]['id']]);
    }

    onDeleteClick(podManagerId: number) {

    }

    ngOnDestroy() {
        this.podmanagerSubscription.unsubscribe();
    }
}
