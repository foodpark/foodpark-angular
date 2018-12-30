import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';

@Component({
    selector: 'app-customize-load',
    templateUrl: './customize-load.component.html',
})
export class CustomizeLoadComponent implements OnInit {
    loaditems: any;

    constructor(private loadService: MasterLoadService,
                private podsManagerService: PodsManagerService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (localStorage.getItem('loadId')) {
            this.podsManagerService
                .apigetLoadItems(localStorage.getItem('loadId'))
                .subscribe(response => {
                    this.loaditems = response;
                });
        }
    }

}
