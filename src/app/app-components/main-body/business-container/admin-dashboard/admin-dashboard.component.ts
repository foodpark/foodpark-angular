import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    closeNav() {
        document.getElementById('leftmenu').style.width = '0';
    }
}
