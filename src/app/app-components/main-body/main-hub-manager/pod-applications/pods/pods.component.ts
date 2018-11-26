import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PodsService} from '../../../../../app-services/pods.service';
import {PodModel} from '../../../../../model';
import {Subscription} from 'rxjs';


@Component({
    selector: 'pods',
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
        localStorage.setItem('editpods', JSON.stringify(this.pods[index]));
        this.router.navigate(['/admin/editpods']);
    }

}
