import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-distribution-ceneter',
    templateUrl: './distrubution-center.component.html'
})

export class DistributionCenterComponent implements OnInit {
    activatedroute: any;
    currentpage: any;
    constructor(private activateroute: ActivatedRoute, private route: Router) {
        this.activatedroute = this.activateroute;
        this.currentpage = {};
        this.currentpage.name = 'GIK_DONATIONS';
        this.setSalestabActive();
    }

    setSalestabActive() {
        const url = this.route.url;
        const index = url.split('/');

        switch (index[3]) {
            case 'gikdonations':
                this.currentpage.name = 'GIK_DONATIONS';
                break;
            case 'volunteers':
                this.currentpage.name = 'VOLUNTEERS';
                break;
        }
    }

    ngOnInit() {}
}
