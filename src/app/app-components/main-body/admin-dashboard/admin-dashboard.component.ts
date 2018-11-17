import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../app-services/data.service';
import { AuthService } from '../../../app-services/auth.service';

import { from } from 'rxjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
    sideNavData = [];

    constructor(private dataService: DataService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.dataService.getJsonData('admin').subscribe(res => {
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
