import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { DataService } from '../../../../app-services/data.service';
import { AuthService } from '../../../../app-services/auth.service';

import { from } from 'rxjs';

@Component({
    selector: 'app-hub-manager-dashboard',
    templateUrl: './hub-manager-dashboard.component.html'
})
export class HubManagerDashboardComponent implements OnInit, AfterViewInit {

    constructor(public authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }

    onLogout() {
        this.authService.logout();
    }

    ngAfterViewInit() {
        this.router.navigate(['/hubmanager/regionalhubs']);
    }
}
