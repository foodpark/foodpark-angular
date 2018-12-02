import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PodsService} from '../../../../app-services/pods.service';
import {MainhubModel, PodModel, RegionalHubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';


@Component({
    selector: 'app-pods-listing',
    templateUrl: './pods.component.html',

})
export class PodsComponent implements OnInit {
    pods: PodModel[] = [];
    approve = ['Approved', 'Disapproved'];
    mainHub: MainhubModel;
    approvedStatus: string;
    regionalHubs: RegionalHubModel[] = [];
    private podsSubscription: Subscription;

    constructor(private podsService: PodsService,
                private router: Router,
                private mainhubService: MainhubService,
                private regionalHubService: RegionalhubsService) {
    }

    ngOnInit() {
        this.podsService.getAllPods()
            .subscribe((podsData) => {
                this.pods = podsData;
                this.approvedStatus = this.pods[0]['approved'] ? 'Approved' : 'Disapproved';
            });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.regionalHubService.getRegionalHubsInMainhub(this.mainHub['id']);
                this.regionalHubService.getRegionalHubsUpdateListener().subscribe(res => {
                    this.regionalHubs = res;
                });
            });
        this.podsSubscription = this.podsService.getPodsUpdateListener()
            .subscribe((pods: PodModel[]) => {
                this.pods = pods;
            });
    }

    onEditClick(index: number) {
        localStorage.setItem('editpod', JSON.stringify(this.pods[index]));
        this.router.navigate(['/hubmanager/editpod']);
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
}

