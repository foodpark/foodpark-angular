import {Component, OnInit, OnDestroy} from '@angular/core';
import {ParamMap, Router} from '@angular/router';
import {PodsService} from '../../../../app-services/pods.service';
import {MainhubModel, PodModel, RegionalHubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';


@Component({
    selector: 'app-pods-listing',
    templateUrl: './pods.component.html',

})
export class PodsComponent implements OnInit, OnDestroy {
    pods: PodModel[] = [];
    approve = ['Approved', 'Disapproved'];
    mainHub: MainhubModel;
    regionalHubs: RegionalHubModel[] = [];
    private podsSubscription: Subscription;
    private regionalHubSubscription: Subscription;

    constructor(private podsService: PodsService,
                private router: Router,
                private mainhubService: MainhubService,
                private regionalHubService: RegionalhubsService) {
    }

    ngOnInit() {
        this.regionalHubSubscription = this.regionalHubService.getRegionalHubsUpdateListener()
        .subscribe((regionalHubs: RegionalHubModel[]) => {
            this.regionalHubs = regionalHubs;
        });

        this.podsSubscription = this.podsService.getPodsUpdateListener()
        .subscribe((pods: PodModel[]) => {
            this.pods = pods;
        });

        this.podsService.getAllPods()
        .subscribe((podsData) => {
            this.pods = podsData;
        });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
            this.regionalHubService.getRegionalHubsInMainhub(this.mainHub['id']);
        });
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editpod', {podId: this.pods[index]['id']}]);
    }

    onCreatePodClick() {
        this.router.navigate(['/hubmanager/createpod']);
    }

    onOptionClick(type: string) {
        const button = document.getElementById('status_button');
        button.innerText = type;
    }

    onAssignHubClick(index: number) {
        const button = document.getElementById('assign_hub');
        button.innerText = this.regionalHubs[index]['name'];
        this.podsService.updateRegionalHubID(this.pods[index]['id'], this.regionalHubs[index]['id']);
    }

    onDeleteClick(index) {
        this.podsService.deletePod(index).subscribe(() => {
            this.podsService.getAllPods();
        });
    }

    ngOnDestroy() {
        this.podsSubscription.unsubscribe();
        this.regionalHubSubscription.unsubscribe();
    }
}
