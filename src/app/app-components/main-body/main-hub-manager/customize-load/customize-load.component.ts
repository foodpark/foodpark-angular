import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PodsService} from '../../../../app-services/pods.service';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';

@Component({
    selector: 'app-customize-load',
    templateUrl: './customize-load.component.html',
})
export class CustomizeLoadComponent implements OnInit {
    loaditems: any;

    constructor(private route: ActivatedRoute,
                private loadService: MasterLoadService,
                private podsManagerService: PodsManagerService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('loadId')) {
                this.podsManagerService
                    .apigetLoadItems(paramMap.get('loadId'))
                    .subscribe(response => {
                        this.loaditems = response;
                    });
            }
        });
    }

}
