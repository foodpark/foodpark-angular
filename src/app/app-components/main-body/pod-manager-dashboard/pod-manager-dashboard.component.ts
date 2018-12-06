import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
    selector: 'app-pod-manager-dashboard',
    templateUrl: './pod-manager-dashboard.component.html'
})

export class PodManagerDashboardComponent implements OnInit {
    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }

    onLogout() {
        this.authService.logout();
    }
}
