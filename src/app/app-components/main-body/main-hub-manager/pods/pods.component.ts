import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PodsService} from '../../../../app-services/pods.service';
import {PodModel} from '../../../../model';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-pods-listing',
    templateUrl: './pods.component.html',

})
export class PodsComponent implements OnInit {
    pods: PodModel[] = [];
    approve = ['Approve', 'Disapprove'];
    private podsSubscription: Subscription;

    constructor(private podsService: PodsService,
                private router: Router) {
    }

    ngOnInit() {
        this.podsService.getAllPods();
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

    onAssignHubClick(type: string) {
        const button = document.getElementById('assign_hub');
        button.innerText = type;
    }

    onDeleteClick(index) {
        this.podsService.deletePod(index).subscribe(() => {
            this.podsService.getAllPods();
        });
    }
}

