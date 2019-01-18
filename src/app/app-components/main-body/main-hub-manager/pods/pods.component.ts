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
    approve = ['Approved', 'Unapproved'];
    mainHub: MainhubModel;
    regionalHubs: RegionalHubModel[] = [];
    selectedRegionalHubNames: string[] = [];
    private podsSubscription: Subscription;
    private regionalHubSubscription: Subscription;

    constructor(private podsService: PodsService,
                private router: Router,
                private mainhubService: MainhubService,
                private regionalHubService: RegionalhubsService) {
    }

    ngOnInit() {
        this.fetchData();
        // Register for regional hubs service. Get all Pods after getting regional hubs
        this.regionalHubSubscription = this.regionalHubService.getRegionalHubsUpdateListener()
            .subscribe((regionalHubs: RegionalHubModel[]) => {
                this.regionalHubs = regionalHubs;
                this.podsService.getPodsInMainHub(this.mainHub.id);
            });

        this.podsSubscription = this.podsService.getPodsUpdateListener()
            .subscribe((pods: PodModel[]) => {
                this.selectedRegionalHubNames = [];
                this.pods = pods;
                this.pods.forEach(element => {
                    const regID = element['regional_hub_id'];

                    function search(obj: RegionalHubModel) {
                        return obj['id'] === regID;
                    }

                    if (regID === null) {
                        this.selectedRegionalHubNames.push('');
                    } else {
                        const srchIndex = this.regionalHubs.findIndex(search);
                        this.selectedRegionalHubNames.push(this.regionalHubs[srchIndex]['name']);
                    }
                });
            });
    }

    fetchData() {
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
            this.regionalHubService.getRegionalHubsInMainHub(this.mainHub['id']);
        });
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editpod', {podId: this.pods[index]['id']}]);
    }

    onCreatePodClick() {
        this.router.navigate(['/hubmanager/createpod']);
    }

    onStatusChangeClick(index: number, type: string) {
        const button = document.getElementById('status' + index);
        button.innerText = type;
        if (type === this.approve[0]) {
            this.podsService.approvePod(this.pods[index]['id']).subscribe(res => {
                this.fetchData();
            });
        } else {
            this.podsService.rejectPod(this.pods[index]['id']).subscribe(res => {
                this.fetchData();
            });
        }
    }

    onAssignRegionalHubClick(rowindex: number, regionalhubIndex: number, regionalhubId: number) {
        const button = document.getElementById('assignhub' + rowindex);
        button.innerText = this.regionalHubs[regionalhubIndex]['name'];
        this.podsService.updateRegionalHubID(this.pods[rowindex]['id'], regionalhubId).subscribe(res => {
            this.fetchData();
        });
    }

    onDeleteClick(index) {
        this.podsService.deletePod(index).subscribe(() => {
            this.podsService.getPodsInMainHub(this.mainHub.id);
        });
    }

    ngOnDestroy() {
        this.podsSubscription.unsubscribe();
        this.regionalHubSubscription.unsubscribe();
    }
}
