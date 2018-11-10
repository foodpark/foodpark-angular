import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../app-services/data.service";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    sideNavData;

    constructor(private dataService: DataService) {
    }


    ngOnInit() {
        this.dataService.getJsonData('admin').subscribe(res => {
            this.sideNavData = res;
        });
    }

    closeNav() {
        document.getElementById('leftmenu').style.display = 'none';
    }
}
