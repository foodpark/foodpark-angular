import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {PodsService} from '../../../../app-services/pods.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';

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

    constructor(private podsService: PodsService,private podsManagerService: PodsManagerService,private mainhubService: MainhubService,private route: Router,  private formBuilder: FormBuilder) {
          this.popup1 = true;
    }


    ngOnInit() {
        this.requestInitform();
        this.getLoadRequests();
    }

    requestInitform() {
        this.newloadrequestform = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    getLoadRequests() {
        this.podsManagerService.apigetLoadRequests().subscribe(response => {
            this.loadrequests = response;
        });
    }

    createrequest() {
        const reqobj = {
            name: this.newloadrequestform.get('name').value
        };
        this.podsManagerService.apicreateLoadRequests(reqobj).subscribe(
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
        this.podsManagerService.apideleteLoadRequests(deleteid)
            .subscribe(response => {
                this.getLoadRequests();
            });
    }
}
