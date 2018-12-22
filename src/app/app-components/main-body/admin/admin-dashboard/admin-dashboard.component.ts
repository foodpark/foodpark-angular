import {Component, OnInit, AfterViewInit} from '@angular/core';

import {DataService} from '../../../../app-services/data.service';
import {AuthService} from '../../../../app-services/auth.service';

import {from} from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
    userName: string;

    constructor(public authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.userName = this.authService.getUserName();
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }

    onLogout() {
        this.authService.logout();
    }

    ngAfterViewInit() {
        this.router.navigate(['/admin/territories']);
    }
}
