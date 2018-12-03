import {Component, OnInit, OnDestroy} from '@angular/core';
import {PodmanagerModel} from 'src/app/model';
import {PodsService} from 'src/app/app-services/pods.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pod-managers-listing',
    templateUrl: './pod-managers-listing.component.html',
})

export class PodManagersListingComponent implements OnInit, OnDestroy {
    podManagers: PodmanagerModel[] = [];
    private podmanagerSubscription: Subscription;

    constructor(private podService: PodsService,
                private router: Router) {
    }

    ngOnInit() {
        this.podmanagerSubscription = this.podService.getPodmanagersUpdateListener()
            .subscribe((podManagers) => {
                this.podManagers = podManagers;
            });
        this.podService.getPodManagers();
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editpodmanager', {podmanagerid: this.podManagers[index]['id']}]);
    }

    onDeleteClick(podManagerId: number) {

    }

    ngOnDestroy() {
        this.podmanagerSubscription.unsubscribe();
    }
}
