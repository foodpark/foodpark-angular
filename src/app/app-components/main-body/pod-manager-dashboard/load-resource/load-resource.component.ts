import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {PodsService} from '../../../../app-services/pods.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';
import {PodModel} from '../../../../model';

@Component({
    selector: 'app-loadresource',
    templateUrl: './load-resource.component.html'
})
export class LoadResourceComponent implements OnInit {
    allvolunters: any;
    mainHub: any;
    mainhubId: any;
    newvolunterpopup: any;
    territoryid: any;
    loadrequests: any;
    newloadrequestform: any;
    popup1: any;
    pod: PodModel;

    constructor(private podsService: PodsService,
                private podsManagerService: PodsManagerService,
                private mainhubService: MainhubService,
                private route: Router,
                private formBuilder: FormBuilder) {
        this.popup1 = true;
    }


    ngOnInit() {
        this.requestInitform();
        this.getLoadRequests();
        this.podsManagerService.getPodOfLoggedInUser(localStorage.getItem('user_id')).subscribe(pod => {
            this.pod = pod[0];
        });
    }

    requestInitform() {
        this.newloadrequestform = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    getLoadRequests() {
        this.podsManagerService.getLoadRequests().subscribe(response => {
            this.loadrequests = response;
        });
    }

    createrequest() {
        const reqobj = {
            name: this.newloadrequestform.get('name').value,
            church_id: this.pod['id']
        };
        this.podsManagerService.createLoadRequest(reqobj).subscribe(
            response => {
                this.popup1 = true;
                this.getLoadRequests();
            },
            error => {
                this.popup1 = false;
            }
        );
    }

    clickAddEdit(id) {
        this.route.navigate(['podmanager', 'addeditloadresource', id]);
    }

    onclickDelete(deleteid) {
        this.podsManagerService.deleteLoadRequest(deleteid)
            .subscribe(response => {
                this.getLoadRequests();
            });
    }
}
