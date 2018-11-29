import {Component, OnInit, OnDestroy} from '@angular/core';
import { PodmanagerModel } from 'src/app/model';
import { PodsService } from 'src/app/app-services/pods.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-pod-managers-listing',
    templateUrl: './pod-managers-listing.component.html',
})

export class PodManagersListingComponent implements OnInit, OnDestroy {
    podManagers: PodmanagerModel[] = [];
    private podmanagerSubscription: Subscription;

    constructor(private podService: PodsService) {}

    ngOnInit() {
        this.podmanagerSubscription = this.podService.getPodmanagersUpdateListener()
        .subscribe((podManagers) => {
            this.podManagers = podManagers;
        });
        this.podService.getPodManagers();
    }

    onCreatePodManagerClick() {

    }

    ngOnDestroy() {
        this.podmanagerSubscription.unsubscribe();
    }
}
