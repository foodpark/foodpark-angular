import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/app-services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pod-manager-dashboard',
    templateUrl: './pod-manager-dashboard.component.html'
})

export class PodManagerDashboardComponent implements AfterViewInit {
    constructor(public authService: AuthService,
        private router: Router) {
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }

    onLogout() {
        this.authService.logout();
    }

    ngAfterViewInit() {
        this.router.navigate(['/podmanager/loadresources']);
    }
}
