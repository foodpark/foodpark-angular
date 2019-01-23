import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {PodModel} from '../../../../model';

@Component({
    selector: 'app-loadresource',
    templateUrl: './load-resource.component.html'
})
export class LoadResourceComponent implements OnInit {
    loadrequests: any;
    newLoadRequestForm: any;
    popUp: any;
    pod: PodModel;

    constructor(private podsManagerService: PodsManagerService,
                private route: Router,
                private formBuilder: FormBuilder) {
        this.popUp = true;
    }


    ngOnInit() {
        this.requestInitform();
        this.podsManagerService.getPodOfLoggedInUser(parseInt(localStorage.getItem('user_id'), 10))
            .subscribe(pod => {
                this.pod = pod[0];
                this.getLoadRequestsFromPodId(this.pod['id']);
            });
    }

    requestInitform() {
        this.newLoadRequestForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    getLoadRequests() {
        this.podsManagerService.getLoadRequests().subscribe(response => {
            this.loadrequests = response;
        });
    }

    getLoadRequestsFromPodId(podId: number) {
        this.podsManagerService.getLoadRequestsFromPodId(podId)
            .subscribe(response => {
                this.loadrequests = response;
            });
    }

    createrequest() {
        const reqobj = {
            name: this.newLoadRequestForm.get('name').value,
            church_id: this.pod['id']
        };
        this.podsManagerService.createLoadRequest(reqobj).subscribe(
            response => {
                this.popUp = true;
                this.getLoadRequestsFromPodId(this.pod['id']);
            },
            error => {
                this.popUp = false;
            }
        );
    }

    clickAddEdit(id) {
        this.route.navigate(['podmanager', 'addeditloadresource', id]);
    }

    onclickDelete(deleteid) {
        this.podsManagerService.deleteLoadRequest(deleteid)
            .subscribe(response => {
                this.getLoadRequestsFromPodId(this.pod['id']);
            });
    }
}
