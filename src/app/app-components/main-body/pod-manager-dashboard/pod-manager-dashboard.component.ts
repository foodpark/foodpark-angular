import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { DataService } from '../../../app-services/data.service';
import { AuthService } from '../../../app-services/auth.service';

import { from } from 'rxjs';

@Component({
    selector: 'app-pod-manager-dashboard',
    templateUrl: './pod-manager-dashboard.component.html'
})
export class PodManagerDashboardComponent implements OnInit {
    sideNavData = [];

    constructor(private dataService: DataService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.dataService.getJsonData('pod-manager-leftnav.json').subscribe(res => {
            this.sideNavData = res;
        });
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }

    onLogout() {
        this.authService.logout();
    }
}
